'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    // Connect to WebSocket
    //http://localhost:3001
    const socket = io('https://e-commerce-application-uuca.onrender.com');
    
    socket.on('stockUpdate', (updatedProduct) => {
      setProducts(prev => 
        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    });

    // Fetch initial products
    fetchProducts();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchProducts = async () => {
    try {
        //http://localhost:3001
      const response = await axios.get('https://e-commerce-application-uuca.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <p className="text-sm">Stock: {product.stock}</p>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 