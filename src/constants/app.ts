/**
 * Application-wide constants
 * Програмын хэмжээнд хэрэглэгдэх тогтмол утгууд
 */

// Site Configuration
export const SITE_CONFIG = {
  name: 'Дорнын зурхай',
  description: 'Монгол зурхайн аргаар бодсон дорнын зурхай',
  url: 'https://tsagalbar.vercel.app',
  author: 'Puujee Ts',
  authorUrl: 'https://github.com/TsPuujee',
  twitter: '@tsagalbar',
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'system' as const,
  storageKey: 'theme',
  themes: ['light', 'dark', 'system'] as const,
} as const;

// Date Configuration
export const DATE_CONFIG = {
  defaultFormat: 'yyyy-MM-dd',
  displayFormat: 'yyyy/MM/dd',
  maxYearsInFuture: 5,
  maxYearsInPast: 10,
  mongolianWeekdays: ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'] as const,
} as const;

// Image Configuration
export const IMAGE_CONFIG = {
  defaultWidth: 800,
  defaultHeight: 600,
  animalImageBasePath: '/images',
  haircutImages: {
    good: '/images/good-haircut.png',
    bad: '/images/bad-haircut.png',
  },
  lunarImages: {
    basePath: '/images/lunarImages',
    count: 12,
  },
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  keywords: {
    mongolian: [
      'дорнын зурхай',
      'монгол зурхай', 
      'билгийн тоолол',
      'өдрийн зурхай',
      'үс засах өдөр',
      'цагаан сар',
      'шинэ жил',
      'жилийн мэнгэ',
    ],
    english: [
      'lunar calendar',
      'mongolian calendar',
      'daily horoscope',
      'hair cutting calendar',
      'lunar new year',
    ],
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
} as const;

// API Configuration (for future use)
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  retries: 3,
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
} as const;
