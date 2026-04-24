import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LoginLog from '@/models/LoginLog';
import { requireAdmin } from '@/lib/auth';

/*
 * GET /api/admin/login-logs — list login history (admin only).
 *
 * Query params:
 *   page  — 1-indexed page number, default 1
 *   limit — page size, default 50, max 200
 *   email — optional exact-match filter
 *
 * Response: { logs, total, page, limit, pages }
 */
export async function GET(request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limitRaw = parseInt(searchParams.get('limit') || '50', 10);
  const limit = Math.min(200, Math.max(1, limitRaw));
  const email = searchParams.get('email');

  const query = {};
  if (email) query.email = email.toLowerCase().trim();

  const [logs, total] = await Promise.all([
    LoginLog.find(query)
      .sort({ loggedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    LoginLog.countDocuments(query),
  ]);

  return NextResponse.json({
    logs: JSON.parse(JSON.stringify(logs)),
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
  });
}
