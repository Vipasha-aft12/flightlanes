'use client';
import { useState } from 'react';
import Link from 'next/link';
import './SupHotelsPage.css';

const NAV_ITEMS = [
    { id: 'reservations', label: 'Reservations' },
    { id: 'checkin', label: 'Check-in' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'cancel', label: 'Cancellations' },
    { id: 'payment', label: 'Payment' }
  ];

export default function SupHotelsPage() {
  const [activeSection, setActiveSection] = useState('reservations');
  const [openFaq, setOpenFaq] = useState('');

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? '' : id);
  }

  return (
    <div className="suphotels-page">
      <div className="sdoc-wrap">

        {/* Hero */}
        <div className="sdoc-hero">
          <img className="sdoc-hero-img" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=90" alt="Hotel Support" />
          <div className="sdoc-hero-overlay"></div>
          <div className="sdoc-hero-inner">
            <div className="sdoc-hero-left">
              <Link href="/support" className="sdoc-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Back to Support
              </Link>
              <div className="sdoc-hero-badge">🏨 Hotel Support</div>
              <h1 className="sdoc-hero-title">Hotel Support</h1>
              <p className="sdoc-hero-sub">Reservations, modifications, check-in and refunds</p>
            </div>
            <div className="sdoc-hero-right">
              <div className="sdoc-contact-row"><div className="sdoc-contact-icon">💬</div><div><div className="sdoc-contact-lbl">Live Chat</div><div className="sdoc-contact-val">Available 24/7</div></div></div>
              <div className="sdoc-contact-row"><div className="sdoc-contact-icon">📞</div><div><div className="sdoc-contact-lbl">Phone</div><div className="sdoc-contact-val">+1 (888) 000-0000</div></div></div>
              <div className="sdoc-contact-row"><div className="sdoc-contact-icon">📧</div><div><div className="sdoc-contact-lbl">Email</div><div className="sdoc-contact-val">support@flightlanes.com</div></div></div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="sdoc-layout">

          {/* Left: Sticky Nav */}
          <aside className="sdoc-nav">
            <div className="sdoc-nav-label">Topics</div>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`sdoc-nav-item ${activeSection === item.id ? 'sdoc-nav-active' : ''}`}
                onClick={() => { setActiveSection(item.id); setOpenFaq(''); }}
              >
                {item.label}
              </button>
            ))}
            <div className="sdoc-nav-divider"></div>
            <div className="sdoc-nav-label">Get Help</div>
            <button className="sdoc-nav-contact">💬 Live Chat</button>
            <button className="sdoc-nav-contact">📞 Call Us</button>
            <button className="sdoc-nav-contact">📧 Email Us</button>
          </aside>

          {/* Right: Content */}
          <div className="sdoc-content">
            
          {activeSection === 'reservations' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Reservations</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'reservations-how-do-i-book-a-hote' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('reservations-how-do-i-book-a-hote')}>
                  <span>How do I book a hotel?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Use the Hotels tab, enter your destination and dates, browse and book. Confirmation arrives within minutes.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'reservations-is-free-cancellation' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('reservations-is-free-cancellation')}>
                  <span>Is free cancellation always available?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Many hotels offer free cancellation up to 24–48 hours before check-in. Look for the &quot;Free Cancellation&quot; badge.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'reservations-can-i-book-for-someo' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('reservations-can-i-book-for-someo')}>
                  <span>Can I book for someone else?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — enter the guest\'s name. Confirmation goes to your email but the reservation is in the guest\'s name.</div>
              </div>
            </div>
          )}
          {activeSection === 'checkin' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Check-in</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'checkin-what-are-standard-ch' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('checkin-what-are-standard-ch')}>
                  <span>What are standard check-in times?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Most hotels check in from 3:00 PM and check out by 11:00 AM–12:00 PM. Contact the hotel for early or late arrangements.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'checkin-what-do-i-need-at-ch' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('checkin-what-do-i-need-at-ch')}>
                  <span>What do I need at check-in?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Booking confirmation, valid photo ID or passport, and the credit card used for booking or a card for the incidentals deposit.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'checkin-can-i-request-early-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('checkin-can-i-request-early-')}>
                  <span>Can I request early check-in?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Depends on availability. Email the hotel 24–48 hours before arrival. Many hotels accommodate early check-in if rooms are ready.</div>
              </div>
            </div>
          )}
          {activeSection === 'rooms' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Rooms</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'rooms-can-i-request-a-spec' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('rooms-can-i-request-a-spec')}>
                  <span>Can I request a specific room?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Add a special request in the booking form or contact the hotel directly. Requests are not guaranteed but most hotels try to accommodate.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'rooms-how-do-i-upgrade-my-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('rooms-how-do-i-upgrade-my-')}>
                  <span>How do I upgrade my room?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Contact the hotel 24–48 hours before arrival. Loyalty status members are often upgraded complimentarily at check-in.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'rooms-room-not-as-advertis' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('rooms-room-not-as-advertis')}>
                  <span>Room not as advertised?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Contact us immediately. We\'ll liaise with the hotel and arrange a move or compensation if there is a significant discrepancy.</div>
              </div>
            </div>
          )}
          {activeSection === 'cancel' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Cancellations</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'cancel-how-do-i-cancel-my-h' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-how-do-i-cancel-my-h')}>
                  <span>How do I cancel my hotel?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking, select your reservation and tap Cancel. If within the free window, you\'ll get a full refund.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'cancel-what-is-my-cancellat' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-what-is-my-cancellat')}>
                  <span>What is my cancellation deadline?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">The exact deadline is shown in your confirmation email and Manage Booking. It varies by hotel and rate type.</div>
              </div>
            </div>
          )}
          {activeSection === 'payment' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Payment</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'payment-when-is-my-card-char' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('payment-when-is-my-card-char')}>
                  <span>When is my card charged?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">&quot;Pay Now&quot; rates are charged immediately. &quot;Pay at Hotel&quot; rates are charged by the hotel at check-in or check-out.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'payment-what-is-an-incidenta' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('payment-what-is-an-incidenta')}>
                  <span>What is an incidentals hold?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Hotels place a temporary hold ($50–$200/night) on your card at check-in. Released within 3–7 days of check-out.</div>
              </div>
            </div>
          )}

            {/* Still Need Help */}
            <div className="sdoc-help">
              <div className="sdoc-help-left">
                <div className="sdoc-help-icon">🤝</div>
                <div className="sdoc-help-title">Still need help?</div>
                <div className="sdoc-help-sub">Our travel experts are available 24/7 across all channels.</div>
                <div className="sdoc-help-btns">
                  <button className="sdoc-help-btn">💬 Start Live Chat</button>
                  <button className="sdoc-help-btn sdoc-help-btn-ghost">📞 Call Us</button>
                </div>
              </div>
              <div className="sdoc-help-right">
                <div className="sdoc-help-form-title">Send a message</div>
                <input type="email" className="sdoc-help-input" placeholder="Your email address" />
                <textarea className="sdoc-help-textarea" rows="3" placeholder="Describe your issue — include booking reference if you have one…"></textarea>
                <button className="sdoc-help-submit" onClick={() => alert('Sent! We will reply within 24 hours.')}>📨 Send Message</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
