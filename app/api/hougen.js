const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const REGION_NAMES = {
  kansai:   '関西弁（大阪・兵庫）',
  hiroshima:'広島弁',
  tohoku:   '東北弁（宮城・岩手）',
  kyushu:   '九州弁（福岡・熊本）',
  nagoya:   '名古屋弁',
  okinawa:  '沖縄弁',
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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { region = 'kansai', scene = 'meal', level = 1 } = req.body || {};

  const regionName  = REGION_NAMES[region]  || REGION_NAMES.kansai;
  const sceneName   = SCENE_NAMES[scene]    || SCENE_NAMES.meal;
  const speedNote   = level >= 2
    ? '早口・省略多め（申し送りや忙しい場面のイメージ）'
    : 'ゆっくり・わかりやすい方言まじり';

  const prompt = `あなたは介護現場の日本語学習ゲームの問題作成AIです。

以下の条件で問題を1問作ってください。

【条件】
- 方言：${regionName}
- 場面：${sceneName}
- 速さ・難易度：${speedNote}
- 話者：介護施設のスタッフまたは利用者（高齢者）

【出力形式】
必ずJSON形式のみで返してください。余分な説明は不要です。

{
  "situation": "場面説明（例：朝の申し送り中、先輩スタッフが話しています）",
  "speaker": "話者名と出身（例：先輩スタッフ・広島出身）",
  "dialect_text": "方言のセリフ（自然な方言で。20〜40文字程度）",
  "speed": "${level >= 2 ? 'fast' : 'normal'}",
  "question": "このセリフの意味は何ですか？",
  "choices": [
    "正解の選択肢（標準語訳）",
    "間違い1（似ているが違う）",
    "間違い2（全く違う）",
    "間違い3（紛らわしい）"
  ],
  "correct_index": 0,
  "hint_ja": "方言の解説（どの言葉がどういう意味か、日本語で）",
  "hint_id": "Penjelasan dalam Bahasa Indonesia（インドネシア語での解説）",
  "standard_jp": "セリフの標準語訳（全文）"
}

注意：
- choices配列は必ず4つ
- correct_indexは0〜3の整数（正解が入るインデックス）
- 正解は配列の0番目に入れてください（表示時にシャッフルします）
- 介護現場で本当に使われる自然な表現にしてください`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = response.content[0].text.trim();

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON not found in response');

    const question = JSON.parse(jsonMatch[0]);

    const choices = question.choices || [];
    const correct = choices[0];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    question.correct_index = choices.indexOf(correct);
    question.choices = choices;

    return res.status(200).json({ success: true, question });

  } catch (err) {
    console.error('hougen API error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
