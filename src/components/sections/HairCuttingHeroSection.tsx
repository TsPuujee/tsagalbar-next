'use client';

import { memo } from 'react';

import ModernDatePicker from '@/components/date/ModernDatePicker';
import PageHero from '@/components/layout/PageHero';

interface HairCuttingHeroSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

/**
 * Hair cutting calendar hero section with month picker
 * Үс засах хуанлийн гарчиг хэсэг
 */
function HairCuttingHeroSection({
  selectedDate,
  onDateChange,
}: HairCuttingHeroSectionProps) {
  return (
    <PageHero
      title='Үс засуулах хуанли'
      subtitle='Монгол уламжлалт зурхайн дагуу үс засах сайн муу өдрүүдийн хуанли'
    >
      <div className='mx-auto mb-4 max-w-md'>
        <ModernDatePicker
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          granularity='month'
        />
      </div>
    </PageHero>
  );
}

export default memo(HairCuttingHeroSection);
