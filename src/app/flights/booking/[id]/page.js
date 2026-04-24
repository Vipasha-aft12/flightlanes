'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import '@/components/shared/booking.css';
import '@/components/shared/confirmation.css';

function BookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const price = Number(searchParams.get('price')) || 349;
  const from = searchParams.get('from') || 'JFK';
  const to = searchParams.get('to') || 'LHR';
  const airline = searchParams.get('airline') || 'British Airways';
  const flightNum = searchParams.get('flight') || 'BA178';

  const [step, setStep] = useState(1);
  const [pax, setPax] = useState({ adult: 1, child: 0, infant: 0 });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [persons, setPersons] = useState([{ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', docNum: '', docExpiry: '' }]);
  const [addons, setAddons] = useState({ baggage: false, seat: false, insurance: false, meal: false });

  const totalPax = pax.adult + pax.child + pax.infant;
  const paxLabel = [
    pax.adult > 0 ? `${pax.adult} Adult${pax.adult > 1 ? 's' : ''}` : '',
    pax.child > 0 ? `${pax.child} Child${pax.child > 1 ? 'ren' : ''}` : '',
    pax.infant > 0 ? `${pax.infant} Infant${pax.infant > 1 ? 's' : ''}` : '',
  ].filter(Boolean).join(' · ');

  function changePax(type, delta) {
    const val = pax[type] + delta;
    if (type === 'adult' && val < 1) return;
    if (type !== 'adult' && val < 0) return;
    if (type === 'infant' && val > pax.adult) return;
    const total = pax.adult + pax.child + pax.infant - pax[type] + val;
    if (total > 9) return;
    const newPax = { ...pax, [type]: val };
    setPax(newPax);
    // Rebuild persons array
    const count = newPax.adult + newPax.child + newPax.infant;
    const newPersons = Array.from({ length: count }, (_, i) => persons[i] || { firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', docNum: '', docExpiry: '' });
    setPersons(newPersons);
  }

  function updatePerson(idx, field, val) {
    const updated = [...persons];
    updated[idx] = { ...updated[idx], [field]: val };
    setPersons(updated);
  }

  async function handleConfirm() {
    const ref = 'FL-' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(ref);

    // Save to MongoDB
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: ref,
          flightId: params.id,
          from, to, airline, flightNum, price,
          passengers: persons,
          pax,
          addons,
          totalPrice: price + (addons.baggage ? 45 : 0) + (addons.seat ? 18 : 0) + (addons.insurance ? 32 : 0) + 5,
          bookedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error('Failed to save booking:', e);
    }

    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goStep(s) {
    setStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const countries = ['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany', 'France', 'UAE', 'Other'];
  const addonTotal = (addons.baggage ? 45 : 0) + (addons.seat ? 18 : 0) + (addons.insurance ? 32 : 0);
  const grandTotal = price + addonTotal + 5;

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>

        {/* Top bar */}
        <div className="bkp-topbar">
          <div className="bkp-topbar-inner">
            <Link href="/flights/results" className="bkp-back-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              Back to Results
            </Link>
            <div className="bkp-secure-badge">🔒 256-bit SSL · Secure checkout</div>
          </div>
        </div>

        {/* Header with steps */}
        <div className="bkp-header">
          <div className="bkp-header-inner">
            <div className="bkp-brand">✈ Fareoworld — Secure Booking</div>
            <div className="bkp-stepbar">
              {[1, 2, 3, 4].map((s, i) => (
                <div key={s} style={{ display: 'contents' }}>
                  <div className={`bkp-step ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
                    <div className="bkp-step-dot">{step > s ? '✓' : s}</div>
                    <div className="bkp-step-lbl">{['Flight Details', 'Traveler Info', 'Payment', 'Confirmed'][i]}</div>
                  </div>
                  {s < 4 && <div className={`bkp-step-line ${step > s ? 'done' : ''}`}></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bkp-body">
          <div>

            {/* STEP 1: Flight Details */}
            {step === 1 && (
              <div className="bkp-card">
                <div className="bkp-card-head">
                  <h2><span className="bkp-step-num">1</span>Flight Details</h2>
                  <p>Review your selected flight before continuing.</p>
                </div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Trip Summary</div>
                  <div className="bkp-trip-box">
                    <div className="bkp-trip-route">
                      <span>✈</span>
                      <span>{from} → {to}</span>
                      <span className="bkp-trip-route-badge">Flight</span>
                    </div>
                    <div className="bkp-trip-meta">
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Flight</div><div className="bkp-trip-meta-val">{airline} · {flightNum}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Travelers</div><div className="bkp-trip-meta-val">{paxLabel || '1 Adult'}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Price per person</div><div className="bkp-trip-meta-val" style={{ color: 'var(--teal)', fontSize: '1.05rem' }}>${price}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Cabin</div><div className="bkp-trip-meta-val">Economy</div></div>
                    </div>
                  </div>

                  <div className="bkp-sec">Passengers</div>
                  <div className="bkp-pax-selector">
                    {[
                      { key: 'adult', icon: '👤', label: 'Adults', sub: 'Age 12 and above' },
                      { key: 'child', icon: '🧒', label: 'Children', sub: 'Age 2 – 11 · Child fare applies' },
                      { key: 'infant', icon: '👶', label: 'Infants', sub: 'Under 2 · Must sit on adult\'s lap' },
                    ].map((row) => (
                      <div className="bkp-pax-row" key={row.key}>
                        <div className="bkp-pax-info">
                          <div className="bkp-pax-type">{row.icon} {row.label}</div>
                          <div className="bkp-pax-age">{row.sub}</div>
                        </div>
                        <div className="bkp-pax-counter">
                          <button className="bkp-pax-minus" onClick={() => changePax(row.key, -1)} disabled={pax[row.key] <= (row.key === 'adult' ? 1 : 0)}>−</button>
                          <span className="bkp-pax-count">{pax[row.key]}</span>
                          <button className="bkp-pax-plus" onClick={() => changePax(row.key, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bkp-sec">What&apos;s Included</div>
                  <div className="bkp-includes">
                    {['✅ Instant e-ticket', '✅ Free cancel within 24h', '✅ Price match guarantee', '✅ 24/7 customer support', '✅ Carry-on bag included', '✅ Seat selection available'].map((item) => (
                      <div className="bkp-include-item" key={item}>{item}</div>
                    ))}
                  </div>

                  <div className="bkp-sec">Fare Conditions</div>
                  <div className="bkp-conditions">
                    ⚠ Name changes not permitted after booking · Date changes allowed with fee · Non-refundable after 24h · Baggage policy varies by airline · Online check-in opens 24h before departure
                  </div>

                  <div className="bkp-actions">
                    <Link href="/flights/results" className="bkp-btn-back">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                      Change Flight
                    </Link>
                    <button className="bkp-btn-next" onClick={() => goStep(2)}>
                      Continue to Traveler Details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Traveler Info */}
            {step === 2 && (
              <div className="bkp-card">
                <div className="bkp-card-head">
                  <h2><span className="bkp-step-num">2</span>Traveler Information</h2>
                  <p>Enter details exactly as they appear on your passport or travel document.</p>
                </div>
                <div className="bkp-card-body">
                  {persons.map((person, idx) => {
                    const isAdult = idx < pax.adult;
                    const isChild = idx >= pax.adult && idx < pax.adult + pax.child;
                    const typeLabel = isAdult ? `👤 Adult ${pax.adult > 1 ? idx + 1 : ''}` : isChild ? `🧒 Child ${pax.child > 1 ? idx - pax.adult + 1 : ''}` : `👶 Infant ${pax.infant > 1 ? idx - pax.adult - pax.child + 1 : ''}`;

                    return (
                      <div className="bkp-person-block" key={idx}>
                        <div className="bkp-person-header">
                          <div className="bkp-person-badge">{typeLabel} {idx === 0 && <span className="bkp-person-primary">Primary</span>}</div>
                        </div>
                        <div className="bkp-person-body">
                          <div className="bkp-sec" style={{ marginTop: 0 }}>Personal Details</div>
                          <div className="bkp-row">
                            <div className="bkp-field"><label>First Name *</label><input className="bkp-input" type="text" placeholder="e.g. Jane" value={person.firstName} onChange={(e) => updatePerson(idx, 'firstName', e.target.value)} /></div>
                            <div className="bkp-field"><label>Last Name *</label><input className="bkp-input" type="text" placeholder="e.g. Smith" value={person.lastName} onChange={(e) => updatePerson(idx, 'lastName', e.target.value)} /></div>
                          </div>
                          {idx === 0 && (
                            <>
                              <div className="bkp-field"><label>Email Address *</label><input className="bkp-input" type="email" placeholder="jane@example.com" value={person.email} onChange={(e) => updatePerson(idx, 'email', e.target.value)} /></div>
                              <div className="bkp-field"><label>Phone Number *</label><input className="bkp-input" type="tel" placeholder="+1 (555) 000-0000" value={person.phone} onChange={(e) => updatePerson(idx, 'phone', e.target.value)} /></div>
                            </>
                          )}
                          <div className="bkp-row">
                            <div className="bkp-field"><label>Date of Birth *</label><input className="bkp-input" type="date" value={person.dob} onChange={(e) => updatePerson(idx, 'dob', e.target.value)} /></div>
                            <div className="bkp-field"><label>Nationality *</label>
                              <select className="bkp-input select-input" value={person.nationality} onChange={(e) => updatePerson(idx, 'nationality', e.target.value)}>
                                <option value="">Select country</option>
                                {countries.map((c) => <option key={c}>{c}</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="bkp-sec">Passport / Travel Document</div>
                          <div className="bkp-row">
                            <div className="bkp-field"><label>Document Number *</label><input className="bkp-input" type="text" placeholder="e.g. AB1234567" value={person.docNum} onChange={(e) => updatePerson(idx, 'docNum', e.target.value)} /></div>
                            <div className="bkp-field"><label>Expiry Date *</label><input className="bkp-input" type="date" value={person.docExpiry} onChange={(e) => updatePerson(idx, 'docExpiry', e.target.value)} /></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="bkp-sec">Add-ons &amp; Extras</div>
                  <div className="bkp-addons">
                    {[
                      { key: 'baggage', icon: '🧳', name: 'Extra Baggage', price: '+$45 per person' },
                      { key: 'seat', icon: '💺', name: 'Seat Selection', price: '+$18 per person' },
                      { key: 'insurance', icon: '🛡', name: 'Travel Insurance', price: '+$32 per person' },
                      { key: 'meal', icon: '🍽', name: 'Meal Preference', price: 'Special meal request' },
                    ].map((addon) => (
                      <div className="bkp-addon" key={addon.key}>
                        <label>
                          <input type="checkbox" checked={addons[addon.key]} onChange={(e) => setAddons({ ...addons, [addon.key]: e.target.checked })} />
                          <div className="bkp-addon-txt">
                            <div className="bkp-addon-name">{addon.icon} {addon.name}</div>
                            <div className="bkp-addon-price">{addon.price}</div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="bkp-actions">
                    <button className="bkp-btn-back" onClick={() => goStep(1)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                      Back
                    </button>
                    <button className="bkp-btn-next" onClick={() => goStep(3)}>
                      Continue to Payment
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="bkp-card">
                <div className="bkp-card-head">
                  <h2><span className="bkp-step-num">3</span>Confirm &amp; Pay</h2>
                  <p>Review your order summary and confirm your booking.</p>
                </div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Order Summary</div>
                  <div className="bkp-pay-summary-box">
                    <div className="bkp-pay-sum-row">
                      <span className="bkp-pay-sum-icon">✈</span>
                      <div className="bkp-pay-sum-info">
                        <div className="bkp-pay-sum-name">{from} → {to}</div>
                        <div className="bkp-pay-sum-meta">{paxLabel || '1 Adult'} · Economy</div>
                      </div>
                      <div className="bkp-pay-sum-price">${grandTotal}</div>
                    </div>
                  </div>

                  <div className="bkp-lock-note" style={{ marginTop: '16px' }}>
                    🔒 Your payment is secured with 256-bit SSL encryption. We partner with trusted payment processors — your financial data is never stored on our servers.
                  </div>

                  <div className="bkp-pay-methods-row">
                    <span style={{ fontSize: '.72rem', color: 'var(--g400)', fontWeight: 600 }}>Secure payment via:</span>
                    {['VISA', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((m) => (
                      <span className="bkp-card-badge" key={m}>{m}</span>
                    ))}
                  </div>

                  <div className="bkp-sec" style={{ marginTop: '20px' }}>Terms &amp; Conditions</div>
                  <div className="bkp-terms-box">
                    <label className="bkp-terms-label">
                      <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                      <span>I have read and agree to the <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Terms &amp; Conditions</a>, <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Privacy Policy</a>, and <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Cancellation Policy</a>. I confirm that all traveler details are correct.</span>
                    </label>
                  </div>

                  <div className="bkp-actions" style={{ marginTop: '20px' }}>
                    <button className="bkp-btn-back" onClick={() => goStep(2)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                      Back
                    </button>
                    <button
                      className="bkp-btn-confirm"
                      disabled={!termsAccepted}
                      onClick={handleConfirm}
                      style={{ opacity: termsAccepted ? 1 : 0.5, cursor: termsAccepted ? 'pointer' : 'not-allowed' }}
                    >
                      🔒 Pay Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmed */}
            {step === 4 && (
              <div className="bkp-card">
                <div className="bkp-card-body" style={{ padding: '28px' }}>
                  <div style={{ borderBottom: '1px solid #eaecef', paddingBottom: '20px', marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px rgba(16,185,129,.2)' }}></span>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669', margin: 0 }}>Booking Confirmed!</h2>
                    </div>
                    <p style={{ fontSize: '.82rem', color: 'var(--g400)', margin: 0, paddingLeft: '20px' }}>A confirmation email has been sent to your inbox.</p>
                  </div>

                  <div className="conf-ref-strip">
                    <div className="conf-ref-left">
                      <div className="conf-ref-lbl">Booking Reference</div>
                      <div className="conf-ref-code">{bookingRef}</div>
                      <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.5)', marginTop: '4px' }}>📧 Confirmation sent to your email</div>
                    </div>
                    <div className="conf-ref-right">
                      <div className="conf-ref-lbl">Booking Date</div>
                      <div className="conf-ref-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      <div className="conf-paid-badge">✅ Payment Successful</div>
                    </div>
                  </div>

                  <div className="conf-sec-hd">Booking Details</div>
                  <div className="conf-snapshot">
                    <div className="conf-snap-body">
                      <div className="conf-snap-name">✈ {from} → {to} <span className="conf-snap-badge">Flight</span></div>
                      <div className="conf-snap-sub">{airline} · {flightNum}</div>
                      <div className="conf-details-grid">
                        <div className="conf-detail-row"><div className="conf-detail-lbl">Travelers</div><div className="conf-detail-val">{paxLabel || '1 Adult'}</div></div>
                        <div className="conf-detail-row"><div className="conf-detail-lbl">Total Paid</div><div className="conf-detail-val" style={{ color: 'var(--teal)' }}>${grandTotal}</div></div>
                        <div className="conf-detail-row"><div className="conf-detail-lbl">Cabin</div><div className="conf-detail-val">Economy</div></div>
                        <div className="conf-detail-row"><div className="conf-detail-lbl">Status</div><div className="conf-detail-val" style={{ color: '#059669' }}>Confirmed</div></div>
                      </div>
                    </div>
                  </div>

                  <div className="conf-sec-hd">Travelers</div>
                  <div className="conf-panel" style={{ marginBottom: '18px' }}>
                    {persons.map((p, i) => (
                      <div className="conf-guest-row" key={i}>
                        <div className="conf-guest-av">{(p.firstName?.[0] || 'P') + (p.lastName?.[0] || (i + 1))}</div>
                        <div>
                          <div className="conf-guest-name">{p.firstName || 'Passenger'} {p.lastName || i + 1} {i === 0 && <span className="conf-guest-badge">Primary</span>}</div>
                          <div className="conf-guest-sub">{p.nationality || 'Not specified'}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="conf-sec-hd">What&apos;s Included</div>
                  <div className="conf-incl-grid">
                    {['✅ Instant e-ticket', '✅ Free cancel within 24h', '✅ Price match guarantee', '✅ 24/7 support'].map((item) => (
                      <div className="conf-incl-item" key={item}>{item}</div>
                    ))}
                  </div>

                  <div className="conf-next-box">
                    <div className="conf-next-hd">📋 What Happens Next</div>
                    <div className="conf-next-item">✅ E-ticket will be emailed within 15 minutes</div>
                    <div className="conf-next-item">✅ Online check-in opens 24 hours before departure</div>
                    <div className="conf-next-item">✅ Arrive at airport at least 2 hours before departure</div>
                  </div>

                  <div className="conf-actions">
                    <button className="conf-btn-dl" onClick={() => alert('Downloading ticket...')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download Ticket
                    </button>
                    <Link href="/flights/results" className="conf-btn-search" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Search Again</Link>
                    <Link href="/" className="conf-btn-home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>🏠 Home</Link>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bkp-sidebar">
            <div className="bkp-side-card">
              <div className="bkp-side-head">
                <div className="bkp-side-head-lbl">Your Trip</div>
                <div className="bkp-side-trip">{from} → {to}</div>
              </div>
              <div className="bkp-side-body">
                <div className="bkp-side-row"><span>Travelers</span><b>{paxLabel || '1 Adult'} · Economy</b></div>
                <div className="bkp-side-row"><span>Base fare</span><b>${price}</b></div>
                <div className="bkp-side-row"><span>Taxes &amp; fees</span><b>Included</b></div>
                <div className="bkp-side-row"><span>Service fee</span><b>$5</b></div>
                {addonTotal > 0 && <div className="bkp-side-row"><span>Add-ons</span><b>${addonTotal}</b></div>}
              </div>
              <div className="bkp-side-total">
                <div className="bkp-side-total-lbl">Total per person</div>
                <div className="bkp-side-total-amt">${grandTotal}</div>
                <div style={{ fontSize: '.7rem', color: 'var(--g400)', marginTop: '2px' }}>All taxes &amp; fees included</div>
              </div>
              <div className="bkp-side-guarantees">
                <div className="bkp-side-g">✅ Free cancellation within 24h</div>
                <div className="bkp-side-g">💳 No hidden charges</div>
                <div className="bkp-side-g">🔒 Secure payment gateway</div>
                <div className="bkp-side-g">🏆 Best price guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
