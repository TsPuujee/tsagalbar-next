'use client';

export default function Loading() {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900'>
      <div className='pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-mongolian-500/20 blur-3xl dark:bg-mongolian-600/20'></div>
      <div className='pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/10'></div>

      <div className='relative flex flex-col items-center'>
        <div className='relative h-20 w-20'>
          <div className='absolute inset-0 animate-spin rounded-full bg-gradient-to-tr from-mongolian-500 via-indigo-500 to-fuchsia-500'></div>
          <div className='absolute inset-[6px] rounded-full bg-white dark:bg-gray-950'></div>
          <div className='absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-lg dark:bg-gray-900'></div>
        </div>

        <p className='mt-6 bg-gradient-to-r from-mongolian-600 to-indigo-600 bg-clip-text text-sm font-semibold text-transparent dark:from-mongolian-400 dark:to-indigo-400'>
          Ачааллаж байна
        </p>
        <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
          Түр хүлээнэ үү…
        </p>
        <span
          className='sr-only'
          role='status'
          aria-live='polite'
          aria-busy='true'
        >
          Loading
        </span>
      </div>
    </div>
  );
}
