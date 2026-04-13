'use client';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';
const deals = [
  { badge: '🔥 Flash Sale', tag: '🏨 5-Star · New York City', title: 'The Manhattan Grand Hotel', meta: '🗓 Jul 1–7 · 6 nights · Midtown Manhattan', price: '$189', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80' },
  { badge: '✨ Best Value', tag: '🌴 5-Star Resort · Bali', title: 'Ubud Jungle Infinity Pool Resort', meta: '🗓 Aug 1–8 · Breakfast incl. · Ubud, Bali', price: '$149', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
  { badge: '💎 Luxury Pick', tag: '🌟 Overwater Villa · Maldives', title: 'Turquoise Lagoon Overwater Bungalow', meta: '🗓 Sep 15–22 · All-inclusive', price: '$489', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
];
export default function Deals() {
  const router = useRouter();
  const { showLoading } = useLoading();
  return (
    <section className="py-5 px-3 section-bg-cream">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label">Limited-Time Offers</div>
          <h2>Exclusive Hotel Deals</h2>
          <p className="section-subtitle">Hand-picked hotel offers updated daily. Book fast — these rates won't last long.</p>
        </div>
        <div className="row g-4 fade-up">
          {deals.map((d, i) => (
            <div key={i} className="col-12 col-md-4">
              <div className="deal-card h-100">
                <div className="deal-img-wrap">
                  <img src={d.img} alt={d.title} loading="lazy" />
                  <div className="deal-badge">{d.badge}</div>
                </div>
                <div className="deal-body">
                  <div className="deal-tag mb-1">{d.tag}</div>
                  <h3 className="h6 mt-1 mb-1">{d.title}</h3>
                  <div className="deal-meta mb-3">{d.meta}</div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                    <div>
                      <div className="deal-from-label">from</div>
                      <div className="deal-amount">{d.price}<span className="deal-per">/night</span></div>
                    </div>
                    <button className="btn-fl-book" onClick={() => showLoading('hotel-booking', () => router.push('/hotels/booking'))}>Book Now</button>
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
