'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartSubtotal } from '@/store/selectors';
import { increment, decrement, removeFromCart } from '@/store/slices/cartSlice';
import { BasketCartItem } from '@/components/basket/basket-cart-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const DELIVERY_FEE = 15;
const DISCOUNT_PERCENT = 20;

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function BasketPage() {
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const dispatch = useAppDispatch();

  const handleIncrement = (productId: number, size?: string, color?: string) =>
    dispatch(increment({ productId, size, color }));
  const handleDecrement = (productId: number, size?: string, color?: string) =>
    dispatch(decrement({ productId, size, color }));
  const handleRemove = (productId: number, size?: string, color?: string) =>
    dispatch(removeFromCart({ productId, size, color }));
  const discountAmount = (subtotal * DISCOUNT_PERCENT) / 100;
  const total = Math.max(0, subtotal - discountAmount + DELIVERY_FEE);

  const isEmpty = items.length === 0;

  return (
    <div className="col-span-12 flex flex-col gap-8">
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

      <h1 className="heading-page text-2xl md:text-3xl">
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
          <div className="min-w-0 rounded-xl border border-border bg-card p-4 md:p-6">
            <div className="divide-y divide-border">
              {items.map((item) => (
                <BasketCartItem
                  key={`${item.product.id}-${item.size ?? ''}-${item.color ?? ''}`}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <div className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="heading-section text-lg">
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
