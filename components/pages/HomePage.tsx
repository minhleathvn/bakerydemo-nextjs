import type { base } from '@/models';
import type { PageComponentProps } from './types';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HomePage({
  page,
}: PageComponentProps<base.HomePage>) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {page.hero_text}
          </p>
          {page.hero_cta_link ? (
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href={page.hero_cta_link.meta.slug}>
                {page.hero_cta}
              </a>
            </Button>
          ) : null}
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🍞</span>
                  Our Most Excellent Bread
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  There's a lot that we can say about our bread but frankly we think you need to taste it to believe it. 
                  Crafted from lines of Python, Django and the old staples of HTML, CSS and JS we think you'll love what we're baking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Multiple Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  With our demonstrations across our fair Island you're never far from a treat. 
                  Come visit us whenever you're nearby.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Fresh Content Daily
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  From traditional recipes to modern baking techniques, explore our blog for the latest 
                  in artisanal bread making and bakery culture.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <BaseStreamBlock blocks={page.body} />
        </div>
      </section>
    </>
  );
}
