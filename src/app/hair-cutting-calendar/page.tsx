import type { Metadata } from 'next';

import HairCuttingCalendarClient from './_components/HairCuttingCalendarClient';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const now = new Date();
  const monthParam = sp?.month;
  const base = monthParam ? new Date(monthParam) : now;
  const year = base.getFullYear();
  const month = base.getMonth() + 1;
  const title = `Үс засуулах хуанли — ${year} оны ${month} сар`;
  const description = `${year} оны ${month} сарын үс засуулах сайн/муу өдрүүдийн хуанли.`;
  const canonical = monthParam
    ? `/hair-cutting-calendar?month=${year}-${String(month).padStart(2, '0')}`
    : '/hair-cutting-calendar';
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `https://tsagalbar.vercel.app${canonical}`,
      images: [{ url: '/images/good-haircut.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/good-haircut.png'],
    },
  };
}

export default function HairCuttingCalendarPage() {
  return <HairCuttingCalendarClient />;
}
