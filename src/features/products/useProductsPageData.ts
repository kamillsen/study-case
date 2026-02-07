'use client';

import { useMemo, useState } from 'react';
import { useGetAllProductsQuery } from '@/generated/queries';
import { ProductsFilters, DEFAULT_FILTERS } from '@/components/products/products-filters';
import type { ProductsFilterState } from '@/features/products';
import type { SortOptionValue } from '@/features/products';
import {
  MAX_PRODUCTS,
  PER_PAGE,
  SORT_OPTIONS,
  DEFAULT_SORT,
  filterAndSort,
} from '@/features/products';
import { expandTo96, getCategoriesFromProducts } from '@/features/products/utils';
import { usePagination } from '@/hooks';

export function useProductsPageData() {
  const [filters, setFilters] = useState<ProductsFilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOptionValue>(DEFAULT_SORT);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetAllProductsQuery();

  const expanded = useMemo(() => expandTo96(data ?? undefined), [data]);
  const categoriesFromApi = useMemo(
    () => getCategoriesFromProducts(expanded),
    [expanded]
  );
  const filtered = useMemo(() => {
    if (!expanded.length) return [];
    const list = filterAndSort(expanded, filters, sort);
    return list.slice(0, MAX_PRODUCTS);
  }, [expanded, filters, sort]);

  const total = filtered.length;
  const {
    totalPages,
    start,
    end,
    clampedPage: currentPage,
  } = usePagination({
    totalItems: total,
    perPage: PER_PAGE,
    currentPage: page,
  });
  const pageProducts = useMemo(
    () => filtered.slice(start, end),
    [filtered, start, end]
  );

  const categoryTitle = filters.category ?? 'All Products';
  const showingStart = total === 0 ? 0 : start + 1;
  const showingEnd = end;

  const setFiltersAndResetPage = (f: ProductsFilterState) => {
    setFilters(f);
    setPage(1);
  };

  return {
    pageProducts,
    filters,
    setFilters: setFiltersAndResetPage,
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
  };
}
