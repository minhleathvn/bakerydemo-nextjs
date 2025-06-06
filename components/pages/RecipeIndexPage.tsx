import type { recipes } from '@/models';
import type { PageComponentProps } from './types';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';

export default async function RecipeIndexPage({
  page,
}: PageComponentProps<recipes.RecipeIndexPage>) {
  // Get recipe pages that are children of the recipe index page
  const { items: recipes } = await api.getPages('recipes.RecipePage', {
    child_of: page.id.toString(),
  });

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

      {/* Recipes Grid */}
      <section>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <BlogCard key={recipe.id} page={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-brown-600">
              Oh, snap. Looks like we were too busy baking to write any recipes. Sorry.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
