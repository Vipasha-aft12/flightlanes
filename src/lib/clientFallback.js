const IMAGES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=85',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=85',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=85',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=85',
  'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=85',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=85',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=85',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=85',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=85',
];

const TEMPLATES = [
  { prefix: 'The Grand', stars: 5, score: 9.2, price: 289, badge: '5-Star Luxury', feat: true },
  { prefix: 'Royal', stars: 5, score: 9.4, price: 520, badge: 'Iconic Palace', feat: true },
  { prefix: 'Hilton', stars: 5, score: 8.8, price: 245, badge: '5-Star Chain', feat: false },
  { prefix: 'Marriott Suites', stars: 4, score: 8.5, price: 199, badge: '4-Star', feat: false },
  { prefix: 'The Boutique Inn', stars: 4, score: 8.9, price: 179, badge: 'Boutique', feat: false },
  { prefix: 'Hyatt Regency', stars: 5, score: 8.7, price: 259, badge: '5-Star', feat: true },
  { prefix: 'Holiday Inn', stars: 3, score: 7.8, price: 89, badge: 'Great Value', feat: false },
  { prefix: 'Comfort Suites', stars: 3, score: 7.5, price: 79, badge: 'Budget-Friendly', feat: false },
  { prefix: 'Radisson Blu', stars: 4, score: 8.4, price: 169, badge: '4-Star', feat: false },
  { prefix: 'InterContinental', stars: 5, score: 9.1, price: 349, badge: '5-Star Resort', feat: true },
  { prefix: 'Sheraton', stars: 4, score: 8.3, price: 189, badge: '4-Star', feat: false },
  { prefix: 'Four Seasons', stars: 5, score: 9.5, price: 599, badge: 'Ultra-Luxury', feat: true },
];

export function generateClientHotels(city, count = 12) {
  const cityName = city.split(',')[0].trim();
  return TEMPLATES.slice(0, count).map((t, i) => ({
    _id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-hotel-${i + 1}`,
    slug: `${cityName.toLowerCase().replace(/\s+/g, '-')}-hotel-${i + 1}`,
    name: `${t.prefix} ${cityName}`,
    stars: t.stars,
    score: t.score,
    scoreLabel: t.score >= 9 ? 'Exceptional' : t.score >= 8 ? 'Excellent' : 'Very Good',
    reviewCount: Math.round(500 + Math.random() * 5000),
    address: `${cityName} City Center`,
    city: cityName,
    badge: t.badge,
    description: `Luxury ${t.stars}-star hotel in ${cityName} with world-class amenities.`,
    priceFrom: t.price + Math.round((Math.random() - 0.5) * 60),
    freeCancel: Math.random() > 0.2,
    featured: i < 3 && t.feat,
    images: [IMAGES[i % IMAGES.length]],
    amenities: [
      { icon: '📶', name: 'Free WiFi' },
      { icon: '🏊', name: 'Pool' },
      { icon: '💆', name: 'Spa' },
      { icon: '🍽', name: 'Restaurant' },
    ],
    tags: ['Free WiFi', 'Restaurant'],
  }));
}
