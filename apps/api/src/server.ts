// apps/api/src/server.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import inventoryRoutes from './routes/inventory.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8081'], // Next.js & Expo Defaults
  credentials: true
}));

import path from 'path';

// Route Mounts
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

// Static Uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ONLINE', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[GATEWAY ACTIVE]: Command Center listening on port ${PORT}`);
});
