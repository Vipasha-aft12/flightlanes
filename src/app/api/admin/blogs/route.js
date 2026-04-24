import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { requireStaff } from '@/lib/auth';
import { logActivity } from '@/lib/logActivity';

export async function GET() {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 }).select('-content').lean();
  return NextResponse.json({ blogs: JSON.parse(JSON.stringify(blogs)) });
}

export async function POST(request) {
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;
  try {
    const body = await request.json();
    await dbConnect();
    const exists = await Blog.findOne({ slug: body.slug });
    if (exists) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    const blog = await Blog.create(body);

    await logActivity({
      userId: auth,
      action: 'created',
      contentType: 'blog',
      contentId: blog._id,
      contentTitle: blog.title,
      contentSlug: blog.slug,
    });
    if (blog.status === 'published') {
      await logActivity({
        userId: auth,
        action: 'published',
        contentType: 'blog',
        contentId: blog._id,
        contentTitle: blog.title,
        contentSlug: blog.slug,
      });
    }

    return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
