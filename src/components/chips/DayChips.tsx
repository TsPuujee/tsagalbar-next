import clsx from 'clsx';
import { format } from 'date-fns';
import * as React from 'react';

interface DayChipsProps {
  dates: Date[];
  color?: 'green' | 'red' | 'gray';
  className?: string;
}

export default function DayChips({
  dates,
  color = 'gray',
  className,
}: DayChipsProps) {
  const colorClasses = React.useMemo(() => {
    switch (color) {
      case 'green':
        return 'rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'red':
        return 'rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  }, [color]);

  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {dates.map((d, idx) => (
        <span key={idx} className={colorClasses}>
          {format(d, 'dd')}
        </span>
      ))}
    </div>
  );
}
