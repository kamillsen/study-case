// Manual layer: prefetch helpers (codegen fails after fetch client)

import type { QueryClient } from '@tanstack/react-query';
import { getAllProducts, getProductById } from '../requests/services.gen';
import type { Product } from '../requests/types.gen';
import { queryKeys } from './common';

export type GetAllProductsResponse = Product[];
export type GetProductByIdResponse = Product;

export async function prefetchGetAllProducts(
  client: QueryClient
): Promise<void> {
  await client.prefetchQuery({
    queryKey: queryKeys.list(),
    queryFn: () =>
      getAllProducts().then((r) => r as unknown as GetAllProductsResponse),
  });
}

export async function prefetchGetProductById(
  client: QueryClient,
  id: number
): Promise<void> {
  await client.prefetchQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () =>
      getProductById({ id }).then((r) => r as unknown as GetProductByIdResponse),
  });
}
