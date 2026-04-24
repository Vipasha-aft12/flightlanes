import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { requireStaff } from '@/lib/auth';
import { logActivity } from '@/lib/logActivity';

export async function GET(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const { id } = await params;
  const destination = await Destination.findById(id).lean();
  if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ destination: JSON.parse(JSON.stringify(destination)) });
}

export async function PUT(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  try {
    const body = await request.json();
    await dbConnect();
    const { id } = await params;

    const prev = await Destination.findById(id).select('status').lean();
    const destination = await Destination.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const statusChanged = prev && body.status && prev.status !== body.status;
    if (statusChanged) {
      await logActivity({
        userId: auth,
        action: body.status === 'published' ? 'published' : 'unpublished',
        contentType: 'destination',
        contentId: destination._id,
        contentTitle: destination.name,
        contentSlug: destination.slug,
      });
    } else {
      await logActivity({
        userId: auth,
        action: 'updated',
        contentType: 'destination',
        contentId: destination._id,
        contentTitle: destination.name,
        contentSlug: destination.slug,
      });
    }

    return NextResponse.json({ destination: JSON.parse(JSON.stringify(destination)) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const { id } = await params;
  const destination = await Destination.findByIdAndDelete(id);
  if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await logActivity({
    userId: auth,
    action: 'deleted',
    contentType: 'destination',
    contentId: destination._id,
    contentTitle: destination.name,
    contentSlug: destination.slug,
  });

  return NextResponse.json({ success: true });
}
