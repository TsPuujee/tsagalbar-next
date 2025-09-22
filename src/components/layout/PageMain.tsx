import clsx from 'clsx';
import * as React from 'react';

interface PageMainProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageMain({ children, className }: PageMainProps) {
  return (
    <main
      className={clsx(
        'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800',
        className
      )}
    >
      {children}
    </main>
  );
}
