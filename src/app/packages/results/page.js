'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PackageCard from '@/components/packages/PackageCard';
import PackageFilterSidebar from '@/components/packages/PackageFilterSidebar';
import { generatePackagePool, getNightsBucket, PACKAGE_TYPES, BOARD_TYPES, STAR_RATINGS } from '@/lib/packageUtils';

function PackageResultsContent() {
  const sp = useSearchParams();
  const from = sp.get('from') || 'New York (JFK)';
  const to = sp.get('to') || 'Bali, Indonesia';
  const travelers = sp.get('travelers') || '2';

  const pool = useMemo(() => generatePackagePool(25), []);
  const allDests = useMemo(() => [...new Set(pool.map(p => p.destName))].sort(), [pool]);

  const [sortBy, setSortBy] = useState('price');
  const [shown, setShown] = useState(5);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 10000,
    durations: { '3-5': true, '6-9': true, '10-14': true },
    destinations: Object.fromEntries(allDests.map(d => [d, true])),
    packageTypes: Object.fromEntries(PACKAGE_TYPES.map(t => [t, true])),
    boardTypes: Object.fromEntries(BOARD_TYPES.map(b => [b, true])),
    starRatings: Object.fromEntries(STAR_RATINGS.map(s => [s, true])),
  });

  const filtered = useMemo(() => pool.filter((p) => {
    if (p.price > filters.maxPrice) return false;
    if (!filters.durations[getNightsBucket(p.nights)]) return false;
    if (!filters.destinations[p.destName]) return false;
    if (!filters.packageTypes[p.type]) return false;
    if (!filters.boardTypes[p.board]) return false;
    if (!filters.starRatings[p.starRating]) return false;
    return true;
  }), [pool, filters]);

  const sorted = useMemo(() => {
    const a = [...filtered];
    if (sortBy === 'price') a.sort((x, y) => x.price - y.price);
    else if (sortBy === 'rating') a.sort((x, y) => y.rating - x.rating);
    else if (sortBy === 'duration') a.sort((x, y) => x.nights - y.nights);
    else if (sortBy === 'value') a.sort((x, y) => (y.rating / y.price) - (x.rating / x.price));
    return a;
  }, [filtered, sortBy]);

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>
        <div className="rl-summary-bar"><div className="rl-summary-inner">
          <div className="rl-search-pill">✈ <span>{from}</span></div>
          <div className="rl-search-pill">📍 <span>{to}</span></div>
          <div className="rl-search-pill">👥 {travelers} Travelers</div>
          <div className="rl-result-count"><span className="rl-result-dot"></span><span>🎁 {sorted.length} packages found</span></div>
          <Link href="/packages" className="rl-modify-btn">✏ Modify Search</Link>
        </div></div>
        <div className="rl-layout">
          <PackageFilterSidebar filters={filters} setFilters={setFilters} />
          <div className={`mob-filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
          <div className={`mob-filter-panel ${filterOpen ? 'open' : ''}`}>
            <div className="mob-filter-panel-head"><h3>🎛 Filters</h3><button className="mob-filter-close" onClick={() => setFilterOpen(false)}>✕</button></div>
            <div className="mob-filter-panel-body"><PackageFilterSidebar filters={filters} setFilters={setFilters} /></div>
            <button className="mob-filter-apply" onClick={() => setFilterOpen(false)}>Apply Filters</button>
          </div>
          <div className="rl-results">
            <div className="rl-sort-bar">
              <button className="mob-filter-btn" onClick={() => setFilterOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 12h12M8 18h8" /></svg>Filters</button>
              <span className="rl-sort-label">Sort:</span>
              {[{ k: 'price', l: '💰 Lowest Price' }, { k: 'rating', l: '⭐ Best Rated' }, { k: 'duration', l: '📅 Duration' }, { k: 'value', l: '🏆 Best Value' }].map((b) => (
                <button key={b.k} className={`rl-sort-btn ${sortBy === b.k ? 'active' : ''}`} onClick={() => setSortBy(b.k)}>{b.l}</button>
              ))}
              <span className="rl-showing">Showing {Math.min(shown, sorted.length)} of {sorted.length}</span>
            </div>
            {sorted.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', background: 'white', border: '1px solid var(--g200)', borderRadius: '0 0 14px 14px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <div style={{ fontWeight: 700 }}>No packages match your filters</div>
                <div style={{ fontSize: '.85rem', color: 'var(--g500)' }}>Try adjusting your filters</div>
              </div>
            ) : (
              <div>{sorted.slice(0, shown).map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
            )}
            {shown < sorted.length && (
              <div style={{ background: 'white', borderRadius: '0 0 16px 16px', border: '1px solid var(--g200)', borderTop: 'none', padding: '20px', textAlign: 'center' }}>
                <button className="btn-ghost" style={{ fontSize: '.95rem', padding: '11px 32px' }} onClick={() => setShown(shown + 5)}>Load More Packages ({sorted.length - shown} remaining) →</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default function PackageResultsPage() {
  return <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading packages...</div>}><PackageResultsContent /></Suspense>;
}
