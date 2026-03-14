'use client';

import { createContext, useContext, useState } from 'react';
import { UI_TEXT, LANGUAGES } from '@/locales/languages';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ja');

  const t = UI_TEXT[lang] || UI_TEXT['ja'];
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <LangContext.Provider value={{ lang, setLang, t, currentLang, LANGUAGES }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
