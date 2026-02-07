/**
 * Ürün listesi sayfasına özgü sabitler — merkezi konfigürasyon.
 */

export const MAX_PRODUCTS = 96;
export const PER_PAGE = 9;

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
] as const;

export type SortOptionValue = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortOptionValue = SORT_OPTIONS[0].value;
