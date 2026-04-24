'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './BlogPage.css';

const CATS = [
  { key: 'all', label: 'All Articles' },
  { key: 'Destinations', label: '🌍 Destinations' },
  { key: 'Flights', label: '✈ Flights' },
  { key: 'Hotels', label: '🏨 Hotels' },
  { key: 'Deals', label: '🔥 Deals' },
  { key: 'Tips', label: '💡 Tips' },
  { key: 'Cruises', label: '🚢 Cruises' },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    fetch('/api/public/blogs')
      .then(r => r.json())
      .then(d => { setBlogs(d.blogs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [blogs, activeCat]);

  const filtered = activeCat === 'all' ? blogs : blogs.filter(b => b.category === activeCat);

  return (
    <div className="blog-page">
      <div className="arl-wrap">
        <div className="arl-hero">
          <div className="arl-hero-label">✍ Travel Inspiration & Tips</div>
          <h1>The Fareoworld Travel Blog</h1>
          <p>Expert travel tips, destination guides, money-saving hacks and insider stories from our global community of travelers.</p>
        </div>
        <div className="arl-inner">
          <div className="arl-filter-wrap">
            <button className="arl-filter-arrow" title="Scroll left">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="arl-filter-scroll">
              <div className="arl-filter-bar">
                {CATS.map(c => (
                  <button key={c.key} className={`arl-filter-btn ${activeCat === c.key ? 'active' : ''}`} onClick={() => setActiveCat(c.key)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <button className="arl-filter-arrow" title="Scroll right">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <div className="arl-section-title">{CATS.find(c => c.key === activeCat)?.label || 'All Articles'}</div>
          <div className="arl-section-sub">Click any article to read the full guide</div>

          {loading && <div className="state-msg">Loading articles...</div>}

          <div className="arl-grid">
            {filtered.map(b => (
              <Link href={`/blog/${b.slug}`} className="arl-card" key={b._id} data-cat={b.category?.toLowerCase()}>
                <div className="arl-card-img">
                  <img src={b.heroImage?.url} alt={b.heroImage?.alt || b.title} loading="lazy" />
                  <div className="arl-card-logo is-blo-5eac1d">{b.categoryIcon || '📝'}</div>
                </div>
                <div className="arl-card-body">
                  <div className="arl-card-tag">{b.categoryIcon} {b.category}</div>
                  <div className="arl-card-name is-blo-c425bf">{b.title}</div>
                  <div className="arl-card-desc">{b.excerpt}</div>
                  <div className="arl-card-foot">
                    <span className="arl-card-btn">Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="state-msg">
              No articles found. Blog posts will appear here once published.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
