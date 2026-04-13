'use client';

export default function TravelerPicker({ travelers, setTravelers, onClose }) {
  const cabins = ['Economy', 'Premium Economy', 'Business', 'First'];

  function update(field, delta) {
    const val = travelers[field] + delta;
    if (field === 'adults' && val < 1) return;
    if (field !== 'adults' && val < 0) return;
    if (field === 'infants' && val > travelers.adults) return;
    const total = travelers.adults + travelers.children + travelers.infants - travelers[field] + val;
    if (total > 9) return;
    setTravelers({ ...travelers, [field]: val });
  }

  return (
    <div className="tp-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="tp-card">
        <div className="tp-title">Travelers &amp; Cabin Class</div>

        {[
          { key: 'adults', icon: '👤', label: 'Adults', sub: 'Age 12 and above' },
          { key: 'children', icon: '🧒', label: 'Children', sub: 'Age 2 – 11' },
          { key: 'infants', icon: '👶', label: 'Infants', sub: 'Under 2 · Lap seat' },
        ].map((row) => (
          <div className="tp-row" key={row.key}>
            <div className="tp-info">
              <div className="tp-label">{row.icon} {row.label}</div>
              <div className="tp-sub">{row.sub}</div>
            </div>
            <div className="tp-counter">
              <button onClick={() => update(row.key, -1)} disabled={travelers[row.key] <= (row.key === 'adults' ? 1 : 0)}>−</button>
              <span>{travelers[row.key]}</span>
              <button onClick={() => update(row.key, 1)}>+</button>
            </div>
          </div>
        ))}

        <div className="tp-divider"></div>
        <div className="tp-class-label">Cabin Class</div>
        <div className="tp-class-grid">
          {cabins.map((c) => (
            <button
              key={c}
              className={`tp-class-opt ${travelers.cabin === c ? 'selected' : ''}`}
              onClick={() => setTravelers({ ...travelers, cabin: c })}
            >{c}</button>
          ))}
        </div>

        <button className="tp-done" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
