'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';

const FOOTER_TEXT = {
  ja: { learning: '学習機能', service: 'サービス', legal: '法的情報', kiroku: 'AI介護記録アシスト', shiken: '国家試験対策', roleplay: 'AI会話ロールプレイ', progress: '学習進捗', plan: '料金プラン', mission: '理念・架け橋', tokusho: '特定商取引法', privacy: 'プライバシーポリシー', terms: '利用規約', tagline: 'アジアと日本をつなぐ\n多言語介護学習アプリ', pledge: '売上の2%を教育支援に還元' },
  id: { learning: 'Fitur Belajar', service: 'Layanan', legal: 'Informasi Hukum', kiroku: 'Asisten Catatan AI', shiken: 'Latihan Ujian', roleplay: 'Role Play AI', progress: 'Progres Belajar', plan: 'Paket Harga', mission: 'Misi & Jembatan', tokusho: 'Info Penjual', privacy: 'Kebijakan Privasi', terms: 'Syarat Penggunaan', tagline: 'Menghubungkan Asia dan Jepang\nAplikasi belajar perawatan multibahasa', pledge: '2% pendapatan untuk pendidikan' },
  vi: { learning: 'Tính năng học tập', service: 'Dịch vụ', legal: 'Thông tin pháp lý', kiroku: 'Trợ lý ghi chép AI', shiken: 'Luyện thi', roleplay: 'Role Play AI', progress: 'Tiến độ học', plan: 'Bảng giá', mission: 'Sứ mệnh & Cầu nối', tokusho: 'Thông tin người bán', privacy: 'Chính sách bảo mật', terms: 'Điều khoản sử dụng', tagline: 'Kết nối châu Á và Nhật Bản\nỨng dụng học chăm sóc đa ngôn ngữ', pledge: '2% doanh thu cho giáo dục' },
  tl: { learning: 'Mga Feature sa Pag-aaral', service: 'Serbisyo', legal: 'Legal na Impormasyon', kiroku: 'AI Record Assistant', shiken: 'Pagsasanay sa Pagsusulit', roleplay: 'Role Play AI', progress: 'Progreso sa Pag-aaral', plan: 'Mga Plano', mission: 'Misyon at Tulay', tokusho: 'Impormasyon ng Nagbebenta', privacy: 'Patakaran sa Privacy', terms: 'Mga Tuntunin', tagline: 'Nag-uugnay ng Asya at Hapon\nMultilinggwal na app sa pag-aaral', pledge: '2% ng kita para sa edukasyon' },
  my: { learning: 'သင်ယူမှု လုပ်ဆောင်ချက်', service: 'ဝန်ဆောင်မှု', legal: 'တရားဥပဒေ သတင်းအချက်အလက်', kiroku: 'AI မှတ်တမ်း အကူ', shiken: 'စာမေးပွဲ လေ့ကျင့်', roleplay: 'AI Role Play', progress: 'သင်ယူမှု တိုးတက်မှု', plan: 'စျေးနှုန်း အစီအစဉ်', mission: 'ရည်မှန်းချက် & တံတား', tokusho: 'ရောင်းချသူ သတင်းအချက်', privacy: 'ကိုယ်ရေးကိုယ်တာ မူဝါဒ', terms: 'အသုံးပြုမှု စည်းမျဉ်း', tagline: 'အာရှနှင့် ဂျပန်ကို ချိတ်ဆက်သည်\nဘာသာစကားစုံ စောင့်ရှောက်မှု သင်ယူ app', pledge: 'ဝင်ငွေ ၂% ကို ပညာရေးအတွက်' },
  bn: { learning: 'শেখার বৈশিষ্ট্য', service: 'সেবা', legal: 'আইনি তথ্য', kiroku: 'AI রেকর্ড সহায়তা', shiken: 'পরীক্ষার অনুশীলন', roleplay: 'AI রোল প্লে', progress: 'শেখার অগ্রগতি', plan: 'মূল্য পরিকল্পনা', mission: 'লক্ষ্য ও সেতু', tokusho: 'বিক্রেতার তথ্য', privacy: 'গোপনীয়তা নীতি', terms: 'ব্যবহারের শর্তাবলী', tagline: 'এশিয়া ও জাপানকে সংযুক্ত করা\nবহুভাষিক পরিচর্যা শিক্ষা অ্যাপ', pledge: 'আয়ের ২% শিক্ষায় প্রদান' },
  ne: { learning: 'सिकाइ सुविधाहरू', service: 'सेवाहरू', legal: 'कानूनी जानकारी', kiroku: 'AI रेकर्ड सहायक', shiken: 'परीक्षा अभ्यास', roleplay: 'AI रोल प्ले', progress: 'सिकाइ प्रगति', plan: 'मूल्य योजना', mission: 'लक्ष्य र पुल', tokusho: 'विक्रेता जानकारी', privacy: 'गोपनीयता नीति', terms: 'उपयोग सर्तहरू', tagline: 'एसिया र जापानलाई जोड्दै\nबहुभाषिक स्याहार सिकाइ एप', pledge: 'आम्दानीको २% शिक्षामा' },
  km: { learning: 'មុខងារសិក្សា', service: 'សេវាកម្ម', legal: 'ព័ត៌មានផ្លូវច្បាប់', kiroku: 'ជំនួយការកត់ត្រា AI', shiken: 'ហាត់ប្រឡង', roleplay: 'AI Role Play', progress: 'វឌ្ឍនភាពការសិក្សា', plan: 'គម្រោងតម្លៃ', mission: 'បេសកកម្ម និងស្ពាន', tokusho: 'ព័ត៌មានអ្នកលក់', privacy: 'គោលការណ៍ភាពឯកជន', terms: 'លក្ខខណ្ឌប្រើប្រាស់', tagline: 'ភ្ជាប់អាស៊ី និងជប៉ុន\nកម្មវិធីរៀនការថែទាំពហុភាសា', pledge: '២% នៃប្រាក់ចំណូលសម្រាប់ការអប់រំ' },
};

export default function Footer() {
  const router = useRouter();
  const { lang } = useLang();
  const ft = FOOTER_TEXT[lang] || FOOTER_TEXT['ja'];

  return (
    <footer className="bg-gray-800 text-gray-300 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-white font-bold mb-3">🏥 介護先生Pro</p>
            <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">{ft.tagline}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">{ft.learning}</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><button onClick={() => router.push('/kiroku')} className="hover:text-white transition-colors">📝 {ft.kiroku}</button></li>
              <li><button onClick={() => router.push('/shiken')} className="hover:text-white transition-colors">📚 {ft.shiken}</button></li>
              <li><button onClick={() => router.push('/kijun')} className="hover:text-white transition-colors">📋 出題基準</button></li>
              <li><button onClick={() => router.push('/roleplay')} className="hover:text-white transition-colors">🤖 {ft.roleplay}</button></li>
              <li><button onClick={() => router.push('/progress')} className="hover:text-white transition-colors">📊 {ft.progress}</button></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">{ft.service}</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><button onClick={() => router.push('/plan')} className="hover:text-white transition-colors">💳 {ft.plan}</button></li>
              <li><button onClick={() => router.push('/mission')} className="hover:text-white transition-colors">🌏 {ft.mission}</button></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">{ft.legal}</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><button onClick={() => router.push('/tokusho')} className="hover:text-white transition-colors">📜 {ft.tokusho}</button></li>
              <li><button onClick={() => router.push('/privacy')} className="hover:text-white transition-colors">🔒 {ft.privacy}</button></li>
              <li><button onClick={() => router.push('/terms')} className="hover:text-white transition-colors">📋 {ft.terms}</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 アイプルーフ / 越智 宏志. All rights reserved.</p>
          <div className="flex gap-1 text-lg">
            {['🇯🇵','🇮🇩','🇻🇳','🇵🇭','🇲🇲','🇧🇩','🇳🇵','🇰🇭'].map((f, i) => (
              <span key={i}>{f}</span>
            ))}
          </div>
          <p className="text-xs text-green-400">💚 {ft.pledge}</p>
        </div>
      </div>
    </footer>
  );
}
