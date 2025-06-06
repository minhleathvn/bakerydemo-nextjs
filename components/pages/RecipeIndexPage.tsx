import type { recipes } from '@/models';
import type { PageComponentProps } from './types';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';
import { ChefHat } from 'lucide-react';

export default async function RecipeIndexPage({
  page,
}: PageComponentProps<recipes.RecipeIndexPage>) {
  // Get recipe pages that are children of the recipe index page
  const { items: recipes } = await api.getPages('recipes.RecipePage', {
    child_of: page.id.toString(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {page.title}
          </h1>
          {page.introduction && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {page.introduction}
            </p>
          )}
        </section>

        {/* Recipes Grid */}
        <section>
          {recipes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <BlogCard key={recipe.id} page={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No recipes yet!
              </h3>
              <p className="text-muted-foreground">
                Our bakers are too busy perfecting their craft to write recipes. 
                Check back soon for delicious creations! 👨‍🍳✨
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
