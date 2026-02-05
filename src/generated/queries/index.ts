// Manual layer: React Query hooks (codegen fails after fetch client)

export { queryKeys, type Product } from './common';
export {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  type GetAllProductsResponse,
  type GetProductByIdResponse,
} from './queries';
export {
  useGetAllProductsSuspenseQuery,
  useGetProductByIdSuspenseQuery,
} from './suspense';
export {
  prefetchGetAllProducts,
  prefetchGetProductById,
} from './prefetch';
