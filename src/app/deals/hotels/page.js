import SeoLanding from '@/components/seo/SeoLanding';
import '@/components/homepage/hero/Hero.css';

export const metadata = {
  title: 'Hotel Deals — Fareoworld',
  description: 'Today\'s best hotel deals and discounts on 500,000+ properties worldwide.',
};

export default function HotelDealsPage() {
  return (
    <SeoLanding
      badge="🏨 Hotel Deals"
      title="Exclusive hotel"
      titleEm="deals"
      subtitle="Hand-picked hotel offers updated daily. Book fast — these rates won't last long."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Deals', href: '/deals/' }, { label: 'Hotels' }]}
      ctaPrimary={{ label: 'Search hotel deals', href: '/hotels' }}
      bodyBlocks={[
        { heading: 'Why book hotel deals with Fareoworld', text: 'We compare 500,000+ hotels across every major booking site so you always get the lowest rate, with free cancellation on most bookings.' },
      ]}
    />
  );
}
