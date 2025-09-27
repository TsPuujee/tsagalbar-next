/**
 * Date validation utilities
 * Огноо баталгаажуулах утилити функцүүд
 */

export interface DateRange {
  min: Date;
  max: Date;
}

export interface DateValidationOptions {
  allowFuture?: boolean;
  allowPast?: boolean;
  maxYearsInFuture?: number;
  maxYearsInPast?: number;
  defaultDate?: Date;
}

/**
 * Creates a date range based on options
 * Сонголтын дагуу огнооны хүрээг үүсгэх
 */
function createDateRange(options: DateValidationOptions = {}): DateRange {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  const {
    maxYearsInFuture = 5,
    maxYearsInPast = 10,
  } = options;

  return {
    min: new Date(currentYear - maxYearsInPast, 0, 1),
    max: new Date(currentYear + maxYearsInFuture, 11, 31),
  };
}

/**
 * Validates if a date is within acceptable range
 * Огноо хүлээн зөвшөөрөгдөх хүрээнд байгаа эсэхийг шалгах
 */
function isDateInRange(date: Date, range: DateRange): boolean {
  return date >= range.min && date <= range.max;
}

/**
 * Generic date parameter validator
 * Ерөнхий огнооны параметр баталгаажуулагч
 */
export function validateDateParam(
  dateParam: string | null | undefined,
  options: DateValidationOptions = {}
): Date {
  const { defaultDate = new Date() } = options;

  if (!dateParam) {
    return defaultDate;
  }

  try {
    const date = new Date(dateParam);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return defaultDate;
    }
    
    // Check if date is in acceptable range
    const range = createDateRange(options);
    if (!isDateInRange(date, range)) {
      return defaultDate;
    }
    
    return date;
  } catch {
    return defaultDate;
  }
}

/**
 * Specialized validators for different use cases
 */

/**
 * Validates date parameter for home page (daily calendar)
 * Үндсэн хуудасны огнооны параметр баталгаажуулах
 */
export function validateDailyDateParam(dateParam?: string): Date {
  return validateDateParam(dateParam, {
    maxYearsInFuture: 2,
    maxYearsInPast: 10,
    defaultDate: new Date(),
  });
}

/**
 * Validates month parameter for hair cutting calendar
 * Үс засах хуанлийн сарын параметр баталгаажуулах
 */
export function validateMonthParam(monthParam?: string): Date {
  return validateDateParam(monthParam, {
    maxYearsInFuture: 5,
    maxYearsInPast: 10,
    defaultDate: new Date(),
  });
}

/**
 * Validates year parameter for Tsagaan Sar page
 * Цагаан сарын жилийн параметр баталгаажуулах
 */
export function validateYearParam(yearParam?: string): Date {
  const currentYear = new Date().getFullYear();
  const defaultDate = new Date(currentYear + 1, 0, 1);
  
  if (!yearParam) {
    return defaultDate;
  }

  try {
    const year = parseInt(yearParam, 10);
    
    if (isNaN(year)) {
      return defaultDate;
    }
    
    const minYear = currentYear - 50;
    const maxYear = currentYear + 10;
    
    if (year < minYear || year > maxYear) {
      return defaultDate;
    }
    
    return new Date(year, 0, 1);
  } catch {
    return defaultDate;
  }
}

/**
 * Formats date for URL parameters
 * URL параметрт зориулж огноог форматлах
 */
export function formatDateForUrl(date: Date, format: 'date' | 'month' | 'year' = 'date'): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (format) {
    case 'year':
      return year.toString();
    case 'month':
      return `${year}-${String(month).padStart(2, '0')}`;
    case 'date':
    default:
      return `${year}-${month}-${day}`;
  }
}

/**
 * Checks if two dates represent the same day
 * Хоёр огноо ижил өдрийг илэрхийлж байгаа эсэхийг шалгах
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Checks if two dates represent the same month
 * Хоёр огноо ижил сарыг илэрхийлж байгаа эсэхийг шалгах
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

/**
 * Checks if two dates represent the same year
 * Хоёр огноо ижил жилийг илэрхийлж байгаа эсэхийг шалгах
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}
