'use client';

import clsx from 'clsx';
import { memo } from 'react';

import LunarInfoCard from '@/components/cards/LunarInfoCard';

import { isGoodHaircutDay } from '@/constants/haircutRecommendations';
import type { LunarDateData } from '@/utils/types';

interface LunarInfoSectionProps {
  lunarData: LunarDateData;
}

/**
 * Section component for displaying lunar calendar information cards
 * Сарны зурхайн мэдээллийг харуулах хэсэг
 */
function LunarInfoSection({ lunarData }: LunarInfoSectionProps) {
  const isGoodDay = isGoodHaircutDay(lunarData.us_zasuulah);

  return (
    <section className='layout pb-16'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
        {/* Year Information */}
        <LunarInfoCard
          title={`${lunarData.jaran}-р жаран ${lunarData.jil_cycle_name} хэмээх ${lunarData.jil} жил`}
          description='Жилийн зурхайн мэдээлэл'
          imageSrc={`/images/${lunarData.jil_animal_number + 1}.png`}
          imageAlt={`${lunarData.jil} жил`}
        />

        {/* Month Information */}
        <LunarInfoCard
          title={`${lunarData.sar_menge} мэнгэтэй ${lunarData.sar} ${lunarData.sar_jil} сар`}
          description='Сарын зурхайн мэдээлэл'
          imageSrc={`/images/${lunarData.sar_animal_number + 1}.png`}
          imageAlt={`${lunarData.sar_jil} сар`}
        />

        {/* Day Information */}
        <LunarInfoCard
          title={`Билгийн тооллийн ${lunarData.odor_bilgiin_toolol} ${lunarData.odor_suudal} суудалтай ${lunarData.odor_menge} мэнгэтэй ${lunarData.odor_animal} өдөр`}
          description='Өдрийн зурхайн мэдээлэл'
          imageSrc={`/images/${lunarData.odor_animal_number + 1}.png`}
          imageAlt={`${lunarData.odor_animal} өдөр`}
        />

        {/* Haircut Recommendation */}
        <LunarInfoCard
          title={`Үс засуулвал: ${lunarData.us_zasuulah}`}
          description='Үс засах сайн өдрийн мэдээлэл'
          imageSrc={
            isGoodDay ? '/images/good-haircut.png' : '/images/bad-haircut.png'
          }
          imageAlt={isGoodDay ? 'Сайн өдөр' : 'Муу өдөр'}
          className={clsx(
            'border-2',
            isGoodDay
              ? 'border-green-300 dark:border-green-600'
              : 'border-red-300 dark:border-red-600'
          )}
        />
      </div>
    </section>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(LunarInfoSection);
