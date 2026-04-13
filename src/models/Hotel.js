import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: String,
  type: { type: String, default: 'Standard' },
  price: Number,
  maxGuests: { type: Number, default: 2 },
  beds: String,
  size: String,
  amenities: [String],
  images: [String],
  freeCancel: { type: Boolean, default: true },
});

const ReviewSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  date: String,
  rating: Number,
  text: String,
  location: String,
});

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  stars: { type: Number, default: 4 },
  score: { type: Number, default: 8.5 },
  scoreLabel: { type: String, default: 'Excellent' },
  reviewCount: { type: Number, default: 0 },
  address: String,
  city: String,
  country: String,
  lat: Number,
  lng: Number,
  badge: String,
  description: String,
  aboutText: [String],
  images: [String],
  amenities: [{ icon: String, name: String, sub: String }],
  rooms: [RoomSchema],
  reviews: [ReviewSchema],
  policies: [{ icon: String, title: String, body: String }],
  nearby: [{ name: String, distance: String }],
  tags: [String],
  priceFrom: Number,
  freeCancel: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  propertyType: { type: String, default: 'Hotel' },
  neighborhood: String,
}, { timestamps: true });

export default mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);
