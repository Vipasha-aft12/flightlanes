'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/components/packages/packagesDetail.css';
import '@/components/shared/detail.css';
import { useLoading } from '@/components/loading/LoadingContext';

function PackageDetailContent() {
  const params = useParams();
  const sp = useSearchParams();
  const router = useRouter();
  const { showLoading } = useLoading();
  const price = Number(sp.get('price')) || 1299;
  const name = sp.get('name') || 'Bali Bliss — Luxury Villa Package';
  const dest = sp.get('dest') || 'bali';
  const nights = Number(sp.get('nights')) || 10;
  const airline = sp.get('airline') || 'Singapore Airlines';
  const hotel = sp.get('hotel') || 'Luxury Private Villa';
  const board = sp.get('board') || 'Breakfast Only';
  const star = sp.get('star') || '5★';

  const [adults, setAdults] = useState(2);
  const [roomUpgrade, setRoomUpgrade] = useState(0);
  const [departDate, setDepartDate] = useState('2026-09-15');
  const [returnDate, setReturnDate] = useState('2026-09-25');

  const baseCost = price * adults;
  const upgradeCost = roomUpgrade * adults;
  const taxes = Math.round(baseCost * 0.07);
  const totalCost = baseCost + upgradeCost + taxes;
  const bookUrl = `/packages/booking/${params.id}?price=${price}&name=${encodeURIComponent(name)}&dest=${dest}&nights=${nights}&airline=${encodeURIComponent(airline)}`;

  const imgs = { bali: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1100&q=90', maldives: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1100&q=90', cancun: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=1100&q=90', hawaii: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=1100&q=90', paris: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1100&q=90', swiss: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1100&q=90', japan: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1100&q=90', dubai: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1100&q=90', santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1100&q=90', rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1100&q=90', london: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1100&q=90', iceland: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1100&q=90' };
  const destLabel = dest.charAt(0).toUpperCase() + dest.slice(1);

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>
        <div className="hd-nav"><div className="hd-nav-inner">
          <div className="hd-crumbs"><Link href="/packages"><span>Home</span></Link><span className="hd-crumbs-sep">›</span><Link href="/packages"><span>Packages</span></Link><span className="hd-crumbs-sep">›</span><span className="hd-crumbs-active">{name}</span></div>
          <div className="hd-nav-right"><Link href="/packages/results" className="hd-nav-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back</Link><button className="hd-nav-cta" onClick={() => showLoading('package-booking', () => router.push(bookUrl))}>Book · from ${price}/pp</button></div>
        </div></div>

        <div style={{ maxWidth: '1160px', margin: '22px auto 0', padding: '0 28px' }}>
          <div className="crd-banner"><img src={imgs[dest] || imgs.bali} alt={name} /><div className="crd-banner-overlay"></div>
            <div className="crd-banner-info"><div className="crd-ship-line">{airline} · {star} {hotel}</div><div className="crd-title">{name}</div>
              <div className="crd-route-pills"><span className="crd-route-pill">✈ NYC</span><span className="crd-route-pill">→</span><span className="crd-route-pill">🏨 {destLabel}</span><span className="crd-route-pill">📅 {nights} Nights</span></div>
            </div>
          </div>
        </div>

        <div className="hd-toc-wrap"><div className="hd-toc-inline"><span className="hd-toc-inline-label">On this page</span><div className="hd-toc-items">
          <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">🎁</span>Overview</button>
          <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">✅</span>Included</button>
          <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">📅</span>Itinerary</button>
          <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">📋</span>Policies</button>
          <button className="hd-toc-ilink"><span className="hd-toc-ilink-ic">⭐</span>Reviews</button>
        </div></div></div>

        <div className="hd-wrap3">
          <div>
            <div className="hd-sec" id="pkg-overview">
              <div className="hd-stars-row"><span className="hd-s-badge">{airline}</span><span className="hd-s-badge" style={{ background: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>✅ Free Cancellation</span><span className="hd-s-badge">{nights} Nights</span></div>
              <h1 className="hd-title" style={{ fontSize: '1.65rem', marginTop: '10px' }}>{name}</h1>
              <div className="hd-info-row"><div className="hd-loc-txt">🎁 {star} {hotel} · {board}</div><div className="hd-score-pill"><span className="hd-sp-num">9.3</span><div className="hd-sp-txt"><strong>Exceptional</strong><br /><span>2,481 reviews</span></div></div></div>
              <p className="hd-about-p">This all-inclusive package includes round-trip flights with {airline}, {nights} nights at a {star.replace('★', '-star')} {hotel.toLowerCase()}, airport transfers, daily {board.toLowerCase()}, and curated activities — all bundled for maximum savings.</p>
              <p className="hd-about-p" style={{ marginTop: '12px' }}>Save up to 40% compared to booking flights, hotels and transfers individually. Every detail is pre-arranged so you can focus on enjoying your vacation.</p>
            </div>

            <div className="hd-sec" id="pkg-included">
              <div className="hd-sec-title">What&apos;s included</div>
              <div className="cd-feats-grid">
                {[`✈ Round-trip flights · ${airline}`, `🏨 ${nights} nights · ${star} ${hotel}`, '🚗 Airport transfers both ways', `🍽 ${board}`, '🏄 2 guided activities included', '📶 Free WiFi at hotel', '🛡 Travel insurance included', '📞 24/7 package support'].map((f, i) => (
                  <div className="cd-feat" key={i}><span className="cd-feat-icon">{f.slice(0, 2)}</span>{f.slice(2)}</div>
                ))}
              </div>
            </div>

            <div className="hd-sec" id="pkg-itinerary">
              <div className="hd-sec-title">Sample itinerary</div>
              <div className="hd-pol-grid">
                {[{ i: '✈', t: 'Day 1 — Arrival', b: `Fly from NYC to ${destLabel} with ${airline}. Private airport transfer to your ${hotel.toLowerCase()}. Welcome drink and evening free.` },
                  { i: '🏖', t: `Days 2–${Math.floor(nights / 2)} — Explore & Discover`, b: `Enjoy included activities — guided cultural tours, water sports, and local experiences. Daily ${board.toLowerCase()} at the hotel.` },
                  { i: '🌅', t: `Days ${Math.floor(nights / 2) + 1}–${nights - 1} — Relax & Unwind`, b: 'Beach days, spa treatments, local cuisine exploration. Optional excursions available at discounted rates.' },
                  { i: '✈', t: `Day ${nights} — Departure`, b: 'Leisurely breakfast. Private transfer to airport. Return flight home with unforgettable memories.' },
                ].map((p, i) => (
                  <div className="hd-pol" key={i}><div className="hd-pol-icon">{p.i}</div><div className="hd-pol-title">{p.t}</div><div className="hd-pol-body">{p.b}</div></div>
                ))}
              </div>
            </div>

            <div className="hd-sec" id="pkg-policies">
              <div className="hd-sec-title">Booking policies</div>
              <div className="hd-pol-grid">
                {[{ i: '💳', t: 'Deposit & Payment', b: '25% deposit to secure. Full balance due 60 days before departure.' }, { i: '↩', t: 'Cancellation', b: 'Free cancellation up to 30 days. 50% refund 15–29 days. Non-refundable within 14 days.' }, { i: '🪪', t: 'Documents', b: 'Valid passport (6+ months). Check visa requirements. E-tickets emailed after payment.' }, { i: '✏', t: 'Changes', b: 'Date changes allowed once with admin fee. Name changes up to 14 days before departure.' }].map((p, i) => (
                  <div className="hd-pol" key={i}><div className="hd-pol-icon">{p.i}</div><div className="hd-pol-title">{p.t}</div><div className="hd-pol-body">{p.b}</div></div>
                ))}
              </div>
            </div>

            <div className="hd-sec" id="pkg-reviews">
              <div className="hd-sec-title">Traveler reviews</div>
              <div className="hd-rev-summary"><div className="hd-rev-big"><div className="hd-rev-big-num">9.3</div><div className="hd-rev-big-lbl">Exceptional</div><div className="hd-rev-big-cnt">2,481 bookings</div></div><div className="hd-rev-bars">
                {[{ l: 'Hotel Quality', w: '94%', v: '9.4' }, { l: 'Flights', w: '90%', v: '9.0' }, { l: 'Activities', w: '92%', v: '9.2' }, { l: 'Value', w: '96%', v: '9.6' }].map((b, i) => (
                  <div className="hd-rev-bar-row" key={i}><span className="hd-rev-bar-lbl">{b.l}</span><div className="hd-rev-bar-track"><div className="hd-rev-bar-fill" style={{ width: b.w }}></div></div><span className="hd-rev-bar-val">{b.v}</span></div>
                ))}
              </div></div>
              <div className="hd-rev-grid">
                {[{ ini: 'EK', n: 'Emma K.', dt: 'Sep 2025 · New York', txt: 'Best vacation ever. Villa was stunning, transfers seamless, activities incredible. Saved $800 vs booking separately.' },
                  { ini: 'MT', n: 'Mark T.', dt: 'Aug 2025 · Chicago', txt: 'Incredible value. Flights comfortable, villa exceeded expectations. Daily breakfast was a nice touch. Already planning next trip.' }
                ].map((r, i) => (
                  <div className="hd-rev-card" key={i}><div className="hd-rev-top"><div className="hd-rev-av">{r.ini}</div><div><div className="hd-rev-nm">{r.n}</div><div className="hd-rev-dt">{r.dt}</div></div><div className="hd-rev-st">★★★★★</div></div><p className="hd-rev-txt">&ldquo;{r.txt}&rdquo;</p></div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: COMPLETE BOOKING WIDGET */}
          <div>
            <div className="hd-widget">
              <div className="hd-wg-head">
                <div className="hd-wg-price"><span className="hd-wg-amt">${price.toLocaleString()}</span><span className="hd-wg-per">/ person</span></div>
                <div className="hd-wg-total">${totalCost.toLocaleString()} for {adults} traveler{adults > 1 ? 's' : ''} · {nights} nights</div>
                <div className="hd-wg-score"><span className="hd-wg-sbadge">9.3 ★</span><span className="hd-wg-stxt">Exceptional · 2,481 reviews</span></div>
              </div>
              <div className="hd-wg-body">
                <div className="wg-row">
                  <div><label className="wg-label">Departure Date</label><input type="date" className="wg-input" value={departDate} onChange={(e) => setDepartDate(e.target.value)} /></div>
                  <div><label className="wg-label">Return Date</label><input type="date" className="wg-input" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></div>
                </div>
                <div className="wg-row">
                  <div><label className="wg-label">Adults</label>
                    <select className="wg-select" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                      <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
                    </select>
                  </div>
                  <div><label className="wg-label">Room Type</label>
                    <select className="wg-select" value={roomUpgrade} onChange={(e) => setRoomUpgrade(Number(e.target.value))}>
                      <option value={0}>Garden Villa</option>
                      <option value={300}>Pool Villa (+$300)</option>
                      <option value={600}>Clifftop Suite (+$600)</option>
                    </select>
                  </div>
                </div>
                <div className="wg-breakdown">
                  <div className="wg-bd-row"><span>Package · {nights} nights · {adults} people</span><span>${baseCost.toLocaleString()}</span></div>
                  <div className="wg-bd-row"><span>Room upgrade</span><span>{upgradeCost > 0 ? `+$${upgradeCost.toLocaleString()}` : 'Included'}</span></div>
                  <div className="wg-bd-row"><span>Taxes &amp; fees</span><span>${taxes.toLocaleString()}</span></div>
                  <div className="wg-bd-row"><span>Total</span><span style={{ color: 'var(--teal)' }}>${totalCost.toLocaleString()}</span></div>
                </div>
                <button className="wg-cta" onClick={() => showLoading('package-booking', () => router.push(bookUrl))}>Book Now → ${totalCost.toLocaleString()}</button>
                <div className="wg-guarantees">
                  <div className="wg-g"><span className="wg-g-ic">✅</span> Free cancellation up to 30 days before</div>
                  <div className="wg-g"><span className="wg-g-ic">💳</span> 25% deposit today, balance due later</div>
                  <div className="wg-g"><span className="wg-g-ic">🔒</span> Secure payment · SSL encrypted</div>
                  <div className="wg-g"><span className="wg-g-ic">🌍</span> ATOL protected package holiday</div>
                </div>
              </div>
            </div>
            <div className="hd-help">
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--g800)', marginBottom: '6px' }}>Customise this package</div>
              <div style={{ fontSize: '.76rem', color: 'var(--g600)', marginBottom: '12px', lineHeight: 1.6 }}>Want to extend your stay, add extra activities or upgrade your flight class? We can tailor it for you.</div>
              <button className="btn-primary" style={{ width: '100%', height: '38px', fontSize: '.8rem' }} onClick={() => alert('Live chat · 1-800-FLIGHT-1')}>Chat with an expert</button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default function PackageDetailPage() {
  return <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading package...</div>}><PackageDetailContent /></Suspense>;
}
