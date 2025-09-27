import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Цагаан сар',
  description: 'Монгол зурхайн аргаар бодсон дорнын зурхай',
  alternates: {
    canonical: '/tsagaan-sar',
  },
  openGraph: {
    title: 'Цагаан сар',
    description: 'Монгол зурхайн аргаар бодсон дорнын зурхай',
    url: 'https://tsagalbar.vercel.app/tsagaan-sar',
  },
};

export default function TsagaanSarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
