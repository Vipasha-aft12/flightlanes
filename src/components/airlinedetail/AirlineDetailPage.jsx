'use client';
import { useState } from 'react';
import Link from 'next/link';
import './AirlineDetailPage.css';

const AIRLINE = {
  name: 'Delta Air Lines',
  code: 'DL · SkyTeam Alliance',
  badge: 'US Major Carrier',
  heroImg: 'https://images.unsplash.com/photo-1540339832862-474599807836?w=1600&q=90',
  about: [
    'Delta Air Lines is one of the world\'s oldest and most trusted airlines, founded in 1925. Headquartered in Atlanta, Georgia, Delta operates one of the world\'s largest airline networks with over 5,000 daily flights to 325+ destinations in 52 countries.',
    'Known for its industry-leading on-time performance and customer service, Delta has consistently ranked among the top US carriers. Its SkyMiles loyalty program is one of the most rewarding in the industry, with no blackout dates on award tickets.',
  ],
  stats: [
    { val: '5,000+', label: 'Daily Flights' },
    { val: '325+', label: 'Destinations' },
    { val: '52', label: 'Countries' },
  ],
  features: [
    { icon: '🛡', title: 'SkyMiles Rewards', desc: 'Earn miles on every flight with no expiry dates and no blackout award dates' },
    { icon: '🍽', title: 'In-flight Dining', desc: 'Complimentary meals and snacks on long-haul flights with premium wine selection' },
    { icon: '📶', title: 'Delta Wi-Fi', desc: 'Fast satellite Wi-Fi available on most aircraft for work or entertainment' },
    { icon: '💼', title: 'Delta One', desc: 'Fully lie-flat business class seats with direct aisle access on international routes' },
    { icon: '🎬', title: 'Seatback Entertainment', desc: 'Personal screens on most aircraft with thousands of movies, shows and music' },
    { icon: '🧳', title: 'Baggage Policy', desc: 'First checked bag free for SkyMiles members and credit card holders' },
  ],
  routes: [
    { name: 'New York JFK → London LHR', freq: 'Daily · 7h 10m', price: 'from $449' },
    { name: 'Atlanta ATL → Paris CDG', freq: 'Daily · 9h 25m', price: 'from $499' },
    { name: 'Los Angeles LAX → Tokyo NRT', freq: '4×/week · 11h 30m', price: 'from $699' },
    { name: 'New York JFK → Los Angeles LAX', freq: '30+/day · 5h 30m', price: 'from $189' },
    { name: 'Atlanta ATL → Cancún CUN', freq: 'Daily · 2h 45m', price: 'from $229' },
  ],
};

export default function AirlineDetailPage() {
  return (
    <div className="airlinedetail-page">
      <div className="ald-wrap">

        {/* Hero */}
        <div className="ald-hero">
          <img src={AIRLINE.heroImg} alt={AIRLINE.name} />
          <div className="ald-hero-overlay"></div>
          <div className="ald-hero-content">
            <Link href="/airlines" className="ald-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to Airlines
            </Link>
            <div className="ald-hero-badge">{AIRLINE.badge}</div>
            <h1>{AIRLINE.name}</h1>
            <div className="ald-hero-code">{AIRLINE.code}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ald-inner">
          <div className="ald-main">

            {/* About */}
            <div className="ald-section">
              <div className="ald-section-title">About {AIRLINE.name}</div>
              {AIRLINE.about.map((p, i) => (
                <p key={i} className="ald-about-text">{p}</p>
              ))}
              <div className="ald-stats">
                {AIRLINE.stats.map((s, i) => (
                  <div key={i} className="ald-stat">
                    <div className="ald-stat-val">{s.val}</div>
                    <div className="ald-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="ald-section">
              <div className="ald-section-title">What Makes {AIRLINE.name} Stand Out</div>
              <div className="ald-features">
                {AIRLINE.features.map((f, i) => (
                  <div key={i} className="ald-feature">
                    <div className="ald-feature-icon">{f.icon}</div>
                    <div>
                      <div className="ald-feature-title">{f.title}</div>
                      <div className="ald-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Routes */}
            <div className="ald-section">
              <div className="ald-section-title">Popular Routes</div>
              <div className="ald-routes">
                {AIRLINE.routes.map((r, i) => (
                  <div key={i} className="ald-route">
                    <div>
                      <div className="ald-route-name">{r.name}</div>
                      <div className="ald-route-freq">{r.freq}</div>
                    </div>
                    <div className="ald-route-price">{r.price}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="ald-sidebar">
            <div className="ald-book-card">
              <div className="ald-book-title">Book {AIRLINE.name}</div>
              <div className="ald-book-sub">Search the best fares on {AIRLINE.name} flights</div>
              <Link href="/flights" className="ald-book-btn">✈ Search Flights</Link>
            </div>
            <div className="ald-info-card">
              <div className="ald-info-head">Quick Info</div>
              <div className="ald-info-row"><div className="ald-info-lbl">Alliance</div><div className="ald-info-val">SkyTeam</div></div>
              <div className="ald-info-row"><div className="ald-info-lbl">Hub</div><div className="ald-info-val">Atlanta (ATL)</div></div>
              <div className="ald-info-row"><div className="ald-info-lbl">Founded</div><div className="ald-info-val">1925</div></div>
              <div className="ald-info-row"><div className="ald-info-lbl">Fleet Size</div><div className="ald-info-val">900+ aircraft</div></div>
              <div className="ald-info-row"><div className="ald-info-lbl">Loyalty</div><div className="ald-info-val">SkyMiles</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
