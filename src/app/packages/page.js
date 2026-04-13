import SearchBox from '@/components/search/SearchBox';
import PackageLandingSections from '@/components/packages/PackageLandingSections';

export const metadata = { title: '🎁 Vacation Packages — Flightlanes', description: 'Flight + Hotel + Transfers bundled. Save up to 40%.' };

export default function PackagesPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          <div className="hero-badge"><div className="badge-dot"></div>🎁 5,000+ Vacation Packages</div>
          <h1>Bundle &amp; Save<br />Up to <em>40% Off</em></h1>
          <p>Flight + Hotel + Transfers bundled. Compare 5,000+ packages worldwide.</p>
        </div>
        <div className="search-box"><SearchBox defaultTab="packages" /></div>
      </section>
      <PackageLandingSections />
    </>
  );
}
