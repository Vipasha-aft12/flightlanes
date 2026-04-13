import SearchBox from '@/components/search/SearchBox';
import { TrustStrip, DealsTicker, StatsSection } from '@/components/flights/LandingSections';
import PopularRoutes from '@/components/flights/PopularRoutes';
import { CompareTable, WhySection, TipsSection, ReviewsSection, CTASection } from '@/components/flights/FlightLandingSections';

export const metadata = { title: '✈ Flights — Flightlanes', description: 'Search and compare flights from 500+ airlines.' };

export default function FlightsPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          <div className="hero-badge"><div className="badge-dot"></div>✈ 500+ Airlines Worldwide</div>
          <h1>Fly Anywhere,<br /><em>Save Everywhere</em></h1>
          <p>Search and compare flights from 500+ airlines. Best fares guaranteed — book in minutes.</p>
        </div>
        <div className="search-box"><SearchBox defaultTab="flights" /></div>
      </section>
      <TrustStrip />
      <DealsTicker />
      <StatsSection />
      <PopularRoutes />
      <CompareTable />
      <WhySection />
      <TipsSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
