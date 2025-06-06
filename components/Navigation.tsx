import Link from 'next/link';
import { getMenuItems } from '@/lib/menu';
import { NavigationLinks } from './NavigationLinks';

export default async function Navigation() {
  const menuItems = await getMenuItems();

  return (
    <header className="bg-white shadow-sm border-b border-brown-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-bakery-700 hover:text-bakery-800 transition-colors">
              The Wagtail Bakery
            </Link>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <NavigationLinks menuItems={menuItems} />
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-brown-700 hover:text-bakery-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Skip to main content - accessible but hidden */}
      <Link 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-bakery-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </Link>
    </header>
  );
}
