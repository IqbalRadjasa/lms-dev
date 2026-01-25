import './globals.css';
import 'remixicon/fonts/remixicon.css';

import { Toaster } from 'react-hot-toast';
import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
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
      <body className={`${ibmPlex.variable} antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
