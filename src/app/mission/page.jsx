'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const COUNTRIES = [
  { flag: '🇯🇵', name: '日本', role: '受け入れ国', color: 'bg-red-50 border-red-200' },
  { flag: '🇮🇩', name: 'インドネシア', role: 'Indonesia', color: 'bg-green-50 border-green-200' },
  { flag: '🇻🇳', name: 'ベトナム', role: 'Việt Nam', color: 'bg-red-50 border-red-200' },
  { flag: '🇵🇭', name: 'フィリピン', role: 'Philippines', color: 'bg-blue-50 border-blue-200' },
  { flag: '🇲🇲', name: 'ミャンマー', role: 'Myanmar', color: 'bg-yellow-50 border-yellow-200' },
  { flag: '🇧🇩', name: 'バングラデシュ', role: 'Bangladesh', color: 'bg-green-50 border-green-200' },
  { flag: '🇳🇵', name: 'ネパール', role: 'Nepal', color: 'bg-red-50 border-red-200' },
  { flag: '🇰🇭', name: 'カンボジア', role: 'Cambodia', color: 'bg-blue-50 border-blue-200' },
];

export default function MissionPage() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← {t.backToTop}
        </button>

        {/* ヒーロー */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌏</div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            夢の架け橋
          </h1>
          <p className="text-xl text-gray-500 mb-2">アジアと日本をつなぐ</p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            言葉の壁を越えて、アジアの若者が日本で夢を叶える。
            そしてその経験が、故郷の次世代へとつながっていく。
          </p>
        </div>

        {/* 架け橋イメージ */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {COUNTRIES.map((c, i) => (
              <div key={i} className={`${c.color} border rounded-2xl px-4 py-3 text-center`}>
                <div className="text-3xl mb-1">{c.flag}</div>
                <p className="text-xs font-bold text-gray-700">{c.name}</p>
                <p className="text-xs text-gray-400">{c.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-gray-400 text-sm">
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-24" />
              <span className="text-green-600 font-bold">介護先生Pro が繋ぐ</span>
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-24" />
            </div>
          </div>
        </div>

        {/* 理念 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: '💚',
              title: 'お金で諦めさせない',
              desc: '学ぶ意欲がある人が、経済的な理由だけで夢を諦めることのないよう、無料プランと送り出し機関向けクーポンで誰でも使えるアプリを目指します。',
            },
            {
              icon: '🌱',
              title: '2%の約束',
              desc: '売上の2%をアジアの子どもたちの教育支援に還元します。介護士として働くことが、故郷の次世代の教育につながる循環を作ります。',
            },
            {
              icon: '🤝',
              title: '共に育つ',
              desc: '日本の介護業界の人手不足を解消しながら、アジアの若者が日本で活躍できる環境を作る。双方にとってプラスになる共生を目指します。',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 循環の図 */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white mb-10">
          <h2 className="text-2xl font-bold text-center mb-6">夢がつながる循環</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center text-sm">
            {[
              { icon: '📱', text: '母国語で介護を学ぶ' },
              { icon: '→', text: '' },
              { icon: '🇯🇵', text: '日本で活躍する' },
              { icon: '→', text: '' },
              { icon: '💰', text: '家族に仕送りする' },
              { icon: '→', text: '' },
              { icon: '🏫', text: '故郷の子が学校へ' },
              { icon: '→', text: '' },
              { icon: '🌱', text: '次世代につながる' },
            ].map((item, i) => (
              item.icon === '→' ? (
                <div key={i} className="text-green-200 text-2xl hidden md:block">→</div>
              ) : (
                <div key={i} className="bg-white/20 rounded-2xl px-4 py-3">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs text-green-100">{item.text}</p>
                </div>
              )
            ))}
          </div>
        </div>

        {/* 創設者メッセージ */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center mb-10">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">創設者より</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-sm">
            バックオフィス業務を長年経験してきた私が、Facebookを通じてアジアの介護士の卵たちと出会いました。
            「専門の漢字がわからない」「日本語が早くてわからない」「記録が書けない」という声を聞き、
            このアプリを作ることを決めました。
            <br /><br />
            言葉の壁は、乗り越えられます。
            テクノロジーとAIの力で、アジアと日本の架け橋を作りたい。
            それが私の夢です。
          </p>
          <div className="mt-4 text-gray-400 text-sm">
            越智 宏志 / アイプルーフ
          </div>
        </div>

        {/* CTAボタン */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105"
          >
            🚀 学習をはじめる
          </button>
          <p className="mt-3 text-sm text-gray-400">無料プランでいますぐ始められます</p>
        </div>
      </main>
    </div>
  );
}
