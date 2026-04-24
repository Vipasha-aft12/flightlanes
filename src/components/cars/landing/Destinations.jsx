import { popularDestinations } from '@/lib/carUtils';

export default function Destinations() {
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Top Rental Locations</div>
          <h2>Most Popular Car Rental Cities</h2>
          <p>Pick up and drop off at airports, city centers and train stations across the USA and worldwide.</p>
        </div>
        <div className="destinations-grid fade-up">
          {popularDestinations.map((d, i) => (
            <div className="dest-card" key={i} style={d.span ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}}>
              <img src={d.img} alt={d.name} loading="eager" />
              <div className="dest-overlay"></div>
              <div className="dest-info"><h3>{d.name}</h3><p>{d.sub}</p></div>
              <div className="dest-price">from ${d.price}/day</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
