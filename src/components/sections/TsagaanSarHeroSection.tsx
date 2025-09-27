'use client';

import { memo } from 'react';

import ModernDatePicker from '@/components/date/ModernDatePicker';
import PageHero from '@/components/layout/PageHero';

interface TsagaanSarHeroSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

/**
 * Hero section component for Tsagaan Sar page with year picker
 * Цагаан сарын хуудасны гарчиг хэсэг
 */
function TsagaanSarHeroSection({
  selectedDate,
  onDateChange,
}: TsagaanSarHeroSectionProps) {
  return (
    <PageHero
      title='Цагаан сар'
      subtitle='Монгол зурхайн аргаар бодсон дорнын зурхай'
      containerClassName='з-10'
    >
      <div className='mx-auto mb-4 max-w-md'>
        <ModernDatePicker
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          placeholder='Жил сонгох'
          showYearPicker={true}
        />
      </div>
    </PageHero>
  );
}

// Memoize component to prevent unnecessary re-renders when props haven't changed
export default memo(TsagaanSarHeroSection);
