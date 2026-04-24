import './PriceComparison.css';
const AIRLINES = [
  {
    logo: '✈️',
    name: 'British Airways',
    best: true,
    stops: 'Non-stop · Economy',
    dep: '08:15 JFK → 20:30 LHR',
    dur: '7h 15m',
    price: '$349',
    highlight: true,
  },
  {
    logo: '🛫',
    name: 'Delta Air Lines',
    stops: '1 Stop · Economy',
    dep: '10:00 JFK → 23:45 LHR',
    dur: '9h 45m',
    price: '$389',
  },
  {
    logo: '🌍',
    name: 'Virgin Atlantic',
    stops: 'Non-stop · Economy',
    dep: '13:30 JFK → 01:55 LHR',
    dur: '7h 25m',
    price: '$412',
  },
  {
    logo: '⭐',
    name: 'American Airlines',
    stops: '1 Stop · Economy',
    dep: '07:00 JFK → 22:20 LHR',
    dur: '10h 20m',
    price: '$435',
  },
];

export default function PriceComparison() {
  return (
    <section className="section compare-bg" aria-labelledby="compare-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Price Comparison</div>
          <h2 id="compare-heading">See How Much You Save</h2>
          <p>We compare airfares from 500+ airlines in real time across 4740+ routes so you always get the lowest flight ticket prices and best travel deals. Live sample route: NYC to London.
</p>
        </div>
        <div className="compare-table fade-up" role="table" aria-label="Flight price comparison">
          <div className="compare-head" role="row">
            <span role="columnheader">Airline</span>
            <span role="columnheader">Departure</span>
            <span role="columnheader">Duration</span>
            <span role="columnheader">Price</span>
            <span role="columnheader"><span className="sr-only">Book</span></span>
          </div>
          {AIRLINES.map((a, i) => (
            <div className="compare-row" key={i} role="row">
              <div className="airline-cell" role="cell">
                <div className="airline-logo" aria-hidden="true">{a.logo}</div>
                <div>
                  <div className="airline-name">
                    {a.name}
                    {a.best && <span className="best-val">Best Value</span>}
                  </div>
                  <div className="airline-stops">{a.stops}</div>
                </div>
              </div>
              <span role="cell" style={{ fontSize: '.85rem' }}>{a.dep}</span>
              <span role="cell" style={{ fontSize: '.85rem' }}>{a.dur}</span>
              <span role="cell" className="price-cell" style={a.highlight ? { color: 'var(--orange)' } : {}}>{a.price}</span>
              <button className={`cmp-btn${!a.highlight ? ' ol' : ''}`} role="cell" aria-label={`Book ${a.name} for ${a.price}`}>Book</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: '.8rem', color: 'var(--g400)' }}>
          Sample fares. Live prices update every 60 seconds.
        </div>
      </div>
    </section>
  );
}
