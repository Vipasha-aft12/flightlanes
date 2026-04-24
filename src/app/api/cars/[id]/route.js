import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { generateCar } from '@/lib/carUtils';

const CAR_API = process.env.NEXT_PUBLIC_CAR_API || 'https://myfakeapi.com/api/cars';

export async function GET(request, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  // Derive a numeric id from the slug (e.g. "car-3" → 3, "7" → 7)
  const numericId = Number(String(id).replace(/[^0-9]/g, '')) || 0;

  let car = null;
  let source = 'generated';

  // 1. Try MyFakeAPI — /api/cars/{id}
  try {
    const res = await fetch(`${CAR_API}/${numericId}`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      // MyFakeAPI wraps single records as { Car: {...} } — accept either shape
      car = data.Car || data.car || (data && typeof data === 'object' && !Array.isArray(data) ? data : null);
      if (car) source = 'myfakeapi';
    }
  } catch {}

  // 2. Fallback: FreeTestAPI — /api/v1/cars/{id}
  if (!car) {
    try {
      const res = await fetch(`https://www.freetestapi.com/api/v1/cars/${numericId}`, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          car = data;
          source = 'freetestapi';
        }
      }
    } catch {}
  }

  // 3. Final fallback: locally generated mock
  if (!car) {
    car = generateCar(numericId);
    source = 'generated';
  }

  // Cache lookup to MongoDB (best-effort, never throws)
  try {
    const client = await clientPromise;
    const db = client.db('travelpodium');
    await db.collection('car_detail_cache').insertOne({
      lookupId: String(id),
      numericId,
      car,
      source,
      cachedAt: new Date(),
    });
  } catch {}

  return NextResponse.json({ car, source, id: String(id) });
}
