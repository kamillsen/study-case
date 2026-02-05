'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

type QueryProviderProps = {
  children: React.ReactNode;
};

/**
 * TanStack Query provider — App Router için ortak sarmalayıcı.
 * Layout içinde kullanılır; tüm sayfalarda query hook'ları çalışır.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = React.useState(
    () =>  
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 dakika
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}


