'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoading } from '@/components/loading/LoadingContext';

function CarDetailContent() {
  const params = useParams();
  const sp = useSearchParams();
  const router = useRouter();
  const { showLoading } = useLoading();
  const price = Number(sp.get('price')) || 24;
  const name = sp.get('name') || 'Toyota Corolla or Similar';
  const company = sp.get('company') || 'Enterprise';
  const type = sp.get('type') || 'Economy';
  const days = Number(sp.get('days')) || 4;

  const [pickupDate, setPickupDate] = useState('2026-08-01');
  const [dropoffDate, setDropoffDate] = useState('2026-08-05');
  const [insurance, setInsurance] = useState(0);

  const baseCost = price * days;
  const insuranceCost = insurance * days;
  const taxes = Math.round(baseCost * 0.08);
  const totalCost = baseCost + insuranceCost + taxes;
  const bookUrl = `/cars/booking/${params.id}?price=${price}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&type=${type}&days=${days}`;
  const typeEmoji = { Economy: '🚗', Compact: '🚗', SUV: '🚙', Luxury: '💎', Minivan: '🚐', Convertible: '🏎', Electric: '⚡' }[type] || '🚗';
  const imgs = { Economy: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&q=85', SUV: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=85', Luxury: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85', Convertible: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=85', Electric: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=85' };

  return (
    <div style={{ paddingTop: '68px' }}>
      <div className="hd-nav"><div className="hd-nav-inner">
        <div className="hd-crumbs"><Link href="/cars"><span>Home</span></Link><span className="hd-crumbs-sep">›</span><Link href="/cars"><span>Car Rentals</span></Link><span className="hd-crumbs-sep">›</span><Link href="/cars/results"><span>Results</span></Link><span className="hd-crumbs-sep">›</span><span className="hd-crumbs-active">{name}</span></div>
        <div className="hd-nav-right"><Link href="/cars/results" className="hd-nav-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back</Link><button className="hd-nav-cta" onClick={() => showLoading('car-booking', () => router.push(bookUrl))}>Reserve · ${price}/day</button></div>
      </div></div>

      <div style={{ maxWidth: '1160px', margin: '22px auto 0', padding: '0 28px' }}>
        <div className="cd-hero"><div className="cd-hero-badge">{typeEmoji} {type}</div><img src={imgs[type] || imgs.Economy} alt={name} /></div>
      </div>

      <div className="hd-toc-wrap"><div className="hd-toc-inline"><span className="hd-toc-inline-label">On this page</span><div className="hd-toc-items">
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">🚗</span>Overview</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">✅</span>Included</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">🛡</span>Insurance</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">📋</span>Policies</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">⭐</span>Reviews</button>
      </div></div></div>

      <div className="hd-wrap3">
        <div>
          <div className="hd-sec">
            <div className="hd-stars-row"><span className="hd-s-badge">🟢 {company}</span><span className="hd-s-badge" style={{ background: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>✅ Free Cancellation</span></div>
            <h1 className="hd-title" style={{ fontSize: '1.7rem', marginTop: '10px' }}>{name}</h1>
            <div className="hd-info-row"><div className="hd-loc-txt"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg><span>Los Angeles International Airport · LAX</span></div><div className="hd-score-pill"><span className="hd-sp-num">4.6</span><div className="hd-sp-txt"><strong>Excellent</strong><br /><span>12,840 reviews</span></div></div></div>
            <div className="cd-specs-grid">
              {[{ i: '👥', v: '5 Seats', l: 'Passengers' }, { i: '🧳', v: '2 Large Bags', l: 'Luggage' }, { i: '⚙', v: 'Automatic', l: 'Transmission' }, { i: '❄', v: 'Petrol · A/C', l: 'Engine' }].map((s, i) => (
                <div className="cd-spec" key={i}><div className="cd-spec-icon">{s.i}</div><div className="cd-spec-val">{s.v}</div><div className="cd-spec-lbl">{s.l}</div></div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">What&apos;s included</div>
            <div className="cd-feats-grid">
              {['✅ Free cancellation up to 48h', '🛞 Unlimited mileage', '🛡 Basic third-party liability', '🚗 Airport pickup counter', '📶 SiriusXM Radio', '❄ Air conditioning', '📱 Bluetooth connectivity', '🔌 USB charging port'].map((f, i) => (
                <div className="cd-feat" key={i}><span className="cd-feat-icon">{f.slice(0, 2)}</span>{f.slice(2)}</div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Insurance options</div>
            <div className="cd-insurance-grid">
              {[{ n: 'Basic Cover', p: 'Included', d: 'Third-party liability. You cover first $500 of damage.' },
                { n: 'Full Cover', p: '+$12/day', d: 'Collision damage waiver. Zero excess.' },
                { n: 'Premium Cover', p: '+$22/day', d: 'Full cover + roadside assistance + personal accident.' }
              ].map((ins, i) => (
                <div className={`cd-ins ${insurance === [0, 12, 22][i] ? 'selected' : ''}`} key={i} onClick={() => setInsurance([0, 12, 22][i])} style={{ cursor: 'pointer' }}>
                  <div className="cd-ins-name">{ins.n}</div><div className="cd-ins-price">{ins.p}</div><div className="cd-ins-desc">{ins.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Rental policies</div>
            <div className="hd-pol-grid">
              {[{ i: '🪪', t: 'Driver Requirements', b: "Valid driver's license. Min age 21. Credit card at pickup." }, { i: '⛽', t: 'Fuel Policy', b: 'Full-to-full. Return with same fuel level.' }, { i: '🕐', t: 'Pick-up & Drop-off', b: 'Counter open 24h at LAX Terminal 1. Free 59-min grace.' }, { i: '↩', t: 'Cancellation', b: 'Free cancellation up to 48h. Late cancel: 1 day fee.' }].map((p, i) => (
                <div className="hd-pol" key={i}><div className="hd-pol-icon">{p.i}</div><div className="hd-pol-title">{p.t}</div><div className="hd-pol-body">{p.b}</div></div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Renter reviews</div>
            <div className="hd-rev-summary"><div className="hd-rev-big"><div className="hd-rev-big-num">4.6</div><div className="hd-rev-big-lbl">Excellent</div><div className="hd-rev-big-cnt">12,840 rentals</div></div><div className="hd-rev-bars">
              {[{ l: 'Cleanliness', w: '92%', v: '4.6' }, { l: 'Value', w: '90%', v: '4.5' }, { l: 'Pickup ease', w: '88%', v: '4.4' }, { l: 'Condition', w: '94%', v: '4.7' }].map((b, i) => (
                <div className="hd-rev-bar-row" key={i}><span className="hd-rev-bar-lbl">{b.l}</span><div className="hd-rev-bar-track"><div className="hd-rev-bar-fill" style={{ width: b.w }}></div></div><span className="hd-rev-bar-val">{b.v}</span></div>
              ))}
            </div></div>
            <div className="hd-rev-grid">
              {[{ ini: 'TJ', n: 'Tyler J.', dt: 'Aug 2025 · Denver', txt: 'Rented through Flightlanes — $30 cheaper per day than direct. Car was spotless.' },
                { ini: 'AF', n: 'Amanda F.', dt: 'Jul 2025 · Houston', txt: 'Perfect economy car for our LA trip. Fuel efficient, easy to park in Hollywood.' }].map((r, i) => (
                <div className="hd-rev-card" key={i}><div className="hd-rev-top"><div className="hd-rev-av">{r.ini}</div><div><div className="hd-rev-nm">{r.n}</div><div className="hd-rev-dt">{r.dt}</div></div><div className="hd-rev-st">★★★★★</div></div><p className="hd-rev-txt">&ldquo;{r.txt}&rdquo;</p></div>
              ))}
            </div>
          </div>
        </div>

        {/* FULL BOOKING WIDGET */}
        <div>
          <div className="hd-widget">
            <div className="hd-wg-head">
              <div className="hd-wg-price"><span className="hd-wg-amt">${price}</span><span className="hd-wg-per">/ day</span></div>
              <div className="hd-wg-total">${totalCost} total · {days} days</div>
              <div className="hd-wg-score"><span className="hd-wg-sbadge">4.6 ★</span><span className="hd-wg-stxt">Excellent · 12,840 reviews</span></div>
            </div>
            <div className="hd-wg-body">
              <div className="wg-row">
                <div><label className="wg-label">Pick-up Date</label><input type="date" className="wg-input" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} /></div>
                <div><label className="wg-label">Drop-off Date</label><input type="date" className="wg-input" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} /></div>
              </div>
              <div className="wg-row">
                <div><label className="wg-label">Vehicle</label><div className="wg-input" style={{ display: 'flex', alignItems: 'center', padding: '0 12px', color: 'var(--g800)' }}>{typeEmoji} {type}</div></div>
                <div><label className="wg-label">Insurance</label>
                  <select className="wg-select" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))}>
                    <option value={0}>Basic (Included)</option>
                    <option value={12}>Full Cover (+$12/day)</option>
                    <option value={22}>Premium (+$22/day)</option>
                  </select>
                </div>
              </div>
              <div className="wg-breakdown">
                <div className="wg-bd-row"><span>Rental · {days} days × ${price}</span><span>${baseCost}</span></div>
                <div className="wg-bd-row"><span>Insurance</span><span>{insuranceCost > 0 ? `+$${insuranceCost}` : 'Included'}</span></div>
                <div className="wg-bd-row"><span>Taxes &amp; fees</span><span>${taxes}</span></div>
                <div className="wg-bd-row"><span>Total</span><span style={{ color: 'var(--teal)' }}>${totalCost}</span></div>
              </div>
              <button className="wg-cta" onClick={() => showLoading('car-booking', () => router.push(bookUrl))}>Book Now → ${totalCost}</button>
              <div className="wg-guarantees">
                <div className="wg-g"><span className="wg-g-ic">✅</span> Free cancellation up to 48h before pickup</div>
                <div className="wg-g"><span className="wg-g-ic">💳</span> No hidden charges</div>
                <div className="wg-g"><span className="wg-g-ic">🔒</span> Secure payment · SSL encrypted</div>
                <div className="wg-g"><span className="wg-g-ic">🏆</span> Best price guarantee</div>
              </div>
            </div>
          </div>
          <div className="hd-help">
            <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--g800)', marginBottom: '6px' }}>Need a different car?</div>
            <div style={{ fontSize: '.76rem', color: 'var(--g600)', marginBottom: '12px', lineHeight: 1.6 }}>Want to upgrade, add GPS, child seat or extra driver? We can help.</div>
            <button className="btn-primary" style={{ width: '100%', height: '38px', fontSize: '.8rem' }} onClick={() => alert('Live chat · 1-800-FLIGHT-1')}>Chat with an expert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarDetailPage() {
  return <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading car details...</div>}><CarDetailContent /></Suspense>;
}
