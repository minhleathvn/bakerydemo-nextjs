import type { breads } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BreadCardProps {
  bread: breads.BreadPage;
}

export default function BreadCard({ bread }: BreadCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {bread.image && (
        <Link href={`/breads/${bread.meta.slug}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={bread.image.meta.download_url}
              alt={bread.image.title}
              width={300}
              height={300}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">
          <Link 
            href={`/breads/${bread.meta.slug}`}
            className="hover:text-primary transition-colors"
          >
            {bread.title}
          </Link>
        </CardTitle>
      </CardHeader>
      {(bread.origin || bread.bread_type) && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {bread.origin && (
              <Badge variant="secondary" className="text-xs">
                {bread.origin.title}
              </Badge>
            )}
            {bread.bread_type && (
              <Badge variant="outline" className="text-xs">
                {bread.bread_type.title}
              </Badge>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
