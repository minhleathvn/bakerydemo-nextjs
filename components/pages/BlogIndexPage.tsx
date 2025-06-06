import type { blog } from '@/models';
import type { PageComponentProps } from './types';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';
import { Badge } from '@/components/ui/badge';

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          {searchTags ? (
            <div className="flex items-center gap-3 mb-4">
              <p className="text-lg text-muted-foreground">
                Viewing all blog posts sorted by the tag
              </p>
              <Badge variant="secondary" className="text-sm">
                {searchTags}
              </Badge>
            </div>
          ) : (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {page.introduction}
            </p>
          )}
        </section>

        <section>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((blog) => <BlogCard key={blog.id} page={blog} />)
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🥖</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No blog posts yet
                </h3>
                <p className="text-muted-foreground">
                  Oh, snap. Looks like we were too busy baking to write any blog
                  posts. Sorry.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
