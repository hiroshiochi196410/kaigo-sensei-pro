'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import { EXTRA_TEXT } from '@/locales/languages';

const PLAN_TEXT = {
  ja: {
    free: { price: '無料', period: '', desc: '毎日使える基本プラン' },
    pro: { price: '¥500', period: '/ 月', desc: '本気で合格を目指す方へ' },
    facility: { price: '¥3,000〜', period: '/ 月', desc: '10名まで。施設・送り出し機関向け' },
    features: {
      free: ['AI記録アシスト（1日10回）', '試験対策（1日5問）', '専門用語集（基本100語）', '8言語対応'],
      pro: ['AI記録アシスト（無制限）', '試験対策（全問題）', '専門用語集（全語彙）', '方言解説', '学習進捗保存（無期限）', '8言語対応'],
      facility: ['プロプラン×人数分', '管理者ダッシュボード', '学習者進捗一覧', 'クーポン発行機能', '請求書払い対応'],
    },
    couponPlaceholder: 'クーポンコードを入力',
    couponApply: '適用する',
    couponSuccess: '✅ クーポンが適用されました！プロプランをご利用いただけます。',
    couponError: '❌ クーポンコードが無効です。',
    contact: 'お問い合わせ',
    paymentMethods: '対応決済',
  },
  id: {
    free: { price: 'Gratis', period: '', desc: 'Paket dasar yang bisa digunakan setiap hari' },
    pro: { price: '¥500', period: '/ bulan', desc: 'Untuk yang serius ingin lulus ujian' },
    facility: { price: '¥3.000〜', period: '/ bulan', desc: 'Hingga 10 orang. Untuk fasilitas & lembaga' },
    features: {
      free: ['Asisten catatan AI (10x/hari)', 'Latihan ujian (5 soal/hari)', 'Kosakata (100 kata dasar)', '8 bahasa'],
      pro: ['Asisten catatan AI (tidak terbatas)', 'Latihan ujian (semua soal)', 'Kosakata (lengkap)', 'Penjelasan dialek', 'Simpan progres (selamanya)', '8 bahasa'],
      facility: ['Paket Pro × jumlah orang', 'Dashboard admin', 'Daftar progres peserta', 'Fitur pembuatan kupon', 'Pembayaran invoice'],
    },
    couponPlaceholder: 'Masukkan kode kupon',
    couponApply: 'Terapkan',
    couponSuccess: '✅ Kupon berhasil diterapkan! Anda dapat menggunakan Paket Pro.',
    couponError: '❌ Kode kupon tidak valid.',
    contact: 'Hubungi Kami',
    paymentMethods: 'Metode Pembayaran',
  },
  vi: {
    free: { price: 'Miễn phí', period: '', desc: 'Gói cơ bản dùng mỗi ngày' },
    pro: { price: '¥500', period: '/ tháng', desc: 'Dành cho người nghiêm túc muốn đậu thi' },
    facility: { price: '¥3.000〜', period: '/ tháng', desc: 'Tối đa 10 người. Cho cơ sở & tổ chức' },
    features: {
      free: ['Trợ lý ghi chép AI (10 lần/ngày)', 'Luyện thi (5 câu/ngày)', 'Từ vựng (100 từ cơ bản)', '8 ngôn ngữ'],
      pro: ['Trợ lý ghi chép AI (không giới hạn)', 'Luyện thi (tất cả câu hỏi)', 'Từ vựng (đầy đủ)', 'Giải thích phương ngữ', 'Lưu tiến độ (vĩnh viễn)', '8 ngôn ngữ'],
      facility: ['Gói Pro × số người', 'Bảng điều khiển admin', 'Danh sách tiến độ học viên', 'Tính năng tạo coupon', 'Thanh toán hóa đơn'],
    },
    couponPlaceholder: 'Nhập mã coupon',
    couponApply: 'Áp dụng',
    couponSuccess: '✅ Coupon đã được áp dụng! Bạn có thể sử dụng Gói Pro.',
    couponError: '❌ Mã coupon không hợp lệ.',
    contact: 'Liên hệ',
    paymentMethods: 'Phương thức thanh toán',
  },
};

// デモ用クーポン
const VALID_COUPONS = ['KAIGO2025', 'FACEBOOK100', 'PARTNER01'];

export default function PlanPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const et = EXTRA_TEXT[lang] || EXTRA_TEXT['ja'];
  const pt = PLAN_TEXT[lang] || PLAN_TEXT['ja'];

  const [coupon, setCoupon] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);

  const handleCoupon = () => {
    if (VALID_COUPONS.includes(coupon.toUpperCase())) {
      setCouponStatus('success');
    } else {
      setCouponStatus('error');
    }
  };

  const plans = [
    {
      key: 'free',
      icon: '🆓',
      color: 'border-gray-200',
      headerColor: 'bg-gray-50',
      btnColor: 'bg-gray-600 hover:bg-gray-700',
      badge: null,
    },
    {
      key: 'pro',
      icon: '💎',
      color: 'border-green-400 ring-2 ring-green-300',
      headerColor: 'bg-green-600 text-white',
      btnColor: 'bg-green-600 hover:bg-green-700',
      badge: '人気',
    },
    {
      key: 'facility',
      icon: '🏥',
      color: 'border-blue-200',
      headerColor: 'bg-blue-50',
      btnColor: 'bg-blue-600 hover:bg-blue-700',
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← {t.backToTop}
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">💳 {et.plan}</h1>
        <p className="text-center text-gray-500 text-sm mb-10">お金で諦めさせない。全員に学ぶ機会を。</p>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map(plan => {
            const info = pt[plan.key] || PLAN_TEXT['ja'][plan.key];
            const features = (pt.features || PLAN_TEXT['ja'].features)[plan.key];
            return (
              <div key={plan.key} className={`bg-white rounded-2xl border ${plan.color} overflow-hidden shadow-sm`}>
                <div className={`p-5 ${plan.headerColor}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{plan.icon}</span>
                    {plan.badge && (
                      <span className="text-xs bg-yellow-400 text-yellow-900 font-bold px-2 py-0.5 rounded-full">{plan.badge}</span>
                    )}
                  </div>
                  <h2 className="font-bold text-lg">
                    {plan.key === 'free' ? et.planFree : plan.key === 'pro' ? et.planPro : et.planFacility}
                  </h2>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold">{info.price}</span>
                    <span className="text-sm opacity-70">{info.period}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-70">{info.desc}</p>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-5">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full ${plan.btnColor} text-white font-bold py-2.5 rounded-xl text-sm transition-colors`}>
                    {plan.key === 'free' ? '今すぐ始める' : plan.key === 'pro' ? 'アップグレード' : (pt.contact || '問い合わせる')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* クーポンセクション */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-yellow-800 mb-1 text-lg">🎟️ {et.planCoupon}</h3>
          <p className="text-yellow-700 text-sm mb-4">
            送り出し機関・介護施設からクーポンをもらった方は、こちらから無料でプロプランをご利用いただけます。
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder={et.planCouponBtn}
              className="flex-1 border border-yellow-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            />
            <button
              onClick={handleCoupon}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors"
            >
              {et.planCouponBtn}
            </button>
          </div>
          {couponStatus === 'success' && (
            <p className="mt-3 text-green-700 text-sm font-semibold">
              {(pt.couponSuccess) || '✅ クーポンが適用されました！'}
            </p>
          )}
          {couponStatus === 'error' && (
            <p className="mt-3 text-red-600 text-sm">
              {(pt.couponError) || '❌ クーポンコードが無効です。'}
            </p>
          )}
        </div>

        {/* 対応決済 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm font-semibold text-gray-600 mb-4">💳 {pt.paymentMethods || '対応決済'}</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {['💳 クレジットカード（Stripe）', '📱 PayPay', '🏪 コンビニ払い', '🌏 PayPal'].map(m => (
              <span key={m} className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">{m}</span>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            ※ PayPay・コンビニ払いは来日後に対応予定。現在はStripe・クーポンをご利用ください。
          </p>
        </div>
      </main>
    </div>
  );
}
