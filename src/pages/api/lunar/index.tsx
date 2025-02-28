import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { getLunarNewYearDetails } from '@/utils/lunar';

const allAvos = async (req: NextApiRequest, res: NextApiResponse) => {
  // Generally, you would not want this in your apps.
  // See more in 'cors.js'
  const date: any =
    dayjs(req.query.year as string) || dayjs(req.body.year) || dayjs();
  const currentYear: number = parseInt(date.format('YYYY'), 10);
  const currentDateData: any = getLunarNewYearDetails(currentYear);
  currentDateData.jil_image = `https://tsagalbar.vercel.app${currentDateData.image}`;
  delete currentDateData.image;
  res.status(200).json({
    data: {
      date: date.format('YYYY'),
      data: currentDateData,
    },
    error: null,
  });
};

export default allAvos;
