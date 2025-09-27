import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import '@/styles/globals.css';
import '@/styles/colors.css';

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
  description: 'Монгол зурхайн тооллоор өдөр тутмын зөвлөмж, сайн муу өдрүүд',
  keywords: ['монгол', 'зурхай', 'тоолол', 'лунар', 'цагалбар', 'цагаан сар'],
  authors: [{ name: 'Puujee Ts', url: 'https://github.com/TsPuujee' }],
  creator: 'Puujee Ts',
  applicationName: 'Цагалбар',
  alternates: {
    canonical: '/',
    languages: {
      mn: '/',
      'mn-MN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'mn_MN',
    url: 'https://tsagalbar.vercel.app',
    siteName: 'Цагалбар',
    title: 'Цагалбар - Монгол уламжлалт зурхай',
    description: 'Монгол зурхайн тооллоор өдөр тутмын зөвлөмж, сайн муу өдрүүд',
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
    description: 'Монгол зурхайн тооллоор өдөр тутмын зөвлөмж, сайн муу өдрүүд',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/favicon/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/favicon/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='mn' className={inter.variable} suppressHydrationWarning>
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
        {children}
        <Script
          id='ld-json-website'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Цагалбар',
              url: 'https://tsagalbar.vercel.app',
              inLanguage: 'mn-MN',
              description:
                'Монгол зурхайн тооллоор өдөр тутмын зөвлөмж, сайн муу өдрүүд',
              publisher: {
                '@type': 'Organization',
                '@id': 'https://tsagalbar.vercel.app/#organization',
                name: 'Цагалбар',
                url: 'https://tsagalbar.vercel.app',
              },
            }),
          }}
        />
        <Script
          id='ld-json-organization'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://tsagalbar.vercel.app/#organization',
              name: 'Цагалбар',
              url: 'https://tsagalbar.vercel.app',
              sameAs: ['https://github.com/TsPuujee'],
              logo: {
                '@type': 'ImageObject',
                url: 'https://tsagalbar.vercel.app/favicon/favicon-96x96.png',
              },
            }),
          }}
        />
        <Script
          strategy='afterInteractive'
          src='https://unpkg.com/flowbite@1.5.3/dist/datepicker.js'
        />
      </body>
    </html>
  );
}
