import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { chain, floor, sin } from 'mathjs';

import { attribDay, attribYear } from './attribUtils';
import { julianDayToGregorian } from './calendarHelpers';
import {
  ANIMAL,
  ELEMENT8,
  MOON_PHASE_PRECISION,
  NUMBERN,
  REFERENCE_EPOCH,
} from './constants/index';
import { julianDay } from './dateUtils';
import { imageCalculator } from './helper';

dayjs.extend(utc);

/**
 * Бутархай хэсгийг ялган авах туслах функц.
 */
const getFractionalComponent = (value: number) => value - floor(value);

/**
 * Тухайн жилийн Билгийн тооллын шинийн нэгний Julian Day-г тооцоолно.
 */
const computeNewYearJulianDay = (year: number) =>
  julianDay(year - 1, 12, 0, 30) + 1;

/**
 * Сарны үеийг тооцоолох функц (фазын тооцоо).
 */
const calculateLunarPhase = (n: number) => {
  const omega = 2.1429 - 0.0010394594 * n;
  const sunMeanLongitude = 4.895063 + 0.017202791698 * n;
  const sunMeanAnomaly = 6.24006 + 0.0172019699 * n;
  const sunTrueLongitude = chain(sunMeanLongitude)
    .add(0.03341607 * sin(sunMeanAnomaly))
    .add(0.00034894 * sin(2 * sunMeanAnomaly))
    .subtract(0.0001134)
    .subtract(0.0000203 * sin(omega))
    .done();

  const timeFactor = n / 36525.0;
  const moonMeanLongitude = 0.606433 + 1336.855225 * timeFactor;
  const moonMeanAnomaly =
    Math.PI * 2 * getFractionalComponent(0.374897 + 1325.55241 * timeFactor);
  const sunAnomalyFraction =
    Math.PI * 2 * getFractionalComponent(0.993133 + 99.997361 * timeFactor);
  const moonElongation =
    Math.PI * 2 * getFractionalComponent(0.827361 + 1236.853086 * timeFactor);
  const moonArgument =
    Math.PI * 2 * getFractionalComponent(0.259086 + 1342.227825 * timeFactor);

  const longitudeCorrection =
    22640 * sin(moonMeanAnomaly) -
    4586 * sin(moonMeanAnomaly - 2 * moonElongation) +
    2370 * sin(2 * moonElongation) +
    769 * sin(2 * moonMeanAnomaly) -
    668 * sin(sunAnomalyFraction) -
    412 * sin(2 * moonArgument) -
    212 * sin(2 * moonMeanAnomaly - 2 * moonElongation) -
    206 * sin(moonMeanAnomaly + sunAnomalyFraction - 2 * moonElongation) +
    192 * sin(moonMeanAnomaly + 2 * moonElongation) -
    165 * sin(sunAnomalyFraction - 2 * moonElongation) -
    125 * sin(moonElongation) -
    110 * sin(moonMeanAnomaly + sunAnomalyFraction) +
    148 * sin(moonMeanAnomaly - sunAnomalyFraction) -
    55 * sin(2 * moonArgument - 2 * moonElongation);

  const adjustedLongitude = moonMeanLongitude + longitudeCorrection / 1296000.0;
  return getFractionalComponent(
    adjustedLongitude - sunTrueLongitude / (Math.PI * 2)
  );
};

/**
 * Сарны үеийн утгыг -0.5..0.5 мужид хэвийн болгоно.
 */
const normalizeLunarPhase = (n: number) =>
  getFractionalComponent(calculateLunarPhase(n) + 0.5) - 0.5;

/**
 * Өгөгдсөн хүрээнд хамгийн ойрын шинэ сарыг олох хоёр талын хайлт.
 */
const findClosestNewMoon = (
  startJulian: number,
  endJulian: number,
  targetPhase: number
) => {
  let relativeStart = startJulian - REFERENCE_EPOCH.JD;
  let relativeEnd = endJulian - REFERENCE_EPOCH.JD;
  let phaseDiffStart = normalizeLunarPhase(relativeStart) - targetPhase;
  if (Math.abs(phaseDiffStart) <= MOON_PHASE_PRECISION.EPSILON)
    return relativeStart;

  let phaseDiffEnd = normalizeLunarPhase(relativeEnd) - targetPhase;
  if (Math.abs(phaseDiffEnd) <= MOON_PHASE_PRECISION.EPSILON)
    return relativeEnd;
  if (phaseDiffStart * phaseDiffEnd > 0) return -REFERENCE_EPOCH.JD - 1;

  let relativeMidpoint =
    relativeStart -
    (phaseDiffStart * (relativeEnd - relativeStart)) /
      (phaseDiffEnd - phaseDiffStart);
  let phaseDiffMid = normalizeLunarPhase(relativeMidpoint) - targetPhase;

  while (Math.abs(phaseDiffMid) > MOON_PHASE_PRECISION.EPSILON) {
    if (phaseDiffStart * phaseDiffMid > 0) {
      phaseDiffStart = phaseDiffMid;
      relativeStart = relativeMidpoint;
    } else {
      phaseDiffEnd = phaseDiffMid;
      relativeEnd = relativeMidpoint;
    }
    relativeMidpoint =
      relativeStart -
      (phaseDiffStart * (relativeEnd - relativeStart)) /
        (phaseDiffEnd - phaseDiffStart);
    if (relativeEnd - relativeStart <= MOON_PHASE_PRECISION.MIN_DELTA) break;
    phaseDiffMid = normalizeLunarPhase(relativeMidpoint) - targetPhase;
  }
  return relativeMidpoint + REFERENCE_EPOCH.JD;
};

/**
 * Тухайн жилийн Билгийн тооллын шинэ жилийн дэлгэрэнгүй мэдээлэл.
 */
export const getLunarNewYearDetails = (year: number) => {
  const newYearJulianDay = computeNewYearJulianDay(year);
  const yearInfo = attribYear(year);
  const dayInfo = attribDay(newYearJulianDay);
  const closestNewMoonJulianDay = findClosestNewMoon(
    newYearJulianDay - 3,
    newYearJulianDay + 3,
    0
  );
  const gregorianNewYear = julianDayToGregorian(newYearJulianDay);
  const closestNewMoonDateTime = dayjs.utc(
    (closestNewMoonJulianDay + 8 / 24 - 2440587.5) * 86400000
  );
  return {
    cycle: yearInfo.cycle,
    year: `${yearInfo.elcor} ${yearInfo.animal}`,
    image: imageCalculator(yearInfo.animal),
    animalNumber: yearInfo.animal_number,
    annualFortune: `${NUMBERN[yearInfo.number - 1]} ${yearInfo.colour9}`,
    lunarNewYear: dayjs
      .utc(
        `${gregorianNewYear.year}-${gregorianNewYear.month}-${gregorianNewYear.day}`
      )
      .format('YYYY/MM/DD'),
    dayColor: `${dayInfo.elcor} ${ANIMAL[dayInfo.animal - 1]}`,
    dayFortune: `${NUMBERN[dayInfo.number - 1]} ${dayInfo.colour9}`,
    seat: ELEMENT8[dayInfo.trigram - 1],
    lastMonthNewMoon: closestNewMoonDateTime.format('MM/DD HH:mm'),
  };
};
