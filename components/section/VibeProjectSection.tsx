'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import kanaJump1 from '@/public/images/vibeProjects/kana-jump-1.jpg';
import kanaJump2 from '@/public/images/vibeProjects/kana-jump-2.jpg';
import kanaJump3 from '@/public/images/vibeProjects/kana-jump-3.jpg';
import kanaJump4 from '@/public/images/vibeProjects/kana-jump-4.jpg';
import kanaJump5 from '@/public/images/vibeProjects/kana-jump-5.jpg';
import kanaJump from '@/public/images/vibeProjects/kana-jump.jpeg';
import pickleVibe11 from '@/public/images/vibeProjects/pickle-vibe-1-1.png';
import pickleVibe1 from '@/public/images/vibeProjects/pickle-vibe-1.png';
import pickleVibe2 from '@/public/images/vibeProjects/pickle-vibe-2.png';
import pickleVibe3 from '@/public/images/vibeProjects/pickle-vibe-3.png';
import pickleVibe4 from '@/public/images/vibeProjects/pickle-vibe-4.png';
import pickleVibe5 from '@/public/images/vibeProjects/pickle-vibe-5.png';
import pickleVibe62 from '@/public/images/vibeProjects/pickle-vibe-6-2.png';
import pickleVibe6 from '@/public/images/vibeProjects/pickle-vibe-6.png';

const CARD_ORDER = ['selin-me', 'kana-jump', 'pickle-vibe', 'still-hearth'] as const;
type CardId = (typeof CARD_ORDER)[number];

const KANA_JUMP_SHOTS: StaticImageData[] = [
  kanaJump,
  kanaJump1,
  kanaJump2,
  kanaJump3,
  kanaJump4,
  kanaJump5,
];

const PICKLE_VIBE_SHOTS: StaticImageData[] = [
  pickleVibe11,
  pickleVibe2,
  pickleVibe3,
  pickleVibe6,
  pickleVibe1,
  pickleVibe4,
  pickleVibe5,
  pickleVibe62,
];

type LbState = { shots: StaticImageData[]; index: number };

const CARD_SHOTS: Partial<Record<CardId, StaticImageData[]>> = {
  'kana-jump': KANA_JUMP_SHOTS,
  'pickle-vibe': PICKLE_VIBE_SHOTS,
};

// ── GDD terminal content ───────────────────────────────────────────────────
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

type LinkDef = { href: string; label: string; primary: boolean };
type CardMeta = { accent: string; techStack: string[]; links?: LinkDef[] };

const CARD_META: Record<CardId, CardMeta> = {
  'kana-jump': {
    accent: '#7FA2BF',
    techStack: ['React', 'TypeScript', 'Supabase', 'PWA'],
    links: [
      { href: 'https://kana-jump.vercel.app/', label: 'Live', primary: true },
      { href: 'https://github.com/selin-ma/kana-jump', label: 'GitHub', primary: false },
    ],
  },
  'selin-me': {
    accent: '#6B8F71',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
    links: [
      { href: 'https://selin-me.vercel.app', label: 'Live', primary: true },
      { href: 'https://github.com/selin-ma/selin-me', label: 'GitHub', primary: false },
    ],
  },
  'pickle-vibe': {
    accent: '#7C6FA0',
    techStack: ['React', 'TypeScript', 'Vite'],
  },
  'still-hearth': {
    accent: '#8B6F47',
    techStack: ['Godot 4', 'GDScript', 'Aseprite'],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Left-panel visuals
// ─────────────────────────────────────────────────────────────────────────────

function KanaJumpVisual({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="flex h-full flex-col gap-px bg-ink/[0.04]">
      {/* Main screenshot */}
      <button
        onClick={() => onOpen(0)}
        className="group relative flex-[3] overflow-hidden focus:outline-none"
        aria-label="View screenshot 1"
      >
        <Image
          src={kanaJump}
          alt="Kana Jump app screenshot"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 group-hover:bg-ink/10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span
            className="material-symbols-outlined text-lg leading-none text-ink/40 drop-shadow-sm"
            style={{ fontVariationSettings: "'wght' 300" }}
          >
            expand_content
          </span>
        </div>
      </button>
      {/* 3 thumbnails — kanaJump4/5 reachable via lightbox prev/next */}
      <div className="flex flex-[1] gap-px">
        {[kanaJump1, kanaJump2, kanaJump3].map((src, i) => (
          <button
            key={i}
            onClick={() => onOpen(i + 1)}
            className="group relative flex-1 overflow-hidden focus:outline-none"
            aria-label={`View screenshot ${i + 2}`}
          >
            <Image
              src={src}
              alt={`Kana Jump screenshot ${i + 2}`}
              fill
              sizes="(max-width: 1024px) 33vw, 13vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.06]"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 group-hover:bg-ink/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span
                className="material-symbols-outlined text-[14px] leading-none text-ink/40 drop-shadow-sm"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                expand_content
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SelinMeVisual() {
  return (
    <div className="flex h-full flex-col bg-[#F8F7F2]">
      {/* Browser chrome */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-ink/[0.06] bg-white/80 px-4 py-2.5">
        {['#6B8F71', '#C9A84C', '#C47A5A'].map((c) => (
          <span key={c} className="h-[7px] w-[7px] rounded-full" style={{ background: c + '80' }} />
        ))}
        <span className="ml-2 flex-1 rounded-full bg-ink/[0.06] px-2 py-0.5 text-center font-mono text-[0.42rem] text-ink/30">
          https://selin-me.vercel.app
        </span>
      </div>
      {/* Mini nav */}
      <div className="flex shrink-0 items-center justify-between border-b border-ink/[0.05] px-5 py-2">
        <span className="font-dm-mono text-[0.75rem] italic text-ink">selin.me</span>
        <div className="flex gap-3">
          {['Work', 'Play', 'About'].map((n) => (
            <span key={n} className="font-body text-[0.45rem] text-ink/30">
              {n}
            </span>
          ))}
        </div>
      </div>
      {/* Hero content */}
      <div className="flex flex-1 flex-col justify-center px-7 py-6">
        <p className="mb-2 font-mono text-[0.45rem] uppercase tracking-[0.22em] text-[#7FA2BF]/70">
          Portfolio · Chengdu
        </p>
        <h4 className="mb-3 font-dm-mono text-[2.8rem] font-black leading-[1.0] text-ink">
          Frontend
          <br />
          Engineer
        </h4>
        <p className="mb-4 font-body text-[0.55rem] leading-relaxed text-ink/40">
          5 yrs exp · React · TypeScript · Next.js
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'].map((t) => (
            <span
              key={t}
              className="rounded bg-ink/[0.05] px-2 py-0.5 font-mono text-[0.42rem] text-ink/35"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PickleVibeVisual({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-px bg-ink/[0.06]">
      {PICKLE_VIBE_SHOTS.slice(0, 4).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onOpen(idx)}
          className="group relative overflow-hidden focus:outline-none"
          aria-label={`View screenshot ${idx + 1}`}
        >
          <Image
            src={PICKLE_VIBE_SHOTS[idx]}
            alt={`Pickle Vibe screen ${idx + 1}`}
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.06]"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 group-hover:bg-ink/20" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="material-symbols-outlined text-lg leading-none text-ink/40 drop-shadow-sm">
              expand_content
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function StillHearthVisual() {
  const [paused, setPaused] = useState(false);
  const fullLines = [...GDD_LINES, ...GDD_LINES];
  return (
    <div
      className="relative h-full overflow-hidden bg-[#F5F3EE]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="absolute left-0 top-0 w-full px-5 py-4"
        animate={paused ? {} : { y: [0, -(GDD_LINES.length * 24)] }}
        transition={{ duration: GDD_LINES.length * 1.1, repeat: Infinity, ease: 'linear' }}
      >
        {fullLines.map((line, i) => (
          <div key={i} className="flex gap-4 py-[4px]">
            {line.label ? (
              <>
                <span className="w-24 shrink-0 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-[#8B6F47]">
                  {line.label}
                </span>
                <span className="font-mono text-[0.52rem] leading-snug text-ink/60">
                  {line.value}
                </span>
              </>
            ) : (
              <div className="my-1 h-px w-full bg-ink/[0.06]" />
            )}
          </div>
        ))}
      </motion.div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, #F5F3EE)' }}
        aria-hidden
      />
      {paused && (
        <div className="absolute right-4 top-4 font-mono text-[0.4rem] uppercase tracking-[0.12em] text-ink/20">
          PAUSED
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop card
// ─────────────────────────────────────────────────────────────────────────────

function VibeCardFull({
  id,
  onOpen,
  depth = 0,
}: {
  id: CardId;
  onOpen: (i: number) => void;
  depth?: number;
}) {
  const { t } = useI18n();
  const meta = CARD_META[id];
  const key = id.replaceAll('-', '');

  const visual =
    id === 'kana-jump' ? (
      <KanaJumpVisual onOpen={depth === 0 ? onOpen : () => {}} />
    ) : id === 'selin-me' ? (
      <SelinMeVisual />
    ) : id === 'pickle-vibe' ? (
      <PickleVibeVisual onOpen={depth === 0 ? onOpen : () => {}} />
    ) : (
      <StillHearthVisual />
    );

  return (
    <div
      className="relative flex h-full overflow-hidden rounded-3xl bg-white"
      style={{
        boxShadow:
          depth === 0
            ? '0 32px 80px rgba(26,22,18,0.14), 0 8px 24px rgba(26,22,18,0.07)'
            : '0 4px 16px rgba(26,22,18,0.05)',
      }}
    >
      {/* Depth tint */}
      {depth > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
          style={{
            background: depth === 1 ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.06)',
            boxShadow: `inset 0 0 0 1px rgba(0,0,0,${depth === 1 ? 0.03 : 0.05})`,
          }}
        />
      )}

      {/* Left: project visual */}
      <div
        className="relative w-[60%] shrink-0 overflow-hidden"
        style={{ boxShadow: 'inset -10px 0 28px -10px rgba(0,0,0,0.09)' }}
      >
        {visual}
        {depth > 0 && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: meta.accent + '18' }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="flex flex-1 flex-col justify-between px-10 py-10">
        <div>
          <p
            className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.22em]"
            style={{ color: meta.accent }}
          >
            {t(`vibe.card.${key}.category` as Parameters<typeof t>[0])}
          </p>
          <h3
            className="mb-4 font-dm-mono text-[2.4rem] font-black leading-tight"
            style={{ color: meta.accent }}
          >
            {t(`vibe.card.${key}.title` as Parameters<typeof t>[0])}
          </h3>
          <p className="font-body text-[0.88rem] leading-[1.85] text-ink/55">
            {t(`vibe.card.${key}.desc` as Parameters<typeof t>[0])}
          </p>
        </div>

        <div className="space-y-5">
          {meta.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {meta.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink/[0.08] px-2.5 py-0.5 font-mono text-[0.6rem] text-ink/45"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {meta.links && (
            <div className="flex gap-3">
              {meta.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-all duration-200 hover:opacity-70"
                  style={{
                    borderColor: link.primary ? meta.accent : 'rgba(35,36,32,0.12)',
                    color: link.primary ? meta.accent : 'rgba(35,36,32,0.35)',
                  }}
                >
                  {link.label}
                  {link.primary && (
                    <span
                      className="material-symbols-outlined text-base leading-none"
                      style={{ fontVariationSettings: "'wght' 400", fontSize: '14px' }}
                    >
                      arrow_outward
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile card
// ─────────────────────────────────────────────────────────────────────────────

function VibeCardMobile({ id }: { id: CardId }) {
  const { t } = useI18n();
  const meta = CARD_META[id];
  const key = id.replaceAll('-', '');
  const [lightbox, setLightbox] = useState<LbState | null>(null);
  const lbShots = lightbox?.shots ?? [];

  const closeLb = () => setLightbox(null);
  const openLb = (cardId: CardId) => (i: number) => {
    const s = CARD_SHOTS[cardId];
    if (s) setLightbox({ shots: s, index: i });
  };
  const prevLb = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.shots.length) % lb.shots.length } : null,
    );
  const nextLb = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.shots.length } : null));

  const visual =
    id === 'kana-jump' ? (
      <KanaJumpVisual onOpen={openLb('kana-jump')} />
    ) : id === 'selin-me' ? (
      <SelinMeVisual />
    ) : id === 'pickle-vibe' ? (
      <PickleVibeVisual onOpen={openLb('pickle-vibe')} />
    ) : (
      <StillHearthVisual />
    );

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(26,22,18,0.10)] ring-1 ring-ink/[0.04]">
        <div className="aspect-[4/3] overflow-hidden">{visual}</div>
        <div className="p-5">
          <p
            className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.2em]"
            style={{ color: meta.accent }}
          >
            {t(`vibe.card.${key}.category` as Parameters<typeof t>[0])}
          </p>
          <h3
            className="mb-2 font-dm-mono text-[1.3rem] font-black leading-snug"
            style={{ color: meta.accent }}
          >
            {t(`vibe.card.${key}.title` as Parameters<typeof t>[0])}
          </h3>
          <p className="font-body text-[0.72rem] leading-[1.8] text-ink/50">
            {t(`vibe.card.${key}.desc` as Parameters<typeof t>[0])}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {meta.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-ink/[0.08] px-2 py-0.5 font-mono text-[0.5rem] text-ink/40"
              >
                {tech}
              </span>
            ))}
          </div>
          {meta.links && (
            <div className="mt-4 flex gap-3">
              {meta.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                  style={{
                    borderColor: link.primary ? meta.accent : 'rgba(35,36,32,0.12)',
                    color: link.primary ? meta.accent : 'rgba(35,36,32,0.35)',
                  }}
                >
                  {link.label}
                  {link.primary && <span>›</span>}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox (Pickle Vibe only) */}
      {lightbox !== null &&
        createPortal(
          <div className="fixed inset-0 z-[100]">
            <div
              className="absolute inset-0 bg-ink/65 backdrop-blur-md"
              onClick={closeLb}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.div
                key={lightbox.index}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none"
                style={{ width: 'min(360px, 72vw)', maxHeight: '82vh' }}
              >
                <Image
                  src={lbShots[lightbox.index]}
                  alt={`Screenshot ${lightbox.index + 1}`}
                  placeholder="blur"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '82vh',
                    objectFit: 'contain',
                    borderRadius: '28px',
                  }}
                />
              </motion.div>
            </div>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/40">
              {lightbox.index + 1} / {lbShots.length}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLb();
              }}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
              aria-label="Previous"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLb();
              }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
              aria-label="Next"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={closeLb}
              className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
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
// Desktop slider
// ─────────────────────────────────────────────────────────────────────────────

function VibeSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<LbState | null>(null);
  const lbShots = lightbox?.shots ?? [];

  const canPrev = activeIdx > 0;
  const canNext = activeIdx < CARD_ORDER.length - 1;

  const closeLb = () => setLightbox(null);
  const openLb = (cardId: CardId) => (i: number) => {
    const s = CARD_SHOTS[cardId];
    if (s) setLightbox({ shots: s, index: i });
  };
  const prevLb = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.shots.length) % lb.shots.length } : null,
    );
  const nextLb = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.shots.length } : null));

  function getAnimate(depth: number) {
    if (depth < 0) return { x: -100, y: 0, scale: 0.88, opacity: 0, zIndex: 0 };
    if (depth === 0) return { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 40 };
    if (depth === 1) return { x: 0, y: -28, scale: 0.965, opacity: 1, zIndex: 30 };
    if (depth === 2) return { x: 0, y: -52, scale: 0.93, opacity: 1, zIndex: 20 };
    return { x: 0, y: -72, scale: 0.895, opacity: 0.6, zIndex: 10 };
  }

  return (
    <>
      <div className="flex items-center gap-8 pt-20">
        {/* Prev button */}
        <button
          onClick={() => canPrev && setActiveIdx((i) => i - 1)}
          disabled={!canPrev}
          aria-label="Previous project"
          className={`mb-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
            canPrev
              ? 'border-ink/15 bg-white text-ink shadow-sm hover:border-ink hover:bg-ink hover:text-white hover:shadow-md'
              : 'cursor-not-allowed border-ink/[0.06] bg-white/50 text-ink/20'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Card stack */}
        <div className="relative flex-1" style={{ height: '600px', overflow: 'visible' }}>
          {/* Decorative background number */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-dm-mono font-black leading-none text-ink/[0.04]"
            style={{ fontSize: '22rem', zIndex: 0 }}
          >
            {String(activeIdx + 1).padStart(2, '0')}
          </div>

          {CARD_ORDER.map((id, index) => {
            const depth = index - activeIdx;
            const anim = getAnimate(depth);
            return (
              <motion.div
                key={id}
                className="absolute inset-0"
                animate={{ x: anim.x, y: anim.y, scale: anim.scale, opacity: anim.opacity }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: anim.zIndex, pointerEvents: depth === 0 ? 'auto' : 'none' }}
              >
                <VibeCardFull id={id} onOpen={openLb(id)} depth={depth < 0 ? 0 : depth} />
              </motion.div>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => canNext && setActiveIdx((i) => i + 1)}
          disabled={!canNext}
          aria-label="Next project"
          className={`mb-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
            canNext
              ? 'border-ink/15 bg-white text-ink shadow-sm hover:border-ink hover:bg-ink hover:text-white hover:shadow-md'
              : 'cursor-not-allowed border-ink/[0.06] bg-white/50 text-ink/20'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-8 flex justify-center gap-2.5">
        {CARD_ORDER.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-6 bg-ink/60' : 'w-1.5 bg-ink/20 hover:bg-ink/35'
            }`}
          />
        ))}
      </div>

      {/* Lightbox portal (Pickle Vibe) */}
      {lightbox !== null &&
        createPortal(
          <div className="fixed inset-0 z-[100]">
            <div
              className="absolute inset-0 bg-ink/65 backdrop-blur-md"
              onClick={closeLb}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.div
                key={lightbox.index}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none"
                style={{ width: 'min(360px, 72vw)', maxHeight: '82vh' }}
              >
                <Image
                  src={lbShots[lightbox.index]}
                  alt={`Screenshot ${lightbox.index + 1}`}
                  placeholder="blur"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '82vh',
                    objectFit: 'contain',
                    borderRadius: '28px',
                  }}
                />
              </motion.div>
            </div>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/40">
              {lightbox.index + 1} / {lbShots.length}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLb();
              }}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/75 md:left-5"
              aria-label="Previous"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLb();
              }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/75 md:right-5"
              aria-label="Next"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={closeLb}
              className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/75 md:right-6 md:top-6"
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
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
// Section
// ─────────────────────────────────────────────────────────────────────────────

export function VibeProjectSection() {
  const { t } = useI18n();

  return (
    <section id="vibe" className="relative overflow-hidden bg-white pt-20 md:pt-40 md:pb-20">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[100px]"
        style={{ background: 'radial-gradient(ellipse, #7FA2BF 0%, transparent 70%)' }}
      />

      {/* Section header */}
      <Container className="md:pb-14 md:pt-0">
        <motion.p
          className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-olive-dark"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          / {t('vibe.kicker')}
        </motion.p>
        <motion.h2
          className="font-dm-mono font-black leading-tight text-ink"
          style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4rem)' }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('vibe.title.prefix')} <em className="text-olive">{t('vibe.title.em')}</em>
        </motion.h2>
      </Container>

      {/* Desktop slider */}
      <Container className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <VibeSlider />
        </motion.div>
      </Container>

      {/* Mobile stacked */}
      <Container className="pt-8 space-y-6 pb-10 lg:hidden">
        {CARD_ORDER.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <VibeCardMobile id={id} />
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
