'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '@/components/shared/results.css';
import '@/components/cruises/cruisesDetail.css';
import CruiseCard from '@/components/cruises/CruiseCard';
import CruiseFilterSidebar from '@/components/cruises/CruiseFilterSidebar';
import { generateCruisePool, getDurationBucket, CRUISE_LINES, SHIP_TYPES, BOARD_TYPES, CABIN_TYPES, DURATIONS } from '@/lib/cruiseUtils';

function CruiseResultsContent() {
  const sp = useSearchParams();
  const destination = sp.get('destination') || 'Caribbean';
  const guests = sp.get('guests') || '2';

  const pool = useMemo(() => generateCruisePool(25), []);
  const allLines = useMemo(() => [...new Set(pool.map(c => c.cruiseLine.name))].sort(), [pool]);

  const [sortBy, setSortBy] = useState('price');
  const [shown, setShown] = useState(5);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 10000,
    durations: Object.fromEntries(DURATIONS.map(d => [d, true])),
    cruiseLines: Object.fromEntries(allLines.map(l => [l, true])),
    shipTypes: Object.fromEntries(SHIP_TYPES.map(s => [s, true])),
    boardTypes: Object.fromEntries(BOARD_TYPES.map(b => [b, true])),
    cabinTypes: Object.fromEntries(CABIN_TYPES.map(c => [c, true])),
  });

  const filtered = useMemo(() => {
    return pool.filter((c) => {
      if (c.price > filters.maxPrice) return false;
      const db = getDurationBucket(c.nights);
      if (!filters.durations[db]) return false;
      if (!filters.cruiseLines[c.cruiseLine.name]) return false;
      if (!filters.shipTypes[c.shipType]) return false;
      if (!filters.boardTypes[c.boardType]) return false;
      const hasCabin = c.cabinTypes.some(ct => filters.cabinTypes[ct]);
      if (!hasCabin) return false;
      return true;
    });
  }, [pool, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === 'price') arr.sort((a, b) => a.price - b.price);
    else if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'duration') arr.sort((a, b) => a.nights - b.nights);
    else if (sortBy === 'recommended') arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.price - b.price);
    return arr;
  }, [filtered, sortBy]);

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>
        <div className="rl-summary-bar">
          <div className="rl-summary-inner">
            <div className="rl-search-pill">🚢 <span>{destination}</span></div>
            <div className="rl-search-pill">👥 {guests} Guests</div>
            <div className="rl-result-count"><span className="rl-result-dot"></span><span>🚢 {sorted.length} cruises found</span></div>
            <Link href="/cruises" className="rl-modify-btn">✏ Modify Search</Link>
          </div>
        </div>
        <div className="rl-layout">
          <CruiseFilterSidebar filters={filters} setFilters={setFilters} />
          <div className={`mob-filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
          <div className={`mob-filter-panel ${filterOpen ? 'open' : ''}`}>
            <div className="mob-filter-panel-head"><h3>🎛 Filters</h3><button className="mob-filter-close" onClick={() => setFilterOpen(false)}>✕</button></div>
            <div className="mob-filter-panel-body"><CruiseFilterSidebar filters={filters} setFilters={setFilters} /></div>
            <button className="mob-filter-apply" onClick={() => setFilterOpen(false)}>Apply Filters</button>
          </div>
          <div className="rl-results">
            <div className="rl-sort-bar">
              <button className="mob-filter-btn" onClick={() => setFilterOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 12h12M8 18h8" /></svg>Filters</button>
              <span className="rl-sort-label">Sort:</span>
              {[{ k: 'price', l: '💰 Lowest Price' }, { k: 'rating', l: '⭐ Best Rated' }, { k: 'duration', l: '⏱ Shortest' }, { k: 'recommended', l: '🏆 Recommended' }].map((btn) => (
                <button key={btn.k} className={`rl-sort-btn ${sortBy === btn.k ? 'active' : ''}`} onClick={() => setSortBy(btn.k)}>{btn.l}</button>
              ))}
              <span className="rl-showing">Showing {Math.min(shown, sorted.length)} of {sorted.length} cruises</span>
            </div>
            {sorted.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', background: 'white', border: '1px solid var(--g200)', borderRadius: '0 0 14px 14px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <div style={{ fontWeight: 700, color: 'var(--g800)' }}>No cruises match your filters</div>
                <div style={{ fontSize: '.85rem', color: 'var(--g500)' }}>Try adjusting your filters</div>
              </div>
            ) : (
              <div>{sorted.slice(0, shown).map((c) => <CruiseCard key={c.id} cruise={c} />)}</div>
            )}
            {shown < sorted.length && (
              <div style={{ background: 'white', borderRadius: '0 0 16px 16px', border: '1px solid var(--g200)', borderTop: 'none', padding: '20px', textAlign: 'center' }}>
                <button className="btn-ghost" style={{ fontSize: '.95rem', padding: '11px 32px' }} onClick={() => setShown(shown + 5)}>Load More Cruises ({sorted.length - shown} remaining) →</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default function CruiseResultsPage() {
  return <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading cruises...</div>}><CruiseResultsContent /></Suspense>;
}
