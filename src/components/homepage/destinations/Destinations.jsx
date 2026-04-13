import './Destinations.css';
const DESTINATIONS = [
  { img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', alt: 'Paris, France', name: 'Paris, France', sub: 'City of Light · Romance · Art', price: 'from $419' },
  { img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', alt: 'Tokyo, Japan', name: 'Tokyo, Japan', sub: 'Culture · Tech · Cuisine', price: 'from $699' },
  { img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80', alt: 'Maldives', name: 'Maldives', sub: 'Overwater Villas · Diving', price: 'from $1,199' },
  { img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80', alt: 'Rome, Italy', name: 'Rome, Italy', sub: 'History · Food · Architecture', price: 'from $379' },
  { img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', alt: 'Dubai, UAE', name: 'Dubai, UAE', sub: 'Luxury · Shopping · Skyline', price: 'from $549' },
];

export default function Destinations() {
  return (
    <section className="section" id="destinations" aria-labelledby="destinations-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Explore the World</div>
          <h2 id="destinations-heading">Popular Destinations</h2>
          <p>Handpicked destinations loved by our travelers — discover iconic cities, tropical escapes, and hidden gems.</p>
        </div>
        <div className="destinations-grid fade-up">
          {DESTINATIONS.map((d, i) => (
            <article className="dest-card" key={i} tabIndex={0} role="article" aria-label={`${d.name} — flights ${d.price}`}>
              <img src={d.img} alt={d.alt} loading={i === 0 ? 'eager' : 'lazy'} width={i === 0 ? 800 : 600} height={i === 0 ? 560 : 280} />
              <div className="dest-overlay" aria-hidden="true" />
              <div className="dest-info">
                <h3>{d.name}</h3>
                <p>{d.sub}</p>
              </div>
              <div className="dest-price">{d.price}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
