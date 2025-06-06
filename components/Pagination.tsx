import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      {currentPage > 1 ? (
        <Button asChild variant="outline" size="sm">
          <Link href={`${baseUrl}?page=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      )}

      <span className="px-4 py-2 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Button asChild variant="outline" size="sm">
          <Link href={`${baseUrl}?page=${currentPage + 1}`}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}
