import Link from 'next/link';
import { getMenuItems } from '@/lib/menu';
import { NavigationLinks } from './NavigationLinks';

export default async function Navigation() {
  const menuItems = await getMenuItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="#main" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-1 bg-primary text-primary-foreground px-3 py-1 rounded-md"
          >
            Skip to main content
          </Link>
          
          <NavigationLinks menuItems={menuItems} />
        </div>
      </div>
    </header>
  );
}
