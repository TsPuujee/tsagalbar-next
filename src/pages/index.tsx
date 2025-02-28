import clsx from 'clsx';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import DatePicker from 'react-datepicker';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { getLunarDate } from '@/utils/calendarHelpers';

export default function HomePage(props: any) {
  const todayData = props?.todayData;
  const [startDate, setStartDate]: any = React.useState(
    new Date(todayData.currentDate)
  );
  const [selectedDateData, setSelectedDateData]: any =
    React.useState(todayData);
  const router = useRouter();
  React.useEffect(() => {
    const currentYear: number = parseInt(format(startDate, 'yyyy'), 10);
    const currentMonth: number = parseInt(format(startDate, 'M'), 10);
    const currentDay: number = parseInt(format(startDate, 'd'), 10);
    const currentDateData: any = getLunarDate(
      currentYear,
      currentMonth,
      currentDay
    );
    setSelectedDateData(currentDateData);
  }, [startDate]);
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');
  function changeDate(date: any) {
    setStartDate(date);
    const currentYear: number = parseInt(format(date, 'yyyy'), 10);
    const currentMonth: number = parseInt(format(date, 'M'), 10);
    const currentDay: number = parseInt(format(date, 'd'), 10);
    const todayData: any = getLunarDate(currentYear, currentMonth, currentDay);
    todayData.currentDate =
      currentYear.toString() +
      '-' +
      currentMonth.toString() +
      '-' +
      currentDay.toString();
    router.replace({
      query: { ...router.query, date: todayData.currentDate },
    });
  }
  function toggleMode() {
    return mode === 'dark' ? setMode('light') : setMode('dark');
  }
  return (
    <Layout>
      <Seo
        templateTitle={selectedDateData.odor_animal + ' өдөр'}
        siteName='Цагалбар'
        image={'/images/' + (selectedDateData.odor_animal_number + 1) + '.png'}
        description={
          'Билгийн тооллийн ' +
          selectedDateData.odor_bilgiin_toolol +
          ' ' +
          selectedDateData.odor_suudal +
          ' суудалтай ' +
          selectedDateData.odor_menge +
          ' мэнгэтэй ' +
          selectedDateData.odor_animal +
          ' өдөр'
        }
      />
      <main>
        <section className={clsx(mode === 'dark' ? 'bg-dark' : 'bg-gray-50')}>
          <nav
            className={clsx(
              'relative',
              'w-full',
              'flex flex-wrap',
              'items-center',
              'justify-between',
              'py-4',
              'hover:text-gray-700',
              'focus:text-gray-700',
              'shadow-lg',
              'navbar navbar-expand-lg navbar-light',
              mode === 'dark' ? 'bg-dark' : 'bg-gray-50'
            )}
          >
            <div
              className={clsx(
                'container-fluid flex w-full flex-wrap items-center justify-between px-6',
                mode === 'dark' ? 'bg-dark text-white' : 'bg-gray-50 text-black'
              )}
            >
              <div
                className={clsx(
                  'navbar-collapse collapse flex-grow items-center',
                  mode === 'dark'
                    ? 'bg-dark text-white'
                    : 'bg-gray-50 text-black'
                )}
                id='navbarSupportedContent'
              >
                <ul className='navbar-nav list-style-none mr-auto flex flex-col pl-0'>
                  <li className='nav-item p-2'>
                    <Link
                      className='nav-link p-0 hover:text-gray-700 focus:text-gray-700'
                      href='/tsagaan-sar'
                    >
                      Цагаан сар
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={clsx(
                  'relative flex items-center',
                  mode === 'dark'
                    ? 'bg-dark text-white'
                    : 'bg-gray-50 text-black'
                )}
              >
                <Button
                  onClick={toggleMode}
                  variant={mode === 'dark' ? 'light' : 'dark'}
                >
                  <i
                    className={
                      mode === 'dark'
                        ? 'fas fa-regular fa-sun'
                        : 'fas fa-solid fa-moon'
                    }
                  ></i>
                </Button>
              </div>
            </div>
          </nav>
          <div
            className={clsx(
              'layout min-h-screen',
              mode === 'dark' ? 'bg-dark text-white' : 'bg-gray-50 text-black'
            )}
          >
            <h1>Дорнын зурхай</h1>
            <div className='mt-8 flex flex-wrap gap-2'>
              <div className='flex items-center justify-center'>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => changeDate(date)}
                  className={clsx(
                    mode === 'dark'
                      ? 'bg-dark text-white'
                      : 'bg-gray-50 text-black'
                  )}
                  popperClassName={clsx(
                    mode === 'dark'
                      ? 'text-white bg-dark'
                      : 'text-black bg-gray-50'
                  )}
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      className={clsx(
                        'flex items-center justify-between px-2 py-2',
                        mode === 'dark'
                          ? 'bg-dark text-white'
                          : 'bg-gray-50 text-black'
                      )}
                    >
                      <span className='text-lg'>
                        {format(date, 'yyyy оны M сар')}
                      </span>

                      <div className='space-x-2'>
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          type='button'
                          className={`
                                      ${
                                        prevMonthButtonDisabled &&
                                        'cursor-not-allowed opacity-50'
                                      }
                                      inline-flex rounded border border-gray-300 p-1 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                  `}
                        >
                          <i className='fas fa-solid fa-chevron-left'></i>
                        </button>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          type='button'
                          className={`
                                      ${
                                        nextMonthButtonDisabled &&
                                        'cursor-not-allowed opacity-50'
                                      }
                                      inline-flex rounded border border-gray-300 p-1 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                  `}
                        >
                          <i className='fas fa-solid fa-chevron-right'></i>
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className='container mx-auto my-24 px-6'>
                <section className='mb-32 text-center'>
                  <div className='lg:gap-xl-12 grid gap-x-6 md:grid-cols-3 xl:grid-cols-4'>
                    <div className='mb-12'>
                      <Image
                        src={
                          '/images/' +
                          (selectedDateData.jil_animal_number + 1) +
                          '.png'
                        }
                        alt={selectedDateData.jil + ' жил'}
                        width={160}
                        height={160}
                      />
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        {selectedDateData.jaran +
                          '-р жаран ' +
                          selectedDateData.jil_cycle_name +
                          ' хэмээх ' +
                          selectedDateData.jil +
                          ' жил'}
                      </h6>
                    </div>
                    <div className='mb-12'>
                      <Image
                        src={
                          '/images/' +
                          (selectedDateData.sar_animal_number + 1) +
                          '.png'
                        }
                        alt={selectedDateData.sar_jil + ' сар'}
                        width={160}
                        height={160}
                      />
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        {selectedDateData.sar_menge +
                          ' мэнгэтэй ' +
                          selectedDateData.sar +
                          ' ' +
                          selectedDateData.sar_jil +
                          ' сар'}
                      </h6>
                    </div>
                    <div className='mb-12'>
                      <Image
                        src={
                          '/images/' +
                          (selectedDateData.odor_animal_number + 1) +
                          '.png'
                        }
                        alt={selectedDateData.odor_animal + ' өдөр'}
                        width={160}
                        height={160}
                      />
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        {'Билгийн тооллийн ' +
                          selectedDateData.odor_bilgiin_toolol +
                          ' ' +
                          selectedDateData.odor_suudal +
                          ' суудалтай ' +
                          selectedDateData.odor_menge +
                          ' мэнгэтэй ' +
                          selectedDateData.odor_animal +
                          ' өдөр'}
                      </h6>
                    </div>
                    <div className='mb-12'>
                      <Image
                        src='/images/hairCut.png'
                        alt={'Үс засуулвал: ' + selectedDateData.us_zasuulah}
                        width={160}
                        height={160}
                      />
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        {'Үс засуулвал: ' + selectedDateData.us_zasuulah}
                      </h6>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <footer>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://github.com/TsPuujee'>
                Puujee Ts
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { query } = context;
    if (query?.date) {
      const currentDateDayjs: any = dayjs(query.date);
      const currentYear: number = parseInt(currentDateDayjs.format('YYYY'), 10);
      const currentMonth: number = parseInt(currentDateDayjs.format('MM'), 10);
      const currentDay: number = parseInt(currentDateDayjs.format('DD'), 10);
      const todayData: any = getLunarDate(
        currentYear,
        currentMonth,
        currentDay
      );
      todayData.currentDate =
        currentYear.toString() +
        '-' +
        currentMonth.toString() +
        '-' +
        currentDay;
      return {
        props: {
          todayData: todayData,
        },
      };
    } else {
      const currentYear: number = parseInt(format(new Date(), 'yyyy'), 10);
      const currentMonth: number = parseInt(format(new Date(), 'M'), 10);
      const currentDay: number = parseInt(format(new Date(), 'd'), 10);
      const todayData: any = getLunarDate(
        currentYear,
        currentMonth,
        currentDay
      );
      todayData.currentDate =
        currentYear.toString() +
        '-' +
        currentMonth.toString() +
        '-' +
        currentDay;
      return {
        props: {
          todayData: todayData,
        },
      };
    }
  } catch (err: any) {
    return {
      props: {
        todayData: null,
      },
    };
  }
}
