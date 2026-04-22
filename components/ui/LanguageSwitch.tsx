'use client';

import { usePathname } from 'next/navigation';

import { useI18n } from '@/components/i18n/I18nProvider';
import { isLocale, locales } from '@/lib/i18n';
import { cn } from '@/lib/utils';

function replaceLocaleInPath(pathname: string, nextLocale: string) {
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0] ?? '';
  if (isLocale(first)) {
    parts[0] = nextLocale;
  } else {
    parts.unshift(nextLocale);
  }
  return `/${parts.join('/')}${pathname.endsWith('/') ? '/' : ''}`;
}

const SHORT_LABEL: Record<string, string> = { zh: 'CN', en: 'EN' };

export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname() ?? '/';
  const { locale } = useI18n();

  const items = locales.map((l) => ({
    locale: l,
    label: SHORT_LABEL[l] ?? l.toUpperCase(),
    href: replaceLocaleInPath(pathname, l),
    active: l === locale,
  }));

  return (
    <div className={cn('flex items-center gap-1.5 h-full', className)}>
      {items.map((it, i) => (
        <>
          {i > 0 && (
            <span key={`divider-${it.locale}`} className="h-3 w-px bg-ink/20" aria-hidden="true" />
          )}
          <a
            key={it.locale}
            href={it.href}
            className={cn(
              'inline-flex h-full items-center px-3 font-body text-sm tracking-[0.05em] transition-colors duration-200',
              it.active ? 'font-medium text-olive-dark' : 'text-ink/50 hover:text-ink/80',
            )}
          >
            {it.label}
          </a>
        </>
      ))}
    </div>
  );
}
