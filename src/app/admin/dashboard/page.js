'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: '#6b7280' }}>Loading dashboard...</p>;
  if (!stats) return <p style={{ color: '#dc2626' }}>Failed to load stats.</p>;

  const statCards = [
    { label: 'Total airlines', value: stats.totalAirlines, color: '#1a56db', bg: '#e8effc' },
    { label: 'Total destinations', value: stats.totalDestinations, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Blog posts', value: stats.totalBlogs || 0, color: '#0d9488', bg: '#ccfbf1' },
    { label: 'Published', value: (stats.publishedAirlines || 0) + (stats.publishedDestinations || 0) + (stats.publishedBlogs || 0), color: '#16a34a', bg: '#f0fdf4' },
  ];

  return (
    <>
      <style>{`
        .ad-stats { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 28px; }
        .ad-stat { background: #fff; border-radius: 10px; padding: 20px 22px; box-shadow: 0 1px 3px rgba(0,0,0,.06); border: 1px solid #e5e7eb; flex: 1 1 200px; min-width: 180px; }
        .ad-stat-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .ad-stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .ad-stat-label { font-size: 13px; color: #6b7280; font-weight: 500; }
        .ad-stat-value { font-size: 28px; font-weight: 700; color: #111827; letter-spacing: -.02em; }
        .ad-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .ad-grid { grid-template-columns: 1fr; } }
        .ad-panel { background: #fff; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.06); border: 1px solid #e5e7eb; padding: 24px; }
        .ad-panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .ad-panel-head h3 { margin: 0; font-size: 16px; font-weight: 700; color: #111827; }
        .ad-panel-link { font-size: 13px; color: #1a56db; text-decoration: none; font-weight: 500; }
        .ad-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
        .ad-row:last-child { border-bottom: none; }
        .ad-row-left { display: flex; align-items: center; gap: 10px; }
        .ad-row-img { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: #f3f4f6; }
        .ad-row-name { font-weight: 600; font-size: 14px; color: #111827; }
        .ad-row-sub { font-size: 12px; color: #6b7280; }
        .ad-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .ad-badge-green { background: #f0fdf4; color: #16a34a; }
        .ad-badge-amber { background: #fffbeb; color: #d97706; }
      `}</style>

      <div className="ad-stats">
        {statCards.map((s, i) => (
          <div className="ad-stat" key={i}>
            <div className="ad-stat-top">
              <div className="ad-stat-icon" style={{ background: s.bg, color: s.color }}>
                {i === 0 ? '✈' : i === 1 ? '📍' : i === 2 ? '✓' : '◌'}
              </div>
              <span className="ad-stat-label">{s.label}</span>
            </div>
            <div className="ad-stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="ad-grid">
        <div className="ad-panel">
          <div className="ad-panel-head">
            <h3>Recent airlines</h3>
            <Link href="/admin/airlines" className="ad-panel-link">View all</Link>
          </div>
          {stats.recentAirlines?.length === 0 && <p style={{ color: '#9ca3af', fontSize: 14 }}>No airlines yet</p>}
          {stats.recentAirlines?.map(a => (
            <div className="ad-row" key={a._id}>
              <div className="ad-row-left">
                <img className="ad-row-img" src={a.cardImg || a.heroImg || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&q=60'} alt="" />
                <div>
                  <div className="ad-row-name">{a.name}</div>
                  <div className="ad-row-sub">{a.code} · {a.category}</div>
                </div>
              </div>
              <span className={`ad-badge ${a.status === 'published' ? 'ad-badge-green' : 'ad-badge-amber'}`}>{a.status}</span>
            </div>
          ))}
        </div>

        <div className="ad-panel">
          <div className="ad-panel-head">
            <h3>Recent destinations</h3>
            <Link href="/admin/destinations" className="ad-panel-link">View all</Link>
          </div>
          {stats.recentDestinations?.length === 0 && <p style={{ color: '#9ca3af', fontSize: 14 }}>No destinations yet</p>}
          {stats.recentDestinations?.map(d => (
            <div className="ad-row" key={d._id}>
              <div className="ad-row-left">
                <img className="ad-row-img" src={d.cardImg || d.heroImg || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=80&q=60'} alt="" />
                <div>
                  <div className="ad-row-name">{d.flag} {d.name}</div>
                  <div className="ad-row-sub">{d.region}</div>
                </div>
              </div>
              <span className={`ad-badge ${d.status === 'published' ? 'ad-badge-green' : 'ad-badge-amber'}`}>{d.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
