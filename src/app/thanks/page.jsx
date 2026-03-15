'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import { useUser } from '@/components/UserAuth';
import NavBar from '@/components/NavBar';

const TT = {
  ja: {
    title: 'ご購入ありがとうございます！',
    subtitle: 'プロプランへようこそ🎉',
    codeLabel: 'あなたのプロコード',
    codeDesc: 'このコードをアプリに入力するとプロプランが使えます',
    howTitle: '使い方',
    step1: 'コードをコピーする',
    step2: '右上の「🔑 施設コードでログイン」をクリック',
    step3: 'コードを貼り付けて「入力して始める」',
    step4: '無制限で全機能が使えます！',
    copyBtn: 'コードをコピー',
    copied: 'コピーしました！',
    loginBtn: '今すぐプロプランを有効にする',
    emailNote: 'このコードは登録メールアドレスにも送信されます',
    support: 'ご不明な点は support@aipuru-hu.net までお問い合わせください',
    back: 'トップへ戻る',
    alreadyActive: '✅ プロプランが有効になりました！',
  },
  id: {
    title: 'Terima kasih atas pembelian Anda!',
    subtitle: 'Selamat datang di Paket Pro 🎉',
    codeLabel: 'Kode Pro Anda',
    codeDesc: 'Masukkan kode ini ke aplikasi untuk mengaktifkan Paket Pro',
    howTitle: 'Cara penggunaan',
    step1: 'Salin kode',
    step2: 'Klik "🔑 Login dengan Kode" di kanan atas',
    step3: 'Tempel kode dan klik "Mulai"',
    step4: 'Semua fitur tersedia tanpa batas!',
    copyBtn: 'Salin Kode',
    copied: 'Tersalin!',
    loginBtn: 'Aktifkan Paket Pro Sekarang',
    emailNote: 'Kode ini juga dikirim ke email Anda',
    support: 'Hubungi support@aipuru-hu.net untuk bantuan',
    back: 'Kembali ke Atas',
    alreadyActive: '✅ Paket Pro sudah aktif!',
  },
  vi: {
    title: 'Cảm ơn bạn đã mua hàng!',
    subtitle: 'Chào mừng đến với Gói Pro 🎉',
    codeLabel: 'Mã Pro của bạn',
    codeDesc: 'Nhập mã này vào ứng dụng để kích hoạt Gói Pro',
    howTitle: 'Cách sử dụng',
    step1: 'Sao chép mã',
    step2: 'Nhấp "🔑 Đăng nhập bằng Mã" ở góc trên phải',
    step3: 'Dán mã và nhấp "Bắt đầu"',
    step4: 'Tất cả tính năng không giới hạn!',
    copyBtn: 'Sao chép mã',
    copied: 'Đã sao chép!',
    loginBtn: 'Kích hoạt Gói Pro ngay',
    emailNote: 'Mã này cũng được gửi đến email của bạn',
    support: 'Liên hệ support@aipuru-hu.net để được hỗ trợ',
    back: 'Về trang đầu',
    alreadyActive: '✅ Gói Pro đã được kích hoạt!',
  },
  tl: { title: 'Salamat sa iyong pagbili!', subtitle: 'Maligayang pagdating sa Pro Plan 🎉', codeLabel: 'Ang iyong Pro Code', codeDesc: 'Ilagay ang code na ito sa app para i-activate ang Pro Plan', howTitle: 'Paano gamitin', step1: 'Kopyahin ang code', step2: 'I-click ang "🔑 Login gamit ang Code" sa kanang itaas', step3: 'I-paste ang code at i-click ang "Simulan"', step4: 'Lahat ng feature ay available nang walang limitasyon!', copyBtn: 'Kopyahin ang Code', copied: 'Nakopya!', loginBtn: 'I-activate ang Pro Plan Ngayon', emailNote: 'Ipapadala rin ang code sa iyong email', support: 'Makipag-ugnayan sa support@aipuru-hu.net para sa tulong', back: 'Bumalik sa Itaas', alreadyActive: '✅ Naka-activate na ang Pro Plan!' },
  my: { title: 'ဝယ်ယူမှုအတွက် ကျေးဇူးတင်ပါသည်!', subtitle: 'Pro Plan မှ ကြိုဆိုပါသည် 🎉', codeLabel: 'သင်၏ Pro ကုဒ်', codeDesc: 'Pro Plan ဖွင့်ရန် ဤကုဒ်ကို app တွင် ထည့်သွင်းပါ', howTitle: 'အသုံးပြုနည်း', step1: 'ကုဒ်ကို ကူးပါ', step2: 'ညာဘက်အပေါ်တွင် "🔑 ကုဒ်ဖြင့် ဝင်ရောက်" ကို နှိပ်ပါ', step3: 'ကုဒ်ကို ကူးထည့်ပြီး "စတင်ရန်" ကို နှိပ်ပါ', step4: 'အကန့်အသတ်မရှိ လုပ်ဆောင်ချက်အားလုံး ရရှိသည်!', copyBtn: 'ကုဒ် ကူးရန်', copied: 'ကူးပြီး!', loginBtn: 'ယခု Pro Plan ဖွင့်ရန်', emailNote: 'ဤကုဒ်ကို သင်၏ email သို့လည်း ပေးပို့သည်', support: 'အကူအညီအတွက် support@aipuru-hu.net ကို ဆက်သွယ်ပါ', back: 'အပေါ်သို့', alreadyActive: '✅ Pro Plan ဖွင့်ထားသည်!' },
  bn: { title: 'আপনার কেনাকাটার জন্য ধন্যবাদ!', subtitle: 'প্রো প্ল্যানে স্বাগতম 🎉', codeLabel: 'আপনার প্রো কোড', codeDesc: 'প্রো প্ল্যান সক্রিয় করতে এই কোডটি অ্যাপে লিখুন', howTitle: 'ব্যবহার পদ্ধতি', step1: 'কোড কপি করুন', step2: 'উপরে ডানে "🔑 কোড দিয়ে লগইন" ক্লিক করুন', step3: 'কোড পেস্ট করুন এবং "শুরু করুন" ক্লিক করুন', step4: 'সীমাহীন সব ফিচার পাবেন!', copyBtn: 'কোড কপি করুন', copied: 'কপি হয়েছে!', loginBtn: 'এখনই প্রো প্ল্যান সক্রিয় করুন', emailNote: 'এই কোডটি আপনার ইমেইলেও পাঠানো হবে', support: 'সাহায্যের জন্য support@aipuru-hu.net যোগাযোগ করুন', back: 'শীর্ষে ফিরুন', alreadyActive: '✅ প্রো প্ল্যান সক্রিয় হয়েছে!' },
  ne: { title: 'खरिदको लागि धन्यवाद!', subtitle: 'प्रो प्लानमा स्वागत छ 🎉', codeLabel: 'तपाईंको प्रो कोड', codeDesc: 'प्रो प्लान सक्रिय गर्न यो कोड एपमा राख्नुहोस्', howTitle: 'कसरी प्रयोग गर्ने', step1: 'कोड कपी गर्नुहोस्', step2: 'माथि दायाँमा "🔑 कोडले लगइन" मा क्लिक गर्नुहोस्', step3: 'कोड पेस्ट गरेर "सुरु गर्नुहोस्" मा क्लिक गर्नुहोस्', step4: 'सबै सुविधाहरू असीमित रूपमा प्रयोग गर्न सकिन्छ!', copyBtn: 'कोड कपी गर्नुहोस्', copied: 'कपी भयो!', loginBtn: 'अहिले प्रो प्लान सक्रिय गर्नुहोस्', emailNote: 'यो कोड तपाईंको इमेलमा पनि पठाइन्छ', support: 'सहायताको लागि support@aipuru-hu.net सम्पर्क गर्नुहोस्', back: 'माथि फर्कनुहोस्', alreadyActive: '✅ प्रो प्लान सक्रिय भयो!' },
  km: { title: 'អរគុណចំពោះការទិញរបស់អ្នក!', subtitle: 'សូមស្វាគមន៍មកកាន់ Pro Plan 🎉', codeLabel: 'លេខកូដ Pro របស់អ្នក', codeDesc: 'បញ្ចូលលេខកូដនេះក្នុងកម្មវិធីដើម្បីដំណើរការ Pro Plan', howTitle: 'របៀបប្រើ', step1: 'ចម្លងលេខកូដ', step2: 'ចុច "🔑 ចូលជាមួយកូដ" នៅជ្រុងស្តាំ', step3: 'បិទភ្ជាប់លេខកូដ ហើយចុច "ចាប់ផ្តើម"', step4: 'មុខងារទាំងអស់គ្មានដែនកំណត់!', copyBtn: 'ចម្លងលេខកូដ', copied: 'បានចម្លង!', loginBtn: 'ដំណើរការ Pro Plan ឥឡូវ', emailNote: 'លេខកូដនេះត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នកដែរ', support: 'ទាក់ទង support@aipuru-hu.net សម្រាប់ជំនួយ', back: 'ត្រលប់ទៅដើម', alreadyActive: '✅ Pro Plan ដំណើរការហើយ!' },
};

// セッションIDから一意のプロコードを生成
function generateProCode(sessionId) {
  const base = sessionId ? sessionId.slice(-8).toUpperCase() : Math.random().toString(36).slice(2, 10).toUpperCase();
  return 'PRO' + base;
}

export default function ThanksPage() {
  const router = useRouter();
  const { lang } = useLang();
  const { loginWithCode, user } = useUser();
  const searchParams = useSearchParams();
  const tx = TT[lang] || TT['ja'];

  const [proCode, setProCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    // URLパラメータからセッションID取得（Stripeリダイレクト）
    const sessionId = searchParams.get('session_id') || searchParams.get('code') || '';
    setProCode(generateProCode(sessionId));

    // すでにプロの場合
    if (user?.plan === 'pro') setActivated(true);
  }, [searchParams, user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(proCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivate = () => {
    // UserAuthに登録
    if (typeof window !== 'undefined') {
      const profile = {
        facilityCode: proCode,
        facilityName: '個人プロプラン',
        plan: 'pro',
        type: 'individual',
        loginAt: new Date().toISOString(),
        id: 'user_' + Math.random().toString(36).slice(2, 9),
      };
      localStorage.setItem('kaigo_user_profile', JSON.stringify(profile));
      setActivated(true);
      setTimeout(() => router.push('/'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <NavBar />
      <main className="max-w-xl mx-auto px-4 py-12">

        {/* ヒーロー */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{tx.title}</h1>
          <p className="text-xl text-green-600 font-bold">{tx.subtitle}</p>
        </div>

        {/* プロコード表示 */}
        <div className="bg-white rounded-3xl border border-green-200 shadow-sm p-8 mb-6">
          <p className="text-sm font-bold text-gray-500 mb-3 text-center">{tx.codeLabel}</p>

          {/* コード表示ボックス */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 text-center mb-4">
            <p className="text-4xl font-extrabold tracking-widest text-green-700 font-mono">
              {proCode}
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center mb-5">{tx.codeDesc}</p>

          {/* コピーボタン */}
          <button
            onClick={handleCopy}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors mb-3"
          >
            {copied ? `✅ ${tx.copied}` : `📋 ${tx.copyBtn}`}
          </button>

          {/* 今すぐ有効化ボタン */}
          {!activated ? (
            <button
              onClick={handleActivate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              🚀 {tx.loginBtn}
            </button>
          ) : (
            <div className="text-center text-green-600 font-bold py-3">
              {tx.alreadyActive}
            </div>
          )}
        </div>

        {/* 使い方ステップ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <p className="font-bold text-gray-700 mb-4">📋 {tx.howTitle}</p>
          <ol className="space-y-3">
            {[tx.step1, tx.step2, tx.step3, tx.step4].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* メール通知・サポート */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-400">📧 {tx.emailNote}</p>
          <p className="text-xs text-gray-400">{tx.support}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-green-600 hover:underline text-sm"
          >
            ← {tx.back}
          </button>
        </div>

      </main>
    </div>
  );
}
