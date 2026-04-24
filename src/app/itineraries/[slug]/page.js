import { notFound } from 'next/navigation';
import { parseItinerarySlug } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const r = parseItinerarySlug(params.slug);
  if (!r) return { title: 'Not found — Fareoworld' };
  return {
    title: `${r.days} days in ${r.cityName} — Itinerary — Fareoworld`,
    description: `Perfect ${r.days}-day itinerary for ${r.cityName}. Day-by-day plan with tips from Fareoworld.`,
  };
}

export default async function ItineraryPage({ params }) {
  params = await params;
  const r = parseItinerarySlug(params.slug);
  if (!r) notFound();

  return (
    <SeoLanding
      badge={`${r.days}-day itinerary`}
      title={`${r.days} days in`}
      titleEm={r.cityName}
      subtitle={`A complete ${r.days}-day guide to ${r.cityName} — what to see, where to eat, where to stay.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Itineraries' }, { label: `${r.days} days in ${r.cityName}` }]}
      ctaPrimary={r.city ? { label: `Book a hotel in ${r.cityName}`, href: `/hotels/${r.country.slug}/${r.city.slug}/` } : { label: 'See all hotels', href: '/hotels' }}
      ctaSecondary={r.city ? { label: `Things to do`, href: `/activities/${r.country.slug}/${r.city.slug}/` } : null}
      bodyBlocks={[
        { heading: `Your ${r.days}-day plan for ${r.cityName}`, text: `Our editors have built this ${r.days}-day itinerary to show you the best of ${r.cityName} without feeling rushed. Pace yourself, follow the plan, swap days around to suit your energy.` },
      ]}
    />
  );
}
