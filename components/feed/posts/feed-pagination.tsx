import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FeedPaginationProps {
  page: number;
  maxPage: number;
}

export function FeedPagination({ page, maxPage }: FeedPaginationProps) {
  return (
    <Pagination className="p-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            style={{
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
            aria-label="Previous feed page"
            href={`?page=${page - 1 < 1 ? 1 : page - 1}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {Array.from({ length: Math.min(page + 3, maxPage) }).map((_, i) => {
          const currentPage = i + 1;
          const isActive = page === currentPage;

          if (currentPage < page - 3) return null;

          return (
            <PaginationItem key={i}>
              <PaginationLink isActive={isActive} href={`?page=${currentPage}`}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-label="Next feed page"
            href={`?page=${page + 1 > maxPage ? maxPage : page + 1}`}
            style={{
              cursor: page === maxPage ? "not-allowed" : "pointer",
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
