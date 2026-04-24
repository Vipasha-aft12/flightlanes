import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

/* GET /api/admin/users — list all users (admin only) */
export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const users = await User.find().sort({ createdAt: -1 }).select('-password').lean();
  return NextResponse.json({ users: JSON.parse(JSON.stringify(users)) });
}

/*
 * POST /api/admin/users — create a new user (admin only)
 * Body: { name, email, password, role? }
 *
 * This is how admins create SEO executive accounts. role defaults to 'editor'.
 * Only 'admin' and 'editor' are accepted.
 */
export async function POST(request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    const normalizedRole = role === 'admin' ? 'admin' : 'editor';

    await dbConnect();
    const emailLower = email.toLowerCase().trim();
    const existing = await User.findOne({ email: emailLower });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const user = await User.create({
      name: name.trim(),
      email: emailLower,
      password, /* hashed by the pre-save hook on the User model */
      role: normalizedRole,
    });

    /* Never return the password hash */
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
