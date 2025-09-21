import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Цагалбар',
    default: 'Цагалбар - Монгол уламжлалт зурхай',
  },
  description:
    'Монгол уламжлалт тооллын дагуу өдрийн сайн муугийг мэдэж авцгаая',
  keywords: ['монгол', 'зурхай', 'тоолол', 'лунар', 'цагалбар', 'цагаан сар'],
  authors: [{ name: 'Puujee Ts', url: 'https://github.com/TsPuujee' }],
  creator: 'Puujee Ts',
  openGraph: {
    type: 'website',
    locale: 'mn_MN',
    url: 'https://tsagalbar.vercel.app',
    siteName: 'Цагалбар',
    title: 'Цагалбар - Монгол уламжлалт зурхай',
    description:
      'Монгол уламжлалт тооллын дагуу өдрийн сайн муугийг мэдэж авцгаая',
    images: [
      {
        url: '/images/1.png',
        width: 1200,
        height: 630,
        alt: 'Цагалбар - Монгол уламжлалт зурхай',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Цагалбар - Монгол уламжлалт зурхай',
    description:
      'Монгол уламжлалт тооллын дагуу өдрийн сайн муугийг мэдэж авцгаая',
    images: ['/images/1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='mn' className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
