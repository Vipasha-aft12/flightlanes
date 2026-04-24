import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ActivityLog from '@/models/ActivityLog';
import { requireAdmin } from '@/lib/auth';

/*
 * GET /api/admin/activity-logs — paginated content-action history.
 * Admin-only (so you can audit your SEO team's work).
 *
 * Query params:
 *   page        — default 1
 *   limit       — default 50, max 200
 *   email       — filter to one user
 *   contentType — 'airline' | 'destination' | 'blog'
 *   action      — 'created' | 'updated' | 'published' | 'unpublished' | 'deleted'
 *
 * Response: { logs, total, page, limit, pages }
 */
export async function GET(request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  await dbConnect();
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(200, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
  const email = searchParams.get('email');
  const contentType = searchParams.get('contentType');
  const action = searchParams.get('action');

  const query = {};
  if (email) query.userEmail = email.toLowerCase().trim();
  if (contentType && ['airline', 'destination', 'blog'].includes(contentType)) query.contentType = contentType;
  if (action && ['created', 'updated', 'published', 'unpublished', 'deleted'].includes(action)) query.action = action;

  const [logs, total] = await Promise.all([
    ActivityLog.find(query)
      .sort({ performedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ActivityLog.countDocuments(query),
  ]);

  return NextResponse.json({
    logs: JSON.parse(JSON.stringify(logs)),
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
  });
}
