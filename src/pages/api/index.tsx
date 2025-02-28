import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { getLunarDate } from '@/utils/calendarHelpers';

const allAvos = async (req: NextApiRequest, res: NextApiResponse) => {
  // Generally, you would not want this in your apps.
  // See more in 'cors.js'
  const date: any =
    dayjs(req.query.date as string) || dayjs(req.body.date) || dayjs();
  const currentYear: number = parseInt(date.format('YYYY'), 10);
  const currentMonth: number = parseInt(date.format('M'), 10);
  const currentDay: number = parseInt(date.format('D'), 10);
  const currentDateData: any = getLunarDate(
    currentYear,
    currentMonth,
    currentDay
  );
  currentDateData.sar_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.sar_animal_number || 0
  }.png`;
  currentDateData.jil_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.jil_animal_number || 0
  }.png`;
  currentDateData.odor_image = `https://tsagalbar.vercel.app/images/${
    currentDateData.odor_animal_number || 0
  }.png`;
  delete currentDateData.sar_animal_number;
  delete currentDateData.jil_animal_number;
  delete currentDateData.odor_animal_number;
  delete currentDateData.jil_full;
  delete currentDateData.sar_full;
  delete currentDateData.odor_full;
  res.status(200).json({
    data: {
      date: dayjs().format('YYYY-MM-DD'),
      data: currentDateData,
    },
    error: null,
  });
};

export default allAvos;
