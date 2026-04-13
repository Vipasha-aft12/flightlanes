import { NextResponse } from 'next/server';
import { priceCheck } from '@/lib/hotelApi';

// GET /api/hotels/price-check?id=...&roomId=...&bookingToken=...
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const roomId = searchParams.get('roomId');

  if (!id || !roomId) {
    return NextResponse.json({ error: 'id and roomId are required' }, { status: 400 });
  }

  try {
    // Pass the full query string to the API (id, roomId, bookingToken, etc.)
    const qs = searchParams.toString();
    const data = await priceCheck(`?${qs}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Price check error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
