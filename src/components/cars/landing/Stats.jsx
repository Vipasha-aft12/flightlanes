const stats = [
  { num: '50K+', label: 'Vehicles Available' },
  { num: '500+', label: 'Rental Brands' },
  { num: '120+', label: 'Countries' },
  { num: 'Free', label: 'Cancellation' },
];

export default function Stats() {
  return (
    <div className="stats-section"><div className="stats-grid">
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div></div>
  );
}
