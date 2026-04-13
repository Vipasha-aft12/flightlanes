import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  firstName: String, lastName: String, email: String,
  phone: String, dob: String, nationality: String,
  documentNumber: String, documentExpiry: String, documentCountry: String,
});

const BookingSchema = new mongoose.Schema({
  refCode: { type: String, unique: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  hotelName: String, roomType: String,
  checkIn: Date, checkOut: Date, nights: Number,
  guests: [GuestSchema], guestCount: { type: Number, default: 2 },
  addons: [{ name: String, price: Number }],
  roomRate: Number, taxAmount: Number,
  serviceFee: { type: Number, default: 35 },
  totalAmount: Number,
  paymentMethod: { type: String, default: 'card' },
  cardLast4: String,
  status: { type: String, default: 'confirmed' },
}, { timestamps: true });

BookingSchema.pre('save', function (next) {
  if (!this.refCode) this.refCode = 'FL-' + Math.floor(10000 + Math.random() * 90000);
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
