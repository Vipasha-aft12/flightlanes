'use client';
import { useState } from 'react';
import Link from 'next/link';
import './SupPackagesPage.css';

const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'changes', label: 'Changes' },
    { id: 'cancel', label: 'Cancellations' },
    { id: 'docs', label: 'Documents' }
  ];

export default function SupPackagesPage() {
  const [activeSection, setActiveSection] = useState('about');
  const [openFaq, setOpenFaq] = useState('');

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? '' : id);
  }

  return (
    <div className="suppackages-page">
      <div className="sdoc-wrap">

        {/* Hero */}
        <div className="sdoc-hero">
          <img className="sdoc-hero-img" src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=90" alt="Package Support" />
          <div className="sdoc-hero-overlay"></div>
          <div className="sdoc-hero-inner">
            <div className="sdoc-hero-left">
              <Link href="/support" className="sdoc-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Back to Support
              </Link>
              <div className="sdoc-hero-badge">🎁 Package Support</div>
              <h1 className="sdoc-hero-title">Package Support</h1>
              <p className="sdoc-hero-sub">Holiday packages, changes and cancellations</p>
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
            
          {activeSection === 'about' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">About</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'about-what-is-included-in-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('about-what-is-included-in-')}>
                  <span>What is included in a package?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Flights, hotel and airport transfers. Some also include tours, meals or excursions. Your inclusions are listed in your booking confirmation.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'about-are-packages-cheaper' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('about-are-packages-cheaper')}>
                  <span>Are packages cheaper?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">In most cases yes — packages save an average of 20–40% due to bulk rates negotiated with suppliers.</div>
              </div>
            </div>
          )}
          {activeSection === 'itinerary' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Itinerary</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'itinerary-where-is-my-itinerar' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('itinerary-where-is-my-itinerar')}>
                  <span>Where is my itinerary?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">In your confirmation email and Manage Booking. It includes all flight details, hotel addresses and transfer times.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'itinerary-can-i-view-hotel-inf' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('itinerary-can-i-view-hotel-inf')}>
                  <span>Can I view hotel info before travelling?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — your hotel name, address and check-in times are in your itinerary.</div>
              </div>
            </div>
          )}
          {activeSection === 'changes' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Changes</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'changes-can-i-change-my-trav' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-can-i-change-my-trav')}>
                  <span>Can I change my travel dates?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Date changes are possible subject to availability and may involve a fare difference or amendment fee.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'changes-can-i-add-extra-nigh' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('changes-can-i-add-extra-nigh')}>
                  <span>Can I add extra nights?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Yes — contact us before travel. We can usually extend your stay at the same hotel or a nearby alternative.</div>
              </div>
            </div>
          )}
          {activeSection === 'cancel' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Cancellations</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'cancel-how-do-i-cancel-my-p' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-how-do-i-cancel-my-p')}>
                  <span>How do I cancel my package?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Go to Manage Booking → Cancel Package, or contact us by phone or live chat.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'cancel-what-are-the-cancell' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('cancel-what-are-the-cancell')}>
                  <span>What are the cancellation fees?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">8+ weeks: deposit only. 4–8 weeks: 25–50%. 2–4 weeks: 50–75%. Under 2 weeks: up to 100%.</div>
              </div>
            </div>
          )}
          {activeSection === 'docs' && (
            <div className="sdoc-section">
              <div className="sdoc-section-head">
                <div className="sdoc-section-title">Documents</div>
                <div className="sdoc-section-count">2 questions</div>
              </div>
              
              <div className={`sdoc-faq-item ${openFaq === 'docs-what-documents-do-i-' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('docs-what-documents-do-i-')}>
                  <span>What documents do I need?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Valid passport (6+ months validity), required visas, booking confirmation, e-tickets and travel insurance documents.</div>
              </div>
              <div className={`sdoc-faq-item ${openFaq === 'docs-when-do-i-receive-my' ? 'sdoc-open' : ''}`}>
                <div className="sdoc-faq-q" onClick={() => toggleFaq('docs-when-do-i-receive-my')}>
                  <span>When do I receive my documents?</span>
                  <svg className="sdoc-faq-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="sdoc-faq-ans">Electronic documents are emailed 7–10 days before departure for pre-paid packages.</div>
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
