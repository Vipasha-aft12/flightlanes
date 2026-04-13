import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination') || '';

  try {
    const client = await clientPromise;
    const db = client.db('travelpodium');
    const query = destination ? { destination: { $regex: destination, $options: 'i' } } : {};
    const cruises = await db.collection('cruises').find(query).sort({ createdAt: -1 }).limit(30).toArray();
    return NextResponse.json({ cruises, count: cruises.length });
  } catch (error) {
    return NextResponse.json({ cruises: [], error: error.message }, { status: 500 });
  }
}
