import { create } from 'zustand';
import type { Product } from '@/generated/queries';

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

function sameLine(
  a: CartItem,
  productId: number,
  size?: string,
  color?: string
): boolean {
  if (a.product.id !== productId) return false;
  const aSize = a.size ?? '';
  const aColor = a.color ?? '';
  const bSize = size ?? '';
  const bColor = color ?? '';
  return aSize === bSize && aColor === bColor;
}

type CartState = {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    options?: { size?: string; color?: string }
  ) => void;
  removeFromCart: (productId: number, size?: string, color?: string) => void;
  clearCart: () => void;
  increment: (productId: number, size?: string, color?: string) => void;
  decrement: (productId: number, size?: string, color?: string) => void;
};

/**
 * Zustand cart store — ürün/adet/beden/renk yönetimi.
 */
export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product, quantity = 1, options) => {
    const size = options?.size;
    const color = options?.color;
    set((state) => {
      const existing = state.items.find((i) =>
        sameLine(i, product.id, size, color)
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            sameLine(i, product.id, size, color)
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity, size, color }],
      };
    });
  },
  removeFromCart: (productId, size, color) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !sameLine(i, productId, size, color)
      ),
    })),
  clearCart: () => set({ items: [] }),
  increment: (productId, size, color) =>
    set((state) => ({
      items: state.items.map((i) =>
        sameLine(i, productId, size, color)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    })),
  decrement: (productId, size, color) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          sameLine(i, productId, size, color)
            ? { ...i, quantity: Math.max(0, i.quantity - 1) }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),
}));

