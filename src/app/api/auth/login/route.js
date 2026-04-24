import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import LoginLog from '@/models/LoginLog';
import { signToken } from '@/lib/auth';

/* Pull client IP from standard proxy headers with a safe fallback */
function getClientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    /* Record the successful login.
       We use try/catch here so that a logging failure never blocks a legitimate
       user from signing in — auth must keep working even if logging is down. */
    try {
      await LoginLog.create({
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        ip: getClientIp(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
      });
    } catch (logErr) {
      console.error('Failed to write login log:', logErr);
    }

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
