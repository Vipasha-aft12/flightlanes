import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const userId = await verifyAuth();
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  await dbConnect();
  const user = await User.findById(userId).select('-password').lean();
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}
