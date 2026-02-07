/**
 * Sayfa bazlı pagination — merkezi hook.
 * totalItems, perPage, currentPage → totalPages, start, end, pageItems.
 */

import { useMemo } from 'react';

export type UsePaginationOptions = {
  totalItems: number;
  perPage: number;
  currentPage: number;
};

export type UsePaginationResult = {
  totalPages: number;
  start: number;
  end: number;
  pageItems: number[];
  clampedPage: number;
};

export function usePagination({
  totalItems,
  perPage,
  currentPage,
}: UsePaginationOptions): UsePaginationResult {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (clampedPage - 1) * perPage;
  const end = Math.min(start + perPage, totalItems);

  const pageItems = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return {
    totalPages,
    start,
    end,
    pageItems,
    clampedPage,
  };
}

/**
 * Pagination UI için sayfa numaraları listesi (ellipsis ile).
 * Dönüş: (number | 'ellipsis')[] — render'da 1, 2, 3, 'ellipsis', 9, 10 gibi.
 */
export function getPaginationPageList(
  currentPage: number,
  totalPages: number,
  maxVisible = 8
): (number | 'ellipsis')[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [];
  pages.push(1, 2, 3, 'ellipsis');
  const showAround = [currentPage - 1, currentPage, currentPage + 1].filter(
    (n) => n > 3 && n < totalPages - 2
  );
  if (showAround.length > 0) {
    if (showAround[0]! > 4) pages.push('ellipsis');
    showAround.forEach((n) => pages.push(n));
    if (showAround[showAround.length - 1]! < totalPages - 3) pages.push('ellipsis');
  } else {
    pages.push('ellipsis');
  }
  pages.push(totalPages - 2, totalPages - 1, totalPages);
  return pages;
}
