export const DESTINATIONS = [
  { id: 'bali', name: 'Bali, Indonesia', icon: '🌴', sub: '10-day all-inclusive with private villa', region: 'Asia' },
  { id: 'maldives', name: 'Maldives', icon: '🌅', sub: '7-night overwater villa package', region: 'Asia' },
  { id: 'cancun', name: 'Cancún, Mexico', icon: '🌮', sub: '5-night all-inclusive beach resort', region: 'Americas' },
  { id: 'paris', name: 'Paris, France', icon: '🗼', sub: '5-night romantic getaway', region: 'Europe' },
  { id: 'hawaii', name: 'Hawaii, USA', icon: '🌺', sub: '12-day island hopping adventure', region: 'Americas' },
  { id: 'swiss', name: 'Swiss Alps', icon: '🏔', sub: '8-day ski & mountain package', region: 'Europe' },
  { id: 'japan', name: 'Japan', icon: '🎌', sub: 'Cherry blossom tour · Tokyo + Kyoto', region: 'Asia' },
  { id: 'dubai', name: 'Dubai, UAE', icon: '🏙', sub: '6-night luxury desert & city package', region: 'Middle East' },
  { id: 'santorini', name: 'Santorini, Greece', icon: '⛵', sub: '7-night island paradise', region: 'Europe' },
  { id: 'phuket', name: 'Phuket, Thailand', icon: '🏖', sub: '10-night beach & temple tour', region: 'Asia' },
  { id: 'rome', name: 'Rome, Italy', icon: '🏛', sub: '7-night history & food package', region: 'Europe' },
  { id: 'london', name: 'London, UK', icon: '🇬🇧', sub: '5-night city break', region: 'Europe' },
  { id: 'newyork', name: 'New York, USA', icon: '🗽', sub: '4-night Broadway & sights package', region: 'Americas' },
  { id: 'iceland', name: 'Iceland', icon: '🌌', sub: '8-day Northern Lights & hot springs', region: 'Europe' },
];

export const PACKAGE_TYPES = ['Beach & Resort', 'City Break', 'Adventure', 'Romantic', 'Family', 'Luxury', 'Cultural'];
export const BOARD_TYPES = ['All-Inclusive', 'Breakfast Only', 'Half Board', 'Room Only'];
export const STAR_RATINGS = ['3★', '4★', '5★'];

function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr) { return arr[rnd(0, arr.length - 1)]; }

const AIRLINES = ['Singapore Airlines', 'Emirates', 'United Airlines', 'Delta', 'British Airways', 'Air France', 'Lufthansa', 'Qatar Airways', 'ANA', 'Hawaiian Airlines'];
const HOTELS = ['Luxury Private Villa', 'Beachfront Resort & Spa', 'Boutique Hotel', '5★ Grand Hotel', 'Overwater Villa', 'Mountain Lodge', 'Heritage Palace Hotel', 'Design Hotel', 'Eco Resort', 'City Center Suite Hotel'];
const ACTIVITIES = ['🏄 Surfing Lesson', '🤿 Snorkeling Tour', '🚁 Helicopter Tour', '🧘 Yoga Retreat', '🍷 Wine Tasting', '🎭 Cultural Show', '🏔 Mountain Hike', '🚤 Boat Cruise', '🐘 Wildlife Safari', '🎿 Ski Pass', '🏖 Beach Day', '🗺 Guided City Tour', '🍳 Cooking Class', '💆 Spa Treatment', '🌅 Sunset Cruise'];
const IMGS = {
  bali: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85',
  maldives: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=85',
  cancun: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=600&q=85',
  paris: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=85',
  hawaii: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&q=85',
  swiss: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=85',
  japan: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=85',
  dubai: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=85',
  santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=85',
  phuket: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=85',
  london: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=85',
  newyork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=85',
  iceland: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=85',
};

const PRICE_MAP = { bali: 1299, maldives: 2199, cancun: 699, paris: 1199, hawaii: 1599, swiss: 1899, japan: 1799, dubai: 1499, santorini: 1399, phuket: 899, rome: 1099, london: 999, newyork: 899, iceland: 1699 };
const NIGHTS_MAP = { bali: [7, 12], maldives: [5, 10], cancun: [4, 7], paris: [4, 7], hawaii: [7, 14], swiss: [5, 10], japan: [7, 14], dubai: [4, 8], santorini: [5, 9], phuket: [7, 12], rome: [5, 9], london: [3, 6], newyork: [3, 5], iceland: [6, 10] };

const NAMES = {
  bali: ['Bali Bliss — Luxury Villa Package', 'Bali Zen Retreat — Ubud & Beaches', 'Bali Adventure — Surf & Explore'],
  maldives: ['Maldives — Overwater Villa All-Inclusive', 'Maldives Honeymoon Escape', 'Maldives Dive & Snorkel Package'],
  cancun: ['Cancún All-Inclusive Beach Resort', 'Riviera Maya — Family Fun Package', 'Cancún Nightlife & Beach Package'],
  paris: ['Paris Romantic Getaway', 'Paris Art & Culture Package', 'Paris Luxury Shopping Weekend'],
  hawaii: ['Hawaii Island Hop — Oahu & Maui', 'Hawaii Beach & Volcano Adventure', 'Maui Luxury Resort Package'],
  swiss: ['Swiss Alps Ski Package', 'Switzerland Grand Train Tour', 'Swiss Luxury Spa Retreat'],
  japan: ['Japan Cherry Blossom Tour', 'Tokyo & Kyoto Cultural Journey', 'Japan Food & Temple Trail'],
  dubai: ['Dubai Luxury City & Desert', 'Dubai Family Fun Package', 'Dubai Shopping & Gold Souk Tour'],
  santorini: ['Santorini Sunset Escape', 'Greek Islands Romantic Getaway', 'Santorini Wine & Dine Package'],
  phuket: ['Phuket Beach & Temple Tour', 'Thailand Island Hopping', 'Phuket Wellness Retreat'],
  rome: ['Rome History & Food Package', 'Italy Grand Tour — Rome + Florence', 'Roman Holiday City Break'],
  london: ['London City Break', 'London Theatre & Sights Package', 'London Royal Heritage Tour'],
  newyork: ['New York Broadway & Sights', 'NYC Shopping Weekend', 'New York Food & Culture Package'],
  iceland: ['Iceland Northern Lights & Hot Springs', 'Iceland Ring Road Adventure', 'Iceland Glacier & Whale Tour'],
};

export function generatePackage(id, forcedDest) {
  const destKey = forcedDest || pick(Object.keys(IMGS));
  const dest = DESTINATIONS.find(d => d.id === destKey) || DESTINATIONS[0];
  const [minN, maxN] = NIGHTS_MAP[destKey] || [5, 10];
  const nights = rnd(minN, maxN);
  const basePrice = PRICE_MAP[destKey] || 999;
  const price = basePrice + rnd(-100, 200);
  const airline = pick(AIRLINES);
  const hotel = pick(HOTELS);
  const starRating = pick(['4★', '5★']);
  const type = pick(PACKAGE_TYPES);
  const board = pick(BOARD_TYPES);
  const nameOptions = NAMES[destKey] || [`${dest.name} Package`];
  const name = pick(nameOptions);
  const acts = [];
  const pool = [...ACTIVITIES];
  for (let i = 0; i < rnd(2, 4); i++) acts.push(pool.splice(rnd(0, pool.length - 1), 1)[0]);
  const freeCancellation = rnd(0, 2) > 0;
  const rating = (8 + Math.random() * 2).toFixed(1);
  const reviews = rnd(800, 5000);

  return {
    id: `pkg-${id}`, destination: destKey, destName: dest.name, destIcon: dest.icon, region: dest.region,
    name, nights, price, airline, hotel, starRating, type, board,
    img: IMGS[destKey] || IMGS.bali,
    includes: [`✈ Flights`, `🏨 ${starRating} ${hotel.split(' ').slice(0, 2).join(' ')}`, '🚗 Transfers', `🍳 ${board}`, ...acts.slice(0, 2).map(a => a)],
    activities: acts, freeCancellation,
    rating: Number(rating), reviews, featured: false,
    sub: `NYC → ${dest.name.split(',')[0]} · ${airline} · ${hotel} · ${board}`,
  };
}

export function generatePackagePool(count = 25) {
  const pool = [];
  const ensured = ['bali', 'maldives', 'cancun', 'paris', 'hawaii', 'swiss', 'japan', 'dubai'];
  ensured.forEach((d, i) => pool.push(generatePackage(i, d)));
  for (let i = ensured.length; i < count; i++) pool.push(generatePackage(i));
  pool[0].featured = true;
  return pool;
}

export function getNightsBucket(nights) { return nights <= 5 ? '3-5' : nights <= 9 ? '6-9' : '10-14'; }

export const popularDestinations = [
  { name: 'Bali, Indonesia', sub: '10-day all-inclusive with private villa', price: 1299, img: IMGS.bali, span: true },
  { name: 'Maldives', sub: '7-night overwater villa package', price: 2199, img: IMGS.maldives },
  { name: 'Swiss Alps', sub: '8-day ski & mountain package', price: 1899, img: IMGS.swiss },
  { name: 'Cancún, Mexico', sub: '5-night all-inclusive beach resort', price: 699, img: IMGS.cancun },
  { name: 'Hawaii', sub: '12-day island hopping adventure', price: 1599, img: IMGS.hawaii },
];
