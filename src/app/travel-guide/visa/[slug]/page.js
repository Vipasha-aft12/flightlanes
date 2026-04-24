import { notFound } from 'next/navigation';
import { parseVisaSlug } from '@/lib/seo-dispatch';
import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export async function generateMetadata({ params }) {
  params = await params;
  const r = parseVisaSlug(params.slug);
  if (!r) return { title: 'Not found — Fareoworld' };
  return {
    title: `${capitalize(r.nationalityLabel)} to ${r.countryName} visa — Fareoworld`,
    description: `${capitalize(r.nationalityLabel)} passport visa requirements for ${r.countryName}. Tourist visa, process and timelines.`,
  };
}

export default async function VisaGuidePage({ params }) {
  params = await params;
  const r = parseVisaSlug(params.slug);
  if (!r) notFound();

  return (
    <SeoLanding
      badge="Visa guide"
      title={`${capitalize(r.nationalityLabel)} to`}
      titleEm={`${r.countryName}`}
      subtitle={`Visa requirements and application process for ${r.nationalityLabel} passport-holders travelling to ${r.countryName}.`}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Travel Guides' },
        { label: 'Visa' },
        { label: `${capitalize(r.nationalityLabel)} → ${r.countryName}` },
      ]}
      ctaPrimary={r.country ? { label: `Book hotels in ${r.countryName}`, href: `/hotels/${r.country.slug}/` } : { label: 'Search hotels', href: '/hotels' }}
      bodyBlocks={[
        { heading: `${capitalize(r.nationalityLabel)} passport to ${r.countryName}`, text: `Typical visa requirements, processing time and fees for ${r.nationalityLabel} nationals travelling to ${r.countryName}. Always verify current requirements on the official embassy site before booking flights.` },
        { heading: 'Disclaimer', text: 'Visa rules change frequently. This page is a general reference. Confirm current requirements with the official consulate of ' + r.countryName + ' before travel.' },
      ]}
    />
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
