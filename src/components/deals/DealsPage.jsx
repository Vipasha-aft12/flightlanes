'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './DealsPage.css';

export default function DealsPage() {

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
    <div className="deals-page">
<div className="lp-hero">
    <div className="lp-hero-bg is-dea-c1fdcc"></div>
    <div className="lp-hero-grad"></div>
    <div className="lp-hero-content fade-up">
      <button className="lp-back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back to Home</button>
      <h1>Exclusive <em>Travel Deals</em> & Offers</h1>
      <p>Flash sales, limited-time fares and seasonal specials — updated daily. Save up to 60% on flights, hotels and packages.</p>
      <div className="is-dea-ad8741">
        <button className="btn-white">🔥 View All Deals</button>
        <button className="btn-white-outline">🔔 Set Price Alert</button>
      </div>
    </div>
  </div>

  {/* DEAL CATEGORIES */}
  <section className="section is-dea-f8531d">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">By Category</div><h2>Deals for Every Type of Trip</h2></div>
      <div className="is-dea-f269d0 fade-up">
        <div className="is-dea-fdae18"><div className="is-dea-79b838">✈️</div><div className="is-dea-161c3c">Flights</div><div className="is-dea-f6be18">124 deals</div></div>
        <div className="is-dea-fdae18"><div className="is-dea-79b838">🏨</div><div className="is-dea-161c3c">Hotels</div><div className="is-dea-f6be18">89 deals</div></div>
        <div className="is-dea-fdae18"><div className="is-dea-79b838">🎁</div><div className="is-dea-161c3c">Packages</div><div className="is-dea-f6be18">56 deals</div></div>
        <div className="is-dea-fdae18"><div className="is-dea-79b838">🚢</div><div className="is-dea-161c3c">Cruises</div><div className="is-dea-f6be18">34 deals</div></div>
        <div className="is-dea-fdae18"><div className="is-dea-79b838">🚗</div><div className="is-dea-161c3c">Car Rentals</div><div className="is-dea-f6be18">41 deals</div></div>
        <div className="is-dea-fdae18"><div className="is-dea-79b838">🎯</div><div className="is-dea-161c3c">Activities</div><div className="is-dea-f6be18">78 deals</div></div>
      </div>

      {/* FLASH SALE BANNER */}
      <div className="is-dea-eab7d0 fade-up">
        <div className="is-dea-3e74a5"><div className="is-dea-77f542">⚡ Flash Sale — Ends Tonight</div><div className="is-dea-740f89">Up to 60% OFF Selected Hotels</div><div className="is-dea-179187">50+ destinations. No code needed — discount applied at checkout.</div></div>
        <button className="btn-white is-dea-f8b697">Shop Flash Sale →</button>
      </div>

      {/* ALL DEALS GRID */}
      <div id="deals-all">
        <div className="section-header is-dea-06feda"><h2 className="is-dea-86e927">All Current Deals</h2></div>
        <div className="deals-grid fade-up">
          <div className="deal-card is-dea-62113f"><div className="deal-img"><img src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80" alt="London" loading="eager" /><div className="deal-badge">🔥 48h Deal</div></div><div className="deal-body"><div className="deal-tag">✈ Round Trip · Economy</div><h3>New York → London</h3><div className="deal-meta"><span>🗓 Jun 12–26</span><span>· British Airways</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$349<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
          <div className="deal-card is-dea-62113f"><div className="deal-img"><img src="https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=600&q=80" alt="Cancun" loading="eager" /><div className="deal-badge">✨ Best Value</div></div><div className="deal-body"><div className="deal-tag">🏝 All-Inclusive Package</div><h3>Dallas → Cancún Resort</h3><div className="deal-meta"><span>🗓 Jul 4–11</span><span>· Hotel + Flight</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$699<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
          <div className="deal-card is-dea-62113f"><div className="deal-img"><img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80" alt="Cruise" loading="eager" /><div className="deal-badge">⚡ Flash Sale</div></div><div className="deal-body"><div className="deal-tag">🚢 7-Night Cruise</div><h3>Mediterranean Dream Cruise</h3><div className="deal-meta"><span>🗓 Aug 1–8</span><span>· Royal Caribbean</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$899<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
          <div className="deal-card is-dea-62113f"><div className="deal-img"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" alt="Paris" loading="eager" /><div className="deal-badge">🇫🇷 Summer Special</div></div><div className="deal-body"><div className="deal-tag">✈ Round Trip + Hotel</div><h3>Chicago → Paris 5 Nights</h3><div className="deal-meta"><span>🗓 Jul 15–20</span><span>· Air France + Hôtel</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$1,199<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
          <div className="deal-card is-dea-62113f"><div className="deal-img"><img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" alt="Tokyo" loading="eager" /><div className="deal-badge">🇯🇵 Limited Seats</div></div><div className="deal-body"><div className="deal-tag">✈ Non-stop · Business Class</div><h3>Los Angeles → Tokyo</h3><div className="deal-meta"><span>🗓 Sep 3–17</span><span>· ANA</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$2,299<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
          <div className="deal-card is-dea-62113f"><div className="deal-img"><img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" alt="Bali" loading="eager" /><div className="deal-badge">🌴 Early Bird</div></div><div className="deal-body"><div className="deal-tag">🎁 10-Day Package</div><h3>Bali Bliss All-Inclusive</h3><div className="deal-meta"><span>🗓 Oct 1–10</span><span>· Flight + 5★ Resort</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$1,299<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
        </div>
      </div>
    </div>
  </section>

  {/* SEASONAL DEALS */}
  <section className="section is-dea-5f7f58">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Seasonal Savings</div><h2>Best Time to Travel & Save</h2><p>Plan ahead and unlock the deepest discounts on every season's top destinations.</p></div>
      <div className="is-dea-5e3495 fade-up">
        <div className="is-dea-5fb1fe"><div className="is-dea-5c4208">☀️</div><div className="is-dea-01aa91">Summer</div><div className="is-dea-85c491">Jun–Aug · Europe & Beach</div><div className="is-dea-94623a">Up to 35% OFF</div></div>
        <div className="is-dea-0c4e76"><div className="is-dea-5c4208">🍂</div><div className="is-dea-01aa91">Fall</div><div className="is-dea-85c491">Sep–Nov · Asia & Americas</div><div className="is-dea-94623a">Up to 50% OFF</div></div>
        <div className="is-dea-7f5f45"><div className="is-dea-5c4208">❄️</div><div className="is-dea-01aa91">Winter</div><div className="is-dea-85c491">Dec–Feb · Caribbean & Ski</div><div className="is-dea-94623a">Up to 40% OFF</div></div>
        <div className="is-dea-3a7619"><div className="is-dea-5c4208">🌸</div><div className="is-dea-01aa91">Spring</div><div className="is-dea-85c491">Mar–May · Japan & Gardens</div><div className="is-dea-94623a">Up to 45% OFF</div></div>
      </div>
    </div>
  </section>

  {/* PRICE ALERT */}
  <section className="alert-bg" id="deals-alert-sec">
    <div className="section-inner fade-up">
      <div className="section-label is-dea-2dc13e">Price Alerts</div>
      <h2 className="is-dea-195cc1">Never Miss a Deal Again</h2>
      <p>Enter your email and we'll alert you the moment fares drop for your route.</p>
      <div className="alert-form"><input type="email" placeholder="Your email address" /><input type="text" placeholder="Route (e.g. NYC → Paris)" className="is-dea-badd32" /><button>Set Alert 🔔</button></div>
    </div>
  </section>

  <section className="lp-cta-sec fade-up">
    <div className="section-inner is-dea-e2e1e0">
      <h2>Ready to Grab a Deal?</h2>
      <p>Deals update daily. Book fast — limited availability on sale fares.</p>
      <div className="lp-cta-btns"><button className="btn-white">🔥 Refresh Deals</button><button className="btn-white-outline">← Back to Home</button></div>
    </div>
  </section>


{/* ═══════════════════════════════════════════════════════
     ABOUT US LANDING PAGE
═══════════════════════════════════════════════════════ */}

{/* ═══════════════════════════════════════════════════
     BLOG LISTING PAGE
═══════════════════════════════════════════════════ */}
    </div>
  );
}
