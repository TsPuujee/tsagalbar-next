import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import DatePicker from 'react-datepicker';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { getLunarNewYearDetails } from '@/utils/lunar';

export default function HomePage(props: any) {
  const todayData = props?.todayData;
  const [startDate, setStartDate]: any = React.useState(
    new Date(todayData.currentDate)
  );
  const [selectedDateData, setSelectedDateData]: any =
    React.useState(todayData);
  React.useEffect(() => {
    const currentDate: number = parseInt(format(startDate, 'yyyy'), 10);
    const currentDateData: any = getLunarNewYearDetails(currentDate);
    setSelectedDateData(currentDateData);
  }, [startDate]);
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');
  function toggleMode() {
    return mode === 'dark' ? setMode('light') : setMode('dark');
  }
  return (
    <Layout>
      <Seo
        templateTitle={'Шинийн нэгэн:' + selectedDateData['lunarNewYear']}
        siteName='Цагаан сар'
        image={selectedDateData.image}
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
                      href='/'
                    >
                      Дорнын зурхай
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
            <h1>Цагаан сар</h1>
            <div className='mt-8 flex flex-wrap gap-2'>
              <div className='flex items-center justify-center'>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
                  showYearPicker
                  dateFormat='yyyy'
                />
              </div>
              <div className='container mx-auto my-24 px-6'>
                <section className='mb-32 text-center'>
                  <div className='lg:gap-xl-12 grid gap-x-6 md:grid-cols-3 xl:grid-cols-4'>
                    <div className='mb-12'>
                      <Image
                        src={selectedDateData.image}
                        alt={selectedDateData.year + ' жил'}
                        width={160}
                        height={160}
                      />
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Жил: {selectedDateData.year}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Жаран: {selectedDateData.cycle}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Жилийн мэнгэ: {selectedDateData['annualFortune']}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Шинийн нэгэн: {selectedDateData['lunarNewYear']}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Өдрийн өнгө: {selectedDateData['dayColor']}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Өдрийн мэнгэ: {selectedDateData['dayFortune']}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Суудал: {selectedDateData['seat']}
                      </h6>
                      <h6 className='text-600 mb-2 mt-0 text-base font-medium leading-tight'>
                        Битүүний сар: {selectedDateData['lastMonthNewMoon']}
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

export async function getServerSideProps() {
  try {
    const currentDate: number = parseInt(format(new Date(), 'yyyy'), 10);
    const todayData: any = getLunarNewYearDetails(currentDate);
    todayData.currentDate = currentDate.toString() + '-01-01';
    return {
      props: {
        todayData: todayData,
      },
    };
  } catch (err: any) {
    return {
      props: {
        todayData: null,
      },
    };
  }
}
