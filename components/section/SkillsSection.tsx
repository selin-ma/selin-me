'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';

const LEFT_PILLS = [
  { label: 'TypeScript', iconBg: '#3B82F6', rotate: '5deg', ml: 'ml-0' },
  { label: 'React', iconBg: '#F97316', rotate: '3deg', ml: 'ml-5' },
  { label: 'Storybook', iconBg: '#EC4899', rotate: '-4deg', ml: 'ml-0' },
];

const RIGHT_PILLS = [
  { label: 'Monorepo', iconBg: '#22C55E', rotate: '-6deg', mr: 'mr-2' },
  { label: 'Next.js', iconBg: '#1C1917', rotate: '-2deg', mr: 'mr-5' },
  { label: 'Tailwind', iconBg: '#06B6D4', rotate: '3deg', mr: 'mr-2' },
];

function Zap({ color }: { color: string }) {
  return (
    <span
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: color }}
      aria-hidden="true"
    >
      <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
        <path d="M6 1L1 7.5H5L4 12L9 5.5H5L6 1Z" fill="white" fillRule="evenodd" />
      </svg>
    </span>
  );
}

function Pill({
  label,
  iconBg,
  delay,
  rotate,
  extraClass,
}: {
  label: string;
  iconBg: string;
  delay: number;
  rotate: string;
  extraClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ rotate }}
      className={`flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5
        shadow-[0_6px_24px_rgba(28,25,23,0.10),0_1px_4px_rgba(28,25,23,0.06),inset_0_1px_0_rgba(255,255,255,1)]
        ${extraClass ?? ''}`}
    >
      <Zap color={iconBg} />
      <span className="whitespace-nowrap font-body text-[0.82rem] font-medium text-ink/70">
        {label}
      </span>
    </motion.div>
  );
}

function TextReveal({ lines }: { lines: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [state, setState] = useState({ x: 0, lineIndex: -1 });

  const onMove = (e: React.MouseEvent) => {
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    let lineIndex = -1;
    let lineX = 0;
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const lr = el.getBoundingClientRect();
      if (e.clientY >= lr.top && e.clientY <= lr.bottom) {
        lineIndex = i;
        lineX = e.clientX - lr.left;
      }
    });
    setState({ x: lineX, lineIndex });
  };

  return (
    <div
      ref={containerRef}
      className="cursor-none select-none"
      onMouseMove={onMove}
      onMouseLeave={() => setState({ x: 0, lineIndex: -1 })}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          ref={(el) => {
            lineRefs.current[i] = el;
          }}
          className={`relative${i > 0 ? ' mt-2' : ''}`}
        >
          {/* Muted base */}
          <p
            className="font-display leading-[1.15] tracking-[-0.025em] text-ink/[0.15]"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 3rem)', fontWeight: 400 }}
          >
            {line}
          </p>

          {/* Reveal layer — fully revealed above cursor line, partially on cursor line */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              clipPath:
                state.lineIndex < 0
                  ? 'inset(0 100% 0 0)'
                  : i < state.lineIndex
                    ? 'inset(0 0% 0 0)'
                    : i === state.lineIndex
                      ? `inset(0 calc(100% - ${state.x}px) 0 0)`
                      : 'inset(0 100% 0 0)',
              transition: 'clip-path 120ms ease',
            }}
          >
            <p
              className="font-display leading-[1.15] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 3rem)', fontWeight: 400 }}
            >
              {line}
            </p>
          </div>

          {/* Cursor line — only for hovered line */}
          {state.lineIndex === i && (
            <div
              className="pointer-events-none absolute top-0 h-full w-px bg-ink/20"
              style={{ left: state.x }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function SkillsSection() {
  const { t } = useI18n();
  const lines = [0, 1, 2].map((i) => t(`skills.line.${i}`));
  return (
    <section id="skills" className="overflow-hidden bg-white py-8 md:py-20">
      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <Container className="hidden lg:block">
        <p className="mb-10 text-center font-body text-[0.72rem] font-medium uppercase tracking-[0.15em] text-olive italic">
          / {t('skills.kicker')}
        </p>
        <div className="grid grid-cols-[220px_1fr_220px] items-center gap-0">
          {/* Left pills — cascade right */}
          <div className="flex flex-col items-start gap-12 pr-6">
            {LEFT_PILLS.map((p, i) => (
              <Pill
                key={p.label}
                label={p.label}
                iconBg={p.iconBg}
                delay={i * 0.1}
                rotate={p.rotate}
                extraClass={p.ml}
              />
            ))}
          </div>

          {/* Center — text reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="px-8 text-center xl:px-14"
          >
            <TextReveal lines={lines} />
          </motion.div>

          {/* Right pills — cascade left */}
          <div className="flex flex-col items-end gap-12 pl-6">
            {RIGHT_PILLS.map((p, i) => (
              <Pill
                key={p.label}
                label={p.label}
                iconBg={p.iconBg}
                delay={0.1 + i * 0.1}
                rotate={p.rotate}
                extraClass={p.mr}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* ── Mobile ────────────────────────────────────────────────────────── */}
      <Container className="lg:hidden">
        <p className="mb-5 text-center font-body text-[0.72rem] font-medium uppercase tracking-[0.15em] text-olive italic">
          / {t('skills.kicker')}
        </p>
        <div className="text-center">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`font-display leading-[1.15] tracking-[-0.02em] text-ink/30${i > 0 ? ' mt-1' : ''}`}
              style={{ fontSize: 'clamp(1.4rem, 6vw, 2.2rem)', fontWeight: 400 }}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[...LEFT_PILLS, ...RIGHT_PILLS].map((p, i) => (
            <Pill key={p.label} label={p.label} iconBg={p.iconBg} delay={i * 0.06} rotate="0deg" />
          ))}
        </div>
      </Container>
    </section>
  );
}
