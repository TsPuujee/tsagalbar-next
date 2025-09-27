'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import useThemeToggle from '@/hooks/useThemeToggle';

import LunarInfoCard from '@/components/cards/LunarInfoCard';
import DayChips from '@/components/chips/DayChips';
import ModernDatePicker from '@/components/date/ModernDatePicker';
import Navigation from '@/components/layout/Navigation';
import PageHero from '@/components/layout/PageHero';
import PageMain from '@/components/layout/PageMain';
import SiteFooter from '@/components/layout/SiteFooter';

import { getLunarDate } from '@/utils/calendarHelpers';

interface HairCuttingDay {
  date: Date;
  lunarDay: number;
  recommendation: string;
  isGood: boolean;
  description: string;
}

export default function HairCuttingCalendarPage() {
  const searchParams = useSearchParams();
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = React.useState<HairCuttingDay[]>([]);
  const todayStr = React.useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

  // Initialize with current month or from URL params
  React.useEffect(() => {
    const monthParam = searchParams?.get('month');
    const initialMonth = monthParam ? new Date(monthParam) : new Date();
    setCurrentMonth(initialMonth);
  }, [searchParams]);

  React.useEffect(() => {
    generateHairCuttingCalendar(currentMonth);
  }, [currentMonth]);

  const toggleMode = useThemeToggle();

  // Week alignment helpers (Sunday = 0)
  const startDayOfWeek = React.useMemo(() => {
    const dow = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    // Convert to Monday-first index: Mon=0,...,Sun=6
    return (dow + 6) % 7;
  }, [currentMonth]);

  const generateHairCuttingCalendar = (month: Date) => {
    const year = month.getFullYear();
    const monthNum = month.getMonth() + 1;
    const daysInMonth = new Date(year, monthNum, 0).getDate();
    const days: HairCuttingDay[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, monthNum - 1, day);
      const lunarData = getLunarDate(year, monthNum, day);

      const recommendation = lunarData.us_zasuulah;

      // List of positive recommendations that are considered good days for hair cutting
      const goodRecommendations = [
        'Эд мал баялаг төгөлдөр болно',
        'Бие эрхтний хүч сайжирна',
        'Эд мал арвидна',
        'Өнгө зүс сайжирна',
        'Нас уртасна',
        'Эрч хүн ихэснэ',
        'Эрхтэн хурц болно',
        'Жаргал ирнэ',
        'Эд мал арвижина',
        'Өлзийтэй сайн',
        'Сайн нөхөртэй нөхөрлөнө',
        'Идээ ундаа элбэг олдоно',
        'Эд эдлэл идээ ундаа олдоно',
        'Жаргал үргэлжид ирнэ',
        'Өлзийтэй сайн',
      ];

      const isGood = goodRecommendations.includes(recommendation);

      days.push({
        date: currentDate,
        lunarDay: lunarData.odor_bilgiin_toolol,
        recommendation,
        isGood,
        description: `${lunarData.odor_animal} өдөр - ${lunarData.odor_suudal} суудал`,
      });
    }

    setCalendarDays(days);
  };

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
    // Update URL without page reload
    const monthString = format(newMonth, 'yyyy-MM');
    const url = new URL(window.location.href);
    url.searchParams.set('month', monthString);
    window.history.replaceState({}, '', url.toString());
  };

  const goodDays = calendarDays.filter((day) => day.isGood);
  const badDays = calendarDays.filter((day) => !day.isGood);

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <PageMain>
        <PageHero
          title='Үс засуулах хуанли'
          subtitle={
            'Монгол уламжлалт зурхайн дагуу үс засах сайн муу өдрүүдийн\n                хуанли'
          }
        >
          <div className='mx-auto mb-4 max-w-md'>
            <ModernDatePicker
              selectedDate={currentMonth}
              onDateChange={handleMonthChange}
              granularity='month'
            />
          </div>
        </PageHero>

        {/* Calendar Grid */}
        <section className='layout pb-14'>
          <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900'>
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
              <div className='mb-4 grid grid-cols-7 gap-2'>
                {['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'].map(
                  (day, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'py-2 text-center font-semibold',
                        'text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className='grid grid-cols-7 gap-2'>
                {/* Leading empty placeholders so the 1st aligns with its weekday */}
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`leading-empty-${i}`} />
                ))}

                {calendarDays.map((day, index) => {
                  const isToday = format(day.date, 'yyyy-MM-dd') === todayStr;
                  return (
                    <div
                      key={index}
                      className={clsx(
                        'relative cursor-pointer rounded-lg border-2 p-3',
                        day.isGood
                          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                          : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
                        isToday &&
                          'ring-2 ring-mongolian-600 ring-offset-2 ring-offset-white dark:ring-mongolian-400 dark:ring-offset-gray-900'
                      )}
                    >
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
                      <div className='text-center'>
                        <div
                          className={clsx(
                            'mb-1 text-lg font-bold',
                            'text-gray-900 dark:text-white'
                          )}
                        >
                          {format(day.date, 'd')}
                        </div>
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
                        <div
                          className={clsx(
                            'text-xs',
                            'text-gray-500 dark:text-gray-400'
                          )}
                        >
                          {day.recommendation}
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div
                        className={clsx(
                          'absolute right-1 top-1 h-3 w-3 rounded-full',
                          day.isGood ? 'bg-green-500' : 'bg-red-500'
                        )}
                      />
                    </div>
                  );
                })}

                {/* Trailing placeholders to complete the last week */}
                {Array.from({
                  length:
                    (7 - ((startDayOfWeek + calendarDays.length) % 7)) % 7,
                }).map((_, i) => (
                  <div key={`trailing-empty-${i}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className='layout pb-16'>
          <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <LunarInfoCard
              title={`${goodDays.length} сайн өдөр`}
              description={`${format(
                currentMonth,
                'yyyy оны M сар'
              )}д үс засах сайн өдрүүд`}
              imageSrc='/images/good-haircut.png'
              imageAlt='Үс засах сайн өдөр'
              className='border-2 border-green-300 dark:border-green-600'
            >
              <div className='mt-4'>
                <DayChips dates={goodDays.map((d) => d.date)} color='green' />
              </div>
            </LunarInfoCard>

            <LunarInfoCard
              title={`${badDays.length} муу өдөр`}
              description={`${format(
                currentMonth,
                'yyyy оны M сар'
              )}д үс засах муу өдрүүд`}
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

        <SiteFooter />
      </PageMain>
    </>
  );
}
