import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import dataRoutes from './src/routes/data';
import { fetchData } from './src/services/fetchData';
import cors from 'cors';

dotenv.config();

const app = express();

const cors_options = {
  origin: ['http://localhost:3000', /\.netlify\.app$/],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(cors_options));

const port = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

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

app.options('*', cors(cors_options)); 

app.use('/api/data', dataRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: cors_options
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  fetchData(io);
});
