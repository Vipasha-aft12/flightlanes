import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireStaff } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  /* Auth check */
  const auth = await requireStaff();
  if (auth instanceof Response) return auth;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    /* Convert file to base64 data URI */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    /* Upload to Cloudinary with auto-optimization */
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'fareoworld/admin',
      resource_type: 'image',
      transformation: [
        { width: 1600, height: 900, crop: 'fill', gravity: 'auto' },
        { quality: 'auto:good', fetch_format: 'auto' },
      ],
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
