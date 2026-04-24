import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema(
  { question: String, answer: String },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    categoryIcon: { type: String, default: '📝' },
    excerpt: { type: String, maxlength: 300 },
    content: { type: String, required: true },
    heroImage: {
      url: { type: String, required: true },
      alt: { type: String, default: '' },
      credit: { type: String },
    },
    author: { type: String, default: 'Fareoworld Editorial' },
    authorInitials: { type: String, default: 'FL' },
    readingTime: { type: Number, default: 7 },
    faqs: [FaqSchema],
    metaTitle: { type: String, maxlength: 70 },
    metaDescription: { type: String, maxlength: 170 },
    keywords: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
