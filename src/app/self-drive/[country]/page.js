import { notFound } from 'next/navigation';
import { getCountry } from '@/lib/seo-data/locations';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const country = getCountry(params.country);
  if (!country) return { title: 'Not found — Fareoworld' };
  return {
    title: `Self-drive holidays in ${country.name} — Fareoworld`,
    description: `Plan a road trip through ${country.name} with our curated self-drive itineraries and car rental deals.`,
  };
}

export default async function SelfDrivePage({ params }) {
  params = await params;
  const country = getCountry(params.country);
  if (!country) notFound();

  return (
    <SeoLanding
      badge={`Self-drive · ${country.name}`}
      title="Self-drive"
      titleEm={country.name}
      subtitle={`Hit the open road in ${country.name}. Curated self-drive itineraries with rental cars, hotels and route planning.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Self-Drive' }, { label: country.name }]}
      ctaPrimary={{ label: `Plan your ${country.name} road trip`, href: `/car-rentals/results?country=${country.slug}&trip=selfdrive` }}
      bodyBlocks={[
        { heading: `Why self-drive in ${country.name}?`, text: `Self-driving in ${country.name} gives you total freedom to explore at your own pace — stop wherever looks good, skip crowded tour buses, and discover places the big tours miss.` },
      ]}
    />
  );
}
