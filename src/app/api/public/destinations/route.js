import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const continent = searchParams.get('continent');

  const query = { status: 'published' };
  if (continent && continent !== 'all') query.continent = continent;

  const destinations = await Destination.find(query).sort({ name: 1 }).lean();
  return NextResponse.json({ destinations: JSON.parse(JSON.stringify(destinations)) });
}
