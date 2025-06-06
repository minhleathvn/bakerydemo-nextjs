import type { Metadata } from 'next';
import './globals.css';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: 'The Alba Bakery 2025',
  description: 'A sample site designed to demonstrate the capabilities of the Wagtail Content Management System.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Navigation />
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Copyright <strong>The Wagtail Bakery</strong>, 2019. All rights reserved.
              </p>
              <p className="text-xs italic text-muted-foreground">
                "If you read a lot you're well read / If you eat a lot you're well bread."
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
