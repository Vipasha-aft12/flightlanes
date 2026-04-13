'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';
import { flFmt, flHrMin, flStopBadgeClass, flStopLabel, getFlightPrice } from '@/lib/flightUtils';

function TimelineRow({ leg, small }) {
  if (!leg) return null;
  const timeClass = small ? 'fl-big-time fl-big-time-sm' : 'fl-big-time';
  const alColClass = small ? 'fl-airline-col fl-airline-col-sm' : 'fl-airline-col';
  const alLogoClass = small ? 'fl-airline-logo fl-airline-logo-sm' : 'fl-airline-logo';
  const alNameClass = small ? 'fl-airline-name fl-airline-name-sm' : 'fl-airline-name';
  const metaClass = small ? 'fl-card-meta fl-card-meta-sm' : 'fl-card-meta';
  const dPlus = (leg.daysPlus || 0) > 0 ? <sup className="fl-day-plus">+{leg.daysPlus}</sup> : null;
  const viaLine = (leg.numStops || 0) > 0 && leg.layovers?.length > 0 ? <div className="fl-via">via {leg.layovers.map(l => l?.airport || '').join(', ')}</div> : null;
  const bagTag = leg.hasBag
    ? <span className="fl-meta-tag">🧳 Bag{small ? '' : ' Included'}</span>
    : <span className="fl-meta-tag fl-meta-warn">🚫 No{small ? '' : ' Free'} Bag</span>;

  return (
    <>
      <div className={alColClass}>
        <div className={alLogoClass}>{leg.airline?.logo || '✈️'}</div>
        <div className={alNameClass}>{leg.airline?.name || 'Airline'}</div>
        <div className="fl-flight-num">{leg.flightNum || ''}</div>
        {!small && <div className="fl-cabin-badge">Economy</div>}
      </div>
      <div className="fl-timeline-col">
        <div className="fl-timeline-main">
          <div className="fl-time-block">
            <div className={timeClass}>{flFmt(leg.depH, leg.depM)}</div>
            <div className="fl-apt-code">{leg.fromCode}</div>
            <div className="fl-apt-city">{leg.fromCity}</div>
          </div>
          <div className="fl-route-line">
            <div className="fl-duration-label">{flHrMin(leg.totalMins)}</div>
            <div className="fl-line-track">
              <div className="fl-line-dot"></div>
              <div className="fl-line-seg">
                <div className="fl-line-plane">✈</div>
                {leg.numStops > 0 && Array.from({ length: Math.min(leg.numStops, 3) }).map((_, i) => (
                  <div className="fl-stop-dot" key={i} style={{ position: 'absolute', left: `${((i + 1) / (leg.numStops + 1)) * 100}%`, top: '50%', transform: 'translateY(-50%)' }}></div>
                ))}
              </div>
              <div className="fl-line-dot"></div>
            </div>
            <div className="fl-stops-info">
              <span className={`fl-stops-badge ${flStopBadgeClass(leg.numStops)}`}>{flStopLabel(leg.numStops)}</span>
            </div>
            {viaLine}
          </div>
          <div className="fl-time-block">
            <div className={timeClass}>{flFmt(leg.arrH, leg.arrM)}{dPlus}</div>
            <div className="fl-apt-code">{leg.toCode}</div>
            <div className="fl-apt-city">{leg.toCity}</div>
          </div>
        </div>
        <div className={metaClass}>
          {leg.isRefund
            ? <span className="fl-meta-tag fl-meta-green">✅ Free Cancel{small ? '' : 'lation'}</span>
            : <span className="fl-meta-tag fl-meta-warn">⚠ Non-refund{small ? '.' : 'able'}</span>}
          {bagTag}
          <span className="fl-meta-tag">{leg.aircraft}</span>
          {small && <span className="fl-meta-tag fl-meta-price-sm">${leg.price || 0}/pp</span>}
        </div>
      </div>
    </>
  );
}

function PriceColumn({ price, flight, leg, onBook, onToggle, expanded, typeBadge }) {
  const seatsLeft = leg.seatsLeft > 0 && leg.seatsLeft <= 5;
  return (
    <div className={`fl-price-col ${flight.type === 'roundtrip' ? 'fl-price-col-rt' : flight.type === 'multicity' ? 'fl-price-col-mc' : ''}`}>
      {typeBadge}
      <div className="fl-price-tag">
        <div className="fl-price-from">{flight.type === 'multicity' ? 'total all flights' : 'from'}</div>
        <div className="fl-price-main">${price}</div>
        <div className="fl-price-per">per person{flight.type === 'roundtrip' ? ' · total' : ''}</div>
      </div>
      <div className="fl-price-total">${price * 2} · 2 travelers</div>
      {leg.isRefund
        ? <span className="fl-refund fl-refund-yes">✅ Refundable</span>
        : <span className="fl-refund fl-refund-no">⚠ Non-refundable</span>}
      {seatsLeft && <span className="fl-seats-warn">🔥 {leg.seatsLeft} seats left</span>}
      <button className="fl-book-btn" onClick={onBook}>Book Now →</button>
      <button className="fl-details-btn" onClick={onToggle}>
        <span className="fl-chevron">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
        </span>
        {expanded ? 'Hide Details' : 'Flight Details'}
      </button>
    </div>
  );
}

function ExpandPanel({ flight, price }) {
  const allLegs = flight.type === 'multicity' ? flight.legs || [] : [flight.outbound, ...(flight.returnLeg ? [flight.returnLeg] : [])];
  const labels = flight.type === 'roundtrip' ? ['🛫 Outbound', '🛬 Return'] : allLegs.map((_, i) => `Flight ${i + 1}`);

  return (
    <div className="fl-expand open">
      <div className="fl-expand-inner">
        <div className="fl-exp-section">
          {allLegs.map((leg, i) => (
            <div key={i}>
              <h4>{labels[i]}: {leg.fromCode} → {leg.toCode}</h4>
              <div className="fl-expand-row"><strong>Flight</strong>{leg.airline?.name || "Airline"} {leg.flightNum}</div>
              <div className="fl-expand-row"><strong>Times</strong>{flFmt(leg.depH, leg.depM)} → {flFmt(leg.arrH, leg.arrM)}{leg.daysPlus > 0 && <sup style={{ color: 'var(--orange)' }}>+{leg.daysPlus}</sup>} · {flHrMin(leg.totalMins)}</div>
              <div className="fl-expand-row"><strong>Stops</strong>{flStopLabel(leg.numStops)} · {leg.aircraft}</div>
              {leg.numStops > 0 && <div className="fl-expand-row"><strong>Via</strong>{leg.layovers.map(l => `${l.airport} (${flHrMin(l.layMins)})`).join(' → ')}</div>}
              <div className="fl-expand-row"><strong>Policy</strong>{leg.isRefund ? '✅ Refundable' : '⚠ Non-refundable'} · {leg.hasBag ? '🧳 Bag incl.' : '🚫 No bag'}</div>
              {i < allLegs.length - 1 && <div style={{ height: '8px', borderBottom: '1px dashed var(--g200)', marginBottom: '8px' }}></div>}
            </div>
          ))}
        </div>
        <div className="fl-exp-section">
          <h4>💳 Price</h4>
          <div className="fl-price-breakdown">
            {allLegs.map((l, i) => (
              <div className="fl-pb-row" key={i}><span>{labels[i]} (1 pax)</span><span>${l.price}</span></div>
            ))}
            <div className="fl-pb-row"><span>Taxes &amp; fees</span><span>${Math.round(price * 0.12)}</span></div>
            <div className="fl-pb-row fl-pb-total"><span>Total (1 pax)</span><span>${price}</span></div>
          </div>
        </div>
      </div>
      <div className="fl-expand-footer">
        <div className="fl-expand-footer-info">For 2 travelers: <strong>${price * 2}</strong></div>
      </div>
    </div>
  );
}

export default function FlightCard({ flight }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { showLoading } = useLoading();
  if (!flight) return null;
  const mainLeg = flight.type === 'multicity' ? flight.legs?.[0] : flight.outbound;
  if (!mainLeg) return null;
  const price = getFlightPrice(flight);
  const bookUrl = `/flights/booking/${flight.id}?price=${price}&from=${mainLeg.fromCode || ''}&to=${mainLeg.toCode || ''}&airline=${encodeURIComponent(mainLeg.airline?.name || 'Airline')}&flight=${mainLeg.flightNum || ''}`;
  const handleBook = () => showLoading('flight-booking', () => router.push(bookUrl));

  /* ONE-WAY CARD */
  if (flight.type === 'oneway') {
    return (
      <div className={`fl-card${flight.best ? ' featured' : ''}`}>
        {flight.best && <div className="fl-best-badge">⭐ Best Value — Recommended flight</div>}
        <div className="fl-card-main">
          <TimelineRow leg={flight.outbound} />
          <PriceColumn price={price} flight={flight} leg={flight.outbound} onBook={handleBook} onToggle={() => setExpanded(!expanded)} expanded={expanded} />
        </div>
        {expanded && <ExpandPanel flight={flight} price={price} />}
      </div>
    );
  }

  /* ROUND-TRIP CARD */
  if (flight.type === 'roundtrip') {
    return (
      <div className={`fl-card${flight.best ? ' featured' : ''}`}>
        {flight.best && <div className="fl-best-badge">⭐ Best Round Trip — Recommended combination</div>}
        <div className="fl-rt-card-main">
          <div className="fl-rt-legs-col">
            <div className="fl-rt-leg-row">
              <div className="fl-rt-leg-label-tag">🛫 Outbound</div>
              <div className="fl-rt-leg-inner">
                <TimelineRow leg={flight.outbound} small />
              </div>
            </div>
            <div className="fl-rt-divider-row"><span className="fl-rt-divider-dot">⇅</span></div>
            <div className="fl-rt-leg-row">
              <div className="fl-rt-leg-label-tag" style={{ color: 'var(--orange)' }}>🛬 Return</div>
              <div className="fl-rt-leg-inner">
                <TimelineRow leg={flight.returnLeg} small />
              </div>
            </div>
          </div>
          <PriceColumn
            price={price}
            flight={flight}
            leg={flight.outbound}
            onBook={handleBook}
            onToggle={() => setExpanded(!expanded)}
            expanded={expanded}
            typeBadge={<div className="fl-rt-type-badge">⇄ Round Trip</div>}
          />
        </div>
        {expanded && <ExpandPanel flight={flight} price={price} />}
      </div>
    );
  }

  /* MULTI-CITY CARD */
  const routeSummary = flight.legs?.map(l => `${l.fromCode}→${l.toCode}`).join(' · ');
  return (
    <div className={`fl-card${flight.best ? ' featured' : ''}`}>
      {flight.best && <div className="fl-best-badge">⭐ Best Multi-City Combination</div>}
      <div className="fl-mc-card-header">
        <span className="fl-mc-type-badge">⊞ Multi-City</span>
        <span className="fl-mc-route-summary">{routeSummary}</span>
        <span className="fl-mc-leg-count">{flight.legs?.length} flights</span>
      </div>
      <div className="fl-mc-card-main">
        <div className="fl-mc-legs-col">
          {flight.legs?.map((leg, i) => (
            <div key={i}>
              {i > 0 && (
                <div className="fl-mc-connector-row">
                  <span className="fl-mc-connector-dot">↓</span>
                  <span className="fl-mc-connector-txt">Leg {i + 1} continues</span>
                </div>
              )}
              <div className="fl-mc-leg-row">
                <div className="fl-mc-leg-num-badge">Flight {i + 1}</div>
                <div className="fl-mc-leg-inner">
                  <TimelineRow leg={leg} small />
                </div>
              </div>
            </div>
          ))}
        </div>
        <PriceColumn
          price={price}
          flight={flight}
          leg={flight.legs?.[0]}
          onBook={handleBook}
          onToggle={() => setExpanded(!expanded)}
          expanded={expanded}
          typeBadge={
            <div className="fl-mc-type-badge-lg">
              ⊞ Multi-City<br /><span style={{ fontSize: '.64rem', fontWeight: 600, opacity: .7 }}>{flight.legs?.length} flights combined</span>
            </div>
          }
        />
      </div>
      {expanded && <ExpandPanel flight={flight} price={price} />}
    </div>
  );
}
