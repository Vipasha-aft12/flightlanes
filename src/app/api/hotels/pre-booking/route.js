import { NextResponse } from 'next/server';
import { preBooking } from '@/lib/hotelApi';

// POST /api/hotels/pre-booking
// Body: { id, roomId, bookingToken, bookingUser, roomGuestDetail }
export async function POST(request) {
  try {
    const body = await request.json();
    const data = await preBooking(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Pre-booking error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
