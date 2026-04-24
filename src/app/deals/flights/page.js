import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export const metadata = {
  title: 'Cheap Flight Deals — Fareoworld',
  description: 'Today\'s best flight deals from 500+ airlines. Updated hourly.',
};

export default function FlightDealsPage() {
  return (
    <SeoLanding
      badge="✈ Flight Deals"
      title="Cheap flight"
      titleEm="deals"
      subtitle="Today's best airfare deals from 500+ airlines. Updated hourly with best-rate guarantee."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Deals', href: '/deals/' }, { label: 'Flights' }]}
      ctaPrimary={{ label: 'Search flight deals', href: '/flights' }}
      bodyBlocks={[
        { heading: 'Why book flight deals with Fareoworld', text: 'We scan 500+ airlines and show the lowest published fares on every route. No hidden booking fees, flexible tickets where available.' },
      ]}
    />
  );
}
