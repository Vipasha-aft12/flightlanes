'use client';
import { useState } from 'react';
import Link from 'next/link';
import './SupActivitiesPage.css';

const NAV_ITEMS = [
    { id: 'booking', label: 'Booking' },
    { id: 'vouchers', label: 'Vouchers' },
    { id: 'reschedule', label: 'Rescheduling' },
    { id: 'cancel', label: 'Cancellations' },
    { id: 'groups', label: 'Groups' }
  ];

export default function SupActivitiesPage() {
  const [activeSection, setActiveSection] = useState('booking');
  const [openFaq, setOpenFaq] = useState('');

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? '' : id);
  }

  return (
    <div className="supactivities-page">
      <div className="sdoc-wrap">

        {/* Hero */}
        <div className="sdoc-hero">
          <img className="sdoc-hero-img" src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=90" alt="Activities Support" />
          <div className="sdoc-hero-overlay"></div>
          <div className="sdoc-hero-inner">
            <div className="sdoc-hero-left">
              <Link href="/support" className="sdoc-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Back to Support
              </Link>
              <div className="sdoc-hero-badge">🎯 Activities Support</div>
              <h1 className="sdoc-hero-title">Activities Support</h1>
              <p className="sdoc-hero-sub">Tours, experiences and activity bookings</p>
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
              
              <div className={`sdoc-faq-item ${openFaq === 'booking-how-do-i-book-an-act' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-how-do-i-book-an-act')}>
                  <span>How do I book an activity?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Use the Activities tab, search your destination and browse available experiences. Your voucher is emailed instantly after booking.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'booking-are-activities-suita' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('booking-are-activities-suita')}>
                  <span>Are activities suitable for children?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Each listing includes age and physical requirements. Filter by &quot;Family Friendly&quot; to see child-appropriate options.</div>
              </div>
            </div>
          )}
          {activeSection === 'vouchers' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Vouchers</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'vouchers-where-is-my-voucher?' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('vouchers-where-is-my-voucher?')}>
                  <span>Where is my voucher?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Emailed immediately after booking and available in Manage Booking. Present it (printed or digital) to the provider.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'vouchers-my-voucher-is-not-be' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('vouchers-my-voucher-is-not-be')}>
                  <span>My voucher is not being accepted</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Contact our support team immediately. We\'ll verify your booking directly with the provider and reissue the voucher.</div>
              </div>
            </div>
          )}
          {activeSection === 'reschedule' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Rescheduling</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'reschedule-can-i-change-the-dat' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('reschedule-can-i-change-the-dat')}>
                  <span>Can I change the date of my activity?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Free rescheduling is usually available up to 24–48 hours before the activity start time. Check your booking policy.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'reschedule-weather-cancelled-my' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('reschedule-weather-cancelled-my')}>
                  <span>Weather cancelled my activity?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">If the operator cancels due to weather, you are entitled to a full refund or free rescheduling.</div>
              </div>
            </div>
          )}
          {activeSection === 'cancel' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Cancellations</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'cancel-how-do-i-cancel?' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-how-do-i-cancel?')}>
                  <span>How do I cancel?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking, select your activity and tap Cancel. The refund depends on the activity\'s cancellation policy.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'cancel-typical-cancellation' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-typical-cancellation')}>
                  <span>Typical cancellation policy?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">More than 24 hours: full refund. Within 24 hours: no refund. Some premium experiences have 48–72 hour windows.</div>
              </div>
            </div>
          )}
          {activeSection === 'groups' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Groups</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'groups-do-you-offer-group-d' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('groups-do-you-offer-group-d')}>
                  <span>Do you offer group discounts?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — for groups of 10+, contact our groups team for negotiated rates. Many operators offer 10–20% discounts.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'groups-can-a-group-book-a-p' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('groups-can-a-group-book-a-p')}>
                  <span>Can a group book a private tour?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes. Many providers offer private tours. Contact us for a custom group itinerary.</div>
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
