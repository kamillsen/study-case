// Manual layer: useQuery hooks (codegen fails after fetch client)

'use client';

import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { getAllProducts, getProductById } from '../requests/services.gen';
import type { Product } from '../requests/types.gen';
import { queryKeys } from './common';

export type GetAllProductsResponse = Product[];
export type GetProductByIdResponse = Product;

export function useGetAllProductsQuery(
  options?: Omit<
    UseQueryOptions<GetAllProductsResponse, Error, GetAllProductsResponse>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<GetAllProductsResponse, Error> {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => getAllProducts().then((r) => r as unknown as GetAllProductsResponse),
    ...options,
  });
}

export function useGetProductByIdQuery(
  id: number,
  options?: Omit<
    UseQueryOptions<GetProductByIdResponse, Error, GetProductByIdResponse>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<GetProductByIdResponse, Error> {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () =>
      getProductById({ id }).then((r) => r as unknown as GetProductByIdResponse),
    enabled: typeof id === 'number' && !Number.isNaN(id),
    ...options,
  });
}
