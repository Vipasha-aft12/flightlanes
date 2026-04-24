'use client';
import { useState } from 'react';
import './FAQ.css';

const FAQS = [
  {
    q: '1. How do you find the best flight ticket prices?',
    a: 'We compare real-time airfares across 500+ airlines and 4740+ routes to show the most affordable options available for your trip.',
  },
  {
    q: '2. Can I book international and domestic flights here?',
    a: 'Yes, you can book both domestic and international flight tickets across multiple destinations with flexible options.',
  },
  {
    q: '3. Are there any hidden charges in the final price?',
    a: 'No, all prices are shown transparently before booking, so you know the total cost of your flight in advance.',
  },
  {
    q: '4. How fast is the booking process?',
    a: 'You can complete your flight booking in just a few minutes with instant confirmation after successful payment.',
  },
  {
    q: '5. What support options are available if I need help?',
    a: 'Our 24/7 support team is available through chat, phone, and email to assist with bookings, changes, or travel queries.',
  },
  {
    q: '6. Why should I book through Fareoworld?',
    a: "You get access to multiple airlines, competitive fares, real-time availability, and a smooth booking experience in one place.",
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
          <p>Everything you need to know about booking with Fareoworld.</p>
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
