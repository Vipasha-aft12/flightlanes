'use client';
import { useState } from 'react';
import { rentalCompanies } from '@/lib/carUtils';

export default function CompanySlider() {
  const [offset, setOffset] = useState(0);
  const maxSlide = Math.max(0, rentalCompanies.length - 4);

  function slide(dir) {
    setOffset((prev) => Math.max(0, Math.min(prev + dir, maxSlide)));
  }

  return (
    <section className="cr-slider-section">
      <div className="section-inner">
        <div className="cr-slider-controls fade-up">
          <div>
            <div className="section-label" style={{ marginBottom: '8px', display: 'inline-block' }}>Top Rental Brands</div>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--g800)', marginBottom: '6px' }}>America&apos;s Leading Car Rental Companies</h2>
            <p style={{ color: 'var(--g600)', fontSize: '.95rem', maxWidth: '520px', lineHeight: 1.65 }}>We partner with 500+ trusted brands so you always compare the best rates.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <button className="cr-view-all">View All Brands →</button>
            <div className="cr-slider-nav">
              <button className="cr-nav-btn" onClick={() => slide(-1)} disabled={offset === 0}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button className="cr-nav-btn" onClick={() => slide(1)} disabled={offset >= maxSlide}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="cr-slider-wrap fade-up">
          <div className="cr-track" style={{ transform: `translateX(-${offset * 25}%)` }}>
            {rentalCompanies.map((co, i) => (
              <div className="cr-company-card" key={i}>
                <div className="cr-company-img">
                  <img src={co.img} alt={co.name} loading="eager" />
                  <div className="cr-company-logo-badge"><span>{co.logo}</span> {co.name}</div>
                </div>
                <div className="cr-company-body">
                  <div className="cr-company-name">{co.name}</div>
                  <div className="cr-company-desc">{co.desc}</div>
                  <div className="cr-company-footer">
                    <div className="cr-company-rate">from <strong>${co.rate}/day</strong></div>
                    <span className={`cr-company-badge ${co.badgeTop ? 'top' : ''}`}>{co.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
