/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sheet spec: all URLs end in trailing slash. Next.js auto-redirects
  // /hotels → /hotels/ when this is true.
  trailingSlash: true,

  // Image domains used across the site
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  async redirects() {
    return [
      /* ─────────── Canonicalisation per user decisions ─────────── */
      // /cars/* → /car-rentals/* (user chose /car-rentals/ as canonical, matching sheet)
      { source: '/cars', destination: '/car-rentals/', permanent: true },
      { source: '/cars/results', destination: '/car-rentals/', permanent: true },

      // /holiday-packages/* → /packages/* (user chose /packages/ as canonical)
      { source: '/holiday-packages', destination: '/packages/', permanent: true },
      { source: '/holiday-packages/:slug*', destination: '/packages/:slug*/', permanent: true },

      /* ─────────── Legacy route migration ─────────── */
      // Old single-segment hotel detail /hotels/:id → new /hotels/detail/:id
      // Must match numeric-only ids so it doesn't catch /hotels/india/ etc.
      {
        source: '/hotels/:id(\\d+)',
        destination: '/hotels/detail/:id/',
        permanent: true,
      },

      // Old /blog/:slug (single-segment) → /blog/travel-tips/:slug/
      // Conservative: send legacy slugs into the default category.
      {
        source: '/blog/:slug((?!travel-tips|destination-guides|flight-hacks|hotel-reviews|food-and-culture|budget-travel|luxury-travel|travel-news)[a-z0-9-]+)',
        destination: '/blog/travel-tips/:slug/',
        permanent: true,
      },

      /* ─────────── Search / filter noindex via redirect to canonical ──── */
      // Pagination beyond page 1 — redirect to canonical (we serve noindex header too)
      // NOTE: kept simple — full noindex logic lives in robots.js + metadata.
    ];
  },

  async rewrites() {
    return [];
  },

  async headers() {
    return [
      // Blanket noindex for utility pages that shouldn't rank.
      {
        source: '/(hotels/listing|hotels/booking|hotels/detail/:path*|flights/results|flights/booking/:path*|cruises/results|cruises/booking|cruises/detail|packages/results|packages/booking|packages/detail|activities/results|search)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, follow' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
