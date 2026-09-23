import { createContext } from 'react';

export type CartItemType = 'product' | 'subscription';

export interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  price: number;
  period?: string | null;
  image?: string | null;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  monthlyTotal: number;
  monthlyDiscount: number;
  oneTimeTotal: number;
  addItem: (item: CartItem | Omit<CartItem, 'id' | 'quantity'> & { id: string | number; quantity?: number }) => boolean;
  removeItem: (id: string | number, type: CartItemType) => void;
  updateQuantity: (id: string | number, type: CartItemType, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
