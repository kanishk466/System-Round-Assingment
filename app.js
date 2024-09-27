import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import serviceRoutes from './src/routes/service.routes.js';

import cors from "cors"

dotenv.config();
const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
