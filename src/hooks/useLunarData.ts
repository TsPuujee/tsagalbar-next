import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { getLunarDate } from '@/utils/calendarHelpers';
import type { LunarDateData } from '@/utils/types';

/**
 * Custom hook for fetching lunar calendar data
 * Сарны зурхайн мэдээлэл авах hook
 */
export function useLunarData(date: Date) {
  const [lunarData, setLunarData] = useState<LunarDateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!date) return;

    setIsLoading(true);

    try {
      const year = parseInt(format(date, 'yyyy'), 10);
      const month = parseInt(format(date, 'M'), 10);
      const day = parseInt(format(date, 'd'), 10);
      
      const data = getLunarDate(year, month, day);
      setLunarData(data as LunarDateData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error calculating lunar data:', error);
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
