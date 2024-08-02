import { Schema, model } from 'mongoose';

const dataSchema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Data = model('Data', dataSchema);
