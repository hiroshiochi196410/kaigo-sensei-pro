'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LangContext';
import { getTodayWord, getRandomWords } from '@/lib/kaigo-reading';

const STORAGE_KEY_EXAM = 'kaigo_exam_date';
const STORAGE_KEY_BADGES = 'kaigo_badges';
const STORAGE_KEY_WORD = 'kaigo_word_date';

const EXAM_TEXT = {
  ja: {
    title: '📅 試験日を設定しましょう！',
    desc: '目標の試験日を入力すると、毎日カウントダウンが表示されます。自分で日付を入力することで、合格への意識が高まります！',
    label: '試験予定日',
    btn: '設定する',
    skip: 'あとで設定する',
    hint: '介護福祉士国家試験は例年1月下旬です',
  },
  id: {
    title: '📅 Atur Tanggal Ujian!',
    desc: 'Masukkan tanggal ujian target untuk melihat hitung mundur setiap hari.',
    label: 'Tanggal Ujian',
    btn: 'Atur',
    skip: 'Nanti saja',
    hint: 'Ujian Kaigo Fukushishi biasanya akhir Januari',
  },
  vi: {
    title: '📅 Đặt Ngày Thi!',
    desc: 'Nhập ngày thi mục tiêu để xem đếm ngược mỗi ngày.',
    label: 'Ngày Thi',
    btn: 'Đặt',
    skip: 'Để sau',
    hint: 'Kỳ thi Kaigo Fukushishi thường vào cuối tháng 1',
  },
  tl: {
    title: '📅 Itakda ang Petsa ng Pagsusulit!',
    desc: 'Ilagay ang target na petsa ng pagsusulit para makita ang countdown araw-araw.',
    label: 'Petsa ng Pagsusulit',
    btn: 'Itakda',
    skip: 'Mamaya na',
    hint: 'Ang pagsusulit ay karaniwang huling bahagi ng Enero',
  },
  my: {
    title: '📅 စာမေးပွဲ ရက်စွဲ သတ်မှတ်ပါ!',
    desc: 'ပစ်မှတ် စာမေးပွဲ ရက်စွဲ ထည့်သွင်းပြီး နေ့တိုင်း ကောင်းဒေါင်းကြည့်ပါ။',
    label: 'စာမေးပွဲ ရက်စွဲ',
    btn: 'သတ်မှတ်ရန်',
    skip: 'နောက်မှ',
    hint: 'စာမေးပွဲသည် ပုံမှန်အားဖြင့် ဇန်နဝါရီ နောက်ဆုံးတွင်ကျင်းပသည်',
  },
  bn: {
    title: '📅 পরীক্ষার তারিখ নির্ধারণ করুন!',
    desc: 'প্রতিদিন কাউন্টডাউন দেখতে লক্ষ্য পরীক্ষার তারিখ লিখুন।',
    label: 'পরীক্ষার তারিখ',
    btn: 'নির্ধারণ করুন',
    skip: 'পরে করব',
    hint: 'পরীক্ষা সাধারণত জানুয়ারির শেষে হয়',
  },
  ne: {
    title: '📅 परीक्षाको मिति तोक्नुहोस्!',
    desc: 'हरेक दिन काउन्टडाउन हेर्न लक्ष्य परीक्षाको मिति राख्नुहोस्।',
    label: 'परीक्षाको मिति',
    btn: 'तोक्नुहोस्',
    skip: 'पछि गर्छु',
    hint: 'परीक्षा सामान्यतया जनवरी अन्तमा हुन्छ',
  },
  km: {
    title: '📅 កំណត់ថ្ងៃប្រឡង!',
    desc: 'បញ្ចូលថ្ងៃប្រឡងគោលដៅ ដើម្បីមើលការរាប់ថយក្រោយរៀងរាល់ថ្ងៃ។',
    label: 'ថ្ងៃប្រឡង',
    btn: 'កំណត់',
    skip: 'ពេលក្រោយ',
    hint: 'ការប្រឡងជាធម្មតានៅចុងខែមករា',
  },
};

const DAILY_WORDS = [
  { ja: '摂取量', furi: 'せっしゅりょう', mean: { id: 'Jumlah asupan', vi: 'Lượng tiêu thụ', tl: 'Dami ng kinain', my: 'စားသုံးမှုပမာဏ', bn: 'গ্রহণের পরিমাণ', ne: 'सेवन मात्रा', km: 'បរិមាណទទួលទាន' } },
  { ja: '褥瘡', furi: 'じょくそう', mean: { id: 'Luka tekanan/bedsore', vi: 'Loét do tỳ đè', tl: 'Bedsore', my: 'အိပ်ရာ အနာ', bn: 'শয্যাক্ষত', ne: 'थिचिएको घाउ', km: 'របួសសម្ពាធ' } },
  { ja: '誤嚥', furi: 'ごえん', mean: { id: 'Aspirasi/tersedak', vi: 'Hít sặc', tl: 'Pagkalanghap', my: 'မမှန်မကန်မျိုချမှု', bn: 'অ্যাসপিরেশন', ne: 'गलत निल्नु', km: 'ការស្រូបចូលខុស' } },
  { ja: 'バイタルサイン', furi: 'ばいたるさいん', mean: { id: 'Tanda vital', vi: 'Dấu hiệu sinh tồn', tl: 'Vital signs', my: 'အသက်ရှင်မှု လက္ခဏာ', bn: 'গুরুত্বপূর্ণ লক্ষণ', ne: 'जीवन संकेत', km: 'សញ្ញាជីវិត' } },
  { ja: '自己決定', furi: 'じこけってい', mean: { id: 'Keputusan sendiri', vi: 'Tự quyết định', tl: 'Sariling desisyon', my: 'ကိုယ်ပိုင်ဆုံးဖြတ်ချက်', bn: 'স্বনির্ণয়', ne: 'आत्म-निर्णय', km: 'ការសម្រេចចិត្តដោយខ្លួនឯង' } },
  { ja: '尊厳', furi: 'そんげん', mean: { id: 'Martabat', vi: 'Phẩm giá', tl: 'Dignidad', my: 'ဂုဏ်သိက္ခာ', bn: 'মর্যাদা', ne: 'मर्यादा', km: 'សេចក្តីថ្លៃថ្នូរ' } },
  { ja: '排泄', furi: 'はいせつ', mean: { id: 'Buang air/ekskresi', vi: 'Bài tiết', tl: 'Pagdumi/pag-ihi', my: 'စွန့်ထုတ်မှု', bn: 'মলত্যাগ/প্রস্রাব', ne: 'मलमूत्र त्याग', km: 'ការបញ្ចេញជាតិ' } },
  { ja: '拘縮', furi: 'こうしゅく', mean: { id: 'Kontraktur', vi: 'Co cứng', tl: 'Contracture', my: 'ကြွက်သား ကျုံ့မှု', bn: 'সংকোচন', ne: 'संकुचन', km: 'ការរួញសន្លាក់' } },
  { ja: '申し送り', furi: 'もうしおくり', mean: { id: 'Serah terima', vi: 'Bàn giao', tl: 'Handover', my: 'လွှဲပြောင်းမှု', bn: 'হ্যান্ডওভার', ne: 'हस्तान्तरण', km: 'ការប្រគល់ទំនួលខុសត្រូវ' } },
  { ja: 'ヒヤリハット', furi: 'ひやりはっと', mean: { id: 'Near miss/hampir celaka', vi: 'Sự cố suýt xảy ra', tl: 'Near miss', my: 'အန္တရာယ်နီးပါးဖြစ်ရပ်', bn: 'প্রায় দুর্ঘটনা', ne: 'लगभग दुर्घटना', km: 'ហេតុការណ៍ជិតគ្រោះ' } },
];

const BADGES = [
  { id: 'first_kiroku', icon: '📝', name: '初めての記録', condition: 'AI記録を初めて使用' },
  { id: 'first_shiken', icon: '📚', name: '初めての挑戦', condition: '試験対策を初めて使用' },
  { id: 'first_roleplay', icon: '🤖', name: '初めての会話', condition: 'ロールプレイを初めて使用' },
  { id: 'streak_3', icon: '🔥', name: '3日連続', condition: '3日間連続学習' },
  { id: 'streak_7', icon: '⚡', name: '1週間連続', condition: '7日間連続学習' },
  { id: 'streak_30', icon: '🌟', name: '1ヶ月連続', condition: '30日間連続学習' },
  { id: 'shiken_10', icon: '🎯', name: '10問クリア', condition: '試験対策10問正解' },
  { id: 'shiken_50', icon: '🏅', name: '50問クリア', condition: '試験対策50問正解' },
  { id: 'exam_set', icon: '📅', name: '目標設定', condition: '試験日を設定' },
];

export function ExamDatePopup({ onClose }) {
  const { lang } = useLang();
  const tx = EXAM_TEXT[lang] || EXAM_TEXT['ja'];
  const [date, setDate] = useState('2027-01-31');

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY_EXAM, date);
    // バッジ付与
    const badges = JSON.parse(localStorage.getItem(STORAGE_KEY_BADGES) || '[]');
    if (!badges.includes('exam_set')) {
      badges.push('exam_set');
      localStorage.setItem(STORAGE_KEY_BADGES, JSON.stringify(badges));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎯</div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-2">{tx.title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{tx.desc}</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 mb-5">
          <label className="block text-sm font-bold text-blue-700 mb-2">{tx.label}</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-lg font-bold text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <p className="text-xs text-blue-500 mt-2">💡 {tx.hint}</p>
        </div>

        <button onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 rounded-2xl text-lg transition-colors mb-3">
          📅 {tx.btn}
        </button>
        <button onClick={onClose}
          className="w-full text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors">
          {tx.skip}
        </button>
      </div>
    </div>
  );
}

export function CountdownBanner() {
  const { lang } = useLang();
  const [days, setDays] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [examDate, setExamDate] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EXAM);
    if (saved) {
      setExamDate(saved);
      const diff = Math.ceil((new Date(saved) - new Date()) / (1000 * 60 * 60 * 24));
      setDays(diff);
    } else {
      // 初回は30秒後にポップアップ
      const timer = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const messages = {
    ja: { set: '試験日を設定する 📅', countdown: `試験まであと`, unit: '日！', encourage: ['一緒に頑張りましょう！💪', '毎日少しずつ前進！🌱', '合格まであと少し！🎯', '今日も練習しよう！✨'] },
    id: { set: 'Atur tanggal ujian 📅', countdown: 'Sisa', unit: 'hari!', encourage: ['Semangat! 💪', 'Maju sedikit demi sedikit! 🌱', 'Hampir lulus! 🎯', 'Latihan hari ini! ✨'] },
    vi: { set: 'Đặt ngày thi 📅', countdown: 'Còn', unit: 'ngày!', encourage: ['Cố lên! 💪', 'Tiến từng bước! 🌱', 'Sắp đậu rồi! 🎯', 'Luyện tập hôm nay! ✨'] },
    tl: { set: 'Itakda ang petsa ng pagsusulit 📅', countdown: 'Natitira', unit: 'araw!', encourage: ['Kaya mo! 💪', 'Unti-unting sulong! 🌱', 'Malapit na! 🎯', 'Mag-aral ngayon! ✨'] },
    my: { set: 'စာမေးပွဲ ရက်စွဲ သတ်မှတ်ပါ 📅', countdown: 'ကျန်သည်', unit: 'ရက်!', encourage: ['ကြိုးစားပါ! 💪', 'တစ်နေ့တစ်နေ့ တိုးတက်! 🌱', 'နီးလာပြီ! 🎯', 'ယနေ့ လေ့ကျင့်ပါ! ✨'] },
    bn: { set: 'পরীক্ষার তারিখ নির্ধারণ করুন 📅', countdown: 'বাকি', unit: 'দিন!', encourage: ['চেষ্টা করুন! 💪', 'ধীরে ধীরে এগিয়ে যান! 🌱', 'প্রায় হয়ে গেছে! 🎯', 'আজ অনুশীলন করুন! ✨'] },
    ne: { set: 'परीक्षाको मिति तोक्नुहोस् 📅', countdown: 'बाँकी', unit: 'दिन!', encourage: ['मेहनत गर्नुहोस्! 💪', 'बिस्तारै अगाडि! 🌱', 'लगभग भयो! 🎯', 'आज अभ्यास गर्नुहोस्! ✨'] },
    km: { set: 'កំណត់ថ្ងៃប្រឡង 📅', countdown: 'នៅសល់', unit: 'ថ្ងៃ!', encourage: ['ព្យាយាម! 💪', 'ជំហានម្តងៗ! 🌱', 'ជិតហើយ! 🎯', 'ហាត់ប្រាណថ្ងៃនេះ! ✨'] },
  };

  const m = messages[lang] || messages['ja'];
  const encourage = m.encourage[Math.floor(Date.now() / 86400000) % m.encourage.length];

  if (!examDate) {
    return (
      <>
        {showPopup && <ExamDatePopup onClose={() => {
          setShowPopup(false);
          const saved = localStorage.getItem(STORAGE_KEY_EXAM);
          if (saved) {
            setExamDate(saved);
            setDays(Math.ceil((new Date(saved) - new Date()) / (1000 * 60 * 60 * 24)));
          }
        }} />}
        <button onClick={() => setShowPopup(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl px-4 py-3 text-sm font-bold hover:opacity-90 transition-opacity text-center">
          🎯 {m.set}
        </button>
      </>
    );
  }

  const color = days <= 30 ? 'from-red-500 to-orange-500' : days <= 90 ? 'from-yellow-500 to-orange-400' : 'from-green-500 to-emerald-400';

  return (
    <div className={`bg-gradient-to-r ${color} text-white rounded-2xl px-5 py-4 flex items-center justify-between`}>
      <div>
        <p className="text-xs opacity-80 mb-0.5">{m.countdown}</p>
        <p className="text-3xl font-extrabold">{days}<span className="text-lg ml-1">{m.unit}</span></p>
        <p className="text-xs opacity-90 mt-1">{encourage}</p>
      </div>
      <div className="text-5xl">
        {days <= 30 ? '🔥' : days <= 90 ? '⚡' : '🎯'}
      </div>
    </div>
  );
}

export function DailyWord() {
  const { lang } = useLang();
  const [word, setWord] = useState(null);
  const [showEx, setShowEx] = useState(false);

  useEffect(() => {
    setWord(getTodayWord());
  }, []);

  if (!word) return null;

  const speak = (text) => {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP'; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const labels = { ja: '今日の介護用語', id: 'Kata perawatan hari ini', vi: 'Từ vựng hôm nay', tl: 'Salitang pangkalinga ngayon', my: 'ယနေ့ စောင့်ရှောက်မှု ဝေါဟာရ', bn: 'আজকের পরিচর্যা শব্দ', ne: 'आजको स्याहार शब्द', km: 'ពាក្យថែទាំថ្ងៃនេះ' };
  const exLabel = { ja: '例文', id: 'Contoh', vi: 'Ví dụ', tl: 'Halimbawa', my: 'ဥပမာ', bn: 'উদাহরণ', ne: 'उदाहरण', km: 'ឧទាហរណ៍' };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
      <p className="text-xs font-bold text-yellow-600 mb-2">💬 {labels[lang] || labels['ja']}</p>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-extrabold text-gray-800">{word.ja}</p>
            <p className="text-sm text-gray-500">（{word.furi}）</p>
          </div>
          <p className="text-xs text-blue-600 mt-0.5">{word.en}</p>
          {lang !== 'ja' && word.mean?.[lang] && (
            <p className="text-sm text-green-700 font-semibold mt-1">→ {word.mean[lang]}</p>
          )}
          {showEx && word.example && (
            <p className="text-xs text-gray-600 mt-2 bg-white rounded-lg p-2 border border-yellow-200">
              📝 {word.example}
            </p>
          )}
          <button onClick={() => setShowEx(v => !v)}
            className="mt-2 text-xs text-yellow-700 border border-yellow-300 rounded-full px-2 py-0.5 hover:bg-yellow-100">
            {showEx ? '▲' : '▼'} {exLabel[lang] || '例文'}
          </button>
        </div>
        <button onClick={() => speak(word.ja)}
          className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-full px-3 py-2 text-xs font-bold transition-colors flex-shrink-0">
          🔊
        </button>
      </div>
    </div>
  );
}

export function BadgeDisplay() {
  const [earned, setEarned] = useState([]);
  const labels = { ja: '獲得バッジ', id: 'Lencana', vi: 'Huy hiệu', tl: 'Mga Badge', my: 'ဘဒ်ဂျ်များ', bn: 'ব্যাজ', ne: 'ब्याजहरू', km: 'បណ្ណសញ្ញា' };
  const { lang } = useLang();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_BADGES) || '[]');
    setEarned(saved);
  }, []);

  const earnedBadges = BADGES.filter(b => earned.includes(b.id));
  if (earnedBadges.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4">
      <p className="text-xs font-bold text-gray-500 mb-3">🏆 {labels[lang] || labels['ja']}</p>
      <div className="flex flex-wrap gap-2">
        {earnedBadges.map(b => (
          <div key={b.id} className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-full px-3 py-1.5">
            <span className="text-lg">{b.icon}</span>
            <span className="text-xs font-bold text-yellow-800">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function awardBadge(badgeId) {
  if (typeof window === 'undefined') return;
  const badges = JSON.parse(localStorage.getItem(STORAGE_KEY_BADGES) || '[]');
  if (!badges.includes(badgeId)) {
    badges.push(badgeId);
    localStorage.setItem(STORAGE_KEY_BADGES, JSON.stringify(badges));
  }
}
