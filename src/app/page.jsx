'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import { EXTRA_TEXT } from '@/locales/languages';

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
  ];

  const flags = ['🇯🇵','🇮🇩','🇻🇳','🇵🇭','🇲🇲','🇧🇩','🇳🇵','🇰🇭'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <NavBar />
      <section className="flex flex-col items-center justify-center py-14 px-6 text-center">
        <div className="flex gap-1 text-3xl mb-5 flex-wrap justify-center">
          {flags.map((f, i) => (
            <span key={i} className="hover:scale-125 transition-transform cursor-default">{f}</span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 mb-3">{t.appName}</h1>
        <p className="text-xl font-semibold text-gray-600 mb-2">{t.tagline}</p>
        <p className="text-gray-400 mb-8 max-w-lg text-sm">{t.subtitle}</p>
        <button
          onClick={() => router.push('/kiroku')}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          🚀 {t.startLearning}
        </button>
        <button
          onClick={() => router.push('/plan')}
          className="mt-4 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full hover:bg-yellow-100 transition-colors"
        >
          🎟️ クーポンコードをお持ちの方はこちら
        </button>
      </section>
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
    </div>
  );
}
