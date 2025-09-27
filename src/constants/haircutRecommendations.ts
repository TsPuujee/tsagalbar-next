/**
 * Үс засахад сайн өдрүүдийн жагсаалт
 * Good days for haircut recommendations
 */
export const GOOD_HAIRCUT_RECOMMENDATIONS: ReadonlyArray<string> = [
  'Эд мал баялаг төгөлдөр болно',
  'Бие эрхтний хүч сайжирна',
  'Эд мал арвидна',
  'Өнгө зүс сайжирна',
  'Нас уртасна',
  'Эрч хүн ихэснэ',
  'Эрхтэн хурц болно',
  'Жаргал ирнэ',
  'Эд мал арвижина',
  'Өлзийтэй сайн',
  'Сайн нөхөртэй нөхөрлөнө',
  'Идээ ундаа элбэг олдоно',
  'Эд эдлэл идээ ундаа олдоно',
  'Жаргал үргэлжид ирнэ',
  'Өлзийтэй сайн',
] as const;

/**
 * Үс засах өдрийн сайн муугийн шалгуур
 * Check if the given recommendation is good for haircut
 */
export function isGoodHaircutDay(recommendation: string): boolean {
  return GOOD_HAIRCUT_RECOMMENDATIONS.includes(recommendation);
}
