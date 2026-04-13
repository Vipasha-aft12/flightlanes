import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('travelpodium');
    await db.collection('searches').insertOne({ ...body, searchedAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('travelpodium');
    const recent = await db.collection('searches').find({}).sort({ searchedAt: -1 }).limit(20).toArray();
    return NextResponse.json({ searches: recent });
  } catch (error) {
    return NextResponse.json({ searches: [], error: error.message }, { status: 500 });
  }
}
