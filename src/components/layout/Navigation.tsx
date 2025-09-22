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
  FaGlobe,
} from 'react-icons/fa';
import { useTranslations, useLocale } from 'next-intl';
interface NavigationProps {
  onToggleMode: () => void;
}

export default function Navigation({ onToggleMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();
  const languageMenuRef = React.useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '/', label: t('navigation.home'), icon: <FaYinYang /> },
    { href: '/tsagaan-sar', label: t('navigation.tsagaanSar'), icon: <FaCalendarAlt /> },
    {
      href: '/hair-cutting-calendar',
      label: t('navigation.hairCutting'),
      icon: <FaCut />,
    },
  ];

  const languages = [
    { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
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
      href === '/' ? pathname.endsWith('/') : pathname.includes(href);
    return (
      <Link
        href={`/${locale}${href}`}
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

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    window.location.href = `/${newLocale}${currentPath}`;
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
            href={`/${locale}`}
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

          {/* Theme Toggle, Language Switcher & Mobile Menu */}
          <div className='flex items-center space-x-2'>
            {/* Language Switcher */}
            <div className='relative' ref={languageMenuRef}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                )}
              >
                <FaGlobe className='text-lg' />
              </button>
              
              {isLanguageMenuOpen && (
                <div className='absolute right-0 top-12 z-50 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={clsx(
                        'flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-left transition-colors',
                        locale === lang.code
                          ? 'bg-mongolian-100 text-mongolian-900 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      <span className='text-lg'>{lang.flag}</span>
                      <span className='font-medium'>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
              
              {/* Mobile Language Switcher */}
              <div className='border-t border-gray-200 pt-2 dark:border-gray-700'>
                <div className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>
                  {t('common.language')}
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={clsx(
                        'flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors',
                        locale === lang.code
                          ? 'bg-mongolian-100 text-mongolian-900 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span className='font-medium'>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
