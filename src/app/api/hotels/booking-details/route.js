import { NextResponse } from 'next/server';
import { getBookingDetails } from '@/lib/hotelApi';

// GET /api/hotels/booking-details?bookingId=...
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
  }

  try {
    const data = await getBookingDetails(bookingId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Booking details error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
