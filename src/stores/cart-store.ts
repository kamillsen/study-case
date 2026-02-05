import { create } from 'zustand';
import type { Product } from '@/generated/queries';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
};

/**
 * Basit Zustand cart store'u — ürün/adet yönetimi.
 * Gün 3'te UI ile bağlanacak.
 */
export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
  clearCart: () => set({ items: [] }),
  increment: (productId) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  decrement: (productId) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity - 1) }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),
}));

