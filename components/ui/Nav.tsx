'use client';

import { useEffect, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { cn } from '@/lib/utils';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 60);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      <nav
        className={cn(
          'fixed left-0 right-0 top-0 z-50 py-5 transition-all duration-500',
          scrolled && 'bg-cream/90 py-3 shadow-sm backdrop-blur-md',
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center">
          <a
            href="#"
            className="font-display text-sm italic text-ink/70 transition-colors hover:text-terra"
          >
            {t('nav.myStory')}
          </a>

          <ul className="hidden gap-8 md:flex">
            {(
              [
                { label: t('nav.about'), href: '#about' },
                { label: t('nav.experience'), href: '#experience' },
                { label: t('nav.skills'), href: '#skills' },
                { label: t('nav.life'), href: '#life' },
                { label: t('nav.contact'), href: '#contact' },
              ] as const
            ).map((item) => (
              <li
                key={item.href}
                className="relative font-body text-[0.72rem] uppercase tracking-[0.18em] text-ink-light/60 transition-colors duration-300 after:absolute after:-bottom-1 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-terra after:transition-all after:duration-300 hover:text-terra hover:after:w-4"
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center justify-end gap-3 md:flex">
            <LanguageSwitch />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 font-body text-[0.72rem] uppercase tracking-[0.15em] transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              {t('nav.hireMe')}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
