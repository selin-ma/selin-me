import '@/app/globals.css';

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import { I18nProvider } from '@/components/i18n/I18nProvider';
import { ChatBot } from '@/components/ui/ChatBot';
import { IconFonts } from '@/components/ui/IconFonts';

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

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
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable}`}
    >
      <body>
        <I18nProvider>{children}</I18nProvider>
        <ChatBot />
        <IconFonts />
      </body>
    </html>
  );
}
