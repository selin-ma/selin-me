'use client';

import { useI18n } from '@/components/i18n/I18nProvider';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-cream/5 bg-ink py-5 text-center font-body text-[0.65rem] uppercase tracking-[0.15em] text-cream/20">
      {t('footer.line', { year: new Date().getFullYear() })}
    </footer>
  );
}
