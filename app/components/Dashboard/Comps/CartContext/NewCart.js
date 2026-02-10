"use client";
import { useEffect, useState } from "react";

export const CART_KEY = "cart";
export const CART_EVENT = "cart_updated";
/** Get cart from localStorage */
export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Failed to read cart", err);
    return [];
  }
}

/** Save cart to localStorage */
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}
export const addToCart = (item) => {
  const cart = getCart();

  const existing = cart.find((i) => i.type === item.type);

  const updatedItem = {
    ...existing,
    ...item,
  };

  const newCart = [...cart.filter((i) => i.type !== item.type), updatedItem];

  saveCart(newCart);
  return newCart;
};

/** Remove item by type */
export function removeFromCart(type) {
  const cart = getCart().filter((i) => i.type !== type);
  saveCart(cart);
  return cart;
}

/** Clear entire cart */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

export const useCartShow = () => {
  const [cart, setCart] = useState([]);

  const syncCart = () => {
    setCart([...getCart()]); // 🔥 force new reference
  };

  useEffect(() => {
    syncCart();

    const handler = () => syncCart();
    window.addEventListener(CART_EVENT, handler);

    return () => {
      window.removeEventListener(CART_EVENT, handler);
    };
  }, []);

  return { cart };
};
