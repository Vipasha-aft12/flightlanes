export function TrustStrip() {
  const items = [
    { icon: '🔒', text: 'Secure Booking' },
    { icon: '💰', text: 'Best Price Guarantee' },
    { icon: '📞', text: '24/7 Customer Support' },
    { icon: '✈️', text: '500+ Airlines' },
    { icon: '⭐', text: '2M+ Happy Travelers' },
  ];
  return (
    <div className="trust-strip">
      <div className="trust-inner">
        {items.map((item, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-icon">{item.icon}</div>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DealsTicker() {
  const deals = [
    { route: 'NYC → London', price: '$349' },
    { route: 'LA → Tokyo', price: '$699' },
    { route: 'Chicago → Paris', price: '$419' },
    { route: 'Dallas → Cancún', price: '$189' },
    { route: 'NYC → Dubai', price: '$549' },
    { route: 'SF → Bali', price: '$749' },
    { route: 'Miami → Rome', price: '$389' },
    { route: 'Seattle → Sydney', price: '$899' },
  ];
  const doubled = [...deals, ...deals];

  return (
    <div className="deals-ticker">
      <div className="ticker-inner">
        {doubled.map((d, i) => (
          <div className="ticker-item" key={i}>
            ✈ {d.route} from <span>{d.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { num: '500+', label: 'Satisfied Travelers' },
    { num: '2M+', label: 'Airlines to Book From' },
    { num: '4740+', label: 'Routes Worldwide' },
    { num: '4.8★', label: 'Customer Rating' },
  ];
  return (
    <div className="stats-section">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
