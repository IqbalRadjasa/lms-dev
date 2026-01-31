import './globals.css';
import 'remixicon/fonts/remixicon.css';

import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
