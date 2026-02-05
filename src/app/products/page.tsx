/**
 * /products — API'den gelen tüm ürünlerin listelendiği sayfa.
 * TanStack Query + codegen hook + ProductCard grid.
 */

import { ProductList } from '@/components/products/product-list';

export default function ProductsPage() {
  return (
    <>
      <ProductList title="All Products" />
    </>
  );
}

