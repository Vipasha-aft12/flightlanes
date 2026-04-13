import { NextResponse } from 'next/server';
import { getHotelDetails } from '@/lib/hotelApi';

// GET /api/hotels/details?id=6304573
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Hotel ID is required' }, { status: 400 });
  }

  try {
    const data = await getHotelDetails(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Hotel details error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
