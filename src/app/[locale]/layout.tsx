import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import '@/styles/globals.css';
import '@/styles/colors.css';

import { locales } from '@/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tsagalbar.vercel.app'),
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s|| (m?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();",
          }}
        />
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          href='https://use.fontawesome.com/releases/v5.15.3/css/all.css'
          rel='stylesheet'
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script
          strategy='afterInteractive'
          src='https://unpkg.com/flowbite@1.5.3/dist/datepicker.js'
        />
      </body>
    </html>
  );
}