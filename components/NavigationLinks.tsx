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

  const linkClasses = (path: string) => {
    const isActive = isCurrentPage(path) === 'page';
    return `text-brown-700 hover:text-bakery-700 font-medium transition-colors ${
      isActive ? 'text-bakery-700 border-b-2 border-bakery-700' : ''
    }`;
  };

  return (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.meta.html_path}
          aria-current={isCurrentPage(item.meta.html_path)}
          className={linkClasses(item.meta.html_path)}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}
