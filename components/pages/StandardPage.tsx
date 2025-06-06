import type { base } from '@/models';
import type { PageComponentProps } from './types';

export default async function StandardPage({
  page,
}: PageComponentProps<base.StandardPage>) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="section-title">{page.title}</h1>
        {page.introduction && (
          <p className="text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed">
            {page.introduction}
          </p>
        )}
      </header>

      {/* Content */}
      <section className="prose prose-lg mx-auto">
        {page.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </section>
    </article>
  );
}
