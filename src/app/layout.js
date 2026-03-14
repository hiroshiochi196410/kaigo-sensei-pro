import './globals.css';
import { LangProvider } from '@/lib/LangContext';

export const metadata = {
  title: '介護先生Pro | Kaigo Sensei Pro',
  description: '外国人介護福祉士のための多言語学習アプリ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
