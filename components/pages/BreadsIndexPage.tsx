import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import BreadCard from '@/components/BreadCard';
import Pagination from '@/components/Pagination';
import api from '@/lib/api';

interface BreadsIndexPageProps
  extends PageComponentProps<breads.BreadsIndexPage> {
  searchParams: Promise<{ page: string }>;
}

export default async function BreadsIndexPage({
  page,
  searchParams,
}: BreadsIndexPageProps) {
  const currentPage = Number((await searchParams)?.page || '1');
  const pageSize = 12;
  const offset = (currentPage - 1) * pageSize;

  // Get bread pages that are children of the breads index page
  const { items: breads, meta } = await api.getPages('breads.BreadPage', {
    child_of: page.id.toString(),
    limit: pageSize.toString(),
    offset: offset.toString(),
  });

  const totalPages = Math.ceil(meta.total_count / pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="section-title">{page.title}</h1>
        {page.introduction && (
          <p className="text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
            {page.introduction}
          </p>
        )}
      </section>

      {/* Breads Grid */}
      <section className="mb-12">
        {breads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {breads.map((bread) => (
              <BreadCard key={bread.id} bread={bread} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-brown-600">No breads found.</p>
          </div>
        )}
      </section>

      {/* Pagination */}
      {meta.total_count > pageSize && (
        <section className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl=""
          />
        </section>
      )}
    </div>
  );
}
