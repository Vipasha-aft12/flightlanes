export const RENTAL_LOCATIONS = [
  { id: 'lax', name: 'Los Angeles, CA', sub: 'LAX Airport', icon: '✈️' },
  { id: 'jfk', name: 'New York, NY', sub: 'JFK Airport', icon: '✈️' },
  { id: 'mia', name: 'Miami, FL', sub: 'MIA Airport', icon: '✈️' },
  { id: 'ord', name: 'Chicago, IL', sub: "O'Hare Airport", icon: '✈️' },
  { id: 'las', name: 'Las Vegas, NV', sub: 'LAS Airport', icon: '✈️' },
  { id: 'sfo', name: 'San Francisco, CA', sub: 'SFO Airport', icon: '✈️' },
  { id: 'dfw', name: 'Dallas, TX', sub: 'DFW Airport', icon: '✈️' },
  { id: 'sea', name: 'Seattle, WA', sub: 'SEA Airport', icon: '✈️' },
  { id: 'den', name: 'Denver, CO', sub: 'DEN Airport', icon: '✈️' },
  { id: 'atl', name: 'Atlanta, GA', sub: 'ATL Airport', icon: '✈️' },
  { id: 'bos', name: 'Boston, MA', sub: 'BOS Airport', icon: '✈️' },
  { id: 'phx', name: 'Phoenix, AZ', sub: 'PHX Airport', icon: '✈️' },
  { id: 'hnl', name: 'Honolulu, HI', sub: 'HNL Airport', icon: '🌴' },
  { id: 'orl', name: 'Orlando, FL', sub: 'MCO Airport', icon: '✈️' },
  { id: 'lax-dt', name: 'Los Angeles Downtown', sub: 'City Center', icon: '🏙' },
  { id: 'mia-sb', name: 'Miami South Beach', sub: 'Collins Ave', icon: '🏖' },
  { id: 'nyc-mn', name: 'Manhattan, NY', sub: 'Midtown', icon: '🏙' },
];

export const COMPANIES = [
  { name: 'Enterprise', logo: '🟢', color: '#059669', rating: 4.6, reviews: 12840, badge: '⭐ Best Rated' },
  { name: 'Hertz', logo: '🟡', color: '#d97706', rating: 4.4, reviews: 9210, badge: '🏆 Most Popular' },
  { name: 'Avis', logo: '🔴', color: '#dc2626', rating: 4.5, reviews: 7830, badge: 'Business Fav' },
  { name: 'Budget', logo: '🔵', color: '#2563eb', rating: 4.2, reviews: 5190, badge: '💰 Best Value' },
  { name: 'National', logo: '🟠', color: '#ea580c', rating: 4.7, reviews: 3420, badge: 'Skip the Counter' },
  { name: 'Alamo', logo: '🟤', color: '#78350f', rating: 4.3, reviews: 4890, badge: 'Family Pick' },
  { name: 'Dollar', logo: '🔶', color: '#c2410c', rating: 4.1, reviews: 3100, badge: 'No Surprises' },
  { name: 'Thrifty', logo: '🔵', color: '#1d4ed8', rating: 4.0, reviews: 2780, badge: 'Budget Pick' },
];

export const CAR_TYPES = ['Economy', 'Compact', 'SUV', 'Luxury', 'Minivan', 'Convertible', 'Electric'];
export const TRANSMISSIONS = ['Automatic', 'Manual'];

const CAR_MODELS = {
  Economy: [
    { name: 'Toyota Corolla or Similar', seats: 5, bags: 2, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80' },
    { name: 'Hyundai Elantra or Similar', seats: 5, bags: 2, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80' },
    { name: 'Nissan Versa or Similar', seats: 5, bags: 2, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80' },
  ],
  Compact: [
    { name: 'Honda Civic or Similar', seats: 5, bags: 2, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80' },
    { name: 'Toyota Camry or Similar', seats: 5, bags: 3, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80' },
  ],
  SUV: [
    { name: 'Jeep Grand Cherokee or Similar', seats: 5, bags: 4, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
    { name: 'Ford Explorer or Similar', seats: 7, bags: 4, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
    { name: 'Chevrolet Tahoe or Similar', seats: 7, bags: 5, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
  ],
  Luxury: [
    { name: 'Mercedes-Benz E-Class or Similar', seats: 5, bags: 3, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80' },
    { name: 'BMW 5 Series or Similar', seats: 5, bags: 3, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80' },
    { name: 'Audi A6 or Similar', seats: 5, bags: 3, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80' },
  ],
  Minivan: [
    { name: 'Chrysler Pacifica or Similar', seats: 7, bags: 5, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
    { name: 'Toyota Sienna or Similar', seats: 8, bags: 4, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
  ],
  Convertible: [
    { name: 'Ford Mustang Convertible or Similar', seats: 4, bags: 2, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80' },
    { name: 'Chevrolet Camaro Convertible or Similar', seats: 4, bags: 2, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80' },
  ],
  Electric: [
    { name: 'Tesla Model 3 or Similar', seats: 5, bags: 2, img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80' },
    { name: 'Chevrolet Bolt or Similar', seats: 5, bags: 2, img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80' },
  ],
};

function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr) { return arr[rnd(0, arr.length - 1)]; }

const PRICE_RANGES = {
  Economy: [19, 38], Compact: [25, 45], SUV: [42, 78], Luxury: [75, 130],
  Minivan: [55, 90], Convertible: [60, 105], Electric: [65, 110],
};

const FEATURES_POOL = [
  { text: '✅ Free Cancellation', green: true },
  { text: '🛞 Unlimited Miles', green: true },
  { text: '🛡 Basic Insurance', green: false },
  { text: '🛡 Collision Cover', green: false },
  { text: '🛡 Full Coverage', green: false },
  { text: '🚗 Airport Pickup', green: false },
  { text: '📶 SiriusXM', green: false },
  { text: '📶 WiFi Hotspot', green: false },
  { text: '❄ A/C', green: false },
  { text: '🎶 Premium Audio', green: false },
  { text: '⚡ Free Supercharging', green: true },
  { text: '📶 Autopilot', green: false },
];

export function generateCar(id, forcedType) {
  const type = forcedType || pick(CAR_TYPES);
  const model = pick(CAR_MODELS[type] || CAR_MODELS.Economy);
  const company = pick(COMPANIES);
  const [minP, maxP] = PRICE_RANGES[type] || [20, 50];
  const price = rnd(minP, maxP);
  const transmission = type === 'Electric' ? 'Automatic' : pick(TRANSMISSIONS);
  const freeCancellation = rnd(0, 2) > 0;
  const unlimitedMiles = rnd(0, 3) > 0;

  const features = [];
  if (freeCancellation) features.push({ text: '✅ Free Cancellation', green: true });
  else features.push({ text: '❌ Non-refundable', green: false });
  if (unlimitedMiles) features.push({ text: '🛞 Unlimited Miles', green: true });
  features.push(pick(FEATURES_POOL.filter(f => !f.text.includes('Cancel') && !f.text.includes('Miles'))));
  if (type === 'Electric') features.push({ text: '⚡ Free Supercharging', green: true });
  else features.push({ text: '🚗 Airport Pickup', green: false });

  const extras = [];
  if (type === 'SUV') extras.push('🏔 4WD');
  else if (type === 'Convertible') extras.push('🌞 Soft Top');
  else if (type === 'Electric') extras.push(`⚡ ${rnd(250, 400)}mi Range`);
  else if (type === 'Luxury') extras.push('🌟 Premium');
  else extras.push('❄ A/C');

  return {
    id: `car-${id}`,
    type,
    typeEmoji: { Economy: '🚗', Compact: '🚗', SUV: '🚙', Luxury: '💎', Minivan: '🚐', Convertible: '🏎', Electric: '⚡' }[type] || '🚗',
    name: model.name,
    seats: model.seats,
    bags: model.bags,
    img: model.img,
    transmission,
    company,
    price,
    features,
    freeCancellation,
    unlimitedMiles,
    extras,
    rating: company.rating,
    reviews: company.reviews,
    fullInsurance: rnd(0, 1) === 1,
    airportPickup: rnd(0, 1) === 1,
    isElectric: type === 'Electric',
  };
}

export function generateCarPool(count = 30) {
  const pool = [];
  // Ensure variety: first few are specific types
  const ensured = ['Economy', 'SUV', 'Luxury', 'Convertible', 'Electric', 'Minivan', 'Compact'];
  ensured.forEach((type, i) => pool.push(generateCar(i, type)));
  for (let i = ensured.length; i < count; i++) pool.push(generateCar(i));
  // Mark first as featured (best deal)
  pool[0].featured = true;
  return pool;
}

export function getCarPrice(car, days = 4) {
  return { perDay: car.price, total: car.price * days, days };
}

export const popularDestinations = [
  { name: 'Route 66, USA', sub: "America's most iconic road trip", price: 29, img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85', span: true },
  { name: 'Miami, Florida', sub: 'Convertibles & SUVs for the coast', price: 34, img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80' },
  { name: 'Las Vegas, Nevada', sub: 'Luxury & sports car rentals', price: 42, img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
  { name: 'Los Angeles, CA', sub: 'SUVs, sedans, EVs & more', price: 38, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80' },
  { name: 'Europe Road Trips', sub: 'Drive across Italy, France & Spain', price: 27, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
];

export const carDeals = [
  { tag: '🏙 Economy · New York City', title: 'Compact Car — JFK Airport', meta: '🗓 Jul 1–7 · 7 days · Hertz / Enterprise', price: 22, badge: '🚗 Best Value', img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80' },
  { tag: '🌴 SUV · Miami International', title: 'Full-Size SUV — MIA Airport', meta: '🗓 Aug 5–12 · 7 days · Budget / Alamo', price: 54, badge: '🔥 Flash Deal', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
  { tag: '💎 Luxury · Las Vegas', title: 'Luxury Sedan — LAS Airport', meta: '🗓 Sep 1–5 · 4 days · Hertz Gold · GPS incl.', price: 89, badge: '💎 Luxury Pick', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80' },
];

export const rentalCompanies = [
  { name: 'Hertz', logo: '🟡', desc: "America's largest car rental brand — 3,000+ US locations, premium fleet including EVs and luxury vehicles.", rate: 29, badge: '🏆 Most Popular', badgeTop: true, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80' },
  { name: 'Enterprise', logo: '🟢', desc: 'Best-in-class customer service with free pickup from many locations. Over 6,000 US branches nationwide.', rate: 25, badge: '⭐ Best Rated', badgeTop: true, img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80' },
  { name: 'Avis', logo: '🔴', desc: 'Preferred choice for business travelers with a wide range of vehicles and flexible rental terms at major airports.', rate: 27, badge: 'Business Fav', badgeTop: false, img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80' },
  { name: 'Budget', logo: '🔵', desc: 'The go-to choice for value-conscious travelers. Affordable daily rates with no compromise on quality or safety.', rate: 19, badge: '💰 Best Value', badgeTop: true, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
  { name: 'National', logo: '🟠', desc: 'The Emerald Club advantage — skip the counter, go straight to your car. Ideal for frequent business flyers.', rate: 32, badge: 'Skip the Counter', badgeTop: false, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
  { name: 'Alamo', logo: '🟤', desc: 'Leisure-focused brand with family-friendly vehicles and great value for vacation travelers.', rate: 22, badge: 'Family Pick', badgeTop: false, img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80' },
  { name: 'Dollar', logo: '🔶', desc: 'Straightforward pricing with no hidden charges. A solid budget option available at major US airports.', rate: 18, badge: 'No Surprises', badgeTop: false, img: 'https://images.unsplash.com/photo-1480877210575-7a5e296bb23c?w=600&q=80' },
  { name: 'Thrifty', logo: '🔵', desc: 'Great deals for budget-savvy explorers. Earn Blue Chip points on every rental.', rate: 20, badge: 'Budget Pick', badgeTop: false, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
];
