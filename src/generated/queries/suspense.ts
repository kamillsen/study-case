// Manual layer: useSuspenseQuery hooks (codegen fails after fetch client)

'use client';

import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { getAllProducts, getProductById } from '../requests/services.gen';
import type { Product } from '../requests/types.gen';
import { queryKeys } from './common';

export type GetAllProductsResponse = Product[];
export type GetProductByIdResponse = Product;

export function useGetAllProductsSuspenseQuery(
  options?: Omit<
    UseSuspenseQueryOptions<GetAllProductsResponse, Error, GetAllProductsResponse>,
    'queryKey' | 'queryFn'
  >
): UseSuspenseQueryResult<GetAllProductsResponse, Error> {
  return useSuspenseQuery({
    queryKey: queryKeys.list(),
    queryFn: () => getAllProducts().then((r) => r as unknown as GetAllProductsResponse),
    ...options,
  });
}

export function useGetProductByIdSuspenseQuery(
  id: number,
  options?: Omit<
    UseSuspenseQueryOptions<GetProductByIdResponse, Error, GetProductByIdResponse>,
    'queryKey' | 'queryFn'
  >
): UseSuspenseQueryResult<GetProductByIdResponse, Error> {
  return useSuspenseQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () =>
      getProductById({ id }).then((r) => r as unknown as GetProductByIdResponse),
    ...options,
  });
}
