import type { base } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';

export default async function GalleryPage({
  page,
}: PageComponentProps<base.GalleryPage>) {
  // If there's a collection, fetch its images
  const images = page.collection
    ? await api.getImages({ collection: page.collection.id.toString() })
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          {page.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={page.image.meta.download_url}
                alt={page.image.title}
                width={1200}
                height={600}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {page.introduction}
          </p>
        </section>

        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            {page.body.map(({ id, value }) => (
              <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
            ))}
          </div>
        </section>

        {images && images.items.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8">Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.items.map((image) => (
                <Card key={image.id} className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={image.meta.download_url}
                        alt={image.title}
                        width={300}
                        height={300}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    {image.title && (
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground text-center">
                          {image.title}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
