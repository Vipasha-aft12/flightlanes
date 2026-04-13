'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './SupportPage.css';

export default function SupportPage() {

  useEffect(() => {
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleFaqClick(e) {
    const item = e.currentTarget.closest('.faq-item') || e.currentTarget.closest('.sdoc-faq-item');
    if (item) item.classList.toggle('open');
  }

  return (
    <div className="support-page">
<div className="sup3-wrap">

  {/* Hero with bg image */}
  <div className="sup3-hero">
    <div className="sup3-hero-bg"></div>
    <div className="sup3-hero-overlay"></div>
    <div className="sup3-hero-content">
      <div className="sup3-hero-label">24/7 Customer Support</div>
      <h1>How Can We Help You?</h1>
      <p>Our travel experts are here around the clock for bookings, changes, cancellations and everything in between.</p>
      <div className="sup3-searchbar">
        <input type="text" placeholder="Search — e.g. change flight, get refund…" id="sup-search-input" />
        <button>Search →</button>
      </div>
    </div>
  </div>

  {/* Contact pills */}
  <div className="sup3-contact-pills">
    <div className="sup3-pill"><div className="sup3-pill-icon">💬</div><div className="sup3-pill-info"><div className="sup3-pill-label">Live Chat</div><div className="sup3-pill-val">Available 24/7 · Under 3 min</div></div></div>
    <div className="sup3-pill"><div className="sup3-pill-icon">📞</div><div className="sup3-pill-info"><div className="sup3-pill-label">Phone</div><div className="sup3-pill-val">+1 (888) 000-0000</div></div></div>
    <div className="sup3-pill"><div className="sup3-pill-icon">📧</div><div className="sup3-pill-info"><div className="sup3-pill-label">Email</div><div className="sup3-pill-val">support@flightlanes.com</div></div></div>
    <div className="sup3-pill"><div className="sup3-pill-icon">🚨</div><div className="sup3-pill-info"><div className="sup3-pill-label">Emergency</div><div className="sup3-pill-val">+1 (888) 000-9999 · 24h</div></div></div>
  </div>

  <div className="sup3-main">

    {/* Section label */}
    <div className="sup3-sec-label">Browse by Service</div>
    <div className="sup3-sec-title">Support by Travel Type</div>

    {/* 6 service cards — support image + heading + text */}
    <div className="is-sup-d0060c">

      {/* Flights */}
      <div className="is-sup-a9243b">
        <div className="is-sup-97f5fc">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=85" alt="Flight Support" loading="lazy" className="is-sup-be9649" />
          <div className="is-sup-200c16"></div>
          <div className="is-sup-1b0a0a">✈ FLIGHTS</div>
        </div>
        <div className="is-sup-004294">
          <div className="is-sup-9e56ad">Flight Support</div>
          <div className="is-sup-5e05f4">Help with bookings, cancellations, date changes, check-in, baggage allowance and seat upgrades.</div>
          <div className="is-sup-533ca8">
            <Link href="/support/flights" className="is-sup-c7469b">Get help →</Link>
            <div className="is-sup-ac5bfc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels */}
      <div className="is-sup-a9243b">
        <div className="is-sup-97f5fc">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=85" alt="Hotel Support" loading="lazy" className="is-sup-be9649" />
          <div className="is-sup-200c16"></div>
          <div className="is-sup-1b0a0a">🏨 HOTELS</div>
        </div>
        <div className="is-sup-004294">
          <div className="is-sup-9e56ad">Hotel Support</div>
          <div className="is-sup-5e05f4">Help with reservations, early check-in, room upgrades, special requests and cancellation policies.</div>
          <div className="is-sup-533ca8">
            <Link href="/support/hotels" className="is-sup-c7469b">Get help →</Link>
            <div className="is-sup-ac5bfc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Car Rentals */}
      <div className="is-sup-a9243b">
        <div className="is-sup-97f5fc">
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=85" alt="Car Rental Support" loading="lazy" className="is-sup-be9649" />
          <div className="is-sup-200c16"></div>
          <div className="is-sup-1b0a0a">🚗 CAR RENTALS</div>
        </div>
        <div className="is-sup-004294">
          <div className="is-sup-9e56ad">Car Rental Support</div>
          <div className="is-sup-5e05f4">Help with pickup documents, insurance cover, fuel policies, additional drivers and vehicle changes.</div>
          <div className="is-sup-533ca8">
            <Link href="/support/cars" className="is-sup-c7469b">Get help →</Link>
            <div className="is-sup-ac5bfc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="is-sup-a9243b">
        <div className="is-sup-97f5fc">
          <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=700&q=85" alt="Package Support" loading="lazy" className="is-sup-be9649" />
          <div className="is-sup-200c16"></div>
          <div className="is-sup-1b0a0a">🎁 PACKAGES</div>
        </div>
        <div className="is-sup-004294">
          <div className="is-sup-9e56ad">Package Support</div>
          <div className="is-sup-5e05f4">Help with holiday bundles, itinerary changes, included transfers, upgrades and travel documents.</div>
          <div className="is-sup-533ca8">
            <Link href="/support/packages" className="is-sup-c7469b">Get help →</Link>
            <div className="is-sup-ac5bfc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cruises */}
      <div className="is-sup-a9243b">
        <div className="is-sup-97f5fc">
          <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=85" alt="Cruise Support" loading="lazy" className="is-sup-be9649" />
          <div className="is-sup-200c16"></div>
          <div className="is-sup-1b0a0a">🚢 CRUISES</div>
        </div>
        <div className="is-sup-004294">
          <div className="is-sup-9e56ad">Cruise Support</div>
          <div className="is-sup-5e05f4">Help with cabin upgrades, embarkation procedures, shore excursions, gratuities and onboard credits.</div>
          <div className="is-sup-533ca8">
            <Link href="/support/cruises" className="is-sup-c7469b">Get help →</Link>
            <div className="is-sup-ac5bfc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="is-sup-a9243b">
        <div className="is-sup-97f5fc">
          <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&q=85" alt="Activities Support" loading="lazy" className="is-sup-be9649" />
          <div className="is-sup-200c16"></div>
          <div className="is-sup-1b0a0a">🎯 ACTIVITIES</div>
        </div>
        <div className="is-sup-004294">
          <div className="is-sup-9e56ad">Activities Support</div>
          <div className="is-sup-5e05f4">Help with activity vouchers, rescheduling, meeting points, guide issues and group booking changes.</div>
          <div className="is-sup-533ca8">
            <Link href="/support/activities" className="is-sup-c7469b">Get help →</Link>
            <div className="is-sup-ac5bfc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

    </div>{/* /6-card grid */}

    {/* For Other Queries — redesigned full-width teal section */}
    <div className="is-sup-e13734">
      <div className="is-sup-059b92">

        {/* Left: context + info */}
        <div className="is-sup-5a5641">
          <div className="is-sup-c222ff">✉️</div>
          <div className="is-sup-fdfd14">Other Queries</div>
          <h2 className="is-sup-5ce2b7">Can't find what you're looking for?</h2>
          <p className="is-sup-d51ed8">Send us your question directly. A real travel expert from our team will reply personally within 24 hours — no templates, no bots.</p>
          <div className="is-sup-49bce7">
            <div className="is-sup-9998cf">
              <div className="is-sup-760eea">⏱</div>
              <div><div className="is-sup-8dd661">Response within 24 hours</div><div className="is-sup-4d526b">Guaranteed reply to every query submitted</div></div>
            </div>
            <div className="is-sup-9998cf">
              <div className="is-sup-760eea">👤</div>
              <div><div className="is-sup-8dd661">Real travel expert</div><div className="is-sup-4d526b">Answered by a specialist, not an automated system</div></div>
            </div>
            <div className="is-sup-9998cf">
              <div className="is-sup-760eea">🔓</div>
              <div><div className="is-sup-8dd661">No account required</div><div className="is-sup-4d526b">Submit instantly — no sign-in needed</div></div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="is-sup-dbd2fe">
          <div className="is-sup-a463cb">Send us your query</div>
          <div className="is-sup-49bce7">
            <div>
              <label className="is-sup-012806">Email Address <span className="is-sup-e5f9d6">*</span></label>
              <input type="email" id="sup-query-email" placeholder="your@email.com" className="is-sup-cd2a1a" />
            </div>
            <div>
              <label className="is-sup-012806">Subject</label>
              <input type="text" id="sup-query-subject" placeholder="e.g. Change flight dates" className="is-sup-cd2a1a" />
            </div>
            <div>
              <label className="is-sup-012806">Your Question <span className="is-sup-e5f9d6">*</span></label>
              <textarea id="sup-query-msg" placeholder="Describe your issue in detail. Include your booking reference if you have one — e.g. FL28291…" rows="4" className="is-sup-84006e"></textarea>
            </div>
            <button className="is-sup-e71030">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
              Send Query
            </button>
            <div className="is-sup-296be8">By submitting you agree to our <span className="is-sup-eed668">Privacy Policy</span></div>
          </div>
        </div>

      </div>
    </div>

    {/* Customer Support Banner */}
    <div className="is-sup-a56bb8">
      {/* Photo — full cover, positioned to show faces on right */}
      <div className="is-sup-a396ab"></div>
      {/* Gradient: solid dark left → semi-transparent centre → transparent right (shows photo) */}
      <div className="is-sup-a5621f"></div>
      {/* Content sits on left over dark area */}
      <div className="is-sup-d5b7d7">
        <div className="is-sup-58fbd5">✦ We're here for you</div>
        <h2 className="is-sup-e081e7">Real People. Real Help.<br /><em className="is-sup-be4b6f">Available 24/7.</em></h2>
        <p className="is-sup-e3f5eb">Our expert travel team is standing by right now — no bots, no queues. Just real answers from people who know travel inside out.</p>
        <div className="is-sup-ac5aba">
          <div className="is-sup-8529e6"><span className="is-sup-15aeb4">✓</span>Under 3 min response</div>
          <div className="is-sup-8529e6"><span className="is-sup-15aeb4">✓</span>2M+ travelers helped</div>
          <div className="is-sup-8529e6"><span className="is-sup-cd542f">✓</span>4.9★ support rating</div>
          <div className="is-sup-8529e6"><span className="is-sup-15aeb4">✓</span>12 languages supported</div>
        </div>
        <button className="is-sup-70392e">💬 Start Live Chat</button>
      </div>
    </div>


  </div>{/* /sup3-main */}
</div>




{/* ═══ FLIGHT SUPPORT SUPPORT PAGE ═══ */}
    </div>
  );
}
