import Link from 'next/link';

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
    <nav aria-label="Pagination" className="flex items-center justify-center space-x-4">
      {currentPage > 1 ? (
        <Link 
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="btn-secondary"
        >
          Previous
        </Link>
      ) : (
        <div className="btn-secondary opacity-50 cursor-not-allowed">
          Previous
        </div>
      )}

      <span className="text-brown-700 font-medium px-4">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link 
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="btn-secondary"
        >
          Next
        </Link>
      ) : (
        <div className="btn-secondary opacity-50 cursor-not-allowed">
          Next
        </div>
      )}
    </nav>
  );
}
