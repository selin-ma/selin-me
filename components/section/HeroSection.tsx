'use client';

import { useEffect, useRef, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';

type HighlightWord = 'code' | 'craft' | 'curiosity';

const WORD_COLORS: Record<HighlightWord, string> = {
  code: '#C4714B', // terra
  craft: '#6B8F71', // sage
  curiosity: '#7A9DB5', // dusty-blue
};

export function HeroSection() {
  const { t } = useI18n();
  const svgRef = useRef<SVGSVGElement>(null);
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGCircleElement[]>([]);
  const mouseRef = useRef({ x: 720, y: 450 });
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const [hovered, setHovered] = useState<HighlightWord>('code');

  // Dot base positions
  const dotBases = [
    { cx: 320, cy: 240 },
    { cx: 360, cy: 260 },
    { cx: 340, cy: 290 },
    { cx: 1050, cy: 450 },
    { cx: 1090, cy: 470 },
    { cx: 1020, cy: 490 },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 1440,
        y: ((e.clientY - rect.top) / rect.height) * 900,
      };
    };

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = (ts - startRef.current) / 1000; // seconds
      const { x, y } = mouseRef.current;

      // ── Wave 1: autonomous sin wave + subtle mouse influence ──
      const w1y = 700 + Math.sin(t * 0.7) * 18 + Math.sin(t * 1.3) * 8;
      const w1c = 640 + Math.sin(t * 0.5 + 1) * 22;
      const mouseInfluence1 = (y - 450) * 0.022;
      if (wave1Ref.current) {
        wave1Ref.current.setAttribute(
          'd',
          `M 0 ${w1y + mouseInfluence1} ` +
            `Q 300 ${w1c + mouseInfluence1 * 0.6} 600 ${w1y + mouseInfluence1 * 0.8} ` +
            `T 1200 ${670 + Math.sin(t * 0.6 + 2) * 14 + mouseInfluence1 * 0.4} ` +
            `T 1440 ${680 + Math.sin(t * 0.8) * 10}`,
        );
      }

      // ── Wave 2: slightly different frequency for natural feel ──
      const w2y = 720 + Math.sin(t * 0.55 + 0.8) * 14 + Math.sin(t * 1.1 + 1.5) * 6;
      const w2c = 680 + Math.sin(t * 0.45 + 2) * 18;
      const mouseInfluence2 = (y - 450) * 0.014;
      if (wave2Ref.current) {
        wave2Ref.current.setAttribute(
          'd',
          `M 0 ${w2y + mouseInfluence2} ` +
            `Q 400 ${w2c + mouseInfluence2 * 0.7} 800 ${w2y + mouseInfluence2 * 0.9} ` +
            `T 1440 ${700 + Math.sin(t * 0.65 + 1) * 12}`,
        );
      }

      // ── Dots: repel from mouse, pulse with time ──
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const base = dotBases[i];
        const distX = base.cx - x;
        const distY = base.cy - y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const pushStrength = Math.max(0, 1 - dist / 300) * 20;
        const nx = dist > 0 ? distX / dist : 0;
        const ny = dist > 0 ? distY / dist : 0;
        // Gentle float animation per dot
        const floatY = Math.sin(t * 0.9 + i * 1.2) * 3;
        dot.setAttribute('cx', String(base.cx + nx * pushStrength));
        dot.setAttribute('cy', String(base.cy + ny * pushStrength + floatY));
        const proximityOpacity = Math.max(0, 1 - dist / 250) * 0.3;
        const pulseOpacity = 0.15 + Math.sin(t * 1.1 + i * 0.7) * 0.04;
        dot.setAttribute('opacity', String(pulseOpacity + proximityOpacity));
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-24"
    >
      {/* Background illustration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg
          ref={svgRef}
          viewBox="0 0 1440 900"
          className="absolute h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="150" cy="200" rx="200" ry="160" fill="#C4714B" opacity="0.045" />
          <ellipse cx="1350" cy="650" rx="240" ry="200" fill="#6B8F71" opacity="0.05" />
          <ellipse cx="1200" cy="120" rx="120" ry="100" fill="#C9A84C" opacity="0.05" />
          <ellipse cx="50" cy="750" rx="160" ry="130" fill="#7A9DB5" opacity="0.055" />

          <path
            ref={wave1Ref}
            d="M 0 700 Q 300 640 600 700 T 1200 670 T 1440 680"
            stroke="#C4714B"
            strokeWidth="0.8"
            fill="none"
            opacity="0.12"
          />
          <path
            ref={wave2Ref}
            d="M 0 720 Q 400 680 800 720 T 1440 700"
            stroke="#6B8F71"
            strokeWidth="0.6"
            fill="none"
            opacity="0.09"
          />

          {dotBases.map((dot, i) => (
            <circle
              key={i}
              ref={(el) => {
                if (el) dotsRef.current[i] = el;
              }}
              cx={dot.cx}
              cy={dot.cy}
              r="2"
              fill="#C4714B"
              opacity="0.15"
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center md:max-w-7xl w-full">
        <p
          className="mb-6 font-body text-[0.7rem] uppercase tracking-[0.3em] text-terra"
          style={{ animation: 'fadeUp 0.7s ease 0.3s both' }}
        >
          {t('hero.subtitle')}
        </p>

        <h1
          className="mb-6 font-display text-[clamp(3rem,9vw,6.5rem)] font-light leading-[1.02] tracking-[-0.02em]"
          style={{ animation: 'fadeUp 0.7s ease 0.5s both' }}
        >
          {t('hero.title.line1')}
          <br />

          {/* ── 代码 — default highlighted, terra ── */}
          <em
            className="align-middle cursor-default font-light italic transition-colors duration-300"
            style={{
              color:
                WORD_COLORS[hovered] === WORD_COLORS.code || hovered === 'code'
                  ? WORD_COLORS.code
                  : 'rgba(28,25,23,0.28)',
            }}
            onMouseEnter={() => setHovered('code')}
          >
            {t('hero.title.code')}
          </em>

          <span className="text-ink/15"> · </span>

          {/* ── 匠心 — sage on hover ── */}
          <em
            className="align-middle cursor-default font-light not-italic transition-colors duration-300"
            style={{
              fontWeight: 275,
              fontSize: '0.82em',
              color: hovered === 'craft' ? WORD_COLORS.craft : 'rgba(28,25,23,0.28)',
            }}
            onMouseEnter={() => setHovered('craft')}
          >
            {t('hero.title.craft')}
          </em>

          <span className="text-ink/15"> · </span>

          {/* ── 好奇 — dusty-blue on hover ── */}
          <em
            className="align-middle cursor-default font-light not-italic transition-colors duration-300"
            style={{
              fontWeight: 275,
              fontSize: '0.82em',
              color: hovered === 'curiosity' ? WORD_COLORS.curiosity : 'rgba(28,25,23,0.28)',
            }}
            onMouseEnter={() => setHovered('curiosity')}
          >
            {t('hero.title.curiosity')}
          </em>
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl font-body text-[1rem] leading-[1.85] text-ink-light/70"
          style={{ animation: 'fadeUp 0.7s ease 0.7s both' }}
        >
          {t('hero.lede')}
        </p>

        <div
          className="flex items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.7s ease 0.9s both' }}
        >
          <a
            href="#experience"
            className="flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 font-body text-[0.8rem] tracking-[0.1em] text-cream transition-colors duration-300 hover:bg-terra"
          >
            {t('hero.cta.readStory')}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="border-b border-ink/10 pb-0.5 font-body text-[0.8rem] tracking-[0.1em] text-ink-light/60 transition-colors hover:border-terra hover:text-terra"
          >
            {t('hero.cta.contact')}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-30"
        style={{ animation: 'fadeIn 1s ease 1.5s both' }}
        aria-hidden="true"
      >
        <span className="font-body text-[0.65rem] uppercase tracking-[0.2em]">
          {t('hero.scroll')}
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-ink">
          <div className="absolute h-1/2 w-full animate-scroll-line bg-terra" />
        </div>
      </div>
    </section>
  );
}
