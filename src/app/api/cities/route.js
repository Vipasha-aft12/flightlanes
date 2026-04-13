import { NextResponse } from 'next/server';

const HOTELS_API = process.env.NEXT_PUBLIC_HOTELS_URL || 'https://hotel.expedianholidays.com/api';

// Static fallback cities if external API is down
const FALLBACK_CITIES = [
  { id: 'new-york', name: 'New York', country: 'United States', code: 'NYC' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', code: 'LAX' },
  { id: 'chicago', name: 'Chicago', country: 'United States', code: 'CHI' },
  { id: 'miami', name: 'Miami', country: 'United States', code: 'MIA' },
  { id: 'las-vegas', name: 'Las Vegas', country: 'United States', code: 'LAS' },
  { id: 'san-francisco', name: 'San Francisco', country: 'United States', code: 'SFO' },
  { id: 'orlando', name: 'Orlando', country: 'United States', code: 'MCO' },
  { id: 'boston', name: 'Boston', country: 'United States', code: 'BOS' },
  { id: 'washington', name: 'Washington D.C.', country: 'United States', code: 'DCA' },
  { id: 'seattle', name: 'Seattle', country: 'United States', code: 'SEA' },
  { id: 'paris', name: 'Paris', country: 'France', code: 'PAR' },
  { id: 'london', name: 'London', country: 'United Kingdom', code: 'LON' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', code: 'DXB' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', code: 'TYO' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', code: 'DPS' },
  { id: 'cancun', name: 'Cancún', country: 'Mexico', code: 'CUN' },
  { id: 'rome', name: 'Rome', country: 'Italy', code: 'ROM' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', code: 'BCN' },
  { id: 'maldives', name: 'Maldives', country: 'Maldives', code: 'MLE' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', code: 'BKK' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', code: 'SIN' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', code: 'SYD' },
  { id: 'santorini', name: 'Santorini', country: 'Greece', code: 'JTR' },
  { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', code: 'AMS' },
  { id: 'hawaii', name: 'Honolulu, Hawaii', country: 'United States', code: 'HNL' },
  { id: 'phuket', name: 'Phuket', country: 'Thailand', code: 'HKT' },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', code: 'IST' },
  { id: 'delhi', name: 'New Delhi', country: 'India', code: 'DEL' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', code: 'BOM' },
  { id: 'goa', name: 'Goa', country: 'India', code: 'GOI' },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  // Try destination search endpoint first (from hotel API)
  try {
    const res = await fetch(`${HOTELS_API}/hotels/destination?q=${encodeURIComponent(query)}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      const results = Array.isArray(data) ? data : data.results || data.data || data.destinations || [];
      if (results.length > 0) {
        return NextResponse.json(results.slice(0, 10));
      }
    }
  } catch {}

  // Try external API second
  try {
    const res = await fetch(`${HOTELS_API}/cities?q=${encodeURIComponent(query)}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data.slice(0, 10));
      }
    }
  } catch {}

  // Try alternate endpoint patterns
  try {
    const res = await fetch(`${HOTELS_API}/autocomplete?query=${encodeURIComponent(query)}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return NextResponse.json(data.slice(0, 10));
      if (data.cities) return NextResponse.json(data.cities.slice(0, 10));
      if (data.results) return NextResponse.json(data.results.slice(0, 10));
    }
  } catch {}

  // Fallback to static city list
  const filtered = FALLBACK_CITIES.filter(
    c => c.name.toLowerCase().includes(query) ||
         c.country.toLowerCase().includes(query) ||
         c.code.toLowerCase().includes(query)
  ).slice(0, 8);

  return NextResponse.json(filtered);
}
