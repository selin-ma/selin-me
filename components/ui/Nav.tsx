'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.skills', href: '#skills' },
  { labelKey: 'nav.work', href: '#showcase' },
  { labelKey: 'nav.vibe', href: '#vibe' },
  { labelKey: 'nav.life', href: '#life' },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Scroll progress bar — desktop only ──────────────────────────── */}
      <div
        className="progress-bar hidden md:block"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* ── Mobile header (full-width, sticky) ─────────────────────────── */}
      <header
        style={{ width: '100dvw' }}
        className={cn(
          'fixed left-0 top-0 z-50 flex items-center justify-between px-5  transition-all duration-300 md:hidden',
          scrolled || menuOpen
            ? 'bg-white shadow-[0_2px_16px_rgba(28,25,23,0.08)]'
            : 'bg-white/80 backdrop-blur-sm',
        )}
      >
        <a
          href="#"
          aria-label="Home"
          className="flex h-9 w-9 overflow-hidden rounded-full transition-opacity hover:opacity-80 flex-shrink-0"
          onClick={menuOpen ? closeMenu : undefined}
        >
          {/* <Image
            src="/images/avatar.png"
            alt="avatar"
            className="h-full w-full object-cover"
            width={100}
            height={100}
          /> */}
        </a>

        {/* Mobile progress bar — bottom edge of header */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-terra transition-[width] duration-100 linear"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink/[0.06]"
        >
          <span className="material-symbols-outlined select-none text-ink text-base">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </header>

      {/* ── Desktop floating pill nav ────────────────────────────────────── */}
      <nav className="fixed left-0 right-0 top-0 z-50 hidden justify-center pt-5 md:flex md:px-4">
        <div
          className={cn(
            'flex items-center gap-1 rounded-full px-4 py-2 transition-all duration-500',
            scrolled || menuOpen
              ? 'bg-white shadow-[0_4px_28px_rgba(28,25,23,0.12)]'
              : 'bg-transparent shadow-none',
          )}
        >
          <a
            href="#"
            aria-label="Home"
            className="mr-2 flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-full transition-opacity hover:opacity-80"
          >
            <Image
              // src="/images/avatar.png"
              src="/images/hero/shero.jpg"
              alt="avatar"
              className="h-full w-full object-cover object-right"
              width={100}
              height={100}
            />
          </a>

          <ul className="flex items-center gap-1 h-full">
            {NAV_LINKS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'inline-flex h-full group relative px-3 font-body text-sm tracking-[0.05em] transition-all duration-500 ease-out',
                      isActive ? 'text-olive font-medium' : 'text-ink hover:text-olive',
                    )}
                  >
                    <span className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                      {t(item.labelKey)}
                    </span>
                    <span
                      className={cn(
                        'absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-olive transition-all duration-500 ease-out',
                        isActive
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-60',
                      )}
                      style={
                        isActive ? { animation: 'breathe 2.4s ease-in-out infinite' } : undefined
                      }
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-5 h-full">
            <LanguageSwitch />
            <a
              href="#contact"
              className="rounded-full border border-ink/20 px-4 py-1.5 font-body text-sm tracking-[0.05em] text-ink transition-all duration-300 ease-out hover:border-olive-lt hover:bg-olive-lt hover:text-white"
            >
              {t('nav.hireMe')}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Mobile dropdown — slides in from right ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Full-width drawer — slides in from right */}
            <div
              className="fixed left-0 top-0 z-50 h-[500px] overflow-hidden md:hidden"
              style={{ width: '100dvw' }}
            >
              <motion.div
                key="mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full w-full flex-col border-l border-white/20 bg-white/85 backdrop-blur-md"
              >
                {/* Top bar — close button */}
                <div className="flex items-center justify-between px-6 pr-8 py-4 border-b border-ink/[0.07]">
                  <button
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink/[0.06]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 1l12 12M13 1L1 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <LanguageSwitch />
                </div>

                {/* Nav links */}
                <ul className="flex-1 px-6 pt-4">
                  {NAV_LINKS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.07,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center border-b border-ink/[0.07] py-3 font-display text-xl text-ink transition-colors duration-200 hover:text-terra"
                      >
                        {t(item.labelKey)}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="px-6 pb-8 pt-4"
                >
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-full bg-olive py-3 font-body text-[0.78rem] tracking-[0.08em] text-white transition-all duration-300 active:scale-[0.98] hover:bg-olive-dark"
                  >
                    {t('nav.hireMe')}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
