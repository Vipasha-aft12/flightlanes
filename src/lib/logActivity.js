import dbConnect from './mongodb';
import User from '@/models/User';
import ActivityLog from '@/models/ActivityLog';

/*
 * logActivity — record one admin action.
 *
 * Wrapped in try/catch at the call site so a logging failure never blocks
 * a legitimate admin operation. Pass in everything we want to remember,
 * including the content title so logs remain readable if the content is
 * later deleted.
 *
 * Usage inside an admin API route, after the operation succeeds:
 *
 *   await logActivity({
 *     userId,                 // from requireStaff()
 *     action: 'published',    // 'created' | 'updated' | 'published' | 'unpublished' | 'deleted'
 *     contentType: 'airline',
 *     contentId: airline._id,
 *     contentTitle: airline.name,
 *     contentSlug: airline.slug,
 *   });
 */
export async function logActivity({ userId, action, contentType, contentId, contentTitle, contentSlug }) {
  try {
    await dbConnect();

    /* Look up user details so the log entry is self-contained */
    let userName, userEmail, userRole;
    if (userId) {
      const user = await User.findById(userId).select('name email role').lean();
      if (user) {
        userName = user.name;
        userEmail = user.email;
        userRole = user.role;
      }
    }

    await ActivityLog.create({
      userId,
      userName,
      userEmail,
      userRole,
      action,
      contentType,
      contentId: contentId ? String(contentId) : undefined,
      contentTitle,
      contentSlug,
      performedAt: new Date(),
    });
  } catch (err) {
    /* Never let a logging failure break an admin action */
    console.error('Failed to write activity log:', err);
  }
}
