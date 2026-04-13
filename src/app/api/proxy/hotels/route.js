import { NextResponse } from 'next/server';
import { generateHotelsForCity } from '@/lib/dummyHotels';
import { checkAvailability } from '@/lib/hotelApi';

const HOTELS_API = process.env.NEXT_PUBLIC_HOTELS_URL;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'New York';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '2';
  const roomCount = parseInt(searchParams.get('rooms') || '1');
  const sort = searchParams.get('sort') || 'recommended';
  const maxPrice = parseInt(searchParams.get('maxPrice') || '9999');
  const minStars = parseInt(searchParams.get('stars') || '1');
  const page = parseInt(searchParams.get('page') || '1');
  const hotelIds = searchParams.get('hotelIds') || ''; // comma-separated hotel IDs
  const limit = 10;

  // ── 1. Try check availability API (POST /hotels/search) ──
  if (HOTELS_API && checkIn && checkOut) {
    try {
      // Calculate nights
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const totalNights = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));

      // Build guests array (one entry per room)
      const adultsPerRoom = Math.max(1, Math.floor(parseInt(guests) / roomCount));
      const guestsArr = Array.from({ length: roomCount }, () => ({
        adultCount: adultsPerRoom,
        childCount: 0,
        childAge: '',
      }));

      // Parse hotel IDs if provided
      const ids = hotelIds ? hotelIds.split(',').map(id => parseInt(id.trim())).filter(Boolean) : [];

      const data = await checkAvailability({
        checkIn,
        checkOut,
        totalNights,
        totalRooms: roomCount,
        guests: guestsArr,
        countryCode: 'us',
        hotelIds: ids,
        currencyCode: 'USD',
        requestSource: 'affluence',
      });

      // Normalize the response — the API may return data in different shapes
      const hotels = Array.isArray(data) ? data : data.hotels || data.results || data.data || [];
      if (hotels.length > 0) {
        const normalized = hotels.map((h, i) => ({
          _id: h._id || h.hotelId || h.id || `api-${i}`,
          slug: h.slug || h._id || h.hotelId || `api-${i}`,
          hotelId: h.hotelId || h._id || '',
          name: h.name || h.hotelName || 'Hotel',
          stars: h.property?.rating || h.stars || h.starRating || 4,
          score: h.score || h.rating || 8.5,
          scoreLabel: (h.score || 8.5) >= 9 ? 'Exceptional' : (h.score || 8.5) >= 8 ? 'Excellent' : 'Very Good',
          reviewCount: h.reviewCount || h.reviews || 0,
          address: h.location?.address || h.address || '',
          city: h.location?.city || h.city || city,
          badge: h.badge || '',
          description: h.property?.about || h.description || '',
          priceFrom: h.pricing?.startingPrice || h.pricing?.baseFare || h.priceFrom || h.price || 0,
          freeCancel: h.pricing?.refundable ?? h.freeCancel ?? true,
          featured: h.featured || false,
          images: h.media?.photos || h.images || [],
          amenities: (h.amenities || h.highlights || []).map(a => typeof a === 'string' ? { icon: '✅', name: a } : a),
          propertyType: h.property?.type || h.propertyType || 'Hotel',
          tags: h.tags || [],
          // Keep raw data for detail page
          _raw: h,
        }));
        return NextResponse.json({ hotels: normalized, total: data.total || normalized.length, page, source: 'api' });
      }
    } catch (err) {
      console.error('Check availability error:', err.message);
    }
  }

  // ── 2. Try existing GET endpoints ──
  if (HOTELS_API) {
    const endpoints = [
      `${HOTELS_API}/api/hotels?city=${encodeURIComponent(city)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&page=${page}`,
      `${HOTELS_API}/hotels?city=${encodeURIComponent(city)}&checkin=${checkIn}&checkout=${checkOut}`,
      `${HOTELS_API}/api/search?destination=${encodeURIComponent(city)}&adults=${guests}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'ngrok-skip-browser-warning': 'true' },
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          const hotels = Array.isArray(data) ? data : data.hotels || data.results || data.data || null;
          if (hotels && hotels.length > 0) {
            const normalized = hotels.map((h, i) => ({
              _id: h._id || h.id || h.hotelId || `api-${i}`,
              slug: h.slug || h._id || h.id || `api-${i}`,
              name: h.name || h.hotelName || 'Hotel',
              stars: h.stars || h.starRating || 4,
              score: h.score || h.rating || 8.5,
              scoreLabel: (h.score || h.rating || 8.5) >= 9 ? 'Exceptional' : (h.score || h.rating || 8.5) >= 8 ? 'Excellent' : 'Very Good',
              reviewCount: h.reviewCount || h.reviews || 0,
              address: h.address || h.location || '',
              city: h.city || city,
              badge: h.badge || h.label || '',
              description: h.description || h.shortDescription || '',
              priceFrom: h.priceFrom || h.price || h.minPrice || h.rate || 0,
              freeCancel: h.freeCancel ?? h.freeCancellation ?? true,
              featured: h.featured || false,
              images: h.images || (h.image ? [h.image] : h.thumbnail ? [h.thumbnail] : []),
              amenities: (h.amenities || h.facilities || []).map(a => typeof a === 'string' ? { icon: '✅', name: a } : a),
              propertyType: h.propertyType || h.type || 'Hotel',
              tags: h.tags || [],
            }));
            return NextResponse.json({ hotels: normalized, total: data.total || normalized.length, page, source: 'api' });
          }
        }
      } catch {}
    }
  }

  // ── 2. Always fallback to generated dummy data (never show empty) ──
  let allHotels = generateHotelsForCity(city, 30);

  // Apply filters
  if (minStars > 1) allHotels = allHotels.filter(h => h.stars >= minStars);
  if (maxPrice < 9999) allHotels = allHotels.filter(h => h.priceFrom <= maxPrice);

  // Apply sort
  const sortFns = {
    recommended: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.score - a.score,
    'price-low': (a, b) => a.priceFrom - b.priceFrom,
    'price-high': (a, b) => b.priceFrom - a.priceFrom,
    rating: (a, b) => b.score - a.score,
  };
  allHotels.sort(sortFns[sort] || sortFns.recommended);

  const total = allHotels.length;
  const paged = allHotels.slice((page - 1) * limit, page * limit);

  return NextResponse.json({ hotels: paged, total, page, source: 'generated' });
}
