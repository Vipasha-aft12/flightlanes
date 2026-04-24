import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema(
  { icon: String, title: String, desc: String },
  { _id: false }
);

const RouteSchema = new mongoose.Schema(
  { name: String, freq: String, price: String },
  { _id: false }
);

const QuickInfoSchema = new mongoose.Schema(
  { lbl: String, val: String },
  { _id: false }
);

const AirlineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, enum: ['us', 'international', 'budget'] },
    badge: { type: String },
    heroImg: { type: String, required: true },
    cardImg: { type: String },
    about: [{ type: String }],
    stats: [{ val: String, label: String }],
    features: [FeatureSchema],
    routes: [RouteSchema],
    quickInfo: [QuickInfoSchema],
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  },
  { timestamps: true }
);

export default mongoose.models.Airline || mongoose.model('Airline', AirlineSchema);
