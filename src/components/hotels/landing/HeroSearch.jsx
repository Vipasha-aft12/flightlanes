'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';

export default function HeroSearch() {
  const router = useRouter();
  const { showLoading } = useLoading();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const d1 = new Date(); d1.setDate(d1.getDate() + 14);
    const d2 = new Date(); d2.setDate(d2.getDate() + 19);
    setCheckIn(d1.toISOString().split('T')[0]);
    setCheckOut(d2.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchCities = useCallback(async (q) => {
    if (!q || q.length < 2) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/cities?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
      setShowDropdown(true);
      setActiveIndex(-1);
    } catch { setSuggestions([]); }
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSelectedCity(null);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchCities(val), 250);
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setQuery(city.name + (city.country ? `, ${city.country}` : ''));
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(prev => Math.max(prev - 1, 0)); }
    else if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); selectCity(suggestions[activeIndex]); }
    else if (e.key === 'Escape') { setShowDropdown(false); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const city = selectedCity?.name || query || 'New York';
    const params = new URLSearchParams({ city, checkIn, checkOut, guests });
    showLoading('hotel-search', () => router.push(`/hotels/listing?${params.toString()}`));
  };

  return (
    <section className="hero-section d-flex flex-column align-items-center justify-content-center px-3 pt-5 pb-4">
      <div className="hero-bg-image" />
      <div className="hero-gradient" />
      <div className="hero-content text-center mb-4">
        <div className="hero-badge mb-3">
          <span className="hero-badge-dot" />
          🏨 500,000+ Hotels Worldwide
        </div>
        <h1 className="hero-title mb-3">
          Find the Best Hotels<br />for Your <em className="hero-title-accent">Next Stay</em>
        </h1>
        <p className="hero-subtitle mx-auto mb-4">
          Compare 500,000+ hotels worldwide. Best rates guaranteed — from cozy B&Bs to five-star luxury resorts.
        </p>
      </div>
      <div className="hero-search-box">
        <form onSubmit={handleSearch} className="hero-search-form">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-4 position-relative" ref={wrapRef}>
              <label className="search-field-label d-block mb-1">Destination</label>
              <div className="position-relative">
                <input
                  type="text" className="form-control search-field-input"
                  value={query} onChange={handleInputChange} onKeyDown={handleKeyDown}
                  onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                  placeholder="Where are you going?" autoComplete="off"
                />
                <span className="search-field-icon">📍</span>
                {loading && <span className="spinner-border spinner-border-sm search-field-spinner" />}
              </div>
              {showDropdown && suggestions.length > 0 && (
                <div className="city-dropdown">
                  {suggestions.map((city, i) => (
                    <div key={city.id || i}
                      className={`city-dropdown-item ${i === activeIndex ? 'city-dropdown-item-active' : ''}`}
                      onClick={() => selectCity(city)}
                      onMouseEnter={() => setActiveIndex(i)}>
                      <div className="city-dropdown-icon">🏨</div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="city-dropdown-name text-truncate">{city.name}</div>
                        <div className="city-dropdown-country">{city.country}{city.code ? ` · ${city.code}` : ''}</div>
                      </div>
                      {i === activeIndex && <span className="city-dropdown-enter">↵ Select</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-6 col-md-2">
              <label className="search-field-label d-block mb-1">Check-in</label>
              <input type="date" className="form-control search-date-input" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="col-6 col-md-2">
              <label className="search-field-label d-block mb-1">Check-out</label>
              <input type="date" className="form-control search-date-input" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <div className="col-6 col-md-1">
              <label className="search-field-label d-block mb-1">Guests</label>
              <select className="form-select search-select" value={guests} onChange={e => setGuests(e.target.value)}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <button type="submit" className="btn w-100 btn-fl-search d-flex align-items-center justify-content-center gap-2">
                🔍 Search Hotels
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
