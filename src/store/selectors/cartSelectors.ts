import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.quantity, 0)
);
