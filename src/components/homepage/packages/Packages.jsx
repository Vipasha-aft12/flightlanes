import './Packages.css';
const PACKAGES = [
  {
    img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80',
    alt: 'Bali rice terraces',
    rating: '★★★★★',
    ratingCount: '(2,481)',
    title: 'Bali Bliss — 10 Days',
    feats: ['✈ Flights', '🏨 5★ Hotel', '🏄 Activities', '🚗 Transfers'],
    price: '$1,299',
  },
  {
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    alt: 'Swiss Alps',
    rating: '★★★★★',
    ratingCount: '(1,892)',
    title: 'Swiss Alps Explorer — 8 Days',
    feats: ['✈ Flights', '🏨 4★ Hotel', '🎿 Ski Pass', '🚗 Transfers'],
    price: '$2,199',
  },
  {
    img: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&q=80',
    alt: 'Hawaii beach',
    rating: '★★★★☆',
    ratingCount: '(3,124)',
    title: 'Hawaii Island Hop — 12 Days',
    feats: ['✈ Flights', '🏨 Resort', '🤿 Snorkel', '🚁 Tour'],
    price: '$1,899',
  },
];

export default function Packages() {
  return (
    <section className="section" id="packages" aria-labelledby="packages-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Holiday Packages</div>
          <h2 id="packages-heading">Curated Travel Packages</h2>
          <p>Easy vacation bundles with flights, hotels, transfers, and activities all included so you can travel stress free and enjoy every moment.</p>
        </div>
        <div className="packages-grid fade-up">
          {PACKAGES.map((pkg, i) => (
            <article className="pkg-card" key={i} aria-label={`${pkg.title} — from ${pkg.price} per person`}>
              <div className="pkg-img">
                <img src={pkg.img} alt={pkg.alt} loading="lazy" width={600} height={230} />
              </div>
              <div className="pkg-body">
                <div className="pkg-rating">
                  {pkg.rating} <span style={{ color: 'var(--g400)', fontWeight: 400 }}>{pkg.ratingCount}</span>
                </div>
                <h3>{pkg.title}</h3>
                <div className="pkg-feats">
                  {pkg.feats.map((f, j) => <span className="pkg-feat" key={j}>{f}</span>)}
                </div>
                <div className="pkg-footer">
                  <div className="pkg-price">{pkg.price} <span>/ person</span></div>
                  <button className="btn-book" aria-label={`View ${pkg.title} package`}>View Package</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
