import { notFound } from 'next/navigation';
import { resolveHotelsPath } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/hotels/hotels.css';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const resolved = resolveHotelsPath(params.slug);
  if (!resolved) return { title: 'Not found — Fareoworld' };
  return buildMetadata(resolved);
}

export default async function HotelsCatchAllPage({ params }) {
  params = await params;
  const resolved = resolveHotelsPath(params.slug);
  if (!resolved) notFound();

  const props = buildProps(resolved);
  return <SeoLanding {...props} />;
}

/* ─────────────── metadata + props builders ─────────────── */

function buildMetadata(r) {
  const base = 'Fareoworld';
  switch (r.type) {
    case 'hotel-country':
      return {
        title: `🏨 Hotels in ${r.country.name} — ${base}`,
        description: `Book hotels in ${r.country.name}. Compare prices on 500,000+ properties with best rate guarantee.`,
      };
    case 'hotel-city':
      return {
        title: `🏨 Hotels in ${r.city.name}, ${r.country.name} — ${base}`,
        description: `Find the best hotels in ${r.city.name}. Compare rates, read reviews, and book with free cancellation on eligible properties.`,
      };
    case 'hotel-area':
      return {
        title: `Hotels near ${r.area.name}, ${r.city.name} — ${base}`,
        description: `Book hotels in ${r.area.name}, ${r.city.name}, ${r.country.name}. Best prices guaranteed.`,
      };
    case 'hotel-property':
      return {
        title: `${prettify(r.nameSlug)} — ${r.city.name} — ${base}`,
        description: `Book ${prettify(r.nameSlug)} in ${r.city.name}. Compare rates and read verified guest reviews.`,
      };
    case 'hotel-theme-city':
      return {
        title: `${r.theme.name} Hotels in ${r.city.name} — ${base}`,
        description: `Handpicked ${r.theme.name.toLowerCase()} hotels in ${r.city.name}, ${r.country.name}. Best rates guaranteed.`,
      };
    case 'hotel-near-airport':
      return {
        title: `Hotels near ${r.airport.name} (${r.airport.iata.toUpperCase()}) — ${base}`,
        description: `Book hotels near ${r.airport.name}, ${r.airport.city}. Perfect for early flights and long layovers.`,
      };
    default:
      return { title: base };
  }
}

function buildProps(r) {
  switch (r.type) {
    case 'hotel-country':
      return {
        badge: `🏨 Hotels in ${r.country.name}`,
        title: `Hotels in`,
        titleEm: r.country.name,
        subtitle: `Compare hotels across ${r.country.cities.length}+ cities in ${r.country.name}. Best rate guaranteed with free cancellation.`,
        breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Hotels', href: '/hotels/' }, { label: r.country.name }],
        ctaPrimary: { label: `Search hotels in ${r.country.name}`, href: `/hotels/listing?country=${r.country.slug}` },
        bodyBlocks: [
          { heading: `Why book hotels in ${r.country.name} with Fareoworld?`, text: `From luxury resorts to budget stays, we compare every major hotel brand in ${r.country.name} so you get the best rate every time. Free cancellation on most bookings, no hidden fees.` },
          { heading: `Popular cities for hotels in ${r.country.name}`, list: r.country.cities.map(c => c.name) },
        ],
        relatedLinks: r.country.cities.map(c => ({ label: `Hotels in ${c.name}`, href: `/hotels/${r.country.slug}/${c.slug}/` })),
      };

    case 'hotel-city':
      return {
        badge: `🏨 Hotels in ${r.city.name}`,
        title: `Hotels in`,
        titleEm: r.city.name,
        subtitle: `Handpicked hotels in ${r.city.name}, ${r.country.name}. Compare rates, read verified reviews, book with free cancellation.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Hotels', href: '/hotels/' },
          { label: r.country.name, href: `/hotels/${r.country.slug}/` },
          { label: r.city.name },
        ],
        ctaPrimary: { label: `Search ${r.city.name} hotels`, href: `/hotels/listing?country=${r.country.slug}&city=${r.city.slug}` },
        bodyBlocks: [
          { heading: `The smartest way to book hotels in ${r.city.name}`, text: `We compare every major hotel in ${r.city.name} across booking sites so you get the lowest rate. Instant confirmation, free cancellation on eligible stays.` },
          ...(r.city.areas.length ? [{ heading: `Popular neighbourhoods`, list: r.city.areas.map(a => a.name) }] : []),
        ],
        relatedLinks: [
          ...r.city.areas.map(a => ({ label: `Hotels near ${a.name}`, href: `/hotels/${r.country.slug}/${r.city.slug}/${a.slug}/` })),
          { label: `Luxury hotels in ${r.city.name}`, href: `/hotels/luxury/${r.city.slug}/` },
          { label: `Budget hotels in ${r.city.name}`, href: `/hotels/budget/${r.city.slug}/` },
        ],
      };

    case 'hotel-area':
      return {
        badge: `Near ${r.area.name}`,
        title: `Hotels near`,
        titleEm: `${r.area.name}, ${r.city.name}`,
        subtitle: `Find the best-located hotels near ${r.area.name} in ${r.city.name}.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Hotels', href: '/hotels/' },
          { label: r.country.name, href: `/hotels/${r.country.slug}/` },
          { label: r.city.name, href: `/hotels/${r.country.slug}/${r.city.slug}/` },
          { label: r.area.name },
        ],
        ctaPrimary: { label: `See hotels near ${r.area.name}`, href: `/hotels/listing?country=${r.country.slug}&city=${r.city.slug}&area=${r.area.slug}` },
        bodyBlocks: [
          { heading: `About staying near ${r.area.name}`, text: `${r.area.name} is one of the most popular areas in ${r.city.name} for travellers. We list every hotel in walking distance with verified guest reviews and best-rate pricing.` },
        ],
      };

    case 'hotel-property':
      return {
        badge: '🏨 Hotel Property',
        title: prettify(r.nameSlug),
        subtitle: `${r.city.name}, ${r.country.name} — compare rates and book with best-price guarantee.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Hotels', href: '/hotels/' },
          { label: r.country.name, href: `/hotels/${r.country.slug}/` },
          { label: r.city.name, href: `/hotels/${r.country.slug}/${r.city.slug}/` },
          { label: prettify(r.nameSlug) },
        ],
        ctaPrimary: { label: 'Check availability & rates', href: `/hotels/listing?hotel=${r.id}` },
        bodyBlocks: [
          { heading: `About ${prettify(r.nameSlug)}`, text: `Book ${prettify(r.nameSlug)} with Fareoworld for the best rate. We check prices across major booking sites so you don't have to.` },
        ],
      };

    case 'hotel-theme-city':
      return {
        badge: `${r.theme.name} · ${r.city.name}`,
        title: `${r.theme.name} Hotels in`,
        titleEm: r.city.name,
        subtitle: `Curated ${r.theme.name.toLowerCase()} hotels in ${r.city.name}, ${r.country.name}. Best rate guaranteed.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Hotels', href: '/hotels/' },
          { label: `${r.theme.name}` },
          { label: r.city.name },
        ],
        ctaPrimary: { label: `See ${r.theme.name.toLowerCase()} hotels`, href: `/hotels/listing?city=${r.city.slug}&theme=${r.theme.slug}` },
        bodyBlocks: [
          { heading: `Best ${r.theme.name.toLowerCase()} hotels in ${r.city.name}`, text: `We handpick the top ${r.theme.name.toLowerCase()} hotels in ${r.city.name} and guarantee the best rate. Read verified reviews, compare amenities, and book in minutes.` },
        ],
      };

    case 'hotel-near-airport':
      return {
        badge: `Near ${r.airport.iata.toUpperCase()} airport`,
        title: `Hotels near`,
        titleEm: `${r.airport.name} (${r.airport.iata.toUpperCase()})`,
        subtitle: `Hotels within reach of ${r.airport.name} in ${r.airport.city}. Perfect for early flights or long layovers.`,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Hotels', href: '/hotels/' },
          { label: 'Near Airport' },
          { label: r.airport.iata.toUpperCase() },
        ],
        ctaPrimary: { label: `See hotels near ${r.airport.iata.toUpperCase()}`, href: `/hotels/listing?near=${r.airport.iata}` },
        bodyBlocks: [
          { heading: `Why book an airport hotel?`, text: `Airport hotels near ${r.airport.name} let you sleep closer to your flight, save on transfers, and avoid early-morning rush. Many offer free shuttles.` },
        ],
      };

    default:
      return { title: 'Fareoworld' };
  }
}

function prettify(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
