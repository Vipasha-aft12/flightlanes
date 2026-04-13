'use client';
import { useState } from 'react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-inner fade-up">
        <div className="section-label">Stay in the Loop</div>
        <h2>Get Exclusive Travel Deals</h2>
        <p>
          Subscribe and be the first to hear about flash sales, secret fares and
          destination guides straight to your inbox.
        </p>

        {submitted ? (
          <div style={{ background: 'var(--ice)', border: '1.5px solid var(--teal)', borderRadius: 12, padding: '18px 24px', color: 'var(--teal)', fontWeight: 700, fontSize: '.95rem' }} role="status">
            ✅ You&apos;re subscribed! Watch your inbox for exclusive deals.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Newsletter signup">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit">Subscribe →</button>
          </form>
        )}

        <div style={{ fontSize: '.78rem', color: 'var(--g400)', marginTop: 12 }}>
          No spam. Unsubscribe any time. We respect your privacy.
        </div>
      </div>
    </div>
  );
}
