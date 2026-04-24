import Link from 'next/link';

const types = [
  {
    title: 'Economy & Compact Cars',
    best: 'Best for city driving & airport runs',
    feats: ['⛽ Fuel Efficient', '💰 Lowest Rates', '🅿 Easy Parking'],
    price: 22,
    img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80',
  },
  {
    title: 'SUVs & Crossovers',
    best: 'Best for families & road trips',
    feats: ['👨‍👩‍👧 7-Seater Options', '🏔 All-Terrain', '🧳 Large Trunk'],
    price: 48,
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
  },
  {
    title: 'Luxury & Premium Cars',
    best: 'Best for business & special occasions',
    feats: ['🌟 BMW / Mercedes', '🛋 Leather Interior', '📶 WiFi Hotspot'],
    price: 89,
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
  },
];

export default function CarTypes() {
  return (
    <section className="section" style={{ background: 'var(--g50)' }}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Choose Your Ride</div>
          <h2>Every Vehicle Type for Every Trip</h2>
          <p>From compact city cars to spacious family minivans — compare all vehicle classes side-by-side.</p>
        </div>
        <div className="packages-grid fade-up">
          {types.map((t, i) => (
            <div className="pkg-card" key={i}>
              <div className="pkg-img"><img src={t.img} alt={t.title} loading="eager" /></div>
              <div className="pkg-body">
                <div className="pkg-rating">⭐ {t.best}</div>
                <h3>{t.title}</h3>
                <div className="pkg-feats">{t.feats.map((f, j) => <span className="pkg-feat" key={j}>{f}</span>)}</div>
                <div className="pkg-footer">
                  <div className="pkg-price">${t.price} <span>/ day</span></div>
                  <Link href="/car-rentals/results"><button className="btn-book">Rent Now</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
