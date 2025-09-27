import type { Metadata } from 'next';

import { getLunarDate } from '@/utils/calendarHelpers';
import { generateHomePageMetadata } from '@/utils/metadataGenerator';

import HomePageClient from './_components/HomePageClient';

interface HomePageProps {
  searchParams: Promise<{ date?: string }>;
}

/**
 * Generate metadata for home page
 * Үндсэн хуудасны метадата үүсгэх
 */
export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const params = await searchParams;
  return generateHomePageMetadata(params, getLunarDate);
}

/**
 * Home page component
 * Үндсэн хуудас
 */
export default function HomePage() {
  return <HomePageClient />;
}
