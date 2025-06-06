import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';

export default async function BreadPage({
  page,
}: PageComponentProps<breads.BreadPage>) {
  return (
    <article className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        {page.image && (
          <div className="mb-8">
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={800}
              height={400}
              priority
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-brown-900 mb-4">{page.title}</h1>
        {page.introduction && (
          <p className="text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed">
            {page.introduction}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <section className="lg:col-span-2">
          <div className="prose prose-lg mx-auto">
            <BaseStreamBlock blocks={page.body} />
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {(page.origin || page.bread_type || page.ingredients.length > 0) && (
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-brown-800 mb-6 border-b border-brown-200 pb-3">
                Bread Details
              </h3>
              
              <div className="space-y-6">
                {page.origin && (
                  <div>
                    <h4 className="font-semibold text-brown-800 mb-2">Origin</h4>
                    <p className="text-brown-600">{page.origin.title}</p>
                  </div>
                )}

                {page.bread_type && (
                  <div>
                    <h4 className="font-semibold text-brown-800 mb-2">Type</h4>
                    <p className="text-brown-600">{page.bread_type.title}</p>
                  </div>
                )}

                {page.ingredients.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-brown-800 mb-3">Ingredients</h4>
                    <ul className="space-y-2">
                      {page.ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="flex items-center text-brown-600">
                          <span className="w-2 h-2 bg-bakery-500 rounded-full mr-3 flex-shrink-0"></span>
                          {ingredient.meta.type === 'breads.BreadIngredient' ? (
                            ingredient.name
                          ) : (
                            <span className="italic">Draft ingredient</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
