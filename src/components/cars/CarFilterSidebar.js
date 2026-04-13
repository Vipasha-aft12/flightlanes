'use client';

export default function CarFilterSidebar({ filters, setFilters }) {
  const { maxPrice, carTypes, companies, features, transmissions, seats } = filters;

  function toggle(group, key) {
    const next = { ...filters[group], [key]: !filters[group][key] };
    setFilters({ ...filters, [group]: next });
  }

  function clearAll() {
    setFilters({
      maxPrice: 500,
      carTypes: Object.fromEntries(Object.keys(carTypes).map(k => [k, true])),
      companies: Object.fromEntries(Object.keys(companies).map(k => [k, true])),
      features: { fullInsurance: false, freeCancellation: false, unlimitedMiles: false, airportPickup: false, electric: false },
      transmissions: { Automatic: true, Manual: true },
      seats: { '2-4': true, '5': true, '7+': true },
    });
  }

  return (
    <aside className="rl-filters">
      <div className="rl-filter-header">
        <h3>🎛 Filters</h3>
        <button className="rl-filter-clear" onClick={clearAll}>Clear all</button>
      </div>
      <div className="rl-filter-body">

        <div className="rl-filter-group">
          <h4>💰 Price per Day</h4>
          <div className="rl-price-range">
            <div className="rl-price-values"><span>$10</span><span>${maxPrice}</span></div>
            <input type="range" className="rl-slider" min="10" max="500" value={maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })} />
          </div>
        </div>

        <div className="rl-filter-group">
          <h4>🚗 Car Type</h4>
          {Object.keys(carTypes).map((type) => (
            <label className="rl-check" key={type}>
              <input type="checkbox" checked={carTypes[type]} onChange={() => toggle('carTypes', type)} /> {type}
            </label>
          ))}
        </div>

        <div className="rl-filter-group">
          <h4>🏢 Rental Company</h4>
          {Object.keys(companies).map((co) => (
            <label className="rl-check" key={co}>
              <input type="checkbox" checked={companies[co]} onChange={() => toggle('companies', co)} /> {co}
            </label>
          ))}
        </div>

        <div className="rl-filter-group">
          <h4>🎯 Features</h4>
          {[
            { k: 'fullInsurance', l: '🛡 Full Insurance' },
            { k: 'freeCancellation', l: '❌ Free Cancellation' },
            { k: 'unlimitedMiles', l: '🛞 Unlimited Miles' },
            { k: 'airportPickup', l: '🚗 Airport Pickup' },
            { k: 'electric', l: '⚡ Electric / Hybrid' },
          ].map(({ k, l }) => (
            <label className="rl-check" key={k}>
              <input type="checkbox" checked={features[k]} onChange={() => toggle('features', k)} /> {l}
            </label>
          ))}
        </div>

        <div className="rl-filter-group">
          <h4>⚙ Transmission</h4>
          {Object.keys(transmissions).map((t) => (
            <label className="rl-check" key={t}>
              <input type="checkbox" checked={transmissions[t]} onChange={() => toggle('transmissions', t)} /> {t}
            </label>
          ))}
        </div>

        <div className="rl-filter-group">
          <h4>👥 Seats</h4>
          {[{ k: '2-4', l: '2–4 Seats' }, { k: '5', l: '5 Seats' }, { k: '7+', l: '7+ Seats' }].map(({ k, l }) => (
            <label className="rl-check" key={k}>
              <input type="checkbox" checked={seats[k]} onChange={() => toggle('seats', k)} /> {l}
            </label>
          ))}
        </div>

      </div>
    </aside>
  );
}
