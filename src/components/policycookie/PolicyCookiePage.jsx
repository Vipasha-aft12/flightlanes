'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './PolicyCookiePage.css';

export default function PolicyCookiePage() {

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
    <div className="policycookie-page">
<div className="pol-wrap">
    <Link href="/" className="pol-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back to Home
    </Link>
    <div className="pol-icon">🍪</div>
    <div className="pol-badge">Technical</div>
    <h1 className="pol-title">Cookie Policy</h1>
    <div className="pol-updated">Last updated: April 1, 2026 &nbsp;·&nbsp; Effective: April 1, 2026</div>
    <div className="pol-divider"></div>
    <div className="pol-content">
      
<p>This Cookie Policy explains how Flightlanes Inc. uses cookies and similar tracking technologies on our website and applications. By continuing to use our site, you consent to our use of cookies as described below.</p>

<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files stored on your device by your web browser when you visit a website. They allow the website to remember information about your visit, such as your preferred language, login status and items in your search history.</p>

<h2>2. Types of Cookies We Use</h2>
<h3>2.1 Strictly Necessary Cookies</h3>
<p>These cookies are essential for the website to function. They enable core features such as security, user authentication, session management and booking functionality. You cannot opt out of these cookies.</p>
<ul>
  <li>Session management and security tokens</li>
  <li>Shopping basket / booking state preservation</li>
  <li>Load balancing and server selection</li>
</ul>

<h3>2.2 Performance & Analytics Cookies</h3>
<p>These cookies collect anonymised information about how visitors use our site, helping us understand which pages are most popular and how users navigate our platform. All data is aggregated and non-identifiable.</p>
<ul>
  <li>Google Analytics — page views, sessions, bounce rate</li>
  <li>Internal A/B testing tools — feature comparison</li>
  <li>Performance monitoring — page load times, error rates</li>
</ul>

<h3>2.3 Functional Cookies</h3>
<p>These cookies remember your preferences and personalise your experience without identifying you personally.</p>
<ul>
  <li>Language and currency preferences</li>
  <li>Recently searched routes and destinations</li>
  <li>Saved filters and search parameters</li>
</ul>

<h3>2.4 Targeting & Advertising Cookies</h3>
<p>These cookies track your browsing activity across sites to deliver relevant advertising and measure campaign effectiveness. You can opt out at any time.</p>

<div className="pol-highlight">🍪 <strong>Your control:</strong> You can manage or withdraw cookie consent at any time through your browser settings or by clicking "Cookie Preferences" in the site footer. Blocking certain cookies may affect the functionality of our booking platform.</div>

<h2>3. Third-Party Cookies</h2>
<p>Some cookies on our site are set by third-party services including Google Analytics, Facebook Pixel, Hotjar and our payment processors. These third parties have their own privacy policies governing how they use this data.</p>

<h2>4. Cookie Retention</h2>
<ul>
  <li><strong>Session cookies:</strong> Deleted when you close your browser.</li>
  <li><strong>Persistent cookies:</strong> Retained for up to 12 months.</li>
  <li><strong>Analytics cookies:</strong> Retained for up to 26 months in anonymised form.</li>
</ul>

<h2>5. Updates to This Policy</h2>
<p>We may update this Cookie Policy periodically. Changes will be posted on this page with an updated effective date. Continued use of our site after changes constitutes acceptance.</p>

    </div>
  </div>

    </div>
  );
}
