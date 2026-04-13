import './Gallery.css';
const GALLERY_IMGS = [
  { src: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80', alt: 'Traveler at sunset overlook' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', alt: 'Aerial view of blue lagoon' },
  { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', alt: 'Paris Eiffel Tower at night' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', alt: 'Tropical beach with white sand' },
  { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80', alt: 'Person at beach looking at ocean' },
  { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80', alt: 'Tokyo city skyline at night' },
  { src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', alt: 'Northern lights over Norway' },
  { src: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', alt: 'Dubai skyline at dusk' },
];

export default function Gallery() {
  return (
    <section className="section" style={{ background: 'white' }} aria-labelledby="gallery-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Travel Inspiration</div>
          <h2 id="gallery-heading">Discover the World&apos;s Beauty</h2>
          <p>From mountain peaks to ocean sunsets — your next adventure is out there.</p>
        </div>
        <div className="gallery-grid fade-up" role="list">
          {GALLERY_IMGS.map((img, i) => (
            <div className="gallery-item" key={i} role="listitem" tabIndex={0} aria-label={img.alt}>
              <img src={img.src} alt={img.alt} loading="lazy" width={i === 0 ? 800 : 600} height={200} />
              <div className="gallery-overlay" aria-hidden="true">📍</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
