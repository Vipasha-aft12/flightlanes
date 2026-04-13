import './HowItWorks.css';
const STEPS = [
  {
    icon: '🔍',
    badge: '1',
    title: 'Search',
    desc: 'Enter destination, dates & preferences. Compare 500+ airlines instantly.',
  },
  {
    icon: '⚖️',
    badge: '2',
    title: 'Compare',
    desc: "See side-by-side prices, reviews and availability. Pick what's best for you.",
  },
  {
    icon: '💳',
    badge: '3',
    title: 'Book',
    desc: 'Secure checkout in 60 seconds. Visa, Mastercard, PayPal or Apple Pay.',
  },
  {
    icon: '✈️',
    badge: '4',
    title: 'Fly!',
    desc: 'Instant e-ticket confirmation. Manage everything from the Flightlanes app.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section steps-bg" aria-labelledby="steps-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Simple &amp; Fast</div>
          <h2 id="steps-heading">Book Your Trip in 4 Easy Steps</h2>
          <p>From search to boarding pass in minutes. No hidden fees, no complicated forms.</p>
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
