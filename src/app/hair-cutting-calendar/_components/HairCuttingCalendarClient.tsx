'use client';

import { useHairCuttingCalendar } from '@/hooks/useHairCuttingCalendar';
import useThemeToggle from '@/hooks/useThemeToggle';
import { useMonthWithUrl } from '@/hooks/useUrlState';

import Navigation from '@/components/layout/Navigation';
import PageMain from '@/components/layout/PageMain';
import SiteFooter from '@/components/layout/SiteFooter';
import Loading from '@/components/Loading';
import CalendarGridSection from '@/components/sections/CalendarGridSection';
import CalendarStatsSection from '@/components/sections/CalendarStatsSection';
import HairCuttingHeroSection from '@/components/sections/HairCuttingHeroSection';

/**
 * Hair cutting calendar page client component
 * Үс засах хуанлийн үндсэн хуудасны клиент компонент
 */
export default function HairCuttingCalendarClient() {
  // Custom hooks
  const { selectedDate: currentMonth, changeDate: setCurrentMonth } =
    useMonthWithUrl();
  const { toggleMode } = useThemeToggle();

  const {
    calendarDays,
    goodDays,
    badDays,
    todayStr,
    startDayOfWeek,
    isLoading,
  } = useHairCuttingCalendar(currentMonth);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <PageMain>
        <HairCuttingHeroSection
          selectedDate={currentMonth}
          onDateChange={setCurrentMonth}
        />

        <CalendarGridSection
          currentMonth={currentMonth}
          calendarDays={calendarDays}
          startDayOfWeek={startDayOfWeek}
          todayStr={todayStr}
        />

        <CalendarStatsSection
          currentMonth={currentMonth}
          goodDays={goodDays}
          badDays={badDays}
        />

        <SiteFooter />
      </PageMain>
    </>
  );
}
