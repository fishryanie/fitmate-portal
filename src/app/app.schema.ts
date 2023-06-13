import mongoose from 'mongoose';

export const ConfigApp = new mongoose.Schema({
  version: { type: String, unique: true },
  hotLine: { type: String, unique: true },
  email: { type: String, unique: true },
  timeZone: { type: String, unique: true },
});
