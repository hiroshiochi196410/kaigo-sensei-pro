'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'ningensongen', label: '人間の尊厳と自立', icon: '🌸', color: '#e879a0', bg: '#fff0f6', description: '尊厳・自立・自己決定・権利擁護' },
  { id: 'ningen_kankei', label: '人間関係とコミュニケーション', icon: '💬', color: '#38bdf8', bg: '#f0f9ff', description: 'コミュニケーション技術・信頼関係' },
  { id: 'shakai_rikai', label: '社会の理解', icon: '🏛️', color: '#a78bfa', bg: '#f5f3ff', description: '社会保障制度・介護保険・福祉サービス' },
  { id: 'kaigo_kiban', label: '介護の基本', icon: '🤝', color: '#34d399', bg: '#f0fdf4', description: '介護理念・ICF・チームケア・安全' },
  { id: 'comm_gijutsu', label: 'コミュニケーション技術', icon: '🗣️', color: '#fb923c', bg: '#fff7ed', description: '面接技法・記録・報告・相談援助' },
  { id: 'seikatsu_shien', label: '生活支援技術', icon: '🏠', color: '#2dd4bf', bg: '#f0fdfa', description: '食事・入浴・排泄・移動・整容・睡眠' },
  { id: 'kaigo_katei', label: '介護過程', icon: '📋', color: '#818cf8', bg: '#eef2ff', description: 'アセスメント・計画・実施・評価' },
  { id: 'hattatsu_rouka', label: '発達と老化の理解', icon: '🌱', color: '#86efac', bg: '#f0fdf4', description: '発達段階・老化の特徴・高齢者の心理' },
  { id: 'ninchisho', label: '認知症の理解', icon: '🧠', color: '#e879f9', bg: '#fdf4ff', description: 'アルツハイマー型・BPSD・パーソンセンタードケア' },
  { id: 'shougai_rikai', label: '障害の理解', icon: '♿', color: '#fb7185', bg: '#fff1f2', description: '身体・知的・精神・発達・難病' },
  { id: 'kokoro_karada', label: 'こころとからだのしくみ', icon: '💊', color: '#f87171', bg: '#fef2f2', description: '医療的ケア・喀痰吸引・経管栄養' },
];

const DIFFICULTY = [
  { id: 'basic', label: '基礎', icon: '⭐', desc: 'やさしい' },
  { id: 'standard', label: '標準', icon: '⭐⭐', desc: 'ふつう' },
  { id: 'advanced', label: '応用', icon: '⭐⭐⭐', desc: 'むずかしい' },
];

const LANGS = [
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'id', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'vi', flag: '🇻🇳', name: 'Việt Nam' },
  { code: 'tl', flag: '🇵🇭', name: 'Filipino' },
  { code: 'my', flag: '🇲🇲', name: 'မြန်မာ' },
  { code: 'bn', flag: '🇧🇩', name: 'বাংলা' },
  { code: 'ne', flag: '🇳🇵', name: 'नेपाली' },
  { code: 'km', flag: '🇰🇭', name: 'ខ្មែរ' },
];

const T = {
  ja: {
    title: '介護福祉士 国家試験対策',
    subtitle: 'あなたの努力は、きっと未来につながります',
    selectSubject: '科目を選ぼう',
    selectDiff: '難易度',
    start: 'スタート！',
    selectPrompt: '科目を選んでください',
    next: '次の問題へ',
    correct: '正解！素晴らしい！',
    wrong: '惜しい！次は頑張ろう！',
    point: '重要ポイント',
    back: '科目選択に戻る',
    top: 'トップへ',
    generating: 'AIが問題を作っています...',
    retry: 'もう一度試す',
    failed: '問題の生成に失敗しました',
    streak: '連続正解中！',
    scoreLabel: '正解数',
    cheer: ['よく頑張っています！', '集中力が素晴らしい！', 'その調子！', '諦めないで！', '合格まで一歩一歩！'],
    restMsg: 'たくさん頑張ったね。少し休んでから続けよう 🌸',
  },
  id: {
    title: 'Ujian Perawatan Sosial',
    subtitle: 'Usaha Anda pasti akan membuahkan hasil',
    selectSubject: 'Pilih mata pelajaran',
    selectDiff: 'Tingkat kesulitan',
    start: 'Mulai!',
    selectPrompt: 'Silakan pilih mata pelajaran',
    next: 'Soal berikutnya',
    correct: 'Benar! Luar biasa!',
    wrong: 'Sayang! Coba lagi!',
    point: 'Poin penting',
    back: 'Kembali ke pilihan',
    top: 'Ke halaman utama',
    generating: 'AI sedang membuat soal...',
    retry: 'Coba lagi',
    failed: 'Gagal membuat soal',
    streak: 'Jawaban benar beruntun!',
    scoreLabel: 'Jawaban benar',
    cheer: ['Kerja bagus!', 'Konsentrasimu luar biasa!', 'Teruskan!', 'Jangan menyerah!', 'Selangkah demi selangkah!'],
    restMsg: 'Kamu sudah bekerja keras. Istirahat sebentar ya 🌸',
  },
  vi: {
    title: 'Thi Chứng Chỉ Chăm Sóc',
    subtitle: 'Nỗ lực của bạn chắc chắn sẽ có kết quả',
    selectSubject: 'Chọn môn học',
    selectDiff: 'Độ khó',
    start: 'Bắt đầu!',
    selectPrompt: 'Vui lòng chọn môn học',
    next: 'Câu hỏi tiếp theo',
    correct: 'Đúng rồi! Tuyệt vời!',
    wrong: 'Tiếc quá! Cố lên!',
    point: 'Điểm quan trọng',
    back: 'Quay lại chọn môn',
    top: 'Về trang chủ',
    generating: 'AI đang tạo câu hỏi...',
    retry: 'Thử lại',
    failed: 'Tạo câu hỏi thất bại',
    streak: 'Đang trả lời đúng liên tiếp!',
    scoreLabel: 'Số câu đúng',
    cheer: ['Bạn làm tốt lắm!', 'Sự tập trung tuyệt vời!', 'Cứ tiếp tục!', 'Đừng bỏ cuộc!', 'Từng bước một!'],
    restMsg: 'Bạn đã cố gắng rất nhiều. Hãy nghỉ một chút nhé 🌸',
  },
  tl: {
    title: 'Pagsusulit sa Pangangalaga',
    subtitle: 'Ang iyong pagsisikap ay mamumunga',
    selectSubject: 'Pumili ng paksa',
    selectDiff: 'Antas ng kahirapan',
    start: 'Magsimula!',
    selectPrompt: 'Pakipili ang paksa',
    next: 'Susunod na tanong',
    correct: 'Tama! Napakahusay!',
    wrong: 'Halos na! Subukan ulit!',
    point: 'Mahalagang punto',
    back: 'Bumalik sa pagpili',
    top: 'Pumunta sa homepage',
    generating: 'Gumagawa ng tanong ang AI...',
    retry: 'Subukan ulit',
    failed: 'Hindi nagawa ang tanong',
    streak: 'Sunud-sunod na tamang sagot!',
    scoreLabel: 'Tamang sagot',
    cheer: ['Magaling ka!', 'Kahanga-hangang konsentrasyon!', 'Ituloy mo!', 'Huwag sumuko!', 'Isa-isang hakbang!'],
    restMsg: 'Nagsikap ka nang husto. Magpahinga muna 🌸',
  },
  my: {
    title: 'စောင့်ရှောက်မှု စာမေးပွဲ',
    subtitle: 'သင်၏ကြိုးစားမှုသည် အသီးအပွင့်ရမည်',
    selectSubject: 'ဘာသာရပ်ရွေးချယ်ပါ',
    selectDiff: 'ခက်ခဲမှုအဆင့်',
    start: 'စတင်မည်!',
    selectPrompt: 'ဘာသာရပ်တစ်ခုရွေးချယ်ပါ',
    next: 'နောက်မေးခွန်း',
    correct: 'မှန်သည်! အံ့ဩဖွယ်!',
    wrong: 'နီးနီးစပ်စပ်! ဆက်ကြိုးစားပါ!',
    point: 'အရေးကြီးသောအချက်',
    back: 'ရွေးချယ်မှုသို့ပြန်',
    top: 'ပင်မစာမျက်နှာ',
    generating: 'AI မေးခွန်းဖန်တီးနေသည်...',
    retry: 'ထပ်မံကြိုးစားပါ',
    failed: 'မေးခွန်းဖန်တီးမှုမအောင်မြင်ပါ',
    streak: 'ဆက်တိုက်မှန်နေသည်!',
    scoreLabel: 'မှန်သောအဖြေ',
    cheer: ['ကောင်းကောင်းလုပ်နေသည်!', 'အာရုံစူးစိုက်မှုကောင်းသည်!', 'ဆက်လုပ်ပါ!', 'မလျှော့ပါနှင့်!', 'တစ်ခြေလှမ်းချင်း!'],
    restMsg: 'အများကြီးကြိုးစားခဲ့သည်။ နည်းနည်းနားပါ 🌸',
  },
  bn: {
    title: 'যত্ন পরীক্ষা প্রস্তুতি',
    subtitle: 'আপনার পরিশ্রম অবশ্যই ফল দেবে',
    selectSubject: 'বিষয় নির্বাচন করুন',
    selectDiff: 'কঠিনতার মাত্রা',
    start: 'শুরু করুন!',
    selectPrompt: 'একটি বিষয় নির্বাচন করুন',
    next: 'পরের প্রশ্ন',
    correct: 'সঠিক! অসাধারণ!',
    wrong: 'কাছাকাছি! আবার চেষ্টা করুন!',
    point: 'গুরুত্বপূর্ণ বিষয়',
    back: 'নির্বাচনে ফিরুন',
    top: 'হোম পেজে যান',
    generating: 'AI প্রশ্ন তৈরি করছে...',
    retry: 'আবার চেষ্টা করুন',
    failed: 'প্রশ্ন তৈরি ব্যর্থ হয়েছে',
    streak: 'ধারাবাহিক সঠিক উত্তর!',
    scoreLabel: 'সঠিক উত্তর',
    cheer: ['খুব ভালো করছেন!', 'দারুণ মনোযোগ!', 'চালিয়ে যান!', 'হাল ছাড়বেন না!', 'একধাপ একধাপ!'],
    restMsg: 'অনেক পরিশ্রম করেছেন। একটু বিশ্রাম নিন 🌸',
  },
  ne: {
    title: 'हेरचाह परीक्षा तयारी',
    subtitle: 'तपाईंको मेहनत अवश्य फल दिनेछ',
    selectSubject: 'विषय छान्नुहोस्',
    selectDiff: 'कठिनाइ स्तर',
    start: 'सुरु गर्नुस्!',
    selectPrompt: 'कृपया विषय छान्नुहोस्',
    next: 'अर्को प्रश्न',
    correct: 'सही! अद्भुत!',
    wrong: 'नजिकै! फेरि प्रयास गर्नुस्!',
    point: 'महत्वपूर्ण बिन्दु',
    back: 'छनोटमा फर्कनुस्',
    top: 'होमपेजमा जानुस्',
    generating: 'AI प्रश्न बनाउँदैछ...',
    retry: 'फेरि प्रयास गर्नुस्',
    failed: 'प्रश्न बनाउन असफल',
    streak: 'लगातार सही उत्तर!',
    scoreLabel: 'सही उत्तर',
    cheer: ['राम्रो गर्दैहुनुहुन्छ!', 'अद्भुत एकाग्रता!', 'जारी राख्नुस्!', 'हार नमान्नुस्!', 'एक एक कदम!'],
    restMsg: 'धेरै मेहनत गर्नुभयो। अलि आराम गर्नुस् 🌸',
  },
  km: {
    title: 'ការប្រឡងថែទាំ',
    subtitle: 'ការខិតខំប្រឹងប្រែងរបស់អ្នកនឹងផ្តល់ផល',
    selectSubject: 'ជ្រើសរើសមុខវិជ្ជា',
    selectDiff: 'កម្រិតពិបាក',
    start: 'ចាប់ផ្តើម!',
    selectPrompt: 'សូមជ្រើសរើសមុខវិជ្ជា',
    next: 'សំណួរបន្ទាប់',
    correct: 'ត្រឹមត្រូវ! អស្ចារ្យ!',
    wrong: 'ជិតហើយ! ព្យាយាមទៀត!',
    point: 'ចំណុចសំខាន់',
    back: 'ត្រឡប់ទៅការជ្រើសរើស',
    top: 'ទៅទំព័រដើម',
    generating: 'AI កំពុងបង្កើតសំណួរ...',
    retry: 'ព្យាយាមម្តងទៀត',
    failed: 'បង្កើតសំណួរបានបរាជ័យ',
    streak: 'ឆ្លើយត្រូវជាប់ៗគ្នា!',
    scoreLabel: 'ចំលើយត្រឹមត្រូវ',
    cheer: ['អ្នកធ្វើបានល្អ!', 'ការផ្តោតអារម្មណ៍អស្ចារ្យ!', 'បន្តទៀត!', 'កុំបោះបង់!', 'ជំហានម្តងមួយ!'],
    restMsg: 'អ្នកបានខិតខំយ៉ាងខ្លាំង។ សម្រាកបន្តិចទៀត 🌸',
  },
};

// 花びらアニメーション用コンポーネント
function Petals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: '-20px',
          fontSize: '20px',
          animation: `fall ${2 + Math.random() * 2}s ease-in forwards`,
          animationDelay: `${i * 0.15}s`,
        }}>🌸</div>
      ))}
      <style>{`
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ShikenPage() {
  const router = useRouter();
  const [lang, setLang] = useState('ja');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('standard');
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [phase, setPhase] = useState('select');
  const [showPetals, setShowPetals] = useState(false);
  const [cheerIndex, setCheerIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const questionCount = useRef(0);

  const t = T[lang] || T.ja;
  const cat = CATEGORIES.find(c => c.id === selectedCategory);

  // 10問ごとに休憩メッセージ
  useEffect(() => {
    if (questionCount.current > 0 && questionCount.current % 10 === 0) {
      setShowRest(true);
      setTimeout(() => setShowRest(false), 4000);
    }
  }, [questionCount.current]);

  const generateQuestion = useCallback(async (categoryId, difficulty) => {
    setLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    const c = CATEGORIES.find(x => x.id === categoryId);
    const d = DIFFICULTY.find(x => x.id === difficulty);
    try {
      const res = await fetch('/api/shiken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryId,
          categoryLabel: c.label,
          description: c.description,
          difficulty,
          difficultyLabel: d.label,
          lang,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error();
      setQuestion({ ...data, categoryId, difficulty });
      questionCount.current += 1;
    } catch {
      setQuestion({ error: true });
    } finally {
      setLoading(false);
    }
  }, [lang]);

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === question.answer;
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak >= 3) setShowPetals(true);
      setTimeout(() => setShowPetals(false), 3000);
      setCheerIndex(Math.floor(Math.random() * t.cheer.length));
    } else {
      setStreak(0);
    }
  };

  const handleStart = () => {
    if (!selectedCategory) return;
    setPhase('quiz');
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    questionCount.current = 0;
    generateQuestion(selectedCategory, selectedDifficulty);
  };

  const handleNext = () => generateQuestion(selectedCategory, selectedDifficulty);
  const handleBack = () => { setPhase('select'); setQuestion(null); setSelectedAnswer(null); setShowResult(false); };

  const accuracy = score.total > 0 ? Math.round(score.correct / score.total * 100) : 0;

  // ===== 選択画面 =====
  if (phase === 'select') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea11 0%, #764ba211 50%, #f093fb11 100%)', backgroundColor: '#fafbff' }} className="pb-20">
        <div className="max-w-lg mx-auto px-4 py-6">

          {/* トップへ */}
          <button onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-500 mb-5 transition-colors">
            ← {t.top}
          </button>

          {/* 言語切替 */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                style={lang === l.code ? { background: '#6366f1', color: 'white', borderColor: '#6366f1' } : {}}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-600 transition-all hover:border-indigo-300`}>
                {l.flag} {l.name}
              </button>
            ))}
          </div>

          {/* ヘッダー */}
          <div className="text-center mb-7">
            <div className="text-4xl mb-2">📝</div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">{t.title}</h1>
            <p className="text-sm text-indigo-500 font-medium">{t.subtitle}</p>

            {score.total > 0 && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100 text-center">
                  <p className="text-xs text-gray-400">{t.scoreLabel}</p>
                  <p className="text-lg font-bold text-indigo-600">{score.correct}<span className="text-sm text-gray-400">/{score.total}</span></p>
                </div>
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100 text-center">
                  <p className="text-xs text-gray-400">正解率</p>
                  <p className="text-lg font-bold" style={{ color: accuracy >= 70 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444' }}>{accuracy}%</p>
                </div>
                {streak > 0 && (
                  <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-amber-200 text-center">
                    <p className="text-xs text-amber-500">🔥 streak</p>
                    <p className="text-lg font-bold text-amber-500">{streak}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 難易度 */}
          <div className="mb-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t.selectDiff}</p>
            <div className="flex gap-2">
              {DIFFICULTY.map(d => (
                <button key={d.id} onClick={() => setSelectedDifficulty(d.id)}
                  style={selectedDifficulty === d.id ? { background: '#6366f1', color: 'white', borderColor: '#6366f1' } : {}}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold border-2 border-gray-200 bg-white text-gray-600 transition-all hover:border-indigo-300 flex flex-col items-center gap-0.5">
                  <span>{d.icon}</span>
                  <span className="text-xs">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 科目一覧 */}
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">{t.selectSubject}</p>
          <div className="space-y-2 mb-7">
            {CATEGORIES.map((c, i) => (
              <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                style={selectedCategory === c.id ? { background: c.bg, borderColor: c.color, transform: 'scale(1.01)' } : {}}
                className="w-full text-left p-3.5 rounded-2xl border-2 border-gray-100 bg-white transition-all hover:border-gray-300 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{c.label}</p>
                    <p className="text-xs text-gray-400 truncate">{c.description}</p>
                  </div>
                  {selectedCategory === c.id && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ background: c.color }}>✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* スタートボタン */}
          <button onClick={handleStart} disabled={!selectedCategory}
            style={selectedCategory ? { background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` } : {}}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all shadow-lg ${!selectedCategory ? 'bg-gray-300 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'}`}>
            {selectedCategory ? `${cat.icon} ${t.start}` : t.selectPrompt}
          </button>
        </div>
      </div>
    );
  }

  // ===== クイズ画面 =====
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea08 0%, #764ba208 100%)', backgroundColor: '#fafbff' }} className="pb-20">
      {showPetals && <Petals />}

      <div className="max-w-lg mx-auto px-4 py-5">

        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/')} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-500 transition-colors text-sm">🏠</button>
            <button onClick={handleBack} className="text-sm text-gray-500 hover:text-gray-700">← {t.back}</button>
          </div>
          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-bold text-amber-600">{streak} {t.streak}</span>
              </div>
            )}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1">
              <span className="text-xs font-bold text-indigo-600">{score.correct}</span>
              <span className="text-xs text-gray-400">/{score.total}</span>
            </div>
          </div>
        </div>

        {/* 科目バッジ */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm px-3 py-1 rounded-full font-medium text-white text-xs" style={{ background: cat.color }}>
            {cat.icon} {cat.label}
          </span>
          <div className="flex gap-1">
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center transition-all ${lang === l.code ? 'ring-2 ring-indigo-400 scale-110' : 'opacity-60 hover:opacity-100'}`}>
                {l.flag}
              </button>
            ))}
          </div>
        </div>

        {/* 休憩メッセージ */}
        {showRest && (
          <div className="mb-4 bg-pink-50 border border-pink-200 rounded-2xl p-3 text-center">
            <p className="text-sm text-pink-600">{t.restMsg}</p>
          </div>
        )}

        {/* ローディング */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin" />
              <div className="absolute inset-2 rounded-full flex items-center justify-center text-xl">🧠</div>
            </div>
            <p className="text-sm text-gray-400">{t.generating}</p>
          </div>
        )}

        {/* エラー */}
        {!loading && question?.error && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">😔</p>
            <p className="text-gray-500 mb-6 text-sm">{t.failed}</p>
            <button onClick={handleNext} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
              {t.retry}
            </button>
          </div>
        )}

        {/* 問題 */}
        {!loading && question && !question.error && (
          <div className="space-y-3">

            {/* 問題カード */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: cat.color }}>{DIFFICULTY.find(d => d.id === question.difficulty)?.icon}</span>
                <span className="text-xs text-gray-400">Q{score.total + (showResult ? 0 : 1)}</span>
              </div>
              <p className="text-gray-800 font-medium leading-relaxed text-sm">{question.question}</p>
            </div>

            {/* 選択肢 */}
            <div className="space-y-2">
              {question.choices.map((choice, i) => {
                const isCorrect = i === question.answer;
                const isSelected = i === selectedAnswer;
                let bg = 'bg-white', border = 'border-gray-200', text = 'text-gray-700';
                if (showResult) {
                  if (isCorrect) { bg = 'bg-emerald-50'; border = 'border-emerald-400'; text = 'text-emerald-800'; }
                  else if (isSelected) { bg = 'bg-red-50'; border = 'border-red-400'; text = 'text-red-800'; }
                  else { bg = 'bg-gray-50'; border = 'border-gray-200'; text = 'text-gray-400'; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-medium transition-all ${bg} ${border} ${text} ${!showResult ? 'hover:border-indigo-300 hover:bg-indigo-50 active:scale-[0.99]' : ''}`}>
                    <span className="font-bold mr-2 opacity-60">{['A','B','C','D'][i]}.</span>
                    {choice}
                    {showResult && isCorrect && <span className="ml-2">✅</span>}
                    {showResult && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                  </button>
                );
              })}
            </div>

            {/* 結果 */}
            {showResult && (
              <div className={`rounded-3xl p-5 border ${selectedAnswer === question.answer ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                <p className={`font-bold text-base mb-1 ${selectedAnswer === question.answer ? 'text-emerald-700' : 'text-orange-700'}`}>
                  {selectedAnswer === question.answer ? `✅ ${t.correct}` : `💪 ${t.wrong}`}
                </p>
                {selectedAnswer === question.answer && streak >= 2 && (
                  <p className="text-sm text-amber-600 mb-2">🔥 {t.cheer[cheerIndex]}</p>
                )}
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{question.explanation}</p>
                <div className="bg-white rounded-2xl p-3 border border-gray-200">
                  <p className="text-xs font-bold text-indigo-600 mb-1">📌 {t.point}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{question.point}</p>
                </div>
              </div>
            )}

            {/* 次の問題ボタン */}
            {showResult && (
              <button onClick={handleNext}
                style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}bb)` }}
                className="w-full py-4 rounded-2xl font-bold text-white text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]">
                {t.next} →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
