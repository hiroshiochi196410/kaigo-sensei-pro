'use client';
import { useState, useCallback } from 'react';

const CATEGORIES = [
  { id: 'ningensongen', label: '人間の尊厳と自立', icon: '🌸', color: 'from-rose-400 to-pink-500', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', description: '尊厳・自立・自己決定・権利擁護' },
  { id: 'ningen_kankei', label: '人間関係とコミュニケーション', icon: '💬', color: 'from-sky-400 to-blue-500', bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', description: 'コミュニケーション技術・信頼関係' },
  { id: 'shakai_rikai', label: '社会の理解', icon: '🏛️', color: 'from-violet-400 to-purple-500', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', description: '社会保障制度・介護保険・福祉サービス' },
  { id: 'kaigo_kiban', label: '介護の基本', icon: '🤝', color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', description: '介護理念・ICF・チームケア・安全' },
  { id: 'comm_gijutsu', label: 'コミュニケーション技術', icon: '🗣️', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', description: '面接技法・記録・報告・相談援助' },
  { id: 'seikatsu_shien', label: '生活支援技術', icon: '🏠', color: 'from-teal-400 to-cyan-500', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', description: '食事・入浴・排泄・移動・整容・睡眠' },
  { id: 'kaigo_katei', label: '介護過程', icon: '📋', color: 'from-indigo-400 to-blue-600', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', description: 'アセスメント・計画・実施・評価' },
  { id: 'hattatsu_rouka', label: '発達と老化の理解', icon: '🌱', color: 'from-lime-400 to-green-500', bg: 'bg-lime-50', border: 'border-lime-200', text: 'text-lime-700', description: '発達段階・老化の特徴・高齢者の心理' },
  { id: 'ninchisho', label: '認知症の理解', icon: '🧠', color: 'from-fuchsia-400 to-purple-500', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700', description: 'アルツハイマー型・BPSD・パーソンセンタードケア' },
  { id: 'shougai_rikai', label: '障害の理解', icon: '♿', color: 'from-orange-400 to-red-500', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', description: '身体・知的・精神・発達・難病' },
  { id: 'kokoro_karada', label: 'こころとからだのしくみ', icon: '💊', color: 'from-red-400 to-rose-500', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', description: '医療的ケア・喀痰吸引・経管栄養' },
];

const DIFFICULTY = [
  { id: 'basic', label: '基礎', icon: '⭐' },
  { id: 'standard', label: '標準', icon: '⭐⭐' },
  { id: 'advanced', label: '応用', icon: '⭐⭐⭐' },
];

export default function ShikenPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('standard');
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [phase, setPhase] = useState('select');

  const generateQuestion = useCallback(async (categoryId, difficulty) => {
    setLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);

    const cat = CATEGORIES.find(c => c.id === categoryId);
    const diff = DIFFICULTY.find(d => d.id === difficulty);

    try {
      const response = await fetch('/api/shiken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryId,
          categoryLabel: cat.label,
          description: cat.description,
          difficulty,
          difficultyLabel: diff.label,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error('API error');
      setQuestion({ ...data, categoryId, difficulty });
    } catch (e) {
      console.error(e);
      setQuestion({ error: true });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStart = () => {
    if (!selectedCategory) return;
    setPhase('quiz');
    setScore({ correct: 0, total: 0 });
    generateQuestion(selectedCategory, selectedDifficulty);
  };

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === question.answer;
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  };

  const handleNext = () => generateQuestion(selectedCategory, selectedDifficulty);
  const handleBack = () => { setPhase('select'); setQuestion(null); setSelectedAnswer(null); setShowResult(false); };

  const cat = CATEGORIES.find(c => c.id === selectedCategory);

  if (phase === 'select') {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">📝 介護福祉士 国家試験対策</h1>
            <p className="text-sm text-gray-500">AIが出題基準に沿った問題を生成します</p>
            {score.total > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm">
                <span className="text-gray-500">前回成績</span>
                <span className="font-bold text-emerald-600">{score.correct}/{score.total}問正解</span>
                <span className="text-gray-400">({Math.round(score.correct / score.total * 100)}%)</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">難易度</p>
            <div className="flex gap-2">
              {DIFFICULTY.map(d => (
                <button key={d.id} onClick={() => setSelectedDifficulty(d.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${selectedDifficulty === d.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                  {d.icon} {d.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-600 mb-3">科目を選択</p>
          <div className="grid grid-cols-1 gap-3 mb-8">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${selectedCategory === c.id ? `${c.bg} ${c.border} shadow-md` : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${selectedCategory === c.id ? c.text : 'text-gray-700'}`}>{c.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>
                  </div>
                  {selectedCategory === c.id && <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.bg} ${c.text} border ${c.border}`}>選択中</span>}
                </div>
              </button>
            ))}
          </div>

          <button onClick={handleStart} disabled={!selectedCategory}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all ${selectedCategory ? `bg-gradient-to-r ${cat?.color} shadow-lg hover:shadow-xl hover:scale-[1.02]` : 'bg-gray-300 cursor-not-allowed'}`}>
            {selectedCategory ? `${cat.icon} ${cat.label}を開始` : '科目を選んでください'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-sm text-gray-500 hover:text-gray-700">← 科目選択</button>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.bg} ${cat.text} border ${cat.border}`}>{cat.icon} {cat.label}</span>
            {score.total > 0 && <span className="text-xs text-gray-500">{score.correct}/{score.total}問正解</span>}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">AIが問題を生成中...</p>
          </div>
        )}

        {!loading && question?.error && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">問題の生成に失敗しました</p>
            <button onClick={handleNext} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">もう一度試す</button>
          </div>
        )}

        {!loading && question && !question.error && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-indigo-500 mb-2">{DIFFICULTY.find(d => d.id === question.difficulty)?.icon} {DIFFICULTY.find(d => d.id === question.difficulty)?.label}</p>
              <p className="text-gray-800 font-medium leading-relaxed text-sm">{question.question}</p>
            </div>

            <div className="space-y-2.5">
              {question.choices.map((choice, i) => {
                let style = 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50';
                if (showResult) {
                  if (i === question.answer) style = 'bg-emerald-50 border-emerald-400 text-emerald-800';
                  else if (i === selectedAnswer) style = 'bg-red-50 border-red-400 text-red-800';
                  else style = 'bg-gray-50 border-gray-200 text-gray-400';
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${style}`}>
                    <span className="font-bold mr-2">{['A','B','C','D'][i]}.</span>{choice}
                    {showResult && i === question.answer && <span className="ml-2">✅</span>}
                    {showResult && i === selectedAnswer && i !== question.answer && <span className="ml-2">❌</span>}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className={`rounded-2xl p-5 border ${selectedAnswer === question.answer ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`font-bold text-sm mb-2 ${selectedAnswer === question.answer ? 'text-emerald-700' : 'text-red-700'}`}>
                  {selectedAnswer === question.answer ? '✅ 正解！' : '❌ 不正解'}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{question.explanation}</p>
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <p className="text-xs font-semibold text-indigo-600 mb-1">📌 重要ポイント</p>
                  <p className="text-xs text-gray-600">{question.point}</p>
                </div>
              </div>
            )}

            {showResult && (
              <button onClick={handleNext}
                className={`w-full py-4 rounded-2xl font-bold text-white text-sm bg-gradient-to-r ${cat.color} shadow-md hover:shadow-lg transition-all`}>
                次の問題へ →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
