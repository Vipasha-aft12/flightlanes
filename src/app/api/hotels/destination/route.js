import { NextResponse } from 'next/server';
import { searchDestination } from '@/lib/hotelApi';

// GET /api/hotels/destination?query=new+york
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || searchParams.get('q') || '';

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const data = await searchDestination(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Destination search error:', error.message);
    return NextResponse.json([], { status: 200 }); // Return empty, don't fail
  }
}
