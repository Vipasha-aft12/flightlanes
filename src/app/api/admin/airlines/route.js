import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Airline from '@/models/Airline';
import { requireStaff } from '@/lib/auth';
import { logActivity } from '@/lib/logActivity';

export async function GET() {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const airlines = await Airline.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ airlines: JSON.parse(JSON.stringify(airlines)) });
}

export async function POST(request) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  try {
    const body = await request.json();
    await dbConnect();

    const exists = await Airline.findOne({ slug: body.slug });
    if (exists) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

    const airline = await Airline.create(body);

    /* Activity log: creation. If the new airline starts published, also
       record a 'published' event so the timeline reflects it going live. */
    await logActivity({
      userId: auth,
      action: 'created',
      contentType: 'airline',
      contentId: airline._id,
      contentTitle: airline.name,
      contentSlug: airline.slug,
    });
    if (airline.status === 'published') {
      await logActivity({
        userId: auth,
        action: 'published',
        contentType: 'airline',
        contentId: airline._id,
        contentTitle: airline.name,
        contentSlug: airline.slug,
      });
    }

    return NextResponse.json({ airline: JSON.parse(JSON.stringify(airline)) }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
