'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLang();

  const features = [
    {
      icon: '📚',
      key: 'exam',
      title: t.exam,
      desc: t.examDesc,
      href: '/exam',
      color: 'from-green-50 to-emerald-100 border-green-200',
      btn: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: '🤖',
      key: 'roleplay',
      title: t.roleplay,
      desc: t.roleplayDesc,
      href: '/roleplay',
      color: 'from-blue-50 to-sky-100 border-blue-200',
      btn: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: '📊',
      key: 'progress',
      title: t.progress,
      desc: t.progressDesc,
      href: '/progress',
      color: 'from-purple-50 to-violet-100 border-purple-200',
      btn: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const flags = ['🇯🇵','🇮🇩','🇻🇳','🇵🇭','🇲🇲','🇧🇩','🇳🇵','🇰🇭'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <NavBar />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="flex gap-1 text-3xl mb-6">
          {flags.map((f, i) => (
            <span key={i} className="hover:scale-125 transition-transform cursor-default">{f}</span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 mb-3">
          {t.appName}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">{t.tagline}</p>
        <p className="text-gray-400 mb-10 max-w-lg">{t.subtitle}</p>

        <button
          onClick={() => router.push('/exam')}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          🚀 {t.startLearning}
        </button>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.key}
            className={`bg-gradient-to-br ${f.color} border rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="text-4xl">{f.icon}</div>
            <h2 className="text-lg font-bold text-gray-800">{f.title}</h2>
            <p className="text-gray-500 text-sm flex-1">{f.desc}</p>
            <button
              onClick={() => router.push(f.href)}
              className={`${f.btn} text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors`}
            >
              {t.startLearning} →
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
