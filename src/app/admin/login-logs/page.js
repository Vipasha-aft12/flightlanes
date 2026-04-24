'use client';
import { useEffect, useState } from 'react';

export default function LoginLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [emailFilter, setEmailFilter] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');

  const limit = 50;

  const load = (p = page, email = appliedFilter) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(p), limit: String(limit) });
    if (email) params.set('email', email);
    fetch(`/api/admin/login-logs?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        setLogs(d.logs || []);
        setPages(d.pages || 1);
        setTotal(d.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(page, appliedFilter); }, [page, appliedFilter]);

  const applyFilter = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedFilter(emailFilter.trim().toLowerCase());
  };

  const clearFilter = () => {
    setEmailFilter('');
    setAppliedFilter('');
    setPage(1);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleString() : '—';

  return (
    <div className="lh-wrap">
      <style>{`
        .lh-wrap { font-family: 'Open Sans', system-ui, sans-serif; color: #111827; }
        .lh-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; gap: 12px; flex-wrap: wrap; }
        .lh-header-left h2 { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
        .lh-header-left p { margin: 0; font-size: 13px; color: #6b7280; }
        .lh-filter { display: flex; gap: 8px; align-items: center; }
        .lh-filter input { padding: 7px 12px; border: 1px solid #e5e7eb; border-radius: 7px; font-size: 13px; font-family: inherit; outline: none; min-width: 220px; }
        .lh-filter input:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,.1); }
        .lh-btn { padding: 7px 14px; border: none; border-radius: 7px; background: #1a56db; color: #fff; font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; }
        .lh-btn:hover { background: #1648b8; }
        .lh-btn-ghost { background: #fff; color: #374151; border: 1px solid #e5e7eb; }
        .lh-btn-ghost:hover { background: #f9fafb; }
        .lh-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .lh-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .lh-table th { text-align: left; padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .lh-table td { padding: 11px 16px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
        .lh-table tr:last-child td { border-bottom: none; }
        .lh-name { font-weight: 600; color: #111827; }
        .lh-email { font-size: 12px; color: #6b7280; }
        .lh-role-pill { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px; letter-spacing: .04em; text-transform: uppercase; }
        .lh-role-admin { background: #dbeafe; color: #1e40af; }
        .lh-role-editor { background: #ecfdf5; color: #065f46; }
        .lh-ip { font-family: 'SF Mono', Menlo, monospace; font-size: 12px; color: #374151; }
        .lh-ua { font-size: 11px; color: #6b7280; max-width: 260px; word-break: break-word; }
        .lh-pagination { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #f3f4f6; background: #fafbfc; font-size: 12px; color: #6b7280; }
        .lh-page-btns { display: flex; gap: 6px; }
        .lh-page-btn { padding: 5px 11px; border: 1px solid #e5e7eb; border-radius: 6px; background: #fff; font-size: 12px; cursor: pointer; font-family: inherit; color: #374151; }
        .lh-page-btn:disabled { opacity: .45; cursor: not-allowed; }
        .lh-page-btn:not(:disabled):hover { background: #f9fafb; }
        .lh-empty { padding: 40px; text-align: center; color: #9ca3af; font-size: 14px; }
      `}</style>

      <div className="lh-header">
        <div className="lh-header-left">
          <h2>Login history</h2>
          <p>Every successful login is recorded below — who, when, from where.</p>
        </div>
        <form className="lh-filter" onSubmit={applyFilter}>
          <input
            type="email"
            placeholder="Filter by email…"
            value={emailFilter}
            onChange={e => setEmailFilter(e.target.value)}
          />
          <button className="lh-btn" type="submit">Apply</button>
          {appliedFilter && <button className="lh-btn lh-btn-ghost" type="button" onClick={clearFilter}>Clear</button>}
        </form>
      </div>

      <div className="lh-card">
        {loading ? (
          <div className="lh-empty">Loading login history…</div>
        ) : logs.length === 0 ? (
          <div className="lh-empty">
            {appliedFilter ? `No logins found for "${appliedFilter}".` : 'No logins recorded yet.'}
          </div>
        ) : (
          <>
            <table className="lh-table">
              <thead>
                <tr>
                  <th style={{ width: 200 }}>When</th>
                  <th>User</th>
                  <th style={{ width: 95 }}>Role</th>
                  <th style={{ width: 160 }}>IP address</th>
                  <th>Device / browser</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id}>
                    <td style={{ fontSize: 12, color: '#374151' }}>{formatDate(log.loggedAt)}</td>
                    <td>
                      <div className="lh-name">{log.name || '—'}</div>
                      <div className="lh-email">{log.email}</div>
                    </td>
                    <td>
                      {log.role && <span className={`lh-role-pill lh-role-${log.role}`}>{log.role}</span>}
                    </td>
                    <td className="lh-ip">{log.ip || '—'}</td>
                    <td className="lh-ua">{log.userAgent || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="lh-pagination">
              <div>Showing page {page} of {pages} · {total.toLocaleString()} total logins</div>
              <div className="lh-page-btns">
                <button className="lh-page-btn" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                  ← Previous
                </button>
                <button className="lh-page-btn" disabled={page >= pages} onClick={() => setPage(p => Math.min(pages, p + 1))}>
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
