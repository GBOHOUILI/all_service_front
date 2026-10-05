"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { track } from "@/lib/analytics";

export type CartItem = { slug: string; variant: string; price: number; qty: number };

type CartContextType = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

// Clé de stockage local. En production, ce state serait synchronisé
// avec un compte utilisateur / une commande en base au lieu du localStorage.
const CART_KEY = "as_cart_v1";
const WISH_KEY = "as_wishlist_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  function addToCart(item: CartItem) {
    track("ajout-panier", { produit: item.slug, format: item.variant, prix: item.price });
    setCart((prev) => {
      const existing = prev.find((c) => c.slug === item.slug && c.variant === item.variant);
      if (existing) {
        return prev.map((c) => (c === existing ? { ...c, qty: c.qty + item.qty } : c));
      }
      return [...prev, item];
    });
  }
  function removeFromCart(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }
  function setQty(index: number, qty: number) {
    setCart((prev) => prev.map((c, i) => (i === index ? { ...c, qty: Math.max(1, qty) } : c)));
  }
  function clearCart() {
    setCart([]);
  }
  function toggleWishlist(slug: string) {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, setQty, clearCart, toggleWishlist, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
