const dests = [
  { name: 'Las Vegas, Nevada', desc: 'World-class resort hotels on the Strip', price: 'from $59/night', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=85', large: true },
  { name: 'Paris, France', desc: 'Luxury boutiques near the Eiffel Tower', price: 'from $72/night', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
  { name: 'Tokyo, Japan', desc: 'Modern hotels in Shinjuku & Shibuya', price: 'from $58/night', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80' },
  { name: 'Dubai, UAE', desc: '5★ sky-high luxury & beach resorts', price: 'from $119/night', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80' },
  { name: 'Maldives', desc: 'Overwater villas & private island resorts', price: 'from $289/night', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80' },
];
export default function Destinations() {
  return (
    <section className="py-5 px-3 bg-white">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label">Top Hotel Destinations</div>
          <h2>Most-Booked Hotel Cities</h2>
          <p className="section-subtitle">From iconic city stays to secluded beach resorts — find your perfect hotel.</p>
        </div>
        <div className="row g-3 fade-up">
          {dests.map((d, i) => (
            <div key={i} className={i === 0 ? 'col-12 col-md-6' : 'col-6 col-md-3'}>
              <div className={`dest-card ${i === 0 ? 'dest-card-large' : 'dest-card-small'}`}>
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="dest-overlay" />
                <div className="dest-info">
                  <h3 className="dest-info-title">{d.name}</h3>
                  <p className="dest-info-desc">{d.desc}</p>
                </div>
                <div className="dest-price">{d.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
