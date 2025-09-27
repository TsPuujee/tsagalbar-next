import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { getLunarDate } from '@/utils/calendarHelpers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date: any = dayjs(searchParams.get('date') as string) || dayjs();

  const currentYear: number = parseInt(date.format('YYYY'), 10);
  const currentMonth: number = parseInt(date.format('M'), 10);
  const currentDay: number = parseInt(date.format('D'), 10);
  const currentDateData: any = getLunarDate(
    currentYear,
    currentMonth,
    currentDay
  );
  currentDateData.sar_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.sar_animal_number || 0
  }.png`;
  currentDateData.jil_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.jil_animal_number || 0
  }.png`;
  currentDateData.odor_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.odor_animal_number || 0
  }.png`;
  delete currentDateData.sar_animal_number;
  delete currentDateData.jil_animal_number;
  delete currentDateData.odor_animal_number;
  delete currentDateData.jil_full;
  delete currentDateData.sar_full;
  delete currentDateData.odor_full;

  return NextResponse.json({
    data: {
      date: dayjs().format('YYYY-MM-DD'),
      data: currentDateData,
    },
    error: null,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const date: any = dayjs(body.date) || dayjs();

  const currentYear: number = parseInt(date.format('YYYY'), 10);
  const currentMonth: number = parseInt(date.format('M'), 10);
  const currentDay: number = parseInt(date.format('D'), 10);
  const currentDateData: any = getLunarDate(
    currentYear,
    currentMonth,
    currentDay
  );
  currentDateData.sar_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.sar_animal_number || 0
  }.png`;
  currentDateData.jil_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.jil_animal_number || 0
  }.png`;
  currentDateData.odor_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.odor_animal_number || 0
  }.png`;
  delete currentDateData.sar_animal_number;
  delete currentDateData.jil_animal_number;
  delete currentDateData.odor_animal_number;
  delete currentDateData.jil_full;
  delete currentDateData.sar_full;
  delete currentDateData.odor_full;

  return NextResponse.json({
    data: {
      date: dayjs().format('YYYY-MM-DD'),
      data: currentDateData,
    },
    error: null,
  });
}


