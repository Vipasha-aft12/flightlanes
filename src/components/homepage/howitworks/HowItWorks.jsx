import './HowItWorks.css';
const STEPS = [
  {
    icon: '🔍',
    badge: '1',
    title: 'Search',
    desc: 'Enter your destination, travel dates, and preferences. Compare cheap airline tickets and airfares from 500+ airlines instantly.',
  },
  {
    icon: '⚖️',
    badge: '2',
    title: 'Compare',
    desc: "View side-by-side flight tickets, prices, and availability to choose the best flight deals and travel options for your trip.",
  },
  {
    icon: '💳',
    badge: '3',
    title: 'Book',
    desc: 'Complete your flight booking in seconds with secure checkout and real-time confirmation using Visa, Mastercard, PayPal, or Apple Pay.',
  },
  {
    icon: '✈️',
    badge: '4',
    title: 'Fly!',
    desc: 'Get instant flight ticket confirmation and manage your booking easily with Fareoworld. Enjoy a smooth travel experience with 24/7 customer support.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section steps-bg" aria-labelledby="steps-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Simple &amp; Fast</div>
          <h2 id="steps-heading">Book Your Trip in 4 Easy Steps</h2>
          <p>From search to boarding pass in minutes with accurate price and a simple way to book flights, hotels, and travel packages.</p>
        </div>
        <ol className="steps-row fade-up" style={{ listStyle: 'none', padding: 0 }}>
          {STEPS.map((step, i) => (
            <li className="step-item" key={i}>
              <div className="step-circle" aria-hidden="true">
                {step.icon}
                <div className="step-badge">{step.badge}</div>
              </div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
