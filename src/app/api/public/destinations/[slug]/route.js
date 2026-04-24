import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;
  const destination = await Destination.findOne({ slug, status: 'published' }).lean();
  if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ destination: JSON.parse(JSON.stringify(destination)) });
}
