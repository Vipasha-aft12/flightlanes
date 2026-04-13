'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';

function BookingContent() {
  const params = useParams();
  const sp = useSearchParams();
  const price = Number(sp.get('price')) || 24;
  const name = sp.get('name') || 'Toyota Corolla or Similar';
  const company = sp.get('company') || 'Enterprise';
  const type = sp.get('type') || 'Economy';
  const days = Number(sp.get('days')) || 4;

  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [driver, setDriver] = useState({ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', licenseNum: '', licenseExpiry: '', licenseCountry: '' });
  const [addons, setAddons] = useState({ gps: false, childSeat: false, insurance: false, additionalDriver: false });

  const addonTotal = (addons.gps ? 8 : 0) + (addons.childSeat ? 12 : 0) + (addons.insurance ? 15 : 0) + (addons.additionalDriver ? 10 : 0);
  const grandTotal = (price * days) + (addonTotal * days) + 12;

  function updateDriver(field, val) { setDriver({ ...driver, [field]: val }); }

  async function handleConfirm() {
    const ref = 'CR-' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(ref);
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingRef: ref, carId: params.id, name, company, type, price, days, driver, addons, totalPrice: grandTotal, bookedAt: new Date().toISOString() }),
      });
    } catch (e) { console.error('Failed to save booking:', e); }
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goStep(s) { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  const countries = ['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany', 'France', 'UAE', 'Other'];
  const typeEmoji = { Economy: '🚗', Compact: '🚗', SUV: '🚙', Luxury: '💎', Minivan: '🚐', Convertible: '🏎', Electric: '⚡' }[type] || '🚗';

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>

        <div className="bkp-topbar"><div className="bkp-topbar-inner">
          <Link href="/cars/results" className="bkp-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back to Results
          </Link>
          <div className="bkp-secure-badge">🔒 256-bit SSL · Secure checkout</div>
        </div></div>

        <div className="bkp-header"><div className="bkp-header-inner">
          <div className="bkp-brand">🚗 Flightlanes — Secure Car Rental Booking</div>
          <div className="bkp-stepbar">
            {[1, 2, 3, 4].map((s, i) => (
              <div key={s} style={{ display: 'contents' }}>
                <div className={`bkp-step ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
                  <div className="bkp-step-dot">{step > s ? '✓' : s}</div>
                  <div className="bkp-step-lbl">{['Car Details', 'Driver Info', 'Payment', 'Confirmed'][i]}</div>
                </div>
                {s < 4 && <div className={`bkp-step-line ${step > s ? 'done' : ''}`}></div>}
              </div>
            ))}
          </div>
        </div></div>

        <div className="bkp-body">
          <div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="bkp-card">
                <div className="bkp-card-head"><h2><span className="bkp-step-num">1</span>Car Rental Details</h2><p>Review your selected vehicle before continuing.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Rental Summary</div>
                  <div className="bkp-trip-box">
                    <div className="bkp-trip-route"><span>{typeEmoji}</span><span>{name}</span><span className="bkp-trip-route-badge">{type}</span></div>
                    <div className="bkp-trip-meta">
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Company</div><div className="bkp-trip-meta-val">{company}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Duration</div><div className="bkp-trip-meta-val">{days} days</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Price per day</div><div className="bkp-trip-meta-val" style={{ color: 'var(--teal)', fontSize: '1.05rem' }}>${price}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Location</div><div className="bkp-trip-meta-val">LAX Airport</div></div>
                    </div>
                  </div>
                  <div className="bkp-sec">What&apos;s Included</div>
                  <div className="bkp-includes">
                    {['✅ Unlimited mileage', '✅ Basic insurance', '✅ Free cancellation 48h', '✅ 24/7 roadside support', '✅ Airport pickup', '✅ A/C included'].map((item) => (
                      <div className="bkp-include-item" key={item}>{item}</div>
                    ))}
                  </div>
                  <div className="bkp-sec">Rental Conditions</div>
                  <div className="bkp-conditions">⚠ Valid driver&apos;s license required · Min age 21 · Credit card required at pickup · Full-to-full fuel policy · Under-25 surcharge may apply</div>
                  <div className="bkp-actions">
                    <Link href="/cars/results" className="bkp-btn-back"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Change Car</Link>
                    <button className="bkp-btn-next" onClick={() => goStep(2)}>Continue to Driver Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg></button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="bkp-card">
                <div className="bkp-card-head"><h2><span className="bkp-step-num">2</span>Driver Information</h2><p>Enter details exactly as they appear on your driver&apos;s license.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-person-block">
                    <div className="bkp-person-header"><div className="bkp-person-badge">🪪 Primary Driver <span className="bkp-person-primary">Required</span></div></div>
                    <div className="bkp-person-body">
                      <div className="bkp-sec" style={{ marginTop: 0 }}>Personal Details</div>
                      <div className="bkp-row">
                        <div className="bkp-field"><label>First Name *</label><input className="bkp-input" type="text" placeholder="e.g. Jane" value={driver.firstName} onChange={(e) => updateDriver('firstName', e.target.value)} /></div>
                        <div className="bkp-field"><label>Last Name *</label><input className="bkp-input" type="text" placeholder="e.g. Smith" value={driver.lastName} onChange={(e) => updateDriver('lastName', e.target.value)} /></div>
                      </div>
                      <div className="bkp-field"><label>Email Address *</label><input className="bkp-input" type="email" placeholder="jane@example.com" value={driver.email} onChange={(e) => updateDriver('email', e.target.value)} /></div>
                      <div className="bkp-field"><label>Phone Number *</label><input className="bkp-input" type="tel" placeholder="+1 (555) 000-0000" value={driver.phone} onChange={(e) => updateDriver('phone', e.target.value)} /></div>
                      <div className="bkp-row">
                        <div className="bkp-field"><label>Date of Birth *</label><input className="bkp-input" type="date" value={driver.dob} onChange={(e) => updateDriver('dob', e.target.value)} /></div>
                        <div className="bkp-field"><label>Nationality *</label><select className="bkp-input select-input" value={driver.nationality} onChange={(e) => updateDriver('nationality', e.target.value)}><option value="">Select country</option>{countries.map((c) => <option key={c}>{c}</option>)}</select></div>
                      </div>
                      <div className="bkp-sec">Driver&apos;s License</div>
                      <div className="bkp-row">
                        <div className="bkp-field"><label>License Number *</label><input className="bkp-input" type="text" placeholder="e.g. D1234567" value={driver.licenseNum} onChange={(e) => updateDriver('licenseNum', e.target.value)} /></div>
                        <div className="bkp-field"><label>Expiry Date *</label><input className="bkp-input" type="date" value={driver.licenseExpiry} onChange={(e) => updateDriver('licenseExpiry', e.target.value)} /></div>
                      </div>
                      <div className="bkp-field"><label>Issuing Country</label><select className="bkp-input select-input" value={driver.licenseCountry} onChange={(e) => updateDriver('licenseCountry', e.target.value)}><option value="">Select country</option>{countries.map((c) => <option key={c}>{c}</option>)}</select></div>
                    </div>
                  </div>
                  <div className="bkp-sec">Add-ons &amp; Extras</div>
                  <div className="bkp-addons">
                    {[
                      { key: 'gps', icon: '📍', name: 'GPS Navigation', price: '+$8/day' },
                      { key: 'childSeat', icon: '👶', name: 'Child Seat', price: '+$12/day' },
                      { key: 'insurance', icon: '🛡', name: 'Full Coverage Insurance', price: '+$15/day' },
                      { key: 'additionalDriver', icon: '👤', name: 'Additional Driver', price: '+$10/day' },
                    ].map((addon) => (
                      <div className="bkp-addon" key={addon.key}>
                        <label><input type="checkbox" checked={addons[addon.key]} onChange={(e) => setAddons({ ...addons, [addon.key]: e.target.checked })} />
                          <div className="bkp-addon-txt"><div className="bkp-addon-name">{addon.icon} {addon.name}</div><div className="bkp-addon-price">{addon.price}</div></div>
                        </label>
                      </div>
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
              <div className="bkp-card">
                <div className="bkp-card-head"><h2><span className="bkp-step-num">3</span>Confirm &amp; Pay</h2><p>Review your rental summary and confirm your booking.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Order Summary</div>
                  <div className="bkp-pay-summary-box"><div className="bkp-pay-sum-row">
                    <span className="bkp-pay-sum-icon">{typeEmoji}</span>
                    <div className="bkp-pay-sum-info"><div className="bkp-pay-sum-name">{name}</div><div className="bkp-pay-sum-meta">{company} · {days} days · LAX Airport</div></div>
                    <div className="bkp-pay-sum-price">${grandTotal}</div>
                  </div></div>
                  <div className="bkp-lock-note" style={{ marginTop: '16px' }}>🔒 Your payment is secured with 256-bit SSL encryption. Your financial data is never stored on our servers.</div>
                  <div className="bkp-pay-methods-row">
                    <span style={{ fontSize: '.72rem', color: 'var(--g400)', fontWeight: 600 }}>Secure payment via:</span>
                    {['VISA', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((m) => <span className="bkp-card-badge" key={m}>{m}</span>)}
                  </div>
                  <div className="bkp-sec" style={{ marginTop: '20px' }}>Terms &amp; Conditions</div>
                  <div className="bkp-terms-box"><label className="bkp-terms-label">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    <span>I have read and agree to the <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Terms &amp; Conditions</a>, <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Privacy Policy</a>, and <a href="#" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Rental Agreement</a>. I confirm that all driver details are correct.</span>
                  </label></div>
                  <div className="bkp-actions" style={{ marginTop: '20px' }}>
                    <button className="bkp-btn-back" onClick={() => goStep(2)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg> Back</button>
                    <button className="bkp-btn-confirm" disabled={!termsAccepted} onClick={handleConfirm} style={{ opacity: termsAccepted ? 1 : 0.5, cursor: termsAccepted ? 'pointer' : 'not-allowed' }}>🔒 Pay Now — ${grandTotal}</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="bkp-card">
                <div className="bkp-card-body" style={{ padding: '28px' }}>
                  <div style={{ borderBottom: '1px solid #eaecef', paddingBottom: '20px', marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,.2)' }}></span>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669', margin: 0 }}>Rental Confirmed!</h2>
                    </div>
                    <p style={{ fontSize: '.82rem', color: 'var(--g400)', margin: 0, paddingLeft: '20px' }}>A confirmation email has been sent to your inbox.</p>
                  </div>
                  <div className="conf-ref-strip">
                    <div className="conf-ref-left"><div className="conf-ref-lbl">Booking Reference</div><div className="conf-ref-code">{bookingRef}</div><div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.5)', marginTop: '4px' }}>📧 Confirmation sent to your email</div></div>
                    <div className="conf-ref-right"><div className="conf-ref-lbl">Booking Date</div><div className="conf-ref-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div><div className="conf-paid-badge">✅ Payment Successful</div></div>
                  </div>
                  <div className="conf-sec-hd">Rental Details</div>
                  <div className="conf-snapshot"><div className="conf-snap-body">
                    <div className="conf-snap-name">{typeEmoji} {name} <span className="conf-snap-badge">{type}</span></div>
                    <div className="conf-snap-sub">{company} · LAX Airport</div>
                    <div className="conf-details-grid">
                      <div className="conf-detail-row"><div className="conf-detail-lbl">Duration</div><div className="conf-detail-val">{days} days</div></div>
                      <div className="conf-detail-row"><div className="conf-detail-lbl">Total Paid</div><div className="conf-detail-val" style={{ color: 'var(--teal)' }}>${grandTotal}</div></div>
                      <div className="conf-detail-row"><div className="conf-detail-lbl">Driver</div><div className="conf-detail-val">{driver.firstName} {driver.lastName}</div></div>
                      <div className="conf-detail-row"><div className="conf-detail-lbl">Status</div><div className="conf-detail-val" style={{ color: '#059669' }}>Confirmed</div></div>
                    </div>
                  </div></div>
                  <div className="conf-next-box"><div className="conf-next-hd">📋 What Happens Next</div>
                    <div className="conf-next-item">✅ Rental voucher emailed within 15 minutes</div>
                    <div className="conf-next-item">✅ Present voucher + driver&apos;s license at pickup counter</div>
                    <div className="conf-next-item">✅ Credit card required for security deposit at pickup</div>
                  </div>
                  <div className="conf-actions">
                    <button className="conf-btn-dl" onClick={() => alert('Downloading voucher...')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> Download Voucher</button>
                    <Link href="/cars/results" className="conf-btn-search" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Search Again</Link>
                    <Link href="/cars" className="conf-btn-home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>🏠 Home</Link>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bkp-sidebar">
            <div className="bkp-side-card">
              <div className="bkp-side-head"><div className="bkp-side-head-lbl">Your Rental</div><div className="bkp-side-trip">{typeEmoji} {name}</div></div>
              <div className="bkp-side-body">
                <div className="bkp-side-row"><span>Company</span><b>{company}</b></div>
                <div className="bkp-side-row"><span>Duration</span><b>{days} days</b></div>
                <div className="bkp-side-row"><span>Base rate</span><b>${price}/day</b></div>
                <div className="bkp-side-row"><span>Subtotal</span><b>${price * days}</b></div>
                {addonTotal > 0 && <div className="bkp-side-row"><span>Add-ons</span><b>${addonTotal * days}</b></div>}
                <div className="bkp-side-row"><span>Service fee</span><b>$12</b></div>
              </div>
              <div className="bkp-side-total"><div className="bkp-side-total-lbl">Total</div><div className="bkp-side-total-amt">${grandTotal}</div><div style={{ fontSize: '.7rem', color: 'var(--g400)', marginTop: '2px' }}>All taxes &amp; fees included</div></div>
              <div className="bkp-side-guarantees">
                <div className="bkp-side-g">✅ Free cancellation within 48h</div>
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

export default function CarBookingPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
