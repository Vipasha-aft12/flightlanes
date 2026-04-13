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
        <h1>Your Next Adventure<br /><em>Starts Here</em></h1>
        <p>Search, compare, and book flights, hotels, and travel packages at unbeatable prices. The smartest way to travel.</p>
      </div>

      <div className="search-box fade-up" style={{ transitionDelay: '.15s' }}>
        <SearchBox defaultTab="flights" />
      </div>
    </section>
  );
}
