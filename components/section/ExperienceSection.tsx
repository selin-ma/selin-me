'use client';

import { useCallback, useEffect, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { workExperiences } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { WorkExperience } from '@/types';

// ─── Per-chapter SVG Illustrations ──────────────────────────────────────────

function ArchitectureIllus({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[200px]">
      <polygon
        points="110,32 148,55 148,102 110,125 72,102 72,55"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <polygon points="110,52 136,67 136,97 110,112 84,97 84,67" fill={color} opacity="0.07" />
      {(
        [
          [36, 78],
          [184, 78],
          [110, 162],
          [36, 138],
          [184, 138],
        ] as [number, number][]
      ).map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="4.5" fill={color} opacity="0.45" />
          <line
            x1={cx}
            y1={cy}
            x2="110"
            y2="78"
            stroke={color}
            strokeWidth="0.7"
            opacity="0.18"
            strokeDasharray="3,3"
          />
        </g>
      ))}
      <circle cx="110" cy="78" r="8" fill={color} opacity="0.75" />
      <circle cx="110" cy="78" r="15" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <text x="28" y="46" fontFamily="monospace" fontSize="13" fill={color} opacity="0.22">
        {'{'}
      </text>
      <text x="186" y="46" fontFamily="monospace" fontSize="13" fill={color} opacity="0.22">
        {'}'}
      </text>
      <text x="75" y="188" fontFamily="Georgia" fontStyle="italic" fontSize="10" fill={color} opacity="0.38">
        架构之美
      </text>
    </svg>
  );
}

function DatavizIllus({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[200px]">
      <line x1="32" y1="162" x2="196" y2="162" stroke={color} strokeWidth="1" opacity="0.22" />
      <line x1="32" y1="162" x2="32" y2="28" stroke={color} strokeWidth="1" opacity="0.22" />
      <path
        d="M 46,148 L 76,112 L 106,122 L 136,78 L 166,54 L 188,36 L 188,162 L 46,162 Z"
        fill={color}
        opacity="0.07"
      />
      <polyline
        points="46,148 76,112 106,122 136,78 166,54 188,36"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.55"
      />
      {(
        [
          [46, 148],
          [76, 112],
          [106, 122],
          [136, 78],
          [166, 54],
          [188, 36],
        ] as [number, number][]
      ).map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={i === 5 ? 6 : 3.5}
          fill={color}
          opacity={i === 5 ? 0.9 : 0.65}
        />
      ))}
      <text x="72" y="190" fontFamily="Georgia" fontStyle="italic" fontSize="10" fill={color} opacity="0.38">
        数据可视化
      </text>
    </svg>
  );
}

function EcommerceIllus({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[200px]">
      <path
        d="M 42,48 L 62,48 L 82,128 L 178,128 L 192,78 L 66,78"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.42"
        strokeLinejoin="round"
      />
      {[94, 118, 142, 166].map((x, i) => (
        <rect key={x} x={x} y="83" width="17" height="36" rx="2.5" fill={color} opacity={0.1 + i * 0.055} />
      ))}
      <circle cx="97" cy="140" r="7.5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="162" cy="140" r="7.5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="97" cy="140" r="2.5" fill={color} opacity="0.6" />
      <circle cx="162" cy="140" r="2.5" fill={color} opacity="0.6" />
      <text x="68" y="188" fontFamily="Georgia" fontStyle="italic" fontSize="10" fill={color} opacity="0.38">
        电商性能优化
      </text>
    </svg>
  );
}

function BeginningIllus({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[200px]">
      <path
        d="M 44,64 Q 110,50 110,158 Q 110,50 176,64 L 176,162 Q 110,148 110,162 Q 110,148 44,162 Z"
        fill={color}
        opacity="0.08"
        stroke={color}
        strokeWidth="1"
      />
      {[82, 97, 112, 127, 142].map((y, i) => (
        <g key={y}>
          <line x1={58 + i} y1={y} x2={104} y2={y - i * 0.5} stroke={color} strokeWidth="0.8" opacity="0.25" />
          <line x1={118} y1={y - i * 0.5} x2={162 - i} y2={y} stroke={color} strokeWidth="0.8" opacity="0.25" />
        </g>
      ))}
      <line x1="110" y1="52" x2="110" y2="160" stroke={color} strokeWidth="1.2" opacity="0.32" />
      <path d="M 110,40 Q 120,26 130,30 Q 125,40 110,40 Z" fill={color} opacity="0.55" />
      <line x1="110" y1="40" x2="110" y2="52" stroke={color} strokeWidth="1" opacity="0.4" />
      <text x="70" y="188" fontFamily="Georgia" fontStyle="italic" fontSize="10" fill={color} opacity="0.38">
        每一个开始
      </text>
    </svg>
  );
}

const ILLUSTRATIONS: Record<WorkExperience['illustrationKey'], React.FC<{ color: string }>> = {
  architecture: ArchitectureIllus,
  dataviz: DatavizIllus,
  ecommerce: EcommerceIllus,
  beginning: BeginningIllus,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function ExperienceSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const { t } = useI18n();

  const goToChapter = useCallback(
    (idx: number) => {
      if (isFlipping || idx === currentIdx) return;
      setIsFlipping(true);
      setTimeout(() => {
        setDisplayIdx(idx);
        setCurrentIdx(idx);
        setIsFlipping(false);
      }, 280);
    },
    [isFlipping, currentIdx],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentIdx < workExperiences.length - 1) {
        goToChapter(currentIdx + 1);
      }
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        goToChapter(currentIdx - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, goToChapter]);

  const exp = workExperiences[displayIdx];
  const Illustration = ILLUSTRATIONS[exp.illustrationKey];

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-warm-white py-24"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-terra/[0.035] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sage/[0.04] blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="reveal-section mb-14 text-center">
          <p className="mb-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-sage">
            {t('experience.kicker')}
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-light">
            {t('experience.title.prefix')} <em className="text-terra">{t('experience.title.em')}</em>
          </h2>
          <p className="mt-3 font-body text-xs text-ink-light/40">
            {t('experience.hint')}
          </p>
        </div>

        {/* Chapter tabs */}
        <div className="reveal-section mb-10 flex flex-wrap justify-center gap-2">
          {workExperiences.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToChapter(i)}
              className={cn(
                'rounded-full border px-4 py-1.5 font-body text-[0.72rem] tracking-[0.08em] transition-all duration-300',
                i === currentIdx
                  ? 'border-terra bg-terra/[0.08] text-terra'
                  : 'border-transparent text-ink-light/50 hover:border-ink/15 hover:text-ink-light',
              )}
            >
              {t('experience.chapter', { n: String(i + 1).padStart(2, '0') })}
            </button>
          ))}
        </div>

        {/* Book spread */}
        <div
          className="reveal-section grid overflow-hidden rounded-sm md:grid-cols-2 md:rounded-r-2xl"
          style={{
            boxShadow: '0 28px 72px rgba(28,25,23,0.10), 0 2px 0 rgba(28,25,23,0.03)',
          }}
        >
          {/* Binding spine — subtle gradient only */}
          <div
            className="pointer-events-none absolute bottom-0 top-0 z-10 hidden w-px md:block"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background:
                'linear-gradient(180deg, transparent, rgba(28,25,23,0.055) 30%, rgba(28,25,23,0.075) 50%, rgba(28,25,23,0.055) 70%, transparent)',
            }}
            aria-hidden="true"
          />

          {/* LEFT PAGE — illustration */}
          <div
            className="relative flex flex-col items-center justify-center p-10"
            style={{ background: 'linear-gradient(140deg, #F8F3EC, #F0E9DC)' }}
          >
            <span
              className="pointer-events-none absolute left-7 top-6 select-none font-display text-[5rem] font-light leading-none text-ink/[0.05]"
              aria-hidden="true"
            >
              {String(displayIdx + 1).padStart(2, '0')}
            </span>

            <div
              className={cn(
                'w-full transition-all duration-300',
                isFlipping ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
              )}
            >
              <Illustration color={exp.color} />
            </div>

            <div
              className={cn(
                'mt-4 text-center transition-all duration-300',
                isFlipping ? 'opacity-0' : 'opacity-100',
              )}
            >
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 font-body text-[0.68rem] uppercase tracking-[0.12em]"
                style={{ background: `${exp.color}18`, color: exp.color }}
              >
                {exp.tag}
              </span>
              <p className="font-display text-[1.05rem] font-light leading-snug text-ink">
                {exp.leftTitle.split('\n').map((line, i) => (
                  <span key={line}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
            </div>

            <span
              className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-[0.62rem] tracking-[0.15em] text-ink/20"
              aria-hidden="true"
            >
              P.{String(displayIdx + 1).padStart(2, '0')}
            </span>
          </div>

          {/* RIGHT PAGE — content */}
          <div
            className={cn(
              'flex max-h-[600px] flex-col overflow-y-auto bg-white p-10 transition-all duration-300 md:p-12',
              isFlipping ? 'translate-x-3 opacity-0' : 'translate-x-0 opacity-100',
            )}
          >
            <div className="mb-1 flex items-center gap-3">
              <span
                className="font-body text-[0.7rem] font-medium uppercase tracking-[0.15em]"
                style={{ color: exp.color }}
              >
                {exp.period}
              </span>
              <span className="text-xs text-ink/20">·</span>
              <span className="font-body text-[0.7rem] tracking-wide text-ink-light/50">
                {exp.location}
              </span>
            </div>

            <h3 className="mt-0.5 font-display text-[1.75rem] font-light leading-tight">
              {exp.company}
            </h3>
            <p className="mb-5 mt-1 font-body text-[0.82rem] text-ink-light/60">{exp.role}</p>

            <div className="mb-6 h-[1.5px] w-7" style={{ background: exp.color }} />

            <p className="mb-6 font-body text-[0.86rem] leading-[1.88] text-ink-light/72">
              {exp.body}
            </p>

            <p className="mb-3 font-body text-[0.64rem] uppercase tracking-[0.22em] text-ink/35">
              {t('experience.highlights')}
            </p>
            <ul className="mb-6 space-y-2.5">
              {exp.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 font-body text-[0.82rem] leading-[1.62] text-ink-light/68"
                >
                  <span
                    className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                    style={{ background: exp.color }}
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <p className="mb-2.5 font-body text-[0.64rem] uppercase tracking-[0.22em] text-ink/35">
                {t('experience.techStack')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 font-body text-[0.68rem] text-ink-light/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goToChapter(currentIdx - 1)}
            disabled={currentIdx === 0}
            aria-label={t('experience.prev')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all hover:border-ink hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-25"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="font-body text-[0.75rem] tracking-[0.1em] text-ink-light/40">
            {currentIdx + 1} / {workExperiences.length}
          </span>

          <button
            type="button"
            onClick={() => goToChapter(currentIdx + 1)}
            disabled={currentIdx === workExperiences.length - 1}
            aria-label={t('experience.next')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all hover:border-ink hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-25"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
