'use client';
import { useState } from 'react';
import './BudgetTools.css';

const TRIP_BASES = {
  paris: 300, bali: 400, tokyo: 500, cancun: 180, dubai: 420,
};
const MULTIPLIERS = { budget: 0.6, mid: 1, luxury: 2.5 };

const CURRENCIES = [
  { value: '0.925|€|EUR', label: '🇪🇺 Euro (EUR)' },
  { value: '0.79|£|GBP', label: '🇬🇧 British Pound' },
  { value: '149.5|¥|JPY', label: '🇯🇵 Japanese Yen' },
  { value: '1.54|A$|AUD', label: '🇦🇺 Aussie Dollar' },
  { value: '17.1|$|MXN', label: '🇲🇽 Mexican Peso' },
  { value: '83.1|₹|INR', label: '🇮🇳 Indian Rupee' },
  { value: '35.2|฿|THB', label: '🇹🇭 Thai Baht' },
];

export default function BudgetTools() {
  /* Trip estimator state */
  const [tcDest, setTcDest] = useState('paris');
  const [tcDays, setTcDays] = useState('7');
  const [tcStyle, setTcStyle] = useState('mid');
  const [tcPax, setTcPax] = useState('2');
  const [tcResult, setTcResult] = useState('$2,100 – $2,800');

  /* Currency converter state */
  const [ccAmt, setCcAmt] = useState('500');
  const [ccCur, setCcCur] = useState('0.925|€|EUR');
  const [ccResult, setCcResult] = useState('€462.50');

  function calcTrip() {
    const daily = TRIP_BASES[tcDest] * MULTIPLIERS[tcStyle];
    const d = parseInt(tcDays);
    const p = parseInt(tcPax);
    const lo = Math.round(daily * d * p * 0.85 / 100) * 100;
    const hi = Math.round(daily * d * p * 1.15 / 100) * 100;
    setTcResult(`$${lo.toLocaleString()} – $${hi.toLocaleString()}`);
  }

  function calcCurrency() {
    const amt = parseFloat(ccAmt) || 0;
    const [rate, sym] = ccCur.split('|');
    const res = (amt * parseFloat(rate)).toLocaleString(undefined, {
      maximumFractionDigits: parseFloat(rate) < 2 ? 2 : 0,
    });
    setCcResult(`${sym}${res}`);
  }

  return (
    <section className="section tools-bg" aria-labelledby="tools-heading">
      <div className="section-inner">
        <div className="section-header fade-up" style={{ color: 'white' }}>
          <div className="section-label" style={{ background: 'rgba(255,255,255,.15)', color: 'white' }}>Free Tools</div>
          <h2 id="tools-heading" style={{ color: 'white' }}>Plan Your Trip Budget</h2>
          <p style={{ color: 'rgba(255,255,255,.75)' }}>Estimate trip costs and convert currencies before you book.</p>
        </div>

        <div className="tools-grid fade-up">
          {/* Trip Cost Estimator */}
          <div className="tool-card">
            <h3>💰 Trip Cost Estimator</h3>
            <div className="tool-row">
              <div className="form-group">
                <label htmlFor="tc-dest">Destination</label>
                <select id="tc-dest" value={tcDest} onChange={e => setTcDest(e.target.value)}>
                  <option value="paris">Paris, France</option>
                  <option value="bali">Bali, Indonesia</option>
                  <option value="tokyo">Tokyo, Japan</option>
                  <option value="cancun">Cancún, Mexico</option>
                  <option value="dubai">Dubai, UAE</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tc-days">Duration</label>
                <select id="tc-days" value={tcDays} onChange={e => setTcDays(e.target.value)}>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                  <option value="14">14 Days</option>
                </select>
              </div>
            </div>
            <div className="tool-row">
              <div className="form-group">
                <label htmlFor="tc-style">Travel Style</label>
                <select id="tc-style" value={tcStyle} onChange={e => setTcStyle(e.target.value)}>
                  <option value="budget">Budget</option>
                  <option value="mid">Mid-Range</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tc-pax">Travelers</label>
                <select id="tc-pax" value={tcPax} onChange={e => setTcPax(e.target.value)}>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="4">Family (4)</option>
                </select>
              </div>
            </div>
            <div className="tool-result" aria-live="polite">
              <div className="tool-result-label">Estimated Total Cost</div>
              <div className="tool-result-val">{tcResult}</div>
            </div>
            <button className="tool-btn" onClick={calcTrip}>Calculate Budget →</button>
          </div>

          {/* Currency Converter */}
          <div className="tool-card">
            <h3>💱 Currency Converter</h3>
            <div className="tool-row">
              <div className="form-group" style={{ flex: '1.2' }}>
                <label htmlFor="cc-amt">Amount (USD $)</label>
                <input
                  id="cc-amt"
                  type="number"
                  value={ccAmt}
                  min="1"
                  onChange={e => setCcAmt(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ flex: '1.4' }}>
                <label htmlFor="cc-cur">Convert to</label>
                <select id="cc-cur" value={ccCur} onChange={e => setCcCur(e.target.value)}>
                  {CURRENCIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="tool-result" aria-live="polite">
              <div className="tool-result-label">Converted Amount</div>
              <div className="tool-result-val">{ccResult}</div>
            </div>
            <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.5)', marginTop: 6 }}>
              * Indicative rates. Check your bank for live rates.
            </div>
            <button className="tool-btn" onClick={calcCurrency}>Convert Now →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
