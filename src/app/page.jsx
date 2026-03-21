'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import MascotWidget from '@/components/MascotWidget';
import { EXTRA_TEXT } from '@/locales/languages';

// 合格者・利用者の声（増やしたい時はここに追加するだけ）
const VOICES = [
  {
    name: 'Oen Thearin',
    country: '🇰🇭',
    role: '介護福祉士',
    msg: 'このアプリは私の理念と同じです。アジアの仲間たちを応援したい！',
    lang: 'ja',
  },
  {
    name: 'Sari W.',
    country: '🇮🇩',
    role: '介護士',
    msg: 'Aplikasi ini sangat membantu! Soal-soalnya mirip ujian asli.',
    lang: 'id',
  },
  {
    name: 'Nguyen T.',
    country: '🇻🇳',
    role: '介護士',
    msg: 'Tôi luyện tập mỗi ngày và cảm thấy tự tin hơn rất nhiều!',
    lang: 'vi',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const et = EXTRA_TEXT[lang] || EXTRA_TEXT['ja'];

  const features = [
    {
      icon: '📝',
      title: et.kiroku,
      desc: et.kirokuDesc,
      href: '/kiroku',
      color: 'from-green-50 to-emerald-100 border-green-200',
      btn: 'bg-green-600 hover:bg-green-700',
      badge: '🔥 NEW',
    },
    {
      icon: '📚',
      title: et.shiken,
      desc: et.shikenDesc,
      href: '/shiken',
      color: 'from-blue-50 to-indigo-100 border-blue-200',
      btn: 'bg-blue-600 hover:bg-blue-700',
      badge: null,
    },
    {
      icon: '🤖',
      title: t.roleplay,
      desc: t.roleplayDesc,
      href: '/roleplay',
      color: 'from-purple-50 to-violet-100 border-purple-200',
      btn: 'bg-purple-600 hover:bg-purple-700',
      badge: null,
    },
    {
      icon: '📊',
      title: t.progress,
      desc: t.progressDesc,
      href: '/progress',
      color: 'from-orange-50 to-amber-100 border-orange-200',
      btn: 'bg-orange-500 hover:bg-orange-600',
      badge: null,
    },
    {
      icon: '💳',
      title: et.plan,
      desc: et.planCoupon,
      href: '/plan',
      color: 'from-yellow-50 to-amber-100 border-yellow-200',
      btn: 'bg-yellow-500 hover:bg-yellow-600',
      badge: '🎟️',
    },
    {
      icon: '📋',
      title: '出題基準',
      desc: '介護福祉士試験の出題基準を確認しよう',
      href: '/kijun',
      color: 'from-indigo-50 to-violet-100 border-indigo-200',
      btn: 'bg-indigo-500 hover:bg-indigo-600',
      badge: null,
    },
    {
     {
      icon: '🗣️',
      title: '方言聞き取り練習',
      desc: '関西・広島・東北など全国の方言をAIがリアルタイム生成。ゲーム感覚で習得！',
      href: '/hougen',
      color: 'from-teal-50 to-cyan-100 border-teal-200',
      btn: 'bg-teal-500 hover:bg-teal-600',
      badge: '🆕',
    },
      icon: '🌸',
      title: '先輩に会いに行く',
      desc: 'カンボジア出身・介護福祉士テーリン先輩からのメッセージ',
      href: '/senpai',
      color: 'from-pink-50 to-rose-100 border-pink-200',
      btn: 'bg-pink-500 hover:bg-pink-600',
      badge: '💌',
    },
  ];

  const flags = ['🇯🇵','🇮🇩','🇻🇳','🇵🇭','🇲🇲','🇧🇩','🇳🇵','🇰🇭'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <NavBar />

      {/* ヒーローセクション */}
      <section className="flex flex-col items-center justify-center py-14 px-6 text-center">
        <div className="flex gap-1 text-3xl mb-5 flex-wrap justify-center">
          {flags.map((f, i) => (
            <span key={i} className="hover:scale-125 transition-transform cursor-default">{f}</span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 mb-3">{t.appName}</h1>
        <p className="text-xl font-semibold text-gray-600 mb-2">{t.tagline}</p>
        <p className="text-gray-400 mb-8 max-w-lg text-sm">{t.subtitle}</p>

        {/* メインCTAボタン */}
        <button
          onClick={() => router.push('/kiroku')}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          🚀 {t.startLearning}
        </button>

        {/* ¥500 目立つボタン */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => router.push('/plan')}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-lg font-extrabold px-10 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 border-2 border-white"
            style={{ boxShadow: '0 4px 20px rgba(251,146,60,0.5)' }}
          >
            💰 試験合格まで ¥500 ポッキリ！
          </button>
          <p className="text-xs text-gray-400">買い切り・月額なし・何回でも使える</p>
        </div>

        <button
          onClick={() => router.push('/plan')}
          className="mt-3 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full hover:bg-yellow-100 transition-colors"
        >
          🎟️ クーポンコードをお持ちの方はこちら
        </button>
      </section>

      {/* 合格者・利用者の声 */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-700">💬 みんなの声</h2>
          <p className="text-xs text-gray-400 mt-1">一緒に頑張っている仲間がいます</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VOICES.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{v.country}</span>
                <div>
                  <p className="font-bold text-sm text-gray-800">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">「{v.msg}」</p>
            </div>
          ))}
        </div>

        {/* 声を追加する導線（将来的に） */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-300">※ 合格したらあなたの声も載せませんか？</p>
        </div>
      </section>

      {/* 機能カード */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.href} className={`bg-gradient-to-br ${f.color} border rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <span className="text-4xl">{f.icon}</span>
              {f.badge && <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">{f.badge}</span>}
            </div>
            <h2 className="text-base font-bold text-gray-800">{f.title}</h2>
            <p className="text-gray-500 text-xs flex-1">{f.desc}</p>
            <button onClick={() => router.push(f.href)} className={`${f.btn} text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors`}>
              {t.startLearning} →
            </button>
          </div>
        ))}
      </section>

      {/* マスコット */}
      <MascotWidget lang={lang} />
    </div>
  );
}
