import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function NotFound() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Хуудас олдсонгүй</h1>
          <Link
            href='/'
            className='mt-4 inline-flex items-center text-lg font-medium text-mongolian-600 transition-colors hover:text-mongolian-800'
          >
            ← Нүүр хуудасруу очих
          </Link>
        </div>
      </section>
    </main>
  );
}
