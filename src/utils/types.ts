export type LunarMonth = { year: number; month: number; leap: number };

export interface MonthAttributes {
  animal: string;
  animal_number: number;
  element: string;
  colour: string;
  elcor: string;
  number: number;
  colour9: string;
}

export interface LunarDateData {
  jaran: number;
  jil: string;
  jil_cycle_name: string;
  jil_animal_number: number;
  jil_full: string;
  sar: string;
  sar_menge: string;
  sar_animal_number: number;
  sar_jil: string;
  sar_full: string;
  odor_bilgiin_toolol: number;
  odor_suudal: string;
  odor_menge: string;
  odor_animal: string;
  odor_animal_number: number;
  us_zasuulah: string;
  odor_full: string;
}

export interface LunarNewYearData {
  cycle: number;
  year: string;
  image: string;
  animalNumber: number;
  annualFortune: string;
  lunarNewYear: string;
  dayColor: string;
  dayFortune: string;
  seat: string;
  lastMonthNewMoon: string;
}

export interface HairCuttingDay {
  date: Date;
  lunarDay: number;
  recommendation: string;
  isGood: boolean;
  description: string;
}