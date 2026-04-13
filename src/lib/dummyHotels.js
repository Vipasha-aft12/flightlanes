const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=85',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=85',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=85',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=85',
  'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=85',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=85',
  'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&q=85',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=85',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=85',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=85',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=85',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=85',
  'https://images.unsplash.com/photo-1521783988139-89397d761dce?w=600&q=85',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85',
];

const HOTEL_TEMPLATES = [
  { prefix: 'The Grand', suffix: 'Hotel', stars: 5, scoreBase: 9.0, priceBase: 289, badge: '5-Star Luxury', type: 'Hotel', feat: true },
  { prefix: 'Royal', suffix: 'Palace & Spa', stars: 5, scoreBase: 9.3, priceBase: 620, badge: 'Iconic Palace', type: 'Hotel', feat: true },
  { prefix: 'Hilton', suffix: '', stars: 5, scoreBase: 8.8, priceBase: 245, badge: '5-Star Chain', type: 'Hotel', feat: false },
  { prefix: 'Marriott', suffix: 'Suites', stars: 4, scoreBase: 8.5, priceBase: 199, badge: '4-Star', type: 'Hotel', feat: false },
  { prefix: 'The Boutique', suffix: 'Inn', stars: 4, scoreBase: 8.9, priceBase: 179, badge: 'Boutique', type: 'Boutique', feat: false },
  { prefix: 'Hyatt Regency', suffix: '', stars: 5, scoreBase: 8.7, priceBase: 259, badge: '5-Star', type: 'Hotel', feat: true },
  { prefix: 'Holiday Inn', suffix: 'Express', stars: 3, scoreBase: 7.8, priceBase: 89, badge: '3-Star Value', type: 'Hotel', feat: false },
  { prefix: 'Comfort Suites', suffix: 'Downtown', stars: 3, scoreBase: 7.5, priceBase: 79, badge: 'Budget-Friendly', type: 'Hotel', feat: false },
  { prefix: 'Radisson Blu', suffix: '', stars: 4, scoreBase: 8.4, priceBase: 169, badge: '4-Star', type: 'Hotel', feat: false },
  { prefix: 'InterContinental', suffix: 'Resort', stars: 5, scoreBase: 9.1, priceBase: 349, badge: '5-Star Resort', type: 'Resort', feat: true },
  { prefix: 'Sheraton', suffix: 'Hotel & Tower', stars: 4, scoreBase: 8.3, priceBase: 189, badge: '4-Star', type: 'Hotel', feat: false },
  { prefix: 'W', suffix: 'Hotel', stars: 5, scoreBase: 8.9, priceBase: 299, badge: 'Lifestyle Luxury', type: 'Boutique', feat: false },
  { prefix: 'Best Western Plus', suffix: '', stars: 3, scoreBase: 7.6, priceBase: 69, badge: 'Great Value', type: 'Hotel', feat: false },
  { prefix: 'Westin', suffix: '', stars: 4, scoreBase: 8.6, priceBase: 219, badge: '4-Star Wellness', type: 'Hotel', feat: false },
  { prefix: 'Four Seasons', suffix: '', stars: 5, scoreBase: 9.5, priceBase: 599, badge: 'Ultra-Luxury', type: 'Hotel', feat: true },
];

const AMENITIES_POOL = [
  { icon: '📶', name: 'Free WiFi', sub: 'High-speed' },
  { icon: '🏊', name: 'Swimming Pool', sub: 'Heated indoor' },
  { icon: '💆', name: 'Spa & Wellness', sub: 'Full-service' },
  { icon: '🏋', name: 'Fitness Center', sub: '24/7 access' },
  { icon: '🍽', name: 'Restaurant', sub: 'On-site dining' },
  { icon: '🛎', name: 'Concierge', sub: '24-hour' },
  { icon: '🅿', name: 'Parking', sub: 'Valet available' },
  { icon: '☕', name: 'Room Service', sub: '24-hour menu' },
  { icon: '🍳', name: 'Breakfast', sub: 'Buffet included' },
  { icon: '🧖', name: 'Sauna', sub: 'Steam & dry' },
  { icon: '🏖', name: 'Beach Access', sub: 'Private beach' },
  { icon: '🎯', name: 'Business Center', sub: 'Meeting rooms' },
];

const REVIEW_POOL = [
  { name: 'James T.', avatar: 'JT', rating: 5, text: 'Absolutely stunning hotel. The service was impeccable from start to finish.', location: 'New York' },
  { name: 'Sophie L.', avatar: 'SL', rating: 5, text: 'Best hotel experience I have ever had. Will definitely return.', location: 'London' },
  { name: 'Marco R.', avatar: 'MR', rating: 4, text: 'Beautiful property with incredible location. Breakfast was outstanding.', location: 'Milan' },
  { name: 'Aiko S.', avatar: 'AS', rating: 5, text: 'Perfect for our anniversary. The views were breathtaking.', location: 'Tokyo' },
  { name: 'Emily C.', avatar: 'EC', rating: 4, text: 'Clean, comfortable, and well-located. Great value for money.', location: 'Sydney' },
  { name: 'David M.', avatar: 'DM', rating: 5, text: 'The staff went above and beyond. Truly a five-star experience.', location: 'Toronto' },
  { name: 'Lisa K.', avatar: 'LK', rating: 4, text: 'Lovely property. The pool area was the highlight of our stay.', location: 'Chicago' },
  { name: 'Chen W.', avatar: 'CW', rating: 5, text: 'Exceeded all expectations. The attention to detail was remarkable.', location: 'Shanghai' },
];

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function hashCity(city) {
  let hash = 0;
  for (let i = 0; i < city.length; i++) {
    hash = ((hash << 5) - hash) + city.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateHotelsForCity(city, count = 12) {
  const cityName = city.split(',')[0].trim();
  const seed = hashCity(cityName.toLowerCase());
  const hotels = [];

  for (let i = 0; i < count; i++) {
    const t = HOTEL_TEMPLATES[i % HOTEL_TEMPLATES.length];
    const r = seededRandom(seed + i * 137);
    const r2 = seededRandom(seed + i * 253);
    const r3 = seededRandom(seed + i * 419);

    const priceVariation = Math.round((r - 0.5) * t.priceBase * 0.3);
    const scoreVariation = (r2 - 0.5) * 0.6;
    const price = Math.max(49, t.priceBase + priceVariation);
    const score = Math.min(9.8, Math.max(7.0, (t.scoreBase + scoreVariation))).toFixed(1);
    const imgIdx = (seed + i) % HOTEL_IMAGES.length;

    const id = `${cityName.toLowerCase().replace(/\s+/g, '-')}-hotel-${i + 1}`;
    const hotelName = `${t.prefix} ${cityName}${t.suffix ? ' ' + t.suffix : ''}`;

    const amenityStart = Math.floor(r3 * 4);
    const amenityCount = t.stars >= 4 ? 6 : 4;

    hotels.push({
      _id: id,
      slug: id,
      name: hotelName,
      stars: t.stars,
      score: parseFloat(score),
      scoreLabel: score >= 9 ? 'Exceptional' : score >= 8 ? 'Excellent' : 'Very Good',
      reviewCount: Math.round(500 + r * 8000),
      address: `${Math.round(r * 200)} ${['Main Street', 'Broadway', 'Park Avenue', 'Ocean Drive', 'Grand Boulevard', 'Central Avenue', 'Market Street', 'Lake Shore Drive'][Math.floor(r2 * 8)]} · ${cityName} City Center`,
      city: cityName,
      country: '',
      badge: t.badge,
      description: `Experience luxury at ${hotelName}, located in the heart of ${cityName}. Featuring world-class amenities, exceptional dining, and unparalleled service.`,
      priceFrom: price,
      freeCancel: r > 0.2,
      featured: i < 3 && t.feat,
      propertyType: t.type,
      neighborhood: ['City Center', 'Downtown', 'Near Airport', 'Waterfront', 'Historic District', 'Business District'][Math.floor(r3 * 6)],
      images: [
        HOTEL_IMAGES[imgIdx],
        HOTEL_IMAGES[(imgIdx + 1) % HOTEL_IMAGES.length],
        HOTEL_IMAGES[(imgIdx + 2) % HOTEL_IMAGES.length],
        HOTEL_IMAGES[(imgIdx + 3) % HOTEL_IMAGES.length],
        HOTEL_IMAGES[(imgIdx + 4) % HOTEL_IMAGES.length],
      ],
      amenities: AMENITIES_POOL.slice(amenityStart, amenityStart + amenityCount),
      tags: ['Free WiFi', t.stars >= 4 ? 'Spa' : 'Parking', 'Restaurant', t.stars >= 5 ? 'Rooftop Bar' : 'Gym'].filter(Boolean),
    });
  }

  return hotels;
}

export function generateHotelDetail(hotelOrId, city) {
  const hotels = generateHotelsForCity(city || 'New York', 15);
  const hotel = typeof hotelOrId === 'string'
    ? hotels.find(h => h._id === hotelOrId || h.slug === hotelOrId) || hotels[0]
    : hotelOrId;

  const seed = hashCity((hotel.name || '').toLowerCase());
  const r = seededRandom(seed);

  return {
    ...hotel,
    aboutText: [
      `Welcome to ${hotel.name}, a premier ${hotel.stars}-star property in the heart of ${hotel.city || city}. Our hotel combines elegant design with modern comfort to create an unforgettable stay.`,
      `Guests enjoy world-class dining, a state-of-the-art fitness center, and our signature spa treatments. Whether you're traveling for business or leisure, ${hotel.name} offers the perfect retreat.`,
    ],
    rooms: [
      { name: 'Standard Room', price: hotel.priceFrom, beds: '1 Queen Bed', size: '25 m²', amenities: ['City View', 'Minibar', 'Safe'], freeCancel: true, images: [HOTEL_IMAGES[(seed) % HOTEL_IMAGES.length]] },
      { name: 'Deluxe Room', price: Math.round(hotel.priceFrom * 1.5), beds: '1 King Bed', size: '35 m²', amenities: ['Premium View', 'Lounge Access', 'Minibar'], freeCancel: true, images: [HOTEL_IMAGES[(seed + 3) % HOTEL_IMAGES.length]] },
      { name: 'Executive Suite', price: Math.round(hotel.priceFrom * 2.8), beds: '1 King + Living Room', size: '65 m²', amenities: ['Panoramic View', 'Butler Service', 'Jacuzzi'], freeCancel: r > 0.4, images: [HOTEL_IMAGES[(seed + 6) % HOTEL_IMAGES.length]] },
    ],
    reviews: REVIEW_POOL.slice(0, 4).map((rv, i) => ({
      ...rv,
      date: ['Jan 2025', 'Dec 2024', 'Nov 2024', 'Oct 2024'][i],
    })),
    policies: [
      { icon: '🕐', title: 'Check-in / Check-out', body: 'Check-in from 15:00 · Check-out by 12:00 noon. Early/late available on request.' },
      { icon: '❌', title: 'Cancellation', body: 'Free cancellation up to 48h before arrival. Within 48h: first night charged.' },
      { icon: '🚭', title: 'House Rules', body: 'No smoking · No pets · No parties. Children of all ages welcome.' },
      { icon: '💳', title: 'Payment', body: 'All major credit cards accepted. Deposit of first night at booking.' },
    ],
    nearby: [
      { name: `${hotel.city || city} Central Station`, distance: '0.5 km' },
      { name: 'Shopping District', distance: '0.3 km' },
      { name: 'City Museum', distance: '0.8 km' },
      { name: 'Airport', distance: '18 km' },
    ],
    source: 'generated',
  };
}
