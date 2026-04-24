import { notFound } from 'next/navigation';
import { getBlogCategory } from '@/lib/seo-data/taxonomies';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const cat = getBlogCategory(params.category);
  if (!cat) return { title: 'Not found — Fareoworld' };
  return { title: `${cat.name} — Fareoworld Blog`, description: `${cat.name} articles and travel advice from Fareoworld editors.` };
}

export default async function BlogCategoryPage({ params }) {
  params = await params;
  const cat = getBlogCategory(params.category);
  if (!cat) notFound();

  return (
    <SeoLanding
      badge={`Blog · ${cat.name}`}
      title={cat.name}
      subtitle={`The latest ${cat.name.toLowerCase()} stories and guides from our travel editors.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: cat.name }]}
      ctaPrimary={{ label: 'All blog posts', href: '/blog/' }}
      bodyBlocks={[
        { heading: `${cat.name} — curated by Fareoworld`, text: `Our editors cover the best stories in ${cat.name.toLowerCase()} — hands-on tips, destination insights and expert interviews.` },
      ]}
    />
  );
}
