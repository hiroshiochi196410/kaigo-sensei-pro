'use client';
import { useState, useEffect, useCallback } from 'react';

const REGIONS = [
  { key: 'kansai',    label: '関西' },
  { key: 'hiroshima', label: '広島' },
  { key: 'tohoku',    label: '東北' },
  { key: 'kyushu',    label: '九州' },
  { key: 'nagoya',    label: '名古屋' },
  { key: 'okinawa',   label: '沖縄' },
];
const SCENES = [
  { key: 'meal',      label: '食事' },
  { key: 'bath',      label: '入浴' },
  { key: 'toilet',    label: 'トイレ' },
  { key: 'morning',   label: '起床' },
  { key: 'handover',  label: '申し送り' },
  { key: 'chat',      label: '雑談' },
  { key: 'emergency', label: '緊急' },
];
const MAX_Q = 5;

export default function HougenPage() {
  const [region, setRegion] = useState('kansai');
  const [scene,  setScene]  = useState('meal');
  const [level,  setLevel]  = useState(1);
  const [score,  setScore]  = useState(0);
  const [total,  setTotal]  = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [finished, setFinished] = useState(false);

  const loadQuestion = useCallback(async (currentTotal) => {
    if (currentTotal >= MAX_Q) { setFinished(true); return; }
    setLoading(true);
    setQuestion(null);
    setAnswered(false);
    setSelected(null);
    setError('');
    try {
      const res = await fetch('/api/hougen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region, scene, level }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || '問題の生成に失敗しました');
      setQuestion(data.question);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [region, scene, level]);

  useEffect(() => {
    setScore(0); setTotal(0); setStreak(0);
    setFinished(false);
    loadQuestion(0);
  }, [region, scene, level]);

  const speak = (text, fast) => {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = fast ? 1.45 : 0.95;
    speechSynthesis.speak(u);
  };

  const answer = (i) => {
    if (answered || !question) return;
    setAnswered(true);
    setSelected(i);
    const correct = i === question.correct_index;
    const newTotal = total + 1;
    setTotal(newTotal);
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
  };

  const next = () => loadQuestion(total);

  const restart = () => {
    setScore(0); setTotal(0); setStreak(0);
    setFinished(false);
    loadQuestion(0);
  };

  const pct = MAX_Q > 0 ? Math.round((total / MAX_Q) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', paddingBottom: 40 }}>
      {/* ヘッダー */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.1)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ fontSize: 13, color: '#1D9E75', textDecoration: 'none' }}>← ホームへ</a>
        <div style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>方言聞き取り練習</div>
        <div style={{ fontSize: 13, color: '#666' }}>
          <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{score}</span>/{total} 正解
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
        {/* プログレスバー */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ height: 4, background: 'rgba(0,0,0,.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', background: '#1D9E75', borderRadius: 2, transition: 'width .4s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999', marginTop: 4 }}>
            <span>問題 {Math.min(total + 1, MAX_Q)} / {MAX_Q}</span>
            <span>{level === 2 ? 'レベル2（早口）' : 'レベル1（ゆっくり）'}</span>
          </div>
        </div>

        {/* フィルター：地域 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>地域を選ぶ</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {REGIONS.map(r => (
              <button key={r.key} onClick={() => setRegion(r.key)}
                style={{ fontSize: 12, padding: '5px 12px', borderRadius: 999, border: `1px solid ${region === r.key ? '#1D9E75' : 'rgba(0,0,0,.12)'}`, background: region === r.key ? '#E1F5EE' : '#fff', color: region === r.key ? '#085041' : '#666', fontWeight: region === r.key ? 600 : 400, cursor: 'pointer' }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* フィルター：場面 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>場面を選ぶ</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {SCENES.map(s => (
              <button key={s.key} onClick={() => setScene(s.key)}
                style={{ fontSize: 12, padding: '5px 12px', borderRadius: 999, border: `1px solid ${scene === s.key ? '#534AB7' : 'rgba(0,0,0,.12)'}`, background: scene === s.key ? '#EEEDFE' : '#fff', color: scene === s.key ? '#3C3489' : '#666', fontWeight: scene === s.key ? 600 : 400, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* フィルター：難しさ */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>難しさ</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ v: 1, label: 'レベル1（ゆっくり）' }, { v: 2, label: 'レベル2（早口）' }].map(l => (
              <button key={l.v} onClick={() => setLevel(l.v)}
                style={{ fontSize: 12, padding: '5px 14px', borderRadius: 999, border: `1px solid ${level === l.v ? '#1D9E75' : 'rgba(0,0,0,.12)'}`, background: level === l.v ? '#E1F5EE' : '#fff', color: level === l.v ? '#085041' : '#666', fontWeight: level === l.v ? 600 : 400, cursor: 'pointer' }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* 連続正解バッジ */}
        {streak >= 2 && (
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, padding: '3px 12px', borderRadius: 999, background: '#FAEEDA', color: '#BA7517', marginBottom: 12 }}>
            {streak}連続正解！
          </div>
        )}

        {/* エラー */}
        {error && (
          <div style={{ background: '#FCEBEB', border: '1px solid #A32D2D', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#791F1F', marginBottom: 12 }}>
            エラー: {error}
            <br />
            <button onClick={() => loadQuestion(total)} style={{ marginTop: 8, fontSize: 13, padding: '6px 14px', borderRadius: 8, border: '1px solid #A32D2D', background: 'transparent', color: '#791F1F', cursor: 'pointer' }}>
              もう一度試す
            </button>
          </div>
        )}

        {/* ローディング */}
        {loading && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,.1)', padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#1D9E75', animation: `bounce 0.9s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>AIが問題を作っています...</div>
          </div>
        )}

        {/* 結果画面 */}
        {finished && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,.1)', padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 700 }}>{score} / {MAX_Q}</div>
            <div style={{ fontSize: 14, color: '#666', margin: '6px 0 16px' }}>正答率 {Math.round((score / MAX_Q) * 100)}%</div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 20 }}>
              {score >= 4 ? 'すばらしい！現場でも自信を持って聞き取れるレベルです。' : score >= 3 ? 'いい調子！もう一度練習してさらに力をつけましょう。' : '方言は難しいですね。ヒントをよく読んでもう一度挑戦！'}
            </div>
            <button onClick={restart} style={{ width: '100%', padding: 13, borderRadius: 8, border: '1px solid rgba(0,0,0,.1)', background: '#fff', fontSize: 15, cursor: 'pointer' }}>
              もう一度挑戦する
            </button>
          </div>
        )}

        {/* 問題カード */}
        {!loading && !finished && question && (
          <>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,.1)', padding: 18, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>{question.situation}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👴</div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {question.speaker}
                  {question.speed === 'fast' && <span style={{ marginLeft: 6, fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#FAEEDA', color: '#BA7517', fontWeight: 600 }}>早口</span>}
                </div>
              </div>
              <div style={{ background: '#f8f7f4', borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
                <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.5 }}>「{question.dialect_text}」</div>
                {answered && <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>標準語：{question.standard_jp}</div>}
              </div>
              <button onClick={() => speak(question.dialect_text, question.speed === 'fast')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,.12)', background: '#fff', color: '#666', cursor: 'pointer' }}>
                ▶ 聞いてみる{question.speed === 'fast' ? '（早口）' : ''}
              </button>
            </div>

            <div style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>{question.question}</div>

            <div style={{ display: 'grid', gap: 8 }}>
              {question.choices.map((c, i) => {
                let bg = '#fff', border = '1px solid rgba(0,0,0,.12)', color = '#1a1a1a';
                if (answered) {
                  if (i === question.correct_index) { bg = '#EAF3DE'; border = '1px solid #3B6D11'; color = '#27500A'; }
                  else if (i === selected) { bg = '#FCEBEB'; border = '1px solid #A32D2D'; color = '#791F1F'; }
                }
                return (
                  <button key={i} onClick={() => answer(i)} disabled={answered}
                    style={{ padding: '12px 16px', borderRadius: 8, border, background: bg, color, fontSize: 14, textAlign: 'left', cursor: answered ? 'default' : 'pointer', lineHeight: 1.5 }}>
                    {c}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div style={{ borderRadius: 8, padding: '12px 14px', marginTop: 12, fontSize: 13, lineHeight: 1.7, background: selected === question.correct_index ? '#EAF3DE' : '#FCEBEB', color: selected === question.correct_index ? '#27500A' : '#791F1F', border: `1px solid ${selected === question.correct_index ? '#3B6D11' : '#A32D2D'}` }}>
                {selected === question.correct_index ? '正解！' : `不正解。正解は「${question.choices[question.correct_index]}」です。`}
                <div style={{ marginTop: 6, fontSize: 12, opacity: .85 }}>{question.hint_ja}</div>
                {question.hint_id && <div style={{ marginTop: 4, fontSize: 12, opacity: .7 }}>{question.hint_id}</div>}
              </div>
            )}

            {answered && (
              <button onClick={next} style={{ width: '100%', padding: 13, borderRadius: 8, border: '1px solid rgba(0,0,0,.12)', background: '#fff', fontSize: 15, cursor: 'pointer', marginTop: 12 }}>
                {total >= MAX_Q ? '結果を見る' : '次の問題へ'}
              </button>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: .4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
