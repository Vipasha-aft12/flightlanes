import { notFound } from 'next/navigation';
import { resolveCruisesPath } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const r = resolveCruisesPath(params.slug);
  if (!r) return { title: 'Not found — Fareoworld' };
  if (r.type === 'cruise-region') return { title: `${r.region.name} Cruises — Fareoworld`, description: `Best ${r.region.name} cruise deals and itineraries.` };
  return { title: `${r.itineraryName} — Fareoworld`, description: `Book ${r.itineraryName} cruise with Fareoworld.` };
}

export default async function CruisesCatchAllPage({ params }) {
  params = await params;
  const r = resolveCruisesPath(params.slug);
  if (!r) notFound();

  if (r.type === 'cruise-region') {
    return (
      <SeoLanding
        badge={`${r.region.name} Cruises`}
        title="Cruise"
        titleEm={r.region.name}
        subtitle={`Explore ${r.region.name} with handpicked cruise itineraries. Best rates, verified reviews.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cruises', href: '/cruises/' }, { label: r.region.name }]}
        ctaPrimary={{ label: `See ${r.region.name} cruises`, href: `/cruises/results?region=${r.region.slug}` }}
        bodyBlocks={[
          { heading: `Why book ${r.region.name} cruises with Fareoworld`, text: `We compare every major cruise line so you always get the best rate for your chosen itinerary in ${r.region.name}.` },
        ]}
      />
    );
  }

  // cruise-itinerary
  return (
    <SeoLanding
      badge={`Itinerary · ${r.region.name}`}
      title={r.itineraryName}
      subtitle={`Cruise itinerary in ${r.region.name}.`}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cruises', href: '/cruises/' },
        { label: r.region.name, href: `/cruises/${r.region.slug}/` },
        { label: r.itineraryName },
      ]}
      ctaPrimary={{ label: `Book this cruise`, href: `/cruises/results?itinerary=${r.itinerarySlug}` }}
      bodyBlocks={[
        { heading: r.itineraryName, text: `Popular ${r.region.name} cruise itinerary. Book with Fareoworld for the best rate.` },
      ]}
    />
  );
}
