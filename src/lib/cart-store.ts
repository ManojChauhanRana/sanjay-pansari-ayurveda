import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/site-data";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  image: string;
  href?: string;
  unit?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                mrp: product.mrp,
                image: product.image,
                href: product.href,
                unit: product.unit,
                quantity
              }
            ]
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: "sanjay-ayurveda-cart"
    }
  )
);

export function getCartQuantity(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
