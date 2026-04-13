import SearchBox from '@/components/search/SearchBox';
import TrustStrip from '@/components/hotels/landing/TrustStrip';
import DealsTicker from '@/components/hotels/landing/DealsTicker';
import Stats from '@/components/hotels/landing/Stats';
import Destinations from '@/components/hotels/landing/Destinations';
import Deals from '@/components/hotels/landing/Deals';
import FeaturedHotels from '@/components/hotels/landing/FeaturedHotels';
import WhyUs from '@/components/hotels/landing/WhyUs';
import Gallery from '@/components/hotels/landing/Gallery';
import Reviews from '@/components/hotels/landing/Reviews';
import Guides from '@/components/hotels/landing/Guides';
import Loyalty from '@/components/hotels/landing/Loyalty';
import Newsletter from '@/components/hotels/landing/Newsletter';

export const metadata = { title: '🏨 Hotels — Flightlanes', description: 'Find best hotels worldwide. Compare 500,000+ hotels.' };

export default function HotelsLandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          <div className="hero-badge"><div className="badge-dot"></div>🏨 500,000+ Hotels Worldwide</div>
          <h1>Find Your<br />Perfect <em>Stay</em></h1>
          <p>Compare hotels from all major brands. Best rates guaranteed with free cancellation.</p>
        </div>
        <div className="search-box"><SearchBox defaultTab="hotels" /></div>
      </section>
      <TrustStrip />
      <DealsTicker />
      <Stats />
      <Destinations />
      <Deals />
      <FeaturedHotels />
      <WhyUs />
      <Gallery />
      <Reviews />
      <Guides />
      <Loyalty />
      <Newsletter />
    </>
  );
}
