"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}

interface CartState {
  items: { [key: number]: CartItem };
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items[action.payload.productId];
      return {
        items: {
          ...state.items,
          [action.payload.productId]: existingItem
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : action.payload,
        },
        total: state.total + action.payload.price,
      };
    case 'REMOVE_ITEM':
      const { [action.payload]: removedItem, ...remainingItems } = state.items;
      return {
        items: remainingItems,
        total: state.total - (removedItem?.price || 0) * removedItem.quantity,
      };
    case 'UPDATE_QUANTITY':
      const item = state.items[action.payload.productId];
      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        items: {
          ...state.items,
          [action.payload.productId]: {
            ...item,
            quantity: action.payload.quantity,
          },
        },
        total: state.total + item.price * quantityDiff,
      };
    case 'CLEAR_CART':
      return { items: {}, total: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: {}, total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 