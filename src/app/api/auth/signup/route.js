import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

/*
 * Signup policy:
 *   - If NO users exist in the database yet, the signup request creates the
 *     very first account and assigns role 'admin'. This bootstraps the system.
 *   - Once any account exists, signup is closed. New admins must be created
 *     directly in the database or via a future invite flow.
 *
 * This prevents the previous security hole where any visitor could sign up
 * and receive full admin API access.
 */
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await dbConnect();

    /* Bootstrap: only allow signup when the users collection is empty */
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        { error: 'Signup is disabled. Contact your administrator.' },
        { status: 403 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    /* First user gets admin role */
    const user = await User.create({ name, email, password, role: 'admin' });
    const token = signToken(user._id);

    const response = NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set('fl_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
