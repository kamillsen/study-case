// Single entry: API client + React Query hooks (queries layer is manual; codegen fails after fetch client)

export {
  getAllProducts,
  getProductById,
  OpenAPI,
  ApiError,
  CancelablePromise,
  CancelError,
} from './requests';
export type { Product, GetProductByIdData } from './requests/types.gen';
export {
  queryKeys,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllProductsSuspenseQuery,
  useGetProductByIdSuspenseQuery,
  prefetchGetAllProducts,
  prefetchGetProductById,
} from './queries';
export type { GetAllProductsResponse, GetProductByIdResponse } from './queries';
