import { NextResponse } from 'next/server';
import slugify from 'slugify';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { generateBlog } from '@/lib/claude';
import { findPhoto } from '@/lib/unsplash';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const startTime = Date.now();

  try {
    /* 1. Auth — shared secret from Google Apps Script */
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.BLOG_INGEST_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    /* 2. Parse input */
    const { title, category } = await request.json();
    if (!title || !category) {
      return NextResponse.json({ error: 'title and category are required' }, { status: 400 });
    }
    console.log(`[blog-gen] Starting: "${title}" in ${category}`);

    /* 3. Generate blog content with Claude */
    const blog = await generateBlog(title, category);
    console.log(`[blog-gen] Claude done in ${Date.now() - startTime}ms`);

    /* 4. Find a matching photo on Unsplash */
    const photo = await findPhoto(blog.imageSearchQuery || title);
    console.log(`[blog-gen] Unsplash done`);

    /* 5. Upload the photo to Cloudinary */
    const uploaded = await cloudinary.uploader.upload(photo.url, {
      folder: 'fareoworld/blog',
      transformation: [
        { width: 1600, height: 900, crop: 'fill', gravity: 'auto' },
        { quality: 'auto:good', fetch_format: 'auto' },
      ],
    });
    console.log(`[blog-gen] Cloudinary done`);

    /* 6. Build slug */
    await dbConnect();
    let slug = slugify(title, { lower: true, strict: true });
    const exists = await Blog.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    /* 7. Calculate reading time */
    const wordCount = blog.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    /* 8. Save to MongoDB */
    const saved = await Blog.create({
      title: blog.title,
      slug,
      category: blog.category,
      categoryIcon: blog.categoryIcon || '📝',
      excerpt: blog.excerpt,
      content: blog.content,
      heroImage: {
        url: uploaded.secure_url,
        alt: blog.imageAlt || title,
        credit: photo.credit,
      },
      author: blog.author || 'Fareoworld Editorial',
      authorInitials: blog.authorInitials || 'FL',
      readingTime,
      faqs: blog.faqs || [],
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      keywords: blog.keywords || [],
      status: 'published',
      publishedAt: new Date(),
    });

    const duration = Date.now() - startTime;
    console.log(`[blog-gen] Done in ${duration}ms: ${saved.slug}`);

    return NextResponse.json({
      success: true,
      slug: saved.slug,
      url: `https://fareoworld.vercel.app/blog/${saved.slug}`,
      wordCount,
      durationMs: duration,
    });
  } catch (err) {
    console.error('[blog-gen] ERROR:', err);
    return NextResponse.json({ error: err.message, success: false }, { status: 500 });
  }
}
