'use client';
import { useEffect, useState } from 'react';
import { useAdmin } from '../layout';

export default function AdminUsersPage() {
  const { user: currentUser } = useAdmin() || {};
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  /* create form */
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' });
  const [saving, setSaving] = useState(false);

  /* reset password modal */
  const [resetFor, setResetFor] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  /* delete confirmation */
  const [deleteId, setDeleteId] = useState(null);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const load = () => {
    setLoading(true);
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { setUsers(d.users || []); setLoading(false); })
      .catch(() => { setLoading(false); flash('Failed to load users'); });
  };
  useEffect(load, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { flash('All fields are required'); return; }
    if (form.password.length < 6) { flash('Password must be at least 6 characters'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');
      flash('Account created — share credentials securely with the user');
      setForm({ name: '', email: '', password: '', role: 'editor' });
      setShowAdd(false);
      load();
    } catch (err) { flash(err.message); }
    setSaving(false);
  };

  const handleResetPassword = async () => {
    if (!resetFor || !newPassword) return;
    if (newPassword.length < 6) { flash('Password must be at least 6 characters'); return; }
    try {
      const res = await fetch(`/api/admin/users/${resetFor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      flash(`Password reset for ${resetFor.email} — share the new password securely`);
      setResetFor(null);
      setNewPassword('');
    } catch (err) { flash(err.message); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/users/${deleteId}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      flash('User deleted');
      load();
    } catch (err) { flash(err.message); }
    setDeleteId(null);
  };

  const handleRoleChange = async (u, newRole) => {
    try {
      const res = await fetch(`/api/admin/users/${u._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      flash('Role updated');
      load();
    } catch (err) { flash(err.message); }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleString() : '—';

  return (
    <div className="au-wrap">
      <style>{`
        .au-wrap { font-family: 'Open Sans', system-ui, sans-serif; color: #111827; }
        .au-toast { position: fixed; top: 20px; right: 20px; background: #0f172a; color: #fff; padding: 10px 16px; border-radius: 8px; font-size: 13px; z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,.15); }
        .au-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; gap: 12px; flex-wrap: wrap; }
        .au-header-left h2 { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
        .au-header-left p { margin: 0; font-size: 13px; color: #6b7280; }
        .au-btn { padding: 9px 16px; border: none; border-radius: 8px; background: #1a56db; color: #fff; font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; }
        .au-btn:hover { background: #1648b8; }
        .au-btn-ghost { background: #fff; color: #374151; border: 1px solid #e5e7eb; }
        .au-btn-ghost:hover { background: #f9fafb; }
        .au-btn-danger { background: #dc2626; }
        .au-btn-danger:hover { background: #b91c1c; }
        .au-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .au-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .au-table th { text-align: left; padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .au-table td { padding: 12px 16px; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        .au-table tr:last-child td { border-bottom: none; }
        .au-name { font-weight: 600; color: #111827; }
        .au-email { font-size: 12px; color: #6b7280; margin-top: 2px; }
        .au-role-pill { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 100px; letter-spacing: .04em; text-transform: uppercase; }
        .au-role-admin { background: #dbeafe; color: #1e40af; }
        .au-role-editor { background: #ecfdf5; color: #065f46; }
        .au-role-select { font-size: 12px; padding: 4px 8px; border: 1px solid #e5e7eb; border-radius: 6px; background: #fff; font-family: inherit; cursor: pointer; }
        .au-actions { display: flex; gap: 6px; }
        .au-icon-btn { background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 5px 9px; font-size: 12px; cursor: pointer; font-family: inherit; color: #374151; }
        .au-icon-btn:hover { background: #f9fafb; border-color: #d1d5db; }
        .au-you-tag { display: inline-block; font-size: 10px; font-weight: 700; color: #d97706; background: #fef3c7; padding: 2px 7px; border-radius: 100px; margin-left: 6px; letter-spacing: .04em; text-transform: uppercase; }
        .au-modal { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .au-modal-card { background: #fff; border-radius: 12px; padding: 24px; max-width: 440px; width: 100%; }
        .au-modal-card h3 { margin: 0 0 6px; font-size: 16px; font-weight: 700; }
        .au-modal-card p { margin: 0 0 16px; font-size: 13px; color: #6b7280; }
        .au-field { margin-bottom: 12px; }
        .au-field label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: #374151; }
        .au-field input, .au-field select { width: 100%; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 7px; font-size: 13px; font-family: inherit; outline: none; box-sizing: border-box; }
        .au-field input:focus, .au-field select:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,.1); }
        .au-modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
        .au-empty { padding: 40px; text-align: center; color: #9ca3af; font-size: 14px; }
      `}</style>

      {toast && <div className="au-toast">{toast}</div>}

      <div className="au-header">
        <div className="au-header-left">
          <h2>Users</h2>
          <p>Create accounts for your SEO executives. Only users on this list can log in.</p>
        </div>
        <button className="au-btn" onClick={() => setShowAdd(true)}>+ Create account</button>
      </div>

      <div className="au-card">
        {loading ? (
          <div className="au-empty">Loading users…</div>
        ) : users.length === 0 ? (
          <div className="au-empty">No users yet. Click &quot;Create account&quot; to add one.</div>
        ) : (
          <table className="au-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Created</th>
                <th style={{ width: 150, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isMe = currentUser && (u._id === currentUser.id || u._id === currentUser._id);
                return (
                  <tr key={u._id}>
                    <td>
                      <div className="au-name">
                        {u.name}
                        {isMe && <span className="au-you-tag">You</span>}
                      </div>
                      <div className="au-email">{u.email}</div>
                    </td>
                    <td>
                      {isMe ? (
                        <span className={`au-role-pill au-role-${u.role}`}>{u.role}</span>
                      ) : (
                        <select
                          className="au-role-select"
                          value={u.role}
                          onChange={e => handleRoleChange(u, e.target.value)}
                        >
                          <option value="admin">admin</option>
                          <option value="editor">editor</option>
                        </select>
                      )}
                    </td>
                    <td style={{ fontSize: 12, color: '#6b7280' }}>{formatDate(u.createdAt)}</td>
                    <td>
                      <div className="au-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="au-icon-btn" onClick={() => { setResetFor(u); setNewPassword(''); }}>
                          Reset password
                        </button>
                        {!isMe && (
                          <button className="au-icon-btn" onClick={() => setDeleteId(u._id)}>
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Create modal */}
      {showAdd && (
        <div className="au-modal" onClick={() => setShowAdd(false)}>
          <div className="au-modal-card" onClick={e => e.stopPropagation()}>
            <h3>Create new account</h3>
            <p>This person will be able to log in using the email and password you set here.</p>
            <form onSubmit={handleCreate}>
              <div className="au-field">
                <label>Full name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
              </div>
              <div className="au-field">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
              </div>
              <div className="au-field">
                <label>Password (min 6 characters)</label>
                <input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Set a strong password" />
              </div>
              <div className="au-field">
                <label>Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="editor">Editor — can manage content</option>
                  <option value="admin">Admin — full access including user management</option>
                </select>
              </div>
              <div className="au-modal-actions">
                <button type="button" className="au-btn au-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
                <button type="submit" className="au-btn" disabled={saving}>{saving ? 'Creating…' : 'Create account'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset password modal */}
      {resetFor && (
        <div className="au-modal" onClick={() => setResetFor(null)}>
          <div className="au-modal-card" onClick={e => e.stopPropagation()}>
            <h3>Reset password</h3>
            <p>Set a new password for <strong>{resetFor.email}</strong>. The old password will stop working.</p>
            <div className="au-field">
              <label>New password</label>
              <input type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Minimum 6 characters" autoFocus />
            </div>
            <div className="au-modal-actions">
              <button className="au-btn au-btn-ghost" onClick={() => setResetFor(null)}>Cancel</button>
              <button className="au-btn" onClick={handleResetPassword}>Reset password</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="au-modal" onClick={() => setDeleteId(null)}>
          <div className="au-modal-card" onClick={e => e.stopPropagation()}>
            <h3>Delete this user?</h3>
            <p>They will lose access immediately. This cannot be undone. Existing login history is kept.</p>
            <div className="au-modal-actions">
              <button className="au-btn au-btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="au-btn au-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
