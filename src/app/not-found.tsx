import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-mongolian-600 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Хуудас олдсонгүй
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Уучлаарай, таны хайж буй хуудас олдсонгүй.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-mongolian-600 text-white rounded-lg hover:bg-mongolian-700 transition-colors"
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}