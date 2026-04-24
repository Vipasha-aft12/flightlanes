'use client';
import { useState, useEffect } from 'react';

/* ── Empty form template ── */
const emptyForm = () => ({
  name: '', slug: '', continent: 'asia', region: '', flag: '', tagline: '',
  heroImg: '', cardImg: '',
  about: [''], stats: [{ val: '', label: '' }],
  highlights: [{ icon: '', title: '', desc: '' }],
  tips: [''],
  quickInfo: [{ lbl: '', val: '' }],
  status: 'draft',
});

/* ── Cloudinary upload helper ── */
async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
  if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Upload failed'); }
  return (await res.json()).url;
}

const CONTINENT_LABELS = { asia: 'Asia', europe: 'Europe', americas: 'Americas', 'middle-east': 'Middle East', africa: 'Africa', pacific: 'Pacific' };

export default function AdminDestinationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');
  const [toast, setToast] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/destinations')
      .then(r => r.json())
      .then(d => { setItems(d.destinations || []); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(load, []);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleImgUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(field);
    try {
      const url = await uploadImage(file);
      set(field, url);
      flash('Image uploaded to Cloudinary');
    } catch (err) {
      flash('Upload failed: ' + err.message);
    }
    setUploading('');
  };

  const openAdd = () => { setForm(emptyForm()); setEditId(null); setView('form'); };
  const openEdit = (d) => {
    setForm({
      ...d,
      about: d.about?.length ? d.about : [''],
      stats: d.stats?.length ? d.stats : [{ val: '', label: '' }],
      highlights: d.highlights?.length ? d.highlights : [{ icon: '', title: '', desc: '' }],
      tips: d.tips?.length ? d.tips : [''],
      quickInfo: d.quickInfo?.length ? d.quickInfo : [{ lbl: '', val: '' }],
    });
    setEditId(d._id);
    setView('form');
  };

  const handleSave = async () => {
    if (!form.name || !form.region || !form.heroImg) {
      flash('Name, region, and hero image are required');
      return;
    }
    setSaving(true);
    const slug = form.slug || slugify(form.name);
    const body = {
      ...form, slug,
      about: form.about.filter(Boolean),
      stats: form.stats.filter(s => s.val),
      highlights: form.highlights.filter(h => h.title),
      tips: form.tips.filter(Boolean),
      quickInfo: form.quickInfo.filter(q => q.lbl),
    };
    delete body._id; delete body.__v; delete body.createdAt; delete body.updatedAt;

    try {
      const url = editId ? `/api/admin/destinations/${editId}` : '/api/admin/destinations';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      flash(editId ? 'Destination updated successfully' : 'Destination created successfully');
      setView('list');
      load();
    } catch (err) {
      flash(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/destinations/${deleteId}`, { method: 'DELETE' });
      flash('Destination deleted');
      load();
    } catch { flash('Delete failed'); }
    setDeleteId(null);
  };

  /* ── Quick publish/unpublish toggle (inline in list view) ── */
  const togglePublish = async (destination) => {
    const nextStatus = destination.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/destinations/${destination._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed');
      }
      flash(nextStatus === 'published' ? 'Published — now live on site' : 'Unpublished');
      load();
    } catch (err) { flash(err.message); }
  };

  const updateArr = (key, idx, field, val) => {
    setForm(prev => {
      const arr = [...prev[key]];
      if (typeof arr[idx] === 'string') arr[idx] = val;
      else arr[idx] = { ...arr[idx], [field]: val };
      return { ...prev, [key]: arr };
    });
  };
  const addRow = (key, template) => setForm(prev => ({ ...prev, [key]: [...prev[key], template] }));
  const removeRow = (key, idx) => setForm(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== idx) }));

  const filtered = items.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.region?.toLowerCase().includes(search.toLowerCase())
  );

  /* ════════════════════════════════ RENDER ════════════════════════════════ */
  return (
    <>
      <style>{`
        .at{position:fixed;top:20px;right:20px;z-index:2000;padding:12px 20px;border-radius:10px;background:#16a34a;color:#fff;font-size:14px;font-weight:600;box-shadow:0 4px 24px rgba(0,0,0,.12);animation:af .2s ease}
        @keyframes af{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .ac{background:#fff;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.06);border:1px solid #e5e7eb}
        .atb{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e5e7eb;flex-wrap:wrap;gap:10px}
        .asr{display:flex;align-items:center;gap:8px;flex:1 1 240px;background:#f9fafb;border-radius:8px;padding:8px 12px;border:1px solid #e5e7eb}
        .asr input{border:none;background:transparent;outline:none;font-size:14px;font-family:inherit;width:100%;color:#111827}
        .ab{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600;font-size:14px;padding:9px 18px;transition:all .15s}
        .abp{background:#1a56db;color:#fff}.abp:hover{background:#1648b8}.abp:disabled{opacity:.5;cursor:not-allowed}
        .abs{background:#f3f4f6;color:#111827}.abd{background:#dc2626;color:#fff}.abg{background:transparent;color:#6b7280;padding:6px 8px}
        table{width:100%;border-collapse:collapse;font-size:14px}
        th{text-align:left;padding:12px 16px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #e5e7eb;white-space:nowrap}
        td{padding:14px 16px;color:#111827;vertical-align:middle;border-bottom:1px solid #f3f4f6}
        tr:hover td{background:#f9fafb}
        .anc{display:flex;align-items:center;gap:12px}.anc img{width:44px;height:44px;border-radius:8px;object-fit:cover}
        .anp{font-weight:600}.ans{font-size:12px;color:#6b7280}
        .abg2{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
        .bgr{background:#f0fdf4;color:#16a34a}.bam{background:#fffbeb;color:#d97706}.bbl{background:#e8effc;color:#1a56db}
        .aac{display:flex;gap:4px;justify-content:flex-end}
        .afh{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #e5e7eb;flex-wrap:wrap;gap:10px}
        .afg{padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:0 24px}
        @media(max-width:768px){.afg{grid-template-columns:1fr}}
        .afl{grid-column:1/-1}
        .af{margin-bottom:16px}.af label{display:block;font-size:13px;font-weight:600;color:#111827;margin-bottom:5px}
        .af input,.af textarea,.af select{width:100%;padding:10px 14px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box}
        .af textarea{resize:vertical;line-height:1.6}.af select{background:#fff}
        .af input:focus,.af textarea:focus{border-color:#1a56db}
        .ahn{font-size:12px;color:#9ca3af;margin-top:3px}
        .ast{font-size:15px;font-weight:700;color:#111827;margin:20px 0 12px;padding-top:16px;border-top:1px solid #f3f4f6}
        .arr{display:flex;gap:8px;align-items:center;margin-bottom:8px}
        .arr input,.arr textarea{flex:1;padding:8px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;font-family:inherit;outline:none}
        .arm{background:none;border:none;color:#dc2626;cursor:pointer;font-size:18px;padding:4px;flex-shrink:0}
        .aab{background:none;border:1px dashed #d1d5db;border-radius:6px;padding:6px 12px;color:#6b7280;font-size:13px;cursor:pointer;font-family:inherit}
        .apv img{width:100%;max-height:200px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb}
        .aiu{display:flex;gap:8px;align-items:center;margin-top:6px}
        .aiu label{font-size:13px;color:#1a56db;cursor:pointer;font-weight:500;margin:0}
        .aiu input[type=file]{display:none}
        .amb{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
        .am{background:#fff;border-radius:14px;width:100%;max-width:440px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,.12)}
        .am h3{margin:0 0 12px;font-size:17px}.am p{color:#6b7280;font-size:14px;margin:0 0 20px;line-height:1.6}
        .ama{display:flex;gap:10px;justify-content:flex-end}
      `}</style>

      {toast && <div className="at">{toast}</div>}

      {deleteId && (
        <div className="amb" onClick={() => setDeleteId(null)}>
          <div className="am" onClick={e => e.stopPropagation()}>
            <h3>Delete this destination?</h3>
            <p>This will permanently remove the destination from the database and the live website.</p>
            <div className="ama">
              <button className="ab abs" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="ab abd" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════ LIST VIEW ══════ */}
      {view === 'list' && (
        <div className="ac">
          <div className="atb">
            <div className="asr"><span style={{ color: '#9ca3af' }}>🔍</span><input placeholder="Search destinations..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button className="ab abp" onClick={openAdd}>+ Add destination</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead><tr><th>Destination</th><th>Continent</th><th>Tagline</th><th>Status</th><th style={{ width: 100 }}></th></tr></thead>
              <tbody>
                {loading && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</td></tr>}
                {!loading && filtered.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No destinations found. Click &quot;Add destination&quot; to create one.</td></tr>}
                {filtered.map(d => (
                  <tr key={d._id}>
                    <td><div className="anc"><img src={d.cardImg || d.heroImg} alt="" /><div><div className="anp">{d.flag} {d.name}</div><div className="ans">{d.region}</div></div></div></td>
                    <td><span className="abg2 bbl">{CONTINENT_LABELS[d.continent] || d.continent}</span></td>
                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.tagline}</td>
                    <td><span className={`abg2 ${d.status === 'published' ? 'bgr' : 'bam'}`}>{d.status}</span></td>
                    <td><div className="aac"><button className="ab abg" onClick={() => togglePublish(d)} title={d.status === 'published' ? 'Unpublish (hide from site)' : 'Publish (make live on site)'}>{d.status === 'published' ? '🚫' : '🚀'}</button><button className="ab abg" onClick={() => openEdit(d)}>✏️</button><button className="ab abg" onClick={() => setDeleteId(d._id)}>🗑️</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════ FORM VIEW ══════ */}
      {view === 'form' && (
        <div className="ac">
          <div className="afh">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="ab abg" onClick={() => setView('list')}>← Back</button>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{editId ? 'Edit destination' : 'Add new destination'}</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="ab abs" onClick={() => setView('list')}>Cancel</button>
              <button className="ab abp" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : '💾 Save destination'}</button>
            </div>
          </div>

          <div className="afg">
            <div className="af"><label>Name *</label><input value={form.name} onChange={e => { set('name', e.target.value); if (!editId) set('slug', slugify(e.target.value)); }} placeholder="Tokyo" /></div>
            <div className="af"><label>URL slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="tokyo" /><div className="ahn">fareoworld.vercel.app/destinations/{form.slug || '...'}</div></div>
            <div className="af"><label>Region label * (shown on hero + cards)</label><input value={form.region} onChange={e => set('region', e.target.value)} placeholder="🇯🇵 Asia · Japan" /><div className="ahn">Format: flag + continent + country, e.g. &quot;🇫🇷 Europe · France&quot;</div></div>
            <div className="af"><label>Continent * (for filtering)</label>
              <select value={form.continent} onChange={e => set('continent', e.target.value)}>
                <option value="asia">Asia</option><option value="europe">Europe</option><option value="americas">Americas</option>
                <option value="middle-east">Middle East</option><option value="africa">Africa</option><option value="pacific">Pacific</option>
              </select>
            </div>
            <div className="af"><label>Flag emoji (for listing card)</label><input value={form.flag} onChange={e => set('flag', e.target.value)} placeholder="🇯🇵" /></div>
            <div className="af"><label>Tagline</label><input value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Where Tradition Meets the Future" /></div>
            <div className="af"><label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="published">Published (live on site)</option><option value="draft">Draft (hidden)</option>
              </select>
            </div>
            <div className="af" />

            {/* Images */}
            <div className="af"><label>Hero image (full-width banner) *</label><input value={form.heroImg} onChange={e => set('heroImg', e.target.value)} placeholder="Paste URL or upload below" />
              <div className="aiu"><label htmlFor="dhero-upload">{uploading === 'heroImg' ? '⏳ Uploading...' : '📁 Upload to Cloudinary'}</label><input id="dhero-upload" type="file" accept="image/*" onChange={e => handleImgUpload(e, 'heroImg')} disabled={!!uploading} /></div>
            </div>
            <div className="af"><label>Card image (listing thumbnail)</label><input value={form.cardImg} onChange={e => set('cardImg', e.target.value)} placeholder="Paste URL or upload below" />
              <div className="aiu"><label htmlFor="dcard-upload">{uploading === 'cardImg' ? '⏳ Uploading...' : '📁 Upload to Cloudinary'}</label><input id="dcard-upload" type="file" accept="image/*" onChange={e => handleImgUpload(e, 'cardImg')} disabled={!!uploading} /></div>
              <div className="ahn">If empty, hero image is used</div>
            </div>
            {form.heroImg && <div className="afl apv" style={{ marginBottom: 16 }}><label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Preview</label><img src={form.heroImg} alt="" /></div>}

            {/* About */}
            <div className="afl"><div className="ast">About (paragraphs on detail page)</div>
              {form.about.map((p, i) => (
                <div className="arr" key={i}>
                  <textarea rows={3} value={p} onChange={e => updateArr('about', i, null, e.target.value)} placeholder={`Paragraph ${i + 1}`} style={{ flex: 1, padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical' }} />
                  {form.about.length > 1 && <button className="arm" onClick={() => removeRow('about', i)}>×</button>}
                </div>
              ))}
              <button className="aab" onClick={() => addRow('about', '')}>+ Add paragraph</button>
            </div>

            {/* Stats */}
            <div className="afl"><div className="ast">Stats (big numbers on detail page)</div>
              {form.stats.map((s, i) => (
                <div className="arr" key={i}><input value={s.val} onChange={e => updateArr('stats', i, 'val', e.target.value)} placeholder="14M+" /><input value={s.label} onChange={e => updateArr('stats', i, 'label', e.target.value)} placeholder="Annual Visitors" /><button className="arm" onClick={() => removeRow('stats', i)}>×</button></div>
              ))}
              <button className="aab" onClick={() => addRow('stats', { val: '', label: '' })}>+ Add stat</button>
            </div>

            {/* Highlights */}
            <div className="afl"><div className="ast">Highlights (icon cards on detail page)</div>
              {form.highlights.map((h, i) => (
                <div className="arr" key={i}><input style={{ maxWidth: 50 }} value={h.icon} onChange={e => updateArr('highlights', i, 'icon', e.target.value)} placeholder="🏯" /><input value={h.title} onChange={e => updateArr('highlights', i, 'title', e.target.value)} placeholder="Title" /><input value={h.desc} onChange={e => updateArr('highlights', i, 'desc', e.target.value)} placeholder="Description" /><button className="arm" onClick={() => removeRow('highlights', i)}>×</button></div>
              ))}
              <button className="aab" onClick={() => addRow('highlights', { icon: '', title: '', desc: '' })}>+ Add highlight</button>
            </div>

            {/* Tips */}
            <div className="afl"><div className="ast">Traveller tips</div>
              {form.tips.map((t, i) => (
                <div className="arr" key={i}><input value={t} onChange={e => updateArr('tips', i, null, e.target.value)} placeholder="🗓 Best Time: March–May for cherry blossoms" />{form.tips.length > 1 && <button className="arm" onClick={() => removeRow('tips', i)}>×</button>}</div>
              ))}
              <button className="aab" onClick={() => addRow('tips', '')}>+ Add tip</button>
            </div>

            {/* Quick Info */}
            <div className="afl"><div className="ast">Quick info (sidebar on detail page)</div>
              {form.quickInfo.map((q, i) => (
                <div className="arr" key={i}><input value={q.lbl} onChange={e => updateArr('quickInfo', i, 'lbl', e.target.value)} placeholder="Language" /><input value={q.val} onChange={e => updateArr('quickInfo', i, 'val', e.target.value)} placeholder="Japanese" /><button className="arm" onClick={() => removeRow('quickInfo', i)}>×</button></div>
              ))}
              <button className="aab" onClick={() => addRow('quickInfo', { lbl: '', val: '' })}>+ Add info row</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
