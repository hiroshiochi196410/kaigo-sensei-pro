import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { category, categoryLabel, description, difficulty, difficultyLabel } = await req.json();

    const prompt = `あなたは介護福祉士国家試験の問題作成専門家です。
以下の条件で問題を1問作成してください。

科目：${categoryLabel}
出題範囲：${description}
難易度：${difficultyLabel}（${difficulty === 'basic' ? '基本的な知識を問う' : difficulty === 'standard' ? '実務に即した応用問題' : '複合的な判断力を問う難問'}）

必ず以下のJSON形式のみで返してください（他の文字は一切含めないこと）：
{
  "question": "問題文（具体的な場面設定を含む）",
  "choices": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  "answer": 0,
  "explanation": "正解の解説（なぜ正しいか、他の選択肢がなぜ誤りかを含む）",
  "point": "この問題で学ぶべき重要ポイント（1〜2文）"
}

answerは正解の選択肢のインデックス（0〜3）です。
問題は実際の国家試験に近い形式で、介護の現場を想定した具体的な場面を設定してください。`;

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
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
