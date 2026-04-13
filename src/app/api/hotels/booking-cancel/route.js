import { NextResponse } from 'next/server';
import { cancelBooking } from '@/lib/hotelApi';

// GET /api/hotels/booking-cancel?bookingId=...
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
  }

  try {
    const data = await cancelBooking(bookingId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Booking cancel error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
