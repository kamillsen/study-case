import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/generated/requests/types.gen';

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

export type AddToCartPayload = {
  product: Product;
  quantity?: number;
  size?: string;
  color?: string;
};

export type CartLinePayload = {
  productId: number;
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
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1, size, color } = action.payload;
      const existing = state.items.find((i) =>
        sameLine(i, product.id, size, color)
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity, size, color });
      }
    },
    removeFromCart: (state, action: PayloadAction<CartLinePayload>) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        (i) => !sameLine(i, productId, size, color)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    increment: (state, action: PayloadAction<CartLinePayload>) => {
      const { productId, size, color } = action.payload;
      const item = state.items.find((i) =>
        sameLine(i, productId, size, color)
      );
      if (item) item.quantity += 1;
    },
    decrement: (state, action: PayloadAction<CartLinePayload>) => {
      const { productId, size, color } = action.payload;
      const idx = state.items.findIndex((i) =>
        sameLine(i, productId, size, color)
      );
      if (idx === -1) return;
      const item = state.items[idx]!;
      item.quantity -= 1;
      if (item.quantity <= 0) state.items.splice(idx, 1);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increment,
  decrement,
} = cartSlice.actions;

export default cartSlice.reducer;
