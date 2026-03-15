'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const T = {
  ja: { title: 'プライバシーポリシー', updated: '最終更新日：2026年3月15日', note: '', back: 'トップへ戻る' },
  id: { title: 'Kebijakan Privasi', updated: 'Terakhir diperbarui: 15 Maret 2026', note: '※ Dokumen resmi dalam bahasa Jepang. Ini adalah terjemahan referensi.', back: 'Kembali ke Atas' },
  vi: { title: 'Chính sách bảo mật', updated: 'Cập nhật: 15/3/2026', note: '※ Tài liệu chính thức bằng tiếng Nhật. Đây là bản dịch tham khảo.', back: 'Về trang đầu' },
  tl: { title: 'Patakaran sa Privacy', updated: 'Huling na-update: Marso 15, 2026', note: '※ Opisyal na dokumento sa Hapon.', back: 'Bumalik sa Itaas' },
  my: { title: 'ကိုယ်ရေးကိုယ်တာ မူဝါဒ', updated: 'နောက်ဆုံး အပ်ဒိတ်: ၂၀၂၆ မတ် ၁၅', note: '※ တရားဝင် စာတမ်းသည် ဂျပန်ဘာသာဖြင့်ဖြစ်သည်။', back: 'အပေါ်သို့' },
  bn: { title: 'গোপনীয়তা নীতি', updated: 'সর্বশেষ আপডেট: ১৫ মার্চ ২০২৬', note: '※ আনুষ্ঠানিক নথি জাপানি ভাষায়।', back: 'শীর্ষে ফিরুন' },
  ne: { title: 'गोपनीयता नीति', updated: 'अन्तिम अद्यावधिक: मार्च १५, २०२६', note: '※ आधिकारिक कागजात जापानी भाषामा छ।', back: 'माथि फर्कनुहोस्' },
  km: { title: 'គោលការណ៍ភាពឯកជន', updated: 'ធ្វើបច្ចុប្បន្នភាព: ១៥ មីនា ២០២៦', note: '※ ឯកសារផ្លូវការជាភាសាជប៉ុន។', back: 'ត្រលប់ទៅដើម' },
};

const sections = [
  { title: '1. 収集する情報', content: `・メールアドレス（アカウント登録時）\n・決済情報（Stripeが管理・保管。当社はカード情報を保持しません）\n・入力した会話内容・学習データ\n・アクセスログ（IPアドレス、ブラウザ情報、利用日時）` },
  { title: '2. 情報の利用目的', content: `・本サービスの提供・運営\n・決済処理\n・カスタマーサポート\n・サービスの改善・新機能開発` },
  { title: '3. 第三者への提供', content: `・Anthropic（AI会話・記録生成）\n・Stripe（決済処理）\n・Vercel（ホスティング）\n法令に基づく場合を除き、その他の第三者への提供は行いません。` },
  { title: '4. 音声データについて', content: 'マイク機能はブラウザ標準のWeb Speech APIを使用しています。音声データはブラウザ内で処理され、当社のサーバーには送信・保存されません。' },
  { title: '5. Cookie・ローカルストレージ', content: '学習履歴・進捗データをお客様のデバイスに保存します。このデータはお客様のデバイス内にのみ存在し、当社サーバーには送信されません。' },
  { title: '6. セキュリティ', content: 'HTTPS暗号化通信によりデータを保護します。' },
  { title: '7. お問い合わせ', content: 'support@aipuru-hu.net\nアイプルーフ 運営責任者：越智 宏志' },
];

export default function PrivacyPage() {
  const router = useRouter();
  const { lang } = useLang();
  const tx = T[lang] || T['ja'];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {tx.back}</button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 text-sm text-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{tx.title}</h1>
            <p className="text-xs text-gray-400">{tx.updated}</p>
            {tx.note && <p className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 mt-3">{tx.note}</p>}
          </div>
          <p>アイプルーフ（以下「当社」）は、介護先生Pro（以下「本サービス」）における個人情報の取扱いについて、以下の通りプライバシーポリシーを定めます。</p>
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-bold text-gray-800 mb-2">{s.title}</h2>
              <p className="whitespace-pre-line text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
