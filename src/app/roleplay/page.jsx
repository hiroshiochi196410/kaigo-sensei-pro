'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

export default function RoleplayPage() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-blue-600 hover:underline text-sm">
          ← {t.backToTop}
        </button>
        <h1 className="text-3xl font-bold text-blue-700 mb-2">🤖 {t.roleplay}</h1>
        <p className="text-gray-500 mb-8">{t.roleplayDesc}</p>

        {/* ここに roleplay の実装を追加してください */}
        <div className="bg-white rounded-2xl border border-blue-100 p-8 text-center text-gray-400 shadow-sm">
          <p className="text-4xl mb-4">🚧</p>
          <p>AI会話ロールプレイをここに実装してください</p>
        </div>
      </main>
    </div>
  );
}
