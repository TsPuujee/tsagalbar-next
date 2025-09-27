import type { Metadata } from 'next';

import TsagaanSarClient from './_components/TsagaanSarClient';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { year?: string };
}): Promise<Metadata> {
  const now = new Date();
  const yearParam = searchParams?.year;
  const year = yearParam ? parseInt(yearParam, 10) : now.getFullYear() + 1;
  const title = `Цагаан сар — ${year}`;
  const description = `${year} оны Цагаан сарын (шинийн нэгэн) зурхайн мэдээлэл.`;
  const canonical = yearParam ? `/tsagaan-sar?year=${year}` : '/tsagaan-sar';
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `https://tsagalbar.vercel.app${canonical}`,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function TsagaanSarPage() {
  return <TsagaanSarClient />;
}
