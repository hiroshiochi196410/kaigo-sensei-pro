'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import { EXTRA_TEXT } from '@/locales/languages';

export default function KirokuPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const et = EXTRA_TEXT[lang] || EXTRA_TEXT['ja'];

  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const MAX_FREE = 10;

  const examples = {
    ja: '田中さん（85歳）が朝ごはんをほとんど食べなかった。少し元気がなく、トイレに3回行った。',
    id: 'Pak Tanaka (85 tahun) hampir tidak makan sarapan. Terlihat kurang bersemangat dan pergi ke toilet 3 kali.',
    vi: 'Ông Tanaka (85 tuổi) hầu như không ăn sáng. Trông có vẻ ít năng lượng và đi vệ sinh 3 lần.',
    tl: 'Si Ginoong Tanaka (85 taong gulang) ay halos hindi kumain ng almusal. Mukhang kulang sa lakas at pumunta sa CR ng 3 beses.',
    my: 'Tanaka ဆရာ (အသက် ၈၅ နှစ်) မနက်စာကို မစားနိုင်ခဲ့ပါ။ အားနည်းသည်ဟု ထင်ရပြီး အိမ်သာ ၃ ကြိမ် သွားခဲ့သည်။',
    bn: 'তানাকা সাহেব (৮৫ বছর) সকালের নাস্তা প্রায় খাননি। একটু দুর্বল দেখাচ্ছিল এবং ৩ বার টয়লেটে গেছেন।',
    ne: 'तानाका सान (८५ वर्ष) ले बिहानको खाना लगभग खानुभएन। अलि अस्वस्थ देखिनुभयो र ३ पटक शौचालय जानुभयो।',
    km: 'លោក Tanaka (អាយុ ៨៥ ឆ្នាំ) ស្ទើរតែមិនបានញ៉ាំអាហារពេលព្រឹក។ ហាក់ដូចជាអស់កម្លាំង ហើយបានទៅបន្ទប់ទឹក ៣ ដង។',
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    if (usageCount >= MAX_FREE) {
      alert('本日の無料利用回数（10回）に達しました。プロプランにアップグレードしてください。');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/kiroku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, lang }),
      });
      const data = await response.json();
      setResult(data);
      setUsageCount(prev => prev + 1);
    } catch (e) {
      setResult({ error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← {t.backToTop}
        </button>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">📝 {et.kiroku}</h1>
          <p className="text-green-100 text-sm">{et.kirokuDesc}</p>
          <div className="mt-3 text-xs text-green-200">
            本日の利用回数：{usageCount} / {MAX_FREE}回（無料）
          </div>
        </div>

        {/* 入力エリア */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            💬 {et.kirokuInput}
          </label>

          {/* 例文ボタン */}
          <button
            onClick={() => setInput(examples[lang] || examples['ja'])}
            className="mb-3 text-xs text-green-600 border border-green-200 rounded-full px-3 py-1 hover:bg-green-50 transition-colors"
          >
            📋 入力例を使う
          </button>

          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={5}
            className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder={examples[lang] || examples['ja']}
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim() || usageCount >= MAX_FREE}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            {loading ? `⏳ ${et.kirokuLoading}` : `✨ ${et.kirokuBtn}`}
          </button>
        </div>

        {/* 結果エリア */}
        {result && !result.error && (
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 space-y-5">
            <h2 className="font-bold text-green-700 text-lg">📄 {et.kirokuResult}</h2>

            {/* 介護記録文 */}
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-600 mb-2">🗒️ 介護記録文（日本語）</p>
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{result.kiroku}</p>
            </div>

            {/* ふりがな付き単語 */}
            {result.words && result.words.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">📖 重要な介護用語</p>
                <div className="grid grid-cols-2 gap-2">
                  {result.words.map((w, i) => (
                    <div key={i} className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-gray-800">{w.kanji}</span>
                        <span className="text-xs text-gray-400">（{w.furigana}）</span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">{w.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 母国語での解説 */}
            {result.explanation && (
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-600 mb-2">💡 解説 / Explanation</p>
                <p className="text-gray-700 text-sm leading-relaxed">{result.explanation}</p>
              </div>
            )}

            <p className="text-xs text-gray-400">{et.kirokuNote}</p>
          </div>
        )}

        {result?.error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm">
            エラーが発生しました。もう一度お試しください。
          </div>
        )}
      </main>
    </div>
  );
}
