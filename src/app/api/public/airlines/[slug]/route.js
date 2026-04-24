import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Airline from '@/models/Airline';

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;
  const airline = await Airline.findOne({ slug, status: 'published' }).lean();
  if (!airline) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ airline: JSON.parse(JSON.stringify(airline)) });
}
