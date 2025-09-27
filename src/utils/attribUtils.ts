import { ANIMAL, ANIMALIN, COLOUR, COLOUR9, CYCLENAME, ELEMENT_NAME, US_ZASUULAH } from './constants/index';
import { amod } from './dateUtils';

/**
 * Билгийн тооллын өдрийг тодорхойлох шинжүүдийг Julian Day-аас тооцоолно.
 *
 * @param jd - Julian Day Number
 * @returns Өдрийн амьтан, махбод, мэнгэ, суудал зэрэг шинжүүд
 */
export function attribDay(jd: number) {
  const ans: any = {};
  ans.animal = amod(jd + 2, 12);
  const t = amod(jd, 10);
  ans.colour = COLOUR[t - 1];
  ans.element = ELEMENT_NAME[Math.ceil(t / 2) - 1];
  ans.elcor = ans.colour;
  ans.number = amod(-jd, 9);
  ans.colour9 = COLOUR9[ans.number - 1];
  ans.trigram = amod(jd + 2, 8);
  ans.day = (jd + 1) % 7; // 0=Sunday
  return ans;
}

/**
 * Билгийн тооллын жилийн шинжүүдийг тооцоолно.
 *
 * @param Y - Жил
 * @returns Жилийн амьтан, махбод, мэнгэ, жарны нэр зэрэг шинжүүд
 */
export function attribYear(Y: number) {
  const ans: any = {};
  ans.year = amod(Y - 6, 60);
  ans.cycle = Math.ceil((Y - 1026) / 60);
  ans.animal = ANIMAL[amod(Y - 3, 12) - 1];
  ans.animal_number = amod(Y - 3, 12) - 1;
  ans.animalin = ANIMALIN[amod(Y - 3, 12) - 1];
  ans.element = ELEMENT_NAME[Math.ceil(amod(Y - 3, 10) / 2) - 1];
  ans.colour = COLOUR[amod(Y - 3, 10) - 1];
  ans.elcor = ans.colour;
  ans.number = amod(2 - Y, 9);
  ans.colour9 = COLOUR9[ans.number - 1];
  ans.cycleName = CYCLENAME[(Y - 7) % 60];
  return ans;
}

/**
 * Билгийн тооллын өдрийн үс засуулах төлөвийг буцаана.
 *
 * @param dayIndex - Билгийн тооллын өдрийн дугаар (1-30)
 * @returns Тухайн өдрийн үс засуулах зөвлөмж
 */
export function usZasuulahForDay(dayIndex: number) {
  return US_ZASUULAH[dayIndex - 1];
}
