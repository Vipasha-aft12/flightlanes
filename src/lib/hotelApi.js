/* ─── Hotel API Utility ────────────────────────────────────────────
   Correct endpoints from utils/hotels.js
   Base: https://hotel.expedianholidays.com/api
   ───────────────────────────────────────────────────────────────── */

const BASE_URL = process.env.NEXT_PUBLIC_HOTELS_URL || 'https://hotel.expedianholidays.com/api';

// Helper: make a request with timeout and error handling
async function apiRequest(url, options = {}) {
  const { method = 'GET', body, timeout = 15000 } = options;

  const fetchOptions = {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal: AbortSignal.timeout(timeout),
  };

  if (body) fetchOptions.body = JSON.stringify(body);

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    throw new Error(`API ${res.status}: ${errorText}`);
  }

  return res.json();
}


/* ─── 1. Search Destination ─────────────────────────────────────── */
// GET /hotels/destination?q=new+york
export async function searchDestination(query) {
  return apiRequest(`${BASE_URL}/hotels/destination?q=${encodeURIComponent(query)}`);
}


/* ─── 2. Check Availability (Hotel Search) ──────────────────────── */
// POST /hotels/search
export async function checkAvailability(body) {
  return apiRequest(`${BASE_URL}/hotels/search`, { method: 'POST', body });
}


/* ─── 3. Save Hotel Details ─────────────────────────────────────── */
// POST /hotels/save/hotel-details
export async function saveHotelDetails(hotelData) {
  return apiRequest(`${BASE_URL}/hotels/save/hotel-details`, { method: 'POST', body: hotelData });
}


/* ─── 4. Get Hotel Details ──────────────────────────────────────── */
// GET /hotels/hotel-details?id=69611ec4a7e3ae56a3dd6e29
export async function getHotelDetails(id) {
  return apiRequest(`${BASE_URL}/hotels/hotel-details?id=${encodeURIComponent(id)}`);
}


/* ─── 5. Price Check ────────────────────────────────────────────── */
// GET /hotels/price-check?id=...&roomId=...&bookingToken=...
export async function priceCheck(queryString) {
  // queryString should be like "?id=xxx&roomId=RH-1&bookingToken=xxx"
  const qs = queryString.startsWith('?') ? queryString : `?${queryString}`;
  return apiRequest(`${BASE_URL}/hotels/price-check${qs}`);
}


/* ─── 6. Pre-Booking ────────────────────────────────────────────── */
// POST /hotels/pre-booking
export async function preBooking(bookingData) {
  return apiRequest(`${BASE_URL}/hotels/pre-booking`, { method: 'POST', body: bookingData });
}


/* ─── 7. Confirm Booking ────────────────────────────────────────── */
// POST /hotels/confirm-booking  (NOT GET — confirmed from utils/hotels.js)
export async function confirmBooking(bookingData) {
  return apiRequest(`${BASE_URL}/hotels/confirm-booking`, { method: 'POST', body: bookingData });
}


/* ─── 8. Booking Details ────────────────────────────────────────── */
// GET /hotels/booking-details?bookingId=...
export async function getBookingDetails(bookingId) {
  return apiRequest(`${BASE_URL}/hotels/booking-details?bookingId=${encodeURIComponent(bookingId)}`);
}


/* ─── 9. Cancel Booking ─────────────────────────────────────────── */
// GET /hotels/booking-cancel?bookingId=...
export async function cancelBooking(bookingId) {
  return apiRequest(`${BASE_URL}/hotels/booking-cancel?bookingId=${encodeURIComponent(bookingId)}`);
}
