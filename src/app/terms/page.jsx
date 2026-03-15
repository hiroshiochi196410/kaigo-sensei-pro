'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function TermsPage() {
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">利用規約</h1>
            <p className="text-xs text-gray-400">最終更新日：2026年3月15日</p>
          </div>

          <p>この利用規約（以下「本規約」）は、アイプルーフ（以下「当社」）が提供する介護先生Pro（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用いただく前に、必ずお読みください。</p>

          {[
            {
              title: '第1条（適用）',
              content: '本規約は、本サービスの利用に関する当社とユーザーの間の権利義務関係を定めることを目的とし、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。',
            },
            {
              title: '第2条（サービス内容）',
              content: `本サービスは、以下の機能を提供します。
・AI介護記録アシスト（母国語から日本語介護記録文の生成）
・介護福祉士国家試験対策（練習問題・解説）
・AI会話ロールプレイ（介護シチュエーション練習）
・学習進捗ダッシュボード
・多言語UI（8言語対応）`,
            },
            {
              title: '第3条（料金プラン）',
              content: `無料プラン：AI記録アシスト1日10回、試験対策1日5問
プロプラン：月額500円（税込）、全機能無制限
施設・送り出し機関プラン：月額3,000円〜（税込）、管理機能付き

クーポンコードをお持ちの方は無料でプロプランをご利用いただけます。`,
            },
            {
              title: '第4条（支払・更新）',
              content: 'プロプランはStripeによるクレジットカード決済で月額課金されます。解約しない限り毎月自動更新されます。',
            },
            {
              title: '第5条（解約・返金）',
              content: 'いつでも解約可能です。月途中の解約による日割り返金はございません。解約後は次回更新日まで引き続きご利用いただけます。',
            },
            {
              title: '第6条（禁止事項）',
              content: `ユーザーは以下の行為を行ってはなりません。
・アカウントの第三者への譲渡・共有
・本サービスの逆コンパイル・リバースエンジニアリング
・本サービスを利用した営利目的の転売
・虚偽情報の入力
・その他当社が不適切と判断する行為`,
            },
            {
              title: '第7条（免責事項）',
              content: '本サービスは学習支援ツールです。AIが生成する介護記録文は参考用であり、実際の業務での使用に際しては必ず施設のルールに従い、専門職の確認を受けてください。当社は本サービスの利用により生じた損害について責任を負いません。',
            },
            {
              title: '第8条（サービスの変更・停止）',
              content: '当社は、ユーザーへの事前通知なく本サービスの内容を変更または停止することがあります。',
            },
            {
              title: '第9条（準拠法・管轄）',
              content: '本規約は日本法に準拠します。本サービスに関する紛争については、広島地方裁判所を第一審の専属的合意管轄裁判所とします。',
            },
            {
              title: '第10条（お問い合わせ）',
              content: 'support@aipuru-hu.net\nアイプルーフ 運営責任者：越智 宏志\n〒739-0036 広島県東広島市西条町田口2759-5',
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
