'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import '@/components/shared/booking.css';
import '@/components/shared/confirmation.css';

function BookingContent() {
  const params = useParams();
  const sp = useSearchParams();
  const price = Number(sp.get('price')) || 599;
  const name = sp.get('name') || '7-Night Caribbean Escape';
  const line = sp.get('line') || 'Royal Caribbean';
  const nights = Number(sp.get('nights')) || 7;

  const [step, setStep] = useState(1);
  const [terms, setTerms] = useState(false);
  const [ref, setRef] = useState('');
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNum: '', passportExpiry: '' }]);
  const [addons, setAddons] = useState({ drinks: false, wifi: false, excursions: false, photo: false });
  const [cabin, setCabin] = useState('Interior');

  const cabinUpcharge = { Interior: 0, Oceanview: 150, Balcony: 350, Suite: 800 }[cabin] || 0;
  const addonTotal = (addons.drinks ? 65 : 0) + (addons.wifi ? 15 : 0) + (addons.excursions ? 89 : 0) + (addons.photo ? 25 : 0);
  const perPerson = price + cabinUpcharge + addonTotal;
  const grandTotal = perPerson * passengers.length + 45;
  const countries = ['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany', 'France', 'UAE', 'Other'];

  function updatePassenger(idx, field, val) { const u = [...passengers]; u[idx] = { ...u[idx], [field]: val }; setPassengers(u); }
  function addPassenger() { if (passengers.length < 6) setPassengers([...passengers, { firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNum: '', passportExpiry: '' }]); }
  function removePassenger(idx) { if (passengers.length > 1) setPassengers(passengers.filter((_, i) => i !== idx)); }

  async function handleConfirm() {
    const r = 'CRS-' + Math.floor(10000 + Math.random() * 90000);
    setRef(r);
    try { await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingRef: r, cruiseId: params.id, name, line, nights, cabin, passengers, addons, totalPrice: grandTotal, bookedAt: new Date().toISOString() }) }); } catch {}
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goStep(s) { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>
        <div className="bkp-topbar"><div className="bkp-topbar-inner">
          <Link href="/cruises/results" className="bkp-back-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back to Results</Link>
          <div className="bkp-secure-badge">🔒 256-bit SSL · Secure checkout</div>
        </div></div>

        <div className="bkp-header"><div className="bkp-header-inner">
          <div className="bkp-brand">🚢 Fareoworld — Secure Cruise Booking</div>
          <div className="bkp-stepbar">
            {[1, 2, 3, 4].map((s, i) => (
              <div key={s} style={{ display: 'contents' }}>
                <div className={`bkp-step ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}><div className="bkp-step-dot">{step > s ? '✓' : s}</div><div className="bkp-step-lbl">{['Cruise Details', 'Passenger Info', 'Payment', 'Confirmed'][i]}</div></div>
                {s < 4 && <div className={`bkp-step-line ${step > s ? 'done' : ''}`}></div>}
              </div>
            ))}
          </div>
        </div></div>

        <div className="bkp-body">
          <div>
            {/* STEP 1 */}
            {step === 1 && (
              <div className="bkp-card"><div className="bkp-card-head"><h2><span className="bkp-step-num">1</span>Cruise Details</h2><p>Review your selected cruise before continuing.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Cruise Summary</div>
                  <div className="bkp-trip-box"><div className="bkp-trip-route"><span>🚢</span><span>{name}</span><span className="bkp-trip-route-badge">Cruise</span></div>
                    <div className="bkp-trip-meta">
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Cruise Line</div><div className="bkp-trip-meta-val">{line}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Duration</div><div className="bkp-trip-meta-val">{nights} nights</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Price per person</div><div className="bkp-trip-meta-val" style={{ color: 'var(--teal)', fontSize: '1.05rem' }}>${price}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Departure</div><div className="bkp-trip-meta-val">Miami, FL</div></div>
                    </div></div>
                  <div className="bkp-sec">Select Cabin</div>
                  <div className="bkp-addons">
                    {['Interior', 'Oceanview', 'Balcony', 'Suite'].map((c) => (
                      <div className={`bkp-addon ${cabin === c ? 'selected' : ''}`} key={c} onClick={() => setCabin(c)} style={{ cursor: 'pointer', borderColor: cabin === c ? 'var(--teal)' : undefined, background: cabin === c ? 'var(--ice)' : undefined }}>
                        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input type="radio" name="cabin" checked={cabin === c} onChange={() => setCabin(c)} style={{ accentColor: 'var(--teal)' }} />
                          <div className="bkp-addon-txt"><div className="bkp-addon-name">🛏 {c}</div><div className="bkp-addon-price">{cabinUpcharge === 0 && c === 'Interior' ? 'Included' : `+$${({ Interior: 0, Oceanview: 150, Balcony: 350, Suite: 800 }[c])}/pp`}</div></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="bkp-sec">What&apos;s Included</div>
                  <div className="bkp-includes">
                    {['✅ All meals & dining', '✅ Entertainment & shows', '✅ Pool & fitness access', '✅ Port visits included', '✅ Kids club (ages 3-17)', '✅ 24/7 room service'].map((item) => <div className="bkp-include-item" key={item}>{item}</div>)}
                  </div>
                  <div className="bkp-actions">
                    <Link href="/cruises/results" className="bkp-btn-back"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Change Cruise</Link>
                    <button className="bkp-btn-next" onClick={() => goStep(2)}>Continue to Passenger Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg></button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="bkp-card"><div className="bkp-card-head"><h2><span className="bkp-step-num">2</span>Passenger Information</h2><p>Enter details exactly as they appear on your passport.</p></div>
                <div className="bkp-card-body">
                  {passengers.map((p, idx) => (
                    <div className="bkp-person-block" key={idx}>
                      <div className="bkp-person-header">
                        <div className="bkp-person-badge">👤 Passenger {idx + 1} {idx === 0 && <span className="bkp-person-primary">Primary</span>}</div>
                        {idx > 0 && <button style={{ background: 'none', border: 'none', color: 'var(--g400)', cursor: 'pointer', fontSize: '.82rem', fontWeight: 700 }} onClick={() => removePassenger(idx)}>✕ Remove</button>}
                      </div>
                      <div className="bkp-person-body">
                        <div className="bkp-sec" style={{ marginTop: 0 }}>Personal Details</div>
                        <div className="bkp-row">
                          <div className="bkp-field"><label>First Name *</label><input className="bkp-input" type="text" placeholder="e.g. Jane" value={p.firstName} onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)} /></div>
                          <div className="bkp-field"><label>Last Name *</label><input className="bkp-input" type="text" placeholder="e.g. Smith" value={p.lastName} onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)} /></div>
                        </div>
                        {idx === 0 && (<><div className="bkp-field"><label>Email *</label><input className="bkp-input" type="email" placeholder="jane@example.com" value={p.email} onChange={(e) => updatePassenger(idx, 'email', e.target.value)} /></div>
                          <div className="bkp-field"><label>Phone *</label><input className="bkp-input" type="tel" placeholder="+1 (555) 000-0000" value={p.phone} onChange={(e) => updatePassenger(idx, 'phone', e.target.value)} /></div></>)}
                        <div className="bkp-row">
                          <div className="bkp-field"><label>Date of Birth *</label><input className="bkp-input" type="date" value={p.dob} onChange={(e) => updatePassenger(idx, 'dob', e.target.value)} /></div>
                          <div className="bkp-field"><label>Nationality *</label><select className="bkp-input select-input" value={p.nationality} onChange={(e) => updatePassenger(idx, 'nationality', e.target.value)}><option value="">Select</option>{countries.map((c) => <option key={c}>{c}</option>)}</select></div>
                        </div>
                        <div className="bkp-sec">Passport</div>
                        <div className="bkp-row">
                          <div className="bkp-field"><label>Passport Number *</label><input className="bkp-input" type="text" placeholder="e.g. AB1234567" value={p.passportNum} onChange={(e) => updatePassenger(idx, 'passportNum', e.target.value)} /></div>
                          <div className="bkp-field"><label>Expiry Date *</label><input className="bkp-input" type="date" value={p.passportExpiry} onChange={(e) => updatePassenger(idx, 'passportExpiry', e.target.value)} /></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="bkp-add-person-btn" onClick={addPassenger}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg> + Add Another Passenger</button>
                  <div className="bkp-sec">Add-ons &amp; Extras</div>
                  <div className="bkp-addons">
                    {[{ k: 'drinks', i: '🍷', n: 'Drinks Package', p: '+$65/pp' }, { k: 'wifi', i: '📶', n: 'WiFi Package', p: '+$15/pp' }, { k: 'excursions', i: '🏖', n: 'Shore Excursion Bundle', p: '+$89/pp' }, { k: 'photo', i: '📸', n: 'Photo Package', p: '+$25/pp' }].map((a) => (
                      <div className="bkp-addon" key={a.k}><label><input type="checkbox" checked={addons[a.k]} onChange={(e) => setAddons({ ...addons, [a.k]: e.target.checked })} /><div className="bkp-addon-txt"><div className="bkp-addon-name">{a.i} {a.n}</div><div className="bkp-addon-price">{a.p}</div></div></label></div>
                    ))}
                  </div>
                  <div className="bkp-actions">
                    <button className="bkp-btn-back" onClick={() => goStep(1)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back</button>
                    <button className="bkp-btn-next" onClick={() => goStep(3)}>Continue to Payment <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg></button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="bkp-card"><div className="bkp-card-head"><h2><span className="bkp-step-num">3</span>Confirm &amp; Pay</h2><p>Review your cruise booking and confirm.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Order Summary</div>
                  <div className="bkp-pay-summary-box"><div className="bkp-pay-sum-row"><span className="bkp-pay-sum-icon">🚢</span><div className="bkp-pay-sum-info"><div className="bkp-pay-sum-name">{name}</div><div className="bkp-pay-sum-meta">{line} · {nights} nights · {passengers.length} guest{passengers.length > 1 ? 's' : ''} · {cabin}</div></div><div className="bkp-pay-sum-price">${grandTotal}</div></div></div>
                  <div className="bkp-lock-note" style={{ marginTop: '16px' }}>🔒 Your payment is secured with 256-bit SSL encryption.</div>
                  <div className="bkp-pay-methods-row"><span style={{ fontSize: '.72rem', color: 'var(--g400)', fontWeight: 600 }}>Secure payment via:</span>{['VISA', 'Mastercard', 'Amex', 'PayPal'].map((m) => <span className="bkp-card-badge" key={m}>{m}</span>)}</div>
                  <div className="bkp-sec" style={{ marginTop: '20px' }}>Terms</div>
                  <div className="bkp-terms-box"><label className="bkp-terms-label"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /><span>I agree to the <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Terms</a>, <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Privacy Policy</a>, and <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Cruise Contract</a>.</span></label></div>
                  <div className="bkp-actions" style={{ marginTop: '20px' }}>
                    <button className="bkp-btn-back" onClick={() => goStep(2)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back</button>
                    <button className="bkp-btn-confirm" disabled={!terms} onClick={handleConfirm} style={{ opacity: terms ? 1 : 0.5, cursor: terms ? 'pointer' : 'not-allowed' }}>🔒 Pay Now — ${grandTotal}</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="bkp-card"><div className="bkp-card-body" style={{ padding: '28px' }}>
                <div style={{ borderBottom: '1px solid #eaecef', paddingBottom: '20px', marginBottom: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,.2)' }}></span><h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669', margin: 0 }}>Cruise Booking Confirmed!</h2></div>
                  <p style={{ fontSize: '.82rem', color: 'var(--g400)', margin: 0, paddingLeft: '20px' }}>Confirmation email sent to your inbox.</p>
                </div>
                <div className="conf-ref-strip"><div className="conf-ref-left"><div className="conf-ref-lbl">Booking Reference</div><div className="conf-ref-code">{ref}</div></div><div className="conf-ref-right"><div className="conf-ref-lbl">Booking Date</div><div className="conf-ref-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div><div className="conf-paid-badge">✅ Payment Successful</div></div></div>
                <div className="conf-sec-hd">Cruise Details</div>
                <div className="conf-snapshot"><div className="conf-snap-body"><div className="conf-snap-name">🚢 {name} <span className="conf-snap-badge">{cabin}</span></div><div className="conf-snap-sub">{line} · {nights} nights</div>
                  <div className="conf-details-grid">
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Passengers</div><div className="conf-detail-val">{passengers.length}</div></div>
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Total Paid</div><div className="conf-detail-val" style={{ color: 'var(--teal)' }}>${grandTotal}</div></div>
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Cabin</div><div className="conf-detail-val">{cabin}</div></div>
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Status</div><div className="conf-detail-val" style={{ color: '#059669' }}>Confirmed</div></div>
                  </div></div></div>
                <div className="conf-next-box"><div className="conf-next-hd">📋 What Happens Next</div><div className="conf-next-item">✅ Cruise documents emailed within 24 hours</div><div className="conf-next-item">✅ Online check-in opens 30 days before sailing</div><div className="conf-next-item">✅ Arrive at port at least 2 hours before departure</div></div>
                <div className="conf-actions">
                  <button className="conf-btn-dl" onClick={() => alert('Downloading cruise documents...')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> Download Documents</button>
                  <Link href="/cruises/results" className="conf-btn-search" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Search Again</Link>
                  <Link href="/cruises" className="conf-btn-home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>🏠 Home</Link>
                </div>
              </div></div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="bkp-sidebar"><div className="bkp-side-card">
            <div className="bkp-side-head"><div className="bkp-side-head-lbl">Your Cruise</div><div className="bkp-side-trip">🚢 {name}</div></div>
            <div className="bkp-side-body">
              <div className="bkp-side-row"><span>Cruise Line</span><b>{line}</b></div>
              <div className="bkp-side-row"><span>Duration</span><b>{nights} nights</b></div>
              <div className="bkp-side-row"><span>Cabin</span><b>{cabin}</b></div>
              <div className="bkp-side-row"><span>Guests</span><b>{passengers.length}</b></div>
              <div className="bkp-side-row"><span>Base fare</span><b>${price}/pp</b></div>
              {cabinUpcharge > 0 && <div className="bkp-side-row"><span>Cabin upgrade</span><b>+${cabinUpcharge}/pp</b></div>}
              {addonTotal > 0 && <div className="bkp-side-row"><span>Add-ons</span><b>+${addonTotal}/pp</b></div>}
              <div className="bkp-side-row"><span>Port fees</span><b>$45</b></div>
            </div>
            <div className="bkp-side-total"><div className="bkp-side-total-lbl">Total</div><div className="bkp-side-total-amt">${grandTotal}</div><div style={{ fontSize: '.7rem', color: 'var(--g400)', marginTop: '2px' }}>All taxes &amp; port fees included</div></div>
            <div className="bkp-side-guarantees"><div className="bkp-side-g">✅ Free cancellation 75+ days</div><div className="bkp-side-g">💳 Low deposit option</div><div className="bkp-side-g">🔒 Secure payment</div><div className="bkp-side-g">🏆 Best price guarantee</div></div>
          </div></div>
        </div>
      </div>
      
    </>
  );
}

export default function CruiseBookingPage() {
  return <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading booking...</div>}><BookingContent /></Suspense>;
}
