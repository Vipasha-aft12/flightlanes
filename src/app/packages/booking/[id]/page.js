'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';

function BookingContent() {
  const params = useParams();
  const sp = useSearchParams();
  const price = Number(sp.get('price')) || 1299;
  const name = sp.get('name') || 'Bali Bliss — Luxury Villa Package';
  const dest = sp.get('dest') || 'bali';
  const nights = Number(sp.get('nights')) || 10;
  const airline = sp.get('airline') || 'Singapore Airlines';

  const [step, setStep] = useState(1);
  const [terms, setTerms] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [travelers, setTravelers] = useState([{ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNum: '', passportExpiry: '' }]);
  const [addons, setAddons] = useState({ insurance: false, excursion: false, upgrade: false, lounge: false });
  const countries = ['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany', 'France', 'UAE', 'Other'];

  const addonTotal = (addons.insurance ? 45 : 0) + (addons.excursion ? 89 : 0) + (addons.upgrade ? 199 : 0) + (addons.lounge ? 35 : 0);
  const perPerson = price + addonTotal;
  const grandTotal = perPerson * travelers.length + 29;

  function updateTraveler(i, f, v) { const u = [...travelers]; u[i] = { ...u[i], [f]: v }; setTravelers(u); }
  function addTraveler() { if (travelers.length < 6) setTravelers([...travelers, { firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNum: '', passportExpiry: '' }]); }
  function removeTraveler(i) { if (travelers.length > 1) setTravelers(travelers.filter((_, j) => j !== i)); }
  function goStep(s) { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  async function handleConfirm() {
    const r = 'PKG-' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(r);
    try { await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingRef: r, packageId: params.id, name, dest, nights, airline, travelers, addons, totalPrice: grandTotal, bookedAt: new Date().toISOString() }) }); } catch {}
    setStep(4); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      
      <div style={{ paddingTop: '68px' }}>
        <div className="bkp-topbar"><div className="bkp-topbar-inner"><Link href="/packages/results" className="bkp-back-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> Back to Results</Link><div className="bkp-secure-badge">🔒 256-bit SSL · Secure checkout</div></div></div>

        <div className="bkp-header"><div className="bkp-header-inner">
          <div className="bkp-brand">🎁 Flightlanes — Secure Package Booking</div>
          <div className="bkp-stepbar">{[1,2,3,4].map((s,i)=>(<div key={s} style={{display:'contents'}}><div className={`bkp-step ${step===s?'active':''} ${step>s?'done':''}`}><div className="bkp-step-dot">{step>s?'✓':s}</div><div className="bkp-step-lbl">{['Package Details','Traveler Info','Payment','Confirmed'][i]}</div></div>{s<4&&<div className={`bkp-step-line ${step>s?'done':''}`}></div>}</div>))}</div>
        </div></div>

        <div className="bkp-body">
          <div>
            {step === 1 && (
              <div className="bkp-card"><div className="bkp-card-head"><h2><span className="bkp-step-num">1</span>Package Details</h2><p>Review your selected vacation package.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Package Summary</div>
                  <div className="bkp-trip-box"><div className="bkp-trip-route"><span>🎁</span><span>{name}</span><span className="bkp-trip-route-badge">Package</span></div>
                    <div className="bkp-trip-meta">
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Destination</div><div className="bkp-trip-meta-val">{dest.charAt(0).toUpperCase()+dest.slice(1)}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Duration</div><div className="bkp-trip-meta-val">{nights} nights</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Price per person</div><div className="bkp-trip-meta-val" style={{color:'var(--teal)',fontSize:'1.05rem'}}>${price}</div></div>
                      <div className="bkp-trip-meta-item"><div className="bkp-trip-meta-label">Airline</div><div className="bkp-trip-meta-val">{airline}</div></div>
                    </div></div>
                  <div className="bkp-sec">What&apos;s Included</div>
                  <div className="bkp-includes">{['✈ Round-trip flights','🏨 Hotel accommodation','🚗 Airport transfers','🍳 Daily breakfast','🏄 2 Activities','🛡 Travel insurance'].map(i=><div className="bkp-include-item" key={i}>{i}</div>)}</div>
                  <div className="bkp-actions"><Link href="/packages/results" className="bkp-btn-back"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> Change Package</Link><button className="bkp-btn-next" onClick={()=>goStep(2)}>Continue to Traveler Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg></button></div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bkp-card"><div className="bkp-card-head"><h2><span className="bkp-step-num">2</span>Traveler Information</h2><p>Enter details as they appear on your passport.</p></div>
                <div className="bkp-card-body">
                  {travelers.map((t,idx)=>(
                    <div className="bkp-person-block" key={idx}>
                      <div className="bkp-person-header"><div className="bkp-person-badge">👤 Traveler {idx+1} {idx===0&&<span className="bkp-person-primary">Primary</span>}</div>{idx>0&&<button style={{background:'none',border:'none',color:'var(--g400)',cursor:'pointer',fontSize:'.82rem',fontWeight:700}} onClick={()=>removeTraveler(idx)}>✕ Remove</button>}</div>
                      <div className="bkp-person-body">
                        <div className="bkp-sec" style={{marginTop:0}}>Personal Details</div>
                        <div className="bkp-row"><div className="bkp-field"><label>First Name *</label><input className="bkp-input" placeholder="e.g. Jane" value={t.firstName} onChange={e=>updateTraveler(idx,'firstName',e.target.value)}/></div><div className="bkp-field"><label>Last Name *</label><input className="bkp-input" placeholder="e.g. Smith" value={t.lastName} onChange={e=>updateTraveler(idx,'lastName',e.target.value)}/></div></div>
                        {idx===0&&<><div className="bkp-field"><label>Email *</label><input className="bkp-input" type="email" placeholder="jane@example.com" value={t.email} onChange={e=>updateTraveler(idx,'email',e.target.value)}/></div><div className="bkp-field"><label>Phone *</label><input className="bkp-input" type="tel" placeholder="+1 (555) 000-0000" value={t.phone} onChange={e=>updateTraveler(idx,'phone',e.target.value)}/></div></>}
                        <div className="bkp-row"><div className="bkp-field"><label>Date of Birth *</label><input className="bkp-input" type="date" value={t.dob} onChange={e=>updateTraveler(idx,'dob',e.target.value)}/></div><div className="bkp-field"><label>Nationality *</label><select className="bkp-input select-input" value={t.nationality} onChange={e=>updateTraveler(idx,'nationality',e.target.value)}><option value="">Select</option>{countries.map(c=><option key={c}>{c}</option>)}</select></div></div>
                        <div className="bkp-sec">Passport</div>
                        <div className="bkp-row"><div className="bkp-field"><label>Passport Number *</label><input className="bkp-input" placeholder="AB1234567" value={t.passportNum} onChange={e=>updateTraveler(idx,'passportNum',e.target.value)}/></div><div className="bkp-field"><label>Expiry Date *</label><input className="bkp-input" type="date" value={t.passportExpiry} onChange={e=>updateTraveler(idx,'passportExpiry',e.target.value)}/></div></div>
                      </div>
                    </div>
                  ))}
                  <button className="bkp-add-person-btn" onClick={addTraveler}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg> + Add Another Traveler</button>
                  <div className="bkp-sec">Add-ons &amp; Extras</div>
                  <div className="bkp-addons">
                    {[{k:'insurance',i:'🛡',n:'Premium Travel Insurance',p:'+$45/pp'},{k:'excursion',i:'🏖',n:'Excursion Bundle (3 tours)',p:'+$89/pp'},{k:'upgrade',i:'✈',n:'Business Class Flight Upgrade',p:'+$199/pp'},{k:'lounge',i:'🍷',n:'Airport Lounge Access',p:'+$35/pp'}].map(a=>(
                      <div className="bkp-addon" key={a.k}><label><input type="checkbox" checked={addons[a.k]} onChange={e=>setAddons({...addons,[a.k]:e.target.checked})}/><div className="bkp-addon-txt"><div className="bkp-addon-name">{a.i} {a.n}</div><div className="bkp-addon-price">{a.p}</div></div></label></div>
                    ))}
                  </div>
                  <div className="bkp-actions"><button className="bkp-btn-back" onClick={()=>goStep(1)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> Back</button><button className="bkp-btn-next" onClick={()=>goStep(3)}>Continue to Payment <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg></button></div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bkp-card"><div className="bkp-card-head"><h2><span className="bkp-step-num">3</span>Confirm &amp; Pay</h2><p>Review and confirm your package booking.</p></div>
                <div className="bkp-card-body">
                  <div className="bkp-sec">Order Summary</div>
                  <div className="bkp-pay-summary-box"><div className="bkp-pay-sum-row"><span className="bkp-pay-sum-icon">🎁</span><div className="bkp-pay-sum-info"><div className="bkp-pay-sum-name">{name}</div><div className="bkp-pay-sum-meta">{airline} · {nights} nights · {travelers.length} traveler{travelers.length>1?'s':''}</div></div><div className="bkp-pay-sum-price">${grandTotal}</div></div></div>
                  <div className="bkp-lock-note" style={{marginTop:'16px'}}>🔒 Your payment is secured with 256-bit SSL encryption.</div>
                  <div className="bkp-pay-methods-row"><span style={{fontSize:'.72rem',color:'var(--g400)',fontWeight:600}}>Secure payment via:</span>{['VISA','Mastercard','Amex','PayPal','Apple Pay'].map(m=><span className="bkp-card-badge" key={m}>{m}</span>)}</div>
                  <div className="bkp-sec" style={{marginTop:'20px'}}>Terms</div>
                  <div className="bkp-terms-box"><label className="bkp-terms-label"><input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)}/><span>I agree to the <a href="#" style={{color:'var(--teal)',textDecoration:'underline'}}>Terms</a>, <a href="#" style={{color:'var(--teal)',textDecoration:'underline'}}>Privacy Policy</a>, and <a href="#" style={{color:'var(--teal)',textDecoration:'underline'}}>Package Agreement</a>.</span></label></div>
                  <div className="bkp-actions" style={{marginTop:'20px'}}><button className="bkp-btn-back" onClick={()=>goStep(2)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> Back</button><button className="bkp-btn-confirm" disabled={!terms} onClick={handleConfirm} style={{opacity:terms?1:0.5,cursor:terms?'pointer':'not-allowed'}}>🔒 Pay Now — ${grandTotal}</button></div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bkp-card"><div className="bkp-card-body" style={{padding:'28px'}}>
                <div style={{borderBottom:'1px solid #eaecef',paddingBottom:'20px',marginBottom:'22px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}><span style={{width:'10px',height:'10px',borderRadius:'50%',background:'#10b981',boxShadow:'0 0 0 3px rgba(16,185,129,.2)'}}></span><h2 style={{fontSize:'1.25rem',fontWeight:900,color:'#059669',margin:0}}>Package Booking Confirmed!</h2></div>
                  <p style={{fontSize:'.82rem',color:'var(--g400)',margin:0,paddingLeft:'20px'}}>Confirmation email sent to your inbox.</p>
                </div>
                <div className="conf-ref-strip"><div className="conf-ref-left"><div className="conf-ref-lbl">Booking Reference</div><div className="conf-ref-code">{bookingRef}</div></div><div className="conf-ref-right"><div className="conf-ref-lbl">Booking Date</div><div className="conf-ref-date">{new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div><div className="conf-paid-badge">✅ Payment Successful</div></div></div>
                <div className="conf-sec-hd">Package Details</div>
                <div className="conf-snapshot"><div className="conf-snap-body"><div className="conf-snap-name">🎁 {name} <span className="conf-snap-badge">{nights}N</span></div><div className="conf-snap-sub">{airline} · {dest.charAt(0).toUpperCase()+dest.slice(1)}</div>
                  <div className="conf-details-grid">
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Travelers</div><div className="conf-detail-val">{travelers.length}</div></div>
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Total Paid</div><div className="conf-detail-val" style={{color:'var(--teal)'}}>${grandTotal}</div></div>
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Duration</div><div className="conf-detail-val">{nights} nights</div></div>
                    <div className="conf-detail-row"><div className="conf-detail-lbl">Status</div><div className="conf-detail-val" style={{color:'#059669'}}>Confirmed</div></div>
                  </div></div></div>
                <div className="conf-next-box"><div className="conf-next-hd">📋 What Happens Next</div><div className="conf-next-item">✅ E-tickets & hotel voucher emailed within 1 hour</div><div className="conf-next-item">✅ Transfer details sent 48 hours before travel</div><div className="conf-next-item">✅ Activity confirmations included in your travel pack</div></div>
                <div className="conf-actions"><button className="conf-btn-dl" onClick={()=>alert('Downloading travel documents...')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Documents</button><Link href="/packages/results" className="conf-btn-search" style={{display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>Search Again</Link><Link href="/packages" className="conf-btn-home" style={{display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>🏠 Home</Link></div>
              </div></div>
            )}
          </div>

          <div className="bkp-sidebar"><div className="bkp-side-card">
            <div className="bkp-side-head"><div className="bkp-side-head-lbl">Your Package</div><div className="bkp-side-trip">🎁 {name}</div></div>
            <div className="bkp-side-body">
              <div className="bkp-side-row"><span>Destination</span><b>{dest.charAt(0).toUpperCase()+dest.slice(1)}</b></div>
              <div className="bkp-side-row"><span>Duration</span><b>{nights} nights</b></div>
              <div className="bkp-side-row"><span>Travelers</span><b>{travelers.length}</b></div>
              <div className="bkp-side-row"><span>Base price</span><b>${price}/pp</b></div>
              {addonTotal>0&&<div className="bkp-side-row"><span>Add-ons</span><b>+${addonTotal}/pp</b></div>}
              <div className="bkp-side-row"><span>Service fee</span><b>$29</b></div>
            </div>
            <div className="bkp-side-total"><div className="bkp-side-total-lbl">Total</div><div className="bkp-side-total-amt">${grandTotal}</div><div style={{fontSize:'.7rem',color:'var(--g400)',marginTop:'2px'}}>All taxes &amp; fees included</div></div>
            <div className="bkp-side-guarantees"><div className="bkp-side-g">✅ Free cancellation 45+ days</div><div className="bkp-side-g">💳 Low deposit option</div><div className="bkp-side-g">🔒 Secure payment</div><div className="bkp-side-g">🏆 Best price guarantee</div></div>
          </div></div>
        </div>
      </div>
      
    </>
  );
}

export default function PackageBookingPage() {
  return <Suspense fallback={<div style={{padding:'100px',textAlign:'center'}}>Loading booking...</div>}><BookingContent /></Suspense>;
}
