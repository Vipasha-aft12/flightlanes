import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const CAR_API = process.env.NEXT_PUBLIC_CAR_API || 'https://myfakeapi.com/api/cars';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const pickup = searchParams.get('pickup') || '';

  let cars = [];
  let source = 'generated';

  // Try MyFakeAPI
  try {
    const res = await fetch(CAR_API, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      cars = data.cars || (Array.isArray(data) ? data : []);
      source = 'myfakeapi';
    }
  } catch {}

  // Fallback: FreeTestAPI
  if (cars.length === 0) {
    try {
      const res = await fetch('https://www.freetestapi.com/api/v1/cars?limit=20', { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        cars = Array.isArray(data) ? data : [];
        source = 'freetestapi';
      }
    } catch {}
  }

  // Cache to MongoDB
  try {
    const client = await clientPromise;
    const db = client.db('travelpodium');
    if (cars.length > 0) {
      await db.collection('car_cache').insertOne({
        pickup, type, cars: cars.slice(0, 20), source, cachedAt: new Date(),
      });
    }
  } catch {}

  return NextResponse.json({ cars, source, count: cars.length });
}
