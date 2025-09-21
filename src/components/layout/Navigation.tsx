import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

import Button from '@/components/buttons/Button';

interface NavigationProps {
  mode: 'dark' | 'light';
  onToggleMode: () => void;
}

export default function Navigation({ mode, onToggleMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { href: '/', label: 'Дорнын зурхай', icon: '🌙' },
    { href: '/tsagaan-sar', label: 'Цагаан сар', icon: '🏮' },
    { href: '/hair-cutting-calendar', label: 'Үс засах сайн өдрүүд', icon: '✂️' },
  ];

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        mode === 'dark' 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg'
      )}
    >
      <div className="layout">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold transition-colors hover:text-mongolian-600"
          >
            <span className="text-2xl">🐉</span>
            <span className={clsx(
              'hidden sm:block',
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            )}>
              Цагалбар
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                  'hover:bg-mongolian-100 dark:hover:bg-gray-800',
                  'hover:text-mongolian-700 dark:hover:text-mongolian-400',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                )}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={onToggleMode}
              variant={mode === 'dark' ? 'light' : 'dark'}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <i
                className={clsx(
                  'text-lg transition-transform duration-300',
                  mode === 'dark'
                    ? 'fas fa-sun hover:rotate-180'
                    : 'fas fa-moon hover:rotate-12'
                )}
              />
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'md:hidden p-2 rounded-lg transition-all duration-200',
                mode === 'dark' 
                  ? 'text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <i className={clsx(
                'fas text-lg transition-transform duration-300',
                isMenuOpen ? 'fa-times rotate-180' : 'fa-bars'
              )} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={clsx(
            'md:hidden border-t transition-all duration-300',
            mode === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
          )}>
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-mongolian-100 dark:hover:bg-gray-800',
                    'hover:text-mongolian-700 dark:hover:text-mongolian-400',
                    mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}