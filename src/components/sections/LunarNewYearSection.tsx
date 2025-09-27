'use client';

import clsx from 'clsx';
import { memo } from 'react';

import LunarInfoCard from '@/components/cards/LunarInfoCard';

import type { LunarNewYearData } from '@/utils/types';

interface LunarNewYearSectionProps {
  lunarData: LunarNewYearData;
}

/**
 * Section component for displaying lunar new year information
 * Шинэ жилийн зурхайн мэдээллийг харуулах хэсэг
 */
function LunarNewYearSection({ lunarData }: LunarNewYearSectionProps) {
  return (
    <section className='layout py-4'>
      <div className='mx-auto max-w-4xl'>
        <LunarInfoCard
          title={`${lunarData.year} жил`}
          description='Жилийн зурхайн мэдээлэл'
          imageSrc={lunarData.image}
          imageAlt={`${lunarData.year} жил`}
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
                  {lunarData.cycle}
                </div>
                <div>
                  <span className='font-semibold'>Жилийн мэнгэ: </span>
                  {lunarData.annualFortune}
                </div>
                <div>
                  <span className='font-semibold'>Шинийн нэгэн: </span>
                  {lunarData.lunarNewYear}
                </div>
              </div>
              <div className='space-y-3'>
                <div>
                  <span className='font-semibold'>Өдрийн өнгө: </span>
                  {lunarData.dayColor}
                </div>
                <div>
                  <span className='font-semibold'>Өдрийн мэнгэ: </span>
                  {lunarData.dayFortune}
                </div>
                <div>
                  <span className='font-semibold'>Суудал: </span>
                  {lunarData.seat}
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
              {lunarData.lastMonthNewMoon}
            </div>
          </div>
        </LunarInfoCard>
      </div>
    </section>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(LunarNewYearSection);
