import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h2 className='mb-4 text-6xl font-bold text-mongolian-600'>404</h2>
        <h3 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>
          Хуудас олдсонгүй
        </h3>
        <p className='mb-6 text-gray-600 dark:text-gray-400'>
          Уучлаарай, таны хайж буй хуудас олдсонгүй.
        </p>
        <Link
          href='/'
          className='inline-block rounded-lg bg-mongolian-600 px-6 py-3 text-white'
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}
