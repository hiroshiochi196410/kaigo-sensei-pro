'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';

export default function LanguageSwitcher() {
  const { lang, setLang, t, currentLang, LANGUAGES } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 transition-colors shadow-sm"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <span className="text-gray-400">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <p className="text-xs text-gray-400 px-4 pt-3 pb-1">{t.selectLanguage}</p>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-green-50 transition-colors
                ${lang === l.code ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-700'}`}
            >
              <span className="text-xl">{l.flag}</span>
              <div className="text-left">
                <div>{l.label}</div>
                <div className="text-xs text-gray-400">{l.name}</div>
              </div>
              {lang === l.code && <span className="ml-auto text-green-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
