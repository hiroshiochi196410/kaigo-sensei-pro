'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← トップへ戻る
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-sm text-gray-700 leading-relaxed">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">プライバシーポリシー</h1>
            <p className="text-xs text-gray-400">最終更新日：2026年3月15日</p>
          </div>

          <p>アイプルーフ（以下「当社」）は、介護先生Pro（以下「本サービス」）における個人情報の取扱いについて、以下の通りプライバシーポリシーを定めます。</p>

          {[
            {
              title: '1. 収集する情報',
              content: `本サービスでは、以下の情報を収集する場合があります。
・メールアドレス（アカウント登録時）
・決済情報（Stripeが管理・保管します。当社はカード情報を保持しません）
・入力した会話内容・学習データ
・アクセスログ（IPアドレス、ブラウザ情報、利用日時）`,
            },
            {
              title: '2. 情報の利用目的',
              content: `収集した情報は以下の目的で利用します。
・本サービスの提供・運営
・決済処理
・カスタマーサポート
・サービスの改善・新機能開発
・利用統計の作成（個人を特定しない形式）`,
            },
            {
              title: '3. 第三者への提供',
              content: `以下のサービスと情報を共有します。
・Anthropic（AI会話・記録生成のため）
・Stripe（決済処理のため）
・Vercel（サービスホスティングのため）
法令に基づく場合を除き、その他の第三者への提供は行いません。`,
            },
            {
              title: '4. 音声データについて',
              content: `マイク機能はブラウザ標準のWeb Speech APIを使用しています。音声データはブラウザ内で処理され、当社のサーバーには送信・保存されません。`,
            },
            {
              title: '5. Cookie・ローカルストレージ',
              content: `本サービスはローカルストレージを使用して学習履歴・進捗データをお客様のデバイスに保存します。このデータはお客様のデバイス内にのみ存在し、当社サーバーには送信されません。`,
            },
            {
              title: '6. データの保管期間',
              content: `アカウント情報：解約後3ヶ月で削除
学習データ：ブラウザのローカルストレージに保存（ユーザーが削除可能）
決済情報：Stripeの規約に準拠`,
            },
            {
              title: '7. セキュリティ',
              content: `HTTPS暗号化通信によりデータを保護します。APIキー等の機密情報は環境変数で管理し、外部に公開しません。`,
            },
            {
              title: '8. お客様の権利',
              content: `ご自身の個人情報について、開示・訂正・削除を請求する権利があります。下記お問い合わせ先までご連絡ください。`,
            },
            {
              title: '9. お問い合わせ',
              content: `個人情報に関するお問い合わせ：support@aipuru-hu.net
アイプルーフ 運営責任者：越智 宏志`,
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="font-bold text-gray-800 mb-2">{section.title}</h2>
              <p className="whitespace-pre-line text-gray-600">{section.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
