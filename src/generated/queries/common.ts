// Manual layer: query keys and common types (codegen fails after fetch client)

import type { Product } from '../requests/types.gen';

export type { Product };

export const queryKeys = {
  all: ['products'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: () => [...queryKeys.lists()] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: number) => [...queryKeys.details(), id] as const,
} as const;
