import type { blog, recipes } from '@/models';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  page: blog.BlogPage | recipes.RecipePage;
}

export default function BlogCard({ page }: BlogCardProps) {
  const isBlog = 'blog_person_relationship' in page;
  const relation = isBlog
    ? page.blog_person_relationship
    : page.recipe_person_relationship;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      {isBlog && page.image && (
        <Link href={page.meta.html_path} className="block">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={400}
              height={225}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="leading-tight">
          <Link 
            href={page.meta.html_path}
            className="hover:text-primary transition-colors"
          >
            {page.title}
          </Link>
        </CardTitle>
        {page.introduction && (
          <CardDescription className="text-sm leading-relaxed">
            {page.introduction}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {page.date_published && (
            <Badge variant="outline" className="text-xs">
              {formatDate(page.date_published)}
            </Badge>
          )}
          {relation.length > 0 && (
            <span className="flex items-center gap-1">
              <span>by</span>
              {relation.map((rel, index) => (
                <span key={rel.person.id} className="font-medium">
                  {rel.person.first_name} {rel.person.last_name}
                  {index < relation.length - 1 && ','}
                </span>
              ))}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

