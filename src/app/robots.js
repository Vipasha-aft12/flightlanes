export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/search/',
          '/hotels/listing',
          '/hotels/booking',
          '/hotels/detail/',
          '/flights/results',
          '/flights/booking/',
          '/cruises/results',
          '/cruises/booking',
          '/cruises/detail',
          '/packages/results',
          '/packages/booking',
          '/packages/detail',
          '/activities/results',
          '/car-rentals/results',
          '/car-rentals/booking/',
          '/car-rentals/detail/',
          '/*?*', // query-string filter/pagination pages (sheet rows 55–57: noindex)
        ],
      },
    ],
    sitemap: 'https://www.fareoworld.com/sitemap.xml',
  };
}
