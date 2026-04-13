import './Reviews.css';
const REVIEWS = [
  {
    stars: '★★★★★',
    text: '"Found an incredible Paris deal — $380 round trip from NYC! The booking process was seamless and I got instant confirmation. Will absolutely book again."',
    initials: 'SL',
    name: 'Sarah L.',
    loc: 'New York, NY · Verified Traveler',
  },
  {
    stars: '★★★★★',
    text: '"The Bali package was worth every penny. Hotel, flights, and daily activities all included. The 24/7 chat support helped when our flight got delayed. 10/10."',
    initials: 'MK',
    name: 'Marcus K.',
    loc: 'Chicago, IL · Verified Traveler',
  },
  {
    stars: '★★★★★',
    text: '"Flightlanes beat every other site on price for our family of four to Hawaii. Saved over $400 and the loyalty rewards are a great bonus for frequent travelers."',
    initials: 'JP',
    name: 'Jennifer P.',
    loc: 'Austin, TX · Verified Traveler',
  },
];

export default function Reviews() {
  return (
    <section className="section reviews-bg" aria-labelledby="reviews-heading">
      <div className="section-inner">
        <div className="section-header fade-up" style={{ color: 'white' }}>
          <div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Customer Stories</div>
          <h2 id="reviews-heading" style={{ color: 'white' }}>What Travelers Say</h2>
          <p style={{ color: 'rgba(255,255,255,.75)' }}>Real reviews from real travelers who booked their dream trips with Flightlanes.</p>
        </div>
        <div className="reviews-grid fade-up">
          {REVIEWS.map((r, i) => (
            <article className="review-card" key={i} aria-label={`Review by ${r.name}`}>
              <div className="review-stars" aria-label="5 stars">{r.stars}</div>
              <p className="review-text">{r.text}</p>
              <div className="reviewer">
                <div className="rev-avatar" aria-hidden="true">{r.initials}</div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-loc">{r.loc}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.65)', marginBottom: 16 }}>
            Average rating across 2.1 million+ reviews
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'white', fontFamily: "'Playfair Display',serif" }}>
            4.9 / 5 ★
          </div>
        </div>
      </div>
    </section>
  );
}
