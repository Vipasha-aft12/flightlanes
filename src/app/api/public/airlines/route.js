import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Airline from '@/models/Airline';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const query = { status: 'published' };
  if (category && category !== 'all') query.category = category;

  const airlines = await Airline.find(query).sort({ name: 1 }).lean();
  return NextResponse.json({ airlines: JSON.parse(JSON.stringify(airlines)) });
}
