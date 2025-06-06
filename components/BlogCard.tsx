import type { blog, recipes } from '@/models';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/format';

interface BlogCardProps {
  page: blog.BlogPage | recipes.RecipePage;
}

export default function BlogCard({ page }: BlogCardProps) {
  const isBlog = 'blog_person_relationship' in page;
  const relation = isBlog
    ? page.blog_person_relationship
    : page.recipe_person_relationship;

  return (
    <article className="card group">
      {isBlog && page.image && (
        <Link href={page.meta.html_path} className="block">
          <div className="overflow-hidden">
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={400}
              height={240}
              loading="lazy"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="card-body">
        <h2 className="text-xl font-semibold text-brown-800 mb-3">
          <Link 
            href={page.meta.html_path}
            className="hover:text-bakery-700 transition-colors line-clamp-2"
          >
            {page.title}
          </Link>
        </h2>
        
        {page.introduction && (
          <p className="text-brown-600 mb-4 line-clamp-3">{page.introduction}</p>
        )}
        
        <div className="text-sm text-brown-500 flex items-center justify-between">
          <div>
            {page.date_published && (
              <time dateTime={page.date_published}>
                {formatDate(page.date_published)}
              </time>
            )}
          </div>
          
          {relation.length > 0 && (
            <div className="flex items-center space-x-1">
              <span>by</span>
              <span className="font-medium">
                {relation.map((rel, index) => (
                  <span key={rel.person.id}>
                    {rel.person.first_name} {rel.person.last_name}
                    {index < relation.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

