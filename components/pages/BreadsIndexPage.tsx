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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {page.introduction}
          </p>
        </section>

        <section className="mb-12">
          {breads.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {breads.map((bread) => (
                <BreadCard key={bread.id} bread={bread} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🥖</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No breads found
              </h3>
              <p className="text-muted-foreground">
                We'll be baking fresh bread soon. Check back later!
              </p>
            </div>
          )}
        </section>

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
    </div>
  );
}
