import type { Metadata } from 'next';

import { getLunarDate } from '@/utils/calendarHelpers';

import HomePageClient from './_components/HomePageClient';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { date?: string };
}): Promise<Metadata> {
  const now = new Date();
  const dateParam = searchParams?.date;
  const date = dateParam ? new Date(dateParam) : now;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const lunar = getLunarDate(year, month, day);

  const title = `Билгийн тооллын шинийн ${lunar.odor_bilgiin_toolol}-ний өдөр — ${lunar.odor_animal}`;
  const description = `Өнөөдрийн (${year}-${month}-${day}) зөвлөмж: Үс засуулвал — ${lunar.us_zasuulah}. ${lunar.odor_full}.`;
  const ogImage = `/images/${lunar.odor_animal_number + 1}.png`;
  const canonical = dateParam ? `/?date=${year}-${month}-${day}` : '/';

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      url: `https://tsagalbar.vercel.app${canonical}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
