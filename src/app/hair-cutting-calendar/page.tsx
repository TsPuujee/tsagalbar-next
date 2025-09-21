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
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');

  // Initialize with current month or from URL params
  React.useEffect(() => {
    const monthParam = searchParams?.get('month');
    const initialMonth = monthParam ? new Date(monthParam) : new Date();
    setCurrentMonth(initialMonth);
  }, [searchParams]);

  React.useEffect(() => {
    generateHairCuttingCalendar(currentMonth);
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
      const isGood = recommendation.includes('сайн') || recommendation.includes('зөв');
      
      days.push({
        date: currentDate,
        lunarDay: lunarData.odor_bilgiin_toolol,
        recommendation,
        isGood,
        description: `${lunarData.odor_animal} өдөр - ${lunarData.odor_suudal} суудал`
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

  const goodDays = calendarDays.filter(day => day.isGood);
  const badDays = calendarDays.filter(day => !day.isGood);

  return (
    <>
      <Navigation mode={mode} onToggleMode={toggleMode} />
      
      <main className={clsx(
        'min-h-screen transition-colors duration-300',
        mode === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      )}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="layout relative z-10 py-16">
            <div className="text-center mb-12">
              <h1 className={clsx(
                'text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300',
                'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent'
              )}>
                ✂️ Үс засах сайн өдрүүд
              </h1>
              <p className={clsx(
                'text-lg md:text-xl max-w-3xl mx-auto transition-colors duration-300',
                mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                Монгол уламжлалт зурхайн дагуу үс засах сайн муу өдрүүдийн хуанли
              </p>
            </div>

            {/* Month Picker */}
            <div className="max-w-md mx-auto mb-16">
              <ModernDatePicker
                selectedDate={currentMonth}
                onDateChange={handleMonthChange}
                mode={mode}
                placeholder="Сар сонгох"
              />
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="layout pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <LunarInfoCard
              title={`${goodDays.length} сайн өдөр`}
              description={`${format(currentMonth, 'yyyy оны M сар')}д үс засах сайн өдрүүд`}
              imageSrc="/images/hairCut.png"
              imageAlt="Үс засах сайн өдөр"
              mode={mode}
              className="border-2 border-green-300 dark:border-green-600"
            >
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {goodDays.slice(0, 5).map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                    >
                      {format(day.date, 'dd')}
                    </span>
                  ))}
                  {goodDays.length > 5 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                      +{goodDays.length - 5} өдөр
                    </span>
                  )}
                </div>
              </div>
            </LunarInfoCard>

            <LunarInfoCard
              title={`${badDays.length} муу өдөр`}
              description={`${format(currentMonth, 'yyyy оны M сар')}д үс засах муу өдрүүд`}
              imageSrc="/images/hairCut.png"
              imageAlt="Үс засах муу өдөр"
              mode={mode}
              className="border-2 border-red-300 dark:border-red-600"
            >
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {badDays.slice(0, 5).map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium"
                    >
                      {format(day.date, 'dd')}
                    </span>
                  ))}
                  {badDays.length > 5 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                      +{badDays.length - 5} өдөр
                    </span>
                  )}
                </div>
              </div>
            </LunarInfoCard>
          </div>
        </section>

        {/* Calendar Grid */}
        <section className="layout pb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className={clsx(
              'p-6 border-b',
              mode === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
            )}>
              <h2 className={clsx(
                'text-2xl font-bold text-center',
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                {format(currentMonth, 'yyyy оны M сар')} - Үс засах хуанли
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'].map((day, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'text-center font-semibold py-2',
                      mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'relative p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer',
                      day.isGood
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30'
                    )}
                  >
                    <div className="text-center">
                      <div className={clsx(
                        'font-bold text-lg mb-1',
                        mode === 'dark' ? 'text-white' : 'text-gray-900'
                      )}>
                        {format(day.date, 'd')}
                      </div>
                      <div className={clsx(
                        'text-xs font-medium mb-1',
                        day.isGood
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                      )}>
                        {day.lunarDay} өдөр
                      </div>
                      <div className={clsx(
                        'text-xs',
                        mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      )}>
                        {day.recommendation}
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className={clsx(
                      'absolute top-1 right-1 w-3 h-3 rounded-full',
                      day.isGood ? 'bg-green-500' : 'bg-red-500'
                    )} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legend */}
        <section className="layout pb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className={clsx(
              'text-xl font-bold mb-4',
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            )}>
              Тайлбар
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className={clsx(mode === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                  Сайн өдөр - үс засах зөв
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className={clsx(mode === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                  Муу өдөр - үс засах зөв биш
                </span>
              </div>
            </div>
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