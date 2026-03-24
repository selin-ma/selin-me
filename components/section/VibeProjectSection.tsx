'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { vibeProjects } from '@/lib/data';

// ── Mist blue accent ───────────────────────────────────────────────────────
const MIST = '#7FA2BF';

// ── Featured project IDs (in card order) ─────────────────────────────────
const FEATURED_IDS = ['selin-me', 'pickle-vibe', 'still-hearth'];

// ── Phone screenshot paths ─────────────────────────────────────────────────
const PICKLE_VIBE_SHOTS = [
  '/images/vibeProjects/pickle-vibe-1.png',
  '/images/vibeProjects/pickle-vibe-1-1.png',
  '/images/vibeProjects/pickle-vibe-2.png',
  '/images/vibeProjects/pickle-vibe-3.png',
  '/images/vibeProjects/pickle-vibe-4.png',
  '/images/vibeProjects/pickle-vibe-5.png',
  '/images/vibeProjects/pickle-vibe-6.png',
  '/images/vibeProjects/pickle-vibe-6-2.png',
];

// ── GDD scroll content ─────────────────────────────────────────────────────
const GDD_LINES = [
  { label: 'GENRE', value: '迷宫探索 · 魔法料理 · 小镇经营 RPG' },
  { label: 'PLATFORM', value: 'PC — Steam (Godot 4)' },
  { label: 'STATUS', value: 'GDD v0.5 · Pre-production' },
  { label: '', value: '' },
  {
    label: 'LOGLINE',
    value:
      '在缓慢消失的世界里，失忆的你经营一家魔法餐厅——深入活体迷宫采集食材，用料理唤回被吞噬的记忆。',
  },
  { label: '', value: '' },
  { label: 'CORE LOOP', value: '探索迷宫 → 采集食材 → 烹饪料理 → 唤回记忆' },
  { label: 'MECHANIC 1', value: '活体迷宫：结构随时间变化，吞噬真实事物' },
  { label: 'MECHANIC 2', value: '料理系统：每道菜与一段消失的记忆绑定' },
  { label: 'MECHANIC 3', value: '小镇经营：归还速度永远赶不上消失速度' },
  { label: '', value: '' },
  { label: 'TONE', value: '幽默 + 哲学 + 情感。宫崎骏 × 迷宫饭 × 芙莉莲。' },
  { label: 'REF', value: '潜水员戴夫 · Core Keeper · 旅者之憩' },
  { label: '', value: '' },
  { label: 'TOOLS', value: 'Godot 4 · GDScript · Aseprite · Claude' },
  { label: 'TEAM', value: 'Solo dev (+ AI pair)' },
];

// ── SVG connector lines ────────────────────────────────────────────────────
function ConnectorLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <circle cx="30" cy="42" r="0.5" stroke={MIST} strokeWidth="0.18" />
      <path d="M30,42 C31,31 34,28 36,37" stroke={MIST} strokeWidth="0.18" strokeLinecap="round" />
      <circle cx="36" cy="37" r="0.5" stroke={MIST} strokeWidth="0.18" />

      <circle cx="62" cy="19" r="0.5" stroke={MIST} strokeWidth="0.18" />
      <path
        d="M62,19 C64,12 69,13 67.5,23 C66,33 70,33 70,37"
        stroke={MIST}
        strokeWidth="0.18"
        strokeLinecap="round"
      />
      <circle cx="70" cy="37" r="0.5" stroke={MIST} strokeWidth="0.18" />
    </svg>
  );
}

// ── Per-card layout ────────────────────────────────────────────────────────
const CARD_LAYOUT = [
  { left: '4%', top: '20%', rotate: -3.5 },
  { left: '36%', top: '2%', rotate: 2 },
  { left: '70%', top: '12%', rotate: -2 },
] as const;

// ── Glare card wrapper ─────────────────────────────────────────────────────
function GlareCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState<React.CSSProperties>({ opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia('(hover: none)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 16;
    const rotX = -(y - 0.5) * 12;
    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlare({
      opacity: 1,
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.04) 60%, transparent 80%)`,
    });
  }

  function handleMouseLeave() {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.45s ease-out',
    });
    setGlare({ opacity: 0, transition: 'opacity 0.35s ease-out' });
  }

  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ ...glare, transition: 'opacity 0.35s ease-out' }}
        aria-hidden
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 01 — selin.me mini hero preview
// ─────────────────────────────────────────────────────────────────────────────
function SelinMeCard() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl bg-white/82 p-5 shadow-[0_10px_52px_rgba(26,22,18,0.09)] ring-1 ring-ink/[0.05] backdrop-blur-sm">
      {/* Index */}
      {/* <span className="mb-3 block font-mono text-[0.68rem] tracking-[0.12em] text-ink/28">01</span> */}

      {/* Browser chrome — aspect-[4/3] */}
      <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink/[0.07] bg-[#F8F7F2]">
        {/* Tab bar */}
        <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-white/70 px-3 py-2">
          {['#6B8F71', '#C9A84C', '#C47A5A'].map((c) => (
            <span
              key={c}
              className="h-[6px] w-[6px] rounded-full"
              style={{ background: c + '80' }}
            />
          ))}
          <span className="ml-2 flex-1 rounded-full bg-ink/[0.06] px-2 py-0.5 text-center font-mono text-[0.38rem] text-ink/30">
            selin-ma.github.io/selin-me
          </span>
        </div>

        {/* Mini nav */}
        <div className="flex items-center justify-between border-b border-ink/[0.05] px-4 py-1.5">
          <span className="font-display text-[0.62rem] italic text-ink">selin.me</span>
          <div className="flex gap-2.5">
            {['Work', 'Play', 'About'].map((n) => (
              <span key={n} className="font-body text-[0.38rem] text-ink/30">
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="px-5 py-4">
          <p className="mb-1 font-mono text-[0.38rem] uppercase tracking-[0.22em] text-[#7FA2BF]/70">
            Portfolio · Chengdu
          </p>
          <h4 className="mb-2 font-display text-[1.4rem] font-black leading-[1.05] text-ink">
            Frontend
            <br />
            Engineer
          </h4>
          <p className="mb-3 font-body text-[0.44rem] leading-relaxed text-ink/40">
            5 yrs exp · React · TypeScript · Next.js
          </p>
          <div className="flex flex-wrap gap-1">
            {['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'].map((t) => (
              <span
                key={t}
                className="rounded-sm bg-ink/[0.05] px-1.5 py-0.5 font-mono text-[0.38rem] text-ink/35"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category chip */}
      <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-[#6B8F71]">
        {t('vibe.card.selinme.category')}
      </p>

      {/* Title */}
      <h3 className="mb-2.5 font-display text-[1.1rem] font-black leading-snug text-ink">
        {t('vibe.card.selinme.title')}
      </h3>

      {/* Desc */}
      <p className="font-body text-[0.7rem] leading-[1.8] text-ink/50">
        {t('vibe.card.selinme.desc')}
      </p>

      {/* Link */}
      <a
        href="https://selin-ma.github.io/selin-me"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 font-mono text-[0.57rem] uppercase tracking-[0.16em] text-[#6B8F71] transition-opacity duration-150 hover:opacity-60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#6B8F71]" /> Live ↗
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 02 — Pickle Vibe phone gallery + lightbox
// ─────────────────────────────────────────────────────────────────────────────
function PickleVibeCard() {
  const { t } = useI18n();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((n) => ((n ?? 0) - 1 + PICKLE_VIBE_SHOTS.length) % PICKLE_VIBE_SHOTS.length);
  const next = () => setLightbox((n) => ((n ?? 0) + 1) % PICKLE_VIBE_SHOTS.length);

  return (
    <>
      <div className="rounded-2xl bg-white/82 p-5 shadow-[0_10px_52px_rgba(26,22,18,0.09)] ring-1 ring-ink/[0.05] backdrop-blur-sm">
        {/* 1 featured + 3 small — aspect-[4/3] */}
        <div className="mb-4 flex aspect-[4/3] w-full flex-col gap-0.5 overflow-hidden rounded-xl bg-ink/[0.06]">
          {/* Featured: index 2 (dark theme, most striking) */}
          <button
            onClick={() => open(2)}
            className="group relative min-h-0 flex-1 overflow-hidden focus:outline-none"
            aria-label="View screenshot 3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              src={PICKLE_VIBE_SHOTS[2]}
              alt="Pickle Vibe featured screen"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              width={100}
              height={100}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/15">
              <svg
                className="opacity-0 drop-shadow transition-opacity duration-200 group-hover:opacity-100"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </button>

          {/* Bottom strip: 3 thumbnails */}
          <div className="flex h-[28%] gap-0.5">
            {[0, 1, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => open(idx)}
                className="group relative flex-1 overflow-hidden focus:outline-none"
                aria-label={`View screenshot ${idx + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PICKLE_VIBE_SHOTS[idx]}
                  alt={`Pickle Vibe screen ${idx + 1}`}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 group-hover:bg-ink/20" />
              </button>
            ))}
          </div>
        </div>

        {/* Category chip */}
        <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-olive">
          {t('vibe.card.picklevibe.category')}
        </p>

        {/* Title */}
        <h3 className="mb-2.5 font-display text-[1.1rem] font-black leading-snug text-ink">
          {t('vibe.card.picklevibe.title')}
        </h3>

        {/* Desc */}
        <p className="font-body text-[0.7rem] leading-[1.8] text-ink/50">
          {t('vibe.card.picklevibe.desc')}
        </p>
      </div>

      {/* Lightbox — portal to body to escape GlareCard's transform stacking context */}
      {lightbox !== null &&
        createPortal(
          <div className="fixed inset-0 z-[100]">
            {/* Backdrop — click anywhere to close */}
            <div
              className="absolute inset-0 bg-ink/65 backdrop-blur-md"
              onClick={close}
              aria-hidden="true"
            />

            {/* Centered image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none"
                style={{ width: 'min(360px, 72vw)', maxHeight: '82vh' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PICKLE_VIBE_SHOTS[lightbox]}
                  alt={`Pickle Vibe screen ${lightbox + 1}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    maxHeight: '82vh',
                    objectFit: 'contain',
                    borderRadius: '28px',
                  }}
                />
              </motion.div>
            </div>

            {/* Counter */}
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/40">
              {lightbox + 1} / {PICKLE_VIBE_SHOTS.length}
            </p>

            {/* Prev — vertically centered, always visible */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/75 md:left-5"
              aria-label="Previous"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>

            {/* Next — vertically centered, always visible */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/75 md:right-5"
              aria-label="Next"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close */}
            <button
              onClick={close}
              className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/75 md:right-6 md:top-6"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 03 — Still Hearth GDD scroll
// ─────────────────────────────────────────────────────────────────────────────
function StillHearthCard() {
  const { t } = useI18n();
  const [paused, setPaused] = useState(false);
  const fullLines = [...GDD_LINES, ...GDD_LINES]; // duplicate for seamless loop

  return (
    <div className="rounded-2xl bg-white/82 p-5 shadow-[0_10px_52px_rgba(26,22,18,0.09)] ring-1 ring-ink/[0.05] backdrop-blur-sm">
      {/* Index */}
      {/* <span className="mb-3 block font-mono text-[0.68rem] tracking-[0.12em] text-ink/28">03</span> */}

      {/* Scrolling GDD terminal — aspect-[4/3] */}
      <div
        className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F5F3EE]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Scrolling text */}
        <motion.div
          className="absolute left-0 top-0 w-full px-4 py-3"
          animate={paused ? {} : { y: [0, -(GDD_LINES.length * 22)] }}
          transition={{ duration: GDD_LINES.length * 1.1, repeat: Infinity, ease: 'linear' }}
        >
          {fullLines.map((line, i) => (
            <div key={i} className="flex gap-3 py-[3px]">
              {line.label ? (
                <>
                  <span className="w-20 shrink-0 font-mono text-[0.48rem] uppercase tracking-[0.08em] text-[#7FA2BF]">
                    {line.label}
                  </span>
                  <span className="font-mono text-[0.48rem] leading-snug text-ink/60">
                    {line.value}
                  </span>
                </>
              ) : (
                <div className="my-0.5 h-px w-full bg-ink/[0.06]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Fade-out gradient at bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12"
          style={{ background: 'linear-gradient(to bottom, transparent, #F5F3EE)' }}
          aria-hidden
        />

        {/* Pause indicator */}
        {paused && (
          <div className="absolute right-3 top-3 z-20 font-mono text-[0.38rem] uppercase tracking-[0.12em] text-ink/20">
            paused
          </div>
        )}
      </div>

      {/* Category chip */}
      <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-[#8B6F47]">
        {t('vibe.card.stillhearth.category')}
      </p>

      {/* Title */}
      <h3 className="mb-2.5 font-display text-[1.1rem] font-black leading-snug text-ink">
        {t('vibe.card.stillhearth.title')}
      </h3>

      {/* Desc */}
      <p className="font-body text-[0.7rem] leading-[1.8] text-ink/50">
        {t('vibe.card.stillhearth.desc')}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card router
// ─────────────────────────────────────────────────────────────────────────────
function VibeCard({ id }: { id: string }) {
  if (id === 'selin-me') return <SelinMeCard />;
  if (id === 'pickle-vibe') return <PickleVibeCard />;
  return <StillHearthCard />;
}

// ── Section ────────────────────────────────────────────────────────────────
export function VibeProjectSection() {
  const { t } = useI18n();
  const featured = vibeProjects
    .filter((p) => FEATURED_IDS.includes(p.id))
    .sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id));

  return (
    <section id="vibe" className="relative overflow-hidden bg-white pt-8 pb-4 md:py-20">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[40%] top-[35%] h-[480px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[90px]"
        style={{ background: 'radial-gradient(ellipse, #7FA2BF 0%, transparent 70%)' }}
      />

      {/* Section header */}
      <Container className="pb-0 pt-14 md:pt-20">
        <motion.p
          className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-olive"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          / {t('vibe.kicker')}
        </motion.p>

        <motion.h2
          className="font-display font-black leading-tight text-ink"
          style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4rem)' }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('vibe.title.prefix')} <em className="text-olive">{t('vibe.title.em')}</em>
        </motion.h2>
      </Container>

      {/* Desktop: scattered + connected */}
      <Container className="hidden lg:block py-20">
        <div className="relative translate-y-20 min-h-[550px]">
          <ConnectorLines />
          {featured.map((project, i) => {
            const cfg = CARD_LAYOUT[i];
            return (
              <motion.div
                key={project.id}
                className="absolute z-10 w-[26%] "
                style={{ left: cfg.left, top: cfg.top, rotate: cfg.rotate }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlareCard>
                  <VibeCard id={project.id} />
                </GlareCard>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Mobile: stacked */}
      <Container className="mt-10 space-y-6 pb-10 lg:hidden">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlareCard>
              <VibeCard id={project.id} />
            </GlareCard>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
