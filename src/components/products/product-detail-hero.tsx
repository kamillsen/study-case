'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/generated/queries';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { cn } from '@/lib/utils';

type ProductDetailHeroProps = {
  product: Product;
};

const SIZES = ['S', 'M', 'L', 'XL'] as const;
const COLOR_DOTS = ['bg-foreground', 'bg-muted-foreground/60', 'bg-muted'] as const;

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [addedToCart, setAddedToCart] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const thumbnails = [0, 1, 2];

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Men
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground font-medium" aria-current="page">
            T-shirt
          </li>
        </ol>
      </nav>
      <div className="grid grid-cols-12 gap-8 md:gap-10 lg:gap-12">
      {/* Sol: 3 thumbnail yukarıdan aşağı — toplam yükseklik ana resim kadar; sağda ana görsel */}
      <div className="col-span-12 flex gap-3 md:col-span-5">
        <div className="flex w-20 flex-col gap-2 md:w-36">
          {thumbnails.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedThumbIndex(i)}
              className={cn(
                'flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted transition-[box-shadow,outline]',
                selectedThumbIndex === i
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:ring-2 hover:ring-muted-foreground/30'
              )}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={`${product.title} küçük görsel ${i + 1}`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground text-xs">—</span>
              )}
            </button>
          ))}
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted aspect-square">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-muted-foreground">Görsel yok</span>
          )}
        </div>
      </div>

      {/* Sağ: Başlık, rating, fiyat, açıklama, renk, beden, adet, Sepete Ekle (product.txt satır 8–21) */}
      <div className="col-span-12 flex flex-col gap-5 md:col-span-7">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {product.title}
        </h1>

        {/* Rating placeholder (API'de yok) — ★★★★☆ 4.5/5 */}
        <p className="flex items-center gap-1.5 text-muted-foreground" aria-hidden>
          <span className="text-lg text-yellow-500 md:text-xl">★★★★☆</span>
          <span className="text-sm">4.5/5</span>
        </p>

        {/* Fiyat */}
        <p className="text-xl font-bold text-foreground">
          $
          {typeof product.price === 'number'
            ? product.price.toFixed(2)
            : String(product.price)}
        </p>

        {/* Açıklama */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Select Colors (placeholder — API'de yok) — ● ● ● */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Select Colors:</span>
          <div className="flex gap-2">
            {COLOR_DOTS.map((dotClass, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  'h-8 w-8 rounded-full border-2 border-border transition-colors hover:border-primary',
                  dotClass
                )}
                aria-label={`Renk seçenek ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Choose Size (placeholder — API'de yok) — S M [ L ] XL */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Choose Size:</span>
          <div className="flex gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'min-w-24 rounded-full border-2 px-10 py-2.5 text-sm font-medium transition-colors md:min-w-28 md:px-12',
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-muted-foreground'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Adet: yok. Beden butonları gibi tek alan — solda −, ortada sayı, sağda + */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-full border-2 border-border bg-background">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 min-w-12 items-center justify-center text-foreground transition-colors hover:bg-muted"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-10 text-center font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-11 min-w-12 items-center justify-center text-foreground transition-colors hover:bg-muted"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart — adet alanı ile aynı hizada, 2–3 kat daha uzun */}
          <Button
            size="lg"
            className="min-w-64 rounded-full px-14 md:min-w-80 md:px-16"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          {addedToCart && (
            <span className="text-sm font-medium text-primary" role="status">
              Added to cart
            </span>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
