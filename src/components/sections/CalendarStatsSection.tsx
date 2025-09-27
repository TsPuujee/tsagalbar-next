'use client';

import { format } from 'date-fns';
import { memo } from 'react';

import LunarInfoCard from '@/components/cards/LunarInfoCard';
import DayChips from '@/components/chips/DayChips';

import type { HairCuttingDay } from '@/utils/types';

interface CalendarStatsSectionProps {
  currentMonth: Date;
  goodDays: HairCuttingDay[];
  badDays: HairCuttingDay[];
}

/**
 * Calendar statistics section component
 * Хуанлийн статистик харуулах компонент
 */
function CalendarStatsSection({
  currentMonth,
  goodDays,
  badDays,
}: CalendarStatsSectionProps) {
  const monthText = format(currentMonth, 'yyyy оны M сар');

  return (
    <section className='layout pb-16'>
      <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Good Days Card */}
        <LunarInfoCard
          title={`${goodDays.length} сайн өдөр`}
          description={`${monthText}д үс засах сайн өдрүүд`}
          imageSrc='/images/good-haircut.png'
          imageAlt='Үс засах сайн өдөр'
          className='border-2 border-green-300 dark:border-green-600'
        >
          <div className='mt-4'>
            <DayChips dates={goodDays.map((d) => d.date)} color='green' />
          </div>
        </LunarInfoCard>

        {/* Bad Days Card */}
        <LunarInfoCard
          title={`${badDays.length} муу өдөр`}
          description={`${monthText}д үс засах муу өдрүүд`}
          imageSrc='/images/bad-haircut.png'
          imageAlt='Үс засах муу өдөр'
          className='border-2 border-red-300 dark:border-red-600'
        >
          <div className='mt-4'>
            <DayChips dates={badDays.map((d) => d.date)} color='red' />
          </div>
        </LunarInfoCard>
      </div>
    </section>
  );
}

export default memo(CalendarStatsSection);
