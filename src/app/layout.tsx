import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

export default function RootLayout() {
  // Redirect to default locale
  redirect(`/${defaultLocale}`);
}
