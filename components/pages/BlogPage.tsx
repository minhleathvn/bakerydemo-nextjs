import type { blog } from '@/models';
import type { PageComponentProps } from './types';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';

export default async function BlogPage({
  page,
}: PageComponentProps<blog.BlogPage>) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Image */}
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

        {/* Article Meta */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-brown-500 mb-8">
          {page.date_published && (
            <div className="flex items-center">
              <span className="font-medium">Published:</span>
              <time className="ml-2" dateTime={page.date_published}>
                {formatDate(page.date_published)}
              </time>
            </div>
          )}
          
          {page.blog_person_relationship.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="font-medium">By:</span>
              {page.blog_person_relationship.map(({ person }) => (
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

      {/* Content */}
      <section className="prose prose-lg mx-auto mb-12">
        <BaseStreamBlock blocks={page.body} />
      </section>

      {/* Tags */}
      {page.tags.length > 0 && (
        <section className="border-t border-brown-200 pt-8">
          <div className="text-center">
            <p className="text-brown-600 mb-4">Find more blog posts with similar tags:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {page.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tags=${encodeURIComponent(tag)}`}
                  className="inline-block bg-bakery-100 hover:bg-bakery-200 text-bakery-800 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
