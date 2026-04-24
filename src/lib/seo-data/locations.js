// Central locations registry. All catch-all dispatchers resolve against this.
// Expand these lists as you launch new markets.

export const REGIONS = [
  { slug: 'southeast-asia', name: 'Southeast Asia' },
  { slug: 'south-asia', name: 'South Asia' },
  { slug: 'europe', name: 'Europe' },
  { slug: 'middle-east', name: 'Middle East' },
  { slug: 'north-america', name: 'North America' },
  { slug: 'caribbean', name: 'Caribbean' },
  { slug: 'mediterranean', name: 'Mediterranean' },
  { slug: 'africa', name: 'Africa' },
  { slug: 'oceania', name: 'Oceania' },
  { slug: 'east-asia', name: 'East Asia' },
  { slug: 'scandinavia', name: 'Scandinavia' },
  { slug: 'alaska', name: 'Alaska' },
];

// Countries with their main cities + optional state/province groupings.
// Each city has a slug + display name. Area entries are optional neighbourhoods.
export const COUNTRIES = [
  {
    slug: 'india',
    name: 'India',
    region: 'south-asia',
    states: [
      { slug: 'rajasthan', name: 'Rajasthan' },
      { slug: 'goa', name: 'Goa' },
      { slug: 'maharashtra', name: 'Maharashtra' },
      { slug: 'kerala', name: 'Kerala' },
      { slug: 'delhi', name: 'Delhi' },
      { slug: 'uttarakhand', name: 'Uttarakhand' },
      { slug: 'uttar-pradesh', name: 'Uttar Pradesh' },
      { slug: 'karnataka', name: 'Karnataka' },
    ],
    cities: [
      { slug: 'jaipur', name: 'Jaipur', state: 'rajasthan', areas: [{ slug: 'old-city', name: 'Old City' }, { slug: 'malviya-nagar', name: 'Malviya Nagar' }] },
      { slug: 'rishikesh', name: 'Rishikesh', state: 'uttarakhand', areas: [{ slug: 'laxman-jhula', name: 'Laxman Jhula' }, { slug: 'tapovan', name: 'Tapovan' }] },
      { slug: 'varanasi', name: 'Varanasi', state: 'uttar-pradesh', areas: [{ slug: 'assi-ghat', name: 'Assi Ghat' }, { slug: 'dashashwamedh', name: 'Dashashwamedh Ghat' }] },
      { slug: 'delhi', name: 'Delhi', state: 'delhi', areas: [{ slug: 'connaught-place', name: 'Connaught Place' }, { slug: 'karol-bagh', name: 'Karol Bagh' }] },
      { slug: 'mumbai', name: 'Mumbai', state: 'maharashtra', areas: [{ slug: 'colaba', name: 'Colaba' }, { slug: 'bandra', name: 'Bandra' }] },
      { slug: 'agra', name: 'Agra', state: 'uttar-pradesh', areas: [] },
      { slug: 'goa', name: 'Goa', state: 'goa', areas: [{ slug: 'north-goa', name: 'North Goa' }, { slug: 'south-goa', name: 'South Goa' }] },
      { slug: 'bangalore', name: 'Bangalore', state: 'karnataka', areas: [] },
    ],
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    region: 'southeast-asia',
    states: [],
    cities: [
      { slug: 'bangkok', name: 'Bangkok', areas: [{ slug: 'sukhumvit', name: 'Sukhumvit' }, { slug: 'silom', name: 'Silom' }] },
      { slug: 'phuket', name: 'Phuket', areas: [] },
      { slug: 'chiang-mai', name: 'Chiang Mai', areas: [] },
      { slug: 'pattaya', name: 'Pattaya', areas: [] },
    ],
  },
  {
    slug: 'uae',
    name: 'UAE',
    region: 'middle-east',
    states: [],
    cities: [
      { slug: 'dubai', name: 'Dubai', areas: [{ slug: 'downtown', name: 'Downtown' }, { slug: 'marina', name: 'Marina' }] },
      { slug: 'abu-dhabi', name: 'Abu Dhabi', areas: [] },
    ],
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    region: 'southeast-asia',
    states: [],
    cities: [
      { slug: 'bali', name: 'Bali', areas: [{ slug: 'ubud', name: 'Ubud' }, { slug: 'seminyak', name: 'Seminyak' }, { slug: 'kuta', name: 'Kuta' }] },
      { slug: 'jakarta', name: 'Jakarta', areas: [] },
    ],
  },
  {
    slug: 'japan',
    name: 'Japan',
    region: 'east-asia',
    states: [],
    cities: [
      { slug: 'tokyo', name: 'Tokyo', areas: [{ slug: 'shibuya', name: 'Shibuya' }, { slug: 'shinjuku', name: 'Shinjuku' }] },
      { slug: 'kyoto', name: 'Kyoto', areas: [] },
      { slug: 'osaka', name: 'Osaka', areas: [] },
    ],
  },
  {
    slug: 'france',
    name: 'France',
    region: 'europe',
    states: [],
    cities: [
      { slug: 'paris', name: 'Paris', areas: [{ slug: 'le-marais', name: 'Le Marais' }, { slug: 'montmartre', name: 'Montmartre' }] },
      { slug: 'nice', name: 'Nice', areas: [] },
    ],
  },
  {
    slug: 'usa',
    name: 'USA',
    region: 'north-america',
    states: [],
    cities: [
      { slug: 'new-york', name: 'New York', areas: [{ slug: 'manhattan', name: 'Manhattan' }] },
      { slug: 'las-vegas', name: 'Las Vegas', areas: [] },
      { slug: 'miami', name: 'Miami', areas: [] },
    ],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    region: 'europe',
    states: [],
    cities: [
      { slug: 'london', name: 'London', areas: [] },
      { slug: 'edinburgh', name: 'Edinburgh', areas: [] },
    ],
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    region: 'south-asia',
    states: [],
    cities: [
      { slug: 'male', name: 'Malé', areas: [] },
    ],
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    region: 'oceania',
    states: [],
    cities: [
      { slug: 'auckland', name: 'Auckland', areas: [] },
      { slug: 'queenstown', name: 'Queenstown', areas: [] },
    ],
  },
  {
    slug: 'puerto-rico',
    name: 'Puerto Rico',
    region: 'caribbean',
    states: [],
    cities: [
      { slug: 'san-juan', name: 'San Juan', areas: [{ slug: 'old-san-juan', name: 'Old San Juan' }, { slug: 'condado', name: 'Condado' }, { slug: 'isla-verde', name: 'Isla Verde' }] },
      { slug: 'ponce', name: 'Ponce', areas: [] },
      { slug: 'rincon', name: 'Rincón', areas: [] },
    ],
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    region: 'north-america',
    states: [
      { slug: 'quintana-roo', name: 'Quintana Roo' },
      { slug: 'yucatan', name: 'Yucatán' },
      { slug: 'jalisco', name: 'Jalisco' },
      { slug: 'baja-california-sur', name: 'Baja California Sur' },
    ],
    cities: [
      { slug: 'cancun', name: 'Cancún', state: 'quintana-roo', areas: [{ slug: 'hotel-zone', name: 'Hotel Zone' }, { slug: 'downtown', name: 'Downtown' }] },
      { slug: 'playa-del-carmen', name: 'Playa del Carmen', state: 'quintana-roo', areas: [] },
      { slug: 'tulum', name: 'Tulum', state: 'quintana-roo', areas: [] },
      { slug: 'mexico-city', name: 'Mexico City', state: 'cdmx', areas: [] },
      { slug: 'cabo-san-lucas', name: 'Cabo San Lucas', state: 'baja-california-sur', areas: [] },
    ],
  },
  {
    slug: 'philippines',
    name: 'Philippines',
    region: 'southeast-asia',
    states: [],
    cities: [
      { slug: 'manila', name: 'Manila', areas: [{ slug: 'makati', name: 'Makati' }, { slug: 'bonifacio-global-city', name: 'Bonifacio Global City' }] },
      { slug: 'cebu', name: 'Cebu', areas: [] },
      { slug: 'boracay', name: 'Boracay', areas: [{ slug: 'station-1', name: 'Station 1' }, { slug: 'station-2', name: 'Station 2' }] },
      { slug: 'palawan', name: 'Palawan', areas: [{ slug: 'el-nido', name: 'El Nido' }, { slug: 'coron', name: 'Coron' }] },
      { slug: 'bohol', name: 'Bohol', areas: [] },
      { slug: 'siargao', name: 'Siargao', areas: [] },
    ],
  },
  {
    slug: 'south-korea',
    name: 'South Korea',
    region: 'east-asia',
    states: [],
    cities: [
      { slug: 'seoul', name: 'Seoul', areas: [{ slug: 'gangnam', name: 'Gangnam' }, { slug: 'myeongdong', name: 'Myeongdong' }, { slug: 'hongdae', name: 'Hongdae' }, { slug: 'itaewon', name: 'Itaewon' }] },
      { slug: 'busan', name: 'Busan', areas: [{ slug: 'haeundae', name: 'Haeundae' }] },
      { slug: 'jeju', name: 'Jeju', areas: [] },
      { slug: 'incheon', name: 'Incheon', areas: [] },
    ],
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    region: 'southeast-asia',
    states: [],
    cities: [
      { slug: 'hanoi', name: 'Hanoi', areas: [{ slug: 'old-quarter', name: 'Old Quarter' }, { slug: 'hoan-kiem', name: 'Hoan Kiem' }] },
      { slug: 'ho-chi-minh-city', name: 'Ho Chi Minh City', areas: [{ slug: 'district-1', name: 'District 1' }] },
      { slug: 'da-nang', name: 'Da Nang', areas: [] },
      { slug: 'hoi-an', name: 'Hoi An', areas: [] },
      { slug: 'ha-long', name: 'Ha Long', areas: [] },
      { slug: 'nha-trang', name: 'Nha Trang', areas: [] },
      { slug: 'phu-quoc', name: 'Phu Quoc', areas: [] },
    ],
  },
  {
    slug: 'dominican-republic',
    name: 'Dominican Republic',
    region: 'caribbean',
    states: [],
    cities: [
      { slug: 'punta-cana', name: 'Punta Cana', areas: [{ slug: 'bavaro', name: 'Bávaro' }] },
      { slug: 'santo-domingo', name: 'Santo Domingo', areas: [{ slug: 'zona-colonial', name: 'Zona Colonial' }] },
      { slug: 'puerto-plata', name: 'Puerto Plata', areas: [] },
      { slug: 'la-romana', name: 'La Romana', areas: [] },
      { slug: 'samana', name: 'Samaná', areas: [] },
    ],
  },
  {
    slug: 'italy',
    name: 'Italy',
    region: 'europe',
    states: [
      { slug: 'trentino-alto-adige', name: 'Trentino-Alto Adige' },
      { slug: 'veneto', name: 'Veneto' },
      { slug: 'tuscany', name: 'Tuscany' },
      { slug: 'lazio', name: 'Lazio' },
      { slug: 'campania', name: 'Campania' },
    ],
    cities: [
      { slug: 'rome', name: 'Rome', state: 'lazio', areas: [{ slug: 'trastevere', name: 'Trastevere' }, { slug: 'centro-storico', name: 'Centro Storico' }] },
      { slug: 'florence', name: 'Florence', state: 'tuscany', areas: [] },
      { slug: 'venice', name: 'Venice', state: 'veneto', areas: [{ slug: 'san-marco', name: 'San Marco' }] },
      { slug: 'milan', name: 'Milan', state: 'lombardy', areas: [] },
      { slug: 'naples', name: 'Naples', state: 'campania', areas: [] },
      { slug: 'amalfi-coast', name: 'Amalfi Coast', state: 'campania', areas: [{ slug: 'positano', name: 'Positano' }, { slug: 'amalfi', name: 'Amalfi' }] },
      // Dolomites is a mountain range spanning Trentino-Alto Adige, Veneto, and Friuli-Venezia Giulia.
      // Modelling it as a city-level destination under Italy for URL simplicity.
      { slug: 'dolomites', name: 'Dolomites', state: 'trentino-alto-adige', areas: [{ slug: 'cortina-d-ampezzo', name: "Cortina d'Ampezzo" }, { slug: 'val-gardena', name: 'Val Gardena' }, { slug: 'alta-badia', name: 'Alta Badia' }] },
    ],
  },
];

// Fast lookup helpers
const COUNTRY_MAP = new Map(COUNTRIES.map(c => [c.slug, c]));
const REGION_MAP = new Map(REGIONS.map(r => [r.slug, r]));

export function getCountry(slug) {
  return COUNTRY_MAP.get(slug) || null;
}

export function getRegion(slug) {
  return REGION_MAP.get(slug) || null;
}

export function getCity(countrySlug, citySlug) {
  const country = getCountry(countrySlug);
  if (!country) return null;
  return country.cities.find(c => c.slug === citySlug) || null;
}

export function getState(countrySlug, stateSlug) {
  const country = getCountry(countrySlug);
  if (!country) return null;
  return country.states.find(s => s.slug === stateSlug) || null;
}

export function getArea(countrySlug, citySlug, areaSlug) {
  const city = getCity(countrySlug, citySlug);
  if (!city) return null;
  return city.areas.find(a => a.slug === areaSlug) || null;
}

export function isCountry(slug) {
  return COUNTRY_MAP.has(slug);
}

export function isRegion(slug) {
  return REGION_MAP.has(slug);
}

// All country + city slugs flattened — used by dispatchers that need to know
// "is this segment a known destination".
export const ALL_COUNTRY_SLUGS = COUNTRIES.map(c => c.slug);
export const ALL_CITY_SLUGS = COUNTRIES.flatMap(c => c.cities.map(ci => ci.slug));
export const ALL_REGION_SLUGS = REGIONS.map(r => r.slug);
