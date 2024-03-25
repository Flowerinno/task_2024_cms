import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

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

        {Array.from({ length: Math.min(page + 3, maxPage) }).map((_, i) => {
          const currentPage = i + 1;

          if (currentPage < page - 3) return null;

          return (
            <PaginationItem key={i}>
              <Link
                className="p-2 border-[1px] md:mr-1 md:ml-1 rounded-md min-h-12 min-w-12 w-12 h-12"
                style={{
                  border:
                    page === currentPage ? "1px solid blue" : "1px solid gray",
                }}
                href={`?page=${currentPage}`}
              >
                {currentPage}
              </Link>
            </PaginationItem>
          );
        })}

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
