import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hotel from '@/models/Hotel';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const stars = searchParams.get('stars');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'recommended';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter = {};
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (stars) filter.stars = { $gte: parseInt(stars) };
    if (maxPrice) filter.priceFrom = { $lte: parseInt(maxPrice) };

    const sortMap = {
      recommended: { featured: -1, score: -1 },
      'price-low': { priceFrom: 1 },
      'price-high': { priceFrom: -1 },
      rating: { score: -1 },
      stars: { stars: -1 },
    };

    const total = await Hotel.countDocuments(filter);
    const hotels = await Hotel.find(filter)
      .sort(sortMap[sort] || sortMap.recommended)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-reviews -aboutText -policies -nearby')
      .lean();

    return NextResponse.json({ hotels, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const hotel = await Hotel.create(body);
    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
