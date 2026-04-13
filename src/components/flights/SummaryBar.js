'use client';
import Link from 'next/link';

export default function SummaryBar({ tripType, from, to, dates, travelers, resultCount }) {
  const typeLabel = tripType === 'roundtrip' ? '⇄ Round Trip' : tripType === 'oneway' ? '→ One Way' : '⊞ Multi-City';
  const arrow = tripType === 'roundtrip' ? '⇄' : tripType === 'oneway' ? '→' : '⊞';

  return (
    <div className="fl-summary-bar">
      <div className="fl-summary-inner">
        <div className="fl-search-pill" style={{ background: 'rgba(255,255,255,.25)', fontWeight: 800, borderColor: 'rgba(255,255,255,.4)' }}>
          <span>{typeLabel}</span>
        </div>
        <div className="fl-search-pill">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
          <span>{from}</span>
        </div>
        <span className="fl-search-divider">{arrow}</span>
        <div className="fl-search-pill">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
          <span>{to}</span>
        </div>
        <div className="fl-search-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <span>{dates}</span>
        </div>
        <div className="fl-search-pill">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          <span>{travelers}</span>
        </div>
        <div className="fl-result-count">
          <span className="fl-result-dot"></span>
          <span>✈ {resultCount} flights found</span>
        </div>
        <Link href="/flights" className="fl-modify-btn">✏ Modify Search</Link>
      </div>
    </div>
  );
}
