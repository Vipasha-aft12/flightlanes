import SearchBox from '@/components/search/SearchBox';
import CarLandingSections from '@/components/cars/CarLandingSections';

export const metadata = { title: '🚗 Car Rentals — Flightlanes', description: 'Compare 500+ car rental brands worldwide.' };

export default function CarsPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          <div className="hero-badge"><div className="badge-dot"></div>🚗 50,000+ Vehicles Available</div>
          <h1>Drive Your Way,<br /><em>Your Adventure</em></h1>
          <p>Compare rental cars from 500+ brands. Best rates with full insurance options included.</p>
        </div>
        <div className="search-box"><SearchBox defaultTab="cars" /></div>
      </section>
      <CarLandingSections />
    </>
  );
}
