'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function TokushoPage() {
  const router = useRouter();

  const items = [
    { label: '販売事業者', value: 'アイプルーフ（aipuru-hu）' },
    { label: '運営責任者', value: '越智 宏志' },
    { label: '所在地', value: '〒739-0036 広島県東広島市西条町田口2759-5' },
    { label: 'お問い合わせ', value: 'support@aipuru-hu.net' },
    { label: '販売価格', value: 'プロプラン：月額500円（税込）／施設プラン：月額3,000円〜（税込）' },
    { label: '支払方法', value: 'クレジットカード（Stripe）、クーポンコード' },
    { label: '支払時期', value: '月額課金（毎月自動更新）' },
    { label: 'サービス提供時期', value: '決済完了後、即時利用可能' },
    { label: '返品・キャンセル', value: '月途中のキャンセルによる日割り返金はございません。解約後は次回更新日まで利用可能です。' },
    { label: '動作環境', value: 'Google Chrome最新版を推奨。マイク・音声機能にはChrome必須。' },
    { label: 'サービス内容', value: 'AIを活用した介護福祉士試験対策・介護記録アシスト・AI会話ロールプレイ（多言語対応）' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">
          ← トップへ戻る
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">特定商取引法に基づく表記</h1>
          <p className="text-xs text-gray-400 mb-6">最終更新日：2026年3月15日</p>

          <table className="w-full text-sm">
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <th className="text-left py-4 pr-4 text-gray-600 font-semibold w-1/3 align-top">
                    {item.label}
                  </th>
                  <td className="py-4 text-gray-700 leading-relaxed">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
