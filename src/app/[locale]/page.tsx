'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useTranslations } from 'next-intl';

import LunarInfoCard from '@/components/cards/LunarInfoCard';
import ModernDatePicker from '@/components/date/ModernDatePicker';
import Navigation from '@/components/layout/Navigation';
import UnderlineLink from '@/components/links/UnderlineLink';
import Loading from '@/components/Loading';

import { getLunarDate } from '@/utils/calendarHelpers';

export default function HomePage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [selectedDateData, setSelectedDateData] = React.useState<any>(null);

  // Initialize with today's data or from URL params
  React.useEffect(() => {
    const dateParam = searchParams?.get('date');
    const initialDate = dateParam ? new Date(dateParam) : new Date();
    setStartDate(initialDate);

    const currentYear = parseInt(format(initialDate, 'yyyy'), 10);
    const currentMonth = parseInt(format(initialDate, 'M'), 10);
    const currentDay = parseInt(format(initialDate, 'd'), 10);
    const currentDateData = getLunarDate(currentYear, currentMonth, currentDay);
    setSelectedDateData(currentDateData);
  }, [searchParams]);

  React.useEffect(() => {
    if (startDate) {
      const currentYear = parseInt(format(startDate, 'yyyy'), 10);
      const currentMonth = parseInt(format(startDate, 'M'), 10);
      const currentDay = parseInt(format(startDate, 'd'), 10);
      const currentDateData = getLunarDate(
        currentYear,
        currentMonth,
        currentDay
      );
      setSelectedDateData(currentDateData);
    }
  }, [startDate]);

  // Theme toggle only mutates root class and persists; rendering uses Tailwind dark: variants
  const toggleMode = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      /* noop */
    }
  }, []);

  const changeDate = (date: Date) => {
    setStartDate(date);
    // Update URL without page reload
    const dateString = format(date, 'yyyy-M-d');
    const url = new URL(window.location.href);
    url.searchParams.set('date', dateString);
    window.history.replaceState({}, '', url.toString());
  };

  if (!selectedDateData) {
    return <Loading />;
  }

  // Get good recommendations from translations
  const goodRecommendations = t.raw('goodRecommendations') as string[];
  const isGoodHaircutDay: boolean = goodRecommendations.includes(
    selectedDateData.us_zasuulah
  );

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <main
        className={clsx(
          'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
        )}
      >
        {/* Hero Section */}
        <section className='relative overflow-hidden'>
          {/* Background Pattern */}

          <div className='layout relative z-10 py-16'>
            <div className='mb-4 text-center'>
              <h1
                className={clsx(
                  'mb-6 text-4xl font-bold md:text-5xl',
                  'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent'
                )}
              >
                {t('home.title')}
              </h1>
              <p
                className={clsx(
                  'mx-auto max-w-2xl text-lg md:text-xl',
                  'text-gray-600 dark:text-gray-300'
                )}
              >
                {t('home.subtitle')}
              </p>
            </div>

            {/* Date Picker */}
            <div className='mx-auto mb-4 max-w-md'>
              <ModernDatePicker
                selectedDate={startDate}
                onDateChange={changeDate}
                placeholder={t('home.datePicker')}
              />
            </div>
          </div>
        </section>

        {/* Lunar Information Cards */}
        <section className='layout pb-16'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
            {/* Year Card */}
            <LunarInfoCard
              title={t('lunar.year', {
                jaran: selectedDateData.jaran,
                jilCycleName: selectedDateData.jil_cycle_name,
                jil: selectedDateData.jil
              })}
              description={t('home.yearInfo')}
              imageSrc={`/images/${selectedDateData.jil_animal_number + 1}.png`}
              imageAlt={`${selectedDateData.jil} жил`}
            />

            {/* Month Card */}
            <LunarInfoCard
              title={t('lunar.month', {
                sarMenge: selectedDateData.sar_menge,
                sar: selectedDateData.sar,
                sarJil: selectedDateData.sar_jil
              })}
              description={t('home.monthInfo')}
              imageSrc={`/images/${selectedDateData.sar_animal_number + 1}.png`}
              imageAlt={`${selectedDateData.sar_jil} сар`}
            />

            {/* Day Card */}
            <LunarInfoCard
              title={t('lunar.day', {
                odorBilgiinToolol: selectedDateData.odor_bilgiin_toolol,
                odorSuudal: selectedDateData.odor_suudal,
                odorMenge: selectedDateData.odor_menge,
                odorAnimal: selectedDateData.odor_animal
              })}
              description={t('home.dayInfo')}
              imageSrc={`/images/${
                selectedDateData.odor_animal_number + 1
              }.png`}
              imageAlt={`${selectedDateData.odor_animal} өдөр`}
            />

            {/* Hair Cutting Card */}
            <LunarInfoCard
              title={`${t('home.hairCuttingResult')}: ${selectedDateData.us_zasuulah}`}
              description={t('home.hairCuttingInfo')}
              imageSrc={
                isGoodHaircutDay
                  ? '/images/good-haircut.png'
                  : '/images/bad-haircut.png'
              }
              imageAlt={isGoodHaircutDay ? t('home.goodDay') : t('home.badDay')}
              className={clsx(
                'border-2',
                isGoodHaircutDay
                  ? 'border-green-300 dark:border-green-600'
                  : 'border-red-300 dark:border-red-600'
              )}
            />
          </div>
        </section>

        {/* Footer */}
        <footer
          className={clsx(
            'border-t py-8',
            'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
          )}
        >
          <div className='layout text-center'>
            <p className={clsx('text-gray-600 dark:text-gray-400')}>
              {t('home.copyright', {
                year: new Date().getFullYear(),
                author: 'Puujee Ts'
              })}{' '}
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