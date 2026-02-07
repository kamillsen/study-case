'use client';

import { ChevronRight, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  type ProductsFilterState,
  DEFAULT_PRODUCTS_FILTERS,
} from '@/features/products';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { label: 'T-shirts', value: "men's clothing" },
  { label: 'Shorts', value: 'shorts' },
  { label: 'Shirts', value: 'shirts' },
  { label: 'Hoodie', value: 'hoodie' },
  { label: 'Jeans', value: 'jeans' },
];

const DRESS_STYLES = [
  { label: 'Casual', value: 'casual' },
  { label: 'Formal', value: 'formal' },
  { label: 'Party', value: 'party' },
  { label: 'Gym', value: 'gym' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

const COLOR_DOTS = [
  'bg-foreground',
  'bg-red-500',
  'bg-blue-500',
  'bg-amber-600',
  'bg-green-600',
  'bg-muted-foreground/60',
  'bg-purple-500',
  'bg-pink-400',
];

export type { ProductsFilterState };
export const DEFAULT_FILTERS = DEFAULT_PRODUCTS_FILTERS;

type ProductsFiltersProps = {
  filters: ProductsFilterState;
  onChange: (f: ProductsFilterState) => void;
  onApply: () => void;
  categoriesFromApi?: string[];
  open?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function ProductsFilters({
  filters,
  onChange,
  onApply,
  categoriesFromApi = [],
  open = true,
  onToggle,
  className,
}: ProductsFiltersProps) {
  const categories = categoriesFromApi.length > 0
    ? categoriesFromApi.map((c) => ({ label: c, value: c }))
    : CATEGORIES;

  const toggleSize = (size: string) => {
    const next = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onChange({ ...filters, selectedSizes: next });
  };

  const panel = (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
          Filters
        </h2>
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Filtreleri kapat"
          >
            <PanelLeftClose className="size-5" />
          </button>
        )}
      </div>
      <div className="mx-2 h-px bg-border" aria-hidden />

      {/* Kategoriler */}
      <div>
        <ul className="space-y-2">
          {categories.map(({ label, value }) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => onChange({ ...filters, category: filters.category === value ? null : value })}
                className={cn(
                  'flex w-full items-center justify-between text-base transition-colors hover:text-foreground',
                  filters.category === value ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {label}
                <ChevronRight className="size-4 shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-2 h-px bg-border" aria-hidden />

      {/* Fiyat — tek bar, çift thumb: $min ●———● $max */}
      <div className="flex items-center gap-2 text-base">
        <span className="shrink-0 font-medium text-foreground">Price</span>
        <span className="w-9 shrink-0 text-muted-foreground">${filters.priceMin}</span>
        <Slider
          min={0}
          max={500}
          step={10}
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={([min, max]) =>
            onChange({ ...filters, priceMin: min ?? filters.priceMin, priceMax: max ?? filters.priceMax })
          }
          className="min-w-0 flex-1"
        />
        <span className="w-9 shrink-0 text-right text-muted-foreground">${filters.priceMax}</span>
      </div>
      <div className="mx-2 h-px bg-border" aria-hidden />

      {/* Renkler (mock) */}
      <div>
        <p className="mb-2 text-base font-medium text-foreground">Colors</p>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_DOTS.map((dotClass, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                'h-8 w-8 rounded-full border-2 transition-colors hover:ring-2 hover:ring-primary/50',
                dotClass,
                'border-border'
              )}
              aria-label={`Renk ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="mx-2 h-px bg-border" aria-hidden />

      {/* Beden */}
      <div>
        <p className="mb-2 text-base font-medium text-foreground">Size</p>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={cn(
                'rounded-full px-2 py-1.5 text-sm font-medium transition-colors',
                filters.selectedSizes.includes(size)
                  ? 'bg-black text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-2 h-px bg-border" aria-hidden />

      {/* Dress Style */}
      <div>
        <p className="mb-2 text-base font-medium text-foreground">Dress Style</p>
        <ul className="space-y-1">
          {DRESS_STYLES.map(({ label, value }) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => onChange({ ...filters, dressStyle: filters.dressStyle === value ? null : value })}
                className={cn(
                  'flex w-full items-center justify-between text-base transition-colors hover:text-foreground',
                  filters.dressStyle === value ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {label}
                <ChevronRight className="size-4 shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-2 h-px bg-border" aria-hidden />

      <Button onClick={onApply} className="w-full rounded-full bg-black text-base text-white hover:bg-black/90">
        Apply Filter
      </Button>
    </div>
  );

  if (onToggle) {
    return (
      <div className={cn('lg:block', !open && 'hidden', className)}>
        {panel}
      </div>
    );
  }

  return <div className={cn(className)}>{panel}</div>;
}
