'use client';

import { motion } from 'framer-motion';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';

const CONTACT_LINKS = [
  { label: '✉ Email Me', href: 'mailto:selinny921@gmail.com', isPrimary: true },
  { label: '↗ GitHub', href: 'https://github.com/selin-ma/', isPrimary: false },
  { label: '↗ LinkedIn', href: 'https://www.linkedin.com/in/yudi-ma-6026a1183/', isPrimary: false },
] as const;

export function ContactSection() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#1A1F18] py-10 md:py-[100px] text-cream"
    >
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-olive/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-olive-lt/[0.07] blur-3xl"
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

      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-olive-dark"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('contact.kicker')}
          </motion.p>

          <motion.h2
            className="mb-6 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.15] text-cream"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {t('contact.title.line1')}
            <br />
            <em className="text-olive-lt">{t('contact.title.em')}</em>
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-md font-body text-[0.92rem] leading-[1.9] text-cream/45"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            {t('contact.lede')}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            {CONTACT_LINKS.map(({ label, href, isPrimary }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={
                  isPrimary
                    ? 'rounded-full bg-olive-dark px-6 py-3 font-body text-[0.78rem] tracking-[0.08em] text-cream transition-all hover:-translate-y-0.5 hover:bg-olive-dark/80'
                    : 'rounded-full border border-cream/15 px-6 py-3 font-body text-[0.78rem] tracking-[0.08em] text-cream/70 transition-all hover:-translate-y-0.5 hover:border-cream/30 hover:bg-cream/[0.08] hover:text-cream'
                }
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
