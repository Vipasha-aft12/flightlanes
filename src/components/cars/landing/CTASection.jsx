import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="lp-cta-sec">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <h2>Ready to Hit the Road?</h2>
        <p>Compare 500+ rental brands for the best daily rates. Instant booking, free cancellation, 24/7 support.</p>
        <div className="lp-cta-btns"><Link href="/car-rentals/"><button className="btn-white">🚗 Search Car Rentals Now</button></Link></div>
      </div>
    </section>
  );
}
