'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './DealDetailPage.css';

export default function DealDetailPage() {
  const [timeLeft, setTimeLeft] = useState('23:47:12');

  useEffect(() => {
    let h = 23, m = 47, s = 12;
    const timer = setInterval(() => {
      s--;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { clearInterval(timer); return; }
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dealdetail-page">

      {/* Hero */}
      <div className="dd-hero">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=90" alt="Deal" />
        <div className="dd-hero-overlay"></div>
        <div className="dd-hero-content">
          <Link href="/deals" className="lp-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back to Deals
          </Link>
          <div className="dd-badge dd-badge-hot">🔥 48h Flash Deal</div>
          <h1 className="dd-hero-title">New York → London</h1>
          <div className="dd-hero-meta">
            <span>✈ Round Trip · Economy</span>
            <span>🗓 Jun 12 – Jun 26</span>
            <span>British Airways</span>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="dd-layout">
        <div className="dd-main">

          {/* Overview */}
          <div className="dd-section">
            <div className="dd-sec-title">✈ Deal Overview</div>
            <p className="dd-overview-desc">Fly round-trip from New York JFK to London Heathrow on British Airways at an incredible price. This limited-time deal includes checked baggage and in-flight meals.</p>
            <div className="dd-grid-4">
              <div className="dd-detail-card"><div className="dd-detail-icon">✈</div><div className="dd-detail-lbl">Airline</div><div className="dd-detail-val">British Airways</div></div>
              <div className="dd-detail-card"><div className="dd-detail-icon">🛫</div><div className="dd-detail-lbl">Route</div><div className="dd-detail-val">JFK → LHR</div></div>
              <div className="dd-detail-card"><div className="dd-detail-icon">🗓</div><div className="dd-detail-lbl">Travel Dates</div><div className="dd-detail-val">Jun 12 – Jun 26</div></div>
              <div className="dd-detail-card"><div className="dd-detail-icon">💺</div><div className="dd-detail-lbl">Cabin</div><div className="dd-detail-val">Economy</div></div>
            </div>
          </div>

          {/* Included */}
          <div className="dd-section">
            <div className="dd-sec-title">✅ What&apos;s Included</div>
            <div className="dd-incl-grid">
              <div className="dd-incl-item">✅ Round-trip flights</div>
              <div className="dd-incl-item">✅ 1× checked bag (23 kg)</div>
              <div className="dd-incl-item">✅ In-flight meals &amp; drinks</div>
              <div className="dd-incl-item">✅ Seat selection</div>
              <div className="dd-incl-item">✅ Free cancellation within 24h</div>
              <div className="dd-incl-item">✅ All taxes &amp; fees included</div>
            </div>
          </div>

          {/* Terms */}
          <div className="dd-section">
            <div className="dd-sec-title">📋 Terms &amp; Conditions</div>
            <div className="dd-policy-item">⚠ Non-refundable after 24-hour grace period</div>
            <div className="dd-policy-item">⚠ Date changes subject to $75 fee + fare difference</div>
            <div className="dd-policy-item">⚠ Valid for new bookings only — not combinable with other offers</div>
            <div className="dd-policy-item">⚠ Subject to availability — prices may increase at any time</div>
          </div>

          {/* Why book now */}
          <div className="dd-section dd-why-section">
            <div className="dd-sec-title">⚡ Why Book This Deal Now?</div>
            <div className="dd-why-item">🔥 Price is $210 below the average fare for this route</div>
            <div className="dd-why-item">📉 Fares on this route typically increase 40% closer to departure</div>
            <div className="dd-why-item">⏰ This deal expires in less than 48 hours</div>
            <div className="dd-why-item">💺 Only 12 seats remaining at this price</div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="dd-sidebar-col">
          <div className="dd-widget">
            <div className="dd-widget-head">
              <div className="dd-widget-price-lbl">Deal Price — from</div>
              <div className="dd-widget-price">$349</div>
              <div className="dd-widget-per">per person · taxes included</div>
              <div className="dd-widget-save">Save $210 vs regular fare</div>
            </div>
            <div className="dd-widget-body">
              <div className="dd-widget-row"><span>Route</span><strong>JFK → LHR</strong></div>
              <div className="dd-widget-row"><span>Airline</span><strong>British Airways</strong></div>
              <div className="dd-widget-row"><span>Dates</span><strong>Jun 12 – Jun 26</strong></div>
              <div className="dd-widget-row"><span>Cabin</span><strong>Economy</strong></div>
              <Link href="/flights" className="dd-widget-cta">Book This Deal →</Link>
              <div className="dd-countdown">⏰ Deal expires in: <strong>{timeLeft}</strong></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
