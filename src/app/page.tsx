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

export default function HomePage() {
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [selectedDateData, setSelectedDateData] = React.useState<any>(null);
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');

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
      const currentDateData = getLunarDate(currentYear, currentMonth, currentDay);
      setSelectedDateData(currentDateData);
    }
  }, [startDate]);

  const changeDate = (date: Date) => {
    setStartDate(date);
    // Update URL without page reload
    const dateString = format(date, 'yyyy-M-d');
    const url = new URL(window.location.href);
    url.searchParams.set('date', dateString);
    window.history.replaceState({}, '', url.toString());
  };

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  if (!selectedDateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mongolian-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation mode={mode} onToggleMode={toggleMode} />
      
      <main className={clsx(
        'min-h-screen transition-colors duration-300',
        mode === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      )}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="layout relative z-10 py-16">
            <div className="text-center mb-12">
              <h1 className={clsx(
                'text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300',
                'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent',
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                Дорнын зурхай
              </h1>
              <p className={clsx(
                'text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-300',
                mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                Монгол уламжлалт тооллын дагуу өдрийн сайн муугийг мэдэж авцгаая
              </p>
            </div>

            {/* Date Picker */}
            <div className="max-w-md mx-auto mb-16">
              <ModernDatePicker
                selectedDate={startDate}
                onDateChange={changeDate}
                mode={mode}
                placeholder="Өдөр сонгох"
              />
            </div>
          </div>
        </section>

        {/* Lunar Information Cards */}
        <section className="layout pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Year Card */}
            <LunarInfoCard
              title={`${selectedDateData.jaran}-р жаран ${selectedDateData.jil_cycle_name} хэмээх ${selectedDateData.jil} жил`}
              description="Жилийн зурхайн мэдээлэл"
              imageSrc={`/images/${selectedDateData.jil_animal_number + 1}.png`}
              imageAlt={`${selectedDateData.jil} жил`}
              mode={mode}
            />

            {/* Month Card */}
            <LunarInfoCard
              title={`${selectedDateData.sar_menge} мэнгэтэй ${selectedDateData.sar} ${selectedDateData.sar_jil} сар`}
              description="Сарын зурхайн мэдээлэл"
              imageSrc={`/images/${selectedDateData.sar_animal_number + 1}.png`}
              imageAlt={`${selectedDateData.sar_jil} сар`}
              mode={mode}
            />

            {/* Day Card */}
            <LunarInfoCard
              title={`Билгийн тооллийн ${selectedDateData.odor_bilgiin_toolol} ${selectedDateData.odor_suudal} суудалтай ${selectedDateData.odor_menge} мэнгэтэй ${selectedDateData.odor_animal} өдөр`}
              description="Өдрийн зурхайн мэдээлэл"
              imageSrc={`/images/${selectedDateData.odor_animal_number + 1}.png`}
              imageAlt={`${selectedDateData.odor_animal} өдөр`}
              mode={mode}
              className="pulse-glow"
            />

            {/* Hair Cutting Card */}
            <LunarInfoCard
              title={`Үс засуулвал: ${selectedDateData.us_zasuulah}`}
              description="Үс засах сайн өдрийн мэдээлэл"
              imageSrc="/images/hairCut.png"
              imageAlt="Үс засах сайн өдөр"
              mode={mode}
              className="border-2 border-mongolian-300 dark:border-mongolian-600"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className={clsx(
          'border-t py-8 transition-colors duration-300',
          mode === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
        )}>
          <div className="layout text-center">
            <p className={clsx(
              'transition-colors duration-300',
              mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://github.com/TsPuujee' className="hover:text-mongolian-600">
                Puujee Ts
              </UnderlineLink>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}