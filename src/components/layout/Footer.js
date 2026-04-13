import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ color: 'white' }}>
              <div className="logo-icon">
                <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white" /></svg>
              </div>
              Flight<span style={{ color: 'var(--gold)' }}>lanes</span>
            </div>
            <p>Your one-stop travel platform for flights, hotels, packages and experiences across 150+ countries.</p>
            <div className="footer-social">
              <div className="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></div>
              <div className="social-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></div>
              <div className="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></div>
              <div className="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg></div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Travel</h4>
            <ul>
              <li><Link href="/flights">Cheap Flights</Link></li>
              <li><Link href="/hotels">Hotel Deals</Link></li>
              <li><Link href="/cars">Car Rentals</Link></li>
              <li><Link href="/packages">Holiday Packages</Link></li>
              <li><Link href="/cruises">Cruises</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Deals &amp; Offers</Link></li>
              <li><Link href="#">Travel Blog</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link href="#">Help Center / FAQ</Link></li>
              <li><Link href="#">Manage Booking</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2025 Flightlanes Inc. All rights reserved. 🇺🇸 United States</div>
          <div className="trust-badges">
            <div className="tbadge">🔒 SSL Secure</div>
            <div className="tbadge">✓ PCI Compliant</div>
            <div className="tbadge">🌐 IATA Accredited</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
