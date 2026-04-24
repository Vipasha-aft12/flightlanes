import mongoose from 'mongoose';

/*
 * LoginLog — one document per successful login.
 *
 * Stored fields:
 *   userId    — which user logged in
 *   email     — email at the time of login (denormalized so logs stay readable
 *               even if the user is later renamed or deleted)
 *   name      — name at the time of login (same reason)
 *   role      — role at the time of login
 *   ip        — IP address the request came from
 *   userAgent — browser/device string
 *   loggedAt  — when the login happened
 *
 * We do not log failed attempts here; that requires rate limiting first.
 */
const LoginLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    email: { type: String, required: true, index: true },
    name: { type: String },
    role: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    loggedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export default mongoose.models.LoginLog || mongoose.model('LoginLog', LoginLogSchema);
