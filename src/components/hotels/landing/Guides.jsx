const guides = [
  { cat: 'Booking Tips', title: '10 Ways to Get the Best Hotel Rate', meta: '6 min · 14.2k views', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80' },
  { cat: 'Destination Guide', title: 'Best Areas to Stay in Paris by Budget', meta: '8 min · 9.7k views', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80' },
  { cat: 'Luxury Travel', title: "World's Most Incredible Hotel Experiences", meta: '10 min · 22.1k views', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80' },
  { cat: 'Budget Travel', title: 'How to Find Clean, Cheap Hotels Under $50', meta: '5 min · 18.3k views', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&q=80' },
];
export default function Guides() {
  return (
    <section className="py-5 px-3 section-bg-gray">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label">Hotel Guides</div>
          <h2>Expert Hotel Tips &amp; Guides</h2>
        </div>
        <div className="row g-4 fade-up">
          {guides.map((g, i) => (
            <div key={i} className="col-6 col-lg-3">
              <div className="guide-card h-100">
                <div className="guide-img-wrap"><img src={g.img} alt={g.title} loading="lazy" /></div>
                <div className="guide-body">
                  <div className="guide-cat">{g.cat}</div>
                  <h3 className="guide-title">{g.title}</h3>
                  <div className="guide-meta">{g.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
