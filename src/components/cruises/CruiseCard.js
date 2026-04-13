'use client';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';

export default function CruiseCard({ cruise }) {
  const router = useRouter();
  const { showLoading } = useLoading();
  const bookUrl = `/cruises/booking/${cruise.id}?price=${cruise.price}&name=${encodeURIComponent(cruise.name)}&line=${encodeURIComponent(cruise.cruiseLine.name)}&dest=${cruise.destination}&nights=${cruise.nights}`;
  const detailUrl = `/cruises/detail/${cruise.id}?price=${cruise.price}&name=${encodeURIComponent(cruise.name)}&line=${encodeURIComponent(cruise.cruiseLine.name)}&dest=${cruise.destination}&nights=${cruise.nights}`;
  const twoGuests = cruise.price * 2;

  return (
    <div className={`crs-card ${cruise.featured ? 'featured' : ''}`}>
      {cruise.featured && (
        <div style={{ background: 'linear-gradient(135deg,var(--teal),var(--tl))', color: 'white', fontSize: '.66rem', fontWeight: 800, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '5px', gridColumn: '1/-1', letterSpacing: '.03em' }}>
          ⭐ Top Pick — Best rated for this destination
        </div>
      )}
      <div className="crs-img">
        <img src={cruise.img} alt={cruise.name} loading="eager" />
        <div className="crs-badge">{cruise.destIcon} {cruise.destName}</div>
      </div>
      <div className="crs-body">
        <div className="crs-line">{cruise.cruiseLine.name} · {cruise.cruiseLine.ship}</div>
        <div className="crs-name">{cruise.name}</div>
        <div className="crs-route">
          {cruise.ports.map((port, i) => (
            <span key={i}>{i === 0 ? `📍 ${port}` : i < cruise.ports.length ? port : port}{i < cruise.ports.length - 1 && <span className="crs-route-arrow">→</span>}</span>
          ))}
        </div>
        <div className="crs-feats">
          {cruise.feats.map((f, i) => <span className="crs-feat" key={i}>{f}</span>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
          <div className="pkg-res-score" style={{ background: 'var(--teal)', color: 'white', fontWeight: 800, fontSize: '.88rem', padding: '5px 10px', borderRadius: '8px' }}>{cruise.rating}</div>
          <div style={{ fontSize: '.78rem', color: 'var(--g600)' }}><strong>Excellent</strong> · {cruise.reviews.toLocaleString()} reviews</div>
        </div>
      </div>
      <div className="crs-price-col">
        <div style={{ fontSize: '.65rem', color: 'var(--g400)', fontWeight: 600 }}>from</div>
        <div className="crs-price">${cruise.price}</div>
        <div style={{ fontSize: '.68rem', color: 'var(--g400)' }}>per person</div>
        <div style={{ fontSize: '.78rem', color: 'var(--g600)', fontWeight: 600 }}>${twoGuests.toLocaleString()} for 2 guests</div>
        {cruise.freeCancellation && <span className="ht-free-cancel">✅ Free Cancellation</span>}
        {cruise.lowDeposit && !cruise.freeCancellation && <span className="ht-free-cancel">✅ Low Deposit ${cruise.depositAmount}</span>}
        <button className="crs-book-btn" onClick={() => showLoading('cruise-booking', () => router.push(bookUrl))}>Book Now →</button>
        <button className="car-details-btn" onClick={() => showLoading('cruise-detail', () => router.push(detailUrl))}>View Itinerary</button>
      </div>
    </div>
  );
}
