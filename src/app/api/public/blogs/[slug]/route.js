import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;
  const blog = await Blog.findOne({ slug, status: 'published' }).lean();
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
}
