'use client';

import { useI18n } from '@/components/i18n/I18nProvider';

const CONTACT_LINKS = [
  { label: '✉ Email Me', href: 'mailto:hello@yourname.com', isPrimary: true },
  { label: '↗ GitHub', href: 'https://github.com', isPrimary: false },
  { label: '↗ LinkedIn', href: 'https://linkedin.com', isPrimary: false },
  { label: '↓ Resume PDF', href: '/resume.pdf', isPrimary: false },
] as const;

export function ContactSection() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-28 text-cream"
    >
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-terra/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-sage/[0.07] blur-3xl"
        aria-hidden="true"
      />

      {/* Fine grid */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 font-body text-[0.7rem] uppercase tracking-[0.3em] text-gold/70">
          {t('contact.kicker')}
        </p>

        <h2 className="mb-6 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.15] text-cream">
          {t('contact.title.line1')}
          <br />
          <em className="text-terra">{t('contact.title.em')}</em>
        </h2>

        <p className="mx-auto mb-10 max-w-md font-body text-[0.92rem] leading-[1.9] text-cream/45">
          {t('contact.lede')}
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {CONTACT_LINKS.map(({ label, href, isPrimary }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={
                isPrimary
                  ? 'rounded-full bg-terra px-6 py-3 font-body text-[0.78rem] tracking-[0.08em] text-cream transition-all hover:-translate-y-0.5 hover:bg-terra/80'
                  : 'rounded-full border border-cream/15 px-6 py-3 font-body text-[0.78rem] tracking-[0.08em] text-cream/70 transition-all hover:-translate-y-0.5 hover:border-cream/30 hover:bg-cream/[0.08] hover:text-cream'
              }
            >
              {label}
            </a>
          ))}
        </div>

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-cream/10 bg-cream/[0.05] px-5 py-2.5">
          <span
            className="inline-block h-[7px] w-[7px] animate-pulse rounded-full bg-sage"
            aria-hidden="true"
          />
          <span className="font-body text-[0.7rem] tracking-[0.1em] text-cream/50">
            {t('contact.availability')}
          </span>
        </div>
      </div>
    </section>
  );
}
