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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Алдаа гарлаа!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Уучлаарай, алдаа гарлаа. Дахин оролдоно уу.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-mongolian-600 text-white rounded-lg hover:bg-mongolian-700 transition-colors"
        >
          Дахин оролдох
        </button>
      </div>
    </div>
  );
}