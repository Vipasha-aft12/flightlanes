'use client';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';
const hotels = [
  { stars: '★★★★★', reviews: '3,841', loc: 'Santorini', name: 'Caldera Cliffside Suites', feats: ['🌊 Infinity Pool', '🍳 Breakfast Incl.', '🛁 Private Terrace', '🧖 Spa Access'], price: '$299', img: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80' },
  { stars: '★★★★★', reviews: '5,210', loc: 'New York City', name: 'The Fifth Avenue Signature', feats: ['🌆 City View', '🏋 Gym & Spa', '🍽 Rooftop Restaurant', '📶 Free WiFi'], price: '$219', img: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80' },
  { stars: '★★★★★', reviews: '2,190', loc: 'Bali, Indonesia', name: 'Seminyak Private Pool Villa', feats: ['🏊 Private Pool', '🌴 Garden View', '🍳 Full Kitchen', '🚗 Free Shuttle'], price: '$189', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80' },
];
export default function FeaturedHotels() {
  const router = useRouter();
  const { showLoading } = useLoading();
  return (
    <section className="py-5 px-3 section-bg-gray">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label">Editor's Picks</div>
          <h2>Top-Rated Hotels This Week</h2>
          <p className="section-subtitle">Highest-rated hotels by Flightlanes travelers — verified reviews, no paid rankings.</p>
        </div>
        <div className="row g-4 fade-up">
          {hotels.map((h, i) => (
            <div key={i} className="col-12 col-md-4">
              <div className="pkg-card h-100">
                <div className="pkg-img-wrap"><img src={h.img} alt={h.name} loading="lazy" /></div>
                <div className="pkg-body">
                  <div className="pkg-stars mb-2">{h.stars} ({h.reviews}) · {h.loc}</div>
                  <h3 className="h6 mb-2">{h.name}</h3>
                  <div className="d-flex gap-1 flex-wrap mb-2">{h.feats.map((f, j) => <span key={j} className="pkg-feat">{f}</span>)}</div>
                  <div className="pkg-cancel-text mb-3">✅ Free cancellation · No prepayment</div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                    <div className="pkg-price">{h.price} <span className="pkg-price-per">/ night</span></div>
                    <button className="btn-fl-book" onClick={() => showLoading('hotel-results', () => router.push('/hotels/listing'))}>View Deal</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
