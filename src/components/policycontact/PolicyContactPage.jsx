'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './PolicyContactPage.css';

export default function PolicyContactPage() {

  useEffect(() => {
    /* Scroll fade-up animation */
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

  /* FAQ accordion toggle */
  function handleFaqClick(e) {
    const item = e.currentTarget.closest('.faq-item');
    if (item) item.classList.toggle('open');
  }

  return (
    <div className="policycontact-page">
<div className="pol-wrap">
    <Link href="/" className="pol-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back to Home
    </Link>
    <div className="pol-icon">📞</div>
    <div className="pol-badge">Get in Touch</div>
    <h1 className="pol-title">Contact Us</h1>
    <div className="pol-updated">Last updated: April 1, 2026 &nbsp;·&nbsp; Effective: April 1, 2026</div>
    <div className="pol-divider"></div>
    <div className="pol-content">
      
<p>We're here to help 24 hours a day, 7 days a week, 365 days a year. However you prefer to reach us, our team of travel experts is ready to assist with bookings, changes, cancellations, complaints and anything else you need.</p>

<div className="pol-contact-grid">
  <div className="pol-contact-card">
    <div className="pol-contact-card-icon">💬</div>
    <div className="pol-contact-card-title">Live Chat</div>
    <div className="pol-contact-card-val">Available 24/7</div>
    <div className="pol-contact-card-sub">Average response: under 3 minutes</div>
  </div>
  <div className="pol-contact-card">
    <div className="pol-contact-card-icon">📧</div>
    <div className="pol-contact-card-title">Email Support</div>
    <div className="pol-contact-card-val"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="c8bbbdb8b8a7babc88aea4a1afa0bca4a9a6adbbe6aba7a5">[email&#160;protected]</a></div>
    <div className="pol-contact-card-sub">Response within 24 hours</div>
  </div>
  <div className="pol-contact-card">
    <div className="pol-contact-card-icon">📱</div>
    <div className="pol-contact-card-title">Phone</div>
    <div className="pol-contact-card-val">+1 (888) 000-0000</div>
    <div className="pol-contact-card-sub">Mon–Sun · 6am–midnight EST</div>
  </div>
  <div className="pol-contact-card">
    <div className="pol-contact-card-icon">📮</div>
    <div className="pol-contact-card-title">Postal Address</div>
    <div className="pol-contact-card-val">Flightlanes Inc.</div>
    <div className="pol-contact-card-sub">350 Fifth Avenue, New York, NY 10118</div>
  </div>
</div>

<h2>Before You Contact Us</h2>
<p>Many questions can be answered instantly through our <strong>Help Center / FAQ</strong>. Common topics include how to change or cancel a booking, baggage allowance queries, refund timelines, and how to check in online.</p>
<div className="pol-highlight">💡 <strong>Fastest resolution:</strong> Have your booking reference number ready when you contact us. This lets our team pull up your reservation instantly and resolve your query without unnecessary back-and-forth.</div>

<h2>Complaints</h2>
<p>If you are not satisfied with our service, we take every complaint seriously. Please email <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f0939f9d809c91999e8483b0969c999798849c919e9583de939f9d">[email&#160;protected]</a></strong> with your booking reference, a clear description of the issue and any supporting documentation. We aim to acknowledge all complaints within 24 hours and resolve them within 7 business days.</p>

<h2>Emergency Travel Assistance</h2>
<p>If you are currently travelling and face an emergency such as a missed connection, medical situation or natural disaster affecting your trip, please call our emergency line at <strong>+1 (888) 000-9999</strong> which is staffed 24 hours a day by senior agents with authority to rebook and reroute immediately.</p>

    </div>
  </div>

    </div>
  );
}
