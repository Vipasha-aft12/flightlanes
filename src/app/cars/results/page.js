'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CarCard from '@/components/cars/CarCard';
import CarFilterSidebar from '@/components/cars/CarFilterSidebar';
import { generateCarPool, CAR_TYPES, COMPANIES } from '@/lib/carUtils';

function getSeatBucket(seats) {
  if (seats <= 4) return '2-4';
  if (seats === 5) return '5';
  return '7+';
}

function CarResultsContent() {
  const sp = useSearchParams();
  const pickup = sp.get('pickup') || 'Los Angeles, CA';
  const pickupDate = sp.get('pickupDate') || '2026-08-01';
  const dropoffDate = sp.get('dropoffDate') || '2026-08-05';
  const typeFilter = sp.get('type') || '';

  const d1 = new Date(pickupDate);
  const d2 = new Date(dropoffDate);
  const days = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));

  const pool = useMemo(() => generateCarPool(35), []);

  const allCompanyNames = useMemo(() => [...new Set(pool.map(c => c.company.name))].sort(), [pool]);

  const [sortBy, setSortBy] = useState('price');
  const [shown, setShown] = useState(6);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 500,
    carTypes: Object.fromEntries(CAR_TYPES.map(t => [t, typeFilter ? t === typeFilter : true])),
    companies: Object.fromEntries(allCompanyNames.map(c => [c, true])),
    features: { fullInsurance: false, freeCancellation: false, unlimitedMiles: false, airportPickup: false, electric: false },
    transmissions: { Automatic: true, Manual: true },
    seats: { '2-4': true, '5': true, '7+': true },
  });

  const filtered = useMemo(() => {
    return pool.filter((car) => {
      if (car.price > filters.maxPrice) return false;
      if (!filters.carTypes[car.type]) return false;
      if (!filters.companies[car.company.name]) return false;
      if (!filters.transmissions[car.transmission]) return false;
      if (!filters.seats[getSeatBucket(car.seats)]) return false;
      if (filters.features.freeCancellation && !car.freeCancellation) return false;
      if (filters.features.unlimitedMiles && !car.unlimitedMiles) return false;
      if (filters.features.fullInsurance && !car.fullInsurance) return false;
      if (filters.features.airportPickup && !car.airportPickup) return false;
      if (filters.features.electric && !car.isElectric) return false;
      return true;
    });
  }, [pool, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === 'price') arr.sort((a, b) => a.price - b.price);
    else if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'recommended') arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.price - b.price);
    else if (sortBy === 'class') arr.sort((a, b) => a.type.localeCompare(b.type));
    return arr;
  }, [filtered, sortBy]);

  const sortButtons = [
    { key: 'price', label: '💰 Lowest Price' },
    { key: 'rating', label: '⭐ Best Rated' },
    { key: 'recommended', label: '🏆 Recommended' },
    { key: 'class', label: '🚗 Car Class' },
  ];

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>
        <div className="rl-summary-bar">
          <div className="rl-summary-inner">
            <div className="rl-search-pill">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" /></svg>
              <span>{pickup}</span>
            </div>
            <div className="rl-search-pill">🗓 Pick-up: <span>{pickupDate}</span></div>
            <div className="rl-search-pill">🗓 Drop-off: <span>{dropoffDate}</span></div>
            <div className="rl-search-pill">🚗 <span>{typeFilter || 'Any Type'}</span></div>
            <div className="rl-result-count">
              <span className="rl-result-dot"></span>
              <span>🚗 {sorted.length} cars found</span>
            </div>
            <Link href="/cars" className="rl-modify-btn">✏ Modify Search</Link>
          </div>
        </div>

        <div className="rl-layout">
          <CarFilterSidebar filters={filters} setFilters={setFilters} />
          <div className={`mob-filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
          <div className={`mob-filter-panel ${filterOpen ? 'open' : ''}`}>
            <div className="mob-filter-panel-head"><h3>🎛 Filters</h3><button className="mob-filter-close" onClick={() => setFilterOpen(false)}>✕</button></div>
            <div className="mob-filter-panel-body"><CarFilterSidebar filters={filters} setFilters={setFilters} /></div>
            <button className="mob-filter-apply" onClick={() => setFilterOpen(false)}>Apply Filters</button>
          </div>

          <div className="rl-results">
            <div className="rl-sort-bar">
              <button className="mob-filter-btn" onClick={() => setFilterOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 12h12M8 18h8" /></svg>Filters</button>
              <span className="rl-sort-label">Sort:</span>
              {sortButtons.map((btn) => (
                <button key={btn.key} className={`rl-sort-btn ${sortBy === btn.key ? 'active' : ''}`} onClick={() => setSortBy(btn.key)}>{btn.label}</button>
              ))}
              <span className="rl-showing">Showing {Math.min(shown, sorted.length)} of {sorted.length} cars</span>
            </div>

            {sorted.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', background: 'white', border: '1px solid var(--g200)', borderRadius: '0 0 14px 14px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--g800)', marginBottom: '6px' }}>No cars match your filters</div>
                <div style={{ fontSize: '.85rem', color: 'var(--g500)' }}>Try adjusting your filters to see more results</div>
              </div>
            ) : (
              <div>
                {sorted.slice(0, shown).map((car) => (
                  <CarCard key={car.id} car={car} days={days} />
                ))}
              </div>
            )}

            {shown < sorted.length && (
              <div style={{ background: 'white', borderRadius: '0 0 16px 16px', border: '1px solid var(--g200)', borderTop: 'none', padding: '20px', textAlign: 'center' }}>
                <button className="btn-ghost" style={{ fontSize: '.95rem', padding: '11px 32px' }} onClick={() => setShown(shown + 6)}>
                  Load More Cars ({sorted.length - shown} remaining) →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default function CarResultsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading cars...</div>}>
      <CarResultsContent />
    </Suspense>
  );
}
