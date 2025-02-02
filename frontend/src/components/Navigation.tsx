'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { state } = useCart();
  const pathname = usePathname();
  
  
  const itemCount = Object.values(state.items).reduce(
    (sum, item) => sum + item.quantity, 
    0
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href="/"
              className={`text-gray-800 hover:text-blue-600 ${
                pathname === '/' ? 'font-bold' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products"
              className={`text-gray-800 hover:text-blue-600 ${
                pathname === '/products' ? 'font-bold' : ''
              }`}
            >
              Products
            </Link>
          </div>
          
          <Link 
            href="/cart"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            {itemCount > 0 && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
} 