import type { base } from '@/models';
import type { PageComponentProps } from './types';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import Link from 'next/link';

export default async function HomePage({
  page,
}: PageComponentProps<base.HomePage>) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-bakery-100 to-brown-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-brown-900 mb-6">
            Welcome to the Wagtail Bakery!
          </h1>
          {page.hero_text && (
            <p className="text-xl text-brown-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {page.hero_text}
            </p>
          )}
          {page.hero_cta_link && (
            <Link 
              href={page.hero_cta_link.meta.html_path}
              className="btn-primary inline-block text-lg px-8 py-3"
            >
              {page.hero_cta || 'Learn more about Wagtail'}
            </Link>
          )}
          
          {/* Subtitle */}
          <p className="text-lg text-brown-600 mt-8 italic">
            A sample site designed to demonstrate the capabilities of the Wagtail Content Management System.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <BaseStreamBlock blocks={page.body} />
        </div>
      </section>
    </>
  );
}
