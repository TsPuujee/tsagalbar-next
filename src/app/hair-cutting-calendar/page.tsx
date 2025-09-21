'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import LunarInfoCard from '@/components/cards/LunarInfoCard';
import ModernDatePicker from '@/components/date/ModernDatePicker';
import Navigation from '@/components/layout/Navigation';
import UnderlineLink from '@/components/links/UnderlineLink';

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
  const [mode, setMode] = React.useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      if (document.documentElement.classList.contains('dark')) return 'dark';
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Initialize with current month or from URL params
  React.useEffect(() => {
    const monthParam = searchParams?.get('month');
    const initialMonth = monthParam ? new Date(monthParam) : new Date();
    setCurrentMonth(initialMonth);
  }, [searchParams]);

  React.useEffect(() => {
    generateHairCuttingCalendar(currentMonth);
  }, [currentMonth]);

  // Sync html class if needed on mount
  React.useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist and apply theme on change
  React.useEffect(() => {
    try {
      localStorage.setItem('theme', mode);
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      // noop
    }
  }, [mode]);

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

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const goodDays = calendarDays.filter((day) => day.isGood);
  const badDays = calendarDays.filter((day) => !day.isGood);

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <main
        className={clsx(
          'min-h-screen',
          mode === 'dark'
            ? 'bg-gradient-to-br from-gray-900 to-gray-800'
            : 'bg-gradient-to-br from-gray-50 to-gray-100'
        )}
      >
        {/* Hero Section */}
        <section className='relative overflow-hidden'>
          <div className='absolute inset-0 opacity-5'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className='layout relative z-10 py-16'>
            <div className='mb-12 text-center'>
              <h1
                className={clsx(
                  'mb-6 text-4xl font-bold md:text-6xl',
                  'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent'
                )}
              >
                ✂️ Үс засах сайн өдрүүд
              </h1>
              <p
                className={clsx(
                  'mx-auto max-w-3xl text-lg md:text-xl',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                Монгол уламжлалт зурхайн дагуу үс засах сайн муу өдрүүдийн
                хуанли
              </p>
            </div>

            {/* Month Picker */}
            <div className='mx-auto mb-16 max-w-md'>
              <ModernDatePicker
                selectedDate={currentMonth}
                onDateChange={handleMonthChange}
                mode={mode}
                placeholder='Сар сонгох'
              />
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className='layout pb-8'>
          <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <LunarInfoCard
              title={`${goodDays.length} сайн өдөр`}
              description={`${format(
                currentMonth,
                'yyyy оны M сар'
              )}д үс засах сайн өдрүүд`}
              imageSrc='/images/hairCut.png'
              imageAlt='Үс засах сайн өдөр'
              mode={mode}
              className='border-2 border-green-300 dark:border-green-600'
            >
              <div className='mt-4'>
                <div className='flex flex-wrap gap-2'>
                  {goodDays.slice(0, 5).map((day, index) => (
                    <span
                      key={index}
                      className='rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200'
                    >
                      {format(day.date, 'dd')}
                    </span>
                  ))}
                  {goodDays.length > 5 && (
                    <span className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
                      +{goodDays.length - 5} өдөр
                    </span>
                  )}
                </div>
              </div>
            </LunarInfoCard>

            <LunarInfoCard
              title={`${badDays.length} муу өдөр`}
              description={`${format(
                currentMonth,
                'yyyy оны M сар'
              )}д үс засах муу өдрүүд`}
              imageSrc='/images/hairCut.png'
              imageAlt='Үс засах муу өдөр'
              mode={mode}
              className='border-2 border-red-300 dark:border-red-600'
            >
              <div className='mt-4'>
                <div className='flex flex-wrap gap-2'>
                  {badDays.slice(0, 5).map((day, index) => (
                    <span
                      key={index}
                      className='rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200'
                    >
                      {format(day.date, 'dd')}
                    </span>
                  ))}
                  {badDays.length > 5 && (
                    <span className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
                      +{badDays.length - 5} өдөр
                    </span>
                  )}
                </div>
              </div>
            </LunarInfoCard>
          </div>
        </section>

        {/* Calendar Grid */}
        <section className='layout pb-16'>
          <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900'>
            <div
              className={clsx(
                'border-b p-6',
                mode === 'dark'
                  ? 'border-gray-700 bg-gray-900'
                  : 'border-gray-200 bg-gray-50'
              )}
            >
              <h2
                className={clsx(
                  'text-center text-2xl font-bold',
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                )}
              >
                {format(currentMonth, 'yyyy оны M сар')} - Үс засах хуанли
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
                        mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className='grid grid-cols-7 gap-2'>
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'relative cursor-pointer rounded-lg border-2 p-3',
                      day.isGood
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    )}
                  >
                    <div className='text-center'>
                      <div
                        className={clsx(
                          'mb-1 text-lg font-bold',
                          mode === 'dark' ? 'text-white' : 'text-gray-900'
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
                      <div
                        className={clsx(
                          'text-xs',
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
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
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legend */}
        <section className='layout pb-16'>
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900'>
            <h3
              className={clsx(
                'mb-4 text-xl font-bold',
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              )}
            >
              Тайлбар
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='flex items-center space-x-3'>
                <div className='h-4 w-4 rounded-full bg-green-500'></div>
                <span
                  className={clsx(
                    mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}
                >
                  Сайн өдөр - үс засах зөв
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-4 w-4 rounded-full bg-red-500'></div>
                <span
                  className={clsx(
                    mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}
                >
                  Муу өдөр - үс засах зөв биш
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={clsx(
            'border-t py-8',
            mode === 'dark'
              ? 'border-gray-800 bg-gray-900'
              : 'border-gray-200 bg-white'
          )}
        >
          <div className='layout text-center'>
            <p
              className={clsx(
                mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              )}
            >
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://github.com/TsPuujee'>
                Puujee Ts
              </UnderlineLink>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
