'use client';

import clsx from 'clsx';

import { useDateWithUrl } from '@/hooks/useDateWithUrl';
import { useLunarData } from '@/hooks/useLunarData';
import useThemeToggle from '@/hooks/useThemeToggle';

import Navigation from '@/components/layout/Navigation';
import UnderlineLink from '@/components/links/UnderlineLink';
import Loading from '@/components/Loading';
import HeroSection from '@/components/sections/HeroSection';
import LunarInfoSection from '@/components/sections/LunarInfoSection';

/**
 * Main home page client component
 * Үндсэн хуудасны клиент компонент
 */
export default function HomePageClient() {
  // Custom hooks
  const { selectedDate, changeDate } = useDateWithUrl();
  const { lunarData, isLoading } = useLunarData(selectedDate);
  const { toggleMode } = useThemeToggle();

  // Loading state
  if (isLoading || !lunarData) {
    return <Loading />;
  }

  return (
    <>
      <Navigation onToggleMode={toggleMode} />

      <main
        className={clsx(
          'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
        )}
      >
        <HeroSection selectedDate={selectedDate} onDateChange={changeDate} />

        <LunarInfoSection lunarData={lunarData} />

        <footer
          className={clsx(
            'border-t py-8',
            'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
          )}
        >
          <div className='layout text-center'>
            <p className={clsx('text-gray-600 dark:text-gray-400')}>
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
