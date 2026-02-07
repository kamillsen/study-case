/**
 * Ürün listesi filtre ve sıralama mantığı — merkezi.
 */

import type { Product } from '@/generated/requests/types.gen';
import type { SortOptionValue } from './constants';
import type { ProductsFilterState } from './types';

export function sortOnly(products: Product[], sort: SortOptionValue): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case 'price-desc':
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case 'newest':
      list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      break;
    default:
      break;
  }
  return list;
}

export function filterAndSort(
  products: Product[],
  filters: ProductsFilterState,
  sort: SortOptionValue
): Product[] {
  let list = [...products];
  if (filters.category) {
    list = list.filter(
      (p) => p.category?.toLowerCase() === filters.category?.toLowerCase()
    );
  }
  list = list.filter((p) => {
    const price = p.price ?? 0;
    return price >= filters.priceMin && price <= filters.priceMax;
  });
  return sortOnly(list, sort);
}
