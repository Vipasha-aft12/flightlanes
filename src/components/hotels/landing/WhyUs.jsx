const cards = [
  { icon: '💰', title: 'Best Price Guarantee', desc: "Find a lower price within 24 hours? We'll match it and refund the difference." },
  { icon: '🆓', title: 'Free Cancellation', desc: 'Cancel up to 24 hours before check-in with zero penalty on eligible hotels.' },
  { icon: '⚡', title: 'Instant Confirmation', desc: 'Your booking is confirmed instantly. E-voucher sent to your inbox within seconds.' },
  { icon: '💬', title: '24/7 Hotel Support', desc: 'Our hotel specialists are available around the clock — call, chat or email.' },
];
export default function WhyUs() {
  return (
    <section className="py-5 px-3 bg-white">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label">Why Book With Us</div>
          <h2>The Smartest Way to Book Hotels</h2>
          <p className="section-subtitle">We compare 500,000+ hotels so you always get the best rate — guaranteed.</p>
        </div>
        <div className="row g-4 fade-up">
          {cards.map((c, i) => (
            <div key={i} className="col-6 col-lg-3">
              <div className="why-card h-100">
                <div className="why-icon">{c.icon}</div>
                <h3 className="h6">{c.title}</h3>
                <p className="small text-secondary mb-0">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
