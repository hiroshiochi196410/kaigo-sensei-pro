'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const T = {
  ja: { title: '特定商取引法に基づく表記', updated: '最終更新日：2026年3月15日', note: '', back: 'トップへ戻る' },
  id: { title: 'Informasi Penjual (Tokusho-ho)', updated: 'Terakhir diperbarui: 15 Maret 2026', note: '※ Dokumen resmi dalam bahasa Jepang. Ini adalah terjemahan referensi.', back: 'Kembali ke Atas' },
  vi: { title: 'Thông tin người bán (Tokusho-ho)', updated: 'Cập nhật lần cuối: 15/3/2026', note: '※ Tài liệu chính thức bằng tiếng Nhật. Đây là bản dịch tham khảo.', back: 'Về trang đầu' },
  tl: { title: 'Impormasyon ng Nagbebenta', updated: 'Huling na-update: Marso 15, 2026', note: '※ Opisyal na dokumento sa Hapon. Ito ay sangguniang salin.', back: 'Bumalik sa Itaas' },
  my: { title: 'ရောင်းချသူ သတင်းအချက်အလက်', updated: 'နောက်ဆုံး အပ်ဒိတ်: ၂၀၂၆ မတ် ၁၅', note: '※ တရားဝင် စာတမ်းသည် ဂျပန်ဘာသာဖြင့်ဖြစ်သည်။ ဤသည် ကိုးကားဘာသာပြန် ဖြစ်သည်။', back: 'အပေါ်သို့' },
  bn: { title: 'বিক্রেতার তথ্য (টোকুশো-হো)', updated: 'সর্বশেষ আপডেট: ১৫ মার্চ ২০২৬', note: '※ আনুষ্ঠানিক নথি জাপানি ভাষায়। এটি একটি রেফারেন্স অনুবাদ।', back: 'শীর্ষে ফিরুন' },
  ne: { title: 'विक्रेता जानकारी (टोकुशो-हो)', updated: 'अन्तिम अद्यावधिक: मार्च १५, २०२६', note: '※ आधिकारिक कागजात जापानी भाषामा छ। यो सन्दर्भ अनुवाद हो।', back: 'माथि फर्कनुहोस्' },
  km: { title: 'ព័ត៌មានអ្នកលក់ (Tokusho-ho)', updated: 'ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ: ១៥ មីនា ២០២៦', note: '※ ឯកសារផ្លូវការជាភាសាជប៉ុន។ នេះជាការបកប្រែសម្រាប់យោង។', back: 'ត្រលប់ទៅដើម' },
};

const items = [
  { label: '販売事業者', value: 'アイプルーフ（aipuru-hu）' },
  { label: '運営責任者', value: '越智 宏志' },
  { label: '所在地', value: '〒739-0036 広島県東広島市西条町田口2759-5' },
  { label: 'お問い合わせ', value: 'support@aipuru-hu.net' },
  { label: '販売価格', value: 'プロプラン：月額500円（税込）／施設プラン：月額3,000円〜（税込）' },
  { label: '支払方法', value: 'クレジットカード（Stripe）、クーポンコード' },
  { label: '支払時期', value: '月額課金（毎月自動更新）' },
  { label: 'サービス提供時期', value: '決済完了後、即時利用可能' },
  { label: '返品・キャンセル', value: '月途中のキャンセルによる日割り返金はございません。解約後は次回更新日まで利用可能です。' },
  { label: '動作環境', value: 'Google Chrome最新版を推奨。マイク・音声機能にはChrome必須。' },
  { label: 'サービス内容', value: 'AIを活用した介護福祉士試験対策・介護記録アシスト・AI会話ロールプレイ（多言語対応）' },
];

export default function TokushoPage() {
  const router = useRouter();
  const { lang } = useLang();
  const tx = T[lang] || T['ja'];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {tx.back}</button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{tx.title}</h1>
          <p className="text-xs text-gray-400 mb-2">{tx.updated}</p>
          {tx.note && <p className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 mb-6">{tx.note}</p>}
          <table className="w-full text-sm">
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <th className="text-left py-4 pr-4 text-gray-600 font-semibold w-1/3 align-top">{item.label}</th>
                  <td className="py-4 text-gray-700 leading-relaxed">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
