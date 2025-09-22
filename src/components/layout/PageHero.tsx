import clsx from 'clsx';
import * as React from 'react';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PageHero({
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: PageHeroProps) {
  return (
    <section className={clsx('relative overflow-hidden', className)}>
      <div className={clsx('layout relative pb-4 pt-12', containerClassName)}>
        <div className='mb-12 text-center'>
          <h1
            className={clsx(
              'mb-6 text-4xl font-bold md:text-5xl',
              'bg-gradient-to-r from-mongolian-600 to-mongolian-800 bg-clip-text text-transparent'
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={clsx(
                'mx-auto max-w-2xl text-lg md:text-xl',
                'text-gray-600 dark:text-gray-300'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
