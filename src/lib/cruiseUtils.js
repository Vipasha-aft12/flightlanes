export const CRUISE_DESTINATIONS = [
  { id: 'caribbean', name: 'Caribbean', icon: '🌊', sub: 'Jamaica, Bahamas, Cozumel' },
  { id: 'mediterranean', name: 'Mediterranean', icon: '🏛', sub: 'Italy, Greece, Spain, Croatia' },
  { id: 'alaska', name: 'Alaska', icon: '🏔', sub: 'Glacier Bay, Inside Passage' },
  { id: 'norway', name: 'Norwegian Fjords', icon: '🌌', sub: 'Northern Lights, Bergen, Tromsø' },
  { id: 'mexico', name: 'Mexican Riviera', icon: '🌮', sub: 'Cabo, Puerto Vallarta, Mazatlán' },
  { id: 'bahamas', name: 'Bahamas', icon: '🌴', sub: 'Nassau, CocoCay, Freeport' },
  { id: 'bermuda', name: 'Bermuda', icon: '🏖', sub: 'Pink sand beaches, Hamilton' },
  { id: 'hawaii', name: 'Hawaii', icon: '🌺', sub: 'Maui, Oahu, Big Island, Kauai' },
  { id: 'transatlantic', name: 'Transatlantic', icon: '🌍', sub: 'New York to Southampton' },
  { id: 'world', name: 'World Cruise', icon: '🌏', sub: 'Around the world in 180 days' },
];

export const CRUISE_LINES = [
  { name: 'Royal Caribbean', logo: '👑', rating: 9.1, reviews: 14280, ship: 'Symphony of the Seas', passengers: 6680 },
  { name: 'Norwegian Cruise Line', logo: '🚢', rating: 8.8, reviews: 8420, ship: 'Norwegian Epic', passengers: 4100 },
  { name: 'Carnival Cruise Line', logo: '🎪', rating: 8.5, reviews: 11200, ship: 'Carnival Celebration', passengers: 5374 },
  { name: 'Celebrity Cruises', logo: '⭐', rating: 9.0, reviews: 6800, ship: 'Celebrity Edge', passengers: 2918 },
  { name: 'MSC Cruises', logo: '🌊', rating: 8.7, reviews: 7500, ship: 'MSC World Europa', passengers: 6762 },
  { name: 'Princess Cruises', logo: '👸', rating: 8.9, reviews: 6110, ship: 'Discovery Princess', passengers: 3660 },
];

export const SHIP_TYPES = ['Mega Ship', 'Mid-size', 'Small / Boutique'];
export const BOARD_TYPES = ['All-Inclusive', 'Drinks Package', 'Meals Only'];
export const CABIN_TYPES = ['Interior', 'Oceanview', 'Balcony', 'Suite'];
export const DURATIONS = ['3-5', '6-9', '10-14'];

function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr) { return arr[rnd(0, arr.length - 1)]; }

const ROUTES = {
  caribbean: { ports: ['Miami', 'Nassau', 'St. Maarten', 'St. Thomas', 'Cozumel', 'Jamaica', 'Grand Cayman', 'Labadee'], departsFrom: 'Miami', img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=85' },
  mediterranean: { ports: ['Barcelona', 'Rome', 'Santorini', 'Mykonos', 'Athens', 'Dubrovnik', 'Venice', 'Naples'], departsFrom: 'Barcelona', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=85' },
  alaska: { ports: ['Seattle', 'Juneau', 'Glacier Bay', 'Skagway', 'Ketchikan', 'Victoria'], departsFrom: 'Seattle', img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=85' },
  norway: { ports: ['Bergen', 'Tromsø', 'Geiranger', 'Ålesund', 'Stavanger', 'Flåm'], departsFrom: 'Bergen', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=85' },
  mexico: { ports: ['Los Angeles', 'Cabo San Lucas', 'Puerto Vallarta', 'Mazatlán', 'Ensenada'], departsFrom: 'Los Angeles', img: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=600&q=85' },
  bahamas: { ports: ['Miami', 'Nassau', 'CocoCay', 'Freeport', 'Half Moon Cay'], departsFrom: 'Miami', img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=85' },
};

const PRICE_BASE = { caribbean: 549, mediterranean: 799, alaska: 799, norway: 1299, mexico: 599, bahamas: 299, bermuda: 699, hawaii: 999, transatlantic: 1499, world: 8999 };
const NIGHT_RANGE = { caribbean: [5, 9], mediterranean: [7, 14], alaska: [7, 10], norway: [10, 14], mexico: [5, 7], bahamas: [3, 5], bermuda: [5, 7], hawaii: [10, 14], transatlantic: [7, 14], world: [90, 180] };

const FEATS_POOL = [
  '🍽 All Meals', '🎭 Broadway Shows', '🎰 Casino', '🏋 Fitness Center', '🏊 Pool Deck',
  '🍷 Drinks Package', '💆 Spa & Wellness', '🎶 Live Music', '🛍 Shopping', '🎭 Entertainment',
  '🦅 Wildlife Tours', '🧊 Glacier Viewing', '🎿 Shore Excursions', '🏄 Water Slides',
  '🌠 Northern Lights', '⛰ Fjords', '🎢 Zip Line', '⛸ Ice Rink',
];

export function generateCruise(id, forcedDest) {
  const destKey = forcedDest || pick(Object.keys(ROUTES));
  const route = ROUTES[destKey] || ROUTES.caribbean;
  const dest = CRUISE_DESTINATIONS.find(d => d.id === destKey) || CRUISE_DESTINATIONS[0];
  const line = pick(CRUISE_LINES);
  const [minN, maxN] = NIGHT_RANGE[destKey] || [5, 9];
  const nights = rnd(minN, maxN);
  const basePrice = PRICE_BASE[destKey] || 549;
  const price = basePrice + rnd(-50, 200);
  const numPorts = Math.min(route.ports.length, rnd(3, 6));
  const ports = [route.ports[0], ...route.ports.slice(1).sort(() => Math.random() - 0.5).slice(0, numPorts - 1)];
  const feats = [];
  feats.push('🍽 All Meals');
  const pool = FEATS_POOL.filter(f => f !== '🍽 All Meals');
  for (let i = 0; i < 3; i++) feats.push(pool.splice(rnd(0, pool.length - 1), 1)[0]);
  const freeCancellation = rnd(0, 2) > 0;
  const lowDeposit = rnd(0, 1) === 1;

  return {
    id: `cruise-${id}`,
    destination: destKey,
    destName: dest.name,
    destIcon: dest.icon,
    cruiseLine: line,
    name: `${nights}-Night ${dest.name} ${['Escape', 'Discovery', 'Explorer', 'Adventure', 'Paradise', 'Voyage'][rnd(0, 5)]}`,
    nights,
    ports,
    departsFrom: route.departsFrom,
    img: route.img,
    price,
    feats,
    freeCancellation,
    lowDeposit,
    depositAmount: lowDeposit ? rnd(49, 199) : 0,
    shipType: line.passengers > 5000 ? 'Mega Ship' : line.passengers > 3000 ? 'Mid-size' : 'Small / Boutique',
    boardType: rnd(0, 2) === 0 ? 'All-Inclusive' : rnd(0, 1) === 0 ? 'Drinks Package' : 'Meals Only',
    cabinTypes: CABIN_TYPES.slice(0, rnd(2, 4)),
    rating: line.rating,
    reviews: line.reviews,
    featured: false,
  };
}

export function generateCruisePool(count = 25) {
  const pool = [];
  const ensured = ['caribbean', 'mediterranean', 'alaska', 'norway', 'mexico', 'bahamas'];
  ensured.forEach((d, i) => pool.push(generateCruise(i, d)));
  for (let i = ensured.length; i < count; i++) pool.push(generateCruise(i));
  pool[0].featured = true;
  return pool;
}

export function getDurationBucket(nights) {
  if (nights <= 5) return '3-5';
  if (nights <= 9) return '6-9';
  return '10-14';
}

export const popularDestinations = [
  { name: 'Caribbean Cruises', sub: 'Jamaica, Bahamas, Cozumel & more', price: 549, img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=85', span: true },
  { name: 'Mediterranean', sub: 'Italy, Greece, Spain & Croatia', price: 799, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
  { name: 'Alaska Glaciers', sub: 'Glacier Bay & Inside Passage', price: 899, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80' },
  { name: 'Norwegian Fjords', sub: 'Northern Lights & Fjord views', price: 1299, img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80' },
  { name: 'Mexican Riviera', sub: 'Cabo, Puerto Vallarta & Mazatlán', price: 599, img: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=600&q=80' },
];
