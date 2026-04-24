import SearchBox from "@/components/search/SearchBox";
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-label="Search flights, hotels and travel deals">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grad" aria-hidden="true" />

      <div className="hero-content fade-up">
        <div className="hero-badge">
          <div className="badge-dot" aria-hidden="true" />
          ✈ Over 2 million happy travelers
        </div>
        <h1>Explore Destinations with the <br /><em>Best Deals</em></h1>
        <p>Find the best flight tickets, Hotel, and travel packages, compare options, and book your perfect trip with ease.</p>
      </div>

      <div className="search-box fade-up" style={{ transitionDelay: '.15s' }}>
        <SearchBox defaultTab="flights" />
      </div>
    </section>
  );
}
