import type { Metadata } from 'next';
import './globals.css';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: 'The Wagtail Bakery',
  description: 'A sample site designed to demonstrate the capabilities of the Wagtail Content Management System.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brown-50">
        <Navigation />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <footer className="bg-brown-800 text-brown-100 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="mb-2">
              Copyright <strong>The Wagtail Bakery</strong>, 2025. All rights reserved.
            </p>
            <p className="text-brown-300 italic">
              "If you read a lot you're well read / If you eat a lot you're well bread."
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
