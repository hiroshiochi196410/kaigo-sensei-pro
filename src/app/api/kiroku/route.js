import { NextResponse } from 'next/server';

export async function POST(request) {
  const { input, lang } = await request.json();

  const langNames = {
    ja: '日本語', id: 'インドネシア語', vi: 'ベトナム語',
    tl: 'フィリピン語', my: 'ミャンマー語', bn: 'ベンガル語',
    ne: 'ネパール語', km: 'クメール語',
  };

  const systemPrompt = `あなたは介護施設で働く外国人介護士を支援するAIアシスタントです。
入力された介護の状況を、日本の介護施設で使われる正式な介護記録文に変換してください。

以下のJSON形式で回答してください：
{
  "kiroku": "正式な日本語介護記録文（2〜4文）",
  "words": [
    {"kanji": "漢字", "furigana": "ふりがな", "translation": "${langNames[lang] || '英語'}での意味"},
    ...（3〜5個）
  ],
  "explanation": "${langNames[lang] || '英語'}で記録文の内容を簡単に説明"
}

介護記録のルール：
- 敬体（です・ます）ではなく常体（だ・である体）で書く
- バイタル・ADL・表情・食事・排泄などの観察項目を含める
- 専門用語を適切に使う（摂取量、排泄、バイタルサイン等）
- 主観的表現より客観的表現を使う
- 【重要】利用者の名前は必ずカタカナの名字に変換して「〇〇さん」とさん付けにする
  例：田中一郎 → タナカさん、山田花子 → ヤマダさん（名字のみカタカナ＋さん）
  名前が不明な場合は「ご利用者さん」と記載する
- JSONのみ返答し、他のテキストは含めない`;

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
        messages: [{ role: 'user', content: input }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // JSONをパース
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
