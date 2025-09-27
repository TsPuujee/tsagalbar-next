'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import { memo } from 'react';

import { DATE_CONFIG } from '@/constants/app';
import type { HairCuttingDay } from '@/utils/types';

interface CalendarGridSectionProps {
  currentMonth: Date;
  calendarDays: HairCuttingDay[];
  startDayOfWeek: number;
  todayStr: string;
}

/**
 * Calendar grid display component
 * Хуанлийн сүлжээ харуулах компонент
 */
function CalendarGridSection({
  currentMonth,
  calendarDays,
  startDayOfWeek,
  todayStr,
}: CalendarGridSectionProps) {
  return (
    <section className='layout pb-14'>
      <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900'>
        {/* Month Header */}
        <div
          className={clsx(
            'border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900'
          )}
        >
          <h2
            className={clsx(
              'text-center text-2xl font-bold',
              'text-gray-900 dark:text-white'
            )}
          >
            {format(currentMonth, 'yyyy оны M сар')}
          </h2>
        </div>

        <div className='p-6'>
          {/* Weekday Headers */}
          <div className='mb-4 grid grid-cols-7 gap-2'>
            {DATE_CONFIG.mongolianWeekdays.map((day, index) => (
              <div
                key={index}
                className={clsx(
                  'py-2 text-center font-semibold',
                  'text-gray-600 dark:text-gray-300'
                )}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className='grid grid-cols-7 gap-2'>
            {/* Leading empty cells */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`leading-empty-${i}`} />
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const isToday = format(day.date, 'yyyy-MM-dd') === todayStr;

              return <CalendarDay key={index} day={day} isToday={isToday} />;
            })}

            {/* Trailing empty cells */}
            {Array.from({
              length: (7 - ((startDayOfWeek + calendarDays.length) % 7)) % 7,
            }).map((_, i) => (
              <div key={`trailing-empty-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual calendar day cell component
 * Хуанлийн өдөр харуулах компонент
 */
const CalendarDay = memo(
  ({ day, isToday }: { day: HairCuttingDay; isToday: boolean }) => (
    <div
      className={clsx(
        'relative cursor-pointer rounded-lg border-2 p-3',
        day.isGood
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
          : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
        isToday &&
          'ring-2 ring-mongolian-600 ring-offset-2 ring-offset-white dark:ring-mongolian-400 dark:ring-offset-gray-900'
      )}
    >
      {/* Today indicator */}
      {isToday && (
        <div
          className={clsx(
            'absolute left-1 top-1 rounded px-1.5 py-0.5 text-[10px] font-semibold',
            'bg-mongolian-100 text-mongolian-800 dark:bg-mongolian-700 dark:text-white'
          )}
        >
          Өнөөдөр
        </div>
      )}

      {/* Day content */}
      <div className='text-center'>
        {/* Day number */}
        <div
          className={clsx(
            'mb-1 text-lg font-bold',
            'text-gray-900 dark:text-white'
          )}
        >
          {format(day.date, 'd')}
        </div>

        {/* Lunar day */}
        <div
          className={clsx(
            'mb-1 text-xs font-medium',
            day.isGood
              ? 'text-green-700 dark:text-green-300'
              : 'text-red-700 dark:text-red-300'
          )}
        >
          {day.lunarDay} өдөр
        </div>

        {/* Haircut icon */}
        <div className='mb-1 flex justify-center'>
          <Image
            src={
              day.isGood
                ? '/images/good-haircut.png'
                : '/images/bad-haircut.png'
            }
            alt={day.isGood ? 'Сайн өдөр' : 'Муу өдөр'}
            width={40}
            height={40}
          />
        </div>

        {/* Recommendation text */}
        <div className={clsx('text-xs', 'text-gray-500 dark:text-gray-400')}>
          {day.recommendation}
        </div>
      </div>

      {/* Status indicator dot */}
      <div
        className={clsx(
          'absolute right-1 top-1 h-3 w-3 rounded-full',
          day.isGood ? 'bg-green-500' : 'bg-red-500'
        )}
      />
    </div>
  )
);

CalendarDay.displayName = 'CalendarDay';

export default memo(CalendarGridSection);
