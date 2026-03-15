import { NextResponse } from 'next/server';

export async function POST(request) {
  const { category, lang, difficulty } = await request.json();

  const langNames = {
    ja: '日本語', id: 'インドネシア語', vi: 'ベトナム語',
    tl: 'フィリピン語', my: 'ミャンマー語', bn: 'ベンガル語',
    ne: 'ネパール語', km: 'クメール語',
  };

  const categories = {
    basic: '介護の基本・倫理・自己決定・尊厳',
    body: '身体介護・移乗・体位変換・ボディメカニクス',
    dementia: '認知症ケア・コミュニケーション・BPSD対応',
    meal: '食事介助・誤嚥予防・栄養・口腔ケア',
    toilet: '排泄介助・おむつ交換・トイレ誘導',
    bath: '入浴介助・清拭・皮膚ケア',
    emergency: 'ヒヤリハット・緊急時対応・報告連絡相談',
    record: '介護記録・申し送り・ICF',
    kanji: '介護現場で使う重要漢字・専門用語',
    law: '介護保険制度・法律・在留資格',
  };

  const difficultyText = {
    easy: '基礎レベル（N4-N3程度の日本語）',
    medium: '中級レベル（N3-N2程度）',
    hard: '上級レベル・介護福祉士試験本番レベル',
  };

  const systemPrompt = `あなたは介護福祉士試験対策の専門家です。
外国人介護士向けに問題を1問作成してください。

カテゴリ：${categories[category] || categories['basic']}
難易度：${difficultyText[difficulty] || difficultyText['medium']}

以下のJSON形式のみで返答してください（他のテキストは一切含めない）：
{
  "category": "カテゴリ名（日本語）",
  "question": "問題文（日本語）",
  "furigana": {"重要な漢字": "ふりがな"},
  "choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  "answer": 正解の選択肢番号（0-3の整数）,
  "explanation": {
    "ja": "日本語での解説（2-3文）",
    "${lang}": "${langNames[lang] || '英語'}での解説（2-3文）"
  },
  "tip": "現場で使えるワンポイントアドバイス（${langNames[lang] || '英語'}で）"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{ role: 'user', content: systemPrompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const question = JSON.parse(clean);
    return NextResponse.json({ question });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
