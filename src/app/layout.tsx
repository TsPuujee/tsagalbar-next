import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

export default function RootLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to default locale
  redirect(`/${defaultLocale}`);
}
