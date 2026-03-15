import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages, scenario, lang, mode } = await request.json();

  const langNames = {
    ja: '日本語', id: 'インドネシア語', vi: 'ベトナム語',
    tl: 'フィリピン語', my: 'ミャンマー語', bn: 'ベンガル語',
    ne: 'ネパール語', km: 'クメール語',
  };

  const scenarios = {
    morning: '朝の起床介助・着替え・洗顔',
    meal: '食事介助・食事前後の声かけ',
    bath: '入浴介助・脱衣・浴槽への移動',
    toilet: 'トイレ介助・排泄ケア',
    emergency: 'ヒヤリハット・緊急時の報告',
    handover: '申し送り・スタッフ間の引継ぎ',
  };

  // モード1: シナリオ説明・ヒント生成
  if (mode === 'hint') {
    const hintPrompt = `あなたは介護福祉士の指導者です。
以下のシナリオについて、外国人介護士に${langNames[lang] || '英語'}で説明してください。

シナリオ：${scenarios[scenario]}

以下のJSON形式のみで返答してください（他のテキストは含めない）：
{
  "situation": "${langNames[lang] || '英語'}でシナリオの状況説明（2〜3文）",
  "why": "${langNames[lang] || '英語'}でこの場面で大切な介護の考え方（自己決定・尊厳・観察等）",
  "good_example": "良い声かけの日本語例（1文）",
  "bad_example": "避けるべき声かけの日本語例（1文）",
  "tips": ["${langNames[lang] || '英語'}でのポイント1", "ポイント2", "ポイント3"]
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
          max_tokens: 1000,
          messages: [{ role: 'user', content: hintPrompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const hint = JSON.parse(clean);
      return NextResponse.json({ hint });
    } catch (e) {
      return NextResponse.json({ error: true }, { status: 500 });
    }
  }

  // モード2: 通常会話（ユーザーが先に話す）
  const systemPrompt = `あなたは介護施設の利用者（高齢者）または上司スタッフを演じるロールプレイAIです。
シナリオ：${scenarios[scenario] || scenarios['morning']}

【絶対的なルール】
1. 会話のセリフだけを返してください
2. 「**〇〇として**」「*説明*」「#見出し」などの説明・ト書き・役割名は一切含めない
3. セリフのみ。例：「おはようございます。今日はよく眠れましたか？」

各返答の後に必ずFEEDBACKを追加：
---FEEDBACK---
{
  "translation": "${langNames[lang] || '英語'}でこの会話の意味",
  "tip": "介護福祉士として大切なポイント（${langNames[lang] || '英語'}で）",
  "nextSuggestion": "次にこう言ってみましょう（日本語）"
}
---END---

利用者として話す場合は認知症や身体的な不安を持つ高齢者として自然に演じてください。`;

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
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const parts = text.split('---FEEDBACK---');
    let message = parts[0].trim();

    // 説明文・ト書きを除去
    message = message
      .replace(/\*\*[^*]+\*\*/g, '')
      .replace(/\*[^*]+\*/g, '')
      .replace(/^#+\s+.+$/gm, '')
      .replace(/^\s*[\[【].*?[\]】]\s*$/gm, '')
      .replace(/^.*として[：:]\s*/gm, '')
      .replace(/^.*役として[：:]\s*/gm, '')
      .split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n').trim();

    let feedback = null;
    if (parts[1]) {
      try {
        feedback = JSON.parse(parts[1].replace('---END---', '').trim());
      } catch (e) { feedback = null; }
    }

    return NextResponse.json({ message, feedback });
  } catch (e) {
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
