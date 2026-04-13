'use client';
import Link from 'next/link';
import './Footer.css';

const PLANE_SVG = (
  <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/></svg>
);

const SOCIAL_ICONS = {
  facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
};

const TRAVEL_LINKS = [
  { label: 'Cheap Flights', href: '/flights' },
  { label: 'Hotel Deals', href: '/hotels' },
  { label: 'Car Rentals', href: '/cars' },
  { label: 'Holiday Packages', href: '/packages' },
  { label: 'Cruises', href: '/cruises' },
  { label: 'Activities', href: '/activities' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Deals & Offers', href: '/deals' },
  { label: 'Travel Blog', href: '/blog' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Airlines', href: '/airlines' },
  { label: 'Support', href: '/support' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '/support' },
  { label: 'Manage Booking', href: '#' },
  { label: 'Cancellations', href: '/support' },
  { label: 'Contact Us', href: '/contact' },
];

const POLICY_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <div className="logo-icon">{PLANE_SVG}</div>
              <span className="footer-logo-text">Flight<em>lanes</em></span>
            </Link>
            <p>Your one-stop travel platform for flights, hotels, packages and experiences across 150+ countries.</p>
            <div className="footer-social">
              {Object.entries(SOCIAL_ICONS).map(([name, icon]) => (
                <a key={name} href="#" className="social-btn" aria-label={name}>{icon}</a>
              ))}
            </div>
          </div>

          {/* Travel Column */}
          <div className="footer-col">
            <h4>Travel</h4>
            <ul>
              {TRAVEL_LINKS.map(link => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map(link => (
                <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              {SUPPORT_LINKS.map(link => (
                <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Policies Column */}
          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              {POLICY_LINKS.map(link => (
                <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <div className="footer-disclaimer-label">Disclaimer</div>
          <p>
            Flightlanes is an independent travel booking platform and acts solely as an intermediary between travelers and travel service providers including airlines, hotels, car rental agencies and cruise lines. We are not responsible for changes, cancellations or disruptions caused by the travel service provider. All prices displayed are subject to availability and may change without notice. Taxes, fees and carrier surcharges may apply. Travel insurance is strongly recommended for all bookings. Flightlanes is not a licensed financial advisor, legal advisor or medical advisor — content on this platform is for informational purposes only. By using this website you agree to our Terms &amp; Conditions and Privacy Policy.
          </p>
        </div>

        {/* Policy Links Strip */}
        <div className="footer-policy-strip">
          {POLICY_LINKS.map((link, i) => (
            <span key={link.label}>
              {i > 0 && <span className="footer-policy-sep">|</span>}
              <Link href={link.href}>{link.label}</Link>
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Flightlanes Inc. All rights reserved. 🇺🇸 United States</div>
        </div>
      </div>
    </footer>
  );
}
