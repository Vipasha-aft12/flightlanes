import SearchBox from '@/components/search/SearchBox';
import '@/components/homepage/hero/Hero.css';
import '@/components/homepage/truststrip/TrustStrip.css';
import '@/components/homepage/dealsticker/DealsTicker.css';
import '@/components/homepage/stats/Stats.css';
import '@/components/homepage/destinations/Destinations.css';
import '@/components/homepage/deals/Deals.css';
import '@/components/homepage/packages/Packages.css';
import '@/components/flights/flights.css';
import TrustStrip from '@/components/cars/landing/TrustStrip';
import DealsTicker from '@/components/cars/landing/DealsTicker';
import Stats from '@/components/cars/landing/Stats';
import Destinations from '@/components/cars/landing/Destinations';
import Deals from '@/components/cars/landing/Deals';
import CarTypes from '@/components/cars/landing/CarTypes';
import CompanySlider from '@/components/cars/landing/CompanySlider';
import Reviews from '@/components/cars/landing/Reviews';
import CTASection from '@/components/cars/landing/CTASection';

export const metadata = { title: '🚗 Car Rentals — Fareoworld', description: 'Compare 500+ car rental brands worldwide.' };

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
      <TrustStrip />
      <DealsTicker />
      <Stats />
      <Destinations />
      <Deals />
      <CarTypes />
      <CompanySlider />
      <Reviews />
      <CTASection />
    </>
  );
}
