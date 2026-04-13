'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './AboutPage.css';

export default function AboutPage() {

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
    <div className="about-page">
<div className="lp-hero">
    <div className="lp-hero-bg is-abo-0dd891"></div>
    <div className="lp-hero-grad"></div>
    <div className="lp-hero-content fade-up">
      <button className="lp-back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back to Home</button>
      <h1>We Make Travel <em>Simple & Affordable</em></h1>
      <p>Flightlanes is America's fastest-growing travel booking platform — trusted by over 2 million travelers in 150+ countries.</p>
    </div>
  </div>

  <section className="section is-abo-f8531d">
    <div className="section-inner">
      <div className="is-abo-decd5d fade-up">
        <div>
          <div className="section-label">Our Story</div>
          <h2 className="is-abo-df2ecb">Built by Travelers, for Travelers</h2>
          <p className="is-abo-01c5fe">Founded in 2019 in New York City, Flightlanes was born from a simple frustration: finding affordable flights and hotels shouldn't require a PhD in comparison shopping.</p>
          <p className="is-abo-f9bffe">Our founders — a team of frequent travelers and tech veterans — built a platform that aggregates hundreds of airlines, hotel chains and tour operators into one seamless experience. Today, Flightlanes processes over 1 million searches per day and has helped travelers save an average of $347 per booking.</p>
          <div className="is-abo-2e7e39">
            <div className="is-abo-7c7d91"><div className="is-abo-71cedd">2M+</div><div className="is-abo-7624c0">Happy Travelers</div></div>
            <div className="is-abo-7c7d91"><div className="is-abo-71cedd">$347</div><div className="is-abo-7624c0">Avg. Savings / Booking</div></div>
            <div className="is-abo-7c7d91"><div className="is-abo-71cedd">150+</div><div className="is-abo-7624c0">Countries Covered</div></div>
            <div className="is-abo-7c7d91"><div className="is-abo-71cedd">4.9★</div><div className="is-abo-7624c0">Average Review Score</div></div>
          </div>
        </div>
        <div className="is-abo-c21377"><img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=85" alt="Team" loading="eager" className="is-abo-ec0c4d" /></div>
      </div>
    </div>
  </section>

  <section className="section is-abo-5f7f58">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Our Values</div><h2>What We Stand For</h2></div>
      <div className="why4 fade-up">
        <div className="why4-card"><div className="why4-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><h3>Transparency</h3><p>No hidden fees, no surprise charges. The price you see is the price you pay — always.</p></div>
        <div className="why4-card"><div className="why4-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></div><h3>Trust & Security</h3><p>Bank-level SSL encryption and PCI-DSS Level 1 compliance on every transaction.</p></div>
        <div className="why4-card"><div className="why4-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></div><h3>Always There</h3><p>24/7/365 customer support via live chat, phone and email — wherever you are in the world.</p></div>
        <div className="why4-card"><div className="why4-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg></div><h3>Continuous Innovation</h3><p>We invest in technology so you can search faster, book smarter and travel better every year.</p></div>
      </div>
    </div>
  </section>

  {/* TEAM */}
  <section className="section is-abo-f8531d">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Leadership Team</div><h2>Meet the Flightlanes Team</h2></div>
      <div className="is-abo-402e74 fade-up">
        <div className="is-abo-e2e1e0"><div className="is-abo-7e26af">AJ</div><div className="is-abo-29e71d">Alex Johnson</div><div className="is-abo-faed8a">CEO & Co-Founder</div><div className="is-abo-ddeb78">15 years in travel tech. Ex-Google, Stanford MBA.</div></div>
        <div className="is-abo-e2e1e0"><div className="is-abo-71954f">SR</div><div className="is-abo-29e71d">Sara Rivera</div><div className="is-abo-faed8a">CTO & Co-Founder</div><div className="is-abo-ddeb78">Former Amazon engineering lead. MIT Computer Science.</div></div>
        <div className="is-abo-e2e1e0"><div className="is-abo-83115b">MC</div><div className="is-abo-29e71d">Marcus Chen</div><div className="is-abo-faed8a">Chief Travel Officer</div><div className="is-abo-ddeb78">Ex-Expedia director. Visited 90+ countries personally.</div></div>
        <div className="is-abo-e2e1e0"><div className="is-abo-d55b9c">LP</div><div className="is-abo-29e71d">Lisa Park</div><div className="is-abo-faed8a">VP Customer Success</div><div className="is-abo-ddeb78">Built Flightlanes' 24/7 support system from the ground up.</div></div>
      </div>
    </div>
  </section>

  {/* PRESS & AWARDS */}
  <section className="section is-abo-5cc71b">
    <div className="section-inner">
      <div className="section-header fade-up"><div className="section-label">Recognition</div><h2>Awards & Press</h2></div>
      <div className="is-abo-15567d fade-up">
        <div className="is-abo-83b080"><div className="is-abo-a1831e">🏆</div><div className="is-abo-8e140a">"Best Travel App 2024"</div><div className="is-abo-8f6c39">Travel + Leisure Magazine</div></div>
        <div className="is-abo-83b080"><div className="is-abo-a1831e">⭐</div><div className="is-abo-8e140a">"Top 10 Sites to Save on Travel"</div><div className="is-abo-8f6c39">Forbes — December 2024</div></div>
        <div className="is-abo-83b080"><div className="is-abo-a1831e">🎖</div><div className="is-abo-8e140a">"Fastest Growing Travel Platform"</div><div className="is-abo-8f6c39">Inc. Magazine 5000 — 2024</div></div>
      </div>
    </div>
  </section>

  <section className="lp-cta-sec fade-up">
    <div className="section-inner is-abo-e2e1e0">
      <h2>Join 2 Million+ Happy Travelers</h2>
      <p>Experience the smartest, simplest way to book your next trip.</p>
      <div className="lp-cta-btns"><button className="btn-white">Create Free Account</button><button className="btn-white-outline">← Explore Deals</button></div>
    </div>
  </section>


{/* ═══════════════════════════════════════════════════════
     FAQ LANDING PAGE
═══════════════════════════════════════════════════════ */}

{/* ═══════════════════════════════════════════════════
     CUSTOMER SUPPORT PAGE
═══════════════════════════════════════════════════ */}
    </div>
  );
}
