import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Vibur, Beth_Ellen } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const pacifico = Beth_Ellen({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sahil Kumar Singh',
  description: 'Hi, I\'m Sahil Kumar Singh. This is where I share my journey through art, blogs, mathematics and creativity. Explore my work, read my thoughts, and join me on my adventure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${pacifico.variable} font-sans`}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}