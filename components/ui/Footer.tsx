'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

// ── Headline line ─────────────────────────────────────────────────────────────
function HeadlineLine({
  children,
  opacity,
  y,
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.p
      className="font-dm-mono text-[clamp(3.2rem,10.5vw,9rem)] leading-[1.2] tracking-tight text-ink"
      style={{ opacity, y }}
    >
      {children}
    </motion.p>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /*
   * Raw scroll progress — no spring.
   *
   * The spring was causing a large visual lag: when the user scrolled to
   * progress ≈ 0.9 the spring-smoothed value was only ≈ 0.5, so the card's
   * visual center sat at the viewport bottom even though the page was nearly
   * fully scrolled.  Without the spring the card position is 1-to-1 with the
   * scroll gesture, which is the correct behaviour for a scroll-linked reveal.
   *
   * offset: 'start end'   → wrapper top reaches viewport bottom → progress = 0
   * offset: 'start start' → wrapper top reaches viewport top    → progress = 1
   */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'start start'],
  });

  // The footer shell is scroll-linked: background enters first, then content follows.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['100%', '0%'],
  );

  const headlineOpacity = useTransform(scrollYProgress, [0.08, 0.26], [0, 1]);
  const headlineFirstY = useTransform(
    scrollYProgress,
    [0.06, 0.42],
    shouldReduceMotion ? [0, 0] : [136, 0],
  );
  const headlineSecondY = useTransform(
    scrollYProgress,
    [0.12, 0.48],
    shouldReduceMotion ? [0, 0] : [156, 0],
  );
  const sayHiOpacity = useTransform(scrollYProgress, [0.3, 0.46], [0, 1]);
  const sayHiY = useTransform(scrollYProgress, [0.28, 0.58], shouldReduceMotion ? [0, 0] : [168, 0]);
  const sayHiScale = useTransform(scrollYProgress, [0.32, 0.58], [0.92, 1]);
  const sayHiRotate = useTransform(scrollYProgress, [0.32, 0.58], [-8, -10]);

  return (
    <div ref={wrapperRef} className="relative h-screen bg-sticky-green">
      {/* ── Footer card — sticky at viewport bottom, slides up with scroll ── */}
      <motion.footer
        className="sticky bottom-0 flex h-screen w-full flex-col overflow-hidden bg-sticky-green"
        style={{ y }}
      >
        {/* ── Main content ── */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
          {/* Headline */}
          <div className="mb-2">
            <HeadlineLine opacity={headlineOpacity} y={headlineFirstY}>
              Let&apos;s build
            </HeadlineLine>

            <div className="relative inline-block">
              <HeadlineLine opacity={headlineOpacity} y={headlineSecondY}>
                something
              </HeadlineLine>

              <div className="pointer-events-none absolute left-1/2 top-[65%] z-20 -translate-x-1/2">
                <motion.a
                  href="mailto:selinny921@gmail.com"
                  className="pointer-events-auto inline-flex cursor-pointer rounded-sm bg-sticky-yellow px-7 py-3 font-caveat-hand text-2xl font-bold text-ink md:px-9 md:py-4 md:text-3xl"
                  style={{
                    opacity: sayHiOpacity,
                    y: sayHiY,
                    scale: sayHiScale,
                    rotate: sayHiRotate,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: -6,
                    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
                  }}
                >
                  Say hi!
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
