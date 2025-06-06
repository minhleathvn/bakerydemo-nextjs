import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function BreadPage({
  page,
}: PageComponentProps<breads.BreadPage>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <section className="mb-8">
              {page.image && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={page.image.meta.download_url}
                    alt={page.image.title}
                    width={800}
                    height={650}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {page.title}
              </h1>
              {page.introduction && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {page.introduction}
                </p>
              )}
            </section>

            <section className="prose prose-lg max-w-none">
              <BaseStreamBlock blocks={page.body} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {(page.origin || page.bread_type || page.ingredients.length > 0) && (
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🍞</span>
                    Bread Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {page.origin && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        Origin
                      </h4>
                      <Badge variant="secondary" className="text-sm">
                        {page.origin.title}
                      </Badge>
                    </div>
                  )}

                  {page.bread_type && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        Type
                      </h4>
                      <Badge variant="outline" className="text-sm">
                        {page.bread_type.title}
                      </Badge>
                    </div>
                  )}

                  {page.ingredients.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                          Ingredients
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {page.ingredients.map((ingredient) => (
                            <Badge key={ingredient.id} variant="default" className="text-xs">
                              {ingredient.meta.type === 'breads.BreadIngredient' ? (
                                ingredient.name
                              ) : (
                                <span>Draft ingredient</span>
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
