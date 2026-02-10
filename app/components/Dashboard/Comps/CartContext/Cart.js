"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    console.log("ITEM RECEIVED IN CONTEXT:", item);

    setCart((prev) => {
      console.log("PREV CART:", prev);

      const existing = prev.find((i) => i.type === item.type);

      const updatedItem = {
        ...existing,
        ...item,
      };

      console.log("UPDATED ITEM:", updatedItem);

      return [...prev.filter((i) => i.type !== item.type), updatedItem];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
