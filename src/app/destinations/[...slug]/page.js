import { notFound } from 'next/navigation';
import { resolveDestinationsPath } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const r = resolveDestinationsPath(params.slug);
  if (!r) return { title: 'Not found — Fareoworld' };
  return buildMetadata(r);
}

export default async function DestinationsCatchAllPage({ params }) {
  params = await params;
  const r = resolveDestinationsPath(params.slug);
  if (!r) notFound();
  return <SeoLanding {...buildProps(r)} />;
}

function buildMetadata(r) {
  switch (r.type) {
    case 'dest-region':
      return { title: `${r.region.name} Travel Guide — Fareoworld`, description: `Plan your trip to ${r.region.name}. Best destinations, things to do, travel tips.` };
    case 'dest-country':
      return { title: `${r.country.name} Travel Guide — Fareoworld`, description: `Everything to know before travelling to ${r.country.name}: top cities, attractions, tips.` };
    case 'dest-state':
      return { title: `${r.state.name}, ${r.country.name} — Travel Guide — Fareoworld`, description: `Visit ${r.state.name}, ${r.country.name}. Best places, things to do, when to visit.` };
    case 'dest-city':
      return { title: `${r.city.name} Travel Guide — Fareoworld`, description: `Things to do in ${r.city.name}, ${r.country.name}. Attractions, hotels, where to eat.` };
    case 'dest-best':
      return { title: `${r.theme.name} — Fareoworld`, description: `${r.theme.name} handpicked by Fareoworld travel editors.` };
    default:
      return { title: 'Fareoworld' };
  }
}

function buildProps(r) {
  switch (r.type) {
    case 'dest-region':
      return {
        badge: r.region.name,
        title: `Discover`,
        titleEm: r.region.name,
        subtitle: `Best destinations, hidden gems, and travel tips across ${r.region.name}.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/destinations/' }, { label: r.region.name }],
        ctaPrimary: { label: `Explore ${r.region.name}`, href: `/destinations/` },
        bodyBlocks: [
          { heading: `Why visit ${r.region.name}?`, text: `${r.region.name} offers something for every traveller — from world-class food and culture to unforgettable landscapes and beaches. Our guides help you plan your first trip or go deeper into the region.` },
        ],
      };

    case 'dest-country':
      return {
        badge: `Visit ${r.country.name}`,
        title: `Travel Guide to`,
        titleEm: r.country.name,
        subtitle: `Everything you need to plan a trip to ${r.country.name}: top cities, best time to visit, where to stay.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/destinations/' }, { label: r.country.name }],
        ctaPrimary: { label: `Book hotels in ${r.country.name}`, href: `/hotels/${r.country.slug}/` },
        ctaSecondary: { label: `See activities`, href: `/activities/` },
        bodyBlocks: [
          { heading: `Planning a trip to ${r.country.name}`, text: `Our Fareoworld editors have put together the essentials for travelling to ${r.country.name}: the best seasons, what to eat, how to get around, and where to base yourself.` },
          ...(r.country.cities.length ? [{ heading: `Popular cities`, list: r.country.cities.map(c => c.name) }] : []),
        ],
        relatedLinks: r.country.cities.map(c => ({ label: `${c.name} travel guide`, href: `/destinations/${r.country.slug}/${c.slug}/` })),
      };

    case 'dest-state':
      return {
        badge: `${r.state.name}, ${r.country.name}`,
        title: `Discover`,
        titleEm: r.state.name,
        subtitle: `Your travel guide to ${r.state.name} in ${r.country.name}.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations/' },
          { label: r.country.name, href: `/destinations/${r.country.slug}/` },
          { label: r.state.name },
        ],
        ctaPrimary: { label: `Hotels in ${r.state.name}`, href: `/hotels/${r.country.slug}/` },
        bodyBlocks: [
          { heading: `Why visit ${r.state.name}?`, text: `${r.state.name} is one of ${r.country.name}'s most distinctive regions. Read our guide for the best places to stay, eat, and explore.` },
        ],
      };

    case 'dest-city':
      return {
        badge: `${r.city.name}, ${r.country.name}`,
        title: `Things to do in`,
        titleEm: r.city.name,
        subtitle: `Your complete travel guide to ${r.city.name} — attractions, hotels, food and when to visit.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations/' },
          { label: r.country.name, href: `/destinations/${r.country.slug}/` },
          { label: r.city.name },
        ],
        ctaPrimary: { label: `Book hotels in ${r.city.name}`, href: `/hotels/${r.country.slug}/${r.city.slug}/` },
        ctaSecondary: { label: `Things to do`, href: `/activities/${r.country.slug}/${r.city.slug}/` },
        bodyBlocks: [
          { heading: `Why visit ${r.city.name}`, text: `${r.city.name} is a must-visit in ${r.country.name}. Our guide covers the best neighbourhoods, top attractions, and insider tips from Fareoworld editors.` },
        ],
        relatedLinks: [
          { label: `Hotels in ${r.city.name}`, href: `/hotels/${r.country.slug}/${r.city.slug}/` },
          { label: `Things to do in ${r.city.name}`, href: `/activities/${r.country.slug}/${r.city.slug}/` },
          { label: `Top attractions`, href: `/attractions/${r.country.slug}/${r.city.slug}/` },
          { label: `Travel guide`, href: `/travel-guide/${r.country.slug}/${r.city.slug}/` },
        ],
      };

    case 'dest-best':
      return {
        badge: 'Editor\'s picks',
        title: r.theme.name,
        subtitle: `Curated by Fareoworld travel editors. Updated regularly.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/destinations/' }, { label: r.theme.name }],
        bodyBlocks: [
          { heading: r.theme.name, text: `Our picks for the ${r.theme.name.toLowerCase()}, chosen by Fareoworld editors based on verified traveller reviews and expert insight.` },
        ],
      };

    default:
      return { title: 'Fareoworld' };
  }
}
