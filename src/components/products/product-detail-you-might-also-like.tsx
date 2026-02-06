'use client';

import { useGetAllProductsQuery } from '@/generated/queries';
import { ProductGridCard } from '@/components/products/product-grid-card';

type ProductDetailYouMightAlsoLikeProps = {
  currentProductId: number;
};

function YouMightAlsoLikeSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {Array.from({ length: 4 }).map((i) => (
        <div
          key={i}
          className="flex min-h-[340px] flex-col overflow-hidden rounded-lg border border-border bg-muted/40 animate-pulse"
        >
          <div className="h-72 w-full bg-muted md:h-80" />
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
            <div className="mt-auto h-4 w-1/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailYouMightAlsoLike({
  currentProductId,
}: ProductDetailYouMightAlsoLikeProps) {
  const { data, isLoading, isError } = useGetAllProductsQuery({ staleTime: 1000 * 60 });

  const allProducts = (data ?? []).filter(
    (p) => p?.id != null && Number(p.id) !== Number(currentProductId)
  );
  const relatedProducts = allProducts.slice(0, 4);

  return (
    <section
      className="mt-12 border-t border-border pt-10"
      aria-label="Beğenebileceğiniz diğer ürünler"
    >
      <h2 className="mb-6 text-center text-2xl font-extrabold uppercase tracking-wide text-foreground md:text-3xl">
        You Might Also Lıke
      </h2>

      {isLoading && <YouMightAlsoLikeSkeleton />}

      {!isLoading && isError && (
        <p className="text-center text-sm text-muted-foreground">
          Önerilen ürünler yüklenemedi.
        </p>
      )}

      {!isLoading && !isError && relatedProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {relatedProducts.map((product) => (
            <ProductGridCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isLoading && !isError && relatedProducts.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Şu an başka öneri bulunmuyor.
        </p>
      )}
    </section>
  );
}
