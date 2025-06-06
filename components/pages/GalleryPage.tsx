import type { base } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import api from '@/lib/api';

export default async function GalleryPage({
  page,
}: PageComponentProps<base.GalleryPage>) {
  // If there's a collection, fetch its images
  const images = page.collection
    ? await api.getImages({ collection: page.collection.id.toString() })
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-12">
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
        <h1 className="section-title">{page.title}</h1>
        {page.introduction && (
          <p className="text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
            {page.introduction}
          </p>
        )}
      </section>

      {/* Description Content */}
      {page.body.length > 0 && (
        <section className="prose prose-lg mx-auto mb-16">
          {page.body.map(({ id, value }) => (
            <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
          ))}
        </section>
      )}

      {/* Image Gallery */}
      {images && images.items.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-brown-800 mb-8 text-center">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.items.map((image) => (
              <figure key={image.id} className="group">
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src={image.meta.download_url}
                    alt={image.title}
                    width={300}
                    height={225}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {image.title && (
                  <figcaption className="mt-2 text-sm text-brown-600 text-center">
                    {image.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
