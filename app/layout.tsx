import type { Metadata } from 'next';

import '@/app/globals.css';
import { I18nProvider } from '@/components/i18n/I18nProvider';

export const metadata: Metadata = {
  title: 'Portfolio — Frontend Engineer',
  description: '5年前端工程师的职业故事与技术积累',
  openGraph: {
    title: 'Portfolio — Frontend Engineer',
    description: '5年前端工程师的职业故事与技术积累',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
