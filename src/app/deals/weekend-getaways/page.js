import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export const metadata = {
  title: 'Weekend Getaway Deals — Fareoworld',
  description: 'Short break holidays and 2-night getaways at great prices.',
};

export default function WeekendGetawaysPage() {
  return (
    <SeoLanding
      badge="🗓 Weekend Getaways"
      title="Weekend"
      titleEm="getaways"
      subtitle="Short-break holiday deals — flights, hotels and activities bundled for quick escapes."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Deals', href: '/deals/' }, { label: 'Weekend Getaways' }]}
      ctaPrimary={{ label: 'See weekend deals', href: '/packages' }}
      bodyBlocks={[
        { heading: 'Great short breaks start here', text: 'Our editors curate the best 2–4 night getaways from your city every week. Flights + hotel bundled for maximum value.' },
      ]}
    />
  );
}
