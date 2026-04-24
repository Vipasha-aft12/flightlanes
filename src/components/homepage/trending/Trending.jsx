import './Trending.css';
const TRENDING = [
  { img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=80&h=80&fit=crop', city: 'Iceland', price: 'from $479 · +204% 🔥' },
  { img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=80&h=80&fit=crop', city: 'Lisbon, Portugal', price: 'from $389 · +188%' },
  { img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=80&h=80&fit=crop', city: 'Dubai, UAE', price: 'from $549 · +165%' },
  { img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=80&h=80&fit=crop', city: 'Santorini, Greece', price: 'from $519 · +142%' },
  { img: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=80&h=80&fit=crop', city: 'Cancún, Mexico', price: 'from $189 · +130%' },
  { img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=80&fit=crop', city: 'Tokyo, Japan', price: 'from $699 · +118%' },
  { img: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=80&h=80&fit=crop', city: 'Maui, Hawaii', price: 'from $349 · +98%' },
];

export default function Trending() {
  return (
    <section className="section" style={{ background: 'var(--g50)', paddingBottom: 52 }} aria-labelledby="trending-heading">
      <div className="section-inner">
        <div className="section-header fade-up" style={{ marginBottom: 26 }}>
          <div className="section-label">🔥 Trending Right Now</div>
          <h2 id="trending-heading">Where Everyone&apos;s Flying This Month</h2>
        </div>
        <div className="trend-scroll fade-up" role="list" aria-label="Trending destinations">
          {TRENDING.map((t, i) => (
            <button className="trend-pill" key={i} role="listitem" aria-label={`${t.city} — ${t.price}`}>
              <div className="trend-flag">
                <img src={t.img} alt={t.city} loading="lazy" width={34} height={34} />
              </div>
              <div>
                <div className="trend-city">{t.city}</div>
                <div className="trend-price">{t.price}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
