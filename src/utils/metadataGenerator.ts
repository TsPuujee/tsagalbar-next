import { format } from 'date-fns';
import type { Metadata } from 'next';

import { SEO_CONFIG, SITE_CONFIG } from '@/constants/app';
import { 
  validateDailyDateParam, 
  validateMonthParam, 
  validateYearParam 
} from '@/utils/dateValidation';

/**
 * Base metadata generator
 * Үндсэн метадата үүсгэгч
 */
function createBaseMetadata(
  title: string,
  description: string,
  canonical: string,
  images: string[] = []
): Metadata {
  const fullUrl = `${SITE_CONFIG.url}${canonical}`;
  const allKeywords = [...SEO_CONFIG.keywords.mongolian, ...SEO_CONFIG.keywords.english];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { 
      canonical: fullUrl 
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: images.map(url => ({
        url,
        width: 800,
        height: 600,
        alt: title,
      })),
      type: 'website',
      locale: 'mn_MN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
      site: SITE_CONFIG.twitter,
    },
    robots: SEO_CONFIG.robots,
  };
}

/**
 * Metadata generator for home page
 * Үндсэн хуудасны метадата үүсгэгч
 */
export function generateHomePageMetadata(
  params: { date?: string },
  getLunarDate: (year: number, month: number, day: number) => any
): Metadata {
  const targetDate = validateDailyDateParam(params.date);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  
  let lunar;
  try {
    lunar = getLunarDate(year, month, day);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting lunar data:', error);
    // Fallback data
    lunar = {
      odor_bilgiin_toolol: 1,
      odor_animal: 'Морь',
      us_zasuulah: 'Өлзийтэй сайн',
      odor_full: 'Билгийн тооллийн өдөр',
      odor_animal_number: 5,
    };
  }

  const title = `Билгийн тооллын шинийн ${lunar.odor_bilgiin_toolol}-ний өдөр — ${lunar.odor_animal}`;
  const description = `Өнөөдрийн (${format(targetDate, 'yyyy-MM-dd')}) зөвлөмж: Үс засуулвал — ${lunar.us_zasuulah}. ${lunar.odor_full}.`;
  const image = `/images/${lunar.odor_animal_number + 1}.png`;
  const canonical = params.date ? `/?date=${year}-${month}-${day}` : '/';

  return createBaseMetadata(title, description, canonical, [image]);
}

/**
 * Metadata generator for hair cutting calendar
 * Үс засах хуанлийн метадата үүсгэгч
 */
export function generateHairCuttingCalendarMetadata(
  params: { month?: string }
): Metadata {
  const targetDate = validateMonthParam(params.month);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  
  const title = `Үс засуулах хуанли — ${year} оны ${month} сар`;
  const description = `${year} оны ${month} сарын үс засуулах сайн болон муу өдрүүдийн хуанли. Монгол зурхайн аргаар тооцоолсон.`;
  const image = '/images/good-haircut.png';
  const canonical = params.month
    ? `/hair-cutting-calendar?month=${format(targetDate, 'yyyy-MM')}`
    : '/hair-cutting-calendar';

  return createBaseMetadata(title, description, canonical, [image]);
}

/**
 * Metadata generator for Tsagaan Sar page  
 * Цагаан сарын хуудасны метадата үүсгэгч
 */
export function generateTsagaanSarMetadata(
  params: { year?: string }
): Metadata {
  const targetDate = validateYearParam(params.year);
  const year = targetDate.getFullYear();
  
  const title = `Цагаан сар ${year} — Шинэ жилийн зурхай`;
  const description = `${year} оны Цагаан сарын зурхайн мэдээлэл. Монгол уламжлалт зурхайн аргаар тооцоолсон шинэ жилийн өдөр, мэнгэ, суудлын мэдээлэл.`;
  const image = `/images/${((year - 1924) % 12) + 1}.png`;
  const canonical = params.year ? `/tsagaan-sar?year=${year}` : '/tsagaan-sar';

  return createBaseMetadata(title, description, canonical, [image]);
}

/**
 * Generic page metadata generator (for other pages)
 * Бусад хуудасны ерөнхий метадата үүсгэгч
 */
export function generatePageMetadata(
  title: string,
  description?: string,
  path = '',
  images: string[] = []
): Metadata {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} — ${SITE_CONFIG.name}`;
  const finalDescription = description || SITE_CONFIG.description;
  
  return createBaseMetadata(fullTitle, finalDescription, path, images);
}
