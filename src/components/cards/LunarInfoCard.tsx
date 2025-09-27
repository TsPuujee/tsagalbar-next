'use client';
import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

interface LunarInfoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  children?: React.ReactNode;
}

export default function LunarInfoCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className,
  children,
}: LunarInfoCardProps) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const prev = React.useRef<{
    title: string;
    description: string;
    imageSrc: string;
  } | null>(null);

  React.useEffect(() => {
    const hasPrev = prev.current !== null;
    const changed =
      !hasPrev ||
      prev.current?.title !== title ||
      prev.current?.description !== description ||
      prev.current?.imageSrc !== imageSrc;

    if (changed) {
      setIsAnimating(true);
      const t = setTimeout(() => setIsAnimating(false), 480);
      prev.current = { title, description, imageSrc };
      return () => clearTimeout(t);
    }
  }, [title, description, imageSrc]);

  return (
    <div className={clsx('card group relative overflow-hidden', className)}>
      {/* Content */}
      <div
        className={clsx(
          'card-body relative z-10',
          isAnimating && 'animate-content-change'
        )}
      >
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
              'text-gray-900 dark:text-white'
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={clsx(
              'text-sm leading-relaxed',
              'text-gray-600 dark:text-gray-300'
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
