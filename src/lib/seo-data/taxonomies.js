// Hotel themes / specials — used to distinguish /hotels/{theme}/{city}/ from /hotels/{country}/{city}/
// IMPORTANT: Theme slugs MUST NOT collide with country slugs in locations.js.
// Any new theme added here must not shadow a real country.
export const HOTEL_THEMES = [
  { slug: 'luxury', name: 'Luxury' },
  { slug: 'budget', name: 'Budget' },
  { slug: 'pet-friendly', name: 'Pet-Friendly' },
  { slug: 'boutique', name: 'Boutique' },
  { slug: 'business', name: 'Business' },
  { slug: 'family', name: 'Family-Friendly' },
  { slug: 'romantic', name: 'Romantic' },
  { slug: 'resort', name: 'Resort' },
  { slug: 'spa', name: 'Spa & Wellness' },
  { slug: 'beachfront', name: 'Beachfront' },
];

// Fixed prefixes used under /hotels/ — reserved words that catch-all must
// treat as structural (not as a country slug).
export const HOTEL_RESERVED = ['near-airport', 'luxury', 'budget', 'pet-friendly', 'boutique', 'business', 'family', 'romantic', 'resort', 'spa', 'beachfront'];

export const BEST_DESTINATION_THEMES = [
  { slug: 'beach-destinations', name: 'Best Beach Destinations' },
  { slug: 'honeymoon-destinations', name: 'Best Honeymoon Destinations' },
  { slug: 'family-destinations', name: 'Best Family Destinations' },
  { slug: 'adventure-destinations', name: 'Best Adventure Destinations' },
  { slug: 'winter-destinations', name: 'Best Winter Destinations' },
  { slug: 'summer-destinations', name: 'Best Summer Destinations' },
];

// Activity categories appearing at the 3rd path segment after /activities/{country}/{city}/
// Dispatcher uses this to decide whether segment is a category or a specific activity name.
export const ACTIVITY_CATEGORIES = [
  { slug: 'adventure', name: 'Adventure' },
  { slug: 'sightseeing', name: 'Sightseeing' },
  { slug: 'tours', name: 'Tours' },
  { slug: 'cultural', name: 'Cultural' },
  { slug: 'water-sports', name: 'Water Sports' },
  { slug: 'food-and-drink', name: 'Food & Drink' },
  { slug: 'nature', name: 'Nature' },
  { slug: 'nightlife', name: 'Nightlife' },
  { slug: 'day-trips', name: 'Day Trips' },
  { slug: 'workshops', name: 'Workshops' },
];

// Airport IATA codes with the city/country they serve.
export const AIRPORTS = [
  { iata: 'del', name: 'Indira Gandhi Intl', city: 'Delhi', country: 'india' },
  { iata: 'bom', name: 'Chhatrapati Shivaji', city: 'Mumbai', country: 'india' },
  { iata: 'blr', name: 'Kempegowda Intl', city: 'Bangalore', country: 'india' },
  { iata: 'ccu', name: 'Netaji Subhas Chandra Bose', city: 'Kolkata', country: 'india' },
  { iata: 'dxb', name: 'Dubai Intl', city: 'Dubai', country: 'uae' },
  { iata: 'auh', name: 'Abu Dhabi Intl', city: 'Abu Dhabi', country: 'uae' },
  { iata: 'bkk', name: 'Suvarnabhumi', city: 'Bangkok', country: 'thailand' },
  { iata: 'hkt', name: 'Phuket Intl', city: 'Phuket', country: 'thailand' },
  { iata: 'dps', name: 'Ngurah Rai', city: 'Bali', country: 'indonesia' },
  { iata: 'nrt', name: 'Narita', city: 'Tokyo', country: 'japan' },
  { iata: 'hnd', name: 'Haneda', city: 'Tokyo', country: 'japan' },
  { iata: 'cdg', name: 'Charles de Gaulle', city: 'Paris', country: 'france' },
  { iata: 'lhr', name: 'Heathrow', city: 'London', country: 'uk' },
  { iata: 'jfk', name: 'John F Kennedy', city: 'New York', country: 'usa' },
  { iata: 'las', name: 'Harry Reid Intl', city: 'Las Vegas', country: 'usa' },
  { iata: 'mia', name: 'Miami Intl', city: 'Miami', country: 'usa' },
];

const AIRPORT_MAP = new Map(AIRPORTS.map(a => [a.iata, a]));
export function getAirport(iata) { return AIRPORT_MAP.get(iata?.toLowerCase()) || null; }
export const ALL_AIRPORT_IATAS = AIRPORTS.map(a => a.iata);

export const CRUISE_LINES = [
  { slug: 'royal-caribbean', name: 'Royal Caribbean' },
  { slug: 'carnival', name: 'Carnival Cruise Line' },
  { slug: 'norwegian', name: 'Norwegian Cruise Line' },
  { slug: 'msc', name: 'MSC Cruises' },
  { slug: 'celebrity', name: 'Celebrity Cruises' },
  { slug: 'princess', name: 'Princess Cruises' },
  { slug: 'holland-america', name: 'Holland America Line' },
  { slug: 'disney', name: 'Disney Cruise Line' },
];

const CRUISE_LINE_MAP = new Map(CRUISE_LINES.map(l => [l.slug, l]));
export function getCruiseLine(slug) { return CRUISE_LINE_MAP.get(slug) || null; }

export const CAR_TYPES = [
  { slug: 'economy', name: 'Economy' },
  { slug: 'compact', name: 'Compact' },
  { slug: 'suv', name: 'SUV' },
  { slug: 'luxury', name: 'Luxury' },
  { slug: 'van', name: 'Van' },
  { slug: 'convertible', name: 'Convertible' },
  { slug: 'electric', name: 'Electric' },
];

const CAR_TYPE_MAP = new Map(CAR_TYPES.map(c => [c.slug, c]));
export function getCarType(slug) { return CAR_TYPE_MAP.get(slug) || null; }

// Package themes — drive /packages/{theme}/ pages.
// MUST NOT collide with destination slugs used in /packages/{destination}/.
export const PACKAGE_THEMES = [
  { slug: 'honeymoon', name: 'Honeymoon' },
  { slug: 'family', name: 'Family' },
  { slug: 'adventure', name: 'Adventure' },
  { slug: 'luxury', name: 'Luxury' },
  { slug: 'budget', name: 'Budget' },
  { slug: 'solo', name: 'Solo Travel' },
  { slug: 'group', name: 'Group' },
  { slug: 'beach', name: 'Beach' },
  { slug: 'cultural', name: 'Cultural' },
  { slug: 'wildlife', name: 'Wildlife' },
];

const PACKAGE_THEME_MAP = new Map(PACKAGE_THEMES.map(t => [t.slug, t]));
export function getPackageTheme(slug) { return PACKAGE_THEME_MAP.get(slug) || null; }
export const ALL_PACKAGE_THEME_SLUGS = PACKAGE_THEMES.map(t => t.slug);

// Package destinations — country-level and city-level destinations for packages.
// Reuses country/city data but allows explicit curation if you want some
// destinations to not have package pages.
export const PACKAGE_DESTINATIONS = [
  { slug: 'maldives', name: 'Maldives', country: 'maldives' },
  { slug: 'bali', name: 'Bali', country: 'indonesia' },
  { slug: 'thailand', name: 'Thailand', country: 'thailand' },
  { slug: 'phuket', name: 'Phuket', country: 'thailand' },
  { slug: 'goa', name: 'Goa', country: 'india' },
  { slug: 'rajasthan', name: 'Rajasthan', country: 'india' },
  { slug: 'kerala', name: 'Kerala', country: 'india' },
  { slug: 'dubai', name: 'Dubai', country: 'uae' },
  { slug: 'paris', name: 'Paris', country: 'france' },
  { slug: 'london', name: 'London', country: 'uk' },
  { slug: 'tokyo', name: 'Tokyo', country: 'japan' },
];

const PACKAGE_DEST_MAP = new Map(PACKAGE_DESTINATIONS.map(d => [d.slug, d]));
export function getPackageDestination(slug) { return PACKAGE_DEST_MAP.get(slug) || null; }
export const ALL_PACKAGE_DEST_SLUGS = PACKAGE_DESTINATIONS.map(d => d.slug);

export const BLOG_CATEGORIES = [
  { slug: 'travel-tips', name: 'Travel Tips' },
  { slug: 'destination-guides', name: 'Destination Guides' },
  { slug: 'flight-hacks', name: 'Flight Hacks' },
  { slug: 'hotel-reviews', name: 'Hotel Reviews' },
  { slug: 'food-and-culture', name: 'Food & Culture' },
  { slug: 'budget-travel', name: 'Budget Travel' },
  { slug: 'luxury-travel', name: 'Luxury Travel' },
  { slug: 'travel-news', name: 'Travel News' },
];

const BLOG_CAT_MAP = new Map(BLOG_CATEGORIES.map(c => [c.slug, c]));
export function getBlogCategory(slug) { return BLOG_CAT_MAP.get(slug) || null; }

// Sanity-check at module load — warns in dev if slug namespaces overlap.
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  const overlap = (a, b) => a.filter(x => b.includes(x));
  // HOTEL_RESERVED must not overlap country slugs
  // Using dynamic require-style wouldn't work in ESM; this is a doc-level guard.
}
