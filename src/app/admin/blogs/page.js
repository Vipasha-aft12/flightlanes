'use client';
import { useState, useEffect } from 'react';

async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
  if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Upload failed'); }
  return (await res.json()).url;
}

const emptyForm = () => ({
  title: '', slug: '', category: 'Destinations', categoryIcon: '🌍', excerpt: '', content: '',
  heroImage: { url: '', alt: '', credit: '' },
  author: 'Fareoworld Editorial', authorInitials: 'FL', readingTime: 7,
  faqs: [{ question: '', answer: '' }],
  metaTitle: '', metaDescription: '', keywords: [],
  status: 'draft',
});

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = () => { setLoading(true); fetch('/api/admin/blogs').then(r => r.json()).then(d => { setBlogs(d.blogs || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));
  const setHero = (key, val) => setForm(p => ({ ...p, heroImage: { ...p.heroImage, [key]: val } }));

  const handleImgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { const url = await uploadImage(file); setHero('url', url); flash('Image uploaded'); } catch (err) { flash('Upload failed: ' + err.message); }
    setUploading(false);
  };

  const openAdd = () => { setForm(emptyForm()); setEditId(null); setView('form'); };
  const openEdit = (b) => {
    fetch(`/api/admin/blogs/${b._id}`).then(r => r.json()).then(d => {
      const blog = d.blog;
      setForm({
        ...blog,
        heroImage: blog.heroImage || { url: '', alt: '', credit: '' },
        faqs: blog.faqs?.length ? blog.faqs : [{ question: '', answer: '' }],
        keywords: blog.keywords || [],
      });
      setEditId(blog._id);
      setView('form');
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.content || !form.heroImage?.url) { flash('Title, content, and hero image are required'); return; }
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const wordCount = form.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const body = {
      ...form, slug,
      readingTime: Math.max(1, Math.round(wordCount / 200)),
      faqs: form.faqs.filter(f => f.question),
      keywords: typeof form.keywords === 'string' ? form.keywords.split(',').map(k => k.trim()).filter(Boolean) : form.keywords,
    };
    delete body._id; delete body.__v; delete body.createdAt; delete body.updatedAt;

    try {
      const url = editId ? `/api/admin/blogs/${editId}` : '/api/admin/blogs';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      flash(editId ? 'Blog updated' : 'Blog created');
      setView('list'); load();
    } catch (err) { flash(err.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await fetch(`/api/admin/blogs/${deleteId}`, { method: 'DELETE' }); flash('Blog deleted'); load(); } catch { flash('Delete failed'); }
    setDeleteId(null);
  };

  const updateFaq = (idx, field, val) => {
    setForm(p => { const faqs = [...p.faqs]; faqs[idx] = { ...faqs[idx], [field]: val }; return { ...p, faqs }; });
  };
  const addFaq = () => setForm(p => ({ ...p, faqs: [...p.faqs, { question: '', answer: '' }] }));
  const removeFaq = (idx) => setForm(p => ({ ...p, faqs: p.faqs.filter((_, i) => i !== idx) }));

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()));
  const ICONS = { Destinations: '🌍', Flights: '✈', Hotels: '🏨', Cars: '🚗', Packages: '🎁', Cruises: '🚢', Tips: '💡', Deals: '🔥' };

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
        .arr{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px}
        .arr input,.arr textarea{flex:1;padding:8px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;font-family:inherit;outline:none}
        .arm{background:none;border:none;color:#dc2626;cursor:pointer;font-size:18px;padding:4px;flex-shrink:0;margin-top:6px}
        .aab{background:none;border:1px dashed #d1d5db;border-radius:6px;padding:6px 12px;color:#6b7280;font-size:13px;cursor:pointer;font-family:inherit}
        .aiu{display:flex;gap:8px;align-items:center;margin-top:6px}.aiu label{font-size:13px;color:#1a56db;cursor:pointer;font-weight:500;margin:0}.aiu input[type=file]{display:none}
        .apv img{width:100%;max-height:200px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb}
        .amb{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
        .am{background:#fff;border-radius:14px;width:100%;max-width:440px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,.12)}
        .am h3{margin:0 0 12px;font-size:17px}.am p{color:#6b7280;font-size:14px;margin:0 0 20px;line-height:1.6}
        .ama{display:flex;gap:10px;justify-content:flex-end}
        .info-box{padding:14px 18px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:13px;color:#1e40af;line-height:1.6;margin-bottom:20px}
      `}</style>

      {toast && <div className="at">{toast}</div>}

      {deleteId && (
        <div className="amb" onClick={() => setDeleteId(null)}>
          <div className="am" onClick={e => e.stopPropagation()}>
            <h3>Delete this blog post?</h3>
            <p>This will permanently remove the post from the database and the live website.</p>
            <div className="ama"><button className="ab abs" onClick={() => setDeleteId(null)}>Cancel</button><button className="ab abd" onClick={handleDelete}>Delete</button></div>
          </div>
        </div>
      )}

      {/* ══════ LIST VIEW ══════ */}
      {view === 'list' && (
        <div className="ac">
          <div className="atb">
            <div className="asr"><span style={{ color: '#9ca3af' }}>🔍</span><input placeholder="Search blogs..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button className="ab abp" onClick={openAdd}>+ Add blog post</button>
          </div>
          <div className="info-box" style={{ margin: '16px 20px 0' }}>
            💡 Blog posts are auto-generated via Google Sheet + Claude AI. You can also create or edit posts manually here.
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead><tr><th>Blog post</th><th>Category</th><th>Date</th><th>Status</th><th style={{ width: 100 }}></th></tr></thead>
              <tbody>
                {loading && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</td></tr>}
                {!loading && filtered.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No blog posts yet. Use the Google Sheet to auto-generate or click &quot;Add blog post&quot;.</td></tr>}
                {filtered.map(b => (
                  <tr key={b._id}>
                    <td><div className="anc"><img src={b.heroImage?.url || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=80&q=60'} alt="" /><div><div className="anp">{b.title}</div><div className="ans">/blog/{b.slug}</div></div></div></td>
                    <td><span className="abg2 bbl">{b.categoryIcon || '📝'} {b.category}</span></td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 13, color: '#6b7280' }}>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : '-'}</td>
                    <td><span className={`abg2 ${b.status === 'published' ? 'bgr' : 'bam'}`}>{b.status}</span></td>
                    <td><div className="aac">
                      <button className="ab abg" onClick={() => openEdit(b)}>✏️</button>
                      <button className="ab abg" onClick={() => setDeleteId(b._id)}>🗑️</button>
                    </div></td>
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
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{editId ? 'Edit blog post' : 'Add new blog post'}</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="ab abs" onClick={() => setView('list')}>Cancel</button>
              <button className="ab abp" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : '💾 Save post'}</button>
            </div>
          </div>

          <div className="afg">
            <div className="afl af"><label>Title *</label><input value={form.title} onChange={e => { set('title', e.target.value); if (!editId) set('slug', slugify(e.target.value)); }} placeholder="The Ultimate Tokyo Travel Guide 2026" /></div>
            <div className="af"><label>URL slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} /><div className="ahn">/blog/{form.slug || '...'}</div></div>
            <div className="af"><label>Category</label>
              <select value={form.category} onChange={e => { set('category', e.target.value); set('categoryIcon', ICONS[e.target.value] || '📝'); }}>
                {Object.keys(ICONS).map(c => <option key={c} value={c}>{ICONS[c]} {c}</option>)}
              </select>
            </div>
            <div className="af"><label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="published">Published</option><option value="draft">Draft</option>
              </select>
            </div>
            <div className="af"><label>Author</label><input value={form.author} onChange={e => set('author', e.target.value)} /></div>
            <div className="afl af"><label>Excerpt (shown on listing cards)</label><textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="2 sentences that hook the reader" /></div>

            {/* Hero image */}
            <div className="af"><label>Hero image URL *</label><input value={form.heroImage?.url} onChange={e => setHero('url', e.target.value)} placeholder="Paste URL or upload" />
              <div className="aiu"><label htmlFor="blog-hero-upload">{uploading ? '⏳ Uploading...' : '📁 Upload to Cloudinary'}</label><input id="blog-hero-upload" type="file" accept="image/*" onChange={handleImgUpload} disabled={uploading} /></div>
            </div>
            <div className="af"><label>Image alt text</label><input value={form.heroImage?.alt} onChange={e => setHero('alt', e.target.value)} placeholder="Descriptive alt text" /></div>
            {form.heroImage?.url && <div className="afl apv" style={{ marginBottom: 16 }}><img src={form.heroImage.url} alt="" /></div>}

            {/* SEO */}
            <div className="afl"><div className="ast">SEO</div></div>
            <div className="af"><label>Meta title</label><input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="55-65 chars | Fareoworld" /><div className="ahn">{(form.metaTitle || '').length}/65 chars</div></div>
            <div className="af"><label>Meta description</label><input value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} placeholder="150-160 chars" /><div className="ahn">{(form.metaDescription || '').length}/160 chars</div></div>
            <div className="afl af"><label>Keywords (comma-separated)</label><input value={Array.isArray(form.keywords) ? form.keywords.join(', ') : form.keywords} onChange={e => set('keywords', e.target.value)} placeholder="tokyo travel guide, japan vacation, best time tokyo" /></div>

            {/* Content */}
            <div className="afl"><div className="ast">Blog content (HTML) *</div></div>
            <div className="afl af"><textarea rows={20} value={form.content} onChange={e => set('content', e.target.value)} placeholder="<h2>Introduction</h2><p>Your content here...</p>" style={{ fontFamily: 'monospace', fontSize: 13 }} /><div className="ahn">Use h2 for sections, h3 for subsections, p for paragraphs, ul/ol for lists</div></div>

            {/* FAQs */}
            <div className="afl"><div className="ast">FAQs (for Google rich results)</div></div>
            <div className="afl">
              {form.faqs.map((f, i) => (
                <div className="arr" key={i} style={{ alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <input value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} placeholder="Question" />
                    <input value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} placeholder="Answer (2-3 sentences)" />
                  </div>
                  <button className="arm" onClick={() => removeFaq(i)}>×</button>
                </div>
              ))}
              <button className="aab" onClick={addFaq}>+ Add FAQ</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
