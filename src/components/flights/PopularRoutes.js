'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { popularRoutes } from '@/lib/flightUtils';

export default function PopularRoutes() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    if (ref.current) ref.current.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" style={{ background: 'white' }} ref={ref}>
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-label">Best Deals Now</div>
          <h2>Popular Flight Routes</h2>
          <p>Discover top travel destinations and find the best airfares to book your next trip with ease.
</p>
        </div>
        <div className="results-grid fade-up">
          {popularRoutes.map((route, i) => (
            <div className="result-card" key={i}>
              <div className="rc-img" style={{ position: 'relative' }}>
                <img src={route.img} alt={route.toFull} loading="eager" />
                <div className="rc-badge">{route.badge}</div>
              </div>
              <div className="rc-body">
                <div className="rc-stars" style={{ color: 'var(--teal)', fontSize: '.82rem', fontWeight: 700 }}>
                  ✈ {route.from} → {route.to}
                </div>
                <h3>{route.fromFull} → {route.toFull}</h3>
                <p>{route.stops} · {route.duration} · {route.airline} · {route.cabin}. {route.desc}</p>
                <div className="rc-foot">
                  <div className="rc-price">${route.price}<small>/pp</small></div>
                  <Link href={`/flights/results?type=oneway&from=${encodeURIComponent(route.fromFull)}&to=${encodeURIComponent(route.toFull)}`}>
                    <button className="btn-book">Book Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
