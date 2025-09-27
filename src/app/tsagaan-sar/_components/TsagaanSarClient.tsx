'use client';

import { useLunarNewYearData } from '@/hooks/useLunarNewYearData';
import useThemeToggle from '@/hooks/useThemeToggle';
import { useYearWithUrl } from '@/hooks/useYearWithUrl';

import Navigation from '@/components/layout/Navigation';
import PageMain from '@/components/layout/PageMain';
import SiteFooter from '@/components/layout/SiteFooter';
import Loading from '@/components/Loading';
import LunarNewYearSection from '@/components/sections/LunarNewYearSection';
import TsagaanSarHeroSection from '@/components/sections/TsagaanSarHeroSection';

/**
 * Main Tsagaan Sar page client component
 * Цагаан сарын үндсэн хуудасны клиент компонент
 */
export default function TsagaanSarClient() {
  // Custom hooks
  const { selectedDate, changeDate } = useYearWithUrl();
  const { lunarData, isLoading } = useLunarNewYearData(selectedDate);
  const { toggleMode } = useThemeToggle();

  // Loading state
  if (isLoading || !lunarData) {
    return <Loading />;
  }

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <PageMain>
        <TsagaanSarHeroSection
          selectedDate={selectedDate}
          onDateChange={changeDate}
        />

        <LunarNewYearSection lunarData={lunarData} />

        <SiteFooter />
      </PageMain>
    </>
  );
}
