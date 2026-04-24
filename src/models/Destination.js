import mongoose from 'mongoose';

const HighlightSchema = new mongoose.Schema(
  { icon: String, title: String, desc: String },
  { _id: false }
);

const QuickInfoSchema = new mongoose.Schema(
  { lbl: String, val: String },
  { _id: false }
);

const DestinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    continent: { type: String, required: true, enum: ['asia', 'europe', 'americas', 'middle-east', 'africa', 'pacific'] },
    region: { type: String, required: true },
    tagline: { type: String },
    heroImg: { type: String, required: true },
    cardImg: { type: String },
    flag: { type: String },
    about: [{ type: String }],
    stats: [{ val: String, label: String }],
    highlights: [HighlightSchema],
    tips: [{ type: String }],
    quickInfo: [QuickInfoSchema],
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  },
  { timestamps: true }
);

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
