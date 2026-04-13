'use client';

export default function FilterSidebar({ filters, setFilters }) {
  const { maxPrice, maxDuration, stops, airlines, departTime, amenities, cabins } = filters;

  function toggleStop(s) {
    const next = { ...stops, [s]: !stops[s] };
    setFilters({ ...filters, stops: next });
  }

  function toggleAirline(name) {
    const next = { ...airlines, [name]: !airlines[name] };
    setFilters({ ...filters, airlines: next });
  }

  function toggleTime(slot) {
    const next = { ...departTime, [slot]: !departTime[slot] };
    setFilters({ ...filters, departTime: next });
  }

  function toggleAmenity(key) {
    const next = { ...amenities, [key]: !amenities[key] };
    setFilters({ ...filters, amenities: next });
  }

  function toggleCabin(key) {
    const next = { ...cabins, [key]: !cabins[key] };
    setFilters({ ...filters, cabins: next });
  }

  function clearAll() {
    setFilters({
      maxPrice: 2000, maxDuration: 30,
      stops: { 0: true, 1: true, 2: true },
      airlines: Object.fromEntries(Object.keys(airlines).map(k => [k, true])),
      departTime: { early: true, morning: true, afternoon: true, evening: true },
      amenities: { baggage: false, refundable: false, wifi: false, meals: false },
      cabins: { economy: true, premium: true, business: true, first: true },
    });
  }

  return (
    <aside className="fl-filters" id="fl-sidebar">
      <div className="fl-filter-header">
        <h3>🎛 Filters</h3>
        <button className="fl-filter-clear" onClick={clearAll}>Clear all</button>
      </div>
      <div className="fl-filter-body">

        <div className="fl-filter-group">
          <h4>💰 Price per Person</h4>
          <div className="fl-price-range">
            <div className="fl-price-values"><span>$200</span><span>${maxPrice.toLocaleString()}</span></div>
            <input type="range" className="fl-slider" min="200" max="2000" value={maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })} />
          </div>
        </div>

        <div className="fl-filter-group">
          <h4>🛑 Number of Stops</h4>
          <div className="fl-stop-pills">
            {[{ k: 0, l: 'Non-stop' }, { k: 1, l: '1 Stop' }, { k: 2, l: '2+ Stops' }].map(({ k, l }) => (
              <button key={k} className={`fl-stop-pill ${stops[k] ? 'active' : ''}`} onClick={() => toggleStop(k)}>{l}</button>
            ))}
          </div>
        </div>

        <div className="fl-filter-group">
          <h4>✈ Airlines</h4>
          {Object.keys(airlines).map((al) => (
            <label className="fl-check" key={al}>
              <input type="checkbox" checked={airlines[al]} onChange={() => toggleAirline(al)} /> {al}
            </label>
          ))}
        </div>

        <div className="fl-filter-group">
          <h4>🕐 Departure Time</h4>
          <div className="fl-time-grid">
            {[
              { k: 'early', icon: '🌅', label: 'Early', range: '12am–6am' },
              { k: 'morning', icon: '☀️', label: 'Morning', range: '6am–12pm' },
              { k: 'afternoon', icon: '🌤', label: 'Afternoon', range: '12pm–6pm' },
              { k: 'evening', icon: '🌙', label: 'Evening', range: '6pm–12am' },
            ].map(({ k, icon, label, range }) => (
              <div key={k} className={`fl-time-opt ${departTime[k] ? 'active' : ''}`} onClick={() => toggleTime(k)}>
                {icon} {label}<br /><small>{range}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="fl-filter-group">
          <h4>⏱ Max Flight Duration</h4>
          <div className="fl-price-range">
            <div className="fl-price-values"><span>2h</span><span>{maxDuration}h</span></div>
            <input type="range" className="fl-slider" min="2" max="30" value={maxDuration}
              onChange={(e) => setFilters({ ...filters, maxDuration: Number(e.target.value) })} />
          </div>
        </div>

        <div className="fl-filter-group">
          <h4>🎒 Fare &amp; Amenities</h4>
          {[
            { k: 'baggage', l: '🧳 Baggage Included' },
            { k: 'refundable', l: '💰 Refundable Only' },
            { k: 'wifi', l: '📶 WiFi Available' },
            { k: 'meals', l: '🍽 Meals Included' },
          ].map(({ k, l }) => (
            <label className="fl-check" key={k}>
              <input type="checkbox" checked={amenities[k]} onChange={() => toggleAmenity(k)} /> {l}
            </label>
          ))}
        </div>

      </div>
    </aside>
  );
}
