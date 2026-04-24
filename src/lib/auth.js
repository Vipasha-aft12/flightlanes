import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from './mongodb';
import User from '@/models/User';

/* ── Config ── */
const SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'fl_admin_token';

/* Fail fast if secret missing — avoids silent cryptic errors later */
function getSecret() {
  if (!SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return SECRET;
}

/* ── Token helpers ── */
export function signToken(userId) {
  return jwt.sign({ userId: userId.toString() }, getSecret(), { expiresIn: '7d' });
}

/* Returns userId string if token valid, otherwise null. Never throws. */
export async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, getSecret());
    return decoded.userId;
  } catch {
    return null;
  }
}

/* Returns userId string, or a 401 Response if not logged in.
   Used at the top of admin API routes. Caller must check `instanceof Response`. */
export async function requireAuth() {
  const userId = await verifyAuth();
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return userId;
}

/* Returns userId string if user exists AND has role 'admin'.
   Returns a 401 or 403 Response otherwise. Caller must check `instanceof Response`.
   Use this for sensitive operations: user management, login logs. */
export async function requireAdmin() {
  const userId = await verifyAuth();
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  await dbConnect();
  const user = await User.findById(userId).select('role').lean();
  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden — admin access required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return userId;
}

/* Returns userId string if user exists AND has role 'admin' OR 'editor'.
   Used for content-management routes (airlines, destinations, blogs) that
   both admins AND editors may access. */
export async function requireStaff() {
  const userId = await verifyAuth();
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  await dbConnect();
  const user = await User.findById(userId).select('role').lean();
  if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
    return new Response(JSON.stringify({ error: 'Forbidden — staff access required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return userId;
}
