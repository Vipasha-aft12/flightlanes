import './Loyalty.css';
const TIERS = [
  { icon: '🥉', name: 'Explorer', pts: '0 – 5,000 pts' },
  { icon: '🥈', name: 'Voyager', pts: '5,001 – 20,000 pts' },
  { icon: '🥇', name: 'Globetrotter', pts: '20,001 – 60,000 pts' },
  { icon: '💎', name: 'Elite', pts: '60,000+ pts' },
];

export default function Loyalty() {
  return (
    <section className="loyalty-section" aria-labelledby="loyalty-heading">
      <div className="section-inner" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>
          Rewards Program
        </div>
        <h2 id="loyalty-heading">Earn Miles Every Trip</h2>
        <p>
          Join the Flightlanes Rewards program and earn points on every booking.
          Redeem for free flights, hotel nights and exclusive upgrades.
        </p>
        <div className="tiers" role="list">
          {TIERS.map((tier, i) => (
            <div className="tier-card" key={i} role="listitem">
              <div className="tier-icon" aria-hidden="true">{tier.icon}</div>
              <div className="tier-name">{tier.name}</div>
              <div className="tier-pts">{tier.pts}</div>
            </div>
          ))}
        </div>
        <button className="btn-white">Join Rewards — It&apos;s Free</button>
      </div>
    </section>
  );
}
