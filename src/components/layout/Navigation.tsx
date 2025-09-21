import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';

interface NavigationProps {
  mode: 'dark' | 'light';
  onToggleMode: () => void;
}

export default function Navigation({
  mode: _mode,
  onToggleMode,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { href: '/', label: 'Дорнын зурхай', icon: '🌙' },
    { href: '/tsagaan-sar', label: 'Цагаан сар', icon: '🏮' },
    {
      href: '/hair-cutting-calendar',
      label: 'Үс засах сайн өдрүүд',
      icon: '✂️',
    },
  ];

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 w-full border-b bg-white/95 shadow-lg backdrop-blur-md',
        'border-gray-200 dark:border-gray-800 dark:bg-gray-900/95'
      )}
      suppressHydrationWarning
    >
      <div className='layout'>
        <div className='flex items-center justify-between px-4 py-4'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center space-x-2 text-xl font-bold'
          >
            <span className='text-2xl'>🐉</span>
            <span
              className={clsx('hidden text-gray-900 dark:text-white sm:block')}
            >
              Цагалбар
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-1 md:flex'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center space-x-2 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300'
                )}
              >
                <span>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className='flex items-center space-x-2'>
            <button
              onClick={onToggleMode}
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                'bg-blue-100 text-blue-600 dark:bg-yellow-100 dark:text-yellow-600'
              )}
            >
              <span
                className='block text-xl dark:hidden'
                suppressHydrationWarning
              >
                <FaMoon />
              </span>
              <span
                className='hidden text-xl dark:block'
                suppressHydrationWarning
              >
                <FaSun />
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'rounded-lg p-2 text-gray-700 dark:text-white md:hidden'
              )}
            >
              {isMenuOpen ? (
                <FaTimes className='text-lg' />
              ) : (
                <FaBars className='text-lg' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={clsx(
              'border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden'
            )}
          >
            <div className='space-y-1 px-4 py-2'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300'
                  )}
                >
                  <span className='text-lg'>{item.icon}</span>
                  <span className='font-medium'>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
