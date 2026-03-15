'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LangContext';
import { LANGUAGES } from '@/locales/languages';

const STORAGE_KEY = 'kaigo_lang_selected';

export default function LangSelectPopup() {
  const { setLang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 初回訪問チェック
    const selected = localStorage.getItem(STORAGE_KEY);
    if (!selected) {
      setTimeout(() => setShow(true), 500);
    }
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    localStorage.setItem(STORAGE_KEY, code);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full animate-fade-in">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🌏</div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-1">
            言語を選んでください
          </h2>
          <p className="text-sm text-gray-500">
            Choose your language / Pilih bahasa Anda
          </p>
        </div>

        {/* 言語グリッド */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="flex items-center gap-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-400 rounded-2xl px-4 py-4 transition-all hover:scale-105 active:scale-95 text-left"
            >
              <span className="text-4xl">{lang.flag}</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">{lang.label}</p>
                <p className="text-xs text-gray-400">{lang.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* スキップ */}
        <button
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, 'ja');
            setShow(false);
          }}
          className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
        >
          スキップ（日本語で続ける）
        </button>
      </div>
    </div>
  );
}
