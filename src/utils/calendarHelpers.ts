import { attribDay, attribYear, usZasuulahForDay } from './attribUtils';
import {
  ANIMAL,
  COLOUR,
  COLOUR9,
  ELEMENT_NAME,
  ELEMENT8,
  MMN,
  NUMBERN,
} from './constants';
import { amod, julianDay, leapMonth } from './dateUtils';

function getPreviousLunarMonth(year: number, month: number, isLeap: number) {
  const prevMonthData = { year, month, leap: isLeap };
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
 * Өгөгдсөн лунар сарын өмнөх сарын сард дахь 30-ны өдөр (Julian Day) дээр суурилан
 * тухайн сарын эхний өдрийн Julian Day-г олдог.
 *
 * @param year - Лунар оны жил
 * @param month - Лунар сарын дугаар
 * @param isLeap - Лунар сарын нэмэлт тэмдэг (0 эсвэл 1)
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
 * Өгөгдсөн лунар сарын 30-ны өдрийн Julian Day-г буцаана.
 *
 * @param year - Лунар оны жил
 * @param month - Лунар сарын дугаар
 * @param isLeap - Лунар сарын нэмэлт тэмдэг (0 эсвэл 1)
 * @returns Сүүлийн өдрийн Julian Day
 */
export function getLastDayJulian(year: number, month: number, isLeap: number) {
  return julianDay(year, month, isLeap, 30);
}

/**
 * Өгөгдсөн он, сар, өдрийн Gregorian огнооноос тухайн лунар сарын дугаар, жил, нэмэлт тэмдэгийг олдог.
 * Бичлэгийг 50 удаа давтан шалгасны дараа олдохгүй бол эцсийн үр дүнг буцаана.
 *
 * @param year - Gregorian оны жил
 * @param month - Gregorian сарын дугаар
 * @param day - Gregorian өдрийн дугаар
 * @returns Лунар сарын мэдээлэл объект (жил, сар, нэмэлт тэмдэг)
 */
export function getLunarMonthForDate(year: number, month: number, day: number) {
  const jd = gregorianToJulianDayNumber(year, month, day);
  let currentLunarMonth = { year, month, leap: 0 };
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
 * Gregorian огноог объект хэлбэрээр буцаадаг.
 */
export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

/**
 * Julian Day Number-ийг Gregorian огноо руу хөрвүүлдэг функц.
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
 * Өгөгдсөн Gregorian огнооноос лунар огноо (сар, өдөр) болон холбоотой шинж чанаруудыг тооцоолдог.
 *
 * @param year - Gregorian оны жил
 * @param month - Gregorian сарын дугаар
 * @param day - Gregorian өдрийн дугаар
 * @returns Лунар огноо, сарын шинж чанар, өдөр тутмын шинж чанаруудыг агуулсан объект
 */
export function getLunarDate(year: number, month: number, day: number) {
  const jd = gregorianToJulianDayNumber(year, month, day);
  const dayAttributes = attribDay(jd);
  const lunarMonth = getLunarMonthForDate(year, month, day);
  const yearAttributes = attribYear(lunarMonth.year);
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
    sar_menge: `${
      NUMBERN[getMonthAttributes(lunarMonth.year, lunarMonth.month).number - 1]
    } ${getMonthAttributes(lunarMonth.year, lunarMonth.month).colour9}`,
    sar_animal_number: getMonthAttributes(lunarMonth.year, lunarMonth.month)
      .animal_number,
    sar_jil:
      getMonthAttributes(lunarMonth.year, lunarMonth.month).elcor +
      ' ' +
      getMonthAttributes(lunarMonth.year, lunarMonth.month).animal,
    sar_full: `${MMN[lunarMonth.month - 1]}${
      lunarMonth.leap ? ' (илүү), ' : ', '
    }${
      NUMBERN[getMonthAttributes(lunarMonth.year, lunarMonth.month).number - 1]
    } ${
      getMonthAttributes(lunarMonth.year, lunarMonth.month).colour9
    } мэнгэтэй, ${
      getMonthAttributes(lunarMonth.year, lunarMonth.month).elcor
    } ${getMonthAttributes(lunarMonth.year, lunarMonth.month).animal} сар`,
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
 * Өгөгдсөн жил, сарын хувьд лунар сарын шинж чанарыг тодорхойлж, объект хэлбэрээр буцаана.
 *
 * @param year - Лунар оны жил
 * @param month - Лунар сарын дугаар
 * @returns Лунар сарын шинж чанаруудыг агуулсан объект
 */
export function getMonthAttributes(year: number, month: number) {
  const monthAttributes: any = {};
  monthAttributes.animal = ANIMAL[(month + 1) % 12];
  monthAttributes.animal_number = (month + 1) % 12;
  const t = amod(year - 2 + Math.floor((month - 1) / 2), 5);
  monthAttributes.element = ELEMENT_NAME[t - 1];
  monthAttributes.colour = COLOUR[2 * (t - 1) + ((month - 1) % 2)];
  monthAttributes.elcor = monthAttributes.colour;
  monthAttributes.number = amod(3 - 12 * year - month, 9);
  monthAttributes.colour9 = COLOUR9[monthAttributes.number - 1];
  return monthAttributes;
}
