'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './PolicyCancellationPage.css';

export default function PolicyCancellationPage() {

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
    <div className="policycancellation-page">
<div className="pol-wrap">
    <Link href="/" className="pol-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back to Home
    </Link>
    <div className="pol-icon">❌</div>
    <div className="pol-badge">Bookings</div>
    <h1 className="pol-title">Cancellation Policy</h1>
    <div className="pol-updated">Last updated: April 1, 2026 &nbsp;·&nbsp; Effective: April 1, 2026</div>
    <div className="pol-divider"></div>
    <div className="pol-content">
      
<p>We know that plans can change unexpectedly. This Cancellation Policy sets out the rules and timelines that apply when you need to cancel a booking made through Flightlanes. The specific cancellation terms applicable to your booking are always displayed before you confirm your purchase.</p>

<div className="pol-highlight">⚡ <strong>Quick summary:</strong> Most bookings can be cancelled free of charge within 24 hours of purchase (US departures). After this window, cancellation fees depend on the fare type and travel provider.</div>

<h2>1. Flight Cancellations</h2>
<h3>Within 24 Hours of Booking (US Departures)</h3>
<p>Under US Department of Transportation regulations, all flights departing from a US airport can be cancelled for a full refund within 24 hours of booking, provided the departure is at least 7 days away. This applies regardless of the fare type selected.</p>
<h3>After 24 Hours</h3>
<ul>
  <li><strong>Flexible fares:</strong> Cancellation permitted up to 24 hours before departure with full refund.</li>
  <li><strong>Standard fares:</strong> Cancellation fee applies, set by the airline. Typically $50–$200 for domestic; $150–$400 for international routes.</li>
  <li><strong>Basic / non-refundable fares:</strong> No refund. Some airlines offer credit vouchers valid for 12 months.</li>
  <li><strong>Within 24 hours of departure:</strong> Generally non-refundable regardless of fare type.</li>
</ul>

<h2>2. Hotel Cancellations</h2>
<ul>
  <li><strong>Free cancellation rates:</strong> Cancel by the deadline shown on your booking (typically 24–48 hours before check-in) for a full refund.</li>
  <li><strong>Non-refundable rates:</strong> No refund available. These are offered at a lower price in exchange for this restriction.</li>
  <li><strong>No-show:</strong> Full charge applies. If you are delayed, contact us or the hotel directly as soon as possible — some hotels will waive no-show charges in exceptional circumstances.</li>
</ul>

<h2>3. Car Rental Cancellations</h2>
<ul>
  <li>Free cancellation up to 48 hours before pickup in most cases.</li>
  <li>Cancellations within 48 hours of pickup may incur a one-day rental fee.</li>
  <li>No-show at the rental counter is treated as a full cancellation with no refund.</li>
</ul>

<h2>4. Package Cancellations</h2>
<p>Package cancellations are governed by the most restrictive component — typically the flight. Full package cancellation fees are displayed on your booking confirmation. We recommend purchasing travel insurance to cover non-refundable costs in case of unforeseen events.</p>

<h2>5. Cancellations Due to Extraordinary Circumstances</h2>
<p>In the event of force majeure events such as natural disasters, pandemic travel restrictions, war or government travel bans directly affecting your destination or departure point, we will work with providers to obtain the best possible outcome — typically a full credit, date change or, where available, a cash refund. These outcomes are determined by provider policy and are not guaranteed by Flightlanes.</p>

<h2>6. How to Cancel</h2>
<p>Log in to your Flightlanes account, navigate to "My Bookings", select the relevant booking and click "Cancel Booking". The system will confirm your eligible refund before you finalise the cancellation. For group bookings or complex itineraries, contact <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="690a08070a0c0505081d0006071a290f05000e011d0508070c1a470a0604">[email&#160;protected]</a></strong>.</p>

<h2>7. Cancellation by the Provider</h2>
<p>If your flight, hotel or other service is cancelled by the provider, you are entitled to a full refund of all amounts paid. We will notify you promptly and process the refund within the timelines set out in our Refund Policy.</p>

    </div>
  </div>

    </div>
  );
}
