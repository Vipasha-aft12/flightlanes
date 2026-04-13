import { NextResponse } from 'next/server';
import { fetchAirportSuggestions } from '@/lib/flightApi';

// Local airport data as fallback
let localAirports = null;
async function getLocalAirports() {
  if (!localAirports) {
    const { default: data } = await import('@/lib/airportlist.json');
    localAirports = data;
  }
  return localAirports;
}

// GET /api/flights/airports?q=new+york
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  // 1. Try live flight API
  try {
    const data = await fetchAirportSuggestions(query);
    const results = Array.isArray(data) ? data : data.data || data.results || data.airports || [];
    if (results.length > 0) {
      // Normalize to a consistent shape
      const normalized = results.slice(0, 12).map(a => ({
        code: a.airportCode || a.iata || a.code || '',
        name: a.cityName || a.city || a.name || '',
        airport: a.airportName || a.airport || '',
        country: a.countryName || a.country || '',
        countryCode: a.countryCode || '',
      }));
      return NextResponse.json(normalized);
    }
  } catch (err) {
    console.error('Flight API airport search error:', err.message);
  }

  // 2. Fallback to local airportlist.json
  try {
    const airports = await getLocalAirports();
    const q = query.toLowerCase();
    const filtered = airports.filter(a =>
      (a.cityName || '').toLowerCase().includes(q) ||
      (a.airportCode || '').toLowerCase().includes(q) ||
      (a.airportName || '').toLowerCase().includes(q) ||
      (a.countryName || '').toLowerCase().includes(q)
    ).slice(0, 12).map(a => ({
      code: a.airportCode || '',
      name: a.cityName || '',
      airport: a.airportName || '',
      country: a.countryName || '',
      countryCode: a.countryCode || '',
    }));
    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([]);
  }
}
