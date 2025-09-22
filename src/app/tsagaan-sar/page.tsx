'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import LunarInfoCard from '@/components/cards/LunarInfoCard';
import ModernDatePicker from '@/components/date/ModernDatePicker';
import Navigation from '@/components/layout/Navigation';
import UnderlineLink from '@/components/links/UnderlineLink';
import Loading from '@/components/Loading';

import { getLunarNewYearDetails } from '@/utils/lunar';

export default function TsagaanSarPage() {
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [selectedDateData, setSelectedDateData] = React.useState<any>(null);
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

  // Initialize with current year or from URL params
  React.useEffect(() => {
    const yearParam = searchParams?.get('year');
    const initialYear = yearParam
      ? parseInt(yearParam, 10)
      : new Date().getFullYear() + 1;
    const initialDate = new Date(initialYear, 0, 1);
    setStartDate(initialDate);

    const currentDateData = getLunarNewYearDetails(initialYear);
    setSelectedDateData(currentDateData);
  }, [searchParams]);

  React.useEffect(() => {
    if (startDate) {
      const currentYear = startDate.getFullYear();
      const currentDateData = getLunarNewYearDetails(currentYear);
      setSelectedDateData(currentDateData);
    }
  }, [startDate]);

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

  const changeDate = (date: Date) => {
    setStartDate(date);
    // Update URL without page reload
    const year = date.getFullYear();
    const url = new URL(window.location.href);
    url.searchParams.set('year', year.toString());
    window.history.replaceState({}, '', url.toString());
  };

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  if (!selectedDateData) {
    return <Loading />;
  }

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
          <div className='layout relative z-10 pt-12'>
            <div className='mb-12 text-center'>
              <h1
                className={clsx(
                  'mb-6 text-4xl font-bold md:text-5xl',
                  'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent'
                )}
              >
                Цагаан сар
              </h1>
              <p
                className={clsx(
                  'mx-auto max-w-2xl text-lg md:text-xl',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                Монгол зурхайн аргаар бодсон дорнын зурхай
              </p>
            </div>

            {/* Year Picker */}
            <div className='mx-auto mb-4 max-w-md'>
              <ModernDatePicker
                selectedDate={startDate}
                onDateChange={changeDate}
                mode={mode}
                placeholder='Жил сонгох'
                showYearPicker={true}
              />
            </div>
          </div>
        </section>

        {/* Lunar New Year Information */}
        <section className='layout py-4'>
          <div className='mx-auto max-w-4xl'>
            <LunarInfoCard
              title={`${selectedDateData.year} жил`}
              description='Жилийн зурхайн мэдээлэл'
              imageSrc={selectedDateData.image}
              imageAlt={`${selectedDateData.year} жил`}
              mode={mode}
              className='mb-8'
            >
              <div className='mt-6 space-y-4'>
                <div
                  className={clsx(
                    'grid grid-cols-1 gap-4 md:grid-cols-2',
                    mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  )}
                >
                  <div className='space-y-3'>
                    <div>
                      <span className='font-semibold'>Жаран: </span>
                      {selectedDateData.cycle}
                    </div>
                    <div>
                      <span className='font-semibold'>Жилийн мэнгэ: </span>
                      {selectedDateData.annualFortune}
                    </div>
                    <div>
                      <span className='font-semibold'>Шинийн нэгэн: </span>
                      {selectedDateData.lunarNewYear}
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div>
                      <span className='font-semibold'>Өдрийн өнгө: </span>
                      {selectedDateData.dayColor}
                    </div>
                    <div>
                      <span className='font-semibold'>Өдрийн мэнгэ: </span>
                      {selectedDateData.dayFortune}
                    </div>
                    <div>
                      <span className='font-semibold'>Суудал: </span>
                      {selectedDateData.seat}
                    </div>
                  </div>
                </div>

                <div
                  className={clsx(
                    'mt-6 rounded-lg border p-4',
                    mode === 'dark'
                      ? 'border-gray-700 bg-gray-800 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  )}
                >
                  <span className='font-semibold'>Битүүний сар: </span>
                  {selectedDateData.lastMonthNewMoon}
                </div>
              </div>
            </LunarInfoCard>
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
