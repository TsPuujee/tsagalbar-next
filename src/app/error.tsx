'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
          Алдаа гарлаа!
        </h2>
        <p className='mb-6 text-gray-600 dark:text-gray-400'>
          Уучлаарай, алдаа гарлаа. Дахин оролдоно уу.
        </p>
        <button
          onClick={() => reset()}
          className='rounded-lg bg-mongolian-600 px-4 py-2 text-white transition-colors hover:bg-mongolian-700'
        >
          Дахин оролдох
        </button>
      </div>
    </div>
  );
}
