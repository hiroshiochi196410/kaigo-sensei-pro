import './globals.css';
import { LangProvider } from '@/lib/LangContext';
import Footer from '@/components/Footer';

export const metadata = {
  title: '介護先生Pro | Kaigo Sensei Pro',
  description: '外国人介護福祉士のための多言語学習アプリ。AI介護記録アシスト・国家試験対策・会話ロールプレイ（8言語対応）',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <LangProvider>
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
