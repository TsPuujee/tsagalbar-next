import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { getLunarNewYearDetails } from '@/utils/lunar';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date: any = dayjs(searchParams.get('year') as string) || dayjs();

  const currentYear: number = parseInt(date.format('YYYY'), 10);
  const currentDateData: any = getLunarNewYearDetails(currentYear);
  currentDateData.jil_image = `https://tsagalbar.vercel.app${currentDateData.image}`;
  delete currentDateData.image;

  return NextResponse.json({
    data: {
      date: date.format('YYYY'),
      data: currentDateData,
    },
    error: null,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const date: any = dayjs(body.year) || dayjs();

  const currentYear: number = parseInt(date.format('YYYY'), 10);
  const currentDateData: any = getLunarNewYearDetails(currentYear);
  currentDateData.jil_image = `https://tsagalbar.vercel.app${currentDateData.image}`;
  delete currentDateData.image;

  return NextResponse.json({
    data: {
      date: date.format('YYYY'),
      data: currentDateData,
    },
    error: null,
  });
}
