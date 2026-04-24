import { notFound } from 'next/navigation';
import { getCountry } from '@/lib/seo-data/locations';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const country = getCountry(params.country);
  const city = country?.cities.find(c => c.slug === params.city);
  if (!country || !city) return { title: 'Not found — Fareoworld' };
  return {
    title: `${city.name} Travel Guide — Fareoworld`,
    description: `Everything you need to plan a trip to ${city.name}, ${country.name}.`,
  };
}

export default async function TravelGuideCityPage({ params }) {
  params = await params;
  const country = getCountry(params.country);
  const city = country?.cities.find(c => c.slug === params.city);
  if (!country || !city) notFound();

  return (
    <SeoLanding
      badge={`Travel guide · ${city.name}`}
      title={`${city.name}`}
      titleEm="travel guide"
      subtitle={`Everything you need to plan your trip to ${city.name}, ${country.name}. Best neighbourhoods, where to eat, how to get around.`}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Travel Guides' },
        { label: country.name },
        { label: city.name },
      ]}
      ctaPrimary={{ label: `Book hotels in ${city.name}`, href: `/hotels/${country.slug}/${city.slug}/` }}
      ctaSecondary={{ label: 'See itineraries', href: `/itineraries/3-days-in-${city.slug}/` }}
      bodyBlocks={[
        { heading: `Planning a trip to ${city.name}`, text: `Our Fareoworld editors put together the essentials for travelling to ${city.name}: best seasons, neighbourhoods, local customs, and practical tips.` },
      ]}
    />
  );
}
