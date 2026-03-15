'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-white font-bold mb-3">🏥 介護先生Pro</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              アジアと日本をつなぐ<br />多言語介護学習アプリ
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">学習機能</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><button onClick={() => router.push('/kiroku')} className="hover:text-white transition-colors">📝 AI介護記録アシスト</button></li>
              <li><button onClick={() => router.push('/shiken')} className="hover:text-white transition-colors">📚 国家試験対策</button></li>
              <li><button onClick={() => router.push('/roleplay')} className="hover:text-white transition-colors">🤖 AI会話ロールプレイ</button></li>
              <li><button onClick={() => router.push('/progress')} className="hover:text-white transition-colors">📊 学習進捗</button></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">サービス</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><button onClick={() => router.push('/plan')} className="hover:text-white transition-colors">💳 料金プラン</button></li>
              <li><button onClick={() => router.push('/mission')} className="hover:text-white transition-colors">🌏 理念・架け橋</button></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">法的情報</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><button onClick={() => router.push('/tokusho')} className="hover:text-white transition-colors">📜 特定商取引法</button></li>
              <li><button onClick={() => router.push('/privacy')} className="hover:text-white transition-colors">🔒 プライバシーポリシー</button></li>
              <li><button onClick={() => router.push('/terms')} className="hover:text-white transition-colors">📋 利用規約</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 アイプルーフ / 越智 宏志. All rights reserved.</p>
          <div className="flex gap-1 text-lg">
            {['🇯🇵','🇮🇩','🇻🇳','🇵🇭','🇲🇲','🇧🇩','🇳🇵','🇰🇭'].map((f, i) => (
              <span key={i}>{f}</span>
            ))}
          </div>
          <p className="text-xs text-green-400">💚 売上の2%を教育支援に還元</p>
        </div>
      </div>
    </footer>
  );
}
