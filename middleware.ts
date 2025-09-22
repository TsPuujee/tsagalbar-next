import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: defaultLocale,
  
  // Always use locale prefix in URLs
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mn|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};