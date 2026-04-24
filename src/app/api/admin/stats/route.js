import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Airline from '@/models/Airline';
import Destination from '@/models/Destination';
import Blog from '@/models/Blog';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  await dbConnect();

  const [totalAirlines, publishedAirlines, totalDestinations, publishedDestinations, totalBlogs, publishedBlogs] = await Promise.all([
    Airline.countDocuments(),
    Airline.countDocuments({ status: 'published' }),
    Destination.countDocuments(),
    Destination.countDocuments({ status: 'published' }),
    Blog.countDocuments(),
    Blog.countDocuments({ status: 'published' }),
  ]);

  const recentAirlines = await Airline.find().sort({ createdAt: -1 }).limit(5).select('name code slug category badge cardImg heroImg status').lean();
  const recentDestinations = await Destination.find().sort({ createdAt: -1 }).limit(5).select('name slug continent region flag cardImg heroImg status').lean();
  const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).select('title slug category categoryIcon heroImage status publishedAt').lean();

  return NextResponse.json({
    totalAirlines, publishedAirlines, draftAirlines: totalAirlines - publishedAirlines,
    totalDestinations, publishedDestinations, draftDestinations: totalDestinations - publishedDestinations,
    totalBlogs, publishedBlogs, draftBlogs: totalBlogs - publishedBlogs,
    recentAirlines: JSON.parse(JSON.stringify(recentAirlines)),
    recentDestinations: JSON.parse(JSON.stringify(recentDestinations)),
    recentBlogs: JSON.parse(JSON.stringify(recentBlogs)),
  });
}
