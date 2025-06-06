import type { locations } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface LocationCardProps {
  location: locations.LocationPage;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <Link href={`/locations/${location.meta.slug}`} className="block">
        {location.image && (
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={location.image.meta.download_url}
              alt={location.image.title}
              width={400}
              height={300}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {location.title}
          </h3>
        </CardContent>
      </Link>
    </Card>
  );
}
