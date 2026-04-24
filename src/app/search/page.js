import { Suspense } from 'react';
import '@/components/homepage/hero/Hero.css';

export const metadata = {
  title: 'Search — Fareoworld',
  description: 'Search results on Fareoworld.',
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <SearchInner />
    </Suspense>
  );
}

function SearchInner() {
  return (
    <>
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          <h1>Search</h1>
          <p>Type a destination, hotel, or activity to get started.</p>
        </div>
      </section>
      <section className="py-5 px-3 bg-white">
        <div className="container-xl" style={{ maxWidth: 900 }}>
          <p style={{ color: 'var(--g600)' }}>Use the navigation above to browse hotels, flights, activities and packages.</p>
        </div>
      </section>
    </>
  );
}
