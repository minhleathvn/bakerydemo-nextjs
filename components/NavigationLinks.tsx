'use client';

import type { wagtailcore } from '@/models';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationLinksProps = {
  menuItems: wagtailcore.Page[];
};

const normalizePath = (path: string | null) => {
  if (!path) return '';
  return path.replace(/\/$/, ''); // Remove trailing slash
};

export function NavigationLinks({ menuItems }: NavigationLinksProps) {
  const pathname = usePathname();

  // Only set aria-current if pathname is not null
  const isCurrentPage = (path: string) => {
    if (!pathname) return undefined;
    return normalizePath(pathname) === normalizePath(path) ? 'page' : undefined;
  };

  return (
    <>
      <Link 
        href="/" 
        aria-current={isCurrentPage('/')}
        className="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
      >
        <span className="text-2xl">🥖</span>
        <span>The Alba Bakery 2025</span>
      </Link>

      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center space-x-8">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.meta.html_path}
                aria-current={isCurrentPage(item.meta.html_path)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isCurrentPage(item.meta.html_path) 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu button - you can expand this later */}
      <button 
        className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}
