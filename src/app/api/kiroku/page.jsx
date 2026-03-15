'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const TOTAL_PAGES = 29;

const KT = {
  ja: { title: '試験科目別出題基準', subtitle: '第38回介護福祉士国家試験', back: 'トップへ戻る', prev: '前のページ', next: '次のページ', page: 'ページ', of: '/', download: 'PDFをダウンロード', aiNote: '💡 この基準から試験問題が出題されます。試験対策ページと一緒に使いましょう！', goShiken: '試験対策で練習する', sections: ['Aパート：人間と社会', 'Bパート：介護', 'Cパート：こころとからだのしくみ'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  id: { title: 'Standar Soal Ujian per Mata Pelajaran', subtitle: 'Ujian Nasional Kaigo Fukushishi ke-38', back: 'Kembali', prev: 'Sebelumnya', next: 'Berikutnya', page: 'Halaman', of: '/', download: 'Unduh PDF', aiNote: '💡 Soal ujian diambil dari standar ini. Gunakan bersama halaman latihan!', goShiken: 'Latihan ujian', sections: ['Bagian A: Manusia & Masyarakat', 'Bagian B: Perawatan', 'Bagian C: Pikiran & Tubuh'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  vi: { title: 'Tiêu chuẩn đề thi theo môn học', subtitle: 'Kỳ thi Kaigo Fukushishi lần 38', back: 'Về đầu', prev: 'Trước', next: 'Tiếp', page: 'Trang', of: '/', download: 'Tải PDF', aiNote: '💡 Câu hỏi thi được lấy từ tiêu chuẩn này. Hãy dùng cùng trang luyện thi!', goShiken: 'Luyện thi', sections: ['Phần A: Con người & Xã hội', 'Phần B: Chăm sóc', 'Phần C: Tâm trí & Cơ thể'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  tl: { title: 'Pamantayan sa Pagsusulit ayon sa Paksa', subtitle: '38th Kaigo Fukushishi National Exam', back: 'Bumalik', prev: 'Nakaraan', next: 'Susunod', page: 'Pahina', of: '/', download: 'I-download ang PDF', aiNote: '💡 Ang mga tanong ay mula sa pamantayang ito. Gamitin kasama ang pagsasanay!', goShiken: 'Magsanay sa pagsusulit', sections: ['Bahagi A: Tao at Lipunan', 'Bahagi B: Pag-aalaga', 'Bahagi C: Isip at Katawan'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  my: { title: 'ဘာသာရပ်အလိုက် မေးခွန်းသတ်မှတ်ချက်', subtitle: 'အကြိမ် ၃၈ Kaigo Fukushishi စာမေးပွဲ', back: 'အပေါ်', prev: 'ယခင်', next: 'နောက်', page: 'စာမျက်နှာ', of: '/', download: 'PDF ဒေါင်းလုပ်', aiNote: '💡 မေးခွန်းများသည် ဤသတ်မှတ်ချက်မှ ထွက်သည်။ လေ့ကျင့်ရေးနှင့် တွဲသုံးပါ!', goShiken: 'စာမေးပွဲ လေ့ကျင့်ရန်', sections: ['A ပိုင်း - လူသားနှင့် လူ့အဖွဲ့အစည်း', 'B ပိုင်း - စောင့်ရှောက်မှု', 'C ပိုင်း - စိတ်နှင့် ကိုယ်ခန္ဓာ'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  bn: { title: 'বিষয় অনুযায়ী পরীক্ষার মানদণ্ড', subtitle: '৩৮তম Kaigo Fukushishi জাতীয় পরীক্ষা', back: 'ফিরুন', prev: 'পূর্ববর্তী', next: 'পরবর্তী', page: 'পৃষ্ঠা', of: '/', download: 'PDF ডাউনলোড', aiNote: '💡 এই মানদণ্ড থেকে পরীক্ষার প্রশ্ন আসে। অনুশীলন পৃষ্ঠার সাথে ব্যবহার করুন!', goShiken: 'পরীক্ষা অনুশীলন করুন', sections: ['A অংশ: মানুষ ও সমাজ', 'B অংশ: পরিচর্যা', 'C অংশ: মন ও শরীর'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  ne: { title: 'विषयअनुसार परीक्षाको मापदण्ड', subtitle: '३८औं Kaigo Fukushishi राष्ट्रिय परीक्षा', back: 'फर्कनुहोस्', prev: 'अघिल्लो', next: 'अर्को', page: 'पृष्ठ', of: '/', download: 'PDF डाउनलोड', aiNote: '💡 यो मापदण्डबाट परीक्षाका प्रश्नहरू आउँछन्। अभ्यास पृष्ठसँग सँगै प्रयोग गर्नुहोस्!', goShiken: 'परीक्षा अभ्यास गर्नुहोस्', sections: ['A भाग: मानव र समाज', 'B भाग: हेरचाह', 'C भाग: मन र शरीर'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
  km: { title: 'លក្ខណៈសំណួរប្រឡងតាមមុខវិជ្ជា', subtitle: 'ការប្រឡង Kaigo Fukushishi លើកទី ៣៨', back: 'ត្រលប់', prev: 'មុន', next: 'បន្ទាប់', page: 'ទំព័រ', of: '/', download: 'ទាញ PDF', aiNote: '💡 សំណួរប្រឡងចេញពីលក្ខណៈនេះ។ ប្រើជាមួយទំព័រហាត់!', goShiken: 'ហាត់ប្រឡង', sections: ['ផ្នែក A: មនុស្ស និងសង្គម', 'ផ្នែក B: ការថែទាំ', 'ផ្នែក C: ចិត្ត និងរាងកាយ'], pageMap: { A: [1,5], B: [6,18], C: [19,29] } },
};

// パートごとのページ範囲
const PARTS = [
  { key: 'A', pages: [1,2,3,4,5], color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'B', pages: [6,7,8,9,10,11,12,13,14,15,16,17,18], color: 'bg-green-50 border-green-200 text-green-700' },
  { key: 'C', pages: [19,20,21,22,23,24,25,26,27,28,29], color: 'bg-purple-50 border-purple-200 text-purple-700' },
];

export default function KijunPage() {
  const router = useRouter();
  const { lang } = useLang();
  const kt = KT[lang] || KT['ja'];
  const [currentPage, setCurrentPage] = useState(1);

  const currentPart = PARTS.find(p => p.pages.includes(currentPage));

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {kt.back}</button>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">📋 {kt.title}</h1>
          <p className="text-blue-100 text-sm">{kt.subtitle}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            {PARTS.map(p => (
              <button key={p.key} onClick={() => setCurrentPage(p.pages[0])}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
                {kt.sections[['A','B','C'].indexOf(p.key)]}
              </button>
            ))}
          </div>
        </div>

        {/* AIアドバイス */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-yellow-700">{kt.aiNote}</p>
          <button onClick={() => router.push('/shiken')}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            📚 {kt.goShiken}
          </button>
        </div>

        {/* ページナビゲーション上部 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentPart?.color}`}>
              {kt.sections[['A','B','C'].indexOf(currentPart?.key)]}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {kt.page} {currentPage} {kt.of} {TOTAL_PAGES}
          </p>
        </div>

        {/* PDF画像表示 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <img
            src={`/exam/page_${String(currentPage).padStart(2, '0')}.png`}
            alt={`Page ${currentPage}`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* ページナビゲーション下部 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 text-gray-700 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            ← {kt.prev}
          </button>

          {/* ページ番号グリッド */}
          <div className="flex gap-1 flex-wrap justify-center max-w-xs">
            {Array.from({length: TOTAL_PAGES}, (_, i) => i + 1).map(p => {
              const part = PARTS.find(pt => pt.pages.includes(p));
              return (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 text-xs rounded-lg font-bold transition-colors ${
                    p === currentPage
                      ? 'bg-indigo-600 text-white'
                      : part?.key === 'A' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : part?.key === 'B' ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}>
                  {p}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))}
            disabled={currentPage >= TOTAL_PAGES}
            className="bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 text-gray-700 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            {kt.next} →
          </button>
        </div>

        {/* PDFダウンロードリンク */}
        <div className="text-center">
          <a href="/exam/kijun_no38.pdf" download
            className="inline-flex items-center gap-2 text-sm text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors">
            📥 {kt.download}
          </a>
        </div>

      </main>
    </div>
  );
}
