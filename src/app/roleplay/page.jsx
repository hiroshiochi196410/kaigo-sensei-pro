'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const SCENARIOS = {
  morning:   { icon: '🌅', ja: '朝の起床介助',    en: 'Morning Care' },
  meal:      { icon: '🍱', ja: '食事介助',         en: 'Meal Assistance' },
  bath:      { icon: '🛁', ja: '入浴介助',         en: 'Bathing Care' },
  toilet:    { icon: '🚽', ja: 'トイレ介助',       en: 'Toilet Care' },
  emergency: { icon: '🚨', ja: 'ヒヤリハット報告', en: 'Incident Report' },
  handover:  { icon: '📋', ja: '申し送り',         en: 'Handover' },
};

const SPEECH_LANG = {
  ja: 'ja-JP', id: 'id-ID', vi: 'vi-VN', tl: 'fil-PH',
  my: 'my-MM', bn: 'bn-BD', ne: 'ne-NP', km: 'km-KH',
};

const RT = {
  ja: { title: 'AI会話ロールプレイ', select: 'シナリオを選んでください', reset: 'リセット', you: 'あなた', ai: 'AI（施設）', tip: '💡 アドバイス', next: '次のセリフ例', loading: '考え中...', placeholder: '日本語で話しかけてみましょう', send: '送信', back: 'トップへ戻る', micStart: '🎤 話す', micStop: '⏹ 停止', listening: '🎤 聞いています...', speakBtn: '🔊 もう一度', slow: '🐢 ゆっくり', autoSpeak: '自動読み上げ' },
  id: { title: 'Role Play AI', select: 'Pilih skenario', reset: 'Reset', you: 'Anda', ai: 'AI', tip: '💡 Tips', next: 'Contoh', loading: 'Berpikir...', placeholder: 'Bicara bahasa Jepang', send: 'Kirim', back: 'Kembali', micStart: '🎤 Bicara', micStop: '⏹ Stop', listening: '🎤 Mendengarkan...', speakBtn: '🔊 Ulangi', slow: '🐢 Pelan', autoSpeak: 'Baca otomatis' },
  vi: { title: 'Role Play AI', select: 'Chọn tình huống', reset: 'Đặt lại', you: 'Bạn', ai: 'AI', tip: '💡 Lời khuyên', next: 'Gợi ý', loading: 'Đang suy nghĩ...', placeholder: 'Nói tiếng Nhật', send: 'Gửi', back: 'Về đầu', micStart: '🎤 Nói', micStop: '⏹ Dừng', listening: '🎤 Đang nghe...', speakBtn: '🔊 Lại', slow: '🐢 Chậm', autoSpeak: 'Tự đọc' },
  tl: { title: 'Role Play AI', select: 'Pumili ng sitwasyon', reset: 'I-reset', you: 'Ikaw', ai: 'AI', tip: '💡 Tip', next: 'Halimbawa', loading: 'Nag-iisip...', placeholder: 'Magsalita ng Hapon', send: 'Ipadala', back: 'Bumalik', micStart: '🎤 Magsalita', micStop: '⏹ Itigil', listening: '🎤 Nakikinig...', speakBtn: '🔊 Ulit', slow: '🐢 Mabagal', autoSpeak: 'Auto-basa' },
  my: { title: 'AI Role Play', select: 'အခြေအနေ ရွေးပါ', reset: 'ပြန်စရန်', you: 'သင်', ai: 'AI', tip: '💡 အကြံ', next: 'နောက်ဥပမာ', loading: 'တွေးနေသည်...', placeholder: 'ဂျပန်ဘာသာ ပြောပါ', send: 'ပို့ရန်', back: 'အပေါ်', micStart: '🎤 ပြောရန်', micStop: '⏹ ရပ်', listening: '🎤 နားထောင်နေသည်...', speakBtn: '🔊 ထပ်ဖွင့်', slow: '🐢 နှေးသည်', autoSpeak: 'အလိုအလျောက် ဖတ်' },
  bn: { title: 'AI রোল প্লে', select: 'পরিস্থিতি বেছে নিন', reset: 'রিসেট', you: 'আপনি', ai: 'AI', tip: '💡 পরামর্শ', next: 'পরবর্তী', loading: 'ভাবছি...', placeholder: 'জাপানি বলুন', send: 'পাঠান', back: 'ফিরুন', micStart: '🎤 বলুন', micStop: '⏹ থামুন', listening: '🎤 শুনছি...', speakBtn: '🔊 আবার', slow: '🐢 ধীরে', autoSpeak: 'স্বয়ংক্রিয় পড়া' },
  ne: { title: 'AI रोल प्ले', select: 'परिस्थिति छान्नुहोस्', reset: 'रिसेट', you: 'तपाईं', ai: 'AI', tip: '💡 सुझाव', next: 'अर्को', loading: 'सोच्दैछु...', placeholder: 'जापानी बोल्नुहोस्', send: 'पठाउनुहोस्', back: 'फर्कनुहोस्', micStart: '🎤 बोल्नुहोस्', micStop: '⏹ रोक्नुहोस्', listening: '🎤 सुन्दैछु...', speakBtn: '🔊 फेरि', slow: '🐢 बिस्तारै', autoSpeak: 'स्वत: पढ्नुहोस्' },
  km: { title: 'AI Role Play', select: 'ជ្រើសស្ថានភាព', reset: 'កំណត់ឡើងវិញ', you: 'អ្នក', ai: 'AI', tip: '💡 ដំបូន្មាន', next: 'ឧទាហរណ៍', loading: 'កំពុងគិត...', placeholder: 'និយាយភាសាជប៉ុន', send: 'ផ្ញើ', back: 'ត្រលប់', micStart: '🎤 និយាយ', micStop: '⏹ ឈប់', listening: '🎤 កំពុងស្តាប់...', speakBtn: '🔊 ម្តងទៀត', slow: '🐢 យឺត', autoSpeak: 'អានដោយស្វ័យប្រវត្តិ' },
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
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [slowMode, setSlowMode] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const speak = (text, slow = false) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = slow ? 0.6 : 0.85;
    utterance.pitch = 1.0;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const startListening = () => {
    if (typeof window === 'undefined') return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('このブラウザは音声認識に対応していません。Google Chromeをお使いください。');
      return;
    }
    const recognition = new SR();
    recognition.lang = SPEECH_LANG[lang] || 'ja-JP';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

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
      if (autoSpeak) speak(data.message, slowMode);
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
    stopSpeaking();
    try {
      const res = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, scenario, lang }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      setFeedbacks(prev => [...prev, data.feedback]);
      if (autoSpeak) speak(data.message, slowMode);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {rt.back}</button>

        <div className="bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">🤖 {rt.title}</h1>
          <p className="text-purple-100 text-sm">介護現場のシチュエーションをAIと日本語で練習</p>
          {scenario && (
            <div className="mt-3 flex gap-4 flex-wrap">
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input type="checkbox" checked={autoSpeak} onChange={e => setAutoSpeak(e.target.checked)} className="w-3.5 h-3.5" />
                🔊 {rt.autoSpeak}
              </label>
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input type="checkbox" checked={slowMode} onChange={e => setSlowMode(e.target.checked)} className="w-3.5 h-3.5" />
                🐢 {rt.slow}
              </label>
              {speaking && (
                <button onClick={stopSpeaking} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
                  ⏹ 読み上げ停止
                </button>
              )}
            </div>
          )}
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
              <button onClick={() => { setScenario(null); setMessages([]); setFeedbacks([]); stopSpeaking(); }}
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
                      {msg.role === 'assistant' && (
                        <div className="mt-2 flex gap-2 flex-wrap">
                          <button onClick={() => speak(msg.content, false)}
                            className="text-xs text-gray-500 hover:text-purple-600 border border-gray-200 rounded-full px-2 py-0.5 bg-white">
                            {rt.speakBtn}
                          </button>
                          <button onClick={() => speak(msg.content, true)}
                            className="text-xs text-gray-500 hover:text-purple-600 border border-gray-200 rounded-full px-2 py-0.5 bg-white">
                            {rt.slow}
                          </button>
                        </div>
                      )}
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
              <button
                onClick={isListening ? stopListening : startListening}
                className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                }`}
              >
                {isListening ? rt.micStop : rt.micStart}
              </button>
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? rt.listening : rt.placeholder}
                disabled={loading}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
              <button onClick={handleSend} disabled={loading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
                {rt.send}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">🎤 Google Chromeでマイク・読み上げ機能が使えます（全8言語対応）</p>
          </div>
        )}
      </main>
    </div>
  );
}
