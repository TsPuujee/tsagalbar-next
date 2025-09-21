import clsx from 'clsx';
import { format } from 'date-fns';
import * as React from 'react';
import DatePicker from 'react-datepicker';

interface ModernDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  mode: 'dark' | 'light';
  className?: string;
  showYearPicker?: boolean;
  placeholder?: string;
}

export default function ModernDatePicker({
  selectedDate,
  onDateChange,
  mode,
  className,
  showYearPicker = false,
  placeholder = 'Өдөр сонгох',
}: ModernDatePickerProps) {
  return (
    <div className={clsx('relative', className)}>
      <div className='relative'>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => onDateChange(date as Date)}
          className={clsx(
            'w-full rounded-xl border-2 px-4 py-3',
            'focus:outline-none focus:ring-4 focus:ring-mongolian-500/20',
            'focus:border-mongolian-500',
            mode === 'dark'
              ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500',
            'shadow-lg'
          )}
          popperClassName={clsx(
            'z-50',
            mode === 'dark'
              ? 'text-white bg-gray-800 border-gray-700'
              : 'text-gray-900 bg-white border-gray-200'
          )}
          showYearPicker={showYearPicker}
          dateFormat={showYearPicker ? 'yyyy' : 'yyyy-MM-dd'}
          placeholderText={placeholder}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              className={clsx(
                'flex items-center justify-between rounded-t-lg border-b px-4 py-3',
                mode === 'dark'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-gray-50'
              )}
            >
              <span
                className={clsx(
                  'text-lg font-semibold',
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                )}
              >
                {format(date, showYearPicker ? 'yyyy он' : 'yyyy оны M сар')}
              </span>

              <div className='flex space-x-1'>
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type='button'
                  className={clsx(
                    'rounded-lg p-2',
                    'focus:outline-none focus:ring-2 focus:ring-mongolian-500',
                    prevMonthButtonDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : clsx(
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        )
                  )}
                >
                  <i className='fas fa-chevron-left' />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type='button'
                  className={clsx(
                    'rounded-lg p-2',
                    'focus:outline-none focus:ring-2 focus:ring-mongolian-500',
                    nextMonthButtonDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : clsx(
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        )
                  )}
                >
                  <i className='fas fa-chevron-right' />
                </button>
              </div>
            </div>
          )}
        />

        {/* Icon */}
        <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2'>
          <i
            className={clsx(
              'fas fa-calendar-alt text-lg',
              mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}
          />
        </div>
      </div>
    </div>
  );
}
