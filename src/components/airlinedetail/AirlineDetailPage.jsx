'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './AirlineDetailPage.css';

export default function AirlineDetailPage() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop();

  const [airline, setAirline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/public/airlines/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setAirline(d.airline); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="airlinedetail-page">
      <div className="state-msg-lg">Loading airline details...</div>
    </div>
  );

  if (error || !airline) return (
    <div className="airlinedetail-page">
      <div className="state-msg-box">
        <h2>Airline not found</h2>
        <p>This airline may have been removed or the URL is incorrect.</p>
        <Link href="/airlines" className="state-msg-link">← Back to Airlines</Link>
      </div>
    </div>
  );

  return (
    <div className="airlinedetail-page">
      <div className="ald-wrap">
        <div className="ald-hero">
          <img src={airline.heroImg} alt={airline.name} />
          <div className="ald-hero-overlay"></div>
          <div className="ald-hero-content">
            <Link href="/airlines" className="ald-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to Airlines
            </Link>
            <div className="ald-hero-badge">{airline.badge}</div>
            <h1>{airline.name}</h1>
            <div className="ald-hero-code">{airline.code}</div>
          </div>
        </div>
        <div className="ald-inner">
          <div className="ald-main">
            <div className="ald-section">
              <div className="ald-section-title">About {airline.name}</div>
              {airline.about?.map((p, i) => (<p key={i} className="ald-about-text">{p}</p>))}
              {airline.stats?.length > 0 && (
                <div className="ald-stats">
                  {airline.stats.map((s, i) => (<div key={i} className="ald-stat"><div className="ald-stat-val">{s.val}</div><div className="ald-stat-lbl">{s.label}</div></div>))}
                </div>
              )}
            </div>
            {airline.features?.length > 0 && (
              <div className="ald-section">
                <div className="ald-section-title">What Makes {airline.name} Stand Out</div>
                <div className="ald-features">
                  {airline.features.map((f, i) => (
                    <div key={i} className="ald-feature"><div className="ald-feature-icon">{f.icon}</div><div><div className="ald-feature-title">{f.title}</div><div className="ald-feature-desc">{f.desc}</div></div></div>
                  ))}
                </div>
              </div>
            )}
            {airline.routes?.length > 0 && (
              <div className="ald-section">
                <div className="ald-section-title">Popular Routes</div>
                <div className="ald-routes">
                  {airline.routes.map((r, i) => (
                    <div key={i} className="ald-route"><div><div className="ald-route-name">{r.name}</div><div className="ald-route-freq">{r.freq}</div></div><div className="ald-route-price">{r.price}</div></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="ald-sidebar">
            <div className="ald-book-card">
              <div className="ald-book-title">Book {airline.name}</div>
              <div className="ald-book-sub">Search the best fares on {airline.name} flights</div>
              <Link href="/flights" className="ald-book-btn">✈ Search Flights</Link>
            </div>
            {airline.quickInfo?.length > 0 && (
              <div className="ald-info-card">
                <div className="ald-info-head">Quick Info</div>
                {airline.quickInfo.map((q, i) => (<div key={i} className="ald-info-row"><div className="ald-info-lbl">{q.lbl}</div><div className="ald-info-val">{q.val}</div></div>))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
