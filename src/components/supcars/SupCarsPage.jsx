'use client';
import { useState } from 'react';
import Link from 'next/link';
import './SupCarsPage.css';

const NAV_ITEMS = [
    { id: 'booking', label: 'Booking' },
    { id: 'pickup', label: 'Pickup' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'drivers', label: 'Drivers' },
    { id: 'changes', label: 'Changes' }
  ];

export default function SupCarsPage() {
  const [activeSection, setActiveSection] = useState('booking');
  const [openFaq, setOpenFaq] = useState('');

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? '' : id);
  }

  return (
    <div className="supcars-page">
      <div className="sdoc-wrap">

        {/* Hero */}
        <div className="sdoc-hero">
          <img className="sdoc-hero-img" src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=90" alt="Car Rental Support" />
          <div className="sdoc-hero-overlay"></div>
          <div className="sdoc-hero-inner">
            <div className="sdoc-hero-left">
              <Link href="/support" className="sdoc-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Back to Support
              </Link>
              <div className="sdoc-hero-badge">🚗 Car Rental Support</div>
              <h1 className="sdoc-hero-title">Car Rental Support</h1>
              <p className="sdoc-hero-sub">Bookings, pick-up, insurance and returns</p>
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
            
          {activeSection === 'booking' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Booking</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'booking-what-is-included-in-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-what-is-included-in-')}>
                  <span>What is included in the base price?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">The vehicle and mandatory local taxes. Insurance, GPS, child seats and additional drivers are priced separately.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'booking-can-i-book-a-one-way' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-can-i-book-a-one-way')}>
                  <span>Can I book a one-way rental?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — select different pickup and drop-off locations. One-way fees are shown at booking.</div>
              </div>
            </div>
          )}
          {activeSection === 'pickup' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Pickup</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'pickup-what-do-i-need-to-pi' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('pickup-what-do-i-need-to-pi')}>
                  <span>What do I need to pick up the car?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Booking voucher, valid driver\'s licence, credit card in the main driver\'s name, and your passport.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'pickup-should-i-return-with' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('pickup-should-i-return-with')}>
                  <span>Should I return with a full tank?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Check your fuel policy. &quot;Full to Full&quot; (most common) means pick up full and return full. Returning less incurs premium refuelling charges.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'pickup-what-if-i-return-lat' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('pickup-what-if-i-return-lat')}>
                  <span>What if I return late?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Most agencies charge hourly or a full extra day. Call the agency as soon as possible if you are running late.</div>
              </div>
            </div>
          )}
          {activeSection === 'insurance' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Insurance</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'insurance-what-insurance-is-in' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('insurance-what-insurance-is-in')}>
                  <span>What insurance is included?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Basic Third Party Liability is mandatory and always included. We recommend adding Collision Damage Waiver (CDW) for peace of mind.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'insurance-what-is-an-excess/de' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('insurance-what-is-an-excess/de')}>
                  <span>What is an excess/deductible?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">The amount you\'re liable for if the car is damaged, even with CDW. Reduce it to zero with Super CDW.</div>
              </div>
            </div>
          )}
          {activeSection === 'drivers' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Drivers</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'drivers-what-is-the-minimum-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('drivers-what-is-the-minimum-')}>
                  <span>What is the minimum age?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">21 in most countries. Drivers aged 21–24 often pay a young driver surcharge. Some premium vehicles require 25+.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'drivers-can-i-add-an-additio' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('drivers-can-i-add-an-additio')}>
                  <span>Can I add an additional driver?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — they must be present at pickup with their own valid licence. A small daily fee usually applies.</div>
              </div>
            </div>
          )}
          {activeSection === 'changes' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Changes</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'changes-how-do-i-cancel-my-c' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-how-do-i-cancel-my-c')}>
                  <span>How do I cancel my car booking?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking. Most prepaid bookings allow free cancellation 24–48 hours before pickup.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'changes-how-do-i-extend-my-r' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-how-do-i-extend-my-r')}>
                  <span>How do I extend my rental?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Contact the rental agency directly. Extensions are subject to availability and may be priced differently.</div>
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
