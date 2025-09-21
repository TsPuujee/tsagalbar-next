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
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => onDateChange(date as Date)}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300',
            'focus:outline-none focus:ring-4 focus:ring-mongolian-500/20',
            'hover:border-mongolian-400 focus:border-mongolian-500',
            mode === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
            'shadow-lg hover:shadow-xl'
          )}
          popperClassName={clsx(
            'z-50 transition-all duration-300',
            mode === 'dark' ? 'text-white bg-gray-800 border-gray-700' : 'text-gray-900 bg-white border-gray-200'
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
                'flex items-center justify-between px-4 py-3 rounded-t-lg border-b',
                mode === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              )}
            >
              <span className={clsx(
                'text-lg font-semibold',
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                {format(date, showYearPicker ? 'yyyy он' : 'yyyy оны M сар')}
              </span>

              <div className="flex space-x-1">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={clsx(
                    'p-2 rounded-lg transition-all duration-200',
                    'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-mongolian-500',
                    prevMonthButtonDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : clsx(
                          'hover:bg-mongolian-100 dark:hover:bg-gray-700',
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        )
                  )}
                >
                  <i className="fas fa-chevron-left" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={clsx(
                    'p-2 rounded-lg transition-all duration-200',
                    'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-mongolian-500',
                    nextMonthButtonDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : clsx(
                          'hover:bg-mongolian-100 dark:hover:bg-gray-700',
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        )
                  )}
                >
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>
          )}
        />
        
        {/* Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <i className={clsx(
            'fas fa-calendar-alt text-lg',
            mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )} />
        </div>
      </div>
    </div>
  );
}