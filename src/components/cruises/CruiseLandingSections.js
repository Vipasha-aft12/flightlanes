'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { popularDestinations } from '@/lib/cruiseUtils';

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

function TrustStrip() {
  return (
    <div className="trust-strip"><div className="trust-inner">
      {[{ i: '🍽', t: 'All Meals Included' }, { i: '💳', t: 'Low Deposit Available' }, { i: '✅', t: 'All Major Cruise Lines' }, { i: '📞', t: '24/7 Cruise Support' }, { i: '⭐', t: '1,000+ Itineraries' }].map((item, i) => (
        <div className="trust-item" key={i}><div className="trust-icon">{item.i}</div>{item.t}</div>
      ))}
    </div></div>
  );
}

function DealsTicker() {
  const deals = ['🌊 Caribbean 7-Night from $549/pp', '🏛 Mediterranean Cruise from $799/pp', '🌌 Norway Northern Lights from $1,299/pp', '🏔 Alaska Glacier Save 20%', '🌮 Mexican Riviera from $599/pp', '🌍 World Cruise 2025 from $8,999/pp', '🌴 Bahamas Weekend from $299/pp'];
  return (
    <div className="deals-ticker"><div className="ticker-inner">
      {[...deals, ...deals].map((d, i) => <div className="ticker-item" key={i}>{d}</div>)}
    </div></div>
  );
}

function StatsSection() {
  return (
    <div className="stats-section"><div className="stats-grid">
      {[{ n: '1,000+', l: 'Cruise Itineraries' }, { n: '8+', l: 'Major Cruise Lines' }, { n: '200+', l: 'Ports of Call' }, { n: 'Low', l: 'Deposits Available' }].map((s, i) => (
        <div className="stat-item" key={i}><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
      ))}
    </div></div>
  );
}

function Destinations() {
  const ref = useFadeUp();
  return (
    <section className="section" style={{ background: 'white' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label">Cruise Destinations</div><h2>Sail the World&apos;s Most Beautiful Waters</h2><p>From turquoise Caribbean lagoons to Norway&apos;s majestic fjords — find your perfect cruise itinerary.</p></div>
        <div className="destinations-grid fade-up">
          {popularDestinations.map((d, i) => (
            <div className="dest-card" key={i} style={d.span ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}}>
              <img src={d.img} alt={d.name} loading="eager" /><div className="dest-overlay"></div>
              <div className="dest-info"><h3>{d.name}</h3><p>{d.sub}</p></div>
              <div className="dest-price">from ${d.price}/pp</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CruiseDeals() {
  const ref = useFadeUp();
  const deals = [
    { line: 'Royal Caribbean', title: 'Caribbean Paradise — 7 Nights', rating: '★★★★★ (6,210)', feats: ['🍽 All Meals', '🏖 Bahamas', '🌴 Jamaica', '🎭 Shows', '🎰 Casino'], price: 549, img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80' },
    { line: 'MSC Cruises', title: 'Mediterranean Discovery — 10 Nights', rating: '★★★★★ (4,821)', feats: ['🍽 All Meals', '🏛 Rome', '⛵ Santorini', '🌊 Dubrovnik', '🗼 Barcelona'], price: 799, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
    { line: 'Norwegian Cruise Line', title: 'Norway Fjords & Northern Lights — 14 Nights', rating: '★★★★★ (2,310)', feats: ['🍽 All Meals', '🌠 Northern Lights', '⛰ Fjords', '🏔 Bergen', '🎿 Tromsø'], price: 1899, img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80' },
  ];
  return (
    <section className="section deals-bg" ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label">Cruise Deals</div><h2>Best Cruise Offers Right Now</h2><p>Limited cabins available — lock in these incredible cruise deals before they sell out.</p></div>
        <div className="packages-grid fade-up">
          {deals.map((d, i) => (
            <div className="pkg-card" key={i}>
              <div className="pkg-img"><img src={d.img} alt={d.title} loading="eager" /></div>
              <div className="pkg-body">
                <div className="pkg-rating">{d.rating} · {d.line}</div>
                <h3>{d.title}</h3>
                <div className="pkg-feats">{d.feats.map((f, j) => <span className="pkg-feat" key={j}>{f}</span>)}</div>
                <div className="pkg-footer"><div className="pkg-price">${d.price} <span>/ person</span></div><Link href="/cruises/results"><button className="btn-book">Book Cruise</button></Link></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCruise() {
  const ref = useFadeUp();
  return (
    <section className="section" style={{ background: 'white' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label">Why Cruise?</div><h2>Everything Included, Nothing Missed</h2></div>
        <div className="why-grid fade-up">
          {[
            { i: '🍽', t: 'All Meals Included', d: 'Breakfast, lunch, dinner and late-night snacks are all part of your cruise fare. No meal planning needed.' },
            { i: '⚓', t: 'Multiple Ports of Call', d: 'Visit 4–8 incredible destinations in one trip — unpack once and wake up in a new port every day.' },
            { i: '💳', t: 'Low Deposit Booking', d: 'Secure your cabin with a low deposit and pay the full balance 90 days before departure.' },
            { i: '🏖', t: 'Shore Excursion Deals', d: "Book shore excursions through Flightlanes at exclusive discounted rates — skip the ship's mark-up." },
          ].map((w, i) => (
            <div className="why-card" key={i}><div className="why-icon" style={{ fontSize: '1.5rem' }}>{w.i}</div><h3>{w.t}</h3><p>{w.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const ref = useFadeUp();
  const reviews = [
    { text: '"Our Caribbean cruise was magical — 7 nights of pure paradise. The kids loved the water slides and we loved the included dining."', name: 'Sarah & Mike D.', loc: 'Texas · Verified', initials: 'SD' },
    { text: '"Mediterranean cruise through Flightlanes saved us $400 compared to booking direct. Santorini sunset from the ship was unforgettable."', name: 'James R.', loc: 'New York · Verified', initials: 'JR' },
    { text: '"The Alaska glacier cruise was a bucket-list experience. Watching whales from the deck while sipping hot chocolate — incredible."', name: 'Patricia L.', loc: 'California · Verified', initials: 'PL' },
  ];
  return (
    <section className="section" style={{ background: 'var(--teal)' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Cruise Reviews</div><h2 style={{ color: 'white' }}>What Cruisers Say</h2></div>
        <div className="rev3 fade-up">
          {reviews.map((r, i) => (
            <div className="rev3-card" key={i}><div className="rev3-stars">★★★★★</div><div className="rev3-txt">{r.text}</div>
              <div className="rev3-person"><div className="rev3-av">{r.initials}</div><div><div className="rev3-name">{r.name}</div><div className="rev3-loc">{r.loc}</div></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="lp-cta-sec">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <h2>Ready to Set Sail?</h2>
        <p>Compare 1,000+ cruise itineraries from all major cruise lines. Low deposits, free cancellation, 24/7 support.</p>
        <div className="lp-cta-btns"><Link href="/cruises"><button className="btn-white">🚢 Search Cruises Now</button></Link></div>
      </div>
    </section>
  );
}

export default function CruiseLandingSections() {
  return (<><TrustStrip /><DealsTicker /><StatsSection /><Destinations /><CruiseDeals /><WhyCruise /><Reviews /><CTASection /></>);
}
