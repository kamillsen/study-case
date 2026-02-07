/**
 * Ürün listesi filtre state tipi ve varsayılanları — merkezi.
 */

export type ProductsFilterState = {
  category: string | null;
  priceMin: number;
  priceMax: number;
  selectedSizes: string[];
  dressStyle: string | null;
};

export const DEFAULT_PRODUCTS_FILTERS: ProductsFilterState = {
  category: null,
  priceMin: 0,
  priceMax: 500,
  selectedSizes: [],
  dressStyle: null,
};
