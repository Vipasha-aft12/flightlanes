'use client';
import { useEffect, useRef } from 'react';
import { compareData } from '@/lib/flightUtils';

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    if (ref.current) ref.current.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function CompareTable() {
  const ref = useFadeUp();
  return (
    <section className="section compare-bg" ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Live Price Comparison</div>
          <h2>Compare Airlines in Real Time</h2>
          <p>We scan 500+ airlines simultaneously — so you always pay the lowest fare. Sample: NYC → London.</p>
        </div>
        <div className="compare-table fade-up">
          <div className="compare-head">
            <span>Airline</span><span>Departure</span><span>Duration</span><span>Price</span><span></span>
          </div>
          {compareData.map((row, i) => (
            <div className="compare-row" key={i}>
              <div className="airline-cell">
                <div className="airline-logo">{row.emoji}</div>
                <div>
                  <div className="airline-name">{row.airline}{row.best && <span className="best-val">Best Value</span>}</div>
                  <div className="airline-stops">{row.stops}</div>
                </div>
              </div>
              <span style={{ fontSize: '.85rem' }}>{row.dep}</span>
              <span style={{ fontSize: '.85rem' }}>{row.dur}</span>
              <span className="price-cell" style={row.best ? { color: 'var(--orange)' } : {}}>${row.price}</span>
              <button className={`cmp-btn ${row.best ? '' : 'ol'}`}>Book</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '.8rem', color: 'var(--g400)' }}>
          Sample fares. Prices update every 60 seconds from our partner airlines.
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  const ref = useFadeUp();
  const items = [
    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>, title: '500+ Airlines Compared', desc: 'We search every major airline and budget carrier simultaneously for your route.' },
    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>, title: 'Price Drop Alerts', desc: 'Set a price alert and we\'ll email you the moment fares drop for your route.' },
    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>, title: 'Free Change & Cancel', desc: 'Book with confidence. Most fares now include free changes and full refund options.' },
    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>, title: 'Instant E-Ticket', desc: 'Confirmation in seconds. Boarding passes delivered to your email and saved in the app.' },
  ];

  return (
    <section className="section" style={{ background: 'var(--g50)' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Why Flightlanes Flights</div>
          <h2>The Smarter Way to Book Flights</h2>
        </div>
        <div className="why4 fade-up">
          {items.map((item, i) => (
            <div className="why4-card" key={i}>
              <div className="why4-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TipsSection() {
  const ref = useFadeUp();
  const tips = [
    { img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', cat: 'Savings Guide', title: '15 Ways to Find Cheap Flights in 2025', meta: '6 min read · 18.7k views' },
    { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', cat: 'Upgrades', title: 'How to Get Upgraded to Business Class for Free', meta: '4 min read · 11.2k views' },
    { img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80', cat: 'Timing Tips', title: 'Best Day & Time to Book the Cheapest Flights', meta: '5 min read · 14.3k views' },
    { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', cat: 'Layover Guide', title: 'How to Make the Most of a Long Layover', meta: '7 min read · 8.9k views' },
  ];

  return (
    <section className="section" style={{ background: 'white' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Travel Tips</div>
          <h2>Flight Booking Tips That Save You Money</h2>
        </div>
        <div className="guides-grid fade-up">
          {tips.map((tip, i) => (
            <div className="guide-card" key={i}>
              <div className="guide-img"><img src={tip.img} alt={tip.title} loading="eager" /></div>
              <div className="guide-body">
                <div className="guide-cat">{tip.cat}</div>
                <h3>{tip.title}</h3>
                <div className="guide-meta">{tip.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const ref = useFadeUp();
  const reviews = [
    { text: '"Found a $349 round trip to London from NYC — $80 cheaper than every other site. Instant booking confirmation too!"', name: 'Emma M.', loc: 'New York, NY · Verified', initials: 'EM' },
    { text: '"Set a price alert for LA to Tokyo and got notified within 2 days when the fare dropped $150. Saved a ton!"', name: 'James T.', loc: 'Los Angeles, CA · Verified', initials: 'JT' },
    { text: '"The multi-city search tool made planning my Europe trip so easy. 4 cities, 3 flights booked in under 10 minutes."', name: 'Nicole B.', loc: 'Chicago, IL · Verified', initials: 'NB' },
  ];

  return (
    <section className="section" style={{ background: 'var(--teal)' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Traveler Reviews</div>
          <h2 style={{ color: 'white' }}>What Flight Bookers Say</h2>
        </div>
        <div className="rev3 fade-up">
          {reviews.map((r, i) => (
            <div className="rev3-card" key={i}>
              <div className="rev3-stars">★★★★★</div>
              <div className="rev3-txt">{r.text}</div>
              <div className="rev3-person">
                <div className="rev3-av">{r.initials}</div>
                <div>
                  <div className="rev3-name">{r.name}</div>
                  <div className="rev3-loc">{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="lp-cta-sec">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <h2>Ready to Take Off?</h2>
        <p>Search 500+ airlines for the cheapest fares on every route. Instant booking, 24/7 support.</p>
        <div className="lp-cta-btns">
          <a href="/flights"><button className="btn-white">✈ Search Flights Now</button></a>
        </div>
      </div>
    </section>
  );
}
