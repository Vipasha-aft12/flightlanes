'use client';
import { useState, useEffect } from 'react';
import './AuthModal.css';

export default function AuthModal({ open, defaultTab = 'login', onClose }) {
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => { setTab(defaultTab); }, [defaultTab]);

  /* Close on Escape */
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay open"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'login' ? 'Sign In' : 'Create Account'}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="tab-toggle" role="tablist">
          <button
            className={`tt-btn${tab === 'login' ? ' active' : ''}`}
            onClick={() => setTab('login')}
            role="tab"
            aria-selected={tab === 'login'}
          >
            Sign In
          </button>
          <button
            className={`tt-btn${tab === 'signup' ? ' active' : ''}`}
            onClick={() => setTab('signup')}
            role="tab"
            aria-selected={tab === 'signup'}
          >
            Join Free
          </button>
        </div>

        {tab === 'login' ? (
          <>
            <h2>Welcome back!</h2>
            <p>Sign in to access your bookings, saved trips and loyalty rewards.</p>
            <div className="modal-form">
              <input type="email" placeholder="Email address" autoComplete="email" aria-label="Email address" />
              <input type="password" placeholder="Password" autoComplete="current-password" aria-label="Password" />
              <button className="btn-primary" style={{ height: 48, fontSize: '.95rem', borderRadius: 10, width: '100%' }}>
                Sign In
              </button>
              <div className="divider-or">or</div>
              <button className="btn-ghost" style={{ height: 44, fontSize: '.88rem', width: '100%' }}>
                Continue with Google
              </button>
              <div style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--g400)' }}>
                <a href="#" style={{ color: 'var(--teal)' }}>Forgot your password?</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>Create Account</h2>
            <p>Join free and start earning Flightlanes Rewards points on every booking.</p>
            <div className="modal-form">
              <input type="text" placeholder="Full name" autoComplete="name" aria-label="Full name" />
              <input type="email" placeholder="Email address" autoComplete="email" aria-label="Email address" />
              <input type="password" placeholder="Create password" autoComplete="new-password" aria-label="Create password" />
              <button className="btn-primary" style={{ height: 48, fontSize: '.95rem', borderRadius: 10, width: '100%' }}>
                Create Free Account
              </button>
              <div style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--g400)', marginTop: 8 }}>
                By joining you agree to our{' '}
                <a href="#" style={{ color: 'var(--teal)' }}>Terms</a> &amp;{' '}
                <a href="#" style={{ color: 'var(--teal)' }}>Privacy Policy</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
