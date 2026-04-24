'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './ActivitiesPage.css';

export default function ActivitiesPage() {

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
    <div className="activities-page">
<div className="trust-strip"><div className="trust-inner">
    <div className="trust-item"><div className="trust-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></div>Instant Confirmation</div>
    <div className="trust-item"><div className="trust-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>Skip-the-Line Access</div>
    <div className="trust-item"><div className="trust-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/></svg></div>Free Cancellation</div>
    <div className="trust-item"><div className="trust-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></div>24/7 Activity Support</div>
    <div className="trust-item"><div className="trust-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>50,000+ Experiences</div>
  </div></div>

  <div className="deals-ticker"><div className="ticker-inner">
    <div className="ticker-item">🗼 Eiffel Tower Skip-the-Line <span>from $48/pp</span></div>
    <div className="ticker-item">🍜 Tokyo Food Tour <span>from $89/pp</span></div>
    <div className="ticker-item">🏛 Colosseum Underground <span>Save 15%</span></div>
    <div className="ticker-item">🤿 Maldives Snorkeling <span>from $55/pp</span></div>
    <div className="ticker-item">🐪 Dubai Desert Safari <span>from $72/pp</span></div>
    <div className="ticker-item">🌋 Hawaii Volcano Tour <span>from $95/pp</span></div>
    <div className="ticker-item">🧗 Bali White Water Rafting <span>from $45/pp</span></div>
    <div className="ticker-item">🗼 Eiffel Tower Skip-the-Line <span>from $48/pp</span></div>
    <div className="ticker-item">🍜 Tokyo Food Tour <span>from $89/pp</span></div>
    <div className="ticker-item">🏛 Colosseum Underground <span>Save 15%</span></div>
    <div className="ticker-item">🤿 Maldives Snorkeling <span>from $55/pp</span></div>
    <div className="ticker-item">🐪 Dubai Desert Safari <span>from $72/pp</span></div>
  </div></div>

  <div className="stats-section"><div className="stats-grid">
    <div className="stat-item"><div className="stat-num">50K+</div><div className="stat-label">Experiences</div></div>
    <div className="stat-item"><div className="stat-num">200+</div><div className="stat-label">Destinations</div></div>
    <div className="stat-item"><div className="stat-num">4.8★</div><div className="stat-label">Activity Rating</div></div>
    <div className="stat-item"><div className="stat-num">Instant</div><div className="stat-label">Confirmation</div></div>
  </div></div>

  {/* ACTIVITY DESTINATIONS */}
  <section className="section is-act-f8531d">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Top Activity Destinations</div><h2>Unforgettable Experiences Worldwide</h2><p>From skip-the-line museum tickets to adrenaline-packed adventures — book activities trusted by millions of travelers.</p></div>
      <div className="destinations-grid fade-up">
        <div className="dest-card is-act-0442d8"><img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=900&q=85" alt="Adventures" loading="eager" /><div className="dest-overlay"></div><div className="dest-info"><h3>Adventure Activities</h3><p>Rafting, skydiving, zip-lining &amp; more</p></div><div className="dest-price">from $39/pp</div></div>
        <div className="dest-card"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" alt="Paris" loading="eager" /><div className="dest-overlay"></div><div className="dest-info"><h3>Paris, France</h3><p>Eiffel Tower, Louvre &amp; food tours</p></div><div className="dest-price">from $28/pp</div></div>
        <div className="dest-card"><img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" alt="Tokyo" loading="eager" /><div className="dest-overlay"></div><div className="dest-info"><h3>Tokyo, Japan</h3><p>Food tours, tea ceremonies &amp; sumo</p></div><div className="dest-price">from $45/pp</div></div>
        <div className="dest-card"><img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" alt="Rome" loading="eager" /><div className="dest-overlay"></div><div className="dest-info"><h3>Rome, Italy</h3><p>Colosseum, Vatican &amp; food tours</p></div><div className="dest-price">from $32/pp</div></div>
        <div className="dest-card"><img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80" alt="Dubai" loading="eager" /><div className="dest-overlay"></div><div className="dest-info"><h3>Dubai, UAE</h3><p>Desert safaris, skyline tours &amp; more</p></div><div className="dest-price">from $55/pp</div></div>
      </div>
    </div>
  </section>

  {/* TOP-RATED ACTIVITIES */}
  <section className="section deals-bg">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Bestsellers</div><h2>Most-Booked Activities Right Now</h2><p>Top-rated experiences with 4.8+ star ratings from verified travelers.</p></div>
      <div className="deals-grid fade-up">
        <div className="deal-card"><div className="deal-img"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" alt="Paris Tour" loading="eager" /><div className="deal-badge">🥐 #1 Bestseller</div></div><div className="deal-body"><div className="deal-tag">🗼 City Tour · Paris</div><h3>Eiffel Tower Skip-the-Line + City Walk</h3><div className="deal-meta"><span>⏱ 3 hours</span><span>· Small group · Daily</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$68<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
        <div className="deal-card"><div className="deal-img"><img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" alt="Tokyo Food" loading="eager" /><div className="deal-badge">🍜 Food Experience</div></div><div className="deal-body"><div className="deal-tag">🌙 Night Food Tour · Tokyo</div><h3>Tokyo Night Street Food Tour</h3><div className="deal-meta"><span>⏱ 4 hours</span><span>· Expert local guide</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$89<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
        <div className="deal-card"><div className="deal-img"><img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80" alt="Dubai Safari" loading="eager" /><div className="deal-badge">🐪 Adventure</div></div><div className="deal-body"><div className="deal-tag">🌄 Desert Safari · Dubai</div><h3>Dubai Desert Safari &amp; BBQ Dinner</h3><div className="deal-meta"><span>⏱ 6 hours</span><span>· Dune bashing, camel ride</span></div><div className="deal-footer"><div><div className="deal-from">from</div><div className="deal-amount">$72<span className="deal-per">/pp</span></div></div><button className="btn-book">Book Now</button></div></div></div>
      </div>
    </div>
  </section>

  {/* ACTIVITY CATEGORIES */}
  <section className="section is-act-5f7f58">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Browse by Category</div><h2>Something for Every Traveler</h2><p>From history lovers to thrill seekers — find your perfect experience.</p></div>
      <div className="packages-grid fade-up">
        <div className="pkg-card"><div className="pkg-img"><img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" alt="Cultural" loading="eager" /></div><div className="pkg-body"><div className="pkg-rating">⭐ Most popular category worldwide</div><h3>Cultural &amp; Historical Tours</h3><div className="pkg-feats"><span className="pkg-feat">🏛 Museums</span><span className="pkg-feat">⛪ Monuments</span><span className="pkg-feat">🎭 Cultural Shows</span><span className="pkg-feat">🏺 Archaeology</span></div><div className="pkg-footer"><div className="pkg-price">$32 <span>/ person</span></div><button className="btn-book">Explore Tours</button></div></div></div>
        <div className="pkg-card"><div className="pkg-img"><img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80" alt="Adventure" loading="eager" /></div><div className="pkg-body"><div className="pkg-rating">⭐ Best for adrenaline seekers</div><h3>Outdoor &amp; Adventure</h3><div className="pkg-feats"><span className="pkg-feat">🧗 Rock Climbing</span><span className="pkg-feat">🌊 Rafting</span><span className="pkg-feat">🪂 Skydiving</span><span className="pkg-feat">🏕 Hiking</span></div><div className="pkg-footer"><div className="pkg-price">$45 <span>/ person</span></div><button className="btn-book">Explore Adventures</button></div></div></div>
        <div className="pkg-card"><div className="pkg-img"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" alt="Food Tours" loading="eager" /></div><div className="pkg-body"><div className="pkg-rating">⭐ Best-rated activity type</div><h3>Food &amp; Drink Tours</h3><div className="pkg-feats"><span className="pkg-feat">🍕 Street Food</span><span className="pkg-feat">🍷 Wine Tasting</span><span className="pkg-feat">👨‍🍳 Cooking Class</span><span className="pkg-feat">🍜 Market Tours</span></div><div className="pkg-footer"><div className="pkg-price">$55 <span>/ person</span></div><button className="btn-book">Explore Food Tours</button></div></div></div>
      </div>
    </div>
  </section>

  {/* WHY BOOK ACTIVITIES WITH US */}
  <section className="section is-act-f8531d">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Why Book With Fareoworld</div><h2>The Easiest Way to Book Experiences</h2></div>
      <div className="why-grid fade-up">
        <div className="why-card"><div className="why-icon is-act-9a7d6d">📱</div><h3>Mobile Tickets</h3><p>Receive your ticket directly to your phone — no printing needed. Just show and go at the venue.</p></div>
        <div className="why-card"><div className="why-icon is-act-9a7d6d">⚡</div><h3>Skip-the-Line</h3><p>Most activities include skip-the-line access — no more waiting in long queues at popular attractions.</p></div>
        <div className="why-card"><div className="why-icon is-act-9a7d6d">🆓</div><h3>Free Cancellation</h3><p>Cancel for free up to 24 hours before your activity — your plans can change, so can your booking.</p></div>
        <div className="why-card"><div className="why-icon is-act-9a7d6d">🌍</div><h3>Local Expert Guides</h3><p>Experienced local guides on every tour — deep knowledge, insider tips, and memorable storytelling.</p></div>
      </div>
    </div>
  </section>

  {/* ACTIVITIES GALLERY */}
  <section className="section is-act-5cc71b">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Experience Gallery</div><h2>Create Memories That Last a Lifetime</h2></div>
      <div className="gallery-grid fade-up">
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=900&q=85" alt="Adventure" loading="eager" /><div className="gallery-overlay">🎯</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" alt="Paris" loading="eager" /><div className="gallery-overlay">🗼</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" alt="Tokyo" loading="eager" /><div className="gallery-overlay">🍜</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80" alt="Snorkel" loading="eager" /><div className="gallery-overlay">🤿</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80" alt="Dubai" loading="eager" /><div className="gallery-overlay">🐪</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" alt="Rome" loading="eager" /><div className="gallery-overlay">🏛</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80" alt="Adventure" loading="eager" /><div className="gallery-overlay">🧗</div></div>
        <div className="gallery-item"><img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" alt="Bali" loading="eager" /><div className="gallery-overlay">🌴</div></div>
      </div>
    </div>
  </section>

  {/* ACTIVITY REVIEWS */}
  <section className="section reviews-bg">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label is-act-2d6452">Activity Reviews</div><h2 className="is-act-3e74a5">Real Experiences, Real Reviews</h2></div>
      <div className="reviews-grid fade-up">
        <div className="review-card"><div className="review-stars">★★★★★</div><div className="review-text">"The Paris Eiffel Tower tour was incredible. No queues, amazing guide and the views from the top were absolutely breathtaking. Worth every dollar."</div><div className="reviewer"><div className="rev-avatar">KL</div><div><div className="rev-name">Karen L.</div><div className="rev-loc">San Francisco, CA · Verified</div></div></div></div>
        <div className="review-card"><div className="review-stars">★★★★★</div><div className="review-text">"Tokyo food tour was the highlight of our entire trip. Our guide knew every hidden gem in Shinjuku. Booking was instant and the e-ticket worked perfectly."</div><div className="reviewer"><div className="rev-avatar">BN</div><div><div className="rev-name">Brian N.</div><div className="rev-loc">Phoenix, AZ · Verified</div></div></div></div>
        <div className="review-card"><div className="review-stars">★★★★★</div><div className="review-text">"Dubai desert safari — 100% worth it! Dune bashing was thrilling, camel riding was hilarious, and the BBQ dinner under the stars was unforgettable."</div><div className="reviewer"><div className="rev-avatar">CM</div><div><div className="rev-name">Christine M.</div><div className="rev-loc">Atlanta, GA · Verified</div></div></div></div>
      </div>
    </div>
  </section>

  {/* ACTIVITY GUIDES */}
  <section className="section is-act-5f7f58">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Activity Guides</div><h2>Make the Most of Every Destination</h2></div>
      <div className="guides-grid fade-up">
        <div className="guide-card"><div className="guide-img"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80" alt="Paris" loading="eager" /></div><div className="guide-body"><div className="guide-cat">City Guide</div><h3>Top 10 Things to Do in Paris — Insider Tips</h3><div className="guide-meta">7 min read · 19.4k views</div></div></div>
        <div className="guide-card"><div className="guide-img"><img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=500&q=80" alt="Adventure" loading="eager" /></div><div className="guide-body"><div className="guide-cat">Adventure Guide</div><h3>Best Adventure Activities for Thrill Seekers</h3><div className="guide-meta">8 min read · 12.7k views</div></div></div>
        <div className="guide-card"><div className="guide-img"><img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&q=80" alt="Food" loading="eager" /></div><div className="guide-body"><div className="guide-cat">Foodie Travel</div><h3>The World's Best Food Tour Destinations</h3><div className="guide-meta">6 min read · 24.1k views</div></div></div>
        <div className="guide-card"><div className="guide-img"><img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80" alt="History" loading="eager" /></div><div className="guide-body"><div className="guide-cat">Cultural Travel</div><h3>Skip-the-Line Tips at Europe's Top Landmarks</h3><div className="guide-meta">5 min read · 28.3k views</div></div></div>
      </div>
    </div>
  </section>

  {/* LOYALTY */}
  <section className="loyalty-section">
    <div className="section-inner is-act-e2e1e0">
      <div className="section-label is-act-2d6452">Activity Rewards</div>
      <h2 className="is-act-171a67">Earn Points on Every Experience</h2>
      <p>Book activities through Fareoworld and earn rewards points redeemable for free tours, hotel nights and flight upgrades.</p>
      <div className="tiers">
        <div className="tier-card"><div className="tier-icon">🥉</div><div className="tier-name">Explorer</div><div className="tier-pts">0–5,000 pts</div></div>
        <div className="tier-card"><div className="tier-icon">🥈</div><div className="tier-name">Voyager</div><div className="tier-pts">5K–20K pts</div></div>
        <div className="tier-card"><div className="tier-icon">🥇</div><div className="tier-name">Globetrotter</div><div className="tier-pts">20K–60K pts</div></div>
        <div className="tier-card"><div className="tier-icon">💎</div><div className="tier-name">Elite</div><div className="tier-pts">60,000+ pts</div></div>
      </div>
      <button className="btn-white">Join Free — Start Earning Activity Rewards</button>
    </div>
  </section>

  {/* NEWSLETTER */}
  <section className="newsletter-section">
    <div className="newsletter-inner">
      <div className="section-label">Activity Deals in Your Inbox</div>
      <h2>Get the Best Experience Deals</h2>
      <p>Exclusive activity discounts, skip-the-line access codes and destination tips delivered to your inbox.</p>
      <div className="newsletter-form">
        <input type="email" placeholder="Enter your email address" />
        <button>Get Activity Deals →</button>
      </div>
      <div className="is-act-21e1a0">No spam. Unsubscribe anytime.</div>
    </div>
  </section>

  

{/* ═══════════════════════════════════════════════════════
     DEALS & OFFERS LANDING PAGE
═══════════════════════════════════════════════════════ */}
    </div>
  );
}
