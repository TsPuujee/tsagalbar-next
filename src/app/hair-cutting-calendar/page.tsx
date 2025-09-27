import type { Metadata } from 'next';

import { generateHairCuttingCalendarMetadata } from '@/utils/metadataGenerator';

import HairCuttingCalendarClient from './_components/HairCuttingCalendarClient';

interface HairCuttingCalendarPageProps {
  searchParams: Promise<{ month?: string }>;
}

/**
 * Generate metadata for hair cutting calendar page
 * Үс засуулах хуанлийн хуудасны метадата үүсгэх
 */
export async function generateMetadata({
  searchParams,
}: HairCuttingCalendarPageProps): Promise<Metadata> {
  const params = await searchParams;
  return generateHairCuttingCalendarMetadata(params);
}

/**
 * Hair cutting calendar page component
 * Үс засуулах хуанлийн хуудас
 */
export default function HairCuttingCalendarPage() {
  return <HairCuttingCalendarClient />;
}
