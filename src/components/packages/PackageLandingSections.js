'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { popularDestinations } from '@/lib/packageUtils';

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((e) => { e.forEach((el) => { if (el.isIntersecting) el.target.classList.add('visible'); }); }, { threshold: 0.1 });
    if (ref.current) ref.current.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function TrustStrip() {
  return (<div className="trust-strip"><div className="trust-inner">
    {[{ i: '🎁', t: 'Everything Included' }, { i: '✅', t: 'Save up to 40% vs. Separate' }, { i: '💳', t: 'Low Deposit Available' }, { i: '📞', t: '24/7 Package Support' }, { i: '⭐', t: '4.9★ Customer Rating' }].map((item, i) => (
      <div className="trust-item" key={i}><div className="trust-icon">{item.i}</div>{item.t}</div>
    ))}
  </div></div>);
}

function DealsTicker() {
  const d = ['🌴 Bali 10-Day from $1,299/pp', '🌅 Maldives All-Inclusive from $2,199/pp', '🎌 Japan Cherry Blossom Save 25%', '🏔 Swiss Alps Ski from $1,899/pp', '🌮 Mexico All-Inclusive from $699/pp', '🗼 Paris Romantic from $1,199/pp', '🌺 Hawaii Island Hop from $1,599/pp'];
  return (<div className="deals-ticker"><div className="ticker-inner">{[...d, ...d].map((t, i) => <div className="ticker-item" key={i}>{t}</div>)}</div></div>);
}

function StatsSection() {
  return (<div className="stats-section"><div className="stats-grid">
    {[{ n: '5,000+', l: 'Package Deals' }, { n: '40%', l: 'Avg Bundle Savings' }, { n: '120+', l: 'Destinations' }, { n: '4.9★', l: 'Package Rating' }].map((s, i) => (
      <div className="stat-item" key={i}><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
    ))}
  </div></div>);
}

function Destinations() {
  const ref = useFadeUp();
  return (<section className="section" style={{ background: 'white' }} ref={ref}><div className="section-inner">
    <div className="section-header fade-up"><div className="section-label">Dream Destinations</div><h2>Most-Booked Vacation Packages</h2><p>All-inclusive holiday packages with flights, hotels, transfers and activities — bundled for maximum savings.</p></div>
    <div className="destinations-grid fade-up">{popularDestinations.map((d, i) => (
      <div className="dest-card" key={i} style={d.span ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}}><img src={d.img} alt={d.name} loading="eager" /><div className="dest-overlay"></div><div className="dest-info"><h3>{d.name}</h3><p>{d.sub}</p></div><div className="dest-price">from ${d.price}/pp</div></div>
    ))}</div>
  </div></section>);
}

function FeaturedPackages() {
  const ref = useFadeUp();
  const pkgs = [
    { title: 'Bali Bliss — Luxury Villa Package', sub: '✈ Round Trip · 10 Nights · Bali', rating: '★★★★★ (2,481) · Singapore Airlines', feats: ['✈ Flights', '🏨 5★ Villa', '🚗 Transfers', '🍳 Breakfast', '🏄 2 Activities'], price: 1299, img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85' },
    { title: 'Maldives — Overwater Villa All-Inclusive', sub: '✈ Round Trip · 7 Nights · Maldives', rating: '★★★★★ (1,840) · Emirates', feats: ['✈ Flights', '🏨 Overwater Villa', '🍽 All-Inclusive', '🚤 Speed Boat'], price: 2199, img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=85' },
    { title: 'Hawaii Island Hop — Oahu & Maui', sub: '✈ Round Trip · 12 Nights · Hawaii', rating: '★★★★★ (3,124) · United Airlines', feats: ['✈ Flights', '🏨 Resort', '🚗 Car Rental', '🤿 Snorkel', '🚁 Heli Tour'], price: 1899, img: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&q=85' },
  ];
  return (<section className="section deals-bg" ref={ref}><div className="section-inner">
    <div className="section-header fade-up"><div className="section-label">Bundle &amp; Save</div><h2>Our Best Vacation Packages</h2><p>Flight + Hotel + Transfers bundled together — book as a package and save up to 40%.</p></div>
    <div className="packages-grid fade-up">{pkgs.map((p, i) => (
      <div className="pkg-card" key={i}><div className="pkg-img"><img src={p.img} alt={p.title} loading="eager" /></div><div className="pkg-body">
        <div className="pkg-rating">{p.rating}</div><h3>{p.title}</h3>
        <div className="pkg-feats">{p.feats.map((f, j) => <span className="pkg-feat" key={j}>{f}</span>)}</div>
        <div className="pkg-footer"><div className="pkg-price">${p.price} <span>/ person</span></div><Link href="/packages/results"><button className="btn-book">Book Package</button></Link></div>
      </div></div>
    ))}</div>
  </div></section>);
}

function WhyPackage() {
  const ref = useFadeUp();
  return (<section className="section" style={{ background: 'white' }} ref={ref}><div className="section-inner">
    <div className="section-header fade-up"><div className="section-label">Why Book a Package?</div><h2>Save More, Stress Less</h2></div>
    <div className="why-grid fade-up">
      {[{ i: '💰', t: 'Save up to 40%', d: 'Bundling flights, hotels and transfers together is always cheaper than booking each separately.' },
        { i: '📦', t: 'Everything in One Booking', d: 'Flights, accommodation, airport transfers, and activities — all confirmed in a single booking reference.' },
        { i: '🛡', t: 'Full Financial Protection', d: 'Your package is ATOL-protected. If anything goes wrong, you\'re fully covered and we\'ll sort it out.' },
        { i: '📞', t: '24/7 Dedicated Support', d: 'Our package specialists are available around the clock — before, during and after your trip.' },
      ].map((w, i) => (<div className="why-card" key={i}><div className="why-icon" style={{ fontSize: '1.5rem' }}>{w.i}</div><h3>{w.t}</h3><p>{w.d}</p></div>))}
    </div>
  </div></section>);
}

function Reviews() {
  const ref = useFadeUp();
  return (<section className="section" style={{ background: 'var(--teal)' }} ref={ref}><div className="section-inner">
    <div className="section-header fade-up"><div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Package Reviews</div><h2 style={{ color: 'white' }}>What Travelers Say</h2></div>
    <div className="rev3 fade-up">
      {[{ t: '"The Bali package was incredible — private villa, daily breakfast, airport transfers and 2 activities all included. Saved $800 vs booking separately."', n: 'Emma & David K.', l: 'New York · Verified', i: 'EK' },
        { t: '"Maldives overwater villa was a dream come true. The all-inclusive dining package meant zero stress. Flightlanes made it effortless."', n: 'James & Sarah T.', l: 'Los Angeles · Verified', i: 'JT' },
        { t: '"Our Hawaii island hop was perfectly organized — flights between islands, car rental, hotels all pre-booked. Best family vacation ever."', n: 'Patricia L.', l: 'Chicago · Verified', i: 'PL' },
      ].map((r, i) => (<div className="rev3-card" key={i}><div className="rev3-stars">★★★★★</div><div className="rev3-txt">{r.t}</div><div className="rev3-person"><div className="rev3-av">{r.i}</div><div><div className="rev3-name">{r.n}</div><div className="rev3-loc">{r.l}</div></div></div></div>))}
    </div>
  </div></section>);
}

function CTA() {
  return (<section className="lp-cta-sec"><div className="section-inner" style={{ textAlign: 'center' }}><h2>Ready for Your Dream Vacation?</h2><p>Compare 5,000+ vacation packages. Flight + Hotel + Transfers bundled. Save up to 40%.</p><div className="lp-cta-btns"><Link href="/packages"><button className="btn-white">🎁 Search Packages Now</button></Link></div></div></section>);
}

export default function PackageLandingSections() {
  return (<><TrustStrip /><DealsTicker /><StatsSection /><Destinations /><FeaturedPackages /><WhyPackage /><Reviews /><CTA /></>);
}
