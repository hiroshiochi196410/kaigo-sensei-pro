'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

export default function ProgressPage() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-purple-600 hover:underline text-sm">
          ← {t.backToTop}
        </button>
        <h1 className="text-3xl font-bold text-purple-700 mb-2">📊 {t.progress}</h1>
        <p className="text-gray-500 mb-8">{t.progressDesc}</p>

        {/* ここに progress の実装を追加してください */}
        <div className="bg-white rounded-2xl border border-purple-100 p-8 text-center text-gray-400 shadow-sm">
          <p className="text-4xl mb-4">🚧</p>
          <p>学習進捗ダッシュボードをここに実装してください</p>
        </div>
      </main>
    </div>
  );
}
