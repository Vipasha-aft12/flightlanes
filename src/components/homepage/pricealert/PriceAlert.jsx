'use client';
import { useState } from 'react';
import './PriceAlert.css';

export default function PriceAlert() {
  const [destination, setDestination] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="alert-bg" aria-labelledby="alert-heading">
      <div className="section-inner">
        <div className="fade-up">
          <div className="section-label" style={{ background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.9)' }}>
            Never Miss a Deal
          </div>
          <h2 id="alert-heading">Set a Price Alert — We&apos;ll Notify You</h2>
          <p>Tell us your destination and budget. We watch prices 24/7 and email you the moment fares drop.</p>

          {submitted ? (
            <div style={{ background: 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 11, padding: '18px 24px', color: 'white', fontWeight: 700, fontSize: '.95rem', maxWidth: 520, margin: '0 auto', textAlign: 'center' }} role="status">
              ✅ Alert set! We&apos;ll email you the moment prices drop.
            </div>
          ) : (
            <form className="alert-form" onSubmit={handleSubmit} aria-label="Price alert signup">
              <input type="text" placeholder="Where do you want to go?" value={destination} onChange={e => setDestination(e.target.value)} aria-label="Destination" />
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required aria-label="Email address" />
              <button type="submit">🔔 Set Alert — Free</button>
            </form>
          )}

          <div className="alert-feats" aria-label="Price alert features">
            <div className="alert-feat">✅ Instant email notifications</div>
            <div className="alert-feat">✅ Track multiple routes</div>
            <div className="alert-feat">✅ 100% free, cancel anytime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
