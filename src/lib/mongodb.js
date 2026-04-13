import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) throw new Error('Please define MONGODB_URL in .env.local');

let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
