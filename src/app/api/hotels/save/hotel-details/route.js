import { NextResponse } from 'next/server';
import { saveHotelDetails } from '@/lib/hotelApi';

// POST /api/hotels/save/hotel-details
export async function POST(request) {
  try {
    const body = await request.json();
    const data = await saveHotelDetails(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Save hotel details error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
