import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

/*  ──────────────────────────────────────────────────────────
    Generic /api/bookings endpoint
    Accepts POST from every module (flights, cars, cruises,
    packages, hotels). Stores the payload as-is in a single
    "bookings" collection using a flexible schema so any
    shape of data is accepted.
    ────────────────────────────────────────────────────────── */

// Flexible schema — accepts any fields from any module
const FlexBookingSchema = new mongoose.Schema(
  {},
  { strict: false, timestamps: true, collection: 'bookings' }
);

// Avoid re-compiling the model on hot-reload
const FlexBooking =
  mongoose.models.FlexBooking ||
  mongoose.model('FlexBooking', FlexBookingSchema);

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a refCode if one wasn't supplied
    const refCode =
      body.bookingRef ||
      body.refCode ||
      'FL-' + Math.floor(10000 + Math.random() * 90000);

    await dbConnect();

    const doc = await FlexBooking.create({
      ...body,
      refCode,
      status: body.status || 'confirmed',
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: doc._id,
        refCode,
        bookingRef: refCode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking save error:', error.message);
    // Return a success-shaped response with a fallback ref so the
    // client-side confirmation flow is never blocked by a DB hiccup.
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        refCode: 'FL-' + Math.floor(10000 + Math.random() * 90000),
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');

    if (ref) {
      const booking = await FlexBooking.findOne({
        $or: [{ refCode: ref }, { bookingRef: ref }],
      }).lean();
      if (!booking)
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ booking });
    }

    const bookings = await FlexBooking.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return NextResponse.json({ bookings, count: bookings.length });
  } catch (error) {
    return NextResponse.json(
      { bookings: [], error: error.message },
      { status: 500 }
    );
  }
}
