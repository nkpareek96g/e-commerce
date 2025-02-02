import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import productRoutes from './routes/product.routes';
import { initializeWebSocket } from './websocket';
import { errorHandler } from './middleware/error.middleware';
import dotenv from 'dotenv';
import orderRoutes from './routes/order.routes';

dotenv.config();

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware should be last
app.use(errorHandler);

// Initialize WebSocket
initializeWebSocket(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { server }; 