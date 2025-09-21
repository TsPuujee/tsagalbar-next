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
    <div
      className={clsx(
        'card group relative overflow-hidden',
        'hover:shadow-2xl hover:shadow-mongolian-500/10',
        'transition-all duration-500 hover:-translate-y-2',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-mongolian-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="card-body relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Image with floating animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-mongolian-400 to-mongolian-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative float">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={120}
                height={120}
                className="rounded-full transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h3 className={clsx(
            'text-lg font-bold transition-colors duration-300',
            'group-hover:text-mongolian-700 dark:group-hover:text-mongolian-400',
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          )}>
            {title}
          </h3>

          {/* Description */}
          <p className={clsx(
            'text-sm leading-relaxed transition-colors duration-300',
            'group-hover:text-mongolian-600 dark:group-hover:text-mongolian-500',
            mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            {description}
          </p>

          {/* Additional content */}
          {children && (
            <div className="w-full">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-mongolian-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-mongolian-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}