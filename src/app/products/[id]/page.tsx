/**
 * Ürün detay sayfası — /products/[id]
 * API'den tek ürün çekmek için useGetProductByIdQuery kullanılır.
 */
'use client';

import { useParams } from 'next/navigation';
import { useGetProductByIdQuery } from '@/generated/queries';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isLoading, isError, error } = useGetProductByIdQuery(id);
  const addToCart = useCartStore((s) => s.addToCart);

  if (Number.isNaN(id)) {
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
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="h-80 w-full animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="col-span-12 flex flex-col gap-4 md:col-span-7">
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
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

  const product = data;

  return (
    <div className="col-span-12 grid grid-cols-12 gap-10 md:gap-12">
      <div className="col-span-12 md:col-span-5">
        <ProductCard className="min-h-[380px]">
          <div className="flex h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {product.image && (
              <img
                src={product.image as string}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </ProductCard>
      </div>
      <div className="col-span-12 flex flex-col gap-4 md:col-span-7">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
          {product.title}
        </h1>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="text-lg font-bold text-foreground">
          ${product.price?.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-4">
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => addToCart(product, 1)}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}

