import clsx from 'clsx';
import * as React from 'react';

interface ModernDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  mode: 'dark' | 'light';
  className?: string;
  showYearPicker?: boolean;
  granularity?: 'day' | 'month' | 'year';
  placeholder?: string;
}

export default function ModernDatePicker({
  selectedDate,
  onDateChange,
  mode,
  className,
  showYearPicker = false,
  granularity = 'day',
}: ModernDatePickerProps) {
  const activeDate = React.useMemo(() => {
    return Number.isNaN(selectedDate?.getTime?.()) ? new Date() : selectedDate;
  }, [selectedDate]);

  const inputClasses = clsx(
    'w-full rounded-xl border-2 px-4 py-3',
    'focus:outline-none focus:ring-4 focus:ring-mongolian-500/20',
    'focus:border-mongolian-500',
    mode === 'dark'
      ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500',
    'shadow-lg'
  );

  const handleYearChange = (yearValue: string) => {
    const year = Number(yearValue);
    if (!Number.isFinite(year)) return;
    const currentMonth = activeDate.getMonth() + 1;
    const currentDay = activeDate.getDate();
    const daysInNewMonth = getDaysInMonth(year, currentMonth);
    const adjustedDay = Math.min(currentDay, daysInNewMonth);
    const updated = new Date(year, currentMonth - 1, adjustedDay);
    onDateChange(updated);
  };

  const handleMonthChange = (monthValue: string) => {
    const month = Number(monthValue);
    if (!Number.isFinite(month)) return;
    const year = activeDate.getFullYear();
    const currentDay = activeDate.getDate();
    const daysInNewMonth = getDaysInMonth(year, month);
    const adjustedDay = Math.min(currentDay, daysInNewMonth);
    const updated = new Date(year, month - 1, adjustedDay);
    onDateChange(updated);
  };

  const handleDayChange = (dayValue: string) => {
    const day = Number(dayValue);
    if (!Number.isFinite(day)) return;
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth() + 1;
    const updated = new Date(year, month - 1, day);
    onDateChange(updated);
  };

  const year = activeDate.getFullYear();
  const month = activeDate.getMonth() + 1;
  const day = activeDate.getDate();

  const daysInCurrentMonth = getDaysInMonth(year, month);

  const effectiveGranularity: 'day' | 'month' | 'year' = showYearPicker
    ? 'year'
    : granularity;

  return (
    <div className={clsx('relative', className)}>
      <div className='relative'>
        {effectiveGranularity === 'year' ? (
          <select
            aria-label='Жил сонгох'
            className={inputClasses}
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            {generateYearOptions(year).map((optYear) => (
              <option key={optYear} value={optYear}>
                {optYear}
              </option>
            ))}
          </select>
        ) : effectiveGranularity === 'month' ? (
          <div className='grid grid-cols-2 gap-2'>
            <select
              aria-label='Жил сонгох'
              className={inputClasses}
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              {generateYearOptions(year).map((optYear) => (
                <option key={optYear} value={optYear}>
                  {optYear}
                </option>
              ))}
            </select>
            <select
              aria-label='Сар сонгох'
              className={inputClasses}
              value={month}
              onChange={(e) => handleMonthChange(e.target.value)}
            >
              {generateMonthOptions().map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-2'>
            <select
              aria-label='Жил сонгох'
              className={inputClasses}
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              {generateYearOptions(year).map((optYear) => (
                <option key={optYear} value={optYear}>
                  {optYear}
                </option>
              ))}
            </select>
            <select
              aria-label='Сар сонгох'
              className={inputClasses}
              value={month}
              onChange={(e) => handleMonthChange(e.target.value)}
            >
              {generateMonthOptions().map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              aria-label='Өдөр сонгох'
              className={inputClasses}
              value={day}
              onChange={(e) => handleDayChange(e.target.value)}
            >
              {Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1).map(
                (d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {effectiveGranularity === 'year' && (
          <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2'>
            <i
              className={clsx(
                'fas fa-calendar-alt text-lg',
                mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function generateYearOptions(currentYear: number): number[] {
  const start = 1900;
  const end = Math.max(currentYear + 50, 2100);
  const years: number[] = [];
  for (let y = end; y >= start; y -= 1) {
    years.push(y);
  }
  return years;
}

function getDaysInMonth(year: number, month1Based: number): number {
  // month1Based: 1-12
  return new Date(year, month1Based, 0).getDate();
}

function generateMonthOptions(): { value: number; label: string }[] {
  return [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
  ];
}
