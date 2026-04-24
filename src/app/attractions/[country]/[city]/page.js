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
    title: `Top Attractions in ${city.name} — Fareoworld`,
    description: `Best places to see in ${city.name}, ${country.name}. Must-visit attractions, landmarks and hidden gems.`,
  };
}

export default async function AttractionsPage({ params }) {
  params = await params;
  const country = getCountry(params.country);
  const city = country?.cities.find(c => c.slug === params.city);
  if (!country || !city) notFound();

  return (
    <SeoLanding
      badge={`Attractions · ${city.name}`}
      title="Top attractions in"
      titleEm={city.name}
      subtitle={`The must-visit landmarks and sights in ${city.name}, ${country.name}.`}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Attractions' },
        { label: country.name },
        { label: city.name },
      ]}
      ctaPrimary={{ label: `See all activities in ${city.name}`, href: `/activities/${country.slug}/${city.slug}/` }}
      ctaSecondary={{ label: `Book hotels here`, href: `/hotels/${country.slug}/${city.slug}/` }}
      bodyBlocks={[
        { heading: `Why book attractions in ${city.name} with Fareoworld`, text: `Skip-the-line tickets, guided tours, and expert local operators — all verified by Fareoworld. Free cancellation on most bookings.` },
      ]}
    />
  );
}
