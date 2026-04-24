import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const query = { status: 'published' };
  if (category && category !== 'all') query.category = category;

  const blogs = await Blog.find(query)
    .sort({ publishedAt: -1 })
    .select('title slug category categoryIcon excerpt heroImage author authorInitials readingTime publishedAt')
    .lean();

  return NextResponse.json({ blogs: JSON.parse(JSON.stringify(blogs)) });
}
