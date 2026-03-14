'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext'；
import NavBar from '@/components/NavBar';

const QUESTIONS = [
  {
    id: 1, category: '介護の基本',
    question: '介護福祉士の職業倫理として、最も適切なものはどれか。',
    furigana: { '介護福祉士': 'かいごふくしし', '職業倫理': 'しょくぎょうりんり', '適切': 'てきせつ' },
    choices: ['利用者の意思よりも家族の意向を優先する', '利用者の秘密を他の職員と共有する', '利用者の自己決定を尊重する', '利用者に対して常に指示・命令する'],
    answer: 2,
    explanation: { ja: '介護福祉士は利用者の自己決定を尊重することが基本です。利用者が自分で決める権利を大切にし、その人らしい生活を支援します。', id: 'Perawat sosial harus menghormati keputusan pengguna layanan. Menghargai hak pengguna untuk memutuskan sendiri dan mendukung kehidupan yang sesuai dengan diri mereka.', vi: 'Nhân viên chăm sóc phải tôn trọng quyền tự quyết của người dùng dịch vụ.', tl: 'Ang mga manggagawa sa pag-aalaga ay dapat igalang ang sariling desisyon ng mga gumagamit ng serbisyo.', my: 'လူမှုဝန်ထမ်းများသည် ဝန်ဆောင်မှုသုံးစွဲသူများ၏ ကိုယ်ပိုင်ဆုံးဖြတ်ချက်ကို လေးစားရမည်။', bn: 'সেবা গ্রহণকারীদের স্বনির্ণয়ের অধিকারকে সম্মান করতে হবে।', ne: 'सेवा प्रयोगकर्ताहरूको आत्म-निर्णयको अधिकारलाई सम्मान गर्नुपर्छ।', km: 'អ្នកថែទាំត្រូវគោរពការសម្រេចចិត្តដោយខ្លួនឯងរបស់អ្នកប្រើប្រាស់សេវា។' },
  },
  {
    id: 2, category: '身体介護',
    question: '移乗介助（ベッドから車椅子）の際の基本姿勢として正しいものはどれか。',
    furigana: { '移乗介助': 'いじょうかいじょ', '車椅子': 'くるまいす', '基本姿勢': 'きほんしせい' },
    choices: ['腰を曲げて利用者を抱える', '膝を曲げて重心を低くする', '腕の力だけで持ち上げる', '素早く動いて時間を短縮する'],
    answer: 1,
    explanation: { ja: '移乗介助では、介護者が膝を曲げて重心を低くすることで腰への負担を減らします。ボディメカニクスの基本です。', id: 'Dalam membantu transfer, perawat menekuk lutut untuk merendahkan pusat gravitasi, mengurangi beban pada pinggang.', vi: 'Khi hỗ trợ di chuyển, người chăm sóc cúi đầu gối để hạ trọng tâm, giảm tải cho lưng.', tl: 'Sa pagtutulungan ng paglipat, ibaluktot ang tuhod para ibaba ang sentro ng gravity.', my: 'အကူးအပြောင်း ကူညီစဉ်တွင် ဒူးကိုကွေးကာ ကိုယ်ဌာနချိန်ကို နိမ့်ချပါ။', bn: 'স্থানান্তর সহায়তার সময় হাঁটু বাঁকিয়ে মাধ্যাকর্ষণ কেন্দ্র নিচু করুন।', ne: 'स्थानान्तरण सहायताको बेला घुँडा मोडेर गुरुत्वाकर्षण केन्द्र तल राख्नुहोस्।', km: 'ពេលជួយផ្ទេរ ពត់ជង្គង់ ដើម្បីបញ្ចុះមជ្ឈមណ្ឌលទំនាញ។' },
  },
  {
    id: 3, category: '認知症',
    question: '認知症の人への対応として最も適切なものはどれか。',
    furigana: { '認知症': 'にんちしょう', '対応': 'たいおう', '適切': 'てきせつ' },
    choices: ['間違いを強く訂正する', 'できないことを責める', 'その人のペースに合わせて話す', '大きな声で急がせる'],
    answer: 2,
    explanation: { ja: '認知症の方には、その人のペースに合わせてゆっくり話すことが大切です。焦らせたり訂正したりすると不安や混乱を招きます。', id: 'Untuk orang dengan demensia, penting untuk berbicara perlahan sesuai dengan kecepatan mereka.', vi: 'Đối với người bị sa sút trí tuệ, điều quan trọng là nói chuyện chậm rãi theo tốc độ của họ.', tl: 'Para sa mga taong may dementia, mahalaga ang magsalita nang dahan-dahan ayon sa kanilang bilis.', my: 'ဦးနှောက်ဆိုင်ရာ ချို့ယွင်းမှုရှိသူများနှင့် ၎င်းတို့၏ အချိန်နှုန်းနှင့် ညီအောင် ဖြည်းဖြည်းချင်း ပြောဆိုရမည်။', bn: 'স্মৃতিভ্রংশ ব্যক্তিদের সাথে তাদের গতিতে ধীরে ধীরে কথা বলুন।', ne: 'मनोभ्रंश भएका व्यक्तिहरूसँग उनीहरूको गतिमा बिस्तारै कुरा गर्नुहोस्।', km: 'សម្រាប់អ្នកដែលមានជំងឺវង្វេងចំណាំ សូមនិយាយយឺតៗ ស្របតាមល្បឿនរបស់ពួកគេ។' },
  },
  {
    id: 4, category: '食事介助',
    question: '食事介助の際、誤嚥を防ぐための姿勢として正しいものはどれか。',
    furigana: { '食事介助': 'しょくじかいじょ', '誤嚥': 'ごえん', '姿勢': 'しせい' },
    choices: ['仰向けで食事をする', '上体を30度以下に起こす', '上体を30〜60度程度起こす', '頭を後ろに反らせる'],
    answer: 2,
    explanation: { ja: '誤嚥を防ぐには、上体を30〜60度程度起こした姿勢が適切です。完全に横になっていると食べ物が気管に入りやすくなります。', id: 'Untuk mencegah aspirasi, postur yang sesuai adalah memposisikan tubuh bagian atas sekitar 30-60 derajat.', vi: 'Để ngăn ngừa hít sặc, tư thế thích hợp là nâng phần trên cơ thể khoảng 30-60 độ.', tl: 'Para maiwasan ang pagkalanghap, ang tamang postura ay ang itaas ang itaas na bahagi ng katawan ng 30-60 degrees.', my: 'အစားအစာ မမှန်မကန်ဝင်မှုကို တားဆီးရန် ခန္ဓာကိုယ်အပေါ်ပိုင်းကို ၃၀-၆၀ ဒီဂရီ မြှောက်ထားပါ။', bn: 'অ্যাসপিরেশন প্রতিরোধ করতে উপরের শরীর প্রায় ৩০-৬০ ডিগ্রি উঁচু করা উচিত।', ne: 'श्वासनलीमा खाना जानबाट रोक्न शरीरको माथिल्लो भाग ३०-६० डिग्री उठाउनु उचित हुन्छ।', km: 'ដើម្បីការពារការស្រូបចូល គួរលើកផ្នែកខាងលើនៃរាងកាយប្រហែល ៣០-៦០ ដឺក្រេ។' },
  },
  {
    id: 5, category: '排泄介助',
    question: 'おむつ交換の際に最も重要なことはどれか。',
    furigana: { '排泄': 'はいせつ', 'おむつ交換': 'おむつこうかん', '重要': 'じゅうよう' },
    choices: ['できるだけ素早く終わらせる', '利用者の羞恥心に配慮する', '他のスタッフに大声で知らせる', '窓を開けて換気する'],
    answer: 1,
    explanation: { ja: 'おむつ交換では利用者の羞恥心やプライバシーへの配慮が最重要です。カーテンを閉める、声かけをする等の対応が必要です。', id: 'Dalam mengganti popok, yang paling penting adalah memperhatikan rasa malu dan privasi pengguna.', vi: 'Khi thay tã, điều quan trọng nhất là quan tâm đến sự xấu hổ và quyền riêng tư của người dùng.', tl: 'Sa pagpapalit ng diaper, ang pinaka-mahalaga ay ang pag-aalaga sa kahihiyan at privacy ng gumagamit.', my: 'ဒိုင်ပါဝတ်ဆောင်မှုပြောင်းလဲသောအခါ အသုံးပြုသူ၏ ရှက်ကြောက်မှုနှင့် တစ်ကိုယ်ရေကိုယ်တာကို ဂရုပြုပါ။', bn: 'ডায়াপার পরিবর্তনের সময় ব্যবহারকারীর লজ্জা ও গোপনীয়তার প্রতি মনোযোগ দেওয়া সবচেয়ে গুরুত্বপূর্ণ।', ne: 'डायपर परिवर्तन गर्दा प्रयोगकर्ताको लाज र गोपनीयताको ख्याल राख्नु सबैभन्दा महत्त्वपूर्ण छ।', km: 'ពេលផ្លាស់ប្តូរខោទឹក ការយកចិត្តទុកដាក់ចំពោះការខ្មាស់អៀន និងភាពឯកជនរបស់អ្នកប្រើប្រាស់ គឺសំខាន់បំផុត។' },
  },
];

const ST = {
  ja: { title: '国家試験対策', desc: '介護福祉士国家試験の練習問題（母国語解説付き）', answer: '答えを見る', next: '次の問題', correct: '✅ 正解！', wrong: '❌ 不正解', explain: '解説', restart: '🔄 もう一度', back: 'トップへ戻る', score: 'スコア', question: '問' },
  id: { title: 'Latihan Ujian Nasional', desc: 'Soal latihan ujian Kaigo Fukushishi (dengan penjelasan)', answer: 'Lihat Jawaban', next: 'Soal Berikutnya', correct: '✅ Benar!', wrong: '❌ Salah', explain: 'Penjelasan', restart: '🔄 Coba Lagi', back: 'Kembali ke Atas', score: 'Skor', question: 'No' },
  vi: { title: 'Luyện thi Quốc gia', desc: 'Câu hỏi luyện tập (có giải thích)', answer: 'Xem đáp án', next: 'Câu tiếp theo', correct: '✅ Đúng rồi!', wrong: '❌ Sai rồi', explain: 'Giải thích', restart: '🔄 Thử lại', back: 'Về trang đầu', score: 'Điểm', question: 'Câu' },
  tl: { title: 'Pagsasanay sa Pambansang Pagsusulit', desc: 'Mga tanong sa pagsusulit (may paliwanag)', answer: 'Tingnan ang Sagot', next: 'Susunod na Tanong', correct: '✅ Tama!', wrong: '❌ Mali', explain: 'Paliwanag', restart: '🔄 Subukan Ulit', back: 'Bumalik sa Itaas', score: 'Marka', question: 'Blg' },
  my: { title: 'အမျိုးသားစာမေးပွဲ လေ့ကျင့်ရေး', desc: 'Kaigo Fukushishi စာမေးပွဲ လေ့ကျင့်ရေး (ရှင်းလင်းချက်ပါ)', answer: 'အဖြေကြည့်ရန်', next: 'နောက်မေးခွန်း', correct: '✅ မှန်သည်!', wrong: '❌ မှားသည်', explain: 'ရှင်းလင်းချက်', restart: '🔄 ပြန်စရန်', back: 'အပေါ်သို့', score: 'ရမှတ်', question: 'မေး' },
  bn: { title: 'জাতীয় পরীক্ষার অনুশীলন', desc: 'পরীক্ষার অনুশীলন প্রশ্ন (ব্যাখ্যাসহ)', answer: 'উত্তর দেখুন', next: 'পরবর্তী প্রশ্ন', correct: '✅ সঠিক!', wrong: '❌ ভুল', explain: 'ব্যাখ্যা', restart: '🔄 আবার চেষ্টা', back: 'শীর্ষে ফিরুন', score: 'স্কোর', question: 'প্র' },
  ne: { title: 'राष्ट्रिय परीक्षा अभ्यास', desc: 'परीक्षा अभ्यास प्रश्नहरू (व्याख्यासहित)', answer: 'उत्तर हेर्नुहोस्', next: 'अर्को प्रश्न', correct: '✅ सही!', wrong: '❌ गलत', explain: 'व्याख्या', restart: '🔄 फेरि प्रयास', back: 'माथि फर्कनुहोस्', score: 'स्कोर', question: 'प्र' },
  km: { title: 'អនុវត្តប្រឡងជាតិ', desc: 'សំណួរអនុវត្ត (មានការពន្យល់)', answer: 'មើលចម្លើយ', next: 'សំណួរបន្ទាប់', correct: '✅ ត្រឹមត្រូវ!', wrong: '❌ មិនត្រឹមត្រូវ', explain: 'ការពន្យល់', restart: '🔄 សាកម្តងទៀត', back: 'ត្រលប់ទៅដើម', score: 'ពិន្ទុ', question: 'សំណួរ' },
};

export default function ShikenPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const st = ST[lang] || ST['ja'];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = QUESTIONS[current];

  const handleAnswer = () => {
    if (selected === null) return;
    if (selected === q.answer) setScore(s => s + 1);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) { setFinished(true); }
    else { setCurrent(c => c + 1); setSelected(null); setShowAnswer(false); }
  };

  const handleRestart = () => { setCurrent(0); setSelected(null); setShowAnswer(false); setScore(0); setFinished(false); };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {st.back}</button>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">📚 {st.title}</h1>
          <p className="text-blue-100 text-sm">{st.desc}</p>
          <div className="mt-2 text-xs text-blue-200">{st.question} {current + 1} / {QUESTIONS.length}　{st.score}：{score}</div>
          <div className="mt-2 bg-blue-500 rounded-full h-2">
            <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        {finished ? (
          <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">{score >= 4 ? '🎉' : '📖'}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{score} / {QUESTIONS.length}{st.score === 'スコア' ? '点' : ''}</h2>
            <p className="text-gray-500 mb-6">{score >= 4 ? '素晴らしい！合格ラインです！' : 'もう少し！復習して再挑戦しましょう！'}</p>
            <button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl">{st.restart}</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{q.category}</span>
              <p className="mt-3 text-gray-800 font-semibold leading-relaxed">{q.question}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(q.furigana).map(([kanji, furi]) => (
                  <span key={kanji} className="text-xs bg-yellow-50 border border-yellow-200 rounded px-2 py-0.5 text-gray-600">{kanji}（{furi}）</span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {q.choices.map((choice, idx) => {
                let style = 'bg-white border-gray-200 text-gray-700';
                if (showAnswer) {
                  if (idx === q.answer) style = 'bg-green-50 border-green-400 text-green-800 font-bold';
                  else if (idx === selected && idx !== q.answer) style = 'bg-red-50 border-red-400 text-red-700';
                } else if (idx === selected) style = 'bg-blue-50 border-blue-400 text-blue-800';
                return (
                  <button key={idx} onClick={() => !showAnswer && setSelected(idx)}
                    className={`w-full text-left border rounded-xl p-4 text-sm transition-all ${style}`}>
                    <span className="font-bold mr-2">{idx + 1}.</span>{choice}
                    {showAnswer && idx === q.answer && <span className="ml-2">✓</span>}
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
                <div className={`rounded-xl p-4 ${selected === q.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="font-bold mb-2">{selected === q.answer ? st.correct : st.wrong}</p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{st.explain}</p>
                  <p className="text-sm text-gray-600">{q.explanation[lang] || q.explanation['ja']}</p>
                </div>
                <button onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
                  {current + 1 < QUESTIONS.length ? `${st.next} →` : '結果を見る 🎯'}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
