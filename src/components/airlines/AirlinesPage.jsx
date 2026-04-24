'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './AirlinesPage.css';

const CATS = [
  { key: 'all', label: 'All Airlines' },
  { key: 'us', label: '🇺🇸 US Carriers' },
  { key: 'international', label: '🌍 International' },
  { key: 'budget', label: '💰 Budget Airlines' },
];

export default function AirlinesPage() {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    fetch('/api/public/airlines')
      .then(r => r.json())
      .then(d => { setAirlines(d.airlines || []); setLoading(false); })
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
  }, [airlines, activeCat]);

  const filtered = activeCat === 'all' ? airlines : airlines.filter(a => a.category === activeCat);
  const catLabel = CATS.find(c => c.key === activeCat)?.label || 'All Airlines';

  return (
    <div className="airlines-page">
      <div className="arl-wrap">
        <div className="arl-hero">
          <div className="arl-hero-label">✈ Browse Airlines</div>
          <h1>Find Your Perfect Airline</h1>
          <p>Compare 20+ airlines across US carriers, international flag carriers and budget airlines — all at guaranteed lowest fares.</p>
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
          <div className="arl-section-sub">Click any airline to search available flights</div>

          {loading && <div className="state-msg">Loading airlines...</div>}

          <div className="arl-grid">
            {filtered.map(a => (
              <Link href={`/airlines/${a.slug}`} className="arl-card" key={a._id} data-cat={a.category}>
                <div className="arl-card-img">
                  <img src={a.cardImg || a.heroImg} alt={a.name} loading="lazy" />
                  <div className="arl-card-logo">{a.code?.split(' ')[0]}</div>
                </div>
                <div className="arl-card-body">
                  <div className="arl-card-tag">{a.badge}</div>
                  <div className="arl-card-name">{a.name}</div>
                  <div className="arl-card-desc">{a.about?.[0]?.substring(0, 120) || a.badge}</div>
                  <div className="arl-card-foot">
                    <span className="arl-card-btn">Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="state-msg">
              No airlines found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
