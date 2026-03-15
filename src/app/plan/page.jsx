'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import { EXTRA_TEXT } from '@/locales/languages';

const VALID_COUPONS = ['KAIGO2025', 'FACEBOOK100', 'PARTNER01'];

const GOOGLE_CAL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1DZzbc2Em4gn-ABTKavXY1dpFHRpO0ynpn8iSeOx_9vRUdr2MDLcRSv_tZHY4aMVy6ceqQGO2L';
const STRIPE_PRO = 'https://buy.stripe.com/3cI6oz52k9VoakZ5sWcs802';

export default function PlanPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const et = EXTRA_TEXT[lang] || EXTRA_TEXT['ja'];
  const [coupon, setCoupon] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);

  const handleCoupon = () => {
    setCouponStatus(VALID_COUPONS.includes(coupon.toUpperCase()) ? 'success' : 'error');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← {t.backToTop}
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">💳 {et.plan}</h1>
        <p className="text-center text-gray-500 text-sm mb-10">お金で諦めさせない。全員に学ぶ機会を。</p>

        {/* 個人プラン */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 無料プラン */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-5">
              <div className="text-2xl mb-1">🆓</div>
              <h2 className="font-bold text-lg text-gray-800">{et.planFree}</h2>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-gray-800">¥0</span>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-2 mb-5 text-sm text-gray-600">
                {['AI記録アシスト（1日3回）', '試験対策（1日3問・10カテゴリ）', 'AI会話ロールプレイ（1日3回）', '8言語対応', '試験カウントダウン'].map((f,i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>
                ))}
              </ul>
              <button onClick={() => router.push('/')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                今すぐ始める
              </button>
            </div>
          </div>

          {/* 個人プロプラン */}
          <div className="bg-white rounded-2xl border border-green-400 ring-2 ring-green-300 overflow-hidden shadow-sm">
            <div className="bg-green-600 text-white p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">💎</span>
                <span className="text-xs bg-yellow-400 text-yellow-900 font-bold px-2 py-0.5 rounded-full">人気</span>
              </div>
              <h2 className="font-bold text-lg">{et.planPro}</h2>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold">¥500</span>
                <span className="text-sm opacity-70">/ 月</span>
              </div>
              <p className="text-xs mt-1 opacity-70">本気で合格を目指す方へ</p>
            </div>
            <div className="p-5">
              <ul className="space-y-2 mb-5 text-sm text-gray-600">
                {['AI記録アシスト（無制限）', '試験対策（無制限・全カテゴリ）', 'AI会話ロールプレイ（無制限）', '専門用語集（全語彙）', '方言解説', '学習進捗保存（無期限）', '8言語対応'].map((f,i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>
                ))}
              </ul>
              <a href={STRIPE_PRO} target="_blank" rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors block text-center">
                💳 アップグレード
              </a>
            </div>
          </div>
        </div>

        {/* 施設・送り出し機関プラン */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🏥</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{et.planFacility}</h2>
              <p className="text-blue-100 text-sm mb-4">
                施設・送り出し機関が契約 → スタッフ・研修生は<span className="font-bold text-white">無料</span>で無制限利用
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                {[
                  { name: '施設ライト', price: '¥5,000', unit: '/月', desc: '10名まで' },
                  { name: '施設スタンダード', price: '¥15,000', unit: '/月', desc: '50名まで' },
                  { name: '送り出し機関', price: '¥50,000', unit: '/年', desc: '人数無制限' },
                ].map((p, i) => (
                  <div key={i} className="bg-white/20 rounded-xl p-3 text-center">
                    <p className="text-xs font-semibold opacity-80 mb-1">{p.name}</p>
                    <p className="text-2xl font-extrabold">{p.price}</p>
                    <p className="text-xs opacity-70">{p.unit}・{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-xs text-blue-100 mb-4">
                💡 <span className="font-bold">施設にとってのメリット</span>：外国人スタッフの試験合格率UP・記録精度向上・離職率低下 → 採用コスト削減
              </div>
              <a href={GOOGLE_CAL} target="_blank" rel="noopener noreferrer"
                className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors inline-block text-sm">
                📅 無料オンライン説明を予約する（60分）
              </a>
            </div>
          </div>
        </div>

        {/* クーポン */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-yellow-800 mb-1 text-lg">🎟️ {et.planCoupon}</h3>
          <p className="text-yellow-700 text-sm mb-4">
            送り出し機関・介護施設からクーポンをもらった方は、こちらから無料でプロプランをご利用いただけます。
          </p>
          <div className="flex gap-2">
            <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)}
              placeholder="クーポンコードを入力"
              className="flex-1 border border-yellow-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white" />
            <button onClick={handleCoupon}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-5 py-2 rounded-xl text-sm">
              {et.planCouponBtn}
            </button>
          </div>
          {couponStatus === 'success' && <p className="mt-3 text-green-700 text-sm font-semibold">✅ クーポンが適用されました！プロプランをご利用いただけます。</p>}
          {couponStatus === 'error' && <p className="mt-3 text-red-600 text-sm">❌ クーポンコードが無効です。</p>}
        </div>

        {/* 対応決済 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm font-semibold text-gray-600 mb-4">💳 対応決済</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {['💳 クレジットカード（Stripe）', '📱 PayPay（coming soon）', '🏪 コンビニ払い（coming soon）'].map(m => (
              <span key={m} className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">{m}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
