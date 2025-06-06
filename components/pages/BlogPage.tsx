import type { blog } from '@/models';
import type { PageComponentProps } from './types';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag } from 'lucide-react';

export default async function BlogPage({
  page,
}: PageComponentProps<blog.BlogPage>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          {page.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={page.image.meta.download_url}
                alt={page.image.title}
                width={800}
                height={600}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {page.title}
          </h1>
          {page.subtitle && (
            <h2 className="text-xl text-muted-foreground font-medium mb-4">
              {page.subtitle}
            </h2>
          )}
          {page.introduction && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {page.introduction}
            </p>
          )}
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {page.date_published && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(page.date_published)}
              </Badge>
            )}
          </div>

          {/* Authors */}
          {page.blog_person_relationship.length > 0 && (
            <div className="space-y-3 mb-8">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <User className="h-4 w-4" />
                Written by
              </h3>
              <div className="flex flex-wrap gap-3">
                {page.blog_person_relationship.map(({ person }) => (
                  <Card key={person.id} className="p-3">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3">
                        {person.image && (
                          <div className="relative">
                            <Image
                              src={person.image.meta.download_url}
                              alt={person.image.title}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                        <span className="font-medium text-sm">
                          {person.first_name} {person.last_name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Blog Content */}
        <section className="prose prose-lg max-w-none mb-8">
          <BaseStreamBlock blocks={page.body} />
        </section>

        {/* Tags Section */}
        {page.tags.length > 0 && (
          <section className="pt-8 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Related Topics
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {page.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tags=${encodeURIComponent(tag)}`}
                  className="transition-colors hover:opacity-80"
                >
                  <Badge variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
