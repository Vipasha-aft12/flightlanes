import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const booking = await Booking.create(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    if (ref) {
      const booking = await Booking.findOne({ refCode: ref }).lean();
      if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(booking);
    }
    return NextResponse.json({ error: 'Provide ref code' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
