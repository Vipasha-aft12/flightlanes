import './Stats.css';
const STATS = [
  { num: '2M+', label: 'Happy Travelers' },
  { num: '500+', label: 'Airlines Worldwide' },
  { num: '150+', label: 'Countries Covered' },
  { num: '4.9★', label: 'Average Rating' },
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
