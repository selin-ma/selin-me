'use client';

import Image from 'next/image';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden bg-white pt-[84px] pb-8 md:py-20 lg:py-24"
    >
      <Container className="flex flex-1 flex-col">
        {/* ── Desktop layout ───────────────────────────────────────────────── */}
        <div className="hidden flex-1 lg:flex lg:gap-12">
          {/* Left — giant title pinned to bottom */}
          <div
            className="flex flex-1 flex-col justify-end"
            style={{ animation: 'fadeUp 0.85s ease 0.2s both' }}
          >
            <h1
              className="font-display leading-[0.88] tracking-[-0.03em] text-ink"
              style={{
                fontSize: 'clamp(5rem, 12.5vw, 13rem)',
                fontWeight: 400,
              }}
            >
              <span className="block">{t('hero.role.line1')}</span>
              <span className="block">{t('hero.role.line2')}</span>
            </h1>
          </div>

          {/* Right — photo top, description bottom */}
          <div
            className="flex w-72 flex-shrink-0 flex-col justify-between xl:w-80"
            style={{ animation: 'fadeIn 0.9s ease 0.35s both' }}
          >
            {/* Hero photo */}
            <div className="w-full overflow-hidden rounded-[14px] h-80">
              <Image
                src="/images/hero/shero.jpg"
                alt="Hero"
                className="w-full h-full object-cover object-right"
                width={100}
                height={100}
              />
            </div>

            {/* Bottom — greeting + description */}
            <div className="flex flex-col items-end gap-3">
              <p className="text-right font-display text-lg font-medium tracking-[-0.01em] text-ink">
                👋🏻 Hi, I&apos;m Selin Ma
              </p>
              <p className="text-right font-body text-[0.85rem] leading-[1.88] text-ink">
                {t('hero.lede')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Mobile layout ────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col lg:hidden">
          {/* Hero photo */}
          <div className="mb-8 w-full max-w-xs self-end overflow-hidden rounded-[12px] h-72">
            <Image
              src="/images/hero/shero.jpg"
              alt="Hero"
              className="w-full h-full object-cover object-right"
              width={320}
              height={288}
            />
          </div>

          {/* Title */}
          <h1
            className="mt-auto font-display leading-[0.9] tracking-[-0.025em] text-ink"
            style={{ fontSize: 'clamp(4rem, 14vw, 6rem)', fontWeight: 400 }}
          >
            <span className="block">{t('hero.role.line1')}</span>
            <span className="block">{t('hero.role.line2')}</span>
          </h1>

          {/* Greeting */}
          <p className="mt-5 font-display text-base font-medium tracking-[-0.01em] text-ink">
            👋🏻 Hi, I&apos;m Selin Ma
          </p>

          {/* Description */}
          <p className="mt-2 font-body text-[0.88rem] leading-[1.85] text-ink">{t('hero.lede')}</p>
        </div>
      </Container>
    </section>
  );
}
