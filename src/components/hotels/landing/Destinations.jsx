import Link from 'next/link';

const dests = [
  { name: 'Bali, Indonesia', desc: 'Jungle villas, beach clubs & infinity pools', price: 'from $89/night', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85', large: true, href: '/hotels/indonesia/bali/' },
  { name: 'San Juan, Puerto Rico', desc: 'Historic Old San Juan beachfront hotels', price: 'from $129/night', img: 'https://images.unsplash.com/photo-1579687196544-08ae57ab5c11?w=600&q=80', href: '/hotels/puerto-rico/san-juan/' },
  { name: 'Cancún, Mexico', desc: 'All-inclusive resorts on the Caribbean', price: 'from $149/night', img: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&q=80', href: '/hotels/mexico/cancun/' },
  { name: 'Seoul, South Korea', desc: 'Modern city hotels in Gangnam & Myeongdong', price: 'from $99/night', img: 'https://images.unsplash.com/photo-1538485399081-7c8978d8b5e2?w=600&q=80', href: '/hotels/south-korea/seoul/' },
  { name: 'Dolomites, Italy', desc: 'Alpine lodges & luxury mountain resorts', price: 'from $179/night', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', href: '/hotels/italy/dolomites/' },
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
              <Link href={d.href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className={`dest-card ${i === 0 ? 'dest-card-large' : 'dest-card-small'}`}>
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <div className="dest-overlay" />
                  <div className="dest-info">
                    <h3 className="dest-info-title">{d.name}</h3>
                    <p className="dest-info-desc">{d.desc}</p>
                  </div>
                  <div className="dest-price">{d.price}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
