import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

interface NavigationProps {
  mode: 'dark' | 'light';
  onToggleMode: () => void;
}

export default function Navigation({ mode, onToggleMode }: NavigationProps) {
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
        'sticky top-0 z-50 w-full',
        mode === 'dark'
          ? 'border-b border-gray-800 bg-gray-900/95 backdrop-blur-md'
          : 'border-b border-gray-200 bg-white/95 shadow-lg backdrop-blur-md'
      )}
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
              className={clsx(
                'hidden sm:block',
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              )}
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
                  'flex items-center space-x-2 rounded-lg px-4 py-2',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
                'flex h-10 w-10 items-center justify-center rounded-lg border-2',
                mode === 'dark'
                  ? 'border-yellow-400 bg-yellow-100 text-yellow-600'
                  : 'border-blue-400 bg-blue-100 text-blue-600'
              )}
            >
              <span className='text-xl'>{mode === 'dark' ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'rounded-lg p-2 md:hidden',
                mode === 'dark' ? 'text-white' : 'text-gray-700'
              )}
            >
              <i
                className={clsx(
                  'fas text-lg',
                  isMenuOpen ? 'fa-times' : 'fa-bars'
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={clsx(
              'border-t md:hidden',
              mode === 'dark'
                ? 'border-gray-800 bg-gray-900'
                : 'border-gray-200 bg-white'
            )}
          >
            <div className='space-y-1 px-4 py-2'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'flex items-center space-x-3 rounded-lg px-4 py-3',
                    mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
