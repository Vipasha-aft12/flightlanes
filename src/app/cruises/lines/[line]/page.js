import { notFound } from 'next/navigation';
import { getCruiseLine } from '@/lib/seo-data/taxonomies';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const line = getCruiseLine(params.line);
  if (!line) return { title: 'Not found — Fareoworld' };
  return { title: `${line.name} Cruises — Fareoworld`, description: `Book ${line.name} cruises with Fareoworld. Best rates on all routes and ships.` };
}

export default async function CruiseLinePage({ params }) {
  params = await params;
  const line = getCruiseLine(params.line);
  if (!line) notFound();

  return (
    <SeoLanding
      badge={`Cruise Line`}
      title={line.name}
      titleEm="Cruises"
      subtitle={`Book ${line.name} cruises with Fareoworld — best rates, verified reviews, instant confirmation.`}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cruises', href: '/cruises/' },
        { label: 'Lines' },
        { label: line.name },
      ]}
      ctaPrimary={{ label: `See ${line.name} cruises`, href: `/cruises/results?line=${line.slug}` }}
      bodyBlocks={[
        { heading: `About ${line.name}`, text: `${line.name} is one of the world's leading cruise lines. We list every route and ship with best-rate pricing.` },
      ]}
    />
  );
}
