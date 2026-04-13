'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './PolicyPrivacyPage.css';

export default function PolicyPrivacyPage() {

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
    <div className="policyprivacy-page">
<div className="pol-wrap">
    <Link href="/" className="pol-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back to Home
    </Link>
    <div className="pol-icon">🔒</div>
    <div className="pol-badge">Legal</div>
    <h1 className="pol-title">Privacy Policy</h1>
    <div className="pol-updated">Last updated: April 1, 2026 &nbsp;·&nbsp; Effective: April 1, 2026</div>
    <div className="pol-divider"></div>
    <div className="pol-content">
      
<p>Flightlanes Inc. ("Flightlanes", "we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use and share it, and your rights as a data subject. By using our website and services you consent to the practices described in this policy.</p>

<h2>1. Information We Collect</h2>
<h3>1.1 Information You Provide</h3>
<ul>
  <li><strong>Account information:</strong> Name, email address, password, phone number and date of birth when you create an account.</li>
  <li><strong>Booking information:</strong> Passenger names, passport details, contact information, payment card details, travel preferences and special requests.</li>
  <li><strong>Communications:</strong> Content of emails, chat messages or phone calls with our support team.</li>
  <li><strong>Reviews and feedback:</strong> Any content you submit through reviews or surveys.</li>
</ul>
<h3>1.2 Information We Collect Automatically</h3>
<ul>
  <li><strong>Usage data:</strong> Pages visited, search queries, clicks, session duration, device type, browser type and operating system.</li>
  <li><strong>Location data:</strong> Approximate location based on IP address for currency and language preferences.</li>
  <li><strong>Cookies and tracking:</strong> See our Cookie Policy for full details.</li>
</ul>

<h2>2. How We Use Your Information</h2>
<ul>
  <li>Process and manage your bookings and payments</li>
  <li>Send booking confirmations, itineraries and travel updates</li>
  <li>Provide customer support and resolve disputes</li>
  <li>Personalise search results and recommendations</li>
  <li>Comply with legal obligations and prevent fraud</li>
  <li>Send marketing communications (where you have opted in)</li>
  <li>Improve our platform through analytics and testing</li>
</ul>

<h2>3. How We Share Your Information</h2>
<p>We share your personal data only where necessary to deliver our services or where required by law. We do not sell your personal data to third parties.</p>
<ul>
  <li><strong>Travel service providers:</strong> Airlines, hotels, car rental companies and other suppliers need your booking details to fulfil your reservation.</li>
  <li><strong>Payment processors:</strong> We use PCI-DSS Level 1 compliant processors. We never store your full card number.</li>
  <li><strong>Legal authorities:</strong> We disclose data when required by law, court order or governmental authority.</li>
</ul>

<div className="pol-highlight">🔒 <strong>Security:</strong> All data transmission is encrypted using 256-bit SSL/TLS. We conduct regular security audits and penetration tests to protect your information.</div>

<h2>4. Your Rights</h2>
<p>Depending on your jurisdiction, you may have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to processing for marketing purposes; and data portability. To exercise any of these rights, please contact <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="93e3e1fae5f2f0ead3f5fffaf4fbe7fff2fdf6e0bdf0fcfe">[email&#160;protected]</a></strong>.</p>

<h2>5. Data Retention</h2>
<p>We retain booking data for 7 years to comply with financial and legal obligations. Account data is retained until you request deletion. Marketing preferences are retained until you unsubscribe.</p>

<h2>6. Contact</h2>
<p>For privacy-related enquiries, contact our Data Protection Officer at <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d3b7a3bc93b5bfbab4bba7bfb2bdb6a0fdb0bcbe">[email&#160;protected]</a></strong> or write to Flightlanes Inc., 350 Fifth Avenue, New York, NY 10118.</p>

    </div>
  </div>

    </div>
  );
}
