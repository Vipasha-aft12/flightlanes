'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './PolicyRefundPage.css';

export default function PolicyRefundPage() {

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
    <div className="policyrefund-page">
<div className="pol-wrap">
    <Link href="/" className="pol-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back to Home
    </Link>
    <div className="pol-icon">💳</div>
    <div className="pol-badge">Financial</div>
    <h1 className="pol-title">Refund Policy</h1>
    <div className="pol-updated">Last updated: April 1, 2026 &nbsp;·&nbsp; Effective: April 1, 2026</div>
    <div className="pol-divider"></div>
    <div className="pol-content">
      
<p>We understand that travel plans sometimes change. This Refund Policy explains how refunds are processed when a booking is cancelled and what to expect at each step.</p>

<div className="pol-highlight">📋 <strong>Key principle:</strong> Refund eligibility and timelines depend primarily on the fare rules set by the travel provider, not by Flightlanes. We always pass through the maximum refund permitted by the provider.</div>

<h2>1. Refund Eligibility</h2>
<h3>Flights</h3>
<ul>
  <li><strong>Flexible / Fully Refundable fares:</strong> Full refund to original payment method, no penalty.</li>
  <li><strong>Semi-flexible fares:</strong> Refund minus the airline's cancellation fee, which varies by route and carrier.</li>
  <li><strong>Non-refundable fares:</strong> No cash refund. Some airlines offer credit vouchers — we will communicate this to you.</li>
  <li><strong>Within 24 hours of booking</strong> (US departures only): Full refund guaranteed regardless of fare type, as required by US DOT regulations.</li>
</ul>
<h3>Hotels</h3>
<ul>
  <li><strong>Free cancellation rates:</strong> Full refund if cancelled by the deadline shown on your booking (typically 24–48 hours before check-in).</li>
  <li><strong>Non-refundable rates:</strong> No refund. These rates are offered at a significant discount in exchange for this restriction.</li>
</ul>
<h3>Car Rentals</h3>
<ul>
  <li>Full refund if cancelled before pickup time in most cases. Specific terms shown at time of booking.</li>
</ul>
<h3>Packages</h3>
<ul>
  <li>Refund eligibility follows the most restrictive component of the package (usually the flight).</li>
</ul>

<h2>2. Refund Timelines</h2>
<ul>
  <li><strong>Credit / debit card:</strong> 5–10 business days after refund is approved.</li>
  <li><strong>PayPal:</strong> 3–5 business days.</li>
  <li><strong>Apple Pay / Google Pay:</strong> 5–10 business days.</li>
  <li>Bank processing times may vary and are outside our control.</li>
</ul>

<h2>3. Flightlanes Service Fee</h2>
<p>Our booking service fee is non-refundable except where a cancellation is due to our error or a provider insolvency event. This fee is clearly displayed before you complete your booking.</p>

<h2>4. How to Request a Refund</h2>
<p>Log in to your account, go to "Manage Booking" and select "Cancel Booking". Our system will calculate your eligible refund based on the fare rules and process it automatically. For complex cases, contact <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="2b594e4d5e454f586b4d47424c435f474a454e5805484446">[email&#160;protected]</a></strong> with your booking reference.</p>

    </div>
  </div>

    </div>
  );
}
