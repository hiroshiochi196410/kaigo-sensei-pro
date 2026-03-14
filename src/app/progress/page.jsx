'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const PT = {
  ja: { title: '学習進捗ダッシュボード', today: '今日の学習', total: '累計', kiroku: 'AI記録アシスト', shiken: '試験対策', roleplay: 'ロールプレイ', times: '回', correct: '正解率', streak: '連続学習', days: '日', level: 'レベル', encouragement: 'よく頑張っています！毎日続けることが合格への近道です。', reset: 'データをリセット', back: 'トップへ戻る' },
  id: { title: 'Dashboard Progres Belajar', today: 'Belajar hari ini', total: 'Total', kiroku: 'Asisten Catatan AI', shiken: 'Latihan Ujian', roleplay: 'Role Play', times: 'kali', correct: 'Tingkat benar', streak: 'Belajar berturut-turut', days: 'hari', level: 'Level', encouragement: 'Kerja bagus! Terus belajar setiap hari adalah jalan menuju kelulusan.', reset: 'Reset data', back: 'Kembali ke Atas' },
  vi: { title: 'Bảng Tiến độ Học tập', today: 'Học hôm nay', total: 'Tổng cộng', kiroku: 'Trợ lý Ghi chép AI', shiken: 'Luyện thi', roleplay: 'Hội thoại', times: 'lần', correct: 'Tỷ lệ đúng', streak: 'Học liên tiếp', days: 'ngày', level: 'Cấp độ', encouragement: 'Cố lên! Học mỗi ngày là con đường dẫn đến thành công.', reset: 'Đặt lại dữ liệu', back: 'Về trang đầu' },
  tl: { title: 'Dashboard ng Progreso sa Pag-aaral', today: 'Pag-aaral ngayon', total: 'Kabuuan', kiroku: 'AI Record Assistant', shiken: 'Pagsasanay sa Pagsusulit', roleplay: 'Role Play', times: 'beses', correct: 'Tamang rate', streak: 'Magkakasunod na pag-aaral', days: 'araw', level: 'Antas', encouragement: 'Magaling! Ang pag-aaral araw-araw ay ang daan patungo sa tagumpay.', reset: 'I-reset ang data', back: 'Bumalik sa Itaas' },
  my: { title: 'သင်ယူမှု တိုးတက်မှု Dashboard', today: 'ယနေ့ သင်ယူမှု', total: 'စုစုပေါင်း', kiroku: 'AI မှတ်တမ်း', shiken: 'စာမေးပွဲ လေ့ကျင့်', roleplay: 'Role Play', times: 'ကြိမ်', correct: 'မှန်ကန်နှုန်း', streak: 'ဆက်တိုက် သင်ယူမှု', days: 'ရက်', level: 'အဆင့်', encouragement: 'ကောင်းပါသည်！ နေ့တိုင်း ဆက်လုပ်ပါ။', reset: 'ဒေတာ ပြန်လည်သတ်မှတ်', back: 'အပေါ်သို့' },
  bn: { title: 'শিক্ষার অগ্রগতি ড্যাশবোর্ড', today: 'আজকের শিক্ষা', total: 'মোট', kiroku: 'AI রেকর্ড', shiken: 'পরীক্ষা অনুশীলন', roleplay: 'রোল প্লে', times: 'বার', correct: 'সঠিক হার', streak: 'ধারাবাহিক শিক্ষা', days: 'দিন', level: 'স্তর', encouragement: 'চমৎকার! প্রতিদিন শেখা সাফল্যের পথ।', reset: 'ডেটা রিসেট', back: 'শীর্ষে ফিরুন' },
  ne: { title: 'सिकाइ प्रगति ड्यासबोर्ड', today: 'आजको सिकाइ', total: 'जम्मा', kiroku: 'AI रेकर्ड', shiken: 'परीक्षा अभ्यास', roleplay: 'रोल प्ले', times: 'पटक', correct: 'सही दर', streak: 'लगातार सिकाइ', days: 'दिन', level: 'स्तर', encouragement: 'राम्रो! हरेक दिन सिक्नु सफलताको बाटो हो।', reset: 'डेटा रिसेट गर्नुहोस्', back: 'माथि फर्कनुहोस्' },
  km: { title: 'ផ្ទាំងគ្រប់គ្រងវឌ្ឍនភាពការសិក្សា', today: 'ការសិក្សាថ្ងៃនេះ', total: 'សរុប', kiroku: 'AI កំណត់ត្រា', shiken: 'ហាត់ប្រឡង', roleplay: 'Role Play', times: 'ដង', correct: 'អត្រាត្រឹមត្រូវ', streak: 'ការសិក្សាបន្ត', days: 'ថ្ងៃ', level: 'កម្រិត', encouragement: 'ល្អណាស់! សិក្សារៀងរាល់ថ្ងៃគឺជាផ្លូវទៅរកភាពជោគជ័យ។', reset: 'កំណត់ទិន្នន័យឡើងវិញ', back: 'ត្រលប់ទៅដើម' },
};

const LEVELS = [
  { min: 0,   max: 9,   label: '🌱 入門',     color: 'text-gray-500' },
  { min: 10,  max: 29,  label: '📗 初級',     color: 'text-green-600' },
  { min: 30,  max: 59,  label: '📘 中級',     color: 'text-blue-600' },
  { min: 60,  max: 99,  label: '📙 上級',     color: 'text-orange-600' },
  { min: 100, max: Infinity, label: '🏆 合格レベル', color: 'text-yellow-600' },
];

function getLevel(total) {
  return LEVELS.find(l => total >= l.min && total <= l.max) || LEVELS[0];
}

const STORAGE_KEY = 'kaigo_progress';

function loadProgress() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveProgress(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function defaultProgress() {
  return {
    kiroku: { today: 0, total: 0 },
    shiken: { today: 0, total: 0, correct: 0 },
    roleplay: { today: 0, total: 0 },
    streak: 1,
    lastDate: new Date().toDateString(),
  };
}

export default function ProgressPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const pt = PT[lang] || PT['ja'];
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const saved = loadProgress() || defaultProgress();
    // 日付チェック：新しい日なら今日のカウントをリセット
    const today = new Date().toDateString();
    if (saved.lastDate !== today) {
      saved.kiroku.today = 0;
      saved.shiken.today = 0;
      saved.roleplay.today = 0;
      saved.streak = (saved.streak || 0) + 1;
      saved.lastDate = today;
      saveProgress(saved);
    }
    setProgress(saved);
  }, []);

  if (!progress) return <div className="min-h-screen bg-gray-50"><NavBar /></div>;

  const totalActions = progress.kiroku.total + progress.shiken.total + progress.roleplay.total;
  const level = getLevel(totalActions);
  const correctRate = progress.shiken.total > 0
    ? Math.round((progress.shiken.correct / progress.shiken.total) * 100)
    : 0;

  const stats = [
    { icon: '📝', label: pt.kiroku, today: progress.kiroku.today, total: progress.kiroku.total, color: 'bg-green-50 border-green-200', href: '/kiroku' },
    { icon: '📚', label: pt.shiken, today: progress.shiken.today, total: progress.shiken.total, color: 'bg-blue-50 border-blue-200', href: '/shiken' },
    { icon: '🤖', label: pt.roleplay, today: progress.roleplay.today, total: progress.roleplay.total, color: 'bg-purple-50 border-purple-200', href: '/roleplay' },
  ];

  // 週間の簡易グラフ（モック）
  const weekData = [3, 5, 2, 8, 4, 6, totalActions % 10 || 1];
  const maxVal = Math.max(...weekData, 1);
  const days7 = ['月', '火', '水', '木', '金', '土', '日'];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← {pt.back}
        </button>

        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">📊 {pt.title}</h1>
          <p className="text-orange-100 text-sm">{pt.encouragement}</p>
        </div>

        {/* レベル・ストリーク */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">{pt.level}</p>
            <p className={`text-2xl font-extrabold ${level.color}`}>{level.label}</p>
            <p className="text-xs text-gray-400 mt-1">累計 {totalActions} アクション</p>
            <div className="mt-3 bg-gray-100 rounded-full h-2">
              <div className="bg-orange-400 rounded-full h-2 transition-all"
                style={{ width: `${Math.min((totalActions % 30) / 30 * 100, 100)}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">{pt.streak}</p>
            <p className="text-4xl font-extrabold text-orange-500">{progress.streak}</p>
            <p className="text-xs text-gray-400 mt-1">{pt.days} 🔥</p>
            <p className="text-xs text-gray-400 mt-2">{pt.correct}：{correctRate}%</p>
          </div>
        </div>

        {/* 各機能の統計 */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {stats.map(s => (
            <button key={s.href} onClick={() => router.push(s.href)}
              className={`bg-gradient-to-r ${s.color} border rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all text-left`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{s.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{pt.today}：{s.today}{pt.times}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-gray-700">{s.total}</p>
                <p className="text-xs text-gray-400">{pt.total}</p>
              </div>
            </button>
          ))}
        </div>

        {/* 週間グラフ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <p className="text-sm font-bold text-gray-700 mb-4">📈 今週の学習アクション</p>
          <div className="flex items-end gap-2 h-20">
            {weekData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-orange-400 rounded-t-lg transition-all"
                  style={{ height: `${(v / maxVal) * 60}px` }} />
                <span className="text-xs text-gray-400">{days7[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* リセットボタン */}
        <button
          onClick={() => { saveProgress(defaultProgress()); setProgress(defaultProgress()); }}
          className="w-full text-sm text-gray-400 border border-gray-200 py-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          🔄 {pt.reset}
        </button>
      </main>
    </div>
  );
}
