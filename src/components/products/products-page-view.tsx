'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { useGetAllProductsQuery, type Product } from '@/generated/queries';
import { ProductGridCard } from '@/components/products/product-grid-card';
import {
  ProductsFilters,
  DEFAULT_FILTERS,
  type ProductsFilterState,
} from '@/components/products/products-filters';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const MAX_PRODUCTS = 96;
const PER_PAGE = 9;
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
] as const;

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

function sortOnly(products: Product[], sort: string): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case 'price-desc':
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case 'newest':
      list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      break;
    default:
      break;
  }
  return list;
}

function filterAndSort(
  products: Product[],
  filters: ProductsFilterState,
  sort: string
): Product[] {
  let list = [...products];
  if (filters.category) {
    list = list.filter(
      (p) => p.category?.toLowerCase() === filters.category?.toLowerCase()
    );
  }
  list = list.filter((p) => {
    const price = p.price ?? 0;
    return price >= filters.priceMin && price <= filters.priceMax;
  });
  return sortOnly(list, sort);
}

export function ProductsPageView() {
  const [filters, setFilters] = useState<ProductsFilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetAllProductsQuery({
    staleTime: 60 * 1000,
  });

  const data96 = useMemo(() => {
    if (!data?.length) return [];
    const out: Product[] = [];
    while (out.length < MAX_PRODUCTS) {
      data.forEach((p, i) => {
        if (out.length >= MAX_PRODUCTS) return;
        out.push({ ...p, id: p.id * 1000 + out.length });
      });
    }
    return out.slice(0, MAX_PRODUCTS);
  }, [data]);

  const categoriesFromApi = useMemo(() => {
    if (!data96.length) return [];
    const set = new Set<string>();
    data96.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [data96]);

  const filtered = useMemo(() => {
    if (!data96.length) return [];
    const list = filterAndSort(data96, filters, sort);
    return list.slice(0, MAX_PRODUCTS);
  }, [data96, filters, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageProducts = filtered.slice(start, start + PER_PAGE);

  const categoryTitle = filters.category ?? 'All Products';
  const showingStart = total === 0 ? 0 : start + 1;
  const showingEnd = Math.min(start + PER_PAGE, total);

  return (
    <div className="col-span-12 flex flex-col gap-6">
      {/* Breadcrumb: Home > Casual */}
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

      {/* 2 kolon: sol filtre, sağ içerik */}
      <div className="flex gap-6 lg:gap-8">
        {/* Sol: Filtre paneli (masaüstünde görünür) */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <ProductsFilters
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              setPage(1);
            }}
            onApply={() => setPage(1)}
            categoriesFromApi={categoriesFromApi}
          />
        </aside>

        {/* Sağ: Başlık + Showing + Sort + grid */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {/* Mobilde: Filtre Sheet */}
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
                    onChange={(f) => {
                      setFilters(f);
                      setPage(1);
                    }}
                    onApply={() => {
                      setPage(1);
                      setFiltersOpen(false);
                    }}
                    categoriesFromApi={categoriesFromApi}
                  />
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-bold uppercase tracking-wide text-foreground md:text-2xl">
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
                  onChange={(e) => setSort(e.target.value)}
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

              {/* Pagination: shadcn/ui — Previous sol, 1 2 3 … 8 9 10 ortada, Next sağ (her zaman göster) */}
              {!isLoading && !isError && data != null && (
                <Pagination className="mt-8 w-full justify-between border-t border-border pt-6">
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setPage((p) => p - 1);
                    }}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                    aria-disabled={currentPage <= 1}
                  />
                  <PaginationContent className="mx-0 flex-1 justify-center">
                    {(() => {
                      const pages: (number | 'ellipsis')[] = [];
                      if (totalPages <= 8) {
                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                      } else {
                        pages.push(1, 2, 3, 'ellipsis');
                        const showAround = [currentPage - 1, currentPage, currentPage + 1].filter(
                          (n) => n > 3 && n < totalPages - 2
                        );
                        if (showAround.length) {
                          if (showAround[0]! > 4) pages.push('ellipsis');
                          showAround.forEach((n) => pages.push(n));
                          if (showAround[showAround.length - 1]! < totalPages - 3) pages.push('ellipsis');
                        } else pages.push('ellipsis');
                        pages.push(totalPages - 2, totalPages - 1, totalPages);
                      }
                      return pages.map((p, i) =>
                        p === 'ellipsis' ? (
                          <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === p}
                              onClick={(e) => {
                                e.preventDefault();
                                if (p <= totalPages) setPage(p);
                              }}
                              className={p > totalPages ? 'pointer-events-none opacity-50' : undefined}
                              aria-disabled={p > totalPages}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      );
                    })()}
                  </PaginationContent>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setPage((p) => p + 1);
                    }}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                    aria-disabled={currentPage >= totalPages}
                  />
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
