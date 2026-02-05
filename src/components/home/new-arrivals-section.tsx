'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGridCard } from '@/components/products/product-grid-card';
import { useGetAllProductsQuery, type Product } from '@/generated/queries';

function NewArrivalsSkeletonRow() {
  return (
    <div className="grid grid-cols-12 gap-10 md:gap-12">
      <div className="col-span-1 hidden sm:block" aria-hidden />
      <div className="col-span-12 grid grid-cols-1 gap-10 sm:col-span-10 sm:-ml-10 sm:-mr-10 sm:grid-cols-4 md:gap-12 md:-ml-12 md:-mr-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-border bg-muted/40 text-card-foreground shadow-sm animate-pulse">
            <div className="h-64 w-full bg-muted md:h-72" />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="mt-auto h-4 w-1/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 hidden sm:block" aria-hidden />
    </div>
  );
}

export function NewArrivalsSection() {
  const { data, isLoading, isError, error, refetch } = useGetAllProductsQuery({
    staleTime: 1000 * 60,
  });

  const products = (data ?? []).slice(0, 4);

  return (
    <section className="col-span-12 mt-12 flex flex-col gap-6 px-10 md:mt-16 md:px-12">
      <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
        New Arrivals
      </h2>

      {isLoading && <NewArrivalsSkeletonRow />}

      {!isLoading && isError && (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive md:px-6">
          <p>Yeni gelen ürünler yüklenirken bir hata oluştu.</p>
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
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          <div className="col-span-1 hidden sm:block" aria-hidden />
          <div className="col-span-12 grid grid-cols-1 gap-10 sm:col-span-10 sm:-ml-10 sm:-mr-10 sm:grid-cols-4 md:gap-12 md:-ml-12 md:-mr-12">
            {products.map((product: Product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
          <div className="col-span-1 hidden sm:block" aria-hidden />
        </div>
      )}

      <div className="flex justify-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="px-10 rounded-full"
        >
          <Link href="/products">View All</Link>
        </Button>
      </div>
    </section>
  );
}
