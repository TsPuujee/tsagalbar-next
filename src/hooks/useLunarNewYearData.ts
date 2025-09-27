import { useEffect, useState } from 'react';

import { getLunarNewYearDetails } from '@/utils/lunar';
import type { LunarNewYearData } from '@/utils/types';

/**
 * Custom hook for fetching lunar new year data
 * Шинэ жилийн зурхайн мэдээлэл авах hook
 */
export function useLunarNewYearData(date: Date) {
  const [lunarData, setLunarData] = useState<LunarNewYearData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!date) return;

    setIsLoading(true);

    try {
      const year = date.getFullYear();
      const data = getLunarNewYearDetails(year);
      setLunarData(data as LunarNewYearData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error calculating lunar new year data:', error);
      setLunarData(null);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  return {
    lunarData,
    isLoading,
  };
}
