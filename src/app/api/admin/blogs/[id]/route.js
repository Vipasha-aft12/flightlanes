import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { requireStaff } from '@/lib/auth';
import { logActivity } from '@/lib/logActivity';

export async function GET(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;
  await dbConnect();
  const { id } = await params;
  const blog = await Blog.findById(id).lean();
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
}

export async function PUT(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;
  try {
    const body = await request.json();
    await dbConnect();
    const { id } = await params;

    const prev = await Blog.findById(id).select('status').lean();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const statusChanged = prev && body.status && prev.status !== body.status;
    if (statusChanged) {
      await logActivity({
        userId: auth,
        action: body.status === 'published' ? 'published' : 'unpublished',
        contentType: 'blog',
        contentId: blog._id,
        contentTitle: blog.title,
        contentSlug: blog.slug,
      });
    } else {
      await logActivity({
        userId: auth,
        action: 'updated',
        contentType: 'blog',
        contentId: blog._id,
        contentTitle: blog.title,
        contentSlug: blog.slug,
      });
    }

    return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;
  await dbConnect();
  const { id } = await params;
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await logActivity({
    userId: auth,
    action: 'deleted',
    contentType: 'blog',
    contentId: blog._id,
    contentTitle: blog.title,
    contentSlug: blog.slug,
  });

  return NextResponse.json({ success: true });
}
