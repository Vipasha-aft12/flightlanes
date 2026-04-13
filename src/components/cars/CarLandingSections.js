'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { popularDestinations, carDeals, rentalCompanies } from '@/lib/carUtils';

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
  const items = [
    { icon: '🛡', text: 'No Hidden Fees' }, { icon: '✅', text: 'Free Cancellation' },
    { icon: '💳', text: 'Instant Confirmation' }, { icon: '📞', text: '24/7 Roadside Support' },
    { icon: '⭐', text: '500+ Brands Compared' },
  ];
  return (
    <div className="trust-strip"><div className="trust-inner">
      {items.map((item, i) => (
        <div className="trust-item" key={i}><div className="trust-icon">{item.icon}</div>{item.text}</div>
      ))}
    </div></div>
  );
}

function DealsTicker() {
  const deals = [
    '🚗 Economy Cars NYC from $22/day', '🚙 SUV Miami Save 35%', '💎 Luxury Vegas from $89/day',
    '🚐 Minivan Los Angeles from $65/day', '🚗 Compact Cars Chicago from $28/day',
    '🏎 Convertible Miami from $72/day', '🚙 4WD Off-road Phoenix Save 40%',
  ];
  const doubled = [...deals, ...deals];
  return (
    <div className="deals-ticker"><div className="ticker-inner">
      {doubled.map((d, i) => <div className="ticker-item" key={i}>{d}</div>)}
    </div></div>
  );
}

function StatsSection() {
  const stats = [
    { num: '50K+', label: 'Vehicles Available' }, { num: '500+', label: 'Rental Brands' },
    { num: '120+', label: 'Countries' }, { num: 'Free', label: 'Cancellation' },
  ];
  return (
    <div className="stats-section"><div className="stats-grid">
      {stats.map((s, i) => <div className="stat-item" key={i}><div className="stat-num">{s.num}</div><div className="stat-label">{s.label}</div></div>)}
    </div></div>
  );
}

function Destinations() {
  const ref = useFadeUp();
  return (
    <section className="section" style={{ background: 'white' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label">Top Rental Locations</div><h2>Most Popular Car Rental Cities</h2><p>Pick up and drop off at airports, city centers and train stations across the USA and worldwide.</p></div>
        <div className="destinations-grid fade-up">
          {popularDestinations.map((d, i) => (
            <div className="dest-card" key={i} style={d.span ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}}>
              <img src={d.img} alt={d.name} loading="eager" />
              <div className="dest-overlay"></div>
              <div className="dest-info"><h3>{d.name}</h3><p>{d.sub}</p></div>
              <div className="dest-price">from ${d.price}/day</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Deals() {
  const ref = useFadeUp();
  return (
    <section className="section deals-bg" ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label">Today&apos;s Deals</div><h2>Best Car Rental Deals</h2><p>Exclusive rates from Hertz, Enterprise, Avis, Budget and 500+ more rental brands.</p></div>
        <div className="deals-grid fade-up">
          {carDeals.map((deal, i) => (
            <div className="deal-card" key={i}>
              <div className="deal-img"><img src={deal.img} alt={deal.title} loading="eager" /><div className="deal-badge">{deal.badge}</div></div>
              <div className="deal-body">
                <div className="deal-tag">{deal.tag}</div>
                <h3>{deal.title}</h3>
                <div className="deal-meta"><span>{deal.meta}</span></div>
                <div className="deal-footer">
                  <div><div className="deal-from">from</div><div className="deal-amount">${deal.price}<span className="deal-per">/day</span></div></div>
                  <Link href="/cars/results"><button className="btn-book">Book Now</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarTypes() {
  const ref = useFadeUp();
  const types = [
    { title: 'Economy & Compact Cars', best: 'Best for city driving & airport runs', feats: ['⛽ Fuel Efficient', '💰 Lowest Rates', '🅿 Easy Parking'], price: 22, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80' },
    { title: 'SUVs & Crossovers', best: 'Best for families & road trips', feats: ['👨‍👩‍👧 7-Seater Options', '🏔 All-Terrain', '🧳 Large Trunk'], price: 48, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
    { title: 'Luxury & Premium Cars', best: 'Best for business & special occasions', feats: ['🌟 BMW / Mercedes', '🛋 Leather Interior', '📶 WiFi Hotspot'], price: 89, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80' },
  ];
  return (
    <section className="section" style={{ background: 'var(--g50)' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label">Choose Your Ride</div><h2>Every Vehicle Type for Every Trip</h2><p>From compact city cars to spacious family minivans — compare all vehicle classes side-by-side.</p></div>
        <div className="packages-grid fade-up">
          {types.map((t, i) => (
            <div className="pkg-card" key={i}>
              <div className="pkg-img"><img src={t.img} alt={t.title} loading="eager" /></div>
              <div className="pkg-body">
                <div className="pkg-rating">⭐ {t.best}</div>
                <h3>{t.title}</h3>
                <div className="pkg-feats">{t.feats.map((f, j) => <span className="pkg-feat" key={j}>{f}</span>)}</div>
                <div className="pkg-footer">
                  <div className="pkg-price">${t.price} <span>/ day</span></div>
                  <Link href="/cars/results"><button className="btn-book">Rent Now</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanySlider() {
  const ref = useFadeUp();
  const [offset, setOffset] = useState(0);
  const maxSlide = Math.max(0, rentalCompanies.length - 4);

  function slide(dir) {
    setOffset((prev) => Math.max(0, Math.min(prev + dir, maxSlide)));
  }

  return (
    <section className="cr-slider-section" ref={ref}>
      <div className="section-inner">
        <div className="cr-slider-controls fade-up">
          <div>
            <div className="section-label" style={{ marginBottom: '8px', display: 'inline-block' }}>Top Rental Brands</div>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--g800)', marginBottom: '6px' }}>America&apos;s Leading Car Rental Companies</h2>
            <p style={{ color: 'var(--g600)', fontSize: '.95rem', maxWidth: '520px', lineHeight: 1.65 }}>We partner with 500+ trusted brands so you always compare the best rates.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <button className="cr-view-all">View All Brands →</button>
            <div className="cr-slider-nav">
              <button className="cr-nav-btn" onClick={() => slide(-1)} disabled={offset === 0}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button className="cr-nav-btn" onClick={() => slide(1)} disabled={offset >= maxSlide}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="cr-slider-wrap fade-up">
          <div className="cr-track" style={{ transform: `translateX(-${offset * 25}%)` }}>
            {rentalCompanies.map((co, i) => (
              <div className="cr-company-card" key={i}>
                <div className="cr-company-img">
                  <img src={co.img} alt={co.name} loading="eager" />
                  <div className="cr-company-logo-badge"><span>{co.logo}</span> {co.name}</div>
                </div>
                <div className="cr-company-body">
                  <div className="cr-company-name">{co.name}</div>
                  <div className="cr-company-desc">{co.desc}</div>
                  <div className="cr-company-footer">
                    <div className="cr-company-rate">from <strong>${co.rate}/day</strong></div>
                    <span className={`cr-company-badge ${co.badgeTop ? 'top' : ''}`}>{co.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const ref = useFadeUp();
  const reviews = [
    { text: '"Saved $120 on a 7-day SUV rental in Miami. Price was $30/day cheaper than Hertz direct. Highly recommend!"', name: 'David R.', loc: 'Miami, FL · Verified', initials: 'DR' },
    { text: '"Booked a Tesla Model 3 through Flightlanes for a road trip from LA to SF. Seamless pickup at LAX, free Supercharging included."', name: 'Sarah K.', loc: 'Los Angeles, CA · Verified', initials: 'SK' },
    { text: '"The comparison tool showed me Budget was $15/day cheaper than Enterprise for the exact same car. Saved over $100 on my trip."', name: 'Michael T.', loc: 'Chicago, IL · Verified', initials: 'MT' },
  ];
  return (
    <section className="section" style={{ background: 'var(--teal)' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up"><div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Renter Reviews</div><h2 style={{ color: 'white' }}>What Renters Say</h2></div>
        <div className="rev3 fade-up">
          {reviews.map((r, i) => (
            <div className="rev3-card" key={i}>
              <div className="rev3-stars">★★★★★</div>
              <div className="rev3-txt">{r.text}</div>
              <div className="rev3-person">
                <div className="rev3-av">{r.initials}</div>
                <div><div className="rev3-name">{r.name}</div><div className="rev3-loc">{r.loc}</div></div>
              </div>
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
        <h2>Ready to Hit the Road?</h2>
        <p>Compare 500+ rental brands for the best daily rates. Instant booking, free cancellation, 24/7 support.</p>
        <div className="lp-cta-btns"><Link href="/cars"><button className="btn-white">🚗 Search Car Rentals Now</button></Link></div>
      </div>
    </section>
  );
}

export default function CarLandingSections() {
  return (
    <>
      <TrustStrip />
      <DealsTicker />
      <StatsSection />
      <Destinations />
      <Deals />
      <CarTypes />
      <CompanySlider />
      <Reviews />
      <CTASection />
    </>
  );
}
