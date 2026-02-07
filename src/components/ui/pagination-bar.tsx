'use client';

import { getPaginationPageList } from '@/hooks';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationBarProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

/**
 * Merkezi pagination UI — sayfa listesi ve ellipsis mantığı burada.
 */
export function PaginationBar({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PaginationBarProps) {
  const pages = getPaginationPageList(currentPage, totalPages);

  return (
    <Pagination
      className={className}
      aria-label="Sayfa navigasyonu"
    >
      <PaginationPrevious
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
        aria-disabled={currentPage <= 1}
      />
      <PaginationContent className="mx-0 flex-1 justify-center">
        {pages.map((p, i) =>
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
                  if (p <= totalPages) onPageChange(p);
                }}
                className={p > totalPages ? 'pointer-events-none opacity-50' : undefined}
                aria-disabled={p > totalPages}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}
      </PaginationContent>
      <PaginationNext
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
        aria-disabled={currentPage >= totalPages}
      />
    </Pagination>
  );
}
