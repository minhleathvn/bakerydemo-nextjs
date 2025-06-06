import type { recipes } from '@/models';
import type { PageComponentProps } from './types';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import RecipeStreamBlock from '../streamfield/RecipeStreamBlock';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

export default async function RecipePage({
  page,
}: PageComponentProps<recipes.RecipePage>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
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
          {page.recipe_person_relationship.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <User className="h-4 w-4" />
                Recipe by
              </h3>
              <div className="flex flex-wrap gap-3">
                {page.recipe_person_relationship.map(({ person }) => (
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

        {/* Recipe Content */}
        <section className="prose prose-lg max-w-none">
          <RecipeStreamBlock blocks={page.body} />
        </section>
      </div>
    </div>
  );
}
