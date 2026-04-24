import { notFound } from 'next/navigation';
import { resolveActivitiesPath } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const r = resolveActivitiesPath(params.slug);
  if (!r) return { title: 'Not found — Fareoworld' };
  return buildMetadata(r);
}

export default async function ActivitiesCatchAllPage({ params }) {
  params = await params;
  const r = resolveActivitiesPath(params.slug);
  if (!r) notFound();
  return <SeoLanding {...buildProps(r)} />;
}

function buildMetadata(r) {
  switch (r.type) {
    case 'activities-city':
      return { title: `Things to do in ${r.city.name} — Fareoworld`, description: `Tours, activities and attractions in ${r.city.name}, ${r.country.name}.` };
    case 'activities-category':
      return { title: `${r.category.name} in ${r.city.name} — Fareoworld`, description: `${r.category.name} activities in ${r.city.name}, ${r.country.name}.` };
    case 'activity-detail':
      return { title: `${r.name} in ${r.city.name} — Fareoworld`, description: `Book ${r.name} in ${r.city.name} with Fareoworld.` };
    default:
      return { title: 'Fareoworld' };
  }
}

function buildProps(r) {
  switch (r.type) {
    case 'activities-city':
      return {
        badge: `Activities in ${r.city.name}`,
        title: `Things to do in`,
        titleEm: r.city.name,
        subtitle: `Handpicked tours, attractions and experiences in ${r.city.name}, ${r.country.name}.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Activities', href: '/activities/' },
          { label: r.country.name },
          { label: r.city.name },
        ],
        ctaPrimary: { label: `Book an activity`, href: `/activities/results?city=${r.city.slug}` },
        bodyBlocks: [
          { heading: `Why book activities in ${r.city.name} with Fareoworld`, text: `We partner with vetted local operators so every activity in ${r.city.name} comes with verified reviews, clear pricing and free cancellation on most bookings.` },
        ],
        relatedLinks: [
          { label: `Adventure in ${r.city.name}`, href: `/activities/${r.country.slug}/${r.city.slug}/adventure/` },
          { label: `Sightseeing in ${r.city.name}`, href: `/activities/${r.country.slug}/${r.city.slug}/sightseeing/` },
          { label: `Cultural tours in ${r.city.name}`, href: `/activities/${r.country.slug}/${r.city.slug}/cultural/` },
          { label: `Top attractions`, href: `/attractions/${r.country.slug}/${r.city.slug}/` },
        ],
      };

    case 'activities-category':
      return {
        badge: `${r.category.name} · ${r.city.name}`,
        title: `${r.category.name} in`,
        titleEm: r.city.name,
        subtitle: `Best ${r.category.name.toLowerCase()} activities and tours in ${r.city.name}, ${r.country.name}.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Activities', href: '/activities/' },
          { label: r.country.name },
          { label: r.city.name, href: `/activities/${r.country.slug}/${r.city.slug}/` },
          { label: r.category.name },
        ],
        ctaPrimary: { label: `See ${r.category.name.toLowerCase()} activities`, href: `/activities/results?city=${r.city.slug}&cat=${r.category.slug}` },
        bodyBlocks: [
          { heading: `${r.category.name} in ${r.city.name}`, text: `Handpicked ${r.category.name.toLowerCase()} activities and tours in ${r.city.name}. Verified local operators, clear pricing.` },
        ],
      };

    case 'activity-detail':
      return {
        badge: `Activity · ${r.city.name}`,
        title: r.name,
        subtitle: `${r.city.name}, ${r.country.name}`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Activities', href: '/activities/' },
          { label: r.country.name },
          { label: r.city.name, href: `/activities/${r.country.slug}/${r.city.slug}/` },
          { label: r.name },
        ],
        ctaPrimary: { label: `Book this activity`, href: `/activities/results?activity=${r.slug}` },
        bodyBlocks: [
          { heading: `About ${r.name}`, text: `${r.name} is one of the most popular activities in ${r.city.name}. Book through Fareoworld for verified local operators and the best price.` },
        ],
      };

    default:
      return { title: 'Fareoworld' };
  }
}
