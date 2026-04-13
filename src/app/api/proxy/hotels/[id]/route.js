import { NextResponse } from 'next/server';
import { generateHotelDetail, generateHotelsForCity } from '@/lib/dummyHotels';
import { getHotelDetails } from '@/lib/hotelApi';

const HOTELS_API = process.env.NEXT_PUBLIC_HOTELS_URL;

export async function GET(request, { params }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || '';

  // ── 1. Try hotel details API endpoint ──
  try {
    const data = await getHotelDetails(id);
    if (data && (data.name || data.hotelName || data.hotel)) {
      const h = data.hotel || data;
      return NextResponse.json({
        _id: h._id || h.hotelId || id,
        hotelId: h.hotelId || h._id || id,
        slug: h.slug || id,
        name: h.name || h.hotelName || 'Hotel',
        stars: h.property?.rating || h.stars || 4,
        score: h.score || h.rating || 8.5,
        scoreLabel: (h.score || 8.5) >= 9 ? 'Exceptional' : (h.score || 8.5) >= 8 ? 'Excellent' : 'Very Good',
        reviewCount: h.reviewCount || 0,
        address: h.location?.address || h.address || '',
        city: h.location?.city || h.city || city,
        badge: h.badge || '',
        priceFrom: h.pricing?.startingPrice || h.pricing?.baseFare || h.priceFrom || 0,
        freeCancel: h.pricing?.refundable ?? h.freeCancel ?? true,
        images: h.media?.photos || h.images || [],
        aboutText: h.property?.about ? [h.property.about] : h.aboutText || (h.description ? [h.description] : []),
        amenities: (h.amenities || h.highlights || []).map(a => typeof a === 'string' ? { icon: '✅', name: a } : a),
        rooms: (h.roomList || h.rooms || []).map(r => ({
          roomId: r.roomId || '',
          name: r.roomName || r.name || 'Room',
          category: r.roomCategory || r.category || '',
          price: r.rates?.[0]?.pricing?.totalPayable || r.price || 0,
          beds: r.media?.amenities?.join(', ') || r.beds || '1 Bed',
          size: r.size || '',
          amenities: r.media?.amenities || r.amenities || [],
          freeCancel: r.rates?.[0]?.isRefundable ?? r.freeCancel ?? true,
          images: r.media?.images || r.images || [],
          rates: r.rates || [],
          capacity: r.capacity || {},
        })),
        reviews: (h.reviews || []).map(r => ({
          name: r.name || r.author || 'Guest',
          avatar: (r.name || 'G').substring(0, 2).toUpperCase(),
          rating: r.rating || 5,
          text: r.text || r.comment || '',
          date: r.date || '',
          location: r.location || '',
        })),
        policies: h.policies || [],
        contact: h.contact || {},
        nearby: h.nearby || [],
        tags: h.tags || [],
        source: 'api',
        _raw: h,
      });
    }
  } catch (err) {
    console.error('Hotel details API error:', err.message);
  }

  // ── 2. Try older GET endpoints ──
  if (HOTELS_API) {
    const endpoints = [
      `${HOTELS_API}/api/hotels/${id}`,
      `${HOTELS_API}/hotels/${id}`,
      `${HOTELS_API}/api/hotel/${id}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'ngrok-skip-browser-warning': 'true' },
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          const h = data.hotel || data.data || data;
          if (h && (h.name || h.hotelName)) {
            return NextResponse.json({
              _id: h._id || h.id || id,
              slug: h.slug || id,
              name: h.name || h.hotelName,
              stars: h.stars || h.starRating || 4,
              score: h.score || h.rating || 8.5,
              scoreLabel: (h.score || 8.5) >= 9 ? 'Exceptional' : (h.score || 8.5) >= 8 ? 'Excellent' : 'Very Good',
              reviewCount: h.reviewCount || 0,
              address: h.address || h.location || '',
              city: h.city || city,
              badge: h.badge || '',
              priceFrom: h.priceFrom || h.price || 0,
              freeCancel: h.freeCancel ?? true,
              images: h.images || (h.image ? [h.image] : []),
              aboutText: h.aboutText || (h.description ? [h.description] : []),
              amenities: (h.amenities || h.facilities || []).map(a => typeof a === 'string' ? { icon: '✅', name: a } : a),
              rooms: (h.rooms || []).map(r => ({
                name: r.name || r.roomName || 'Room',
                price: r.price || r.rate || 0,
                beds: r.beds || r.bedType || '1 Bed',
                size: r.size || '',
                amenities: r.amenities || [],
                images: r.images || [],
                freeCancel: r.freeCancel ?? true,
              })),
              reviews: (h.reviews || []).map(r => ({
                name: r.name || r.author || 'Guest',
                avatar: (r.name || 'G').substring(0, 2).toUpperCase(),
                rating: r.rating || 5,
                text: r.text || r.comment || '',
                date: r.date || '',
                location: r.location || '',
              })),
              policies: h.policies || [],
              nearby: h.nearby || [],
              tags: h.tags || [],
              source: 'api',
            });
          }
        }
      } catch {}
    }
  }

  // ── 2. Generate detail from dummy data ──
  const detailCity = city || id.split('-hotel-')[0]?.replace(/-/g, ' ') || 'New York';
  const detail = generateHotelDetail(id, detailCity);
  return NextResponse.json(detail);
}
