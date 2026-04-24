const reviews = [
  {
    text: '"Saved $120 on a 7-day SUV rental in Miami. Price was $30/day cheaper than Hertz direct. Highly recommend!"',
    name: 'David R.',
    loc: 'Miami, FL · Verified',
    initials: 'DR',
  },
  {
    text: '"Booked a Tesla Model 3 through Fareoworld for a road trip from LA to SF. Seamless pickup at LAX, free Supercharging included."',
    name: 'Sarah K.',
    loc: 'Los Angeles, CA · Verified',
    initials: 'SK',
  },
  {
    text: '"The comparison tool showed me Budget was $15/day cheaper than Enterprise for the exact same car. Saved over $100 on my trip."',
    name: 'Michael T.',
    loc: 'Chicago, IL · Verified',
    initials: 'MT',
  },
];

export default function Reviews() {
  return (
    <section className="section" style={{ background: 'var(--teal)' }}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Renter Reviews</div>
          <h2 style={{ color: 'white' }}>What Renters Say</h2>
        </div>
        <div className="rev3 fade-up">
          {reviews.map((r, i) => (
            <div className="rev3-card" key={i}>
              <div className="rev3-stars">★★★★★</div>
              <div className="rev3-txt">{r.text}</div>
              <div className="rev3-person">
                <div className="rev3-av">{r.initials}</div>
                <div><div className="rev3-name">{r.name}</div><div className="rev3-loc">{r.loc}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
