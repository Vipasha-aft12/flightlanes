/**
 * Dynamic sitemap — enumerates every indexable URL from the same data
 * files the dispatchers resolve against, so sitemap + routing stay in lockstep.
 *
 * Utility/booking paths are intentionally excluded (they're noindex).
 */

import { COUNTRIES, REGIONS } from '@/lib/seo-data/locations';
import {
  HOTEL_THEMES,
  ACTIVITY_CATEGORIES,
  BEST_DESTINATION_THEMES,
  AIRPORTS,
  CRUISE_LINES,
  CAR_TYPES,
  PACKAGE_THEMES,
  PACKAGE_DESTINATIONS,
  BLOG_CATEGORIES,
} from '@/lib/seo-data/taxonomies';

const BASE = 'https://www.fareoworld.com';

export default function sitemap() {
  const urls = [];
  const now = new Date();

  const add = (path, priority = 0.5, changeFrequency = 'weekly') => {
    urls.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency, priority });
  };

  /* ── Homepage + section hubs ── */
  add('/', 1.0, 'daily');
  add('/hotels/', 0.9, 'daily');
  add('/destinations/', 0.9, 'weekly');
  add('/activities/', 0.9, 'weekly');
  add('/cruises/', 0.9, 'weekly');
  add('/car-rentals/', 0.9, 'weekly');
  add('/deals/', 0.9, 'daily');
  add('/deals/flights/', 0.8, 'daily');
  add('/deals/hotels/', 0.8, 'daily');
  add('/deals/weekend-getaways/', 0.8, 'weekly');
  add('/packages/', 0.9, 'weekly');
  add('/blog/', 0.8, 'daily');
  add('/flights/', 0.9, 'weekly');

  /* ── Hotels ── */
  for (const country of COUNTRIES) {
    add(`/hotels/${country.slug}/`, 0.8);
    for (const city of country.cities) {
      add(`/hotels/${country.slug}/${city.slug}/`, 0.8);
      for (const area of city.areas) {
        add(`/hotels/${country.slug}/${city.slug}/${area.slug}/`, 0.6);
      }
    }
  }

  for (const theme of HOTEL_THEMES) {
    for (const country of COUNTRIES) {
      for (const city of country.cities) {
        add(`/hotels/${theme.slug}/${city.slug}/`, 0.6);
      }
    }
  }

  for (const airport of AIRPORTS) {
    add(`/hotels/near-airport/${airport.iata}/`, 0.6);
  }

  /* ── Destinations ── */
  for (const region of REGIONS) {
    add(`/destinations/${region.slug}/`, 0.7);
  }
  for (const country of COUNTRIES) {
    add(`/destinations/${country.slug}/`, 0.7);
    for (const state of country.states) {
      add(`/destinations/${country.slug}/${state.slug}/`, 0.6);
    }
    for (const city of country.cities) {
      add(`/destinations/${country.slug}/${city.slug}/`, 0.7);
    }
  }
  for (const theme of BEST_DESTINATION_THEMES) {
    add(`/destinations/best/${theme.slug}/`, 0.6);
  }

  /* ── Activities & Attractions ── */
  for (const country of COUNTRIES) {
    for (const city of country.cities) {
      add(`/activities/${country.slug}/${city.slug}/`, 0.7);
      add(`/attractions/${country.slug}/${city.slug}/`, 0.7);
      for (const cat of ACTIVITY_CATEGORIES) {
        add(`/activities/${country.slug}/${city.slug}/${cat.slug}/`, 0.5);
      }
    }
  }

  /* ── Cruises ── */
  for (const region of REGIONS) {
    add(`/cruises/${region.slug}/`, 0.7);
    add(`/cruises/river/${region.slug}/`, 0.5);
  }
  for (const line of CRUISE_LINES) {
    add(`/cruises/lines/${line.slug}/`, 0.6);
  }

  /* ── Car Rentals ── */
  for (const country of COUNTRIES) {
    for (const city of country.cities) {
      add(`/car-rentals/${country.slug}/${city.slug}/`, 0.7);
      for (const carType of CAR_TYPES) {
        add(`/car-rentals/${country.slug}/${city.slug}/${carType.slug}/`, 0.5);
      }
    }
  }
  for (const airport of AIRPORTS) {
    add(`/car-rentals/airport/${airport.iata}/`, 0.6);
  }
  for (const country of COUNTRIES) {
    add(`/self-drive/${country.slug}/`, 0.5);
  }

  /* ── Packages ── */
  for (const dest of PACKAGE_DESTINATIONS) {
    add(`/packages/${dest.slug}/`, 0.8);
    add(`/packages/${dest.slug}/budget/`, 0.6);
    for (const nights of [3, 5, 7, 10]) {
      add(`/packages/${dest.slug}/${nights}-nights/`, 0.5);
    }
  }
  for (const theme of PACKAGE_THEMES) {
    add(`/packages/${theme.slug}/`, 0.7);
    for (const dest of PACKAGE_DESTINATIONS) {
      add(`/packages/${theme.slug}/${dest.slug}/`, 0.6);
    }
  }

  /* ── Blog categories ── */
  for (const cat of BLOG_CATEGORIES) {
    add(`/blog/${cat.slug}/`, 0.6);
  }

  return urls;
}
