'use client';
import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoading } from '@/components/loading/LoadingContext';
import { generateClientHotels } from '@/lib/clientFallback';

function HotelListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showLoading } = useLoading();
  const city = searchParams.get('city') || 'New York';
  const guests = searchParams.get('guests') || '2';
  const rooms = searchParams.get('rooms') || '1';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  const [hotels, setHotels] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('recommended');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minStars, setMinStars] = useState(1);
  const [page, setPage] = useState(1);
  const [source, setSource] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        city, sort, maxPrice: String(maxPrice), stars: String(minStars),
        page: String(page), checkIn, checkOut, guests, rooms,
      });
      const res = await fetch(`/api/proxy/hotels?${params}`);
      const data = await res.json();
      if (data.hotels) {
        setHotels(prev => page === 1 ? data.hotels : [...prev, ...data.hotels]);
        setTotal(data.total || data.hotels.length);
        setSource(data.source || '');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      const fallback = generateClientHotels(city, 12);
      setHotels(fallback);
      setTotal(fallback.length);
    }
    setLoading(false);
  }, [city, sort, maxPrice, minStars, page, checkIn, checkOut, guests, rooms]);

  useEffect(() => { setPage(1); }, [sort, maxPrice, minStars]);
  useEffect(() => { fetchHotels(); }, [fetchHotels]);

  const sortOptions = [
    { key: 'recommended', label: '⭐ Recommended' },
    { key: 'price-low', label: '💰 Price: Low' },
    { key: 'price-high', label: '💰 Price: High' },
    { key: 'rating', label: '⭐ Rating' },
  ];

  // Client-side filtering + sorting (works for both API and fallback data)
  const filteredHotels = useMemo(() => {
    let result = hotels.filter(h => {
      const p = h.price || h.rooms?.[0]?.price || 0;
      if (p > maxPrice) return false;
      if ((h.stars || 0) < minStars) return false;
      return true;
    });
    if (sort === 'price-low') result.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === 'price-high') result.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sort === 'rating') result.sort((a, b) => (b.score || 0) - (a.score || 0));
    return result;
  }, [hotels, maxPrice, minStars, sort]);

  const goToDetail = async (hotel) => {
    // Store hotel data in sessionStorage for the detail page
    sessionStorage.setItem('hotelDetail', JSON.stringify(hotel));

    // ── Save hotel details to backend (gets MongoDB _id for booking) ──
    let savedId = '';
    if (hotel._raw) {
      try {
        const res = await fetch('/api/hotels/save/hotel-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hotel._raw),
        });
        const saved = await res.json();
        savedId = saved._id || saved.id || '';
      } catch (err) {
        console.error('Save hotel details error:', err);
      }
    }

    // Build URL — include savedId so detail page can use it for booking
    const params = new URLSearchParams({
      city: city,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
    });
    if (savedId) params.set('dbId', savedId);

    showLoading('hotel-detail', () => router.push(`/hotels/${hotel._id || hotel.slug || 'detail'}?${params}`));
  };

  return (
    <div className="bkp-page-bg">
      {/* Summary Bar */}
      <div className="rl-summary-bar py-2 px-3">
        <div className="container-xl d-flex align-items-center gap-2 flex-wrap">
          <div className="rl-search-pill">📍 {city}</div>
          {checkIn && <div className="rl-search-pill">📅 {checkIn}</div>}
          {checkOut && <div className="rl-search-pill">📅 {checkOut}</div>}
          <div className="rl-search-pill">👤 {guests} Guest{Number(guests) > 1 ? 's' : ''} · {rooms} Room{Number(rooms) > 1 ? 's' : ''}</div>
          <div className="small ms-2 rl-result-text">
            <span className="listing-result-dot" />
            🏨 {filteredHotels.length} hotels found
          </div>
          <Link href="/hotels" className="rl-modify-btn ms-auto">✏ Modify Search</Link>
        </div>
      </div>

      <div className="container-xl py-4">
        {/* Mobile Off-canvas Filter */}
        <div className={`mob-filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
        <div className={`mob-filter-panel ${filterOpen ? 'open' : ''}`}>
          <div className="mob-filter-panel-head"><h3>🎛 Filters</h3><button className="mob-filter-close" onClick={() => setFilterOpen(false)}>✕</button></div>
          <div className="mob-filter-panel-body">
            <div className="mb-4 pb-3 border-bottom">
              <h6 className="small fw-bold text-secondary text-uppercase mb-3">💰 Price per Night</h6>
              <div className="d-flex justify-content-between small fw-bold mb-2" style={{color:'var(--teal)'}}><span>$30</span><span>${maxPrice.toLocaleString()}</span></div>
              <input type="range" className="rl-slider" min={30} max={2000} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
            </div>
            <div className="mb-4 pb-3 border-bottom">
              <h6 className="small fw-bold text-secondary text-uppercase mb-3">⭐ Minimum Stars</h6>
              {[5,4,3,2,1].map(s => (<label key={s} className="rl-check"><input type="radio" name="mob-stars" checked={minStars===s} onChange={()=>setMinStars(s)} className="accent-color-teal" /> {'★'.repeat(s)}{'☆'.repeat(5-s)} {s}+</label>))}
            </div>
            <div className="mb-4 pb-3 border-bottom">
              <h6 className="small fw-bold text-secondary text-uppercase mb-3">🏨 Property Type</h6>
              {['Hotel','Boutique','Resort','Hostel','Apartment'].map(t=>(<label key={t} className="rl-check"><input type="checkbox" defaultChecked={t==='Hotel'||t==='Resort'} className="accent-color-teal" /> {t}</label>))}
            </div>
            <div className="mb-3">
              <h6 className="small fw-bold text-secondary text-uppercase mb-3">🎯 Amenities</h6>
              {['📶 Free WiFi','🏊 Pool','🍳 Breakfast','🅿 Parking','💪 Gym','💆 Spa'].map(a=>(<label key={a} className="rl-check"><input type="checkbox" className="accent-color-teal" /> {a}</label>))}
            </div>
          </div>
          <button className="mob-filter-apply" onClick={() => setFilterOpen(false)}>Apply Filters</button>
        </div>

        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <aside className="rl-filters">
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-g50">
                <h6 className="mb-0 fw-bold small">🎛 Filters</h6>
                <button className="btn btn-sm btn-link small fw-bold text-teal"
                  onClick={() => { setMaxPrice(2000); setMinStars(1); }}>Clear all</button>
              </div>
              <div className="p-3">
                {/* Price Filter */}
                <div className="mb-4 pb-3 border-bottom">
                  <h6 className="small fw-bold text-secondary text-uppercase mb-3 rl-filter-section-title">💰 Price per Night</h6>
                  <div className="d-flex justify-content-between small fw-bold mb-2 text-teal">
                    <span>$30</span><span>${maxPrice.toLocaleString()}</span>
                  </div>
                  <input type="range" className="rl-slider" min={30} max={2000} value={maxPrice}
                    onChange={e => setMaxPrice(+e.target.value)} />
                </div>
                {/* Star Filter */}
                <div className="mb-4 pb-3 border-bottom">
                  <h6 className="small fw-bold text-secondary text-uppercase mb-3 rl-filter-section-title">⭐ Minimum Stars</h6>
                  {[5, 4, 3, 2, 1].map(s => (
                    <label key={s} className="rl-check">
                      <input type="radio" name="stars" checked={minStars === s} onChange={() => setMinStars(s)}
                        className="accent-color-teal" />
                      {'★'.repeat(s)}{'☆'.repeat(5-s)} {s}+ Stars
                    </label>
                  ))}
                </div>
                {/* Property Type */}
                <div className="mb-4 pb-3 border-bottom">
                  <h6 className="small fw-bold text-secondary text-uppercase mb-3 rl-filter-section-title">🏨 Property Type</h6>
                  {['Hotel', 'Boutique', 'Resort', 'Hostel', 'Apartment'].map(t => (
                    <label key={t} className="rl-check">
                      <input type="checkbox" defaultChecked={t === 'Hotel' || t === 'Boutique' || t === 'Resort'}
                        className="accent-color-teal" /> {t}
                    </label>
                  ))}
                </div>
                {/* Amenities */}
                <div className="mb-3">
                  <h6 className="small fw-bold text-secondary text-uppercase mb-3 rl-filter-section-title">🎯 Amenities</h6>
                  {['📶 Free WiFi', '🏊 Pool', '🍳 Breakfast', '🅿 Free Parking', '💪 Gym', '💆 Spa', '🐾 Pet-friendly', '🛎 Room Service'].map(a => (
                    <label key={a} className="rl-check">
                      <input type="checkbox" className="accent-color-teal" /> {a}
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Results Column */}
          <div className="col-lg-9">
            {/* Sort Bar */}
            <div className="bg-white rounded-top-4 border p-3 d-flex align-items-center gap-2 flex-wrap mb-3">
              <button className="mob-filter-btn" onClick={() => setFilterOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 12h12M8 18h8" /></svg>Filters</button>
              <span className="small fw-bold text-secondary text-uppercase rl-sort-label">Sort by</span>
              {sortOptions.map(s => (
                <button key={s.key} className={`rl-sort-btn ${sort === s.key ? 'active' : ''}`}
                  onClick={() => setSort(s.key)}>{s.label}</button>
              ))}
              <span className="ms-auto small text-secondary fw-semibold">Showing {hotels.length} of {total}</span>
            </div>

            {/* Loading */}
            {loading && page === 1 ? (
              <div className="text-center py-5 bg-white rounded-3">
                <div className="spinner-border mb-3 listing-spinner-lg" />
                <p className="fw-bold text-dark">Searching hotels in {city}...</p>
                <p className="small text-secondary">Checking availability and best rates</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-3 border">
                <div className="listing-empty-icon mb-3">🏨</div>
                <h5>No hotels found in {city}</h5>
                <p className="text-secondary">Try adjusting your filters or search a different destination.</p>
                <Link href="/hotels" className="btn-fl-primary px-4 py-2 mt-2 d-inline-block">Search Again</Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredHotels.map((h, i) => (
                  <div key={h._id || i} className={`ht-card-outer ${i === 0 ? 'featured-wrap' : ''} cursor-pointer`} onClick={() => goToDetail(h)}>
                    {i === 0 && (
                      <div className="px-3 py-1 d-flex align-items-center gap-2 text-white small fw-bold ht-best-badge">
                        ⭐ Best Match — Recommended for you
                      </div>
                    )}
                    <div className="row g-0">
                      {/* Image */}
                      <div className="col-md-3 ht-card-img-wrap">
                        <img
                          src={h.images?.[0] || `https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=85`}
                          alt={h.name}
                          className="ht-card-img-inner"
                          loading="lazy"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=85'; }}
                        />
                        {h.badge && (
                          <span className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded-pill text-white small fw-bold ht-img-badge">{h.badge}</span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="col-md-6 p-3 border-start d-flex flex-column">
                        <div className="small mb-1 text-gold">{'★'.repeat(h.stars || 4)}</div>
                        <h5 className="ht-name mb-1">{h.name}</h5>
                        <div className="small text-secondary mb-2 d-flex align-items-center gap-1">
                          📍 {h.address || h.city || city}
                        </div>
                        <div className="d-flex gap-1 flex-wrap mb-2">
                          {(h.amenities || []).slice(0, 5).map((a, j) => (
                            <span key={j} className="ht-amenity">
                              {typeof a === 'string' ? a : `${a.icon || ''} ${a.name || a}`}
                            </span>
                          ))}
                        </div>
                        {h.description && (
                          <p className="small text-secondary mb-2 listing-desc-clamp">
                            {h.description}
                          </p>
                        )}
                        <div className="mt-auto pt-2 border-top d-flex align-items-start gap-2">
                          <span className="ht-score">{h.score || '8.5'}</span>
                          <div className="small text-secondary">
                            <strong>{h.scoreLabel || 'Excellent'}</strong> · {h.reviewCount || 0} reviews
                          </div>
                        </div>
                      </div>

                      {/* Price Column */}
                      <div className="col-md-3 p-3 border-start d-flex flex-column align-items-end justify-content-center gap-1"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="ht-price-from">from</div>
                        <div className="ht-price-main">${h.priceFrom || 189}</div>
                        <div className="ht-price-per">per night</div>
                        {checkIn && checkOut && (
                          <div className="small text-secondary fw-semibold">
                            ${(h.priceFrom || 189) * Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 864e5))} total
                          </div>
                        )}
                        {h.freeCancel !== false && <span className="ht-free-cancel my-1">✅ Free Cancel</span>}
                        <button className="ht-book-btn mt-1" onClick={(e) => { e.stopPropagation(); goToDetail(h); }}>
                          Book Now →
                        </button>
                        <button className="ht-details-btn mt-1" onClick={(e) => { e.stopPropagation(); goToDetail(h); }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More */}
                {hotels.length < total && (
                  <div className="text-center py-3">
                    <button className="btn-fl-ghost px-4 py-2" disabled={loading}
                      onClick={() => setPage(p => p + 1)}>
                      {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                      Load More Hotels ({total - hotels.length} remaining) →
                    </button>
                  </div>
                )}

                {hotels.length >= total && hotels.length > 0 && (
                  <div className="text-center py-3 bg-white rounded-3 border small text-secondary fw-semibold">
                    ✅ All {total} hotels loaded
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelListingPage() {
  return (
    <Suspense fallback={<div className="d-flex align-items-center justify-content-center min-vh-80"><div className="spinner-border listing-spinner-lg" /></div>}>
      <HotelListingContent />
    </Suspense>
  );
}
