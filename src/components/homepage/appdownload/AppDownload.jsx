import './AppDownload.css';
const APP_FEATS = [
  { icon: '🔔', text: 'Real-time flight status & gate change alerts' },
  { icon: '📋', text: 'Digital boarding passes & travel documents' },
  { icon: '💰', text: 'App-exclusive deals — up to 20% extra savings' },
  { icon: '🗺️', text: 'Offline maps & travel guides for 150+ cities' },
];

export default function AppDownload() {
  return (
    <section className="app-sec" aria-labelledby="app-heading">
      <div className="app-inner">
        {/* Content */}
        <div className="app-content fade-up">
          <div className="section-label" style={{ background: 'rgba(231,247,247,.15)', color: 'var(--ice)' }}>
            Mobile App
          </div>
          <h2 id="app-heading">Your Travels, Always in Your Pocket</h2>
          <p>Download the Fareoworld app — manage bookings, check in, get real-time flight alerts and earn rewards on the go.</p>

          <div className="app-feats">
            {APP_FEATS.map((f, i) => (
              <div className="app-feat" key={i}>
                <div className="app-feat-icon" aria-hidden="true">{f.icon}</div>
                {f.text}
              </div>
            ))}
          </div>

          <div className="store-btns">
            <button className="store-btn" aria-label="Download on the App Store">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div>
                <span className="store-sub">Download on the</span>
                <span className="store-name">App Store</span>
              </div>
            </button>
            <button className="store-btn" aria-label="Get it on Google Play">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="m3.18 23.76 9.99-9.99-3.18-3.18L3.18 23.76zM20.36 10.2 17.6 8.62l-3.21 3.21 3.2 3.2 2.8-1.6c.8-.46.8-1.77-.03-2.23zM2.08.27A1.07 1.07 0 0 0 2 .73v22.54l.16.55 12.64-12.64v-.26L2.15.21z"/>
              </svg>
              <div>
                <span className="store-sub">Get it on</span>
                <span className="store-name">Google Play</span>
              </div>
            </button>
          </div>

          <div style={{ marginTop: 16, fontSize: '.78rem', color: 'rgba(255,255,255,.4)' }}>
            ⭐⭐⭐⭐⭐ 4.9 rating · 500K+ downloads
          </div>
        </div>

        {/* Phone Mockups */}
        <div className="app-phones fade-up" aria-hidden="true">
          <div className="phone-mock short">
            <div className="phone-screen">
              <div className="phone-logo">Fareoworld</div>
              <div className="phone-route">🗓 My Trips</div>
              <div style={{ fontSize: '.76rem', opacity: .7 }}>JFK → CDG · Jun 14</div>
              <div style={{ fontSize: '.7rem', background: 'rgba(255,255,255,.1)', padding: '7px 11px', borderRadius: 9, width: '100%' }}>
                ✅ Check-in open<br />
                <span style={{ opacity: .7, fontSize: '.66rem' }}>Gate B22 · Terminal 4</span>
              </div>
            </div>
          </div>
          <div className="phone-mock tall">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-logo">✈ Fareoworld</div>
              <div className="phone-route">NYC → Paris</div>
              <div className="phone-price">$349</div>
              <div style={{ fontSize: '.68rem', opacity: .7 }}>Non-stop · 7h 15m</div>
              <button className="phone-btn">Book in 1-tap</button>
              <div style={{ fontSize: '.64rem', opacity: .5 }}>🔒 Secure checkout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
