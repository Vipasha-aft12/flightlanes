'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './DestinationsPage.css';

const CATS = [
  { key: 'all', label: 'All Destinations' },
  { key: 'asia', label: '🌏 Asia' },
  { key: 'europe', label: '🏰 Europe' },
  { key: 'americas', label: '🗽 Americas' },
  { key: 'middle-east', label: '🕌 Middle East' },
  { key: 'africa', label: '🌍 Africa' },
  { key: 'pacific', label: '🌊 Pacific' },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    fetch('/api/public/destinations')
      .then(r => r.json())
      .then(d => { setDestinations(d.destinations || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [destinations, activeCat]);

  const filtered = activeCat === 'all' ? destinations : destinations.filter(d => d.continent === activeCat);
  const catLabel = CATS.find(c => c.key === activeCat)?.label || 'All Destinations';

  return (
    <div className="destinations-page">
      <div className="arl-wrap">
        <div className="arl-hero">
          <div className="arl-hero-label">🌍 Explore the World</div>
          <h1>Top Travel Destinations</h1>
          <p>Hand-picked destinations across every continent — from iconic cities and tropical islands to wildlife safaris and mountain adventures.</p>
        </div>
        <div className="arl-inner">
          <div className="arl-filter-wrap">
            <button className="arl-filter-arrow" title="Scroll left">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="arl-filter-scroll">
              <div className="arl-filter-bar">
                {CATS.map(c => (
                  <button key={c.key} className={`arl-filter-btn ${activeCat === c.key ? 'active' : ''}`} onClick={() => setActiveCat(c.key)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <button className="arl-filter-arrow" title="Scroll right">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <div className="arl-section-title">{catLabel}</div>
          <div className="arl-section-sub">Click any destination to explore guides, tips and flights</div>

          {loading && <div className="state-msg">Loading destinations...</div>}

          <div className="arl-grid">
            {filtered.map(d => (
              <Link href={`/destinations/${d.slug}`} className="arl-card" key={d._id} data-cat={d.continent}>
                <div className="arl-card-img">
                  <img src={d.cardImg || d.heroImg} alt={d.name} loading="lazy" />
                  <div className="arl-card-logo is-des-e79cc0">{d.flag}</div>
                </div>
                <div className="arl-card-body">
                  <div className="arl-card-tag">{d.region}</div>
                  <div className="arl-card-name">{d.name}</div>
                  <div className="arl-card-desc">{d.tagline}</div>
                  <div className="arl-card-foot">
                    <span className="arl-card-btn">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="state-msg">
              No destinations found in this region.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
