'use client';

import { useGetAllProductsQuery } from '@/generated/queries';
import type { Product } from '@/generated/queries';
import { ProductGridCard } from '@/components/products/product-grid-card';

function ProductCardSkeleton() {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
      <div className="flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-border bg-muted/40 text-card-foreground shadow-sm animate-pulse">
        <div className="h-64 w-full bg-muted md:h-72" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
          <div className="mt-auto h-4 w-1/3 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

type ProductListProps = {
  title?: string;
};

/**
 * API'den gelen ürünleri listeleyen grid bileşeni.
 * useGetAllProductsQuery + loading / error / success state'leri.
 */
export function ProductList({ title }: ProductListProps) {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllProductsQuery();

  return (
    <section className="col-span-12 flex flex-col gap-6">
      {title && (
        <h1 className="text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
          {title}
        </h1>
      )}

      {isLoading || (!data && isFetching) ? (
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive md:px-6">
          <p>Ürünler yüklenirken bir hata oluştu.</p>
          <p className="text-xs text-destructive/80">
            {error?.message ?? 'Bilinmeyen hata'}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-1 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
          >
            Tekrar dene
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          <div className="col-span-1 hidden sm:block" aria-hidden />
          <div className="col-span-12 grid grid-cols-1 gap-10 sm:col-span-10 sm:-ml-10 sm:-mr-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-12 md:-ml-12 md:-mr-12">
            {data?.map((product: Product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
          <div className="col-span-1 hidden sm:block" aria-hidden />
        </div>
      )}
    </section>
  );
}

