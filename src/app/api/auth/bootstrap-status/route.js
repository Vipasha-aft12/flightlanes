import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

/*
 * GET /api/auth/bootstrap-status
 * Returns { needsBootstrap: boolean }.
 *
 * Used by the login page to decide whether to show the "Create account"
 * tab. Once any user exists, signup is closed and this returns false.
 * This endpoint is intentionally public and leaks only a single boolean.
 */
export async function GET() {
  try {
    await dbConnect();
    const count = await User.countDocuments();
    return NextResponse.json({ needsBootstrap: count === 0 });
  } catch (err) {
    /* On error, err on the side of hiding signup. Safer default. */
    return NextResponse.json({ needsBootstrap: false });
  }
}
