'use client';
import './Deals.css';

const DEALS = [
  {
    img: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80',
    alt: 'London skyline',
    badge: '🔥 48h Deal',
    tag: '✈ Round Trip · Economy',
    title: 'New York → London',
    meta: ['🗓 Jun 12 – Jun 26', '· British Airways'],
    amount: '$349',
    trip: 'NYC → London · Jun 12',
  },
  {
    img: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=600&q=80',
    alt: 'Cancún resort',
    badge: '✨ Best Value',
    tag: '🏝️ All-Inclusive Package',
    title: 'Dallas → Cancún Resort',
    meta: ['🗓 Jul 4 – Jul 11', '· Hotel + Flight'],
    amount: '$699',
    trip: 'Dallas → Cancún Package',
  },
  {
    img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
    alt: 'Mediterranean cruise',
    badge: '⚡ Flash Sale',
    tag: '🚢 7-Night Cruise',
    title: 'Mediterranean Dream Cruise',
    meta: ['🗓 Aug 1 – Aug 8', '· Royal Caribbean'],
    amount: '$899',
    trip: 'Mediterranean Cruise · Aug 1',
  },
];

export default function Deals() {
  return (
    <section className="section deals-bg" id="deals" aria-labelledby="deals-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Hot Right Now</div>
          <h2 id="deals-heading">Special Deals &amp; Offers</h2>
          <p>Limited-time fares and exclusive offers — book now before they&apos;re gone.</p>
        </div>
        <div className="deals-grid fade-up">
          {DEALS.map((deal, i) => (
            <article className="deal-card" key={i} aria-label={`Deal: ${deal.title} — ${deal.amount} per person`}>
              <div className="deal-img">
                <img src={deal.img} alt={deal.alt} loading="lazy" width={600} height={200} />
                <div className="deal-badge">{deal.badge}</div>
              </div>
              <div className="deal-body">
                <div className="deal-tag">{deal.tag}</div>
                <h3>{deal.title}</h3>
                <div className="deal-meta">
                  {deal.meta.map((m, j) => <span key={j}>{m}</span>)}
                </div>
                <div className="deal-footer">
                  <div>
                    <div className="deal-from">from</div>
                    <div className="deal-amount">{deal.amount}<span className="deal-per">/pp</span></div>
                  </div>
                  <button className="btn-book" aria-label={`Book ${deal.title} for ${deal.amount}`}>Book Now</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button className="btn-ghost" style={{ fontSize: '.95rem', padding: '11px 28px' }}>View All 200+ Deals →</button>
        </div>
      </div>
    </section>
  );
}
