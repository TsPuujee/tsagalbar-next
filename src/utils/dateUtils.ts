import { ceil, floor, mod } from 'mathjs';

import { BETA, BETASTAR, CNST, EPOCH, IXX, MZERO } from './constants/index';

/**
 * Үлдэгдэлтэй адил боловч 0 тохиолдолд b-ыг буцаадаг агуулгатай мод функц.
 */
export const amod = (a: number, b: number): number => mod(a, b) || b;

/**
 * Тухайн жил, сард Билгийн тооллын илүү сар тохиолдож байгаа эсэхийг тодорхойлно.
 */
export const leapMonth = (Y: number, M: number): boolean => {
  return mod(24 * (Y - EPOCH) + 2 * M - BETA, 65) <= 1;
};

/**
 * Сар тооцооллын туслах индекс.
 */
export const Mstar = (Y: number, M: number): number => 12 * (Y - EPOCH) + M - MZERO;

/**
 * Билгийн тооллын жинхэнэ сарын индексийг тооцоолно.
 */
export const trueMonth = (Y: number, M: number, L: number) => {
  const ix = mod(67 * Mstar(Y, M) + BETASTAR, 65);
  return L || ix < IXX
    ? floor((67 * Mstar(Y, M) + BETASTAR) / 65)
    : ceil((67 * Mstar(Y, M) + BETASTAR) / 65);
};

/**
 * Сар, нарны хөдөлгөөний тэгшитгэлүүдийг ашиглан өдрийн жинхэнэ утгыг олно.
 */
export const trueDate = (d: number, n: number) => {
  const meanDate = n * CNST.m1 + d * CNST.m2 + CNST.m0;
  const meanSun = n * CNST.s1 + d * CNST.s2 + CNST.s0;
  const anomalyMoon = n * CNST.a1 + d * CNST.a2 + CNST.a0;
  const moonEqu = moonTab(28 * anomalyMoon);
  const anomalySun = meanSun - 0.25;
  const sunEqu = sunTab(12 * anomalySun);
  return meanDate + moonEqu / 60 - sunEqu / 60;
};

/**
 * Сарын тэгшитгэлийн хүснэгт.
 */
function moonTab(i: number): number {
  i = i % 28;
  if (i < 0) i += 28;
  let s = 1;
  if (i >= 14) {
    i -= 14;
    s = -1;
  }
  if (i > 7) i = 14 - i;
  const a = Math.floor(i);
  const b = Math.ceil(i);
  const v = [0, 5, 10, 15, 19, 22, 24, 25];
  return a === b ? s * v[a] : (s * ((b - i) * v[a] + (i - a) * v[b])) / (b - a);
}

/**
 * Нарны тэгшитгэлийн хүснэгт.
 */
function sunTab(i: number): number {
  i = i % 12;
  if (i < 0) i += 12;
  let s = 1;
  if (i >= 6) {
    i -= 6;
    s = -1;
  }
  if (i > 3) i = 6 - i;
  const a = Math.floor(i);
  const b = Math.ceil(i);
  const v = [0, 6, 10, 11];
  return a === b ? s * v[a] : (s * ((b - i) * v[a] + (i - a) * v[b])) / (b - a);
}

/**
 * Билгийн тооллын жил/сар/илүү эсэх/өдөр-өөс Julian Day-г тооцоолно.
 */
export const julianDay = (
  Y: number,
  M: number,
  L: number,
  day: number
): number => {
  return floor(trueDate(day, trueMonth(Y, M, L)));
};
