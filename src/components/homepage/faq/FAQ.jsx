'use client';
import { useState } from 'react';
import './FAQ.css';

const FAQS = [
  {
    q: 'How do I get the cheapest flight prices?',
    a: 'Flightlanes scans 500+ airlines in real-time. Book 6–8 weeks ahead, fly mid-week (Tue/Wed), and enable price alerts to be notified the moment fares drop to your target.',
  },
  {
    q: 'Can I cancel or change my booking?',
    a: 'Yes! Most bookings can be changed or cancelled from your account dashboard. Look for the "Free Cancellation" badge when booking for maximum flexibility.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Absolutely. Flightlanes uses 256-bit SSL encryption, is PCI-DSS Level 1 compliant, and never stores your full card details. We support Visa, Mastercard, Amex, PayPal and Apple Pay.',
  },
  {
    q: 'Do you offer a price match guarantee?',
    a: 'Yes! Find a lower price within 24 hours of booking and we\'ll match it and refund the difference. Contact support with a screenshot of the lower price.',
  },
  {
    q: 'How do Flightlanes Rewards points work?',
    a: 'Earn 1 point per $1 on flights, 2 on hotels, 3 on packages. Redeem 5,000 points for $50 off your next booking. Elite members get double points and exclusive perks.',
  },
  {
    q: 'How do I contact customer support?',
    a: "We're available 24/7 via live chat (bottom-right button), phone at 1-800-FLIGHT-1, or email at support@flightlanes.com. Average chat response under 3 minutes.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  function toggle(idx) {
    setOpenIdx(prev => (prev === idx ? null : idx));
  }

  return (
    <section className="section faq-bg" aria-labelledby="faq-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Got Questions?</div>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>Everything you need to know about booking with Flightlanes.</p>
        </div>

        <div className="faq-grid fade-up">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? ' open' : ''}`}
                onClick={() => toggle(i)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(i)}
              >
                <div className="faq-q">
                  {faq.q}
                  <div className="faq-icon" aria-hidden="true">+</div>
                </div>
                <div className="faq-ans" aria-hidden={!isOpen}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
