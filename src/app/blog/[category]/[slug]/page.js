import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getBlogCategory } from '@/lib/seo-data/taxonomies';
import BlogDetailPage from '@/components/blogdetail/BlogDetailPage';

export async function generateMetadata({ params }) {
  params = await params;
  const cat = getBlogCategory(params.category);
  if (!cat) return { title: 'Not found — Fareoworld' };
  return {
    title: `${prettify(params.slug)} — ${cat.name} — Fareoworld`,
    description: `${prettify(params.slug)} — travel guide from Fareoworld.`,
  };
}

export default async function BlogPostPage({ params }) {
  params = await params;
  const cat = getBlogCategory(params.category);
  if (!cat) notFound();

  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <BlogDetailPage slug={params.slug} category={params.category} />
    </Suspense>
  );
}

function prettify(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
