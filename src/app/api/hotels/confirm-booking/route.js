import { NextResponse } from 'next/server';
import { confirmBooking } from '@/lib/hotelApi';

// POST /api/hotels/confirm-booking
// Body: { bookingId: "..." } or any booking confirmation data
export async function POST(request) {
  try {
    const body = await request.json();
    const data = await confirmBooking(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Confirm booking error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Also support GET for backwards compatibility
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
  }

  try {
    const data = await confirmBooking({ bookingId });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Confirm booking error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
