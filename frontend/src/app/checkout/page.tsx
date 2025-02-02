'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Checkout() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const items = Object.values(state.items).map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
//http://localhost:3001
      await axios.post('https://e-commerce-application-uuca.onrender.com/api/products/checkout', { items });
      
      dispatch({ type: 'CLEAR_CART' });
      router.push('/checkout/success');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Failed to process checkout');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (Object.keys(state.items).length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
      <div className="space-y-4 mb-8">
        {Object.values(state.items).map((item) => (
          <div key={item.productId} className="flex justify-between border-b pb-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        
        <div className="text-xl font-bold pt-4">
          Total: ${state.total.toFixed(2)}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isProcessing}
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </button>
    </div>
  );
} 