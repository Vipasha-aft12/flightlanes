'use client';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';

export default function PackageCard({ pkg }) {
  const router = useRouter();
  const { showLoading } = useLoading();
  const twoP = pkg.price * 2;
  const bookUrl = `/packages/booking/${pkg.id}?price=${pkg.price}&name=${encodeURIComponent(pkg.name)}&dest=${pkg.destination}&nights=${pkg.nights}&airline=${encodeURIComponent(pkg.airline)}`;
  const detailUrl = `/packages/detail/${pkg.id}?price=${pkg.price}&name=${encodeURIComponent(pkg.name)}&dest=${pkg.destination}&nights=${pkg.nights}&airline=${encodeURIComponent(pkg.airline)}&hotel=${encodeURIComponent(pkg.hotel)}&board=${encodeURIComponent(pkg.board)}&star=${encodeURIComponent(pkg.starRating)}`;

  return (
    <div className={`pkg-result-card ${pkg.featured ? 'featured' : ''}`}>
      {pkg.featured && (
        <div style={{ background: 'linear-gradient(135deg,#d97706,#92400e)', color: 'white', fontSize: '.66rem', fontWeight: 800, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '5px', gridColumn: '1/-1', letterSpacing: '.03em' }}>
          🏆 Best Package — Most booked this week
        </div>
      )}
      <div className="pkg-res-img">
        <img src={pkg.img} alt={pkg.name} loading="eager" />
        <div className="pkg-res-badge">{pkg.destIcon} {pkg.type}</div>
      </div>
      <div className="pkg-res-body">
        <div className="pkg-res-label">✈ Round Trip · {pkg.nights} Nights · {pkg.destName}</div>
        <div className="pkg-res-name">{pkg.name}</div>
        <div className="pkg-res-sub">{pkg.sub}</div>
        <div className="pkg-res-includes">
          {pkg.includes.map((inc, i) => <span className="pkg-res-inc" key={i}>{inc}</span>)}
        </div>
        <div className="pkg-res-rating">
          <div className="pkg-res-score">{pkg.rating}</div>
          <div style={{ fontSize: '.78rem', color: 'var(--g600)' }}><strong>Exceptional</strong> · {pkg.reviews.toLocaleString()} reviews</div>
        </div>
      </div>
      <div className="pkg-res-price-col">
        <div style={{ fontSize: '.65rem', color: 'var(--g400)', fontWeight: 600 }}>from</div>
        <div className="pkg-res-price">${pkg.price.toLocaleString()}</div>
        <div style={{ fontSize: '.68rem', color: 'var(--g400)' }}>per person</div>
        <div style={{ fontSize: '.78rem', color: 'var(--g600)', fontWeight: 600 }}>${twoP.toLocaleString()} for 2 people</div>
        {pkg.freeCancellation && <span className="ht-free-cancel">✅ Free Cancellation</span>}
        <button className="pkg-res-book-btn" onClick={() => showLoading('package-booking', () => router.push(bookUrl))}>Book Package →</button>
        <button className="car-details-btn" onClick={() => showLoading('package-detail', () => router.push(detailUrl))}>View Details</button>
      </div>
    </div>
  );
}
