'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '@/store/slices/cartSlice';

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

type BasketCartItemProps = {
  item: CartItem;
  onIncrement: (productId: number, size?: string, color?: string) => void;
  onDecrement: (productId: number, size?: string, color?: string) => void;
  onRemove: (productId: number, size?: string, color?: string) => void;
};

export function BasketCartItem({
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
