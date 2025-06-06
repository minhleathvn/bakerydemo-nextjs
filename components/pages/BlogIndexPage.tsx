import type { blog } from '@/models';
import type { PageComponentProps } from './types';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';

interface BlogSearchParams {
  tags?: string;
}

export default async function BlogIndexPage({
  page,
  searchParams,
}: PageComponentProps<blog.BlogIndexPage>) {
  const { tags: searchTags } = (await searchParams) as BlogSearchParams;

  // Get blog posts that are children of the blog index page
  const { items: posts } = await api.getPages('blog.BlogPage', {
    child_of: page.id.toString(),
    ...(searchTags ? { tags: searchTags } : {}),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="section-title">{page.title}</h1>
        {searchTags ? (
          <p className="text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
            Viewing all blog posts sorted by the tag <span className="font-semibold text-bakery-700">{searchTags}</span>.
          </p>
        ) : (
          page.introduction && (
            <p className="text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
              {page.introduction}
            </p>
          )
        )}
      </section>

      {/* Blog Posts Grid */}
      <section>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((blog) => (
              <BlogCard key={blog.id} page={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-brown-600">
              Oh, snap. Looks like we were too busy baking to write any blog posts. Sorry.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
