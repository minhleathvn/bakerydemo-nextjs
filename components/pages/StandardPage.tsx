import type { base } from '@/models';
import type { PageComponentProps } from './types';

export default async function StandardPage({
  page,
}: PageComponentProps<base.StandardPage>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          {page.introduction && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {page.introduction}
            </p>
          )}
        </section>
        <section className="prose prose-lg max-w-none">
          {page.body.map(({ id, value }) => (
            <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
          ))}
        </section>
      </div>
    </div>
  );
}
