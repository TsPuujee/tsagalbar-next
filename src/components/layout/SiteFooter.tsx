import clsx from 'clsx';
import * as React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={clsx(
        'border-t py-8',
        'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      <div className='layout text-center'>
        <p className={clsx('text-gray-600 dark:text-gray-400')}>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://github.com/TsPuujee'>
            Puujee Ts
          </UnderlineLink>
        </p>
      </div>
    </footer>
  );
}
