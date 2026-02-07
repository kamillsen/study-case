'use client';

import { useGetProductByIdQuery } from '@/generated/queries';
import { ProductDetailHero } from '@/components/products/product-detail-hero';
import { ProductDetailTabs } from '@/components/products/product-detail-tabs';
import { ProductDetailYouMightAlsoLike } from '@/components/products/product-detail-you-might-also-like';

type ProductDetailViewProps = {
  productId: number;
};

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const { data, isLoading, isError, error } = useGetProductByIdQuery(productId);

  if (Number.isNaN(productId)) {
    return (
      <div className="col-span-12">
        <p className="text-destructive">Geçersiz ürün ID.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="col-span-12">
        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-12 gap-8 md:gap-10 lg:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="col-span-12 flex flex-col gap-5 md:col-span-7">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-6 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="mt-4 h-10 w-32 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="col-span-12">
        <h1 className="mb-4 text-2xl font-semibold">Ürün Detay</h1>
        <p className="text-destructive">
          Ürün yüklenirken bir hata oluştu: {error?.message ?? 'Bilinmeyen hata'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-12">
        <ProductDetailHero product={data} />
        <ProductDetailTabs product={data} />
        <ProductDetailYouMightAlsoLike currentProductId={data.id as number} />
      </div>
    </>
  );
}
