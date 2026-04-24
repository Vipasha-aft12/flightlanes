'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import '@/components/flights/flights.css';
import '@/components/shared/results.css';
import SummaryBar from '@/components/flights/SummaryBar';
import FlexibleDates from '@/components/flights/FlexibleDates';
import FilterSidebar from '@/components/flights/FilterSidebar';
import FlightCard from '@/components/flights/FlightCard';
import { generateFlightPool, getFlightPrice, getFlightStops, getFlightDuration, getFlightAirline } from '@/lib/flightUtils';

function FlightResultsContent() {
  const sp = useSearchParams();
  const tripType = sp.get('type') || 'roundtrip';
  const from = sp.get('from') || 'New York (JFK)';
  const to = sp.get('to') || 'London (LHR)';
  const fromCode = sp.get('fromCode') || 'JFK';
  const toCode = sp.get('toCode') || 'LHR';
  const depart = sp.get('depart') || '2026-06-15';
  const returnDate = sp.get('return') || '2026-06-22';
  const cabin = sp.get('cabin') || 'Economy';
  const adults = sp.get('adults') || '1';

  const dates = tripType === 'roundtrip' ? `${depart} – ${returnDate}` : depart;
  const travLabel = `${adults} Adult${Number(adults) > 1 ? 's' : ''} · ${cabin}`;

  /* ── Flight Data State ── */
  const [pool, setPool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');

  /* ── Normalize API flight data into FlightCard format ── */
  function normalizeApiFlights(apiFlights, type) {
    return apiFlights.map((f, i) => {
      // If it already has outbound (generated format), return as-is
      if (f.outbound) return f;

      // Convert flat API data into FlightCard format
      const airlines = ['American Airlines', 'Delta Air Lines', 'United Airlines', 'JetBlue', 'Southwest', 'Spirit Airlines', 'Alaska Airlines', 'Frontier'];
      const logos = ['🇺🇸', '🔺', '🌐', '💙', '❤️', '🟡', '🏔', '🟢'];
      const ai = i % airlines.length;

      // Safely extract airline name - API may return string OR object {name, code, region}
      const rawAirline = f.airline || f.carrier || f.airlineName;
      const airlineName = typeof rawAirline === 'object' && rawAirline !== null
        ? (rawAirline.name || rawAirline.airline || 'Airline')
        : (rawAirline || airlines[ai]);
      const airlineCode = typeof rawAirline === 'object' && rawAirline !== null
        ? (rawAirline.code || '')
        : '';

      function makeLeg(origin, dest, price, stops) {
        const dH = apiDepTime ? apiDepTime.h : 6 + (i * 2) % 16;
        const dM = apiDepTime ? apiDepTime.m : (i * 15) % 60;
        const dur = apiDuration > 0 ? apiDuration : (120 + stops * 90 + Math.floor(Math.random() * 120));
        const aH = apiArrTime ? apiArrTime.h : (dH + Math.floor(dur / 60)) % 24;
        const aM = apiArrTime ? apiArrTime.m : (dH * 60 + dM + dur) % 60;
        return {
          fromCode: origin || fromCode, toCode: dest || toCode,
          airline: { name: airlineName, logo: logos[ai] },
          flightNum: f.flightNumber || f.flight_number || f.flightNo || f.flight_no || (airlineCode ? airlineCode + '-' + (1000 + i) : `FL${1000 + i}`),
          depH: dH, depM: dM,
          arrH: aH, arrM: aM,
          daysPlus: 0,
          totalMins: dur,
          numStops: stops != null ? stops : (f.stops ?? f.numStops ?? (i % 3)),
          layovers: [],
          price: price,
          hasBag: f.baggage != null ? !!f.baggage : (i % 2 === 0),
          isRefund: f.refundable != null ? !!f.refundable : (i % 3 === 0),
          seatsLeft: f.seatsLeft || f.seats_left || 0,
          aircraft: f.aircraft || f.plane || '',
          fromCity: '', toCity: '',
        };
      }

      // Deep price extraction — recursively search all fields
      function extractPrice(obj, depth = 0) {
        if (!obj || typeof obj !== 'object' || depth > 3) return 0;
        // Direct fields
        const priceFields = ['price', 'fare', 'totalPrice', 'total_price', 'amount', 'cost',
          'baseFare', 'base_fare', 'totalAmount', 'total_amount', 'grandTotal', 'grand_total',
          'netFare', 'net_fare', 'publishedFare', 'published_fare', 'offerPrice', 'offer_price',
          'adultFare', 'adult_fare', 'totalFare', 'total_fare', 'perAdult', 'per_adult',
          'displayPrice', 'display_price', 'salePrice', 'sale_price', 'baseAmount', 'base_amount'];
        for (const key of priceFields) {
          const val = obj[key];
          if (val != null) {
            const num = typeof val === 'object' ? (Number(val.amount || val.total || val.value) || 0) : Number(val);
            if (!isNaN(num) && num > 0) return num;
          }
        }
        // Nested objects
        for (const key of Object.keys(obj)) {
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            const found = extractPrice(obj[key], depth + 1);
            if (found > 0) return found;
          }
        }
        return 0;
      }

      const flightPrice = extractPrice(f) || (300 + i * 50);

      // Extract time data from API if available
      function parseTime(timeStr) {
        if (!timeStr) return null;
        const m = String(timeStr).match(/(\d{1,2}):(\d{2})/);
        if (m) return { h: parseInt(m[1]), m: parseInt(m[2]) };
        return null;
      }
      const apiDepTime = parseTime(f.departureTime || f.departure_time || f.depTime || f.dep_time || f.departure);
      const apiArrTime = parseTime(f.arrivalTime || f.arrival_time || f.arrTime || f.arr_time || f.arrival);
      const apiDuration = Number(f.duration || f.totalMins || f.flightDuration || f.flight_duration || 0);

      // Debug first item
      if (i === 0) console.log('[Normalizer] Price extracted:', flightPrice, '| Keys:', Object.keys(f).join(','));

      const stops = Number(f.stops ?? f.numStops ?? f.stop ?? f.stopCount ?? f.number_of_stops ?? i % 3);

      if (type === 'roundtrip') {
        return {
          type: 'roundtrip', id: f.id || f._id || `api-rt-${i}`, best: i === 0,
          outbound: makeLeg(f.origin || f.from, f.destination || f.to, Math.round(flightPrice * 0.55), stops),
          returnLeg: makeLeg(f.destination || f.to, f.origin || f.from, Math.round(flightPrice * 0.45), stops > 0 ? stops - 1 : 0),
        };
      }
      return {
        type: 'oneway', id: f.id || f._id || `api-ow-${i}`, best: i === 0,
        outbound: makeLeg(f.origin || f.from, f.destination || f.to, flightPrice, stops),
      };
    });
  }

  /* ── Fetch flights from real API, fall back to generated ── */
  useEffect(() => {
    async function fetchFlights() {
      setLoading(true);

      // 1. Try real flight API via our proxy
      try {
        const params = new URLSearchParams({
          type: tripType, from: fromCode, to: toCode,
          depart, adults, cabin,
        });
        if (tripType === 'roundtrip' && returnDate) params.set('return', returnDate);

        const res = await fetch(`/api/flights?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          const flights = data.flights || [];

          // Debug: log API response structure
          if (data._debug) {
            console.log('[SearchBox → API] Source:', data.source);
            console.log('[SearchBox → API] Top keys:', data._debug.topLevelKeys);
            console.log('[SearchBox → API] Item keys:', data._debug.firstItemKeys);
            console.log('[SearchBox → API] Sample:', data._debug.firstItemSample);
          }

          if (flights.length > 0) {
            setPool(normalizeApiFlights(flights, tripType));
            setSource(data.source || 'api');
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.log('API fetch failed, using generated:', err.message);
      }

      // 2. Fallback: generate flight data locally
      const generated = generateFlightPool(tripType, from, to);
      setPool(generated);
      setSource('generated');
      setLoading(false);
    }

    fetchFlights();
  }, [tripType, from, to, fromCode, toCode, depart, returnDate, cabin, adults]);

  /* ── Extract unique airlines ── */
  const allAirlines = useMemo(() => {
    const set = new Set();
    pool.forEach((f) => {
      if (f.type === 'multicity') f.legs?.forEach((l) => set.add(l.airline?.name));
      else { set.add(f.outbound?.airline?.name); if (f.returnLeg) set.add(f.returnLeg?.airline?.name); }
    });
    set.delete(undefined);
    return [...set].sort();
  }, [pool]);

  /* ── Filter/Sort State ── */
  const [sortBy, setSortBy] = useState('price');
  const [filterOpen, setFilterOpen] = useState(false);
  const [shown, setShown] = useState(8);
  const [filters, setFilters] = useState({
    maxPrice: 2000, maxDuration: 30,
    stops: { 0: true, 1: true, 2: true },
    airlines: {},
    departTime: { early: true, morning: true, afternoon: true, evening: true },
    amenities: { baggage: false, refundable: false, wifi: false, meals: false },
    cabins: { economy: true, premium: true, business: true, first: true },
  });

  // Update airline filters when pool changes
  useEffect(() => {
    if (allAirlines.length > 0) {
      setFilters(prev => ({
        ...prev,
        airlines: Object.fromEntries(allAirlines.map(a => [a, true])),
      }));
    }
  }, [allAirlines]);

  /* ── Apply Filters ── */
  const filtered = useMemo(() => {
    return pool.filter((f) => {
      const price = getFlightPrice(f);
      if (price > filters.maxPrice) return false;
      const dur = getFlightDuration(f) / 60;
      if (dur > filters.maxDuration) return false;
      const stops = getFlightStops(f);
      if (!filters.stops[stops >= 2 ? 2 : stops]) return false;
      const airline = getFlightAirline(f);
      if (filters.airlines[airline] === false) return false;
      const leg = f.type === 'multicity' ? f.legs?.[0] : f.outbound;
      if (leg?.depH !== undefined) {
        const slot = leg.depH < 6 ? 'early' : leg.depH < 12 ? 'morning' : leg.depH < 18 ? 'afternoon' : 'evening';
        if (!filters.departTime[slot]) return false;
      }
      if (filters.amenities.baggage && !leg?.hasBag) return false;
      if (filters.amenities.refundable && !leg?.isRefund) return false;
      return true;
    });
  }, [pool, filters]);

  /* ── Sort ── */
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === 'price') arr.sort((a, b) => getFlightPrice(a) - getFlightPrice(b));
    else if (sortBy === 'duration') arr.sort((a, b) => getFlightDuration(a) - getFlightDuration(b));
    else if (sortBy === 'departure') {
      arr.sort((a, b) => {
        const la = a.type === 'multicity' ? a.legs?.[0] : a.outbound;
        const lb = b.type === 'multicity' ? b.legs?.[0] : b.outbound;
        return ((la?.depH || 0) * 60 + (la?.depM || 0)) - ((lb?.depH || 0) * 60 + (lb?.depM || 0));
      });
    } else if (sortBy === 'stops') arr.sort((a, b) => getFlightStops(a) - getFlightStops(b));
    return arr;
  }, [filtered, sortBy]);

  const sortButtons = [
    { key: 'price', label: '💰 Lowest Price' },
    { key: 'duration', label: '⚡ Shortest' },
    { key: 'departure', label: '🕐 Earliest' },
    { key: 'best', label: '⭐ Best Match' },
    { key: 'stops', label: '🚫 Fewest Stops' },
  ];

  return (
    <div style={{ paddingTop: '68px' }}>
      <SummaryBar tripType={tripType} from={from} to={to} dates={dates} travelers={travLabel} resultCount={sorted.length} />
      {tripType !== 'multicity' && <FlexibleDates />}

      {/* Source indicator */}
      {source && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4px 24px 0' }}>
          <span style={{ fontSize: '.68rem', color: 'var(--g400)', fontWeight: 600 }}>
            {source === 'api' || source === 'api-post' ? '🟢 Live results from airline API' : '🔵 Showing sample flights'}
          </span>
        </div>
      )}

      <div className="fl-layout">
        {/* Desktop Filter (hidden on mobile via CSS) */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Mobile Off-canvas Filter */}
        <div className={`mob-filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
        <div className={`mob-filter-panel ${filterOpen ? 'open' : ''}`}>
          <div className="mob-filter-panel-head"><h3>🎛 Filters</h3><button className="mob-filter-close" onClick={() => setFilterOpen(false)}>✕</button></div>
          <div className="mob-filter-panel-body"><FilterSidebar filters={filters} setFilters={setFilters} /></div>
          <button className="mob-filter-apply" onClick={() => setFilterOpen(false)}>Apply Filters</button>
        </div>

        <div className="fl-results">
          <div className="fl-sort-bar">
            <button className="mob-filter-btn" onClick={() => setFilterOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 12h12M8 18h8" /></svg>Filters</button>
            <span className="fl-sort-label">Sort:</span>
            {sortButtons.map((btn) => (
              <button key={btn.key} className={`fl-sort-btn ${sortBy === btn.key ? 'active' : ''}`} onClick={() => setSortBy(btn.key)}>{btn.label}</button>
            ))}
            <span className="fl-showing">Showing {Math.min(shown, sorted.length)} of {sorted.length} flights</span>
          </div>

          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', background: 'white', border: '1px solid var(--g200)', borderRadius: '0 0 14px 14px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>✈️</div>
              <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--g800)' }}>Searching {from} → {to}...</div>
              <div style={{ fontSize: '.82rem', color: 'var(--g400)', marginTop: '6px' }}>Checking 500+ airlines for the best fares</div>
            </div>
          ) : sorted.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', background: 'white', border: '1px solid var(--g200)', borderRadius: '0 0 14px 14px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--g800)', marginBottom: '6px' }}>No flights match your filters</div>
              <div style={{ fontSize: '.85rem', color: 'var(--g500)' }}>Try adjusting your filters to see more results</div>
            </div>
          ) : (
            <div>
              {sorted.slice(0, shown).map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          )}

          {shown < sorted.length && (
            <div style={{ background: 'white', border: '1px solid var(--g200)', borderTop: 'none', borderRadius: '0 0 16px 16px', padding: '20px', textAlign: 'center' }}>
              <button className="btn-ghost" style={{ fontSize: '.9rem', padding: '10px 30px' }} onClick={() => setShown(shown + 8)}>
                Load More Flights ({sorted.length - shown} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FlightResultsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading flights...</div>}>
      <FlightResultsContent />
    </Suspense>
  );
}
