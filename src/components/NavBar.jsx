'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavBar() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-green-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 font-bold text-green-700 text-lg hover:opacity-80 transition-opacity"
      >
        <span className="text-2xl">🏥</span>
        <span>{t.appName}</span>
      </button>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-1">
          {[
            { label: t.exam, href: '/exam', icon: '📚' },
            { label: t.roleplay, href: '/roleplay', icon: '🤖' },
            { label: t.progress, href: '/progress', icon: '📊' },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
