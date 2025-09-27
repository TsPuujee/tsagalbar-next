import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Үс засуулах хуанли',
  description:
    'Монгол уламжлалт зурхайн дагуу үс засах сайн муу өдрүүдийн хуанли',
  alternates: {
    canonical: '/hair-cutting-calendar',
  },
  openGraph: {
    title: 'Үс засуулах хуанли',
    description:
      'Монгол уламжлалт зурхайн дагуу үс засах сайн муу өдрүүдийн хуанли',
    url: 'https://tsagalbar.vercel.app/hair-cutting-calendar',
    images: [{ url: '/images/good-haircut.png' }],
  },
};

export default function HairCuttingCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
