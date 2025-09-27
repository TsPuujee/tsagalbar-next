'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import useThemeToggle from '@/hooks/useThemeToggle';

import LunarInfoCard from '@/components/cards/LunarInfoCard';
import ModernDatePicker from '@/components/date/ModernDatePicker';
import Navigation from '@/components/layout/Navigation';
import PageHero from '@/components/layout/PageHero';
import PageMain from '@/components/layout/PageMain';
import SiteFooter from '@/components/layout/SiteFooter';
import Loading from '@/components/Loading';

import { getLunarNewYearDetails } from '@/utils/lunar';

export default function TsagaanSarClient() {
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [selectedDateData, setSelectedDateData] = React.useState<any>(null);

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

  const toggleMode = useThemeToggle();

  const changeDate = (date: Date) => {
    setStartDate(date);
    const year = date.getFullYear();
    const url = new URL(window.location.href);
    url.searchParams.set('year', year.toString());
    window.history.replaceState({}, '', url.toString());
  };

  if (!selectedDateData) {
    return <Loading />;
  }

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <PageMain>
        <PageHero
          title='Цагаан сар'
          subtitle='Монгол зурхайн аргаар бодсон дорнын зурхай'
          containerClassName='з-10'
        >
          <div className='mx-auto mb-4 max-w-md'>
            <ModernDatePicker
              selectedDate={startDate}
              onDateChange={changeDate}
              placeholder='Жил сонгох'
              showYearPicker={true}
            />
          </div>
        </PageHero>

        <section className='layout py-4'>
          <div className='mx-auto max-w-4xl'>
            <LunarInfoCard
              title={`${selectedDateData.year} жил`}
              description='Жилийн зурхайн мэдээлэл'
              imageSrc={selectedDateData.image}
              imageAlt={`${selectedDateData.year} жил`}
              className='mb-8'
            >
              <div className='mt-6 space-y-4'>
                <div
                  className={clsx(
                    'grid grid-cols-1 gap-4 md:grid-cols-2',
                    'text-gray-700 dark:text-gray-300'
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
                    'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  )}
                >
                  <span className='font-semibold'>Битүүний сар: </span>
                  {selectedDateData.lastMonthNewMoon}
                </div>
              </div>
            </LunarInfoCard>
          </div>
        </section>

        <SiteFooter />
      </PageMain>
    </>
  );
}
