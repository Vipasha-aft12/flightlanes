import { NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/hotelApi';

// POST /api/hotels/search
// Body: { checkIn, checkOut, totalNights, totalRooms, guests, countryCode, hotelIds, currencyCode }
export async function POST(request) {
  try {
    const body = await request.json();
    const data = await checkAvailability(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Hotel search error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
