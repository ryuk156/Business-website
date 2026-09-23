import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContext';

const CART_STORAGE_KEY = 'web-mechanix-cart';
const COMBO_LAPTOP_PRICE = 399.99;
const STARTER_PLAN_ID = 'starter';

function normalizeItem(item) {
  return {
    id: String(item.id),
    type: item.type,
    name: item.name,
    price: Number(item.price),
    period: item.period || null,
    image: item.image || null,
    quantity: Math.max(1, Number(item.quantity) || 1),
  };
}

function loadCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const items = storedCart ? JSON.parse(storedCart).map(normalizeItem) : [];
    let subscriptionAdded = false;

    return items.filter((item) => {
      if (item.type !== 'subscription') return true;
      if (subscriptionAdded) return false;
      subscriptionAdded = true;
      return true;
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item) => {
    const normalizedItem = normalizeItem(item);
    const hasDifferentSubscription = normalizedItem.type === 'subscription'
      && items.some((currentItem) => currentItem.type === 'subscription' && currentItem.id !== normalizedItem.id);

    if (hasDifferentSubscription) return false;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (currentItem) => currentItem.id === normalizedItem.id && currentItem.type === normalizedItem.type,
      );

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.id === normalizedItem.id && currentItem.type === normalizedItem.type
            ? { ...currentItem, quantity: currentItem.type === 'subscription' ? 1 : currentItem.quantity + normalizedItem.quantity }
            : currentItem,
        );
      }

      return [...currentItems, normalizedItem];
    });
    return true;
  }, [items]);

  const removeItem = (id, type) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== String(id) || item.type !== type));
  };

  const updateQuantity = (id, type, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === String(id) && item.type === type
          ? { ...item, quantity: item.type === 'subscription' ? 1 : nextQuantity }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    monthlyTotal: items
      .filter((item) => item.type === 'subscription')
      .reduce((total, item) => total + item.price * item.quantity, 0),
    monthlyDiscount: items.some((item) => item.type === 'product' && item.price === COMBO_LAPTOP_PRICE)
      ? items
        .filter((item) => item.type === 'subscription' && item.id === STARTER_PLAN_ID)
        .reduce((total, item) => total + item.price, 0)
      : 0,
    oneTimeTotal: items
      .filter((item) => item.type === 'product')
      .reduce((total, item) => total + item.price * item.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }), [items, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
