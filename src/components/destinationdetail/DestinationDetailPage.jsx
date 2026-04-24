'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './DestinationDetailPage.css';

export default function DestinationDetailPage() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop();

  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeToc, setActiveToc] = useState('about');
  const sectionRefs = useRef({});

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/public/destinations/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setDest(d.destination); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  function scrollToSection(id) {
    setActiveToc(id);
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (loading) return (
    <div className="destinationdetail-page">
      <div className="state-msg-lg">Loading destination...</div>
    </div>
  );

  if (error || !dest) return (
    <div className="destinationdetail-page">
      <div className="state-msg-box">
        <h2>Destination not found</h2>
        <p>This destination may have been removed or the URL is incorrect.</p>
        <Link href="/destinations" className="state-msg-link">← Back to Destinations</Link>
      </div>
    </div>
  );

  const TOC = [
    { id: 'about', num: '1', label: 'About' },
    ...(dest.highlights?.length ? [{ id: 'highlights', num: '2', label: 'Top Highlights' }] : []),
    ...(dest.tips?.length ? [{ id: 'tips', num: String(dest.highlights?.length ? 3 : 2), label: 'Traveller Tips' }] : []),
  ];

  return (
    <div className="destinationdetail-page">
      <div className="dst-wrap">
        {/* Hero */}
        <div className="dst-hero">
          <img src={dest.heroImg} alt={dest.name} />
          <div className="dst-hero-overlay"></div>
          <div className="dst-hero-content">
            <Link href="/destinations" className="dst-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to Destinations
            </Link>
            <div className="dst-hero-badge">{dest.region}</div>
            <h1>{dest.name}</h1>
            <div className="dst-hero-sub">{dest.tagline}</div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="dst-inner">
          {/* LEFT — Table of Contents */}
          <div className="dst-toc-col">
            <div className="dst-toc">
              <div className="dst-toc-head">📋 Contents</div>
              {TOC.map((item) => (
                <button key={item.id} className={`dst-toc-item ${activeToc === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
                  <span className="dst-toc-num">{item.num}</span>{item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CENTER — Main content */}
          <div className="dst-main">
            <div className="dst-section" id="about" ref={(el) => (sectionRefs.current['about'] = el)}>
              <div className="dst-section-title">About {dest.name}</div>
              {dest.stats?.length > 0 && (
                <div className="dst-stats">
                  {dest.stats.map((s, i) => (<div key={i} className="dst-stat"><div className="dst-stat-val">{s.val}</div><div className="dst-stat-lbl">{s.label}</div></div>))}
                </div>
              )}
              {dest.about?.map((p, i) => (<p key={i} className="dst-about-text">{p}</p>))}
            </div>

            {dest.highlights?.length > 0 && (
              <div className="dst-section" id="highlights" ref={(el) => (sectionRefs.current['highlights'] = el)}>
                <div className="dst-section-title">Top Highlights</div>
                <div className="dst-highlights">
                  {dest.highlights.map((h, i) => (
                    <div key={i} className="dst-highlight"><div className="dst-highlight-icon">{h.icon}</div><div><div className="dst-highlight-title">{h.title}</div><div className="dst-highlight-desc">{h.desc}</div></div></div>
                  ))}
                </div>
              </div>
            )}

            {dest.tips?.length > 0 && (
              <div className="dst-section" id="tips" ref={(el) => (sectionRefs.current['tips'] = el)}>
                <div className="dst-section-title">Traveller Tips</div>
                <div className="dst-tips">
                  {dest.tips.map((t, i) => (<div key={i} className="dst-tip">{t}</div>))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div className="dst-sidebar">
            <div className="dst-book-card">
              <div className="dst-book-title">Fly to {dest.name}</div>
              <div className="dst-book-sub">Search the best fares to {dest.name}{dest.region ? `, ${dest.region.split('·').pop()?.trim()}` : ''}</div>
              <Link href="/flights" className="dst-book-btn">✈ Search Flights</Link>
              <Link href="/hotels" className="dst-book-btn dst-book-btn-alt">🏨 Find Hotels</Link>
            </div>
            {dest.quickInfo?.length > 0 && (
              <div className="dst-info-card">
                <div className="dst-info-head">Quick Info</div>
                {dest.quickInfo.map((q, i) => (<div key={i} className="dst-info-row"><div className="dst-info-lbl">{q.lbl}</div><div className="dst-info-val">{q.val}</div></div>))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
