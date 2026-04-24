import { notFound } from 'next/navigation';
import { resolvePackagesPath } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const r = resolvePackagesPath(params.slug);
  if (!r) return { title: 'Not found — Fareoworld' };
  return buildMetadata(r);
}

export default async function PackagesCatchAllPage({ params }) {
  params = await params;
  const r = resolvePackagesPath(params.slug);
  if (!r) notFound();
  return <SeoLanding {...buildProps(r)} />;
}

function buildMetadata(r) {
  switch (r.type) {
    case 'pkg-destination':
      return { title: `${r.destination.name} Holiday Packages — Fareoworld`, description: `Best holiday packages for ${r.destination.name}. Flights + hotels + activities bundled.` };
    case 'pkg-origin-to-dest':
      return { title: `${r.origin.name} to ${r.destination.name} Packages — Fareoworld`, description: `Holiday packages from ${r.origin.name} to ${r.destination.name}.` };
    case 'pkg-theme':
      return { title: `${r.theme.name} Packages — Fareoworld`, description: `${r.theme.name} holiday packages curated by Fareoworld.` };
    case 'pkg-theme-destination':
      return { title: `${r.destination.name} ${r.theme.name} Packages — Fareoworld`, description: `${r.theme.name} packages to ${r.destination.name}.` };
    case 'pkg-duration':
      return { title: `${r.duration.nights}-night ${r.destination.name} Packages — Fareoworld`, description: `${r.duration.nights}-night holiday packages to ${r.destination.name}.` };
    case 'pkg-budget':
      return { title: `Budget ${r.destination.name} Packages — Fareoworld`, description: `Affordable ${r.destination.name} holiday packages.` };
    case 'pkg-individual':
      return { title: `${r.packageName} — ${r.destination.name} — Fareoworld`, description: `${r.packageName} in ${r.destination.name}. Book with Fareoworld.` };
    default:
      return { title: 'Fareoworld' };
  }
}

function buildProps(r) {
  switch (r.type) {
    case 'pkg-destination':
      return {
        badge: `${r.destination.name} Packages`,
        title: `Holiday packages to`,
        titleEm: r.destination.name,
        subtitle: `All-inclusive holiday packages to ${r.destination.name}. Flights, hotels and activities bundled.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages/' }, { label: r.destination.name }],
        ctaPrimary: { label: `See ${r.destination.name} packages`, href: `/packages/results?destination=${r.destination.slug}` },
        bodyBlocks: [
          { heading: `Why book a ${r.destination.name} package with Fareoworld`, text: `Bundling flights, hotel and activities saves on average 20–30% vs booking separately. Our ${r.destination.name} packages come with flexible dates, free cancellation on most bookings and 24/7 support.` },
        ],
        relatedLinks: [
          { label: `Honeymoon packages ${r.destination.name}`, href: `/packages/honeymoon/${r.destination.slug}/` },
          { label: `Family packages ${r.destination.name}`, href: `/packages/family/${r.destination.slug}/` },
          { label: `Budget ${r.destination.name}`, href: `/packages/${r.destination.slug}/budget/` },
          { label: `7-night ${r.destination.name}`, href: `/packages/${r.destination.slug}/7-nights/` },
        ],
      };

    case 'pkg-origin-to-dest':
      return {
        badge: `${r.origin.name} → ${r.destination.name}`,
        title: `${r.origin.name} to`,
        titleEm: `${r.destination.name}`,
        subtitle: `Holiday packages from ${r.origin.name} to ${r.destination.name}. Flights, hotels, transfers included.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages/' }, { label: `${r.origin.name} → ${r.destination.name}` }],
        ctaPrimary: { label: `See packages`, href: `/packages/results?origin=${r.origin.slug}&destination=${r.destination.slug}` },
        bodyBlocks: [
          { heading: `${r.origin.name} to ${r.destination.name} travel`, text: `Our packages from ${r.origin.name} to ${r.destination.name} include flights, hotel stays, and often airport transfers. Best rates guaranteed.` },
        ],
      };

    case 'pkg-theme':
      return {
        badge: r.theme.name,
        title: `${r.theme.name} holiday`,
        titleEm: 'packages',
        subtitle: `Curated ${r.theme.name.toLowerCase()} holiday packages to destinations around the world.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages/' }, { label: r.theme.name }],
        ctaPrimary: { label: `See ${r.theme.name.toLowerCase()} packages`, href: `/packages/results?theme=${r.theme.slug}` },
        bodyBlocks: [
          { heading: `${r.theme.name} packages with Fareoworld`, text: `Our editors curate the best ${r.theme.name.toLowerCase()} holiday packages across our destinations — bundled flights, accommodation and activities at great rates.` },
        ],
      };

    case 'pkg-theme-destination':
      return {
        badge: `${r.theme.name} · ${r.destination.name}`,
        title: `${r.destination.name} ${r.theme.name}`,
        titleEm: 'packages',
        subtitle: `${r.theme.name} holiday packages to ${r.destination.name}. Handpicked by Fareoworld.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Packages', href: '/packages/' },
          { label: r.theme.name, href: `/packages/${r.theme.slug}/` },
          { label: r.destination.name },
        ],
        ctaPrimary: { label: `See ${r.theme.name.toLowerCase()} packages`, href: `/packages/results?theme=${r.theme.slug}&destination=${r.destination.slug}` },
        bodyBlocks: [
          { heading: `Why book a ${r.theme.name.toLowerCase()} ${r.destination.name} package`, text: `Our ${r.theme.name.toLowerCase()} packages to ${r.destination.name} are chosen for their quality, value and traveller reviews. Flights, hotel and local activities bundled.` },
        ],
      };

    case 'pkg-duration':
      return {
        badge: `${r.duration.nights} nights · ${r.destination.name}`,
        title: `${r.duration.nights}-night`,
        titleEm: `${r.destination.name}`,
        subtitle: `${r.duration.nights}-night holiday packages to ${r.destination.name}. Flights + hotel bundled.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Packages', href: '/packages/' },
          { label: r.destination.name, href: `/packages/${r.destination.slug}/` },
          { label: `${r.duration.nights} nights` },
        ],
        ctaPrimary: { label: `See ${r.duration.nights}-night packages`, href: `/packages/results?destination=${r.destination.slug}&nights=${r.duration.nights}` },
        bodyBlocks: [
          { heading: `${r.duration.nights}-night ${r.destination.name} packages`, text: `Perfect for a ${r.duration.nights}-night trip to ${r.destination.name}. Our packages include return flights and hotel.` },
        ],
      };

    case 'pkg-budget':
      return {
        badge: `Budget · ${r.destination.name}`,
        title: `Budget`,
        titleEm: `${r.destination.name}`,
        subtitle: `Affordable holiday packages to ${r.destination.name}. Best value for price-conscious travellers.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Packages', href: '/packages/' },
          { label: r.destination.name, href: `/packages/${r.destination.slug}/` },
          { label: 'Budget' },
        ],
        ctaPrimary: { label: `See budget packages`, href: `/packages/results?destination=${r.destination.slug}&tier=budget` },
        bodyBlocks: [
          { heading: `Budget ${r.destination.name} packages`, text: `All the highlights of ${r.destination.name} at an affordable price. Our budget packages still include return flights, hotel and essential transfers.` },
        ],
      };

    case 'pkg-individual':
      return {
        badge: `Package · ${r.destination.name}`,
        title: r.packageName,
        subtitle: `${r.destination.name} — full itinerary with flights, hotel and activities.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Packages', href: '/packages/' },
          { label: r.destination.name, href: `/packages/${r.destination.slug}/` },
          { label: r.packageName },
        ],
        ctaPrimary: { label: `Book this package`, href: `/packages/results?package=${r.packageSlug}` },
        bodyBlocks: [
          { heading: `About ${r.packageName}`, text: `Handpicked package for ${r.destination.name} with return flights, hotel stay and curated activities included.` },
        ],
      };

    default:
      return { title: 'Fareoworld' };
  }
}
