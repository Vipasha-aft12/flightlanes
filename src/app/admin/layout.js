'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

/* ── Admin Auth Context ── */
const AdminContext = createContext(null);
export function useAdmin() { return useContext(AdminContext); }

/* ── Icons (inline SVG to avoid extra deps) ── */
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const icons = {
  dashboard: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10',
  plane: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-2 2 4-1 4-1 2 2-1 4 2-2v-3l3-2 3.7 7.3c.2.4.7.6 1.1.3l.5-.3c.4-.2.6-.7.5-1.1z',
  mapPin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0',
  logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9',
  menu: 'M3 12h18M3 6h18M3 18h18',
  globe: 'M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20 M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10 15 15 0 014-10z',
  chevronDown: 'M6 9l6 6 6-6',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  history: 'M3 3v5h5 M3.05 13A9 9 0 104 5.3L3 8 M12 7v5l4 2',
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
};

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return; }
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(async (d) => {
        /* Role gate: only admin or editor may use the admin panel.
           Anyone else gets logged out and sent to login.
           The server still enforces per-route permissions — editors
           cannot hit /api/admin/users or /api/admin/login-logs. */
        const role = d?.user?.role;
        if (role !== 'admin' && role !== 'editor') {
          await fetch('/api/auth/logout', { method: 'POST' });
          setLoading(false);
          router.push('/admin/login');
          return;
        }
        setUser(d.user);
        setLoading(false);
      })
      .catch(() => { setLoading(false); router.push('/admin/login'); });
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/admin/login');
  };

  /* Login page renders children directly (no shell) */
  if (isLoginPage) {
    return (
      <>
        <style>{`nav, .site-footer, .chat-btn, .flo-overlay { display: none !important; }`}</style>
        <AdminContext.Provider value={{ user, setUser }}>
          {children}
        </AdminContext.Provider>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <style>{`nav, .site-footer, .chat-btn, .flo-overlay { display: none !important; }`}</style>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fc', fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          <p style={{ color: '#6b7280', fontSize: 15 }}>Loading admin...</p>
        </div>
      </>
    );
  }

  const nav = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: icons.dashboard },
    { href: '/admin/airlines', label: 'Airlines', icon: icons.plane },
    { href: '/admin/destinations', label: 'Destinations', icon: icons.mapPin },
    { href: '/admin/blogs', label: 'Blogs', icon: icons.globe },
    /* Admin-only items — hidden from editors. Server also enforces this. */
    ...(user?.role === 'admin' ? [
      { href: '/admin/users', label: 'Users', icon: icons.users },
      { href: '/admin/activity-logs', label: 'Content activity', icon: icons.activity },
      { href: '/admin/login-logs', label: 'Login history', icon: icons.history },
    ] : []),
  ];

  return (
    <>
      {/* Hide main site chrome */}
      <style>{`
        nav, .site-footer, .chat-btn, .flo-overlay { display: none !important; }
        .admin-shell { display: flex; min-height: 100vh; font-family: 'Open Sans', system-ui, sans-serif; background: #f8f9fc; }
        .admin-sidebar { width: ${sidebarOpen ? 240 : 0}px; background: #0f172a; color: #fff; display: flex; flex-direction: column; transition: width .2s; overflow: hidden; flex-shrink: 0; }
        .admin-sidebar-brand { padding: 20px; border-bottom: 1px solid rgba(255,255,255,.08); display: flex; align-items: center; gap: 10px; white-space: nowrap; }
        .admin-sidebar-brand span { font-size: 18px; font-weight: 800; letter-spacing: -.02em; }
        .admin-sidebar-brand i { color: #60a5fa; font-style: italic; }
        .admin-nav-label { font-size: 11px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: .08em; padding: 16px 20px 8px; }
        .admin-nav-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 20px; border: none; background: transparent; color: #94a3b8; font-size: 14px; font-family: inherit; cursor: pointer; white-space: nowrap; transition: all .1s; border-right: 3px solid transparent; text-decoration: none; }
        .admin-nav-btn:hover { color: #cbd5e1; background: rgba(255,255,255,.04); }
        .admin-nav-btn.active { background: rgba(96,165,250,.12); color: #60a5fa; font-weight: 600; border-right-color: #60a5fa; }
        .admin-user { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,.08); margin-top: auto; }
        .admin-user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .admin-user-avatar { width: 32px; height: 32px; border-radius: 50%; background: #1e3a5f; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #60a5fa; }
        .admin-user-name { font-size: 13px; font-weight: 600; white-space: nowrap; }
        .admin-user-email { font-size: 11px; color: #64748b; white-space: nowrap; }
        .admin-logout { display: flex; align-items: center; gap: 6px; background: none; border: none; color: #94a3b8; font-size: 13px; cursor: pointer; font-family: inherit; padding: 0; }
        .admin-logout:hover { color: #e2e8f0; }
        .admin-main { flex: 1; overflow: auto; }
        .admin-topbar { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .admin-topbar h1 { margin: 0; font-size: 18px; font-weight: 700; color: #111827; }
        .admin-topbar-left { display: flex; align-items: center; gap: 12px; }
        .admin-menu-btn { background: none; border: none; cursor: pointer; color: #6b7280; display: flex; padding: 4px; }
        .admin-site-link { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #1a56db; text-decoration: none; font-weight: 500; }
        .admin-content { padding: 28px; }
        @media (max-width: 768px) {
          .admin-sidebar { position: fixed; z-index: 100; height: 100vh; }
        }
      `}</style>

      <AdminContext.Provider value={{ user, setUser }}>
        <div className="admin-shell">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-brand">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><path d={icons.plane} /></svg>
              <span>Fareo<i>world</i></span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="admin-nav-label">Content</div>
              {nav.map(n => (
                <Link key={n.href} href={n.href} className={`admin-nav-btn ${pathname.startsWith(n.href) ? 'active' : ''}`}>
                  <Icon d={n.icon} size={18} />{n.label}
                </Link>
              ))}
            </div>
            <div className="admin-user">
              <div className="admin-user-info">
                <div className="admin-user-avatar">{user?.name?.[0] || 'A'}</div>
                <div>
                  <div className="admin-user-name">{user?.name}</div>
                  <div className="admin-user-email">{user?.email}</div>
                </div>
              </div>
              <button className="admin-logout" onClick={handleLogout}>
                <Icon d={icons.logout} size={14} /> Sign out
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="admin-main">
            <div className="admin-topbar">
              <div className="admin-topbar-left">
                <button className="admin-menu-btn" onClick={() => setSidebarOpen(p => !p)}>
                  <Icon d={icons.menu} size={20} />
                </button>
                <h1>{nav.find(n => pathname.startsWith(n.href))?.label || 'Admin'}</h1>
              </div>
              <a href="https://fareoworld.vercel.app" target="_blank" rel="noreferrer" className="admin-site-link">
                <Icon d={icons.globe} size={14} /> View site
              </a>
            </div>
            <div className="admin-content">
              {children}
            </div>
          </main>
        </div>
      </AdminContext.Provider>
    </>
  );
}
