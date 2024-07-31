import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dataRoutes from './routes/data';
import { fetchData } from './services/fetchData';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.MONGO_URI)

mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/api/data', dataRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  fetchData();
});
