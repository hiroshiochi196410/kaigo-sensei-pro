'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const T = {
  ja: { title: '利用規約', updated: '最終更新日：2026年3月15日', note: '', back: 'トップへ戻る' },
  id: { title: 'Syarat Penggunaan', updated: 'Terakhir diperbarui: 15 Maret 2026', note: '※ Dokumen resmi dalam bahasa Jepang. Ini adalah terjemahan referensi.', back: 'Kembali ke Atas' },
  vi: { title: 'Điều khoản sử dụng', updated: 'Cập nhật: 15/3/2026', note: '※ Tài liệu chính thức bằng tiếng Nhật. Đây là bản dịch tham khảo.', back: 'Về trang đầu' },
  tl: { title: 'Mga Tuntunin ng Paggamit', updated: 'Huling na-update: Marso 15, 2026', note: '※ Opisyal na dokumento sa Hapon.', back: 'Bumalik sa Itaas' },
  my: { title: 'အသုံးပြုမှု စည်းမျဉ်းများ', updated: 'နောက်ဆုံး အပ်ဒိတ်: ၂၀၂၆ မတ် ၁၅', note: '※ တရားဝင် စာတမ်းသည် ဂျပန်ဘာသာဖြင့်ဖြစ်သည်။', back: 'အပေါ်သို့' },
  bn: { title: 'ব্যবহারের শর্তাবলী', updated: 'সর্বশেষ আপডেট: ১৫ মার্চ ২০২৬', note: '※ আনুষ্ঠানিক নথি জাপানি ভাষায়।', back: 'শীর্ষে ফিরুন' },
  ne: { title: 'उपयोगका सर्तहरू', updated: 'अन्तिम अद्यावधिक: मार्च १५, २०२६', note: '※ आधिकारिक कागजात जापानी भाषामा छ।', back: 'माथि फर्कनुहोस्' },
  km: { title: 'លក្ខខណ្ឌប្រើប្រាស់', updated: 'ធ្វើបច្ចុប្បន្នភាព: ១៥ មីនា ២០២៦', note: '※ ឯកសារផ្លូវការជាភាសាជប៉ុន។', back: 'ត្រលប់ទៅដើម' },
};

const sections = [
  { title: '第1条（適用）', content: '本規約は、本サービスの利用に関する当社とユーザーの間の権利義務関係を定めることを目的とします。' },
  { title: '第2条（サービス内容）', content: `・AI介護記録アシスト（母国語から日本語介護記録文の生成）\n・介護福祉士国家試験対策（練習問題・解説）\n・AI会話ロールプレイ（介護シチュエーション練習）\n・学習進捗ダッシュボード\n・多言語UI（8言語対応）` },
  { title: '第3条（料金プラン）', content: `無料プラン：AI記録アシスト1日10回、試験対策1日5問\nプロプラン：月額500円（税込）、全機能無制限\n施設・送り出し機関プラン：月額3,000円〜（税込）` },
  { title: '第4条（支払・更新）', content: 'Stripeによるクレジットカード決済で月額課金されます。解約しない限り毎月自動更新されます。' },
  { title: '第5条（解約・返金）', content: 'いつでも解約可能です。月途中の解約による日割り返金はございません。' },
  { title: '第6条（禁止事項）', content: `・アカウントの第三者への譲渡・共有\n・本サービスの逆コンパイル・リバースエンジニアリング\n・本サービスを利用した営利目的の転売\n・虚偽情報の入力` },
  { title: '第7条（免責事項）', content: '本サービスは学習支援ツールです。AIが生成する介護記録文は参考用であり、実際の業務では専門職の確認を受けてください。' },
  { title: '第8条（準拠法・管轄）', content: '本規約は日本法に準拠します。広島地方裁判所を第一審の専属的合意管轄裁判所とします。' },
  { title: '第9条（お問い合わせ）', content: 'support@aipuru-hu.net\nアイプルーフ 運営責任者：越智 宏志\n〒739-0036 広島県東広島市西条町田口2759-5' },
];

export default function TermsPage() {
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
          <p>アイプルーフ（以下「当社」）が提供する介護先生Pro（以下「本サービス」）の利用条件を定めるものです。</p>
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
