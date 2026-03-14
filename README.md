# 🏥 介護先生Pro | Kaigo Sensei Pro

外国人介護福祉士を目指す方のための多言語学習アプリです。
介護福祉士国家試験対策・AI会話練習・学習進捗管理を7言語でサポートします。

---

## 🌏 対応言語

| 言語 | 国 | コード |
|------|-----|--------|
| 日本語 | 🇯🇵 日本 | `ja` |
| インドネシア語 | 🇮🇩 インドネシア | `id` |
| ベトナム語 | 🇻🇳 ベトナム | `vi` |
| フィリピン語（タガログ語） | 🇵🇭 フィリピン | `tl` |
| ミャンマー語 | 🇲🇲 ミャンマー | `my` |
| ベンガル語 | 🇧🇩 バングラデシュ | `bn` |
| ネパール語 | 🇳🇵 ネパール | `ne` |
| クメール語 | 🇰🇭 カンボジア | `km` |

---

## 📁 ディレクトリ構成

```
kaigo-sensei-pro/
├── src/
│   ├── app/
│   │   ├── page.jsx          # トップページ
│   │   ├── layout.js         # 共通レイアウト（LangProvider）
│   │   ├── globals.css
│   │   ├── exam/page.jsx     # 国家試験対策
│   │   ├── roleplay/page.jsx # AI会話ロールプレイ
│   │   └── progress/page.jsx # 学習進捗ダッシュボード
│   ├── components/
│   │   ├── NavBar.jsx        # ナビゲーションバー
│   │   └── LanguageSwitcher.jsx # 言語切り替えUI
│   ├── lib/
│   │   └── LangContext.jsx   # 言語グローバル状態管理
│   └── locales/
│       └── languages.js      # 8言語の翻訳テキスト定義
├── public/
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

---

## 🚀 ローカル開発手順

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## 📤 GitHubへのアップロード手順

```bash
# プロジェクトフォルダに移動
cd kaigo-sensei-pro

# Gitの初期化
git init

# 全ファイルをステージング
git add .

# 初回コミット
git commit -m "first commit: 介護先生Pro 初期構築（8言語対応）"

# GitHubでリポジトリ作成後（YOUR_USERNAMEを変更）
git remote add origin https://github.com/YOUR_USERNAME/kaigo-sensei-pro.git
git branch -M main
git push -u origin main
```

---

## ☁️ Vercelへのデプロイ手順

1. [https://vercel.com](https://vercel.com) にログイン
2. **「Add New → Project」** をクリック
3. `kaigo-sensei-pro` リポジトリを選択
4. **「Deploy」** をクリック
5. 数分後にURLが発行されます

---

## 🔑 環境変数の設定

Vercelダッシュボード → Settings → Environment Variables に追加：

| 変数名 | 用途 |
|--------|------|
| `ANTHROPIC_API_KEY` | Claude AI API（ロールプレイ機能） |

ローカルでは `.env.local` に記載：
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

---

## 🛠 翻訳テキストの追加・編集

`src/locales/languages.js` の `UI_TEXT` オブジェクトを編集してください。

```js
// 新しい言語を追加する場合
export const LANGUAGES = [
  ...
  { code: 'th', label: 'ไทย', flag: '🇹🇭', name: 'タイ語' }, // 追加例
];

export const UI_TEXT = {
  ...
  th: {
    appName: 'Kaigo Sensei Pro',
    tagline: '...',
    // 他のキーも追加
  },
};
```

---

## 🛠 使用技術

| 技術 | バージョン |
|------|-----------|
| Next.js | 14.x (App Router) |
| React | 18.x |
| Tailwind CSS | 3.x |
| Vercel | デプロイ基盤 |

---

*外国人介護士の日本での活躍を全力サポート 🌏*
