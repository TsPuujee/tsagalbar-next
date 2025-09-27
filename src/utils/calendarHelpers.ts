import { attribDay, attribYear, usZasuulahForDay } from './attribUtils';
import {
  ANIMAL,
  COLOUR,
  COLOUR9,
  ELEMENT_NAME,
  ELEMENT8,
  MMN,
  NUMBERN,
} from './constants/index';
import { amod, julianDay, leapMonth } from './dateUtils';
import type { LunarMonth, MonthAttributes } from './types';

/**
 * Билгийн тооллын өмнөх сар руу шилжүүлэх туслах функц.
 *
 * @param year - Билгийн тооллын жил
 * @param month - Билгийн тооллын сар
 * @param isLeap - Илүү сар эсэх (0 эсвэл 1)
 * @returns Өмнөх сарын жил, сар, илүү эсэхийн тухай мэдээлэл
 */
function getPreviousLunarMonth(
  year: number,
  month: number,
  isLeap: number
): LunarMonth {
  const prevMonthData: LunarMonth = { year, month, leap: isLeap };
  if (leapMonth(year, month)) {
    if (isLeap) {
      // Хэрэв одоогийн сар нэмэлт бол өмнөх сар нь энгийн хувилбар болно
      prevMonthData.leap = 0;
      prevMonthData.month--;
    } else {
      // Хэрэв одоогийн сар энгийн бол өмнөх сар нь нэмэлт хувилбар байна
      prevMonthData.leap = 1;
    }
  } else {
    prevMonthData.month--;
  }
  if (prevMonthData.month <= 0) {
    prevMonthData.month = 12;
    prevMonthData.year--;
  }
  return prevMonthData;
}

/**
 * Өгөгдсөн Билгийн тооллын сарын өмнөх сарын 30-ны өдөр (Julian Day) дээр суурилан
 * тухайн сарын эхний өдрийн Julian Day-г олно.
 *
 * @param year - Билгийн тооллын жил
 * @param month - Билгийн тооллын сарын дугаар
 * @param isLeap - Билгийн тооллын илүү сар тэмдэг (0 эсвэл 1)
 * @returns Эхний өдрийн Julian Day
 */
export function getFirstDayJulian(year: number, month: number, isLeap: number) {
  const previousMonth = getPreviousLunarMonth(year, month, isLeap);
  return (
    julianDay(previousMonth.year, previousMonth.month, previousMonth.leap, 30) +
    1
  );
}

/**
 * Өгөгдсөн Билгийн тооллын сарын 30-ны өдрийн Julian Day-г буцаана.
 *
 * @param year - Билгийн тооллын жил
 * @param month - Билгийн тооллын сарын дугаар
 * @param isLeap - Билгийн тооллын илүү сар тэмдэг (0 эсвэл 1)
 * @returns Сүүлийн өдрийн Julian Day
 */
export function getLastDayJulian(year: number, month: number, isLeap: number) {
  return julianDay(year, month, isLeap, 30);
}

/**
 * Өгөгдсөн он, сар, өдрөөс Gregorian огноог ашиглан тухайн Билгийн тооллын сарын
 * дугаар, жил, илүү эсэхийг тодорхойлно. 50 удаагийн шалгалтаар олдохгүй бол
 * тухайн мөчийн хамгийн сүүлийн тооцооллыг буцаана.
 *
 * @param year - Gregorian оны жил
 * @param month - Gregorian сарын дугаар
 * @param day - Gregorian өдрийн дугаар
 * @returns Билгийн тооллын сарын мэдээлэл объект (жил, сар, илүү эсэх)
 */
export function getLunarMonthForDate(year: number, month: number, day: number) {
  const jd = gregorianToJulianDayNumber(year, month, day);
  let currentLunarMonth: LunarMonth = { year, month, leap: 0 };
  let iterationCount = 0;
  const MAX_ITERATIONS = 50;

  while (iterationCount < MAX_ITERATIONS) {
    const monthStartJD = getFirstDayJulian(
      currentLunarMonth.year,
      currentLunarMonth.month,
      currentLunarMonth.leap
    );
    const monthEndJD = getLastDayJulian(
      currentLunarMonth.year,
      currentLunarMonth.month,
      currentLunarMonth.leap
    );

    if (monthStartJD <= jd && jd <= monthEndJD) {
      return currentLunarMonth;
    }

    currentLunarMonth = getPreviousLunarMonth(
      currentLunarMonth.year,
      currentLunarMonth.month,
      currentLunarMonth.leap
    );
    iterationCount++;
  }

  // Хэрэв MAX_ITERATIONS хүрээгээр олдохгүй бол эцсийн үр дүнг буцаана.
  return currentLunarMonth;
}

/**
 * Бүхэл хэсэгт хуваагдалыг (integer division) олдог.
 *
 * @param a - Хуваагч
 * @param b - Хуваагчид хуваагдах тоо
 * @returns a / b-ийн бүхэл хэсэг
 */
export function integerDivision(a: number, b: number) {
  return Math.floor(a / b);
}

/**
 * Gregorian огноог Julian Day Number руу хөрвүүлэх функц.
 *
 * @param year - Gregorian оны жил
 * @param month - Gregorian сарын дугаар
 * @param day - Gregorian өдрийн дугаар
 * @returns Julian Day Number
 */
export function gregorianToJulianDayNumber(
  year: number,
  month: number,
  day: number
) {
  const a = integerDivision(14 - month, 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    integerDivision(153 * m + 2, 5) +
    365 * y +
    integerDivision(y, 4) -
    integerDivision(y, 100) +
    integerDivision(y, 400) -
    32045
  );
}

/**
 * Gregorian огноог объект хэлбэрээр буцаана.
 */
export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

/**
 * Julian Day Number-ийг Gregorian огноо руу хөрвүүлнэ.
 *
 * @param jd - Julian Day Number
 * @returns Gregorian огноо объект (жил, сар, өдөр)
 */
export function julianDayToGregorian(jd: number): GregorianDate {
  const gregorianDate: GregorianDate = { year: 0, month: 0, day: 0 };
  const gg = Math.floor(Math.floor((jd - 4479.5) / 36524.25) * 0.75 + 0.5) - 37;
  const n = jd + gg;
  gregorianDate.year = Math.floor(n / 365.25) - 4712;
  const dd = Math.floor((n - 59.25) % 365.25);
  gregorianDate.month = ((Math.floor((dd + 0.5) / 30.6) + 2) % 12) + 1;
  gregorianDate.day = Math.floor((dd + 0.5) % 30.6) + 1;
  return gregorianDate;
}

/**
 * Өгөгдсөн Gregorian огнооноос Билгийн тооллын огноо (сар, өдөр) болон
 * холбоотой шинж чанаруудыг тооцоолно.
 *
 * @param year - Gregorian оны жил
 * @param month - Gregorian сарын дугаар
 * @param day - Gregorian өдрийн дугаар
 * @returns Билгийн тооллын огноо, сарын шинж, өдрийн шинж чанаруудыг агуулсан объект
 */
export function getLunarDate(year: number, month: number, day: number) {
  const jd = gregorianToJulianDayNumber(year, month, day);
  const dayAttributes = attribDay(jd);
  const lunarMonth = getLunarMonthForDate(year, month, day);
  const yearAttributes = attribYear(lunarMonth.year);
  const monthAttrs = getMonthAttributes(lunarMonth.year, lunarMonth.month);
  let lunarDayNumber = 1;

  for (let i = 1; i <= 30; i++) {
    const lunarDayEndJd = julianDay(
      lunarMonth.year,
      lunarMonth.month,
      lunarMonth.leap,
      i
    );
    if (jd <= lunarDayEndJd) {
      lunarDayNumber = i;
      break;
    }
  }

  return {
    jaran: yearAttributes.cycle,
    jil: `${yearAttributes.elcor} ${yearAttributes.animalin}`,
    jil_cycle_name: yearAttributes.cycleName,
    jil_animal_number: yearAttributes.animal_number,
    jil_full: `${yearAttributes.cycle}-р жарны ${yearAttributes.cycleName} хэмээх ${yearAttributes.elcor} ${yearAttributes.animalin} жил`,
    sar: `${MMN[lunarMonth.month - 1]}${lunarMonth.leap ? ' (илүү) ' : ' '}`,
    sar_menge: `${NUMBERN[monthAttrs.number - 1]} ${monthAttrs.colour9}`,
    sar_animal_number: monthAttrs.animal_number,
    sar_jil: monthAttrs.elcor + ' ' + monthAttrs.animal,
    sar_full: `${MMN[lunarMonth.month - 1]}${
      lunarMonth.leap ? ' (илүү), ' : ', '
    }${NUMBERN[monthAttrs.number - 1]} ${monthAttrs.colour9} мэнгэтэй, ${
      monthAttrs.elcor
    } ${monthAttrs.animal} сар`,
    odor_bilgiin_toolol: lunarDayNumber,
    odor_suudal: ELEMENT8[dayAttributes.trigram - 1],
    odor_menge: `${NUMBERN[dayAttributes.number - 1]} ${dayAttributes.colour9}`,
    odor_animal: `${dayAttributes.elcor} ${ANIMAL[dayAttributes.animal - 1]}`,
    odor_animal_number: dayAttributes.animal - 1,
    us_zasuulah: usZasuulahForDay(lunarDayNumber),
    odor_full: `Билгийн тооллийн ${lunarDayNumber}, ${
      ELEMENT8[dayAttributes.trigram - 1]
    } суудалтай, ${NUMBERN[dayAttributes.number - 1]} ${
      dayAttributes.colour9
    } мэнгэтэй, ${dayAttributes.elcor} ${
      ANIMAL[dayAttributes.animal - 1]
    } өдөр`,
  };
}

/**
 * Өгөгдсөн жил, сарын хувьд Билгийн тооллын сарын шинж чанарыг тодорхойлж,
 * объект хэлбэрээр буцаана.
 *
 * @param year - Жил
 * @param month - Билгийн тооллын сарын дугаар
 * @returns Сарын шинж чанаруудыг агуулсан объект
 */
export function getMonthAttributes(
  year: number,
  month: number
): MonthAttributes {
  const animal = ANIMAL[(month + 1) % 12];
  const animal_number = (month + 1) % 12;
  const t = amod(year - 2 + Math.floor((month - 1) / 2), 5);
  const element = ELEMENT_NAME[t - 1];
  const colour = COLOUR[2 * (t - 1) + ((month - 1) % 2)];
  const elcor = colour;
  const number = amod(3 - 12 * year - month, 9);
  const colour9 = COLOUR9[number - 1];
  return { animal, animal_number, element, colour, elcor, number, colour9 };
}
