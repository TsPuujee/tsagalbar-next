import type { Metadata } from 'next';

import { generateTsagaanSarMetadata } from '@/utils/metadataGenerator';

import TsagaanSarClient from './_components/TsagaanSarClient';

interface TsagaanSarPageProps {
  searchParams: Promise<{ year?: string }>;
}

/**
 * Generate metadata for Tsagaan Sar page
 * Цагаан сарын хуудасны метадата үүсгэх
 */
export async function generateMetadata({
  searchParams,
}: TsagaanSarPageProps): Promise<Metadata> {
  const params = await searchParams;
  return generateTsagaanSarMetadata(params);
}

/**
 * Tsagaan Sar page component
 * Цагаан сарын хуудас
 */
export default function TsagaanSarPage() {
  return <TsagaanSarClient />;
}
