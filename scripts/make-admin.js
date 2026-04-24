import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) { console.error('Missing MONGODB_URL'); process.exit(1); }

await mongoose.connect(MONGODB_URL);
const users = mongoose.connection.db.collection('users');

const all = await users.find({}).project({ email: 1, role: 1, isActive: 1 }).toArray();
console.log('Current users:', all);

const result = await users.updateMany({}, { $set: { role: 'admin', isActive: true } });
console.log('Updated:', result.modifiedCount, 'user(s) to role: admin');

process.exit(0);
