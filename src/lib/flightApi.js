/* ─── Flight API Utility ───────────────────────────────────────────
   From utils/flight.js
   Base: process.env.NEXT_PUBLIC_FLIGHT_URL
   ───────────────────────────────────────────────────────────────── */

const BASE_URL = process.env.NEXT_PUBLIC_FLIGHT_URL || 'https://flight.expedianholidays.com/api/v1/flight';

/* ─── Airport / Destination Suggestion ──────────────────────────── */
// GET /destination/suggestion?destination=new+york
export async function fetchAirportSuggestions(search) {
  try {
    const res = await fetch(
      `${BASE_URL}/destination/suggestion?destination=${encodeURIComponent(search)}`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Airport suggestion error:', error);
    return [];
  }
}

/* ─── Find Airline by IATA Code ─────────────────────────────────── */
export async function findAirline(aircode) {
  try {
    const { default: airlineData } = await import('./airline_data.json');
    return airlineData.find(
      (item) => item?.iataCode?.toLowerCase() === aircode?.toLowerCase()
    ) || null;
  } catch {
    return null;
  }
}
