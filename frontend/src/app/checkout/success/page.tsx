'use client';

import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Order Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <Link
          href="/products"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 