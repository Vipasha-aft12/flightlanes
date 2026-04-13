'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './PolicyTermsPage.css';

export default function PolicyTermsPage() {

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
    <div className="policyterms-page">
<div className="pol-wrap">
    <Link href="/" className="pol-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back to Home
    </Link>
    <div className="pol-icon">📄</div>
    <div className="pol-badge">Legal</div>
    <h1 className="pol-title">Terms & Conditions</h1>
    <div className="pol-updated">Last updated: April 1, 2026 &nbsp;·&nbsp; Effective: April 1, 2026</div>
    <div className="pol-divider"></div>
    <div className="pol-content">
      
<p>These Terms and Conditions ("Terms") govern your use of the Flightlanes website, mobile application and booking services operated by Flightlanes Inc. By accessing or using our services you agree to be bound by these Terms. Please read them carefully before making a booking.</p>

<div className="pol-highlight">⚠️ <strong>Important:</strong> Flightlanes acts as an intermediary between you and travel service providers. Your contract for the actual travel services (flights, hotels, car rentals, etc.) is directly with the provider, not with Flightlanes.</div>

<h2>1. Booking and Payment</h2>
<ul>
  <li>All bookings are subject to availability at the time of confirmation.</li>
  <li>Prices are displayed inclusive of taxes and fees unless otherwise stated.</li>
  <li>Payment must be made in full at time of booking unless a deposit scheme is explicitly offered.</li>
  <li>We accept Visa, Mastercard, American Express, PayPal and Apple Pay.</li>
  <li>Your booking is confirmed only when you receive a confirmation email with a booking reference number.</li>
</ul>

<h2>2. Accuracy of Information</h2>
<p>We make every effort to ensure prices and availability are accurate at the time of display. In the rare event of a pricing error, we reserve the right to cancel the booking and offer you a full refund or the option to rebook at the correct price.</p>

<h2>3. Travel Documents</h2>
<p>You are solely responsible for ensuring you hold valid passports, visas and any other documentation required for your journey. Flightlanes accepts no liability for travel denied due to inadequate documentation.</p>

<h2>4. Changes and Cancellations by You</h2>
<ul>
  <li>Change and cancellation policies vary by fare type and provider. The specific policy applicable to your booking is displayed before confirmation.</li>
  <li>Changes must be requested through our platform or customer support and may incur fees charged by the provider plus a Flightlanes service fee.</li>
  <li>Name changes are generally not permitted after ticketing for flights.</li>
</ul>

<h2>5. Changes and Cancellations by the Provider</h2>
<p>In the event of a cancellation or significant change by the travel provider, we will notify you as soon as possible and assist with rebooking or refund options. Flightlanes is not liable for changes or cancellations made by travel providers.</p>

<h2>6. Limitation of Liability</h2>
<p>To the maximum extent permitted by law, Flightlanes's liability for any claim arising from use of our services is limited to the total amount paid by you for the affected booking. We are not liable for indirect, consequential or punitive damages.</p>

<h2>7. Governing Law</h2>
<p>These Terms are governed by the laws of the State of New York, United States. Any dispute shall be subject to the exclusive jurisdiction of the courts of New York County.</p>

    </div>
  </div>

    </div>
  );
}
