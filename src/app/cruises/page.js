import SearchBox from '@/components/search/SearchBox';
import CruiseLandingSections from '@/components/cruises/CruiseLandingSections';

export const metadata = { title: '🚢 Cruises — Flightlanes', description: 'Compare 1,000+ cruise itineraries.' };

export default function CruisesPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          <div className="hero-badge"><div className="badge-dot"></div>🚢 1,000+ Cruise Itineraries</div>
          <h1>Sail the World<br />in <em>Ultimate Style</em></h1>
          <p>Compare top cruise lines — Caribbean, Mediterranean, Alaska and beyond.</p>
        </div>
        <div className="search-box"><SearchBox defaultTab="cruises" /></div>
      </section>
      <CruiseLandingSections />
    </>
  );
}
