import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { broadcastStockUpdate } from '../websocket';

const router = Router();
const prisma = new PrismaClient();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
router.post('/', async (req, res) => {
    try {
      const {name,description,price,stock}=req.body
      await prisma.product.create({
        data:{
            name:name,
            description:description,
            price:price,
            stock:stock
        }
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' });
    }
  });



export default router; 