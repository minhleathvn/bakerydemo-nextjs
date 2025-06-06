import type { breads } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

interface BreadCardProps {
  bread: breads.BreadPage;
}

export default function BreadCard({ bread }: BreadCardProps) {
  return (
    <article className="card group">
      {bread.image && (
        <Link href={`/breads/${bread.meta.slug}`} className="block">
          <div className="aspect-w-16 aspect-h-12 overflow-hidden">
            <Image
              src={bread.image.meta.download_url}
              alt={bread.image.title}
              width={400}
              height={300}
              loading="lazy"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="card-body">
        {/* FIXME: This should've used an h2, but we use h3 to test the
          accessibility checker */}
        <h3  className="text-xl font-semibold text-brown-800 mb-3">
          <Link 
            href={`/breads/${bread.meta.slug}`}
            className="hover:text-bakery-700 transition-colors"
          >
            {bread.title}
          </Link>
        </h3>
        
        {(bread.origin || bread.bread_type) && (
          <div className="space-y-2 text-sm text-brown-600">
            {bread.origin && (
              <div className="flex justify-between">
                <span className="font-medium">Origin:</span>
                <span>{bread.origin.title}</span>
              </div>
            )}
            {bread.bread_type && (
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span>{bread.bread_type.title}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
