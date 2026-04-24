import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { requireStaff } from '@/lib/auth';
import { logActivity } from '@/lib/logActivity';

export async function GET() {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const destinations = await Destination.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ destinations: JSON.parse(JSON.stringify(destinations)) });
}

export async function POST(request) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  try {
    const body = await request.json();
    await dbConnect();

    const exists = await Destination.findOne({ slug: body.slug });
    if (exists) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

    const destination = await Destination.create(body);

    await logActivity({
      userId: auth,
      action: 'created',
      contentType: 'destination',
      contentId: destination._id,
      contentTitle: destination.name,
      contentSlug: destination.slug,
    });
    if (destination.status === 'published') {
      await logActivity({
        userId: auth,
        action: 'published',
        contentType: 'destination',
        contentId: destination._id,
        contentTitle: destination.name,
        contentSlug: destination.slug,
      });
    }

    return NextResponse.json({ destination: JSON.parse(JSON.stringify(destination)) }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
