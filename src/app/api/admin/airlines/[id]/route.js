import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Airline from '@/models/Airline';
import { requireStaff } from '@/lib/auth';
import { logActivity } from '@/lib/logActivity';

export async function GET(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const { id } = await params;
  const airline = await Airline.findById(id).lean();
  if (!airline) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ airline: JSON.parse(JSON.stringify(airline)) });
}

export async function PUT(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  try {
    const body = await request.json();
    await dbConnect();
    const { id } = await params;

    /* Capture previous status so we can detect publish-toggles */
    const prev = await Airline.findById(id).select('status').lean();

    const airline = await Airline.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!airline) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    /* Activity log.
       - If status changed, log publish/unpublish (more specific and useful)
       - Otherwise log a generic 'updated' */
    const statusChanged = prev && body.status && prev.status !== body.status;
    if (statusChanged) {
      await logActivity({
        userId: auth,
        action: body.status === 'published' ? 'published' : 'unpublished',
        contentType: 'airline',
        contentId: airline._id,
        contentTitle: airline.name,
        contentSlug: airline.slug,
      });
    } else {
      await logActivity({
        userId: auth,
        action: 'updated',
        contentType: 'airline',
        contentId: airline._id,
        contentTitle: airline.name,
        contentSlug: airline.slug,
      });
    }

    return NextResponse.json({ airline: JSON.parse(JSON.stringify(airline)) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const { id } = await params;
  const airline = await Airline.findByIdAndDelete(id);
  if (!airline) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await logActivity({
    userId: auth,
    action: 'deleted',
    contentType: 'airline',
    contentId: airline._id,
    contentTitle: airline.name,
    contentSlug: airline.slug,
  });

  return NextResponse.json({ success: true });
}
