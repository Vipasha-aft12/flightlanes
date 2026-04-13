import './Guides.css';
const GUIDES = [
  {
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80',
    alt: 'Paris streets',
    cat: 'Destination Guide',
    title: '10 Must-Do Things in Paris in 2025',
    meta: '5 min read · 12.4k views',
  },
  {
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
    alt: 'Tokyo at night',
    cat: 'Travel Tips',
    title: "First-Timer's Complete Guide to Tokyo",
    meta: '8 min read · 9.1k views',
  },
  {
    img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80',
    alt: 'Traveler with map',
    cat: 'Budget Travel',
    title: 'How to Find Cheap Flights: 15 Expert Tips',
    meta: '6 min read · 18.7k views',
  },
  {
    img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&q=80',
    alt: 'Mediterranean cruise ship',
    cat: 'Cruise Guide',
    title: 'Mediterranean vs Caribbean: Which Cruise Is Right?',
    meta: '7 min read · 6.2k views',
  },
];

export default function Guides() {
  return (
    <section className="section" style={{ background: 'var(--g50)' }} aria-labelledby="guides-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Travel Blog</div>
          <h2 id="guides-heading">Guides &amp; Travel Inspiration</h2>
          <p>Expert tips, destination guides and travel hacks to help you plan the perfect trip.</p>
        </div>
        <div className="guides-grid fade-up">
          {GUIDES.map((g, i) => (
            <article className="guide-card" key={i} tabIndex={0} aria-label={`Article: ${g.title}`}>
              <div className="guide-img">
                <img src={g.img} alt={g.alt} loading="lazy" width={400} height={200} />
              </div>
              <div className="guide-body">
                <div className="guide-cat">{g.cat}</div>
                <h3>{g.title}</h3>
                <div className="guide-meta">{g.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
