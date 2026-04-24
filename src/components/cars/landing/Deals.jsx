import Link from 'next/link';
import { carDeals } from '@/lib/carUtils';

export default function Deals() {
  return (
    <section className="section deals-bg">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Today&apos;s Deals</div>
          <h2>Best Car Rental Deals</h2>
          <p>Exclusive rates from Hertz, Enterprise, Avis, Budget and 500+ more rental brands.</p>
        </div>
        <div className="deals-grid fade-up">
          {carDeals.map((deal, i) => (
            <div className="deal-card" key={i}>
              <div className="deal-img"><img src={deal.img} alt={deal.title} loading="eager" /><div className="deal-badge">{deal.badge}</div></div>
              <div className="deal-body">
                <div className="deal-tag">{deal.tag}</div>
                <h3>{deal.title}</h3>
                <div className="deal-meta"><span>{deal.meta}</span></div>
                <div className="deal-footer">
                  <div><div className="deal-from">from</div><div className="deal-amount">${deal.price}<span className="deal-per">/day</span></div></div>
                  <Link href="/car-rentals/results"><button className="btn-book">Book Now</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
