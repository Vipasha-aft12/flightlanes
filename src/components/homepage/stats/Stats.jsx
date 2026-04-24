import './Stats.css';
const STATS = [
  { num: '2M+', label: 'Satisfied Travelers' },
  { num: '500+', label: 'Airlines to Book From' },
  { num: '4740+', label: 'Routes Worldwide' },
  { num: '4.9★', label: 'Customer Rating' },
];

export default function Stats() {
  return (
    <div className="stats-section">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
