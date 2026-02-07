'use client';

import Link from 'next/link';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { ProductGridCard } from '@/components/products/product-grid-card';
import { ProductsFilters } from '@/components/products/products-filters';
import type { SortOptionValue } from '@/features/products';
import { useProductsPageData } from '@/features/products';
import { Button } from '@/components/ui/button';
import { PaginationBar } from '@/components/ui/pagination-bar';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function ProductCardSkeleton() {
  return (
    <div className="flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-border bg-muted/40 animate-pulse">
      <div className="h-72 w-full bg-muted md:h-80" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="mt-auto h-4 w-1/3 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const {
    pageProducts,
    filters,
    setFilters,
    sort,
    setSort,
    page,
    setPage,
    filtersOpen,
    setFiltersOpen,
    categoriesFromApi,
    categoryTitle,
    showingStart,
    showingEnd,
    total,
    totalPages,
    currentPage,
    query: { data, isLoading, isError, error, refetch },
    SORT_OPTIONS,
  } = useProductsPageData();

  return (
    <div className="col-span-12 flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-foreground" aria-current="page">
            {categoryTitle}
          </li>
        </ol>
      </nav>

      <div className="flex gap-6 lg:gap-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <ProductsFilters
            filters={filters}
            onChange={setFilters}
            onApply={() => setPage(1)}
            categoriesFromApi={categoriesFromApi}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full">
                    <LayoutGrid className="size-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] overflow-y-auto sm:max-w-[320px]">
                  <SheetTitle className="sr-only">Filters</SheetTitle>
                  <ProductsFilters
                    filters={filters}
                    onChange={setFilters}
                    onApply={() => {
                      setPage(1);
                      setFiltersOpen(false);
                    }}
                    categoriesFromApi={categoriesFromApi}
                  />
                </SheetContent>
              </Sheet>
              <h1 className="heading-section text-xl md:text-2xl">
                {categoryTitle}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Showing {showingStart}–{showingEnd} of {total}
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOptionValue)}
                  className="appearance-none rounded-full bg-background py-2 pl-4 pr-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Sırala"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              </div>
            </div>
          </div>

          {isLoading || !data ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive">
              <p>Ürünler yüklenirken bir hata oluştu.</p>
              <p className="mt-1 text-xs text-destructive/80">
                {error?.message ?? 'Bilinmeyen hata'}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => refetch()}
              >
                Tekrar dene
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pageProducts.map((product) => (
                  <ProductGridCard key={product.id} product={product} />
                ))}
              </div>

              {total === 0 && (
                <p className="py-8 text-center text-muted-foreground">
                  Bu filtreye uygun ürün bulunamadı.
                </p>
              )}

              {!isLoading && !isError && data != null && (
                <PaginationBar
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setPage}
                  className="mt-8 w-full justify-between border-t border-border pt-6"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
