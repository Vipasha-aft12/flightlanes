'use client';
import { useState } from 'react';
import Link from 'next/link';
import './SupFlightsPage.css';

const NAV_ITEMS = [
    { id: 'booking', label: 'Booking' },
    { id: 'manage', label: 'Manage' },
    { id: 'changes', label: 'Changes' },
    { id: 'cancel', label: 'Cancellations' },
    { id: 'checkin', label: 'Check-in' },
    { id: 'baggage', label: 'Baggage' },
    { id: 'payment', label: 'Payment' }
  ];

export default function SupFlightsPage() {
  const [activeSection, setActiveSection] = useState('booking');
  const [openFaq, setOpenFaq] = useState('');

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? '' : id);
  }

  return (
    <div className="supflights-page">
      <div className="sdoc-wrap">

        {/* Hero */}
        <div className="sdoc-hero">
          <img className="sdoc-hero-img" src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=90" alt="Flight Support" />
          <div className="sdoc-hero-overlay"></div>
          <div className="sdoc-hero-inner">
            <div className="sdoc-hero-left">
              <Link href="/support" className="sdoc-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Back to Support
              </Link>
              <div className="sdoc-hero-badge">✈ Flight Support</div>
              <h1 className="sdoc-hero-title">Flight Support</h1>
              <p className="sdoc-hero-sub">Bookings, changes, check-in, baggage and cancellations</p>
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
                <div className="sdoc-section-count">4 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'booking-how-far-in-advance-c' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-how-far-in-advance-c')}>
                  <span>How far in advance can I book?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Most airlines release seats up to 11 months in advance. For the best fares, book 6–8 weeks ahead for domestic and 2–3 months ahead for international routes.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'booking-can-i-book-for-someo' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-can-i-book-for-someo')}>
                  <span>Can I book for someone else?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — enter the traveller\'s full name exactly as it appears on their passport. Your email receives the confirmation but the booking is in the traveller\'s name.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'booking-refundable-vs-non-re' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-refundable-vs-non-re')}>
                  <span>Refundable vs non-refundable fare?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Refundable fares allow cancellation for a full cash refund. Non-refundable fares are cheaper but only eligible for travel credit or rebooking minus a change fee.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'booking-can-i-add-children-o' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-can-i-add-children-o')}>
                  <span>Can I add children or infants?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes. Use the Travellers selector: Adults (18+), Children (2–17), Infants (under 2). Max 9 passengers per booking.</div>
              </div>
            </div>
          )}
          {activeSection === 'manage' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Manage</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'manage-where-is-my-e-ticket' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('manage-where-is-my-e-ticket')}>
                  <span>Where is my e-ticket?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Your e-ticket is emailed within 5 minutes of booking. Check your spam folder. You can also resend it from Manage Booking in your account.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'manage-how-do-i-view-my-boo' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('manage-how-do-i-view-my-boo')}>
                  <span>How do I view my booking?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Log in to your account and go to Manage Booking. You\'ll see all current and past bookings with options to change, add extras or cancel.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'manage-can-i-add-a-frequent' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('manage-can-i-add-a-frequent')}>
                  <span>Can I add a frequent flyer number?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes. Go to Manage Booking, select your flight and add your frequent flyer number in the passenger details section.</div>
              </div>
            </div>
          )}
          {activeSection === 'changes' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Changes</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'changes-how-do-i-change-my-f' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-how-do-i-change-my-f')}>
                  <span>How do I change my flight date?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking → Change Flight and select a new date. Fare differences and any change fees are shown before you confirm.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'changes-can-i-change-the-pas' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-can-i-change-the-pas')}>
                  <span>Can I change the passenger name?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Minor corrections (up to 3 characters) are usually allowed at no charge. Full name changes require cancellation and rebooking.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'changes-airline-changed-my-f' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-airline-changed-my-f')}>
                  <span>Airline changed my flight — what now?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">You are entitled to a full refund or free rebooking. Contact us within 72 hours and we\'ll arrange this immediately.</div>
              </div>
            </div>
          )}
          {activeSection === 'cancel' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Cancellations</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'cancel-how-do-i-cancel-my-f' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-how-do-i-cancel-my-f')}>
                  <span>How do I cancel my flight?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking → Cancel Booking. Refunds go back to your original payment method within 5–10 business days.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'cancel-24-hour-cancellation' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-24-hour-cancellation')}>
                  <span>24-hour cancellation policy?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">All bookings can be cancelled for a full refund within 24 hours of purchase, as long as the flight departs more than 7 days from booking.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'cancel-how-long-does-a-refu' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-how-long-does-a-refu')}>
                  <span>How long does a refund take?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">5–10 business days for credit/debit cards. 3–5 days for PayPal. Travel credit is instant.</div>
              </div>
            </div>
          )}
          {activeSection === 'checkin' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Check-in</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'checkin-how-do-i-check-in?' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('checkin-how-do-i-check-in?')}>
                  <span>How do I check in?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Online check-in opens 24–48 hours before departure. Go to the airline\'s website or app with your booking reference. Airport counters close 45–60 minutes before departure.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'checkin-what-documents-do-i-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('checkin-what-documents-do-i-')}>
                  <span>What documents do I need?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Government-issued photo ID or passport, printed or digital boarding pass, and any required visas for your destination.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'checkin-what-if-i-miss-my-fl' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('checkin-what-if-i-miss-my-fl')}>
                  <span>What if I miss my flight?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Contact the airline immediately. Flexible tickets allow rebooking. Non-refundable tickets may offer standby or travel credit.</div>
              </div>
            </div>
          )}
          {activeSection === 'baggage' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Baggage</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'baggage-what-is-my-baggage-a' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('baggage-what-is-my-baggage-a')}>
                  <span>What is my baggage allowance?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Your confirmed allowance is in your booking confirmation and Manage Booking. Economy typically includes one carry-on bag.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'baggage-how-do-i-add-extra-b' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('baggage-how-do-i-add-extra-b')}>
                  <span>How do I add extra baggage?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking → Add Baggage. Pre-paid baggage is significantly cheaper than airport rates.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'baggage-what-if-my-bag-is-lo' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('baggage-what-if-my-bag-is-lo')}>
                  <span>What if my bag is lost or damaged?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Report it at the Baggage Services desk before leaving the airport. File a Property Irregularity Report (PIR). We can assist with the claims process.</div>
              </div>
            </div>
          )}
          {activeSection === 'payment' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Payment</div>
                <div className="sdoc-section-count">3 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'payment-what-payment-methods' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('payment-what-payment-methods')}>
                  <span>What payment methods do you accept?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Visa, Mastercard, American Express, PayPal and Apple Pay. Payment is secured by 256-bit SSL encryption.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'payment-why-has-the-price-ch' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('payment-why-has-the-price-ch')}>
                  <span>Why has the price changed?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Flight prices update in real time. The price is only guaranteed once payment is complete and you receive a booking confirmation.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'payment-is-there-a-booking-f' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('payment-is-there-a-booking-f')}>
                  <span>Is there a booking fee?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">A small service fee is displayed transparently at checkout. There are no hidden fees.</div>
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
