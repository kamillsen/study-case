'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/generated/queries';
import { ProductCard } from '@/components/products/product-card';

type ProductGridCardProps = {
  product: Product;
};

export function ProductGridCard({ product }: ProductGridCardProps) {
  const rawRating = (product as { rating?: { rate?: number } })?.rating?.rate as number | undefined;
  const rate = typeof rawRating === 'number' ? rawRating : 0;
  const firstDigit = Number.isFinite(rate)
    ? Math.min(5, Math.max(0, parseInt(String(Math.floor(rate))[0] ?? '0', 10)))
    : 0;

  const totalStars = 5;

  const price = product.price ?? 0;
  const originalPrice = price * 1.2;
  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <ProductCard>
      <Link
        href={`/products/${product.id}`}
        className="flex flex-1 flex-col p-4"
      >
        <div className="mb-4 flex h-72 w-full items-center justify-center overflow-hidden rounded-md bg-muted md:h-80">
          {product.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image as string}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-foreground">
          {product.title}
        </h3>

        <div className="mb-2 flex items-center justify-between text-base">
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${
                  i < firstDigit
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
            {Number.isFinite(rate) && (
              <span className="ml-1 text-sm text-muted-foreground">
                {rate.toFixed(1)}/5
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-baseline gap-2 text-lg">
          <span className="font-semibold text-foreground">
            ${price.toFixed(2)}
          </span>
          <span className="text-base text-muted-foreground line-through">
            ${originalPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-base font-semibold text-emerald-500">
              -{discount}%
            </span>
          )}
        </div>
      </Link>
    </ProductCard>
  );
}
