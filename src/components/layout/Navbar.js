'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo" style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
            </div>
            Flight<span>lanes</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/flights">Flights</Link></li>
            <li><Link href="/hotels">Hotels</Link></li>
            <li><Link href="/cars">Car Rentals</Link></li>
            <li><Link href="/packages">Packages</Link></li>
            <li><Link href="/cruises">Cruises</Link></li>
            <li><Link href="#" style={{ color: 'var(--orange)', fontWeight: 700 }}>🔥 Deals</Link></li>
          </ul>
          <div className="nav-actions">
            <button className="btn-cta">✈ Book Now — Save up to 40%</button>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link href="/flights" onClick={() => setMenuOpen(false)}>Flights</Link>
        <Link href="/hotels" onClick={() => setMenuOpen(false)}>Hotels</Link>
        <Link href="/cars" onClick={() => setMenuOpen(false)}>Car Rentals</Link>
        <Link href="/packages" onClick={() => setMenuOpen(false)}>Packages</Link>
        <Link href="/cruises" onClick={() => setMenuOpen(false)}>Cruises</Link>
        <div className="mob-divider"></div>
        <div className="mob-cta-wrap">
          <Link href="/flights"><button className="btn-cta" style={{ width: '100%' }}>✈ Book Now — Save 40%</button></Link>
        </div>
      </div>
    </>
  );
}
