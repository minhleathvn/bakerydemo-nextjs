import type { locations } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

interface LocationCardProps {
  location: locations.LocationPage;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="card group">
      <Link href={`/locations/${location.meta.slug}`} className="block">
        {location.image && (
          <div className="relative overflow-hidden">
            <Image
              src={location.image.meta.download_url}
              alt={location.image.title}
              width={400}
              height={300}
              loading="lazy"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-semibold">{location.title}</h3>
            </div>
          </div>
        )}
      </Link>
      
      {!location.image && (
        <div className="card-body">
          <h3 className="text-xl font-semibold text-brown-800">
            <Link 
              href={`/locations/${location.meta.slug}`}
              className="hover:text-bakery-700 transition-colors"
            >
              {location.title}
            </Link>
          </h3>
        </div>
      )}
    </article>
  );
}
