'use client';

export default function CruiseFilterSidebar({ filters, setFilters }) {
  const { maxPrice, durations, cruiseLines, shipTypes, boardTypes, cabinTypes } = filters;

  function toggle(group, key) {
    const next = { ...filters[group], [key]: !filters[group][key] };
    setFilters({ ...filters, [group]: next });
  }

  function clearAll() {
    setFilters({
      maxPrice: 10000,
      durations: Object.fromEntries(Object.keys(durations).map(k => [k, true])),
      cruiseLines: Object.fromEntries(Object.keys(cruiseLines).map(k => [k, true])),
      shipTypes: Object.fromEntries(Object.keys(shipTypes).map(k => [k, true])),
      boardTypes: Object.fromEntries(Object.keys(boardTypes).map(k => [k, true])),
      cabinTypes: Object.fromEntries(Object.keys(cabinTypes).map(k => [k, true])),
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
          <h4>🚢 Cruise Line</h4>
          {Object.keys(cruiseLines).map((cl) => (
            <label className="rl-check" key={cl}><input type="checkbox" checked={cruiseLines[cl]} onChange={() => toggle('cruiseLines', cl)} /> {cl}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>🛳 Ship Type</h4>
          {Object.keys(shipTypes).map((st) => (
            <label className="rl-check" key={st}><input type="checkbox" checked={shipTypes[st]} onChange={() => toggle('shipTypes', st)} /> {st}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>🍽 Board Type</h4>
          {Object.keys(boardTypes).map((bt) => (
            <label className="rl-check" key={bt}><input type="checkbox" checked={boardTypes[bt]} onChange={() => toggle('boardTypes', bt)} /> {bt}</label>
          ))}
        </div>
        <div className="rl-filter-group">
          <h4>🎯 Cabin Type</h4>
          {Object.keys(cabinTypes).map((ct) => (
            <label className="rl-check" key={ct}><input type="checkbox" checked={cabinTypes[ct]} onChange={() => toggle('cabinTypes', ct)} /> {ct}</label>
          ))}
        </div>
      </div>
    </aside>
  );
}
