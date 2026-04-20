'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo } from 'react';

import {
  defaultLocale,
  formatMessage,
  isLocale,
  localeMeta,
  messages,
  type Locale,
} from '@/lib/i18n';

type I18nContextValue = {
  locale: Locale;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) return defaultLocale;
  const seg = pathname.split('/').filter(Boolean)[0] ?? '';
  return isLocale(seg) ? seg : defaultLocale;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    const lang = localeMeta[locale].htmlLang;
    document.documentElement.lang = lang;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = messages[locale];
    const t = (key: string, vars?: Record<string, string | number>) =>
      formatMessage(dict[key] ?? key, vars);
    return { locale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
