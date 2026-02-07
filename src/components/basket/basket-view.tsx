'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore, type CartItem as CartItemType } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const DELIVERY_FEE = 15;
const DISCOUNT_PERCENT = 20;

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

type BasketCartItemProps = {
  item: CartItemType;
  onIncrement: (productId: number, size?: string, color?: string) => void;
  onDecrement: (productId: number, size?: string, color?: string) => void;
  onRemove: (productId: number, size?: string, color?: string) => void;
};

function BasketCartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: BasketCartItemProps) {
  const { product, quantity } = item;
  const price = product.price ?? 0;
  const lineTotal = price * quantity;

  return (
    <div className="relative flex gap-4 rounded-xl border border-border bg-card p-4 first:pt-4">
      {/* Sağ üst: kırmızı silme butonu */}
      <button
        type="button"
        onClick={() => onRemove(product.id, item.size, item.color)}
        className="absolute right-3 top-3 rounded-full p-1.5 text-destructive transition-colors hover:bg-destructive/10"
        aria-label="Sepetten çıkar"
      >
        <Trash2 className="size-5" />
      </button>

      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted md:h-28 md:w-28">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image as string}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 pr-8">
        <h3 className="font-semibold text-foreground line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
          <p>Size: {item.size ?? '—'}</p>
          <p>Color: {item.color ?? '—'}</p>
        </div>
        <p className="mt-1 font-medium text-foreground">
          {formatPrice(price)}
        </p>
        <p className="mt-0.5 font-semibold text-foreground tabular-nums">
          {formatPrice(lineTotal)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-end">
        {/* Sağ alt: adet (ürün detay ekranındaki gibi rounded-full) */}
        <div className="flex h-11 items-center overflow-hidden rounded-full border-2 border-border bg-background">
          <button
            type="button"
            onClick={() => onDecrement(product.id, item.size, item.color)}
            className="flex min-w-12 items-center justify-center text-foreground transition-colors hover:bg-muted"
            aria-label="Azalt"
          >
            <Minus className="size-4" />
          </button>
          <span className="flex min-w-10 items-center justify-center font-medium tabular-nums leading-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onIncrement(product.id, item.size, item.color)}
            className="flex min-w-12 items-center justify-center text-foreground transition-colors hover:bg-muted"
            aria-label="Artır"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BasketView() {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const subtotal = items.reduce(
    (sum, i) => sum + (i.product.price ?? 0) * i.quantity,
    0
  );
  const discountAmount = (subtotal * DISCOUNT_PERCENT) / 100;
  const total = Math.max(0, subtotal - discountAmount + DELIVERY_FEE);

  const isEmpty = items.length === 0;

  return (
    <div className="col-span-12 flex flex-col gap-8">
      {/* Breadcrumb: Home > Cart */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-foreground" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
        Your Cart
      </h1>

      {isEmpty ? (
        <div className="rounded-xl border border-border bg-muted/30 px-6 py-12 text-center">
          <p className="text-muted-foreground mb-4">
            Sepetiniz boş.
          </p>
          <Button asChild>
            <Link href="/products">Alışverişe dön</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Sol: Sepet kalemleri */}
          <div className="min-w-0 rounded-xl border border-border bg-card p-4 md:p-6">
            <div className="divide-y divide-border">
              {items.map((item) => (
                <BasketCartItem
                  key={item.product.id}
                  item={item}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>

          {/* Sağ: Order Summary */}
          <div className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-foreground">
              Order Summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium tabular-nums text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount (-{DISCOUNT_PERCENT}%)</span>
                <span className="font-medium tabular-nums text-destructive">
                  -{formatPrice(discountAmount)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className="font-medium tabular-nums text-foreground">
                  {formatPrice(DELIVERY_FEE)}
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-base font-semibold text-foreground">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Add promo code"
                className="flex-1"
                aria-label="Promo code"
              />
              <Button variant="outline" size="sm">
                Apply
              </Button>
            </div>
            <Button asChild className="mt-4 w-full" size="lg">
              <Link href="#">
                Go to Checkout →
              </Link>
            </Button>
          </div>
        </div>
      )}

      <Separator className="my-2" />
    </div>
  );
}
