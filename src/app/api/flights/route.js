import { NextResponse } from 'next/server';

const FLIGHT_API = process.env.NEXT_PUBLIC_FLIGHT_URL || 'https://flight.expedianholidays.com/api/v1/flight';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'oneway';
  const cabin = searchParams.get('cabin') || 'Economy';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const depart = searchParams.get('depart') || '';
  const returnDate = searchParams.get('return') || '';
  const adults = searchParams.get('adults') || '1';

  let flights = [];
  let source = 'none';
  let rawResponse = null;

  // ── Try GET request to flight API ──
  try {
    const apiParams = new URLSearchParams({ from, to, type, cabin, depart, adults });
    if (returnDate) apiParams.set('return', returnDate);

    const res = await fetch(`${FLIGHT_API}?${apiParams.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      const data = await res.json();
      rawResponse = data;

      // Log the full response structure (first 1000 chars) for debugging
      console.log('[FLIGHT API GET] Response keys:', Object.keys(data));
      if (Array.isArray(data) && data.length > 0) {
        console.log('[FLIGHT API GET] First item keys:', Object.keys(data[0]));
        console.log('[FLIGHT API GET] First item:', JSON.stringify(data[0]).substring(0, 800));
      } else if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log('[FLIGHT API GET] data.data[0] keys:', Object.keys(data.data[0]));
        console.log('[FLIGHT API GET] data.data[0]:', JSON.stringify(data.data[0]).substring(0, 800));
      } else if (data.flights && Array.isArray(data.flights) && data.flights.length > 0) {
        console.log('[FLIGHT API GET] flights[0] keys:', Object.keys(data.flights[0]));
        console.log('[FLIGHT API GET] flights[0]:', JSON.stringify(data.flights[0]).substring(0, 800));
      }

      // Extract flights array from various response shapes
      flights = Array.isArray(data) ? data
        : data.data ? (Array.isArray(data.data) ? data.data : [])
        : data.flights ? data.flights
        : data.results ? data.results
        : data.offers ? data.offers
        : data.itineraries ? data.itineraries
        : [];

      if (flights.length > 0) source = 'api-get';
    }
  } catch (err) {
    console.log('[FLIGHT API GET] Error:', err.message);
  }

  // ── Try POST request if GET returned nothing ──
  if (flights.length === 0) {
    try {
      const res = await fetch(FLIGHT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          origin: from, destination: to,
          departDate: depart, returnDate: returnDate || undefined,
          tripType: type, cabinClass: cabin,
          adults: parseInt(adults), children: 0, infants: 0,
          // Alternative field names
          from, to, depart, type, cabin,
          return: returnDate || undefined,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        const data = await res.json();
        rawResponse = data;
        console.log('[FLIGHT API POST] Response keys:', Object.keys(data));

        flights = Array.isArray(data) ? data
          : data.data ? (Array.isArray(data.data) ? data.data : [])
          : data.flights ? data.flights
          : data.results ? data.results
          : [];

        if (flights.length > 0) source = 'api-post';
      }
    } catch (err) {
      console.log('[FLIGHT API POST] Error:', err.message);
    }
  }

  return NextResponse.json({
    flights,
    source,
    count: flights.length,
    // Include raw response keys for frontend debugging
    _debug: rawResponse ? {
      topLevelKeys: Object.keys(rawResponse),
      firstItemKeys: flights.length > 0 ? Object.keys(flights[0]) : [],
      firstItemSample: flights.length > 0 ? JSON.stringify(flights[0]).substring(0, 500) : null,
    } : null,
    query: { from, to, type, cabin, depart, return: returnDate, adults },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(FLIGHT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Flight API unavailable', status: res.status }, { status: 502 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
