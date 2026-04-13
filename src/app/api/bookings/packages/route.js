import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

const FlexBookingSchema = new mongoose.Schema({}, { strict: false, timestamps: true, collection: 'bookings' });
const FlexBooking = mongoose.models.FlexBooking || mongoose.model('FlexBooking', FlexBookingSchema);

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const refCode = body.bookingRef || 'FL-' + Math.floor(10000 + Math.random() * 90000);
    const doc = await FlexBooking.create({ ...body, refCode, type: 'package', status: 'confirmed' });
    return NextResponse.json({ success: true, bookingId: doc._id, bookingRef: refCode });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    if (ref) {
      const booking = await FlexBooking.findOne({ $or: [{ refCode: ref }, { bookingRef: ref }], type: 'package' }).lean();
      return NextResponse.json({ booking });
    }
    const bookings = await FlexBooking.find({ type: 'package' }).sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ bookings, count: bookings.length });
  } catch (error) {
    return NextResponse.json({ bookings: [], error: error.message }, { status: 500 });
  }
}
