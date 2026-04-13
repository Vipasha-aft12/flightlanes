'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoading } from '@/components/loading/LoadingContext';

function CruiseDetailContent() {
  const params = useParams();
  const sp = useSearchParams();
  const router = useRouter();
  const { showLoading } = useLoading();
  const price = Number(sp.get('price')) || 599;
  const name = sp.get('name') || '7-Night Eastern Caribbean Escape';
  const line = sp.get('line') || 'Royal Caribbean';
  const dest = sp.get('dest') || 'caribbean';
  const nights = Number(sp.get('nights')) || 7;

  const [guests, setGuests] = useState(2);
  const [cabinUpgrade, setCabinUpgrade] = useState(0);
  const [departDate, setDepartDate] = useState('2026-09-15');

  const baseCost = price * guests;
  const upgradeCost = cabinUpgrade * guests;
  const portFees = 45 * guests;
  const totalCost = baseCost + upgradeCost + portFees;
  const bookUrl = `/cruises/booking/${params.id}?price=${price}&name=${encodeURIComponent(name)}&line=${encodeURIComponent(line)}&dest=${dest}&nights=${nights}`;
  const imgs = { caribbean: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1100&q=90', mediterranean: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1100&q=90', alaska: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1100&q=90', norway: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1100&q=90' };

  return (
    <div style={{ paddingTop: '68px' }}>
      <div className="hd-nav"><div className="hd-nav-inner">
        <div className="hd-crumbs"><Link href="/cruises"><span>Home</span></Link><span className="hd-crumbs-sep">›</span><Link href="/cruises"><span>Cruises</span></Link><span className="hd-crumbs-sep">›</span><span className="hd-crumbs-active">{name}</span></div>
        <div className="hd-nav-right"><Link href="/cruises/results" className="hd-nav-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back</Link><button className="hd-nav-cta" onClick={() => showLoading('cruise-booking', () => router.push(bookUrl))}>Book · from ${price}/pp</button></div>
      </div></div>

      <div style={{ maxWidth: '1160px', margin: '22px auto 0', padding: '0 28px' }}>
        <div className="crd-banner"><img src={imgs[dest] || imgs.caribbean} alt={name} /><div className="crd-banner-overlay"></div>
          <div className="crd-banner-info"><div className="crd-ship-line">{line} · Symphony of the Seas</div><div className="crd-title">{name}</div>
            <div className="crd-route-pills"><span className="crd-route-pill">📍 Miami</span><span className="crd-route-pill">→</span><span className="crd-route-pill">Nassau</span><span className="crd-route-pill">→</span><span className="crd-route-pill">St. Maarten</span><span className="crd-route-pill">→</span><span className="crd-route-pill">St. Thomas</span></div>
          </div>
        </div>
      </div>

      <div className="hd-toc-wrap"><div className="hd-toc-inline"><span className="hd-toc-inline-label">On this page</span><div className="hd-toc-items">
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">🚢</span>Overview</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">🎯</span>Highlights</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">🛏</span>Cabins</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">📋</span>Policies</button>
        <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">⭐</span>Reviews</button>
      </div></div></div>

      <div className="hd-wrap3">
        <div>
          <div className="hd-sec">
            <div className="hd-stars-row"><span className="hd-s-badge">{line}</span><span className="hd-s-badge" style={{ background: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>⭐ 9.1 Excellent</span><span className="hd-s-badge">{nights} Nights</span></div>
            <h1 className="hd-title" style={{ fontSize: '1.65rem', marginTop: '10px' }}>Symphony of the Seas</h1>
            <div className="hd-info-row"><div className="hd-loc-txt">🚢 World&apos;s Largest Cruise Ship · 6,680 passengers</div><div className="hd-score-pill"><span className="hd-sp-num">9.1</span><div className="hd-sp-txt"><strong>Excellent</strong><br /><span>14,280 reviews</span></div></div></div>
            <p className="hd-about-p">Symphony of the Seas is Royal Caribbean&apos;s crown jewel — with over 20 restaurants, Broadway-style theatre, FlowRider surf simulator, zip line, ice rink and 10 pools.</p>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Onboard highlights</div>
            <div className="cd-feats-grid">
              {['🍽 20+ restaurants & dining venues', '🎭 Broadway-style shows nightly', '🏊 10 pools including adults-only', '🏄 FlowRider surf simulator', '🎢 10-deck zip line', '⛸ Ice skating rink', '🛍 Boutiques & casino', '💆 Vitality Spa & fitness'].map((f, i) => (
                <div className="cd-feat" key={i}><span className="cd-feat-icon">{f.slice(0, 2)}</span>{f.slice(2)}</div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Cabin options</div>
            <div className="cd-insurance-grid">
              {[{ n: 'Interior', p: `$${price}/pp`, d: 'Cozy room. Perfect for budget cruisers.' },
                { n: 'Ocean View', p: `$${price + 150}/pp`, d: 'Porthole window. Wake to ocean views.' },
                { n: 'Balcony', p: `$${price + 350}/pp`, d: 'Private balcony. Most popular.' },
                { n: 'Suite', p: `$${price + 800}/pp`, d: 'Spacious suite with concierge.' }
              ].map((c, i) => (
                <div className={`cd-ins ${cabinUpgrade === [0, 150, 350, 800][i] ? 'selected' : ''}`} key={i} onClick={() => setCabinUpgrade([0, 150, 350, 800][i])} style={{ cursor: 'pointer' }}>
                  <div className="cd-ins-name">{c.n}</div><div className="cd-ins-price">{c.p}</div><div className="cd-ins-desc">{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Cruise policies</div>
            <div className="hd-pol-grid">
              {[{ i: '💳', t: 'Deposit', b: 'Low deposit to secure. Balance due 90 days before.' }, { i: '↩', t: 'Cancellation', b: 'Free cancel up to 75 days. Partial refund within 75 days.' }, { i: '🪪', t: 'Documents', b: 'Valid passport required. Check visa requirements.' }, { i: '🍽', t: 'Dining', b: 'All main dining included. Specialty restaurants for surcharge.' }].map((p, i) => (
                <div className="hd-pol" key={i}><div className="hd-pol-icon">{p.i}</div><div className="hd-pol-title">{p.t}</div><div className="hd-pol-body">{p.b}</div></div>
              ))}
            </div>
          </div>

          <div className="hd-sec"><div className="hd-sec-title">Cruiser reviews</div>
            <div className="hd-rev-summary"><div className="hd-rev-big"><div className="hd-rev-big-num">9.1</div><div className="hd-rev-big-lbl">Excellent</div><div className="hd-rev-big-cnt">14,280 cruises</div></div><div className="hd-rev-bars">
              {[{ l: 'Ship', w: '94%', v: '9.4' }, { l: 'Dining', w: '92%', v: '9.2' }, { l: 'Entertainment', w: '96%', v: '9.6' }, { l: 'Value', w: '86%', v: '8.6' }].map((b, i) => (
                <div className="hd-rev-bar-row" key={i}><span className="hd-rev-bar-lbl">{b.l}</span><div className="hd-rev-bar-track"><div className="hd-rev-bar-fill" style={{ width: b.w }}></div></div><span className="hd-rev-bar-val">{b.v}</span></div>
              ))}
            </div></div>
            <div className="hd-rev-grid">
              {[{ ini: 'MK', n: 'Mike K.', dt: 'Sep 2025', txt: 'Best family vacation ever. Kids loved the water park, we loved the pool deck.' },
                { ini: 'LL', n: 'Lisa L.', dt: 'Aug 2025', txt: 'Broadway shows were incredible. Ate at a different restaurant every night.' }].map((r, i) => (
                <div className="hd-rev-card" key={i}><div className="hd-rev-top"><div className="hd-rev-av">{r.ini}</div><div><div className="hd-rev-nm">{r.n}</div><div className="hd-rev-dt">{r.dt}</div></div><div className="hd-rev-st">★★★★★</div></div><p className="hd-rev-txt">&ldquo;{r.txt}&rdquo;</p></div>
              ))}
            </div>
          </div>
        </div>

        {/* FULL BOOKING WIDGET */}
        <div>
          <div className="hd-widget">
            <div className="hd-wg-head">
              <div className="hd-wg-price"><span className="hd-wg-amt">${price}</span><span className="hd-wg-per">/ person</span></div>
              <div className="hd-wg-total">${totalCost.toLocaleString()} for {guests} guests · {nights} nights</div>
              <div className="hd-wg-score"><span className="hd-wg-sbadge">9.1 ★</span><span className="hd-wg-stxt">Excellent · 14,280 reviews</span></div>
            </div>
            <div className="hd-wg-body">
              <div className="wg-row">
                <div><label className="wg-label">Departure Date</label><input type="date" className="wg-input" value={departDate} onChange={(e) => setDepartDate(e.target.value)} /></div>
                <div><label className="wg-label">Guests</label>
                  <select className="wg-select" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                    <option value={1}>1 Guest</option><option value={2}>2 Guests</option><option value={3}>3 Guests</option><option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>
              <div className="wg-full" style={{ marginBottom: '11px' }}>
                <label className="wg-label">Cabin Type</label>
                <select className="wg-select" value={cabinUpgrade} onChange={(e) => setCabinUpgrade(Number(e.target.value))}>
                  <option value={0}>Interior (from ${price}/pp)</option>
                  <option value={150}>Ocean View (+$150/pp)</option>
                  <option value={350}>Balcony (+$350/pp)</option>
                  <option value={800}>Suite (+$800/pp)</option>
                </select>
              </div>
              <div className="wg-breakdown">
                <div className="wg-bd-row"><span>Cruise · {nights}N · {guests} guests</span><span>${baseCost.toLocaleString()}</span></div>
                <div className="wg-bd-row"><span>Cabin upgrade</span><span>{upgradeCost > 0 ? `+$${upgradeCost.toLocaleString()}` : 'Included'}</span></div>
                <div className="wg-bd-row"><span>Port fees &amp; taxes</span><span>${portFees}</span></div>
                <div className="wg-bd-row"><span>Total</span><span style={{ color: 'var(--teal)' }}>${totalCost.toLocaleString()}</span></div>
              </div>
              <button className="wg-cta" onClick={() => showLoading('cruise-booking', () => router.push(bookUrl))}>Book Now → ${totalCost.toLocaleString()}</button>
              <div className="wg-guarantees">
                <div className="wg-g"><span className="wg-g-ic">✅</span> Free cancellation up to 75 days</div>
                <div className="wg-g"><span className="wg-g-ic">💳</span> Low deposit, balance due later</div>
                <div className="wg-g"><span className="wg-g-ic">🔒</span> Secure payment · SSL encrypted</div>
                <div className="wg-g"><span className="wg-g-ic">🌍</span> ATOL protected cruise holiday</div>
              </div>
            </div>
          </div>
          <div className="hd-help">
            <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--g800)', marginBottom: '6px' }}>Customise this cruise</div>
            <div style={{ fontSize: '.76rem', color: 'var(--g600)', marginBottom: '12px', lineHeight: 1.6 }}>Want to add shore excursions, drinks package or a cabin upgrade? We can tailor it.</div>
            <button className="btn-primary" style={{ width: '100%', height: '38px', fontSize: '.8rem' }} onClick={() => alert('Live chat · 1-800-FLIGHT-1')}>Chat with an expert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CruiseDetailPage() {
  return <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading cruise...</div>}><CruiseDetailContent /></Suspense>;
}
