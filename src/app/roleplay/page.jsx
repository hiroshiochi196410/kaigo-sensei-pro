'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const SCENARIOS = {
  morning:   { icon: '🌅', ja: '朝の起床介助',     en: 'Morning Care' },
  meal:      { icon: '🍱', ja: '食事介助',          en: 'Meal Assistance' },
  bath:      { icon: '🛁', ja: '入浴介助',          en: 'Bathing Care' },
  toilet:    { icon: '🚽', ja: 'トイレ介助',        en: 'Toilet Care' },
  emergency: { icon: '🚨', ja: 'ヒヤリハット報告',  en: 'Incident Report' },
  handover:  { icon: '📋', ja: '申し送り',          en: 'Handover' },
};

const RT = {
  ja: { title: 'AI会話ロールプレイ', select: 'シナリオを選んでください', reset: 'リセット', you: 'あなた', ai: 'AI（施設）', tip: '💡 アドバイス', next: '次のセリフ例', loading: '考え中...', placeholder: '日本語で話しかけてみましょう', send: '送信', back: 'トップへ戻る' },
  id: { title: 'Role Play Percakapan AI', select: 'Pilih skenario', reset: 'Reset', you: 'Anda', ai: 'AI (Fasilitas)', tip: '💡 Tips', next: 'Contoh kalimat', loading: 'Sedang berpikir...', placeholder: 'Coba berbicara dalam bahasa Jepang', send: 'Kirim', back: 'Kembali ke Atas' },
  vi: { title: 'Role Play Hội thoại AI', select: 'Chọn tình huống', reset: 'Đặt lại', you: 'Bạn', ai: 'AI (Cơ sở)', tip: '💡 Lời khuyên', next: 'Câu gợi ý', loading: 'Đang suy nghĩ...', placeholder: 'Hãy thử nói bằng tiếng Nhật', send: 'Gửi', back: 'Về trang đầu' },
  tl: { title: 'AI Role Play na Usapan', select: 'Pumili ng sitwasyon', reset: 'I-reset', you: 'Ikaw', ai: 'AI (Pasilidad)', tip: '💡 Tip', next: 'Halimbawang susunod', loading: 'Nag-iisip...', placeholder: 'Subukang magsalita sa Hapon', send: 'Ipadala', back: 'Bumalik sa Itaas' },
  my: { title: 'AI စကားပြော Role Play', select: 'အခြေအနေ ရွေးပါ', reset: 'ပြန်စရန်', you: 'သင်', ai: 'AI (施設)', tip: '💡 အကြံ', next: 'နောက်ဥပမာ', loading: 'တွေးနေသည်...', placeholder: 'ဂျပန်ဘာသာ ပြောကြည့်ပါ', send: 'ပို့ရန်', back: 'အပေါ်သို့' },
  bn: { title: 'AI কথোপকথন রোল প্লে', select: 'পরিস্থিতি বেছে নিন', reset: 'রিসেট', you: 'আপনি', ai: 'AI (সুবিধা)', tip: '💡 পরামর্শ', next: 'পরবর্তী উদাহরণ', loading: 'ভাবছি...', placeholder: 'জাপানি ভাষায় কথা বলুন', send: 'পাঠান', back: 'শীর্ষে ফিরুন' },
  ne: { title: 'AI कुराकानी रोल प्ले', select: 'परिस्थिति छान्नुहोस्', reset: 'रिसेट', you: 'तपाईं', ai: 'AI (सुविधा)', tip: '💡 सुझाव', next: 'अर्को उदाहरण', loading: 'सोच्दैछु...', placeholder: 'जापानी भाषामा बोल्नुहोस्', send: 'पठाउनुहोस्', back: 'माथि फर्कनुहोस्' },
  km: { title: 'AI សន្ទនា Role Play', select: 'ជ្រើសស្ថានភាព', reset: 'កំណត់ឡើងវិញ', you: 'អ្នក', ai: 'AI (មណ្ឌល)', tip: '💡 ដំបូន្មាន', next: 'ឃ្លាឧទាហរណ៍', loading: 'កំពុងគិត...', placeholder: 'ព្យាយាមនិយាយជាភាសាជប៉ុន', send: 'ផ្ញើ', back: 'ត្រលប់ទៅដើម' },
};

export default function RoleplayPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const rt = RT[lang] || RT['ja'];

  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const startScenario = async (key) => {
    setScenario(key);
    setMessages([]);
    setFeedbacks([]);
    setLoading(true);
    const starter = { role: 'user', content: `シナリオ「${SCENARIOS[key].ja}」を始めてください。最初の声かけをしてください。` };
    try {
      const res = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [starter], scenario: key, lang }),
      });
      const data = await res.json();
      setMessages([{ role: 'assistant', content: data.message }]);
      setFeedbacks([data.feedback]);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setFeedbacks(prev => [...prev, null]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, scenario, lang }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      setFeedbacks(prev => [...prev, data.feedback]);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← {rt.back}
        </button>

        <div className="bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">🤖 {rt.title}</h1>
          <p className="text-purple-100 text-sm">介護現場のシチュエーションをAIと日本語で練習</p>
        </div>

        {!scenario ? (
          <div>
            <p className="text-gray-600 font-semibold mb-4 text-center">{rt.select}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(SCENARIOS).map(([key, s]) => (
                <button key={key} onClick={() => startScenario(key)}
                  className="bg-white border border-purple-100 rounded-2xl p-5 text-center hover:shadow-md hover:border-purple-300 transition-all">
                  <div className="text-4xl mb-2">{s.icon}</div>
                  <p className="font-bold text-gray-800 text-sm">{s.ja}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.en}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{SCENARIOS[scenario].icon}</span>
                <span className="font-bold text-gray-700">{SCENARIOS[scenario].ja}</span>
              </div>
              <button onClick={() => { setScenario(null); setMessages([]); setFeedbacks([]); }}
                className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">
                🔄 {rt.reset}
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 max-h-[480px] overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <div key={i}>
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                      <p className={`text-xs mb-1 font-semibold ${msg.role === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
                        {msg.role === 'user' ? `👤 ${rt.you}` : `🤖 ${rt.ai}`}
                      </p>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                  {msg.role === 'assistant' && feedbacks[i] && (
                    <div className="mt-2 ml-2 bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-xs space-y-1.5">
                      <p className="font-semibold text-yellow-700">{rt.tip}</p>
                      <p className="text-gray-600">📖 {feedbacks[i].translation}</p>
                      <p className="text-green-700">✅ {feedbacks[i].tip}</p>
                      {feedbacks[i].nextSuggestion && (
                        <button onClick={() => setInput(feedbacks[i].nextSuggestion)}
                          className="mt-1 text-purple-600 border border-purple-200 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors">
                          💬 {rt.next}：「{feedbacks[i].nextSuggestion}」
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-gray-500 animate-pulse">
                    ⏳ {rt.loading}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={rt.placeholder} disabled={loading}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
              <button onClick={handleSend} disabled={loading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
                {rt.send}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
