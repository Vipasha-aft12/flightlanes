'use client';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';

export default function CarCard({ car, days = 4 }) {
  const router = useRouter();
  const { showLoading } = useLoading();
  const total = car.price * days;
  const bookUrl = `/cars/booking/${car.id}?price=${car.price}&name=${encodeURIComponent(car.name)}&company=${encodeURIComponent(car.company.name)}&type=${car.type}&days=${days}`;
  const detailUrl = `/cars/detail/${car.id}?price=${car.price}&name=${encodeURIComponent(car.name)}&company=${encodeURIComponent(car.company.name)}&type=${car.type}&days=${days}`;

  return (
    <div className={`car-card ${car.featured ? 'featured' : ''}`}>
      {car.featured && (
        <div style={{ background: 'linear-gradient(135deg,var(--teal),var(--tl))', color: 'white', fontSize: '.66rem', fontWeight: 800, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '5px', gridColumn: '1/-1', letterSpacing: '.03em' }}>
          ⭐ Best Deal — Lowest price + free cancellation
        </div>
      )}

      <div className="car-img-col">
        <img src={car.img} alt={car.name} />
        <div className="car-brand-logo"><span>{car.company.logo}</span> {car.company.name}</div>
      </div>

      <div className="car-body">
        <div className="car-class-badge"
          style={car.type === 'Luxury' ? { background: 'linear-gradient(135deg,#fbbf24,#d97706)', color: 'white', border: 'none' }
            : car.type === 'Electric' ? { background: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' } : {}}>
          {car.typeEmoji} {car.type}
        </div>
        <div className="car-name">{car.name}</div>
        <div className="car-meta">
          <span>👥 {car.seats} Seats</span>
          <span>🧳 {car.bags} Bags</span>
          <span>⚙ {car.transmission}</span>
          <span>{car.extras[0]}</span>
        </div>
        <div className="car-features">
          {car.features.map((f, i) => (
            <span key={i} className={`car-feat-tag ${f.green ? 'car-feat-green' : ''}`}>{f.text}</span>
          ))}
        </div>
        <div className="car-company">
          <div className="car-company-logo">{car.company.logo}</div>
          <div>
            <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--g800)' }}>{car.company.name}</div>
            <div style={{ fontSize: '.72rem', color: 'var(--g600)' }}>{car.company.rating} ★ · {car.company.reviews.toLocaleString()} reviews</div>
          </div>
        </div>
      </div>

      <div className="car-price-col">
        <div className="ht-price-from">from</div>
        <div className="car-price-main">${car.price}</div>
        <div className="car-price-per">/ day</div>
        <div className="car-total">${total} total · {days} days</div>
        <div className="car-tags">
          {car.freeCancellation
            ? <span className="car-tag-badge" style={{ background: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>✅ Free Cancel</span>
            : <span className="car-tag-badge" style={{ background: '#fff7ed', color: '#c2410c', borderColor: '#fed7aa' }}>⚠ Non-refundable</span>}
        </div>
        <button className="car-book-btn" onClick={() => showLoading('car-booking', () => router.push(bookUrl))}>Book Now →</button>
        <button className="car-details-btn" onClick={() => showLoading('car-detail', () => router.push(detailUrl))}>View Details</button>
      </div>
    </div>
  );
}
