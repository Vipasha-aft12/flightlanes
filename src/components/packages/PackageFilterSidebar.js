'use client';

export default function PackageFilterSidebar({ filters, setFilters }) {
  const { maxPrice, durations, destinations, packageTypes, boardTypes, starRatings } = filters;

  function toggle(group, key) {
    setFilters({ ...filters, [group]: { ...filters[group], [key]: !filters[group][key] } });
  }

  function clearAll() {
    setFilters({
      maxPrice: 10000,
      durations: Object.fromEntries(Object.keys(durations).map(k => [k, true])),
      destinations: Object.fromEntries(Object.keys(destinations).map(k => [k, true])),
      packageTypes: Object.fromEntries(Object.keys(packageTypes).map(k => [k, true])),
      boardTypes: Object.fromEntries(Object.keys(boardTypes).map(k => [k, true])),
      starRatings: Object.fromEntries(Object.keys(starRatings).map(k => [k, true])),
    });
  }

  return (
    <aside className="rl-filters">
      <div className="rl-filter-header"><h3>🎛 Filters</h3><button className="rl-filter-clear" onClick={clearAll}>Clear all</button></div>
      <div className="rl-filter-body">
        <div className="rl-filter-group">
          <h4>💰 Price per Person</h4>
          <div className="rl-price-range">
            <div className="rl-price-values"><span>$299</span><span>${maxPrice.toLocaleString()}</span></div>
            <input type="range" className="rl-slider" min="299" max="10000" value={maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })} />
          </div>
        </div>
        <div className="rl-filter-group">
          <h4>⏱ Duration</h4>
          {Object.keys(durations).map((d) => (
            <label className="rl-check" key={d}><input type="checkbox" checked={durations[d]} onChange={() => toggle('durations', d)} /> {d === '3-5' ? '3–5 nights' : d === '6-9' ? '6–9 nights' : '10–14 nights'}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>🌍 Destination</h4>
          {Object.keys(destinations).map((d) => (
            <label className="rl-check" key={d}><input type="checkbox" checked={destinations[d]} onChange={() => toggle('destinations', d)} /> {d}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>🎯 Package Type</h4>
          {Object.keys(packageTypes).map((t) => (
            <label className="rl-check" key={t}><input type="checkbox" checked={packageTypes[t]} onChange={() => toggle('packageTypes', t)} /> {t}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>🍽 Board Type</h4>
          {Object.keys(boardTypes).map((b) => (
            <label className="rl-check" key={b}><input type="checkbox" checked={boardTypes[b]} onChange={() => toggle('boardTypes', b)} /> {b}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>⭐ Star Rating</h4>
          {Object.keys(starRatings).map((s) => (
            <label className="rl-check" key={s}><input type="checkbox" checked={starRatings[s]} onChange={() => toggle('starRatings', s)} /> {s}</label>
          ))}
        </div>
      </div>
    </aside>
  );
}
