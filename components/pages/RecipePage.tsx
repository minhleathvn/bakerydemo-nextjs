import type { recipes } from '@/models';
import type { PageComponentProps } from './types';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import RecipeStreamBlock from '../streamfield/RecipeStreamBlock';

export default async function RecipePage({
  page,
}: PageComponentProps<recipes.RecipePage>) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brown-900 mb-4">{page.title}</h1>
        
        {page.subtitle && (
          <p className="text-xl text-bakery-700 mb-6 font-medium">{page.subtitle}</p>
        )}
        
        {page.introduction && (
          <p className="text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {page.introduction}
          </p>
        )}

        {/* Recipe Meta */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-brown-500">
          {page.date_published && (
            <div className="flex items-center">
              <span className="font-medium">Published:</span>
              <time className="ml-2" dateTime={page.date_published}>
                {formatDate(page.date_published)}
              </time>
            </div>
          )}
          
          {page.recipe_person_relationship.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="font-medium">By:</span>
              {page.recipe_person_relationship.map(({ person }) => (
                <div key={person.id} className="flex items-center space-x-2">
                  {person.image && (
                    <Image
                      src={person.image.meta.download_url}
                      alt={person.image.title}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-brown-700 font-medium">
                    {person.first_name} {person.last_name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Recipe Content */}
      <section className="max-w-none">
        <RecipeStreamBlock blocks={page.body} />
      </section>
    </article>
  );
}
