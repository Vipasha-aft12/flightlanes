const imgs = [
  { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=85', icon: '🏨' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', icon: '🏊' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', icon: '🌴' },
  { src: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80', icon: '🌊' },
  { src: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', icon: '🌆' },
  { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', icon: '💎' },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80', icon: '🏡' },
  { src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80', icon: '🏝' },
];
export default function Gallery() {
  return (
    <section className="py-5 px-3 section-bg-cream">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label">Hotel Inspiration</div>
          <h2>Find Your Perfect Stay</h2>
          <p className="section-subtitle">From rooftop infinity pools to cozy mountain lodges.</p>
        </div>
        <div className="gallery-grid fade-up">
          {imgs.map((item, i) => (
            <div key={i} className={`gallery-item ${i === 0 ? 'gallery-item-large' : ''}`}>
              <img src={item.src} alt="Gallery" loading="lazy" />
              <div className="gallery-overlay">{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
