import { NextResponse } from 'next/server';

const REGION_NAMES = {
  kansai:    '関西弁（大阪・兵庫）',
  hiroshima: '広島弁',
  tohoku:    '東北弁（宮城・岩手）',
  kyushu:    '九州弁（福岡・熊本）',
  nagoya:    '名古屋弁',
  okinawa:   '沖縄弁',
};

const SCENE_NAMES = {
  meal:      '食事介助の場面',
  bath:      '入浴介助の場面',
  toilet:    'トイレ介助の場面',
  morning:   '朝の起床介助の場面',
  handover:  '申し送りの場面',
  chat:      '休憩中の雑談の場面',
  emergency: '急変・緊急時の場面',
};

export async function POST(request) {
  const { region = 'kansai', scene = 'meal', level = 1 } = await request.json();
  const regionName = REGION_NAMES[region] || REGION_NAMES.kansai;
  const sceneName = SCENE_NAMES[scene] || SCENE_NAMES.meal;
  const speedNote = level >= 2 ? '早口・省略多め' : 'ゆっくり・わかりやすい方言まじり';

  const prompt = `介護現場の日本語学習ゲームの問題を1問作ってください。方言：${regionName}、場面：${sceneName}、速さ：${speedNote}。必ずJSON形式のみで返してください：{"situation":"場面説明","speaker":"話者名と出身","dialect_text":"方言セリフ20〜40文字","speed":"${level >= 2 ? 'fast' : 'normal'}","question":"このセリフの意味は何ですか？","choices":["正解","間違い1","間違い2","間違い3"],"correct_index":0,"hint_ja":"方言解説","hint_id":"Penjelasan Bahasa Indonesia","standard_jp":"標準語訳"}`;

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
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await response.json();
    const raw = data.content?.[0]?.text || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON not found');
    const question = JSON.parse(jsonMatch[0]);
    const choices = [...(question.choices || [])];
    const correct = choices[0];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    question.correct_index = choices.indexOf(correct);
    question.choices = choices;
    return NextResponse.json({ success: true, question });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
