'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /* Close mobile menu on route change or resize */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav>
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="logo d-flex justify-center" aria-label="Fareoworld Home">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <p className='mb-0'>Fareo<span>world</span></p>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/airlines">Airlines</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/deals">Deals</Link></li>
            <li><Link href="/support">Customer Support</Link></li>
          </ul>

          {/* Right Side Actions */}
          <div className="nav-actions">
            <Link href="/#search" className="btn-cta">
              ✈ Book Now — Save up to 40%
            </Link>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="navigation"
        aria-label="Mobile menu"
      >
        <Link href="/destinations" onClick={closeMenu}>🌍 Destinations</Link>
        <Link href="/airlines" onClick={closeMenu}>✈ Airlines</Link>
        <Link href="/blog" onClick={closeMenu}>📝 Blog</Link>
        <Link href="/deals" onClick={closeMenu}>🏷 Deals &amp; Offers</Link>
        <Link href="/support" onClick={closeMenu}>☎ Customer Support</Link>
        <div className="mob-divider" /> 
        <Link href="/flights" onClick={closeMenu}>✈ Flights</Link>
        <Link href="/hotels" onClick={closeMenu}>🏨 Hotels</Link>
        <Link href="/car-rentals/" onClick={closeMenu}>🚗 Car Rentals</Link>
        <Link href="/packages" onClick={closeMenu}>🎁 Packages</Link>
        <Link href="/cruises" onClick={closeMenu}>🚢 Cruises</Link>
        <Link href="/activities" onClick={closeMenu}>🎯 Activities</Link>
        <div className="mob-divider" />
        <Link href="/about" onClick={closeMenu}>ℹ️ About Us</Link>
        <Link href="/contact" onClick={closeMenu}>📞 Contact</Link>
        <div className="mob-divider" />
       {/**  <div className="mob-cta-wrap">
          <Link href="/" onClick={closeMenu}>
            ✈ Book Now — Save up to 40%
          </Link>
        </div> */}
      </div>
    </>
  );
}
