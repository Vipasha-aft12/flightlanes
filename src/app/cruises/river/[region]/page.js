import { notFound } from 'next/navigation';
import { getRegion } from '@/lib/seo-data/locations';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const region = getRegion(params.region);
  if (!region) return { title: 'Not found — Fareoworld' };
  return { title: `${region.name} River Cruises — Fareoworld`, description: `Best river cruises in ${region.name}. Book with free cancellation.` };
}

export default async function RiverCruisePage({ params }) {
  params = await params;
  const region = getRegion(params.region);
  if (!region) notFound();

  return (
    <SeoLanding
      badge={`River Cruises`}
      title={`${region.name} River`}
      titleEm="Cruises"
      subtitle={`Explore ${region.name} by river with handpicked cruise operators and best-rate pricing.`}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cruises', href: '/cruises/' },
        { label: 'River' },
        { label: region.name },
      ]}
      ctaPrimary={{ label: `See ${region.name} river cruises`, href: `/cruises/results?type=river&region=${region.slug}` }}
      bodyBlocks={[
        { heading: `Why a river cruise in ${region.name}?`, text: `River cruises offer a slower, more intimate way to see ${region.name}. Ports are right in the heart of historic towns, unlike ocean cruise terminals.` },
      ]}
    />
  );
}
