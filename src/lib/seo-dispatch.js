/**
 * SEO route dispatchers.
 *
 * These functions translate raw catch-all path segments (e.g. params.slug from
 * Next.js) into a discriminated-union descriptor like:
 *   { type: 'hotel-country', country: {...} }
 *   { type: 'hotel-property', country: {...}, city: {...}, slug, id }
 *
 * Pages call the matching dispatcher, switch on `type`, and render.
 * If the dispatcher returns null, the page calls notFound() from next/navigation.
 *
 * Keeping all resolution logic in one place means:
 *   - New path patterns are added in ONE file, not scattered across routes.
 *   - The rules are auditable (all overlap logic is explicit and tested).
 *   - The same dispatcher can be reused by sitemap.js to enumerate real URLs.
 */

import {
  getCountry,
  getRegion,
  getCity,
  getState,
  getArea,
  isCountry,
  isRegion,
  ALL_COUNTRY_SLUGS,
  COUNTRIES,
} from './seo-data/locations';

import {
  HOTEL_THEMES,
  HOTEL_RESERVED,
  ACTIVITY_CATEGORIES,
  BEST_DESTINATION_THEMES,
  PACKAGE_THEMES,
  PACKAGE_DESTINATIONS,
  getAirport,
  getCruiseLine,
  getCarType,
  getPackageTheme,
  getPackageDestination,
} from './seo-data/taxonomies';

const HOTEL_THEME_MAP = new Map(HOTEL_THEMES.map(t => [t.slug, t]));
const ACTIVITY_CAT_MAP = new Map(ACTIVITY_CATEGORIES.map(c => [c.slug, c]));
const BEST_THEME_MAP = new Map(BEST_DESTINATION_THEMES.map(t => [t.slug, t]));

// Property slugs end in -{numeric-id}. This regex is the ONLY reliable way to
// distinguish a property URL from a neighbourhood URL at routing time.
const PROPERTY_ID_RE = /^(.+?)-(\d+)$/;

// Duration pattern used by /packages/{destination}/{duration}/
// Matches "7-nights", "10-nights", etc.
const DURATION_RE = /^(\d+)-nights?$/;

// Itinerary slug pattern: "5-days-in-paris"
const ITINERARY_RE = /^(\d+)-days?-in-([a-z0-9-]+)$/;

// Visa guide slug: "indian-to-uae"
const VISA_RE = /^([a-z0-9-]+?)-to-([a-z0-9-]+)$/;

// Origin-to-destination package slug: "delhi-to-maldives"
const ORIGIN_TO_RE = /^([a-z0-9-]+?)-to-([a-z0-9-]+)$/;

/* ─────────────────────────────── HOTELS ─────────────────────────────────── */
/**
 * /hotels/{country}/
 * /hotels/{country}/{city}/
 * /hotels/{country}/{city}/{area}/
 * /hotels/{country}/{city}/{name}-{id}/   ← property, ends in -<digits>
 * /hotels/luxury/{city}/
 * /hotels/budget/{city}/
 * /hotels/{theme}/{city}/
 * /hotels/near-airport/{iata}/
 */
export function resolveHotelsPath(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return null;
  const segs = slug.map(s => s.toLowerCase());

  // 2-segment theme/airport forms first, because their first segment is reserved
  if (segs.length === 2) {
    const [a, b] = segs;

    if (a === 'near-airport') {
      const airport = getAirport(b);
      if (airport) return { type: 'hotel-near-airport', airport };
      return null;
    }

    if (HOTEL_THEME_MAP.has(a)) {
      const theme = HOTEL_THEME_MAP.get(a);
      // theme + city (city can be any known city across countries)
      const country = COUNTRIES.find(c => c.cities.some(ci => ci.slug === b));
      if (country) {
        const city = country.cities.find(ci => ci.slug === b);
        return { type: 'hotel-theme-city', theme, country, city };
      }
      return null;
    }

    // Not a theme/airport → must be {country}/{city}
    const country = getCountry(a);
    const city = country ? country.cities.find(ci => ci.slug === b) : null;
    if (country && city) return { type: 'hotel-city', country, city };
    return null;
  }

  // 1-segment = country hub only (themes don't make sense alone, they need a city)
  if (segs.length === 1) {
    const country = getCountry(segs[0]);
    if (country) return { type: 'hotel-country', country };
    return null;
  }

  // 3 segments = {country}/{city}/{area-or-property}
  if (segs.length === 3) {
    const [a, b, c] = segs;

    // Reserved prefixes don't belong at 3-segment depth
    if (HOTEL_RESERVED.includes(a)) return null;

    const country = getCountry(a);
    if (!country) return null;
    const city = country.cities.find(ci => ci.slug === b);
    if (!city) return null;

    // Property URLs end in -{digits}
    const m = c.match(PROPERTY_ID_RE);
    if (m) {
      return { type: 'hotel-property', country, city, slug: c, nameSlug: m[1], id: m[2] };
    }

    // Otherwise: neighbourhood / area page
    const area = city.areas.find(ar => ar.slug === c);
    if (area) return { type: 'hotel-area', country, city, area };
    // Unknown area slug — still render an area page (area may be added post-launch)
    return { type: 'hotel-area', country, city, area: { slug: c, name: deslugify(c) } };
  }

  return null;
}

/* ─────────────────────────────── DESTINATIONS ───────────────────────────── */
/**
 * /destinations/{region}/
 * /destinations/{country}/
 * /destinations/{country}/{state}/
 * /destinations/{country}/{city}/
 * /destinations/best/{theme}/
 */
export function resolveDestinationsPath(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return null;
  const segs = slug.map(s => s.toLowerCase());

  if (segs.length === 1) {
    const [a] = segs;
    if (a === 'best') return null; // needs a theme
    const region = getRegion(a);
    if (region) return { type: 'dest-region', region };
    const country = getCountry(a);
    if (country) return { type: 'dest-country', country };
    return null;
  }

  if (segs.length === 2) {
    const [a, b] = segs;
    if (a === 'best') {
      const theme = BEST_THEME_MAP.get(b);
      if (theme) return { type: 'dest-best', theme };
      return null;
    }
    const country = getCountry(a);
    if (!country) return null;
    // State and city may share namespaces — resolve state first, then fall back to city.
    const state = country.states.find(s => s.slug === b);
    if (state) return { type: 'dest-state', country, state };
    const city = country.cities.find(c => c.slug === b);
    if (city) return { type: 'dest-city', country, city };
    return null;
  }

  return null;
}

/* ─────────────────────────────── ACTIVITIES ─────────────────────────────── */
/**
 * /activities/{country}/{city}/
 * /activities/{country}/{city}/{category}/    ← activity category
 * /activities/{country}/{city}/{activity}/    ← individual activity (slug can be anything)
 *
 * Collision: segment 3 could be a category OR an activity name.
 * Rule: if segment 3 matches a known category slug → category page.
 *       otherwise → individual activity page (any slug, lazily handled).
 */
export function resolveActivitiesPath(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return null;
  const segs = slug.map(s => s.toLowerCase());

  if (segs.length === 2) {
    const [a, b] = segs;
    const country = getCountry(a);
    if (!country) return null;
    const city = country.cities.find(c => c.slug === b);
    if (!city) return null;
    return { type: 'activities-city', country, city };
  }

  if (segs.length === 3) {
    const [a, b, c] = segs;
    const country = getCountry(a);
    if (!country) return null;
    const city = country.cities.find(ci => ci.slug === b);
    if (!city) return null;

    // Category takes precedence
    if (ACTIVITY_CAT_MAP.has(c)) {
      return { type: 'activities-category', country, city, category: ACTIVITY_CAT_MAP.get(c) };
    }
    // Otherwise: individual activity
    return { type: 'activity-detail', country, city, slug: c, name: deslugify(c) };
  }

  return null;
}

/* ─────────────────────────────── CRUISES ────────────────────────────────── */
/**
 * /cruises/{region}/
 * /cruises/{region}/{itinerary}/
 *
 * /cruises/lines/{line}/ and /cruises/river/{region}/ use FIXED STATIC ROUTES
 * (see app/cruises/lines/[line]/ and app/cruises/river/[region]/) so they
 * don't pass through this dispatcher.
 */
export function resolveCruisesPath(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return null;
  const segs = slug.map(s => s.toLowerCase());

  if (segs.length === 1) {
    const [a] = segs;
    if (a === 'lines' || a === 'river') return null; // handled by static routes
    const region = getRegion(a);
    if (region) return { type: 'cruise-region', region };
    return null;
  }

  if (segs.length === 2) {
    const [a, b] = segs;
    if (a === 'lines' || a === 'river') return null; // static routes above cover these
    const region = getRegion(a);
    if (!region) return null;
    return { type: 'cruise-itinerary', region, itinerarySlug: b, itineraryName: deslugify(b) };
  }

  return null;
}

/* ─────────────────────────────── CAR RENTALS ────────────────────────────── */
/**
 * /car-rentals/{country}/{city}/
 * /car-rentals/{country}/{city}/{car-type}/
 *
 * /car-rentals/airport/{iata}/ is a FIXED STATIC ROUTE.
 */
export function resolveCarRentalsPath(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return null;
  const segs = slug.map(s => s.toLowerCase());

  if (segs.length === 2) {
    const [a, b] = segs;
    if (a === 'airport') return null; // handled by static route
    const country = getCountry(a);
    if (!country) return null;
    const city = country.cities.find(c => c.slug === b);
    if (!city) return null;
    return { type: 'car-city', country, city };
  }

  if (segs.length === 3) {
    const [a, b, c] = segs;
    if (a === 'airport') return null;
    const country = getCountry(a);
    if (!country) return null;
    const city = country.cities.find(ci => ci.slug === b);
    if (!city) return null;
    const carType = getCarType(c);
    if (!carType) return null;
    return { type: 'car-type', country, city, carType };
  }

  return null;
}

/* ─────────────────────────────── PACKAGES ───────────────────────────────── */
/**
 * /packages/{destination}/
 * /packages/{origin}-to-{destination}/   ← detected by -to- split + both sides valid
 * /packages/{theme}/
 * /packages/{theme}/{destination}/
 * /packages/{destination}/{duration}/   ← duration matches "N-nights"
 * /packages/{destination}/budget/
 * /packages/{destination}/{package-name}/
 *
 * Collision resolution rules (applied in order at each depth):
 *   - 1 seg: "-to-" split where both sides resolve → origin-to-dest
 *            theme slug → theme hub
 *            destination slug → destination page
 *   - 2 seg:
 *       segment1 is theme → theme+destination (segment2 is destination)
 *       segment1 is destination + segment2 matches duration → duration page
 *       segment1 is destination + segment2 == 'budget' → budget page
 *       segment1 is destination + anything else → individual package (segment2 is package-name)
 */
export function resolvePackagesPath(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return null;
  const segs = slug.map(s => s.toLowerCase());

  if (segs.length === 1) {
    const [a] = segs;

    // Origin-to-destination? Both sides must resolve to avoid false positives.
    const m = a.match(ORIGIN_TO_RE);
    if (m) {
      const [, origin, dest] = m;
      const originDest = getPackageDestination(origin) || (ALL_COUNTRY_SLUGS.includes(origin) ? { slug: origin, name: deslugify(origin) } : null);
      const destDest = getPackageDestination(dest);
      if (originDest && destDest) {
        return { type: 'pkg-origin-to-dest', origin: originDest, destination: destDest };
      }
      // fall through if not a real origin-to-dest
    }

    if (getPackageTheme(a)) {
      return { type: 'pkg-theme', theme: getPackageTheme(a) };
    }
    if (getPackageDestination(a)) {
      return { type: 'pkg-destination', destination: getPackageDestination(a) };
    }
    return null;
  }

  if (segs.length === 2) {
    const [a, b] = segs;

    // Theme + destination
    if (getPackageTheme(a) && getPackageDestination(b)) {
      return { type: 'pkg-theme-destination', theme: getPackageTheme(a), destination: getPackageDestination(b) };
    }

    // From here on, segment1 must be a destination
    const destination = getPackageDestination(a);
    if (!destination) return null;

    // Duration
    const dm = b.match(DURATION_RE);
    if (dm) {
      return { type: 'pkg-duration', destination, duration: { nights: parseInt(dm[1], 10), slug: b } };
    }

    // Budget literal
    if (b === 'budget') {
      return { type: 'pkg-budget', destination };
    }

    // Else: individual package page (segment2 is the package slug)
    return { type: 'pkg-individual', destination, packageSlug: b, packageName: deslugify(b) };
  }

  return null;
}

/* ─────────────────────────── slug parsers ───────────────────────────────── */

export function parseItinerarySlug(slug) {
  if (!slug) return null;
  const m = slug.toLowerCase().match(ITINERARY_RE);
  if (!m) return null;
  const [, days, citySlug] = m;
  // Try to find the city
  const country = COUNTRIES.find(c => c.cities.some(ci => ci.slug === citySlug));
  const city = country ? country.cities.find(ci => ci.slug === citySlug) : null;
  return {
    days: parseInt(days, 10),
    citySlug,
    city,
    country,
    cityName: city ? city.name : deslugify(citySlug),
  };
}

export function parseVisaSlug(slug) {
  if (!slug) return null;
  const m = slug.toLowerCase().match(VISA_RE);
  if (!m) return null;
  const [, nationality, countrySlug] = m;
  const country = getCountry(countrySlug);
  return {
    nationality,
    nationalityLabel: deslugify(nationality),
    countrySlug,
    country,
    countryName: country ? country.name : deslugify(countrySlug),
  };
}

/* ─────────────────────────── helpers ────────────────────────────────────── */

export function deslugify(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
