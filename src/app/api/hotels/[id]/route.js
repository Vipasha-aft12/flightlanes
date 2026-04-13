import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hotel from '@/models/Hotel';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const hotel = await Hotel.findOne({ $or: [{ _id: id }, { slug: id }] }).lean();
    if (!hotel) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    return NextResponse.json(hotel);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
