import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages, scenario, lang } = await request.json();

  const langNames = {
    ja: '日本語', id: 'インドネシア語', vi: 'ベトナム語',
    tl: 'フィリピン語', my: 'ミャンマー語', bn: 'ベンガル語',
    ne: 'ネパール語', km: 'クメール語',
  };

  const scenarios = {
    morning: '朝の起床介助・着替え・洗顔のシチュエーション',
    meal: '食事介助・食事前後の声かけのシチュエーション',
    bath: '入浴介助・脱衣・浴槽への移動のシチュエーション',
    toilet: 'トイレ介助・排泄ケアのシチュエーション',
    emergency: 'ヒヤリハット・緊急時の報告シチュエーション',
    handover: '申し送り・スタッフ間の引継ぎシチュエーション',
  };

  const systemPrompt = `あなたは介護施設の利用者（高齢者）または上司スタッフを演じるロールプレイAIです。
シナリオ：${scenarios[scenario] || scenarios['morning']}

【重要なルール】
1. 会話文だけを返してください。「**〇〇として：**」「*〇〇*」などの説明文・ト書き・役割名は絶対に含めないでください。
2. セリフのみをそのまま話してください。例：「おはようございます。今日はお天気がいいですね。」
3. 各返答の後に必ず以下のJSON補足を追加してください：
---FEEDBACK---
{
  "translation": "${langNames[lang] || '英語'}でのこの会話の意味",
  "tip": "介護現場での大切なポイント（${langNames[lang] || '英語'}で）",
  "nextSuggestion": "次にこう言ってみましょう（日本語）"
}
---END---

利用者として話す場合は、認知症や身体的な不安を持つ高齢者として自然に演じてください。
相手（研修生）が不自然な日本語を使っても優しく会話を続けてください。`;

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

    // メッセージとフィードバックを分離
    const parts = text.split('---FEEDBACK---');
    let message = parts[0].trim();

    // 説明文・ト書き・役割名を除去
    // **〇〇として：** や *〇〇* や # 見出し などを削除
    message = message
      .replace(/\*\*[^*]+\*\*/g, '')      // **太字** を削除
      .replace(/\*[^*]+\*/g, '')           // *斜体* を削除
      .replace(/^#+\s+.+$/gm, '')          // # 見出し を削除
      .replace(/^\s*[\[【].*?[\]】]\s*$/gm, '') // 【説明】を削除
      .replace(/^.*として[：:]\s*/gm, '')  // 〇〇として： を削除
      .replace(/^.*役として[：:]\s*/gm, '') // 〇〇役として： を削除
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
      .trim();
    let feedback = null;

    if (parts[1]) {
      try {
        const jsonStr = parts[1].replace('---END---', '').trim();
        feedback = JSON.parse(jsonStr);
      } catch (e) {
        feedback = null;
      }
    }

    return NextResponse.json({ message, feedback });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
