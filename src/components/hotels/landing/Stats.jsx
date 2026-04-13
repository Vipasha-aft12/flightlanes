const stats = [
  { num: '500K+', label: 'Hotels Worldwide' },
  { num: '195+', label: 'Countries' },
  { num: '4.8★', label: 'Avg Hotel Rating' },
  { num: 'Free', label: 'Cancellation Options' },
];
export default function Stats() {
  return (
    <section className="stats-section py-5 px-3">
      <div className="container-xl">
        <div className="row text-center">
          {stats.map((s, i) => (
            <div key={i} className={`col-6 col-md-3 py-3 ${i < 3 ? 'stat-divider' : ''}`}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
