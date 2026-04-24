'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  /* filters */
  const [emailFilter, setEmailFilter] = useState('');
  const [appliedEmail, setAppliedEmail] = useState('');
  const [contentType, setContentType] = useState('');
  const [action, setAction] = useState('');

  const limit = 50;

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (appliedEmail) params.set('email', appliedEmail);
    if (contentType) params.set('contentType', contentType);
    if (action) params.set('action', action);
    fetch(`/api/admin/activity-logs?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        setLogs(d.logs || []);
        setPages(d.pages || 1);
        setTotal(d.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(load, [page, appliedEmail, contentType, action]);

  const applyEmail = (e) => { e.preventDefault(); setPage(1); setAppliedEmail(emailFilter.trim().toLowerCase()); };
  const clearAll = () => { setEmailFilter(''); setAppliedEmail(''); setContentType(''); setAction(''); setPage(1); };

  const formatDate = (d) => d ? new Date(d).toLocaleString() : '—';

  /* Pick a link to the live content page where possible */
  const contentLink = (log) => {
    if (log.action === 'deleted' || !log.contentSlug) return null;
    const base = { airline: '/airlines/', destination: '/destinations/', blog: '/blog/' }[log.contentType];
    return base ? `${base}${log.contentSlug}` : null;
  };

  return (
    <div className="al-wrap">
      <style>{`
        .al-wrap { font-family: 'Open Sans', system-ui, sans-serif; color: #111827; }
        .al-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; gap: 12px; flex-wrap: wrap; }
        .al-header-left h2 { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
        .al-header-left p { margin: 0; font-size: 13px; color: #6b7280; }
        .al-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; align-items: center; }
        .al-filters input, .al-filters select { padding: 7px 12px; border: 1px solid #e5e7eb; border-radius: 7px; font-size: 13px; font-family: inherit; outline: none; background: #fff; }
        .al-filters input:focus, .al-filters select:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,.1); }
        .al-filters input[type="email"] { min-width: 220px; }
        .al-btn { padding: 7px 14px; border: none; border-radius: 7px; background: #1a56db; color: #fff; font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; }
        .al-btn:hover { background: #1648b8; }
        .al-btn-ghost { background: #fff; color: #374151; border: 1px solid #e5e7eb; }
        .al-btn-ghost:hover { background: #f9fafb; }
        .al-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .al-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .al-table th { text-align: left; padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .al-table td { padding: 11px 16px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
        .al-table tr:last-child td { border-bottom: none; }
        .al-user-name { font-weight: 600; color: #111827; }
        .al-user-email { font-size: 12px; color: #6b7280; }
        .al-pill { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 100px; letter-spacing: .04em; text-transform: uppercase; }
        .al-action-created { background: #dbeafe; color: #1e40af; }
        .al-action-updated { background: #fef3c7; color: #92400e; }
        .al-action-published { background: #dcfce7; color: #166534; }
        .al-action-unpublished { background: #fee2e2; color: #991b1b; }
        .al-action-deleted { background: #fce7f3; color: #9f1239; }
        .al-type-pill { background: #f3f4f6; color: #374151; font-weight: 600; }
        .al-content-title { font-weight: 600; color: #111827; }
        .al-content-link { color: #1a56db; text-decoration: none; font-size: 12px; }
        .al-content-link:hover { text-decoration: underline; }
        .al-pagination { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #f3f4f6; background: #fafbfc; font-size: 12px; color: #6b7280; }
        .al-page-btns { display: flex; gap: 6px; }
        .al-page-btn { padding: 5px 11px; border: 1px solid #e5e7eb; border-radius: 6px; background: #fff; font-size: 12px; cursor: pointer; font-family: inherit; color: #374151; }
        .al-page-btn:disabled { opacity: .45; cursor: not-allowed; }
        .al-page-btn:not(:disabled):hover { background: #f9fafb; }
        .al-empty { padding: 40px; text-align: center; color: #9ca3af; font-size: 14px; }
      `}</style>

      <div className="al-header">
        <div className="al-header-left">
          <h2>Content activity</h2>
          <p>Every create, edit, publish, unpublish, and delete action is recorded below.</p>
        </div>
      </div>

      <div className="al-filters">
        <form onSubmit={applyEmail} style={{ display: 'flex', gap: 8 }}>
          <input type="email" placeholder="Filter by user email…" value={emailFilter} onChange={e => setEmailFilter(e.target.value)} />
          <button type="submit" className="al-btn">Apply</button>
        </form>
        <select value={contentType} onChange={e => { setPage(1); setContentType(e.target.value); }}>
          <option value="">All content types</option>
          <option value="airline">Airlines</option>
          <option value="destination">Destinations</option>
          <option value="blog">Blogs</option>
        </select>
        <select value={action} onChange={e => { setPage(1); setAction(e.target.value); }}>
          <option value="">All actions</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="deleted">Deleted</option>
        </select>
        {(appliedEmail || contentType || action) && (
          <button className="al-btn al-btn-ghost" onClick={clearAll}>Clear filters</button>
        )}
      </div>

      <div className="al-card">
        {loading ? (
          <div className="al-empty">Loading activity…</div>
        ) : logs.length === 0 ? (
          <div className="al-empty">No activity recorded matches these filters.</div>
        ) : (
          <>
            <table className="al-table">
              <thead>
                <tr>
                  <th style={{ width: 180 }}>When</th>
                  <th style={{ width: 200 }}>Who</th>
                  <th style={{ width: 120 }}>Action</th>
                  <th style={{ width: 110 }}>Type</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const link = contentLink(log);
                  return (
                    <tr key={log._id}>
                      <td style={{ fontSize: 12, color: '#374151' }}>{formatDate(log.performedAt)}</td>
                      <td>
                        <div className="al-user-name">{log.userName || '—'}</div>
                        <div className="al-user-email">{log.userEmail || '—'}</div>
                      </td>
                      <td>
                        <span className={`al-pill al-action-${log.action}`}>{log.action}</span>
                      </td>
                      <td>
                        <span className="al-pill al-type-pill">{log.contentType}</span>
                      </td>
                      <td>
                        <div className="al-content-title">{log.contentTitle || '(no title)'}</div>
                        {link ? (
                          <Link href={link} className="al-content-link" target="_blank" rel="noopener">
                            View on site →
                          </Link>
                        ) : (
                          <span style={{ fontSize: 12, color: '#9ca3af' }}>{log.action === 'deleted' ? 'Deleted' : 'No link'}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="al-pagination">
              <div>Page {page} of {pages} · {total.toLocaleString()} total events</div>
              <div className="al-page-btns">
                <button className="al-page-btn" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>← Previous</button>
                <button className="al-page-btn" disabled={page >= pages} onClick={() => setPage(p => Math.min(pages, p + 1))}>Next →</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
