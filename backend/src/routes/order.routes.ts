import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.middleware';
import { broadcastStockUpdate } from '../websocket';

const router = Router();
const prisma = new PrismaClient();

interface CheckoutItem {
    productId: number;
    quantity: number;
  }
  
  // Checkout endpoint
  router.post('/checkout', async (req, res) => {
    const { items }: { items: CheckoutItem[] } = req.body;
    
    try {
      await prisma.$transaction(async (tx) => {
        for (const item of items) {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });
          
          if (!product || product.stock < item.quantity) {
            throw new Error(`Dear Customer,
  
  We're sorry, but the product ${product?.name} is currently low in stock.
  
  Available stock: ${product?.stock}
  Requested quantity: ${item.quantity}
  At this time, you can order up to ${product?.stock} units. We will notify you once the stock is replenished so you can place an order for the remaining ${(product?.stock || 0) - item.quantity} units.
  
  Thank you for your patience!`);
          }
          
          const updatedProduct = await tx.product.update({
            where: { id: item.productId },
            data: { stock: product.stock - item.quantity },
          });
  
          // Broadcast stock update to all connected clients
          broadcastStockUpdate(updatedProduct);
        }
      });
      
      res.json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  });

export default router; 