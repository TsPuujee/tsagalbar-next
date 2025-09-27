'use client';

import clsx from 'clsx';
import { memo } from 'react';

import ModernDatePicker from '@/components/date/ModernDatePicker';

interface HeroSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

/**
 * Hero section component with title and date picker
 * Гарчиг болон огноо сонгох хэсэг
 */
function HeroSection({ selectedDate, onDateChange }: HeroSectionProps) {
  return (
    <section className='relative overflow-hidden'>
      <div className='layout relative z-10 py-16'>
        {/* Title Section */}
        <div className='mb-4 text-center'>
          <h1
            className={clsx(
              'mb-6 text-4xl font-bold md:text-5xl',
              'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent'
            )}
          >
            Дорнын зурхай
          </h1>
          <p
            className={clsx(
              'mx-auto max-w-2xl text-lg md:text-xl',
              'text-gray-600 dark:text-gray-300'
            )}
          >
            Монгол зурхайн аргаар бодсон дорнын зурхай
          </p>
        </div>

        {/* Date Picker */}
        <div className='mx-auto mb-4 max-w-md'>
          <ModernDatePicker
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            placeholder='Өдөр сонгох'
          />
        </div>
      </div>
    </section>
  );
}

// Memoize component to prevent unnecessary re-renders when props haven't changed
export default memo(HeroSection);
