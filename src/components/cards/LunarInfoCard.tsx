import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

interface LunarInfoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  mode: 'dark' | 'light';
  className?: string;
  children?: React.ReactNode;
}

export default function LunarInfoCard({
  title,
  description,
  imageSrc,
  imageAlt,
  mode,
  className,
  children,
}: LunarInfoCardProps) {
  return (
    <div className={clsx('card group relative overflow-hidden', className)}>
      {/* Content */}
      <div className='card-body relative z-10'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          {/* Image */}
          <div className='relative'>
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-mongolian-400 to-mongolian-600 opacity-30 blur-lg' />
            <div className='relative'>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={120}
                height={120}
                className='rounded-full'
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h3
            className={clsx(
              'text-lg font-bold',
              mode === 'dark' ? 'text-gray-900' : 'text-gray-900'
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={clsx(
              'text-sm leading-relaxed',
              mode === 'dark' ? 'text-gray-600' : 'text-gray-600'
            )}
          >
            {description}
          </p>

          {/* Additional content */}
          {children && <div className='w-full'>{children}</div>}
        </div>
      </div>
    </div>
  );
}
