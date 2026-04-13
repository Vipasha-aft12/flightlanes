import './WhyUs.css';
const WHY_ITEMS = [
  {
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
    title: 'Best Price Guarantee',
    desc: 'We match any lower price you find within 24 hours. Travel confidently knowing you got the best deal.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>,
    title: 'Instant Booking',
    desc: 'Book flights, hotels and packages in under 3 minutes. Real-time availability with instant confirmation.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>,
    title: '24/7 Live Support',
    desc: 'Our travel experts are available round the clock via chat, phone or email — wherever you are.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.66L17 8v4c0 3.43-2.35 6.64-5 7.64C9.35 18.64 7 15.43 7 12V8l5-2.34z"/></svg>,
    title: 'Secure &amp; Trusted',
    desc: 'Bank-level SSL encryption. Your payments and personal data are always fully protected.',
  },
];

export default function WhyUs() {
  return (
    <section className="section" style={{ background: 'var(--g50)' }} aria-labelledby="why-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Why Flightlanes</div>
          <h2 id="why-heading">Travel Smarter, Not Harder</h2>
          <p>Everything you need for a perfect trip — at one place, with zero hassle.</p>
        </div>
        <div className="why-grid fade-up">
          {WHY_ITEMS.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
