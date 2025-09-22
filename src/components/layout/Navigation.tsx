'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import {
  FaBars,
  FaCalendarAlt,
  FaCut,
  FaMoon,
  FaSun,
  FaTimes,
  FaYinYang,
} from 'react-icons/fa';
interface NavigationProps {
  onToggleMode: () => void;
}

export default function Navigation({ onToggleMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Дорнын зурхай', icon: <FaYinYang /> },
    { href: '/tsagaan-sar', label: 'Цагаан сар', icon: <FaCalendarAlt /> },
    {
      href: '/hair-cutting-calendar',
      label: 'Үс засуулах хуанли',
      icon: <FaCut />,
    },
  ];

  const LinkItem = ({
    href,
    label,
    icon,
    onClick,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }) => {
    const isActive =
      href === '/' ? pathname === '/' : pathname.startsWith(href);
    return (
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick}
        className={clsx(
          'flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors',
          isActive
            ? 'border border-mongolian-300 bg-mongolian-100 text-mongolian-900 shadow-sm dark:bg-gray-800 dark:text-white'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        )}
      >
        <span>{icon}</span>
        <span className='font-semibold'>{label}</span>
      </Link>
    );
  };

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
            <Image
              src='/favicon/favicon.svg'
              alt='Цагалбар'
              width={64}
              height={64}
            />
            <span
              className={clsx('hidden text-gray-900 dark:text-white sm:block')}
            >
              Цагалбар
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-1 md:flex'>
            {navItems.map((item) => (
              <LinkItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
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
                <LinkItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
