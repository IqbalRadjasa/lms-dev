import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  // metadataBase: new URL('https://your-domain.com'),
  title: 'One - LMS',
  description: 'Learning Management System',
  openGraph: {
    title: 'One - LMS',
    description: 'Learning Management System',
    // url: 'https://your-domain.com',
    siteName: 'One LMS',
    images: [
      {
        url: '/logo-onedek.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    // card: 'summary_large_image',
    title: 'One - LMS',
    description: 'Learning Management System',
    images: ['/logo-onedek.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
