'use client';

import { usePathname } from 'next/navigation';

import { useI18n } from '@/components/i18n/I18nProvider';
import { defaultLocale, isLocale, localeMeta, locales } from '@/lib/i18n';
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

export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname() ?? '/';
  const { locale } = useI18n();

  const items = locales.map((l) => ({
    locale: l,
    label: localeMeta[l].label,
    href: replaceLocaleInPath(pathname, l),
    active: l === locale,
  }));

  const currentLabel = localeMeta[locale]?.label ?? localeMeta[defaultLocale].label;

  return (
    <div className={cn('relative', className)}>
      <details className="group">
        <summary className="list-none cursor-pointer select-none rounded-full border border-ink/15 px-3 py-1.5 font-body text-[0.72rem] uppercase tracking-[0.15em] text-ink-light/60 transition-all hover:border-ink hover:bg-ink hover:text-cream">
          {currentLabel}
        </summary>
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-ink/10 bg-cream shadow-lg">
          <ul className="py-1">
            {items.map((it) => (
              <li key={it.locale}>
                <a
                  href={it.href}
                  className={cn(
                    'block px-3 py-2 font-body text-[0.78rem] text-ink-light/70 hover:bg-ink/5',
                    it.active && 'bg-ink/5 text-ink',
                  )}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

