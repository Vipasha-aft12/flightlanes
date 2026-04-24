'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/components/hotels/hotels.css';
import '@/components/shared/booking.css';
import '@/components/shared/confirmation.css';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hotelName = searchParams.get('hotel') || 'Le Grand Hôtel Paris';
  const roomType = searchParams.get('room') || 'Deluxe Double Room';
  const price = parseInt(searchParams.get('price') || '289');
  const nights = parseInt(searchParams.get('nights') || '5');
  const totalAmt = parseInt(searchParams.get('total') || '1669');
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  // New params from real API flow
  const hotelDbId = searchParams.get('hotelDbId') || '';  // MongoDB _id from save
  const roomId = searchParams.get('roomId') || '';        // e.g. "RH-1"
  const bookingToken = searchParams.get('bookingToken') || '';

  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState([{ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '' }]);
  const [addons, setAddons] = useState({ earlyCheckin: false, roomUpgrade: false, breakfast: false, parking: false });
  const [payMethod, setPayMethod] = useState('card');
  const [cardNum, setCardNum] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const addonsConfig = [
    { key: 'earlyCheckin', name: '🛎 Early Check-in', price: '+$25' },
    { key: 'roomUpgrade', name: '🛏 Room Upgrade', price: '+$40/night' },
    { key: 'breakfast', name: '🍳 Breakfast Package', price: '+$18/day' },
    { key: 'parking', name: '🅿 Parking', price: '+$15/day' },
  ];

  const handleConfirm = async () => {
    setSaving(true);
    setBookingError('');

    // ── Step A: Try real API flow (pre-booking → confirm) ──
    if (hotelDbId && roomId) {
      try {
        // 1. Pre-booking — lock room + send guest details
        const preRes = await fetch('/api/hotels/pre-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: hotelDbId,
            roomId,
            bookingToken,
            bookingUser: {
              firstName: guests[0]?.firstName || 'Guest',
              lastName: guests[0]?.lastName || '',
              email: guests[0]?.email || '',
              phone: guests[0]?.phone || '',
              age: 30,
            },
            roomGuestDetail: [{
              guests: guests.map(g => ({
                first_name: g.firstName,
                last_name: g.lastName,
                age: 30,
                gender: 'male',
              })),
            }],
          }),
        });
        const preData = await preRes.json();

        if (preData.error) {
          setBookingError(preData.error);
          setSaving(false);
          return;
        }

        // 2. Confirm booking
        const bookingId = preData.bookingId || preData._id || preData.id || '';
        if (bookingId) {
          const confirmRes = await fetch('/api/hotels/confirm-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId }),
          });
          const confirmData = await confirmRes.json();
          setRefCode(confirmData.bookingRef || confirmData.refCode || bookingId);
          setSaving(false);
          setStep(4);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } catch (err) {
        console.error('Real API booking error:', err);
        // Fall through to legacy booking
      }
    }

    // ── Step B: Fallback — save to local MongoDB ──
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName, roomType, checkIn, checkOut, nights,
          guests, guestCount: guests.length,
          addons: Object.entries(addons).filter(([, v]) => v).map(([k]) => ({ name: k, price: 0 })),
          roomRate: price, taxAmount: Math.round(price * nights * 0.12),
          totalAmount: totalAmt,
          paymentMethod: payMethod, cardLast4: cardNum.slice(-4),
        }),
      });
      const data = await res.json();
      setRefCode(data.refCode || 'FL-' + Math.floor(10000 + Math.random() * 90000));
    } catch {
      setRefCode('FL-' + Math.floor(10000 + Math.random() * 90000));
    }
    setSaving(false);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goStep = (s) => { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const steps = [
    { num: 1, label: 'Hotel Details' },
    { num: 2, label: 'Guest Details' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Confirmed' },
  ];

  return (
    <div className="bkp-page-bg">
      {/* Top Bar */}
      <div className="bg-white border-bottom hd-breadcrumb-bar">
        <div className="container-xl d-flex align-items-center justify-content-between py-2 px-3">
          <Link href="/hotels/listing" className="d-inline-flex align-items-center gap-2 small fw-bold rounded-2 px-3 py-2 bkp-back-link">
            ← Back to Hotels
          </Link>
          <div className="small text-secondary fw-semibold d-flex align-items-center gap-2">🔒 256-bit SSL Encrypted</div>
        </div>
      </div>

      {/* Step Header */}
      <div className="bkp-header py-4">
        <div className="container-xl px-3">
          <div className="small fw-bold text-uppercase mb-3 bkp-brand-label">
            🏨 Secure Hotel Booking
          </div>
          <div className="d-flex align-items-center">
            {steps.map((s, i) => (
              <div key={s.num} className={`d-flex align-items-center ${i < 3 ? 'bkp-step-flex-grow' : 'bkp-step-flex-none'}`}>
                <div className={`bkp-step d-flex flex-column align-items-center gap-1 ${step === s.num ? 'active' : ''} ${step > s.num ? 'done' : ''} position-relative`}>
                  <div className="bkp-step-dot">{step > s.num ? '✓' : s.num}</div>
                  <div className={`bkp-step-label ${step === s.num ? 'active' : ''} ${step > s.num ? 'done' : ''}`}>{s.label}</div>
                </div>
                {i < 3 && <div className={`bkp-step-line ${step > s.num ? 'done' : ''}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-xl py-4 px-3">
        <div className="row g-4">
          {/* Main Column */}
          <div className="col-lg-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="bkp-card">
                <div className="p-4 border-bottom bkp-card-head">
                  <h5 className="fw-bold d-flex align-items-center gap-2 mb-1"><span className="d-flex align-items-center justify-content-center text-white fw-bold rounded-circle bkp-step-num">1</span>Review Your Stay</h5>
                  <p className="small text-secondary mb-0 ps-5">Confirm your selected hotel and room before proceeding.</p>
                </div>
                <div className="p-4">
                  <div className="small fw-bold text-uppercase mb-2 bkp-sec-label">Trip Summary</div>
                  <div className="bkp-trip-box mb-3">
                    <div className="fw-bold mb-3 d-flex align-items-center gap-2 bkp-trip-name">
                      🏨 {hotelName}
                      <span className="px-2 py-1 rounded-pill small fw-bold bkp-trip-route-badge">Hotel</span>
                    </div>
                    <div className="row g-2">
                      {[
                        { label: 'Room', val: roomType },
                        { label: 'Guests', val: '2 Guests' },
                        { label: 'Price per night', val: `$${price}`, accent: true },
                        { label: 'Duration', val: `${nights} nights` },
                      ].map((m, i) => (
                        <div key={i} className="col-6">
                          <div className="small fw-bold text-secondary text-uppercase bkp-meta-label">{m.label}</div>
                          <div className={`small fw-bold ${m.accent ? 'bkp-meta-val-teal' : ''}`}>{m.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="small fw-bold text-uppercase mb-2 bkp-sec-label">What's Included</div>
                  <div className="row g-2 mb-3">
                    {['✅ Free cancellation', '✅ No prepayment today', '✅ Best rate guarantee', '✅ Instant confirmation', '✅ 24/7 guest support', '✅ Loyalty points earned'].map((t, i) => (
                      <div key={i} className="col-6"><div className="bkp-include-item">{t}</div></div>
                    ))}
                  </div>

                  <div className="p-3 rounded-3 small mb-3 bkp-conditions">
                    ⚠ Free cancellation up to 48h before arrival · Pets on request · No smoking · Check-in from 15:00
                  </div>

                  <div className="d-flex gap-2 pt-4 border-top">
                    <Link href="/hotels/listing" className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-bold">← Change Hotel</Link>
                    <button className="bkp-btn-next flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-3" onClick={() => goStep(2)}>
                      Continue to Guest Details →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="bkp-card">
                <div className="p-4 border-bottom bkp-card-head">
                  <h5 className="fw-bold d-flex align-items-center gap-2 mb-1"><span className="d-flex align-items-center justify-content-center text-white fw-bold rounded-circle bkp-step-num">2</span>Guest Information</h5>
                </div>
                <div className="p-4">
                  {guests.map((g, gi) => (
                    <div key={gi} className="border rounded-3 overflow-hidden mb-3">
                      <div className="p-3 d-flex justify-content-between align-items-center bkp-person-header">
                        <span className="fw-bold small">👤 Guest {gi + 1} {gi === 0 && <span className="px-2 py-0 rounded-pill small fw-bold ms-1 bkp-person-primary">Primary</span>}</span>
                        {gi > 0 && <button className="btn btn-sm btn-outline-danger small px-2 py-1" onClick={() => setGuests(guests.filter((_, i) => i !== gi))}>✕ Remove</button>}
                      </div>
                      <div className="p-3">
                        <div className="row g-3">
                          <div className="col-md-6"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">First Name *</label><input className="bkp-input" placeholder="Jane" value={g.firstName} onChange={e => { const u = [...guests]; u[gi].firstName = e.target.value; setGuests(u); }} /></div>
                          <div className="col-md-6"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Last Name *</label><input className="bkp-input" placeholder="Smith" value={g.lastName} onChange={e => { const u = [...guests]; u[gi].lastName = e.target.value; setGuests(u); }} /></div>
                          {gi === 0 && <>
                            <div className="col-12"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Email *</label><input className="bkp-input" type="email" placeholder="jane@example.com" value={g.email} onChange={e => { const u = [...guests]; u[gi].email = e.target.value; setGuests(u); }} /></div>
                            <div className="col-12"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Phone *</label><input className="bkp-input" type="tel" placeholder="+1 (555) 000-0000" value={g.phone} onChange={e => { const u = [...guests]; u[gi].phone = e.target.value; setGuests(u); }} /></div>
                          </>}
                          <div className="col-md-6"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Date of Birth</label><input className="bkp-input" type="date" value={g.dob} onChange={e => { const u = [...guests]; u[gi].dob = e.target.value; setGuests(u); }} /></div>
                          <div className="col-md-6"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Nationality</label>
                            <select className="bkp-input" value={g.nationality} onChange={e => { const u = [...guests]; u[gi].nationality = e.target.value; setGuests(u); }}>
                              <option value="">Select</option>{['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany', 'France'].map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-100 py-3 border-dashed rounded-3 text-center fw-bold mb-4 bkp-add-guest-btn"
                    onClick={() => setGuests([...guests, { firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '' }])}>
                    + Add Another Guest
                  </button>

                  <div className="small fw-bold text-uppercase mb-2 bkp-sec-label">Add-ons</div>
                  <div className="row g-2 mb-4">
                    {addonsConfig.map(a => (
                      <div key={a.key} className="col-md-6">
                        <label className={`bkp-addon d-flex align-items-start gap-2 ${addons[a.key] ? '' : ''}`}>
                          <input type="checkbox" checked={addons[a.key]} onChange={() => setAddons({ ...addons, [a.key]: !addons[a.key] })} className="accent-checkbox" />
                          <div><div className="small fw-bold">{a.name}</div><div className="bkp-addon-price">{a.price}</div></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex gap-2 pt-4 border-top">
                    <button className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-bold" onClick={() => goStep(1)}>← Back</button>
                    <button className="bkp-btn-next flex-grow-1 rounded-3" onClick={() => goStep(3)}>Continue to Payment →</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="bkp-card">
                <div className="p-4 border-bottom bkp-card-head">
                  <h5 className="fw-bold d-flex align-items-center gap-2 mb-1"><span className="d-flex align-items-center justify-content-center text-white fw-bold rounded-circle bkp-step-num">3</span>Payment</h5>
                </div>
                <div className="p-4">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 mb-4 bkp-pay-summary">
                    <span className="bkp-pay-icon">🏨</span>
                    <div className="flex-grow-1"><div className="fw-bold">{hotelName}</div><div className="small text-secondary">{roomType} · {guests.length} guest{guests.length > 1 ? 's' : ''}</div></div>
                    <div className="bkp-pay-price">${totalAmt}</div>
                  </div>

                  <div className="d-flex gap-2 mb-4">
                    {['💳 Credit Card', '🏦 Bank Transfer', '📱 PayPal'].map((m, i) => {
                      const key = ['card', 'bank', 'paypal'][i];
                      return <button key={key} className={`flex-grow-1 py-2 rounded-3 fw-bold small border ${payMethod === key ? 'text-white' : ''}`}
                        className={`bkp-pay-tab ${payMethod === key ? 'active' : ''}`}
                        onClick={() => setPayMethod(key)}>{m}</button>;
                    })}
                  </div>

                  <div className="d-flex align-items-center gap-2 p-3 rounded-3 mb-3 bkp-lock-note">
                    🔒 Your payment is protected by 256-bit SSL encryption
                  </div>

                  <div className="d-flex gap-2 flex-wrap mb-4">
                    {['VISA', 'MC', 'AMEX', 'DISC'].map(c => <span key={c} className="px-2 py-1 small fw-bold border rounded-1 small text-secondary">{c}</span>)}
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Card Number *</label><input className="bkp-input" placeholder="1234 5678 9012 3456" value={cardNum} onChange={e => setCardNum(e.target.value)} /></div>
                    <div className="col-12"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Cardholder Name *</label><input className="bkp-input" placeholder="Jane Smith" value={cardName} onChange={e => setCardName(e.target.value)} /></div>
                    <div className="col-6"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">Expiry *</label><input className="bkp-input" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} /></div>
                    <div className="col-6"><label className="form-label small fw-bold text-secondary text-uppercase fs-label">CVV *</label><input className="bkp-input" type="password" placeholder="•••" value={cardCvv} onChange={e => setCardCvv(e.target.value)} /></div>
                  </div>

                  <div className="p-3 rounded-3 mb-4 bkp-terms-box">
                    <label className="d-flex align-items-start gap-3 small text-secondary bkp-terms-label">
                      <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="accent-checkbox-lg" />
                      I agree to the <a href="#" className="text-teal">Terms of Service</a>, <a href="#" className="text-teal">Privacy Policy</a> and <a href="#" className="text-teal">Cancellation Policy</a>. I understand my card will be charged ${totalAmt}.
                    </label>
                  </div>

                  {bookingError && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
                      <span>⚠️</span> {bookingError}
                    </div>
                  )}

                  <div className="d-flex gap-2 pt-4 border-top">
                    <button className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-bold" onClick={() => goStep(2)}>← Back</button>
                    <button className="bkp-btn-confirm flex-grow-1 rounded-3 d-flex align-items-center justify-content-center gap-2"
                      disabled={!termsAccepted || saving}
                      
                      onClick={handleConfirm}>
                      {saving ? <span className="spinner-border spinner-border-sm" /> : '🔒'} Confirm & Pay ${totalAmt}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Confirmed */}
            {step === 4 && (
              <div className="bkp-card">
                <div className="p-4 p-md-5 text-center">
                  <div className="bkp-confirmed-circle">✅</div>
                  <h3 className="fw-bold mb-2">Booking Confirmed!</h3>
                  <p className="text-secondary mb-4">Your hotel is booked! Confirmation sent to your email.</p>

                  <div className="p-4 rounded-3 text-start mb-4 bkp-ref-box">
                    <div className="small fw-bold text-secondary text-uppercase mb-2 bkp-ref-label">Booking Reference</div>
                    <div className="bkp-ref-code">{refCode}</div>
                  </div>

                  <div className="row g-2 mb-4">
                    {['🏨 Booking confirmed', '🔑 Check-in details sent', '🏆 +200 Reward points', '📞 24/7 Hotel support'].map((p, i) => (
                      <div key={i} className="col-6">
                        <div className="d-flex align-items-center gap-2 small text-secondary fw-semibold p-2 rounded-3 bkp-perk">{p}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-3 text-start mb-4 bkp-next-box">
                    <div className="small fw-bold text-uppercase mb-2 bkp-next-title">What happens next</div>
                    {['📧 Confirmation email with full booking details sent to your inbox', '🔑 Check-in instructions will arrive 24 hours before your stay', '📱 Download the Fareoworld app for mobile check-in & room key'].map((s, i) => (
                      <div key={i} className="d-flex align-items-center gap-2 small mb-2 bkp-next-step">{s}</div>
                    ))}
                  </div>

                  <div className="d-flex gap-2 flex-wrap justify-content-center">
                    <Link href="/hotels" className="btn-fl-primary px-4 py-2">Browse More Hotels</Link>
                    <button className="btn-fl-ghost px-4 py-2" onClick={() => window.print()}>🖨 Print Confirmation</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-3 bkp-sidebar">
              <div className="bkp-side-card">
                <div className="p-3 text-white bkp-side-head">
                  <div className="small fw-bold text-uppercase mb-1 bkp-side-head-label">Your Stay</div>
                  <div className="fw-bold bkp-side-trip">{hotelName}</div>
                </div>
                <div className="p-3">
                  {[
                    { label: 'Room', value: roomType },
                    { label: 'Check-in', value: checkIn || 'TBD' },
                    { label: 'Check-out', value: checkOut || 'TBD' },
                    { label: 'Nights', value: nights },
                    { label: 'Guests', value: `${guests.length} Guest${guests.length > 1 ? 's' : ''}` },
                    { label: 'Room rate', value: `$${price}/night` },
                  ].map((r, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center small text-secondary py-1 border-bottom bkp-side-row">
                      <span>{r.label}</span><b className="text-dark">{r.value}</b>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-top bkp-side-total">
                  <div className="small fw-bold text-secondary">Total for stay</div>
                  <div className="bkp-side-total-amt">${totalAmt}</div>
                </div>
              </div>
              <div className="bkp-side-card p-3">
                {['✅ Best price guarantee', '🔒 Secure SSL booking', '🆓 Free cancellation', '🏆 Earn loyalty points'].map((g, i) => (
                  <div key={i} className="d-flex align-items-center gap-2 small text-secondary mb-2">{g}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <BookingContent />
    </Suspense>
  );
}
