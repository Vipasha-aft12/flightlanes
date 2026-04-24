'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import '@/components/hotels/hotels.css';
import '@/components/shared/detail.css';
import { useLoading } from '@/components/loading/LoadingContext';
import { generateClientHotels } from '@/lib/clientFallback';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1100&q=90',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=85',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=85',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&q=85',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=85',
];

const FALLBACK_AMENITIES = [
  { icon: '📶', name: 'Free WiFi', sub: 'High-speed' }, { icon: '🍽', name: 'Restaurant' },
  { icon: '🏊', name: 'Pool' }, { icon: '💆', name: 'Spa' }, { icon: '🏋', name: 'Gym', sub: '24/7' },
  { icon: '🛎', name: 'Concierge' }, { icon: '🅿', name: 'Parking' }, { icon: '☕', name: 'Room Service' },
];

const FALLBACK_ROOMS = [
  { name: 'Standard Room', price: 129, beds: '1 Queen Bed', size: '25 m²', amenities: ['City View', 'Minibar'], freeCancel: true, images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500'] },
  { name: 'Deluxe Room', price: 219, beds: '1 King Bed', size: '35 m²', amenities: ['City View', 'Lounge Access'], freeCancel: true, images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500'] },
  { name: 'Premium Suite', price: 449, beds: '1 King + Living', size: '65 m²', amenities: ['Panoramic View', 'Jacuzzi'], freeCancel: false, images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500'] },
];

const FALLBACK_REVIEWS = [
  { name: 'James T.', avatar: 'JT', rating: 5, text: 'Absolutely stunning hotel.', date: 'Dec 2024', location: 'New York' },
  { name: 'Sophie L.', avatar: 'SL', rating: 5, text: 'Service was impeccable.', date: 'Nov 2024', location: 'London' },
  { name: 'Marco R.', avatar: 'MR', rating: 4, text: 'Beautiful property, incredible location.', date: 'Oct 2024', location: 'Milan' },
  { name: 'Aiko S.', avatar: 'AS', rating: 5, text: 'Perfect for our anniversary.', date: 'Sep 2024', location: 'Tokyo' },
];

const FALLBACK_POLICIES = [
  { icon: '🕐', title: 'Check-in / Check-out', body: 'Check-in from 15:00 · Check-out by 12:00' },
  { icon: '❌', title: 'Cancellation', body: 'Free cancellation up to 48h before arrival.' },
  { icon: '🚭', title: 'House Rules', body: 'No smoking · No pets · No parties.' },
  { icon: '💳', title: 'Payment', body: 'All major credit cards accepted.' },
];

export default function HotelDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showLoading } = useLoading();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [guests, setGuests] = useState(searchParams.get('guests') || '2 Adults');
  const dbId = searchParams.get('dbId') || '';  // MongoDB _id from save step

  useEffect(() => {
    (async () => {
      // 1. Try sessionStorage (from listing page click)
      try {
        const cached = sessionStorage.getItem('hotelDetail');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed._id === id || parsed.slug === id) {
            setHotel(parsed);
            setLoading(false);
            // Still fetch full detail in background for rooms/reviews
            fetchFullDetail(parsed);
            return;
          }
        }
      } catch {}

      // 2. Fetch from proxy API
      await fetchFullDetail(null);
    })();

    if (!checkIn) {
      const d1 = new Date(); d1.setDate(d1.getDate() + 14);
      const d2 = new Date(); d2.setDate(d2.getDate() + 19);
      setCheckIn(d1.toISOString().split('T')[0]);
      setCheckOut(d2.toISOString().split('T')[0]);
    }
  }, [id]);

  const fetchFullDetail = async (partial) => {
    try {
      const res = await fetch(`/api/proxy/hotels/${id}?city=${encodeURIComponent(city)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.name) { setHotel(data); setLoading(false); return; }
      }
    } catch {}
    // Client-side fallback: generate a hotel from the city name
    if (!partial) {
      const detailCity = city || id.split('-hotel-')[0]?.replace(/-/g, ' ') || 'New York';
      const generated = generateClientHotels(detailCity, 15);
      const match = generated.find(h => h._id === id || h.slug === id) || generated[0];
      setHotel(match);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-80">
      <div className="spinner-border mb-3 listing-spinner-lg" />
      <p className="fw-bold">Loading hotel details...</p>
    </div>
  );

  if (!hotel) return (
    <div className="text-center py-5 min-vh-60">
      <div className="listing-empty-icon mb-3">🏨</div>
      <h4>Hotel not found</h4>
      <p className="text-secondary">This hotel may no longer be available.</p>
      <Link href="/hotels" className="btn-fl-primary px-4 py-2 d-inline-block">Search Hotels</Link>
    </div>
  );

  const h = hotel;
  const images = h.images?.length ? h.images : FALLBACK_IMAGES;
  const amenities = h.amenities?.length ? h.amenities : FALLBACK_AMENITIES;
  const rooms = h.rooms?.length ? h.rooms : FALLBACK_ROOMS.map(r => ({ ...r, price: r.price + (h.priceFrom ? h.priceFrom - 129 : 0) }));
  const reviews = h.reviews?.length ? h.reviews : FALLBACK_REVIEWS;
  const policies = h.policies?.length ? h.policies : FALLBACK_POLICIES;
  const room = rooms[selectedRoom] || rooms[0];

  const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 864e5)) : 5;
  const roomTotal = room.price * nights;
  const tax = Math.round(roomTotal * 0.12);
  const total = roomTotal + tax + 35;

  const bookingParams = new URLSearchParams({
    hotel: h.name, room: room.name, price: String(room.price),
    nights: String(nights), total: String(total),
    checkIn, checkOut, city: h.city || city,
    hotelId: h._id || h.hotelId || id,
    image: images[0] || '',
    stars: String(h.stars || 4),
    score: String(h.score || 8.5),
  });
  // Add real API params if available (from API-sourced hotels)
  if (dbId) bookingParams.set('hotelDbId', dbId);
  else if (h.hotelId || h._raw?.hotelId) bookingParams.set('hotelDbId', h._id || '');
  if (room.roomId) bookingParams.set('roomId', room.roomId);
  if (room.rates?.[0]?.priceVerification?.token) bookingParams.set('bookingToken', room.rates[0].priceVerification.token);

  // ── Book Now handler: price check → navigate to booking ──
  const handleBookNow = async () => {
    const hotelDbId = dbId || h._id || '';
    const currentRoomId = room.roomId || '';

    // If we have API IDs, do a price check first to get fresh bookingToken
    if (hotelDbId && currentRoomId) {
      setBookingLoading(true);
      try {
        const params = new URLSearchParams({ id: hotelDbId, roomId: currentRoomId });
        const existingToken = room.rates?.[0]?.priceVerification?.token;
        if (existingToken) params.set('bookingToken', existingToken);

        const res = await fetch(`/api/hotels/price-check?${params}`);
        const data = await res.json();

        // Update bookingParams with fresh token and verified price
        if (data.bookingToken || data.token) {
          bookingParams.set('bookingToken', data.bookingToken || data.token);
        }
        if (data.pricing?.totalPayable || data.price) {
          bookingParams.set('total', String(data.pricing?.totalPayable || data.price || total));
        }
        bookingParams.set('hotelDbId', hotelDbId);
      } catch (err) {
        console.error('Price check error:', err);
        // Continue with existing params — don't block booking
      }
      setBookingLoading(false);
    }

    showLoading('hotel-booking', () => router.push(`/hotels/booking?${bookingParams}`));
  };

  return (
    <div className="hd-detail-bg">
      {/* Breadcrumb Nav */}
      <div className="bg-white border-bottom hd-breadcrumb-bar">
        <div className="container-xl d-flex align-items-center justify-content-between py-2 px-3 flex-wrap gap-2">
          <div className="small text-secondary d-flex align-items-center gap-1">
            <Link href="/hotels" className="text-secondary">Hotels</Link> ›
            <Link href={`/hotels/listing?city=${encodeURIComponent(h.city || city)}`} className="text-secondary">{h.city || city || 'Results'}</Link> ›
            <strong className="text-dark">{h.name}</strong>
          </div>
          <button className="btn-fl-cta btn-fl-cta-sm" disabled={bookingLoading} onClick={handleBookNow}>
            {bookingLoading ? '⏳ Checking price…' : `Reserve · $${room.price}/night`}
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="container-xl px-3 mt-3">
        <div className="hd-gallery-layout">
          <div className="hd-hero-img cursor-pointer">
            <img src={images[0]} alt={h.name} onError={(e) => { e.target.src = FALLBACK_IMAGES[0]; }} />
          </div>
          <div className="hd-thumbs d-none d-md-grid">
            {images.slice(1, 5).map((src, i) => (
              <div key={i} className="hd-thumb position-relative hd-thumb-wrap overflow-hidden">
                <img src={src || FALLBACK_IMAGES[i + 1]} alt="Room" onError={(e) => { e.target.src = FALLBACK_IMAGES[(i + 1) % FALLBACK_IMAGES.length]; }} />
                {i === 3 && <div className="hd-see-all"><span className="text-white fw-bold small">VIEW ALL</span></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="container-xl px-3 mt-3 mb-3">
        <div className="bg-white border rounded-3 p-3 d-flex align-items-center gap-2 flex-wrap">
          <span className="small fw-bold text-secondary text-uppercase hd-toc-label">On this page</span>
          {[['sec-overview','🏨','Overview'],['sec-about','📖','About'],['sec-amenities','🎯','Amenities'],['sec-rooms','🛏','Rooms'],['sec-reviews','⭐','Reviews'],['sec-policies','📋','Policies']].map(([id,icon,label]) => (
            <a key={id} href={`#${id}`} className="btn btn-sm btn-outline-secondary rounded-pill px-3 small fw-semibold hd-toc-link">{icon} {label}</a>
          ))}
        </div>
      </div>

      {/* Content + Widget */}
      <div className="container-xl px-3 pb-5">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* Overview */}
            <div id="sec-overview" className="hd-sec">
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <span className="text-gold">{'★'.repeat(h.stars || 4)}</span>
                {h.badge && <span className="px-2 py-1 rounded-pill small fw-bold hd-star-badge">{h.badge}</span>}
              </div>
              <h1 className="hd-title mb-2">{h.name}</h1>
              <div className="d-flex align-items-center gap-3 flex-wrap pb-3 mb-3 border-bottom">
                <span className="small text-secondary">📍 {h.address || `${h.city || city}`}</span>
                <div className="d-flex align-items-center gap-2 px-2 py-1 rounded-2 hd-score-pill">
                  <span className="hd-score-num">{h.score || '8.5'}</span>
                  <span className="small text-secondary"><strong>{h.scoreLabel || 'Excellent'}</strong> · {h.reviewCount || 0} reviews</span>
                </div>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                {(h.tags || ['Free WiFi', 'Spa', 'Restaurant']).map((t, i) => (
                  <span key={i} className="px-2 py-1 rounded-pill small border hd-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* About */}
            <div id="sec-about" className="hd-sec">
              <h5 className="fw-bold mb-3 pb-2 border-bottom">About This Hotel</h5>
              {(h.aboutText || [h.description || 'A wonderful hotel experience awaits you.']).map((p, i) => (
                <p key={i} className="small text-secondary mb-2 hd-about-text">{p}</p>
              ))}
            </div>

            {/* Amenities */}
            <div id="sec-amenities" className="hd-sec">
              <h5 className="fw-bold mb-3 pb-2 border-bottom">Amenities & Facilities</h5>
              <div className="row g-2">
                {amenities.map((a, i) => (
                  <div key={i} className="col-6 col-md-4">
                    <div className="hd-amen">
                      <span className="fs-6">{typeof a === 'string' ? '✅' : (a.icon || '✅')}</span>
                      <div>
                        <div className="small fw-bold">{typeof a === 'string' ? a : a.name}</div>
                        {a.sub && <div className="hd-amen-sub">{a.sub}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div id="sec-rooms" className="hd-sec">
              <h5 className="fw-bold mb-3 pb-2 border-bottom">Available Rooms</h5>
              {rooms.map((r, i) => (
                <div key={i} className="hd-room">
                  <div className="hd-room-pic">
                    <img src={r.images?.[0] || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} alt={r.name}
                      onError={(e) => { e.target.src = FALLBACK_IMAGES[0]; }} />
                  </div>
                  <div className="p-3 d-flex flex-column gap-1 border-start">
                    <h6 className="hd-room-name">{r.name}</h6>
                    <div className="d-flex gap-1 flex-wrap">
                      {[r.beds, r.size, ...(r.amenities || [])].filter(Boolean).map((s, j) => (
                        <span key={j} className="hd-room-spec">{s}</span>
                      ))}
                    </div>
                    <span className={`small fw-bold rounded-pill px-2 py-1 d-inline-block mt-2`}
                      className={r.freeCancel !== false ? 'hd-room-cancel-free' : 'hd-room-cancel-no'}>
                      {r.freeCancel !== false ? '✅ Free cancellation' : '⚠ Non-refundable'}
                    </span>
                  </div>
                  <div className="p-3 border-start d-flex flex-column align-items-end justify-content-center gap-1">
                    <div className="hd-room-from">from</div>
                    <div className="hd-room-amt">${r.price}</div>
                    <div className="ht-price-from">per night</div>
                    <div className="small text-secondary fw-semibold mb-2">${r.price * nights} · {nights} nights</div>
                    <button className="hd-room-btn" onClick={() => { setSelectedRoom(i); document.getElementById('wg-checkin')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
                      Select Room
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div id="sec-reviews" className="hd-sec">
              <h5 className="fw-bold mb-3 pb-2 border-bottom">Guest Reviews</h5>
              <div className="row g-3">
                {reviews.map((r, i) => (
                  <div key={i} className="col-md-6">
                    <div className="p-3 border rounded-3 bg-white">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="d-flex align-items-center justify-content-center hd-rev-avatar">{r.avatar || r.name?.substring(0,2).toUpperCase()}</div>
                        <div><div className="small fw-bold">{r.name}</div><div className="hd-rev-date">{r.date} · {r.location}</div></div>
                        <span className="ms-auto small text-gold">{'★'.repeat(r.rating || 5)}</span>
                      </div>
                      <p className="small text-secondary mb-0 hd-rev-text-quote">"{r.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div id="sec-policies" className="hd-sec">
              <h5 className="fw-bold mb-3 pb-2 border-bottom">Hotel Policies</h5>
              <div className="row g-2">
                {policies.map((p, i) => (
                  <div key={i} className="col-md-6">
                    <div className="p-3 rounded-3 hd-pol-card">
                      <div className="fs-5 mb-1">{p.icon}</div>
                      <h6 className="small fw-bold mb-1">{p.title}</h6>
                      <p className="mb-0 hd-pol-body">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="col-lg-4">
            <div className="hd-widget">
              <div className="p-3 border-bottom">
                <div className="d-flex align-items-baseline gap-1 mb-1">
                  <span className="hd-wg-amt">${room.price}</span>
                  <span className="small text-secondary">/night</span>
                </div>
                <div className="small text-secondary fw-semibold mb-2">${total} total · {nights} nights</div>
                <div className="d-flex align-items-center gap-2">
                  <span className="px-2 py-1 rounded-2 text-white fw-bold small hd-score-badge">{h.score || '8.5'}</span>
                  <span className="small text-secondary">{h.scoreLabel || 'Excellent'} · {h.reviewCount || 0} reviews</span>
                </div>
              </div>
              <div className="p-3">
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="d-block small fw-bold text-secondary text-uppercase mb-1 wg-label">Check-in</label>
                    <input id="wg-checkin" type="date" className="wg-input" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <label className="d-block small fw-bold text-secondary text-uppercase mb-1 wg-label">Check-out</label>
                    <input type="date" className="wg-input" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="d-block small fw-bold text-secondary text-uppercase mb-1 wg-label">Room Type</label>
                  <select className="wg-input" value={selectedRoom} onChange={e => setSelectedRoom(+e.target.value)}>
                    {rooms.map((r, i) => <option key={i} value={i}>{r.name} — ${r.price}/night</option>)}
                  </select>
                </div>
                <div className="p-3 rounded-3 mb-3 wg-breakdown">
                  {[
                    [`Room rate · ${nights} night${nights > 1 ? 's' : ''}`, `$${roomTotal}`],
                    ['Taxes & fees', `$${tax}`],
                    ['Service fee', '$35'],
                  ].map(([l, v], i) => (
                    <div key={i} className="d-flex justify-content-between small text-secondary py-1 border-bottom wg-bd-row">
                      <span>{l}</span><span>{v}</span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between fw-bold pt-2 wg-bd-total">
                    <span>Total</span><span className="text-teal">${total}</span>
                  </div>
                </div>
                <button onClick={handleBookNow} disabled={bookingLoading}
                  className="wg-cta d-flex align-items-center justify-content-center gap-2">
                  {bookingLoading ? '⏳ Verifying price…' : `Reserve Now · $${total}`}
                </button>
                <div className="mt-3 d-flex flex-column gap-2">
                  {['✅ Best price guarantee', '🔒 Secure SSL booking', '🏆 Earn 200+ loyalty points', '💬 24/7 support'].map((g, i) => (
                    <div key={i} className="small text-secondary">{g}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
