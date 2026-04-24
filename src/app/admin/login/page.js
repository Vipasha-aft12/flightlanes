'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  /* null = still checking, true = show Create account tab, false = hide it */
  const [needsBootstrap, setNeedsBootstrap] = useState(null);

  useEffect(() => {
    fetch('/api/auth/bootstrap-status')
      .then(r => r.json())
      .then(d => setNeedsBootstrap(!!d.needsBootstrap))
      .catch(() => setNeedsBootstrap(false));
  }, []);

  /* If the system is already bootstrapped, force login mode */
  useEffect(() => {
    if (needsBootstrap === false && mode !== 'login') setMode('login');
  }, [needsBootstrap, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('All fields are required');
    if (mode === 'signup' && !name) return setError('Name is required');

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const body = mode === 'login' ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .al-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%); font-family: 'Open Sans', system-ui, sans-serif; padding: 20px; }
        .al-card { width: 100%; max-width: 420px; }
        .al-brand { text-align: center; margin-bottom: 32px; }
        .al-brand-name { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -.03em; }
        .al-brand-name i { color: #60a5fa; font-style: italic; }
        .al-brand-sub { color: #94a3b8; font-size: 14px; margin-top: 4px; }
        .al-form { background: #fff; border-radius: 16px; padding: 36px 32px; box-shadow: 0 25px 50px rgba(0,0,0,.25); }
        .al-tabs { display: flex; gap: 4px; background: #f3f4f6; border-radius: 8px; padding: 3px; margin-bottom: 28px; }
        .al-tab { flex: 1; padding: 9px 0; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all .15s; }
        .al-tab.active { background: #fff; color: #111827; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
        .al-tab:not(.active) { background: transparent; color: #6b7280; }
        .al-field { margin-bottom: 16px; }
        .al-field label { display: block; font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 5px; }
        .al-field input { width: 100%; padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; box-sizing: border-box; }
        .al-field input:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,.1); }
        .al-error { color: #dc2626; font-size: 13px; margin: 0 0 12px; font-weight: 500; }
        .al-btn { width: 100%; padding: 12px 0; border: none; border-radius: 8px; background: #1a56db; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; transition: background .15s; margin-top: 4px; }
        .al-btn:hover { background: #1648b8; }
        .al-btn:disabled { opacity: .5; cursor: not-allowed; }
        .al-hint { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px; }
        .al-bootstrap-banner { background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; margin-bottom: 18px; font-size: 12px; color: #92400e; line-height: 1.55; }
      `}</style>

      <div className="al-wrap">
        <div className="al-card">
          <div className="al-brand">
            <div style={{ marginBottom: 8 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-2 2 4-1 4-1 2 2-1 4 2-2v-3l3-2 3.7 7.3c.2.4.7.6 1.1.3l.5-.3c.4-.2.6-.7.5-1.1z" />
              </svg>
              <span className="al-brand-name">Flight<i>lanes</i></span>
            </div>
            <div className="al-brand-sub">Content management system</div>
          </div>

          <div className="al-form">
            {/* Only show the tab switcher during bootstrap (empty DB) */}
            {needsBootstrap && (
              <div className="al-bootstrap-banner">
                <strong>First-time setup:</strong> no admin account exists yet. Create the first admin below. After that, signup will be closed and only accounts you create from the admin panel can log in.
              </div>
            )}
            {needsBootstrap && (
              <div className="al-tabs">
                <button type="button" className={`al-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError(''); }}>Sign in</button>
                <button type="button" className={`al-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => { setMode('signup'); setError(''); }}>Create first admin</button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <div className="al-field">
                  <label>Full name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
                </div>
              )}
              <div className="al-field">
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@fareoworld.com" />
              </div>
              <div className="al-field">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              {error && <p className="al-error">{error}</p>}
              <button type="submit" className="al-btn" disabled={loading || needsBootstrap === null}>
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create admin account'}
              </button>
            </form>

            {!needsBootstrap && needsBootstrap !== null && (
              <p className="al-hint">Accounts are created by your administrator. Contact them if you need access.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
