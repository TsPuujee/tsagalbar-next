import { format } from 'date-fns';
import { useCallback,useEffect, useMemo, useState } from 'react';

import { isGoodHaircutDay } from '@/constants/haircutRecommendations';
import { getLunarDate } from '@/utils/calendarHelpers';
import type { HairCuttingDay } from '@/utils/types';

/**
 * Custom hook for managing hair cutting calendar data
 * Үс засах хуанлийн мэдээлэл удирдах hook
 */
export function useHairCuttingCalendar(currentMonth: Date) {
  const [calendarDays, setCalendarDays] = useState<HairCuttingDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateHairCuttingCalendar = useCallback((month: Date) => {
    setIsLoading(true);
    
    try {
      const year = month.getFullYear();
      const monthNum = month.getMonth() + 1;
      const daysInMonth = new Date(year, monthNum, 0).getDate();
      const days: HairCuttingDay[] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, monthNum - 1, day);
        const lunarData = getLunarDate(year, monthNum, day);

        const recommendation = lunarData.us_zasuulah;
        const isGood = isGoodHaircutDay(recommendation);

        days.push({
          date: currentDate,
          lunarDay: lunarData.odor_bilgiin_toolol,
          recommendation,
          isGood,
          description: `${lunarData.odor_animal} өдөр - ${lunarData.odor_suudal} суудал`,
        });
      }

      setCalendarDays(days);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error generating hair cutting calendar:', error);
      setCalendarDays([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    generateHairCuttingCalendar(currentMonth);
  }, [currentMonth, generateHairCuttingCalendar]);

  // Memoized computed values
  const goodDays = useMemo(() => calendarDays.filter((day) => day.isGood), [calendarDays]);
  const badDays = useMemo(() => calendarDays.filter((day) => !day.isGood), [calendarDays]);
  
  const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  
  const startDayOfWeek = useMemo(() => {
    const dow = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    return (dow + 6) % 7;
  }, [currentMonth]);

  return {
    calendarDays,
    goodDays,
    badDays,
    todayStr,
    startDayOfWeek,
    isLoading,
    refreshCalendar: () => generateHairCuttingCalendar(currentMonth),
  };
}
