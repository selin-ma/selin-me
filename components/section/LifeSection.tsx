'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useI18n } from '@/components/i18n/I18nProvider';
import { bookshelf, otherHobbies, sportsActivities } from '@/lib/data';
import { cn } from '@/lib/utils';

import { Container } from '../ui/Container';

// ─── Types & constants ────────────────────────────────────────────────────────
type Panel = 0 | 1 | 2;

const NAV_ITEMS = [
  { key: 'sports', num: '01', labelKey: 'life.nav.sports' as const },
  { key: 'reading', num: '02', labelKey: 'life.nav.reading' as const },
  { key: 'more', num: '03', labelKey: 'life.nav.more' as const },
];

const PANEL_CONFIG = [
  { line1: 'Move &', line2: 'Focus.' },
  { line1: 'Quiet', line2: 'Corners.' },
  { line1: 'Wide', line2: 'Awake.' },
];

const SCATTER_OFFSETS = [
  { y: 48, x: -10 },
  { y: 36, x: 12 },
  { y: 56, x: -6 },
  { y: 28, x: 16 },
  { y: 44, x: -14 },
  { y: 32, x: 8 },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
};

const leftItemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 900, damping: 80, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

const sportsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
};

const sportsItemVariants = {
  hidden: { opacity: 0, y: 70, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 240, damping: 22, mass: 0.75 },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

const gridItemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: SCATTER_OFFSETS[i % SCATTER_OFFSETS.length].y,
    x: SCATTER_OFFSETS[i % SCATTER_OFFSETS.length].x,
    filter: 'blur(3px)',
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 800, damping: 75, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: -24,
    x: 0,
    filter: 'blur(3px)',
    transition: { duration: 0.16, ease: 'easeIn' as const },
  },
};

// ─── Sports lightbox ──────────────────────────────────────────────────────────

type SportsPhoto = (typeof sportsActivities)[0]['photos'][number];

function SportsLightbox({
  photos,
  initialIdx,
  onClose,
}: {
  photos: SportsPhoto[];
  initialIdx: number;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [idx, setIdx] = useState(initialIdx);
  const photo = photos[idx];

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(photos.length - 1, i + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/75 backdrop-blur-md" onClick={onClose} role="button" tabIndex={0} onKeyDown={onClose} aria-label="Close" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center" onClick={onClose} role="button" tabIndex={0} onKeyDown={onClose} aria-label="Close">
        <div
          className="relative"
          style={{ width: 'min(1100px, 92vw)' }}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          {photo.src && (
            <div className="relative">
              <Image
                src={photo.src}
                alt={t(photo.labelKey)}
                width={1200}
                height={900}
                style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain', display: 'block' }}
              />
              {/* Mobile prev/next — vertically centered on the image */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    disabled={idx === 0}
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm disabled:opacity-25 lg:hidden"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    disabled={idx === photos.length - 1}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm disabled:opacity-25 lg:hidden"
                  >
                    ›
                  </button>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs text-white/50 lg:hidden">
                    {idx + 1} / {photos.length}
                  </span>
                </>
              )}
            </div>
          )}
          <p className="mt-2 text-center font-body text-sm text-white/60">{t(photo.labelKey)}</p>
        </div>
      </div>

      {/* Desktop Prev / Next */}
      {photos.length > 1 && (
        <>
          <button
            className="absolute left-5 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-opacity hover:opacity-80 disabled:opacity-20 lg:flex"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            disabled={idx === 0}
          >
            ‹
          </button>
          <button
            className="absolute right-16 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-opacity hover:opacity-80 disabled:opacity-20 lg:flex"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            disabled={idx === photos.length - 1}
          >
            ›
          </button>
        </>
      )}

      {/* Close */}
      <button
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-opacity hover:opacity-80"
        onClick={onClose}
      >
        ✕
      </button>
    </div>,
    document.body,
  );
}

// ─── Desktop right-side grids ─────────────────────────────────────────────────

function SportsGrid({ onPhotoClick }: { onPhotoClick: (idx: number) => void }) {
  const { t } = useI18n();
  const photos = sportsActivities[0].photos;
  return (
    <motion.div
      className="grid h-full w-full grid-cols-3 grid-rows-[2fr_1.4fr_1fr] gap-3"
      variants={sportsContainerVariants}
    >
      {photos.slice(0, 7).map((photo, i) => {
        const spanClass = [0, 2].includes(i) ? 'col-span-2' : '';
        return (
          <motion.div
            key={photo.labelKey}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-lg bg-stone-100',
              spanClass,
            )}
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            variants={sportsItemVariants}
            onClick={() => onPhotoClick(i)}
          >
            {photo.src && (
              <Image
                src={photo.src}
                alt={t(photo.labelKey)}
                fill
                className="object-cover"
                style={{ objectPosition: photo.position ?? 'center' }}
              />
            )}
            {/* Label — film wipe reveal on hover */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div className="bg-black/30 px-3 py-2 backdrop-blur-sm [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-[420ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:[clip-path:inset(0_0%_0_0)]">
                <span className="block -translate-x-1 font-mono text-xs tracking-[0.08em] text-white/95 opacity-0 transition-all duration-[300ms] delay-[140ms] ease-out group-hover:translate-x-0 group-hover:opacity-100">
                  {t(photo.labelKey)}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [text]);
  return <span>{displayed}</span>;
}

function ReadingGrid({ onHover }: { onHover: (idx: number) => void }) {
  const { t } = useI18n();
  const books = bookshelf.slice(0, 6);
  return (
    <motion.div
      className="grid h-full w-full items-start gap-x-10 gap-y-5"
      style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
      variants={containerVariants}
    >
      {books.map((book, i) => (
        <motion.div
          key={book.id}
          className="group flex flex-col"
          variants={gridItemVariants}
          custom={i}
        >
          <div className="relative aspect-[2/3]">
            <div
              className="relative h-full w-full cursor-pointer overflow-hidden rounded-r-md shadow-xl transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-20deg)_rotateX(5deg)_translateY(-0.75rem)]"
              style={{ backgroundColor: book.color }}
              onMouseEnter={() => onHover(i)}
              onClick={() => window.open(book.doubanUrl, '_blank', 'noopener,noreferrer')}
              onKeyDown={() => window.open(book.doubanUrl, '_blank', 'noopener,noreferrer')}
              role="button"
              tabIndex={0}
            >
              {book.coverUrl && (
                <Image
                  src={book.coverUrl}
                  alt={t(`life.book.${book.id}.title`)}
                  fill
                  className="object-cover"
                />
              )}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-4 bg-black/10" />
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-r-md"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)',
                }}
              />
              {!book.coverUrl && (
                <div className="relative z-10 flex h-full flex-col justify-end p-4 pl-7">
                  <p className="font-display text-sm font-semibold leading-tight text-white/95">
                    {t(`life.book.${book.id}.title`)}
                  </p>
                  <p className="mt-1.5 font-body text-xs text-white/45">
                    {t(`life.book.${book.id}.category`)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <h4 className="font-serif text-base leading-tight">
              {t(`life.book.${book.id}.title`)}
            </h4>
            <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-olive">
              {t(`life.book.${book.id}.author`)}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function MoreGrid() {
  const { t } = useI18n();
  const [flipped, setFlipped] = useState<number | null>(null);
  const hobbies = otherHobbies.slice(0, 6);

  return (
    <motion.div
      className="grid h-full w-full grid-cols-3 grid-rows-2 gap-3"
      variants={containerVariants}
    >
      {hobbies.map((hobby, i) => {
        const isFlipped = flipped === i;
        const firstPhoto = hobby.photos?.[0];
        const hasPhoto = Boolean(firstPhoto?.src);

        return (
          <motion.div
            key={hobby.id}
            className="group cursor-pointer [perspective:900px]"
            variants={gridItemVariants}
            custom={i}
            onClick={() => setFlipped(isFlipped ? null : i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFlipped(isFlipped ? null : i)}
          >
            {/* Card inner — flips on click */}
            <div
              className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* ── Front ──────────────────────────────────────────── */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl [backface-visibility:hidden]"
                style={{ backgroundColor: hobby.color + '22' }}
              >
                {/* emoji — lifts on hover */}
                <span className="text-5xl transition-transform duration-300 ease-out group-hover:-translate-y-2">
                  {hobby.icon}
                </span>
                <span className="mt-3 font-serif text-sm text-ink">
                  {t(`life.hobby.${hobby.id}.label`)}
                </span>

                {/* flip hint — bottom right */}
                <span
                  className="material-symbols-rounded absolute bottom-2.5 right-3 select-none text-black/40 transition-colors duration-200 group-hover:text-ink/40"
                  style={{
                    fontSize: '15px',
                    fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                  }}
                >
                  swipe_right
                </span>
              </div>

              {/* ── Back — photo only ──────────────────────────────── */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ backgroundColor: hobby.color + '28' }}
              >
                {hasPhoto ? (
                  <Image
                    src={firstPhoto!.src}
                    alt={t(`life.hobby.${hobby.id}.label`)}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="relative h-10 w-10">
                      <div
                        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                        style={{ backgroundColor: hobby.color }}
                      />
                      <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                        style={{ backgroundColor: hobby.color }}
                      />
                    </div>
                  </div>
                )}
                {/* Text overlay — title always peeks, hover slides up */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-2.5rem)] px-3.5 pb-3 pt-3 transition-transform duration-700 ease-in-out group-hover:translate-y-0"
                  style={{
                    background: `linear-gradient(to top, ${hobby.color} 0%, ${hobby.color}cc 50%, transparent 100%)`,
                  }}
                >
                  <p className="mb-1.5 font-serif text-sm text-white">
                    {t(`life.hobby.${hobby.id}.label`)}
                  </p>
                  <p className="font-body text-xs leading-[1.75] text-white/85">
                    {t(`life.hobby.${hobby.id}.desc`)}
                  </p>
                </div>

                {/* swipe_right hint — bottom right */}
                <span
                  className="material-symbols-rounded absolute bottom-2.5 right-3 select-none text-white/60 transition-colors duration-200"
                  style={{
                    fontSize: '16px',
                    fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                  }}
                >
                  swipe_right
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Mobile grids ─────────────────────────────────────────────────────────────

function MobileSportsGrid({ onPhotoClick }: { onPhotoClick: (idx: number) => void }) {
  const { t } = useI18n();
  const photos = sportsActivities[0].photos;
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.slice(0, 6).map((photo, i) => {
        const isFullWidth = i === 0 || i === 3;
        return (
          <div
            key={photo.labelKey}
            className={cn(
              'relative cursor-pointer overflow-hidden rounded-lg bg-stone-100',
              isFullWidth ? 'col-span-2 aspect-[16/9]' : 'aspect-square',
            )}
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            onClick={() => onPhotoClick(i)}
            onKeyDown={(e) => e.key === 'Enter' && onPhotoClick(i)}
            role="button"
            tabIndex={0}
          >
            {photo.src && (
              <Image
                src={photo.src}
                alt={t(photo.labelKey)}
                fill
                className="object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function MobileReadingGrid({ onTap }: { onTap: (idx: number) => void }) {
  const { t } = useI18n();
  const books = bookshelf;
  return (
    <div className="grid grid-cols-2 gap-5">
      {books.map((book, i) => (
        <div key={book.id} className="group flex flex-col" onClick={() => onTap(i)} onKeyDown={(e) => e.key === 'Enter' && onTap(i)} role="button" tabIndex={0}>
          <div className="relative aspect-[2/3] [perspective:800px]">
            <div
              className="relative h-full w-full overflow-hidden rounded-r-md shadow-xl transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-20deg)_rotateX(5deg)_translateY(-0.5rem)]"
              style={{ backgroundColor: book.color }}
            >
              {book.coverUrl && (
                <Image
                  src={book.coverUrl}
                  alt={t(`life.book.${book.id}.title`)}
                  fill
                  className="object-cover"
                />
              )}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-3 bg-black/10" />
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-r-md"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)',
                }}
              />
              {!book.coverUrl && (
                <div className="relative z-10 flex h-full flex-col justify-end p-3 pl-5">
                  <p className="font-display text-xs font-semibold leading-tight text-white/95">
                    {t(`life.book.${book.id}.title`)}
                  </p>
                  <p className="mt-1 font-body text-xs text-white/45">
                    {t(`life.book.${book.id}.category`)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <h4 className="font-serif text-sm leading-tight">{t(`life.book.${book.id}.title`)}</h4>
            <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-olive">
              {t(`life.book.${book.id}.author`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileMoreGrid() {
  const { t } = useI18n();
  const [flipped, setFlipped] = useState<number | null>(null);
  const hobbies = otherHobbies.slice(0, 6);

  return (
    <div className="grid grid-cols-2 gap-3">
      {hobbies.map((hobby, i) => {
        const isFlipped = flipped === i;
        const firstPhoto = hobby.photos?.[0];
        const hasPhoto = Boolean(firstPhoto?.src);

        return (
          <div
            key={hobby.id}
            className="aspect-square cursor-pointer [perspective:900px]"
            onClick={() => setFlipped(isFlipped ? null : i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFlipped(isFlipped ? null : i)}
          >
            <div
              className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl [backface-visibility:hidden]"
                style={{ backgroundColor: hobby.color + '22' }}
              >
                <span className="text-4xl">{hobby.icon}</span>
                <span className="mt-2 font-serif text-sm text-ink">
                  {t(`life.hobby.${hobby.id}.label`)}
                </span>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ backgroundColor: hobby.color + '28' }}
              >
                {hasPhoto ? (
                  <Image
                    src={firstPhoto!.src}
                    alt={t(`life.hobby.${hobby.id}.label`)}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="relative h-8 w-8">
                      <div
                        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                        style={{ backgroundColor: hobby.color }}
                      />
                      <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                        style={{ backgroundColor: hobby.color }}
                      />
                    </div>
                  </div>
                )}
                <div
                  className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-6"
                  style={{
                    background: `linear-gradient(to top, ${hobby.color} 0%, ${hobby.color}cc 50%, transparent 100%)`,
                  }}
                >
                  <p className="font-serif text-xs text-white">
                    {t(`life.hobby.${hobby.id}.label`)}
                  </p>
                  <p className="mt-0.5 font-body text-[0.65rem] leading-[1.6] text-white/80">
                    {t(`life.hobby.${hobby.id}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN — LifeSection
// ═══════════════════════════════════════════════════════════════════════════════

export function LifeSection() {
  const { t } = useI18n();
  const [panel, setPanel] = useState<Panel>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  const [hoveredBookIdx, setHoveredBookIdx] = useState(0);
  const featured = bookshelf[hoveredBookIdx] ?? bookshelf[0];
  const cfg = PANEL_CONFIG[panel];

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const sportsPhotos = sportsActivities[0].photos;

  const GRIDS = [
    <SportsGrid key="sports" onPhotoClick={setLightboxIdx} />,
    <ReadingGrid key="reading" onHover={setHoveredBookIdx} />,
    <MoreGrid key="more" />,
  ];

  return (
    <div id="life">
      {/* ── Desktop: wheel-hijack slider (lg+) ─────────────────────────── */}
      <Container>
        <div ref={sectionRef} className="hidden bg-white lg:block">
          <div className="w-full py-20">
            {/* Kicker */}
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-olive">
              / {t('life.section.kicker')}
            </p>

            {/* Two-column row — left drives height, right stretches to match */}
            <div className="flex gap-16 min-h-[720px]">
              {/* ── Left column ──────────────────────────────────────────── */}
              <div className="flex w-[38%] min-w-[280px] flex-col">
                {/* Animated panel content */}
                <div className="relative flex-1 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={panel}
                      className="absolute inset-0"
                      variants={containerVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      exit="exit"
                    >
                      {/* Heading */}
                      <motion.span
                        className="block font-display font-light leading-[1.05] text-ink"
                        style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)' }}
                        variants={leftItemVariants}
                      >
                        {cfg.line1}
                      </motion.span>
                      <motion.span
                        className="block font-display italic leading-[1.05] text-olive"
                        style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)' }}
                        variants={leftItemVariants}
                      >
                        {cfg.line2}
                      </motion.span>

                      {/* Panel body */}
                      <motion.div className="mt-6 max-w-[380px]" variants={leftItemVariants}>
                        {panel === 0 && (
                          <>
                            {/* Team card */}
                            <div className="group relative mb-5 overflow-hidden rounded-lg border border-olive/40">
                              <div
                                className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-olive/[0.12] to-transparent transition-transform duration-[1800ms] ease-in-out group-hover:translate-x-full"
                                aria-hidden
                              />
                              <a
                                href="https://xhslink.com/m/4x1xebNvxv9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-5 px-5 py-4 transition-colors duration-200"
                              >
                                <Image
                                  src="/images/life/pickleball/twinkle-pickle.png"
                                  alt="Twinkle Pickle"
                                  width={56}
                                  height={56}
                                  className="h-14 w-14 shrink-0 object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="font-display text-[1.1rem] font-black leading-tight text-ink">
                                    Twinkle Pickle
                                  </p>
                                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-olive">
                                    {t('life.sports.teamRole')}
                                  </p>
                                </div>
                                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-olive-lt transition-colors duration-200 group-hover:text-ink">
                                  小红书 ↗
                                </span>
                              </a>
                              <a
                                href="https://xhslink.com/m/8UPl0D3KL2C"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/beesoul flex items-center gap-3 border-t border-olive/10 px-5 py-3 transition-colors duration-200"
                              >
                                <span className="font-mono text-xs uppercase tracking-[0.14em] text-olive-lt transition-colors duration-200 group-hover/beesoul:text-olive">
                                  {t('life.sports.sponsored')}
                                </span>
                                <span className="font-mono text-xs uppercase tracking-[0.1em] text-olive-lt transition-colors duration-200 group-hover/beesoul:text-olive">
                                  Beesoul Pickleball
                                </span>
                              </a>
                            </div>
                            <div className="mb-4 border-l-2 border-olive/40 pl-6">
                              <p className="font-body text-sm leading-[1.85] text-ink">
                                {t('life.sports.motto')}
                              </p>
                            </div>
                          </>
                        )}

                        {panel === 1 && (
                          <>
                            <div className="mb-4 border-l-2 border-olive/40 pl-6">
                              <p className="font-body text-sm leading-[1.85] text-ink">
                                {t('life.reading.body')}
                              </p>
                            </div>
                            {t(`life.book.${featured.id}.note`) && (
                              <p className="pl-6 text-sm font-light italic text-gray-700">
                                &ldquo;
                                <TypewriterText text={t(`life.book.${featured.id}.note`)} />
                                &rdquo;
                                <span className="ml-2 not-italic text-gray-400">
                                  — {`《${t(`life.book.${featured.id}.title`)}》`}
                                </span>
                              </p>
                            )}
                          </>
                        )}

                        {panel === 2 && (
                          <div className="mb-4 border-l-2 border-olive/40 pl-6">
                            <p className="font-body text-sm leading-[1.85] text-ink">
                              {t('life.more.body')}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation — always pinned to bottom */}
                <nav className="flex shrink-0 flex-col gap-3 pb-2" aria-label="Life sections">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = i === panel;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setPanel(i as Panel)}
                        className={cn(
                          'group flex items-center gap-4 transition-all duration-500',
                          isActive && 'pl-5',
                        )}
                      >
                        <span
                          className={cn(
                            'font-mono text-xs transition-colors duration-300',
                            isActive ? 'text-olive' : 'text-black/15',
                          )}
                        >
                          {item.num}
                        </span>
                        <span
                          className={cn(
                            'font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300',
                            isActive ? 'text-olive' : 'text-black/20 group-hover:text-black/40',
                          )}
                        >
                          {t(item.labelKey)}
                        </span>
                        <span
                          className={cn(
                            'h-px flex-1 transition-all duration-500',
                            isActive ? 'bg-olive/50' : 'bg-black/[0.06] group-hover:bg-black/10',
                          )}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* ── Right column — panel grids ──────────────────────────── */}
              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={panel}
                    className="absolute inset-0"
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    exit="exit"
                    variants={containerVariants}
                  >
                    {GRIDS[panel]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Vertical strip navigation ────────────────────────────── */}
              <div className="flex shrink-0 flex-col items-center justify-center gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <button
                    key={item.key}
                    onClick={() => setPanel(i as Panel)}
                    aria-label={t(item.labelKey)}
                    className="group flex w-6 items-center justify-center py-1.5"
                  >
                    <span
                      className={cn(
                        'block w-[2px] transition-all duration-500 ease-out',
                        i === panel
                          ? 'h-7 bg-olive'
                          : 'h-3 bg-olive/30 group-hover:h-4 group-hover:bg-olive/60',
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* ── Mobile: tab layout (below lg) ───────────────────────────────── */}
      <div className="lg:hidden bg-white">
        {/* Header + tab bar */}
        <Container className="pt-10 pb-0">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-olive">
            / {t('life.section.kicker')}
          </p>
          <div className="flex w-full">
            {NAV_ITEMS.map((item, i) => {
              const isActive = panel === i;
              return (
                <button
                  key={item.key}
                  onClick={() => setPanel(i as Panel)}
                  className={cn(
                    'relative flex-1 flex flex-col items-center gap-2.5 transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-ink/30 hover:text-olive-lt',
                  )}
                >
                  <span className="text-xs tracking-wide">{t(item.labelKey)}</span>
                  <motion.span
                    animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0.2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="block h-1 w-1 rounded-full bg-olive"
                  />
                </button>
              );
            })}
          </div>
        </Container>

        {/* Animated panel content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={panel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 pb-14 pt-8"
          >
            {/* Title */}
            <div className="mb-4">
              <span
                className="block font-display font-light leading-[1.05] text-ink"
                style={{ fontSize: 'clamp(2rem, 9vw, 3rem)' }}
              >
                {PANEL_CONFIG[panel].line1}
              </span>
              <span
                className="block font-display italic leading-[1.05] text-olive"
                style={{ fontSize: 'clamp(2rem, 9vw, 3rem)' }}
              >
                {PANEL_CONFIG[panel].line2}
              </span>
            </div>

            {/* Team card — mobile */}
            {panel === 0 && (
              <div className="group relative mb-4 overflow-hidden rounded-lg border border-olive/40">
                <div
                  className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-olive/[0.12] to-transparent transition-transform duration-[1800ms] ease-in-out group-hover:translate-x-full"
                  aria-hidden
                />
                <a
                  href="https://xhslink.com/m/4x1xebNvxv9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-200"
                >
                  <Image
                    src="/images/life/pickleball/twinkle-pickle.png"
                    alt="Twinkle Pickle"
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[1rem] font-black leading-tight text-ink">
                      Twinkle Pickle
                    </p>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.14em] text-olive">
                      {t('life.sports.teamRole')}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-ink/60">
                    小红书 ↗
                  </span>
                </a>
                <a
                  href="https://xhslink.com/m/8UPl0D3KL2C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/beesoul flex items-center gap-3 border-t border-olive/10 px-4 py-2.5 transition-colors duration-200"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-olive-lt transition-colors duration-200 group-hover/beesoul:text-olive">
                    {t('life.sports.sponsored')}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-olive-lt transition-colors duration-200 group-hover/beesoul:text-olive">
                    Beesoul Pickleball
                  </span>
                </a>
              </div>
            )}

            {/* Body copy */}
            <div className="mb-3 border-l-2 border-olive/40 pl-5">
              {panel === 0 && (
                <p className="font-body text-sm leading-[1.85] text-ink">
                  {t('life.sports.motto')}
                </p>
              )}
              {panel === 1 && (
                <p className="font-body text-sm leading-[1.85] text-ink">
                  {t('life.reading.body')}
                </p>
              )}
              {panel === 2 && (
                <p className="font-body text-sm leading-[1.85] text-ink">{t('life.more.body')}</p>
              )}
            </div>

            {panel === 1 && (
              <p className="mb-4 pl-5 text-[0.82rem] font-light italic text-gray-700">
                &ldquo;{t(`life.book.${featured.id}.note`)}&rdquo;
                <span className="ml-2 not-italic text-gray-400">
                  — {`《${t(`life.book.${featured.id}.title`)}》`}
                </span>
              </p>
            )}

            {panel === 0 && <MobileSportsGrid onPhotoClick={setLightboxIdx} />}
            {panel === 1 && <MobileReadingGrid onTap={setHoveredBookIdx} />}
            {panel === 2 && <MobileMoreGrid />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sports photo lightbox */}
      {lightboxIdx !== null && (
        <SportsLightbox
          photos={sportsPhotos}
          initialIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </div>
  );
}
