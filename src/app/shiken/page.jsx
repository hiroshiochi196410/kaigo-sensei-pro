'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import { convertToReadable } from '@/lib/kaigo-reading';
import { useUser } from '@/components/UserAuth';

const CATEGORIES = {
  basic:     { icon: '🤝', ja: '介護の基本・倫理',     en: 'Basic & Ethics' },
  body:      { icon: '💪', ja: '身体介護',              en: 'Physical Care' },
  dementia:  { icon: '🧠', ja: '認知症ケア',            en: 'Dementia Care' },
  meal:      { icon: '🍱', ja: '食事・栄養',            en: 'Meal & Nutrition' },
  toilet:    { icon: '🚽', ja: '排泄介助',              en: 'Toilet Care' },
  bath:      { icon: '🛁', ja: '入浴介助',              en: 'Bathing Care' },
  emergency: { icon: '🚨', ja: 'ヒヤリハット・緊急時',  en: 'Emergency' },
  record:    { icon: '📝', ja: '介護記録・申し送り',     en: 'Recording' },
  kanji:     { icon: '📖', ja: '現場の重要漢字',        en: 'Kanji Practice' },
  law:       { icon: '⚖️', ja: '介護保険・制度',        en: 'Law & System' },
};

const DIFFICULTIES = {
  easy:   { ja: '基礎',   color: 'bg-green-100 text-green-700 border-green-300' },
  medium: { ja: '標準',   color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  hard:   { ja: '上級',   color: 'bg-red-100 text-red-700 border-red-300' },
};

const ST = {
  ja: { title: '国家試験対策', selectCat: 'カテゴリを選んでください', selectDiff: '難易度', generate: '問題を生成する', generating: 'AI が問題を生成中...', answer: '答えを見る', next: '次の問題', correct: '✅ 正解！', wrong: '❌ 不正解', explain: '解説', tip: '💡 現場のヒント', restart: '別のカテゴリへ', back: 'トップへ戻る', score: 'スコア', total: '問', reading: '読み方', free: '1日3問まで無料', proUnlimited: 'プロプランで無制限' },
  id: { title: 'Latihan Ujian Nasional', selectCat: 'Pilih kategori', selectDiff: 'Tingkat kesulitan', generate: 'Buat Soal', generating: 'AI sedang membuat soal...', answer: 'Lihat Jawaban', next: 'Soal Berikutnya', correct: '✅ Benar!', wrong: '❌ Salah', explain: 'Penjelasan', tip: '💡 Tips Lapangan', restart: 'Kategori Lain', back: 'Kembali', score: 'Skor', total: 'soal', reading: 'Cara baca', free: '3 soal/hari gratis', proUnlimited: 'Unlimited dengan Pro' },
  vi: { title: 'Luyện thi Quốc gia', selectCat: 'Chọn danh mục', selectDiff: 'Độ khó', generate: 'Tạo câu hỏi', generating: 'AI đang tạo câu hỏi...', answer: 'Xem đáp án', next: 'Câu tiếp theo', correct: '✅ Đúng!', wrong: '❌ Sai', explain: 'Giải thích', tip: '💡 Mẹo thực tế', restart: 'Danh mục khác', back: 'Về đầu', score: 'Điểm', total: 'câu', reading: 'Cách đọc', free: '3 câu/ngày miễn phí', proUnlimited: 'Không giới hạn với Pro' },
  tl: { title: 'Pagsasanay sa Pagsusulit', selectCat: 'Pumili ng kategorya', selectDiff: 'Antas ng kahirapan', generate: 'Gumawa ng Tanong', generating: 'Ginagawa ng AI ang tanong...', answer: 'Tingnan ang Sagot', next: 'Susunod na Tanong', correct: '✅ Tama!', wrong: '❌ Mali', explain: 'Paliwanag', tip: '💡 Tips sa Trabaho', restart: 'Ibang Kategorya', back: 'Bumalik', score: 'Marka', total: 'tanong', reading: 'Pagbabasa', free: '3 tanong/araw libre', proUnlimited: 'Walang limitasyon sa Pro' },
  my: { title: 'စာမေးပွဲ လေ့ကျင့်ရေး', selectCat: 'အမျိုးအစား ရွေးပါ', selectDiff: 'ခက်ခဲမှု', generate: 'မေးခွန်း ဖန်တီးရန်', generating: 'AI မေးခွန်း ဖန်တီးနေသည်...', answer: 'အဖြေ ကြည့်ရန်', next: 'နောက်မေးခွန်း', correct: '✅ မှန်သည်!', wrong: '❌ မှားသည်', explain: 'ရှင်းလင်းချက်', tip: '💡 လက်တွေ့ အကြံ', restart: 'အခြားအမျိုးအစား', back: 'အပေါ်', score: 'ရမှတ်', total: 'မေးခွန်း', reading: 'ဖတ်ပုံ', free: 'တစ်နေ့ ၃ ခုအခမဲ့', proUnlimited: 'Pro ဖြင့် အကန့်အသတ်မရှိ' },
  bn: { title: 'জাতীয় পরীক্ষার অনুশীলন', selectCat: 'বিভাগ বেছে নিন', selectDiff: 'কঠিনতার স্তর', generate: 'প্রশ্ন তৈরি করুন', generating: 'AI প্রশ্ন তৈরি করছে...', answer: 'উত্তর দেখুন', next: 'পরবর্তী প্রশ্ন', correct: '✅ সঠিক!', wrong: '❌ ভুল', explain: 'ব্যাখ্যা', tip: '💡 মাঠের পরামর্শ', restart: 'অন্য বিভাগ', back: 'ফিরুন', score: 'স্কোর', total: 'প্রশ্ন', reading: 'পড়ার উপায়', free: 'দিনে ৩টি বিনামূল্যে', proUnlimited: 'Pro-তে সীমাহীন' },
  ne: { title: 'राष्ट्रिय परीक्षा अभ्यास', selectCat: 'श्रेणी छान्नुहोस्', selectDiff: 'कठिनाइ स्तर', generate: 'प्रश्न बनाउनुहोस्', generating: 'AI प्रश्न बनाउँदैछ...', answer: 'उत्तर हेर्नुहोस्', next: 'अर्को प्रश्न', correct: '✅ सही!', wrong: '❌ गलत', explain: 'व्याख्या', tip: '💡 कामको सुझाव', restart: 'अर्को श्रेणी', back: 'फर्कनुहोस्', score: 'स्कोर', total: 'प्रश्न', reading: 'पढ्ने तरिका', free: 'दिनमा ३ वटा निःशुल्क', proUnlimited: 'Pro मा असीमित' },
  km: { title: 'អនុវត្តប្រឡងជាតិ', selectCat: 'ជ្រើសរើសប្រភេទ', selectDiff: 'កម្រិតពិបាក', generate: 'បង្កើតសំណួរ', generating: 'AI កំពុងបង្កើតសំណួរ...', answer: 'មើលចម្លើយ', next: 'សំណួរបន្ទាប់', correct: '✅ ត្រឹមត្រូវ!', wrong: '❌ មិនត្រឹមត្រូវ', explain: 'ការពន្យល់', tip: '💡 គន្លឹះការងារ', restart: 'ប្រភេទផ្សេង', back: 'ត្រលប់', score: 'ពិន្ទុ', total: 'សំណួរ', reading: 'របៀបអាន', free: '៣សំណួរ/ថ្ងៃឥតគិតថ្លៃ', proUnlimited: 'គ្មានដែនកំណត់ជាមួយ Pro' },
};

export default function ShikenPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const { user } = useUser();
  const isPro = user?.plan === 'pro' || user?.plan === 'unlimited';
  const st = ST[lang] || ST['ja'];

  const [phase, setPhase] = useState('select'); // select → loading → question → result
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const MAX_FREE = isPro ? 99999 : 3;

  const speak = (text) => {
    if (typeof window === 'undefined') return;
    const readable = convertToReadable(text);
    const utterance = new SpeechSynthesisUtterance(readable);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuestion = async (cat) => {
    if (dailyCount >= MAX_FREE) return;
    setCategory(cat);
    setPhase('loading');
    setSelected(null);
    setShowAnswer(false);
    setLoading(true);

    try {
      const res = await fetch('/api/shiken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: cat, lang, difficulty }),
      });
      const data = await res.json();
      setQuestion(data.question);
      setPhase('question');
      setDailyCount(c => c + 1);
    } catch (e) {
      setPhase('select');
    }
    setLoading(false);
  };

  const handleAnswer = () => {
    if (selected === null) return;
    if (selected === question.answer) setScore(s => s + 1);
    setTotal(t => t + 1);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (dailyCount >= MAX_FREE) {
      setPhase('limit');
      return;
    }
    generateQuestion(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {st.back}</button>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">📚 {st.title}</h1>
          <p className="text-blue-100 text-sm">AIが毎回新しい問題を生成します・無限に練習できます</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-blue-200">
              {st.score}：{score} / {total}{st.total}
            </div>
            <div className="text-xs bg-white/20 rounded-full px-3 py-1">
              今日：{dailyCount}/{isPro ? '∞' : MAX_FREE} {isPro ? '（プロ・無制限）' : '(' + st.free + ')'}
            </div>
          </div>
        </div>

        {/* カテゴリ選択 */}
        {phase === 'select' && (
          <div>
            <div className="flex gap-2 mb-6 flex-wrap">
              <p className="text-gray-600 font-semibold w-full">{st.selectCat}</p>
              <p className="text-xs text-gray-400 w-full">{st.selectDiff}：</p>
              {Object.entries(DIFFICULTIES).map(([key, d]) => (
                <button key={key} onClick={() => setDifficulty(key)}
                  className={`border rounded-full px-3 py-1 text-xs font-bold transition-all ${difficulty === key ? d.color + ' border-2' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {d.ja}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button key={key} onClick={() => generateQuestion(key)}
                  disabled={dailyCount >= MAX_FREE}
                  className="bg-white border border-blue-100 rounded-2xl p-4 text-center hover:shadow-md hover:border-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <p className="font-bold text-gray-800 text-xs">{cat.ja}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.en}</p>
                </button>
              ))}
            </div>
            {dailyCount >= MAX_FREE && !isPro && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
                <p className="text-yellow-700 font-bold mb-2">今日の無料枠（{MAX_FREE}問）を使い切りました</p>
                <p className="text-yellow-600 text-sm mb-3">{st.proUnlimited}</p>
                <a href="https://buy.stripe.com/3cI6oz52k9VoakZ5sWcs802" target="_blank" rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-full text-sm inline-block">
                  💎 プロプランへ（¥500/月）
                </a>
              </div>
            )}
          </div>
        )}

        {/* ローディング */}
        {phase === 'loading' && (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <div className="text-5xl mb-4 animate-bounce">🤖</div>
            <p className="text-gray-500">{st.generating}</p>
            <p className="text-xs text-gray-400 mt-2">カテゴリ：{category && CATEGORIES[category]?.ja}</p>
          </div>
        )}

        {/* 問題表示 */}
        {phase === 'question' && question && (
          <div className="space-y-4">
            {/* カテゴリ・難易度 */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  {question.category}
                </span>
                <span className={`text-xs border px-2 py-1 rounded-full font-medium ${DIFFICULTIES[difficulty]?.color}`}>
                  {DIFFICULTIES[difficulty]?.ja}
                </span>
              </div>

              {/* 問題文 */}
              <p className="text-gray-800 font-semibold leading-relaxed text-lg mb-3">
                {question.question}
              </p>

              {/* 🔊 読み上げボタン */}
              <button onClick={() => speak(question.question)}
                className="text-xs text-blue-500 border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-50 mb-3">
                🔊 読み上げる
              </button>

              {/* ふりがな */}
              {question.furigana && Object.keys(question.furigana).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(question.furigana).map(([kanji, furi]) => (
                    <span key={kanji} className="text-xs bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1 text-gray-600">
                      {kanji}（{furi}）
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 選択肢 */}
            <div className="space-y-3">
              {question.choices.map((choice, idx) => {
                let style = 'bg-white border-gray-200 text-gray-700';
                if (showAnswer) {
                  if (idx === question.answer) style = 'bg-green-50 border-green-400 text-green-800 font-bold';
                  else if (idx === selected && idx !== question.answer) style = 'bg-red-50 border-red-400 text-red-700';
                } else if (idx === selected) style = 'bg-blue-50 border-blue-400 text-blue-800';
                return (
                  <button key={idx} onClick={() => !showAnswer && setSelected(idx)}
                    className={`w-full text-left border rounded-xl p-4 text-sm transition-all ${style}`}>
                    <span className="font-bold mr-2">{idx + 1}.</span>{choice}
                    {showAnswer && idx === question.answer && <span className="ml-2">✓</span>}
                  </button>
                );
              })}
            </div>

            {!showAnswer ? (
              <button onClick={handleAnswer} disabled={selected === null}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-colors">
                {st.answer}
              </button>
            ) : (
              <div className="space-y-3">
                {/* 解説 */}
                <div className={`rounded-2xl p-5 ${selected === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="font-bold text-lg mb-3">
                    {selected === question.answer ? st.correct : st.wrong}
                  </p>

                  {/* 日本語解説 */}
                  <div className="mb-3">
                    <p className="text-xs font-bold text-gray-500 mb-1">📖 {st.explain}（日本語）</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{question.explanation?.ja}</p>
                    <button onClick={() => speak(question.explanation?.ja)}
                      className="mt-1 text-xs text-blue-500 border border-blue-200 rounded-full px-2 py-0.5 hover:bg-blue-50">
                      🔊 聞く
                    </button>
                  </div>

                  {/* 母国語解説 */}
                  {question.explanation?.[lang] && lang !== 'ja' && (
                    <div className="bg-white/60 rounded-xl p-3">
                      <p className="text-xs font-bold text-gray-500 mb-1">💬 {st.explain}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{question.explanation[lang]}</p>
                    </div>
                  )}

                  {/* 現場のヒント */}
                  {question.tip && (
                    <div className="mt-3 bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                      <p className="text-xs font-bold text-yellow-700 mb-1">{st.tip}</p>
                      <p className="text-sm text-gray-700">{question.tip}</p>
                    </div>
                  )}
                </div>

                {/* 次へボタン */}
                <div className="flex gap-3">
                  <button onClick={handleNext}
                    disabled={dailyCount >= MAX_FREE}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-colors">
                    {dailyCount >= MAX_FREE ? `今日の上限（${MAX_FREE}問）` : `${st.next} →`}
                  </button>
                  <button onClick={() => setPhase('select')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors text-sm">
                    {st.restart}
                  </button>
                </div>

                {dailyCount >= MAX_FREE && !isPro && (
                  <a href="https://buy.stripe.com/3cI6oz52k9VoakZ5sWcs802" target="_blank" rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors block text-center">
                    💎 プロプランで無制限に練習する（¥500/月）
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
