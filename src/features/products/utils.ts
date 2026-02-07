import type { Product } from '@/generated/requests/types.gen';
import { MAX_PRODUCTS } from './constants';

/**
 * API'den gelen listeyi MAX_PRODUCTS boyutuna kadar tekrarlayarak genişletir (sentetik id ile).
 */
export function expandTo96(data: Product[] | undefined): Product[] {
  if (!data?.length) return [];
  const out: Product[] = [];
  while (out.length < MAX_PRODUCTS) {
    for (const p of data) {
      if (out.length >= MAX_PRODUCTS) break;
      out.push({ ...p, id: p.id * 1000 + out.length });
    }
  }
  return out.slice(0, MAX_PRODUCTS);
}

/**
 * Ürün listesinden benzersiz kategori isimlerini döndürür (alfabetik sıralı).
 */
export function getCategoriesFromProducts(products: Product[]): string[] {
  if (!products.length) return [];
  const set = new Set<string>();
  products.forEach((p) => p.category && set.add(p.category));
  return Array.from(set).sort();
}
