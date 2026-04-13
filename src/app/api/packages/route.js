import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dest = searchParams.get('destination') || '';
  try {
    const client = await clientPromise;
    const db = client.db('travelpodium');
    const query = dest ? { destination: { $regex: dest, $options: 'i' } } : {};
    const packages = await db.collection('packages').find(query).sort({ createdAt: -1 }).limit(30).toArray();
    return NextResponse.json({ packages, count: packages.length });
  } catch (error) {
    return NextResponse.json({ packages: [], error: error.message }, { status: 500 });
  }
}
