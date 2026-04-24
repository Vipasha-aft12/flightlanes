import mongoose from 'mongoose';

/*
 * ActivityLog — one document per admin content action.
 *
 * We record who did what, when, and on which piece of content.
 * Fields are denormalized (we store userEmail, userName, contentTitle
 * at the time of the action) so the log stays readable even if the
 * underlying user or content is later deleted or renamed.
 *
 * action values: 'created' | 'updated' | 'published' | 'unpublished' | 'deleted'
 * contentType values: 'airline' | 'destination' | 'blog'
 */
const ActivityLogSchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    userName:     { type: String },
    userEmail:    { type: String, index: true },
    userRole:     { type: String },

    action:       { type: String, required: true, index: true },
    contentType:  { type: String, required: true, index: true },
    contentId:    { type: String },      /* stringified ObjectId */
    contentTitle: { type: String },      /* e.g. airline name, destination name, blog title */
    contentSlug:  { type: String },      /* useful for linking back to the live page */

    performedAt:  { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
