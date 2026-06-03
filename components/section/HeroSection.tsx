'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';

const EASE = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

const FADE_IN = (delay = 0, ready = true) => ({
  initial: { opacity: 0, y: 10 },
  animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export const HandwrittenUnderline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = 96;
    const H = 16;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#1F1F1F';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';

    // Line 1 — full width, gentle dip then rise
    ctx.beginPath();
    ctx.moveTo(2, 5);
    ctx.bezierCurveTo(26, 2, 62, 7, 94, 4);
    ctx.stroke();

    // Line 2 — shorter, centered below
    ctx.beginPath();
    ctx.moveTo(16, 11);
    ctx.bezierCurveTo(36, 9, 60, 13, 80, 10);
    ctx.stroke();
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" style={{ width: 96, height: 16 }} className="mt-1" />
  );
};

const PixelRevealTitle = ({ lines, ready }: { lines: string[]; ready: boolean }) => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!ready) return;

    const CHAR_DELAY = 55;
    const DURATION = 480;
    const EASE = 'cubic-bezier(0.34, 1.1, 0.64, 1)';

    const allChars: HTMLSpanElement[] = [];
    refs.current.forEach((lineEl) => {
      if (!lineEl) return;
      lineEl.querySelectorAll<HTMLSpanElement>('.char-inner').forEach((c) => {
        allChars.push(c);
      });
    });

    allChars.forEach((char, i) => {
      setTimeout(() => {
        char.style.transition = `transform ${DURATION}ms ${EASE}, opacity ${Math.round(DURATION * 0.4)}ms ease`;
        char.style.transform = 'translateY(0%)';
        char.style.opacity = '1';
      }, i * CHAR_DELAY);
    });
  }, [ready]);

  return (
    <>
      {lines.map((text, li) => (
        <span key={li} className="block">
          <span
            ref={(el) => {
              refs.current[li] = el;
            }}
            className="block"
          >
            {[...text].map((ch, ci) =>
              ch === ' ' ? (
                <span key={ci} className="inline-block w-[0.28em]" />
              ) : (
                <span key={ci} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <span
                    className="char-inner inline-block"
                    style={{
                      transform: 'translateY(110%)',
                      opacity: '0',
                    }}
                  >
                    {ch}
                  </span>
                </span>
              ),
            )}
          </span>
        </span>
      ))}
    </>
  );
};

const CONTACTS = [
  { label: 'Email', href: 'mailto:selinny921@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/selin-ma/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yudi-ma-6026a1183/' },
];

export const ContactStickyCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="fixed top-0 right-6 z-50 w-[190px] hidden md:block"
      initial={{ x: 90, y: -140, rotate: -9 }}
      animate={{ x: open ? 0 : 90, y: open ? 16 : -140, rotate: open ? 0 : -9 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="rounded-2xl bg-sticky-yellow px-5 pt-5 pb-4">
        <p className="mb-3 font-dm-mono text-sm font-medium uppercase text-ink">Reach me at:</p>
        <div className="flex flex-col gap-2">
          {CONTACTS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm-mono text-sm text-ink transition-opacity hover:opacity-50"
            >
              {label}{' '}
              <span
                className="material-symbols-outlined text-base leading-none"
                style={{ fontVariationSettings: "'wght' 400", fontSize: '14px' }}
              >
                arrow_outward
              </span>
            </a>
          ))}
        </div>
        <p className="mt-4 font-dm-mono text-sm uppercase tracking-wider text-ink">Contact</p>
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Greeting — Caveat handwriting */}
        <motion.div className="mb-4 flex flex-col items-center" {...FADE_IN(0, ready)}>
          <p className="text-3xl font-normal text-ink font-caveat-hand tracking-wider">
            hi, i&apos;m selin
          </p>
          {/* Decorative handwritten underlines */}
          <HandwrittenUnderline />
        </motion.div>

        {/* Big title + sticky notes */}
        <div className="relative">
          <h1
            className="text-center leading-[0.88] tracking-[-0.03em] text-ink font-normal [font-size:clamp(48px,12vw,160px)]"
            style={{
              fontFamily:
                'var(--font-pixelify-sans)' /* next/font variable — must use inline style to override globals.css @layer base */,
            }}
          >
            <PixelRevealTitle lines={[t('hero.role.line1'), t('hero.role.line2')]} ready={ready} />
          </h1>

          {/* Sticky note 2 — bottom-right, open to work */}
          <motion.div
            className="absolute bottom-6 right-[-80px] hidden md:block rotate-3 origin-bottom-right"
            initial={{ opacity: 0, y: -10 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
            whileHover={{ scale: 1.05, rotate: '1deg', transition: { duration: 0.1, delay: 0 } }}
          >
            <span className="block whitespace-nowrap bg-sticky-green px-2 py-1 font-dm-mono text-sm font-bold uppercase tracking-wider text-ink shadow-none outline-none">
              pixel lover
            </span>
          </motion.div>
        </div>

        {/* Meta line */}
        <p className="pt-6 flex items-center gap-2 font-dm-mono text-sm font-medium uppercase tracking-[0.12em] text-ink">
          <span
            className="inline-block h-[7px] w-[7px] shrink-0 bg-sticky-green"
            aria-hidden="true"
          />
          <span className="inline-block overflow-hidden flex-no-wrap">
            <motion.span
              className="inline-block"
              initial={{ y: '200%', opacity: 0 }}
              animate={ready ? { y: '0%', opacity: 1 } : { y: '200%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 9, delay: 0.5 }}
            >
              {t('hero.available')}
            </motion.span>
          </span>
        </p>
      </Container>
    </section>
  );
};
