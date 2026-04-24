'use client';
import { useState } from 'react';
import Link from 'next/link';
import './SupCruisesPage.css';

const NAV_ITEMS = [
    { id: 'booking', label: 'Booking' },
    { id: 'boarding', label: 'Boarding' },
    { id: 'onboard', label: 'Onboard' },
    { id: 'excursions', label: 'Excursions' },
    { id: 'cancel', label: 'Cancellations' }
  ];

export default function SupCruisesPage() {
  const [activeSection, setActiveSection] = useState('booking');
  const [openFaq, setOpenFaq] = useState('');

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? '' : id);
  }

  return (
    <div className="supcruises-page">
      <div className="sdoc-wrap">

        {/* Hero */}
        <div className="sdoc-hero">
          <img className="sdoc-hero-img" src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=90" alt="Cruise Support" />
          <div className="sdoc-hero-overlay"></div>
          <div className="sdoc-hero-inner">
            <div className="sdoc-hero-left">
              <Link href="/support" className="sdoc-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Back to Support
              </Link>
              <div className="sdoc-hero-badge">🚢 Cruise Support</div>
              <h1 className="sdoc-hero-title">Cruise Support</h1>
              <p className="sdoc-hero-sub">Cabin changes, embarkation and onboard queries</p>
            </div>
            <div className="sdoc-hero-right">
              <div className="sdoc-contact-row"><div className="sdoc-contact-icon">💬</div><div><div className="sdoc-contact-lbl">Live Chat</div><div className="sdoc-contact-val">Available 24/7</div></div></div>
              <div className="sdoc-contact-row"><div className="sdoc-contact-icon">📞</div><div><div className="sdoc-contact-lbl">Phone</div><div className="sdoc-contact-val">+1 (888) 000-0000</div></div></div>
              <div className="sdoc-contact-row"><div className="sdoc-contact-icon">📧</div><div><div className="sdoc-contact-lbl">Email</div><div className="sdoc-contact-val">support@fareoworld.com</div></div></div>
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
            
          {activeSection === 'booking' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Booking</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'booking-how-do-i-choose-the-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-how-do-i-choose-the-')}>
                  <span>How do I choose the right cabin?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Consider location (midship is more stable), deck level and type: interior, ocean view, balcony or suite.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'booking-what-is-typically-in' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-what-is-typically-in')}>
                  <span>What is typically included?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Accommodation, most meals in main dining venues, entertainment, pools and port taxes. Drinks and excursions are usually extra.</div>
              </div>
            </div>
          )}
          {activeSection === 'boarding' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Boarding</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'boarding-what-time-can-i-boar' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('boarding-what-time-can-i-boar')}>
                  <span>What time can I board?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Embarkation typically begins at 12:00–2:00 PM. You\'ll receive a boarding time group with your documents.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'boarding-what-documents-do-i-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('boarding-what-documents-do-i-')}>
                  <span>What documents do I need to board?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Passport, booking confirmation, completed online check-in form and your cruise card collected at the terminal.</div>
              </div>
            </div>
          )}
          {activeSection === 'onboard' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Onboard</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'onboard-how-does-onboard-pay' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('onboard-how-does-onboard-pay')}>
                  <span>How does onboard payment work?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Most cruise lines operate cashless — your cruise card is linked to a credit card or cash deposit at embarkation.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'onboard-are-gratuities-inclu' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('onboard-are-gratuities-inclu')}>
                  <span>Are gratuities included?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Varies by cruise line — some include them, others add $15–$25 per person per day to your onboard account.</div>
              </div>
            </div>
          )}
          {activeSection === 'excursions' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Excursions</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'excursions-book-through-the-cru' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('excursions-book-through-the-cru')}>
                  <span>Book through the cruise line or independently?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Cruise line excursions guarantee the ship waits. Independent tours are cheaper but you\'re responsible for returning on time.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'excursions-what-if-i-miss-the-s' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('excursions-what-if-i-miss-the-s')}>
                  <span>What if I miss the ship?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">You are responsible for making your own way to the next port. Always carry the ship\'s emergency number ashore.</div>
              </div>
            </div>
          )}
          {activeSection === 'cancel' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Cancellations</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'cancel-what-is-the-cancella' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-what-is-the-cancella')}>
                  <span>What is the cancellation policy?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">90+ days: deposit only. 60–90: 25%. 30–60: 50%. 15–30: 75%. Under 15 days: 100% of cruise fare.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'cancel-do-i-need-cruise-tra' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-do-i-need-cruise-tra')}>
                  <span>Do I need cruise travel insurance?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Strongly recommended — covers missed departure, medical evacuation at sea (can cost $50,000+) and cancellation.</div>
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
