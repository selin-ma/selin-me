'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { bookshelf, otherHobbies, sportsActivities } from '@/lib/data';
import { cn } from '@/lib/utils';
import twinklePickleImg from '@/public/images/life/pickleball/twinkle-pickle.jpg';
import { HandwrittenUnderline } from './HeroSection';
import { PixelRevealHeading } from './WorkShowcaseSection';

// ── Constants ─────────────────────────────────────────────────────────────────

type ActiveSection = 'sports' | 'reading' | 'more';

const SECTION_IDS: Record<ActiveSection, string> = {
  sports: 'lm-sports',
  reading: 'lm-reading',
  more: 'lm-more',
};

const PHOTO_ROTATIONS = [-2.4, 1.8, -1.2, 2.6, -0.8, 1.4, -2.0];

// Alternating aspect ratios create the waterfall height variation
const PHOTO_ASPECTS = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[16/9]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[16/9]',
  'aspect-[4/3]',
  'aspect-[3/4]',
];

const BOOK_ROTATIONS = [-1.8, 1.4, -0.9, 2.2, -1.6, 0.7];
// Per-book tilt for the tipped-in cover stamp — opposite-ish to card tilt for a casual look
const STAMP_ROTATIONS = [5, -4, 6, -5, 4, -6];
const HOBBY_ROTATIONS = [1.2, -1.6, 0.7, -1.2, 1.8, -0.8, 1.0, -1.4, 0.5];
const HOBBY_ASPECTS = [
  'aspect-[4/3]',
  'aspect-[16/9]',
  'aspect-[4/3]',
  'aspect-[16/9]',
  'aspect-[16/9]',
  'aspect-[16/9]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[3/2]',
];

// Decorative pin colours for polaroids — purely visual variation
const PIN_STYLES: React.CSSProperties[] = [
  { background: 'radial-gradient(circle at 36% 32%, #d9a040 0%, #8c5a10 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #e05555 0%, #991a1a 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #4a90d9 0%, #1a5aa8 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #5ba85b 0%, #246424 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #9060c8 0%, #5030a0 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #e05555 0%, #991a1a 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #d9a040 0%, #8c5a10 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #4a90d9 0%, #1a5aa8 70%)' },
  { background: 'radial-gradient(circle at 36% 32%, #5ba85b 0%, #246424 70%)' },
];

const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.5, ease: EASE_SPRING },
  }),
};

const MONTH_KEYS = [
  'life.photo.date.jan',
  'life.photo.date.feb',
  'life.photo.date.mar',
  'life.photo.date.apr',
  'life.photo.date.may',
  'life.photo.date.jun',
  'life.photo.date.jul',
  'life.photo.date.aug',
  'life.photo.date.sep',
  'life.photo.date.oct',
  'life.photo.date.nov',
  'life.photo.date.dec',
] as const;

// ── Shared small components ────────────────────────────────────────────────────

function Paperclip() {
  return (
    <svg
      className="shrink-0 self-start ml-2.5 -mb-5 rotate-[38deg] origin-bottom-left z-[4] [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.22))]"
      width="14"
      height="38"
      viewBox="0 0 14 38"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 2.5C3.5 2.5 1.5 4.8 1.5 8L1.5 28C1.5 32.8 3.8 35.5 7 35.5C10.2 35.5 12.5 32.8 12.5 28L12.5 7.5C12.5 5.5 11 3.5 9 3.5C7 3.5 5.5 5.5 5.5 7.5L5.5 28C5.5 30.2 6.2 31.5 7 31.5"
        stroke="#b0b0b0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-[3px] mb-6 shadow-sm">
      <span className="w-[5px] h-[5px] rounded-full bg-sticky-yellow shrink-0" />
      <span className="font-dm-mono text-xs uppercase tracking-[0.26em] text-ink">{children}</span>
    </div>
  );
}

// ── Sports ─────────────────────────────────────────────────────────────────────

function formatPhotoDate(isoDate: string, t: (key: string) => string): string {
  const [year, month] = isoDate.split('-');
  const monthKey = MONTH_KEYS[parseInt(month, 10) - 1];
  const monthLabel = t(monthKey);
  // zh keys end with "月" — format as "YYYY年M月"; en keys are 3-letter abbreviations
  return monthLabel.endsWith('月') ? `${year}年${monthLabel}` : `${monthLabel} ${year}`;
}

function SportsSection() {
  const { t } = useI18n();
  const photos = sportsActivities[0].photos;

  return (
    <>
      {/* Swinging badge */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 3.6, ease: 'easeInOut', repeat: Infinity }}
          className="flex flex-col items-center w-full max-w-[500px] origin-top"
        >
          {/* Cord + hole */}
          <div className="w-px h-[26px] bg-gradient-to-b from-ink/30 to-ink/[0.07]" />
          <div className="w-[14px] h-[14px] rounded-full border-2 border-ink/20 bg-[#EDE8DC] -mb-0.5 z-[2] shadow-[inset_0_1px_3px_rgba(0,0,0,0.14)]" />

          {/* Badge card */}
          <a
            href="https://xhslink.com/m/4x1xebNvxv9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full aspect-[408/209] rounded-[10px] bg-white border border-ink/[0.07] shadow-[0_6px_22px_rgba(0,0,0,0.14)] overflow-hidden flex no-underline hover:shadow-[0_10px_34px_rgba(0,0,0,0.2)] transition-shadow duration-300"
          >
            {/* Club logo panel */}
            <div className="badge-left-panel w-[45%] shrink-0 relative overflow-hidden">
              <Image
                src={twinklePickleImg}
                alt="Twinkle Pickle"
                fill
                placeholder="blur"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/[0.08]" />
            </div>
            {/* Coaching certificate info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between p-2.5 sm:p-4">
              <div className="space-y-0 sm:space-y-1.5">
                <p className="font-dm-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-ink/80">
                  {t('life.sports.badge.tag')}
                </p>
                <p className="mt-1 sm:mt-4 font-caveat-hand text-3xl sm:text-5xl leading-none text-ink font-medium">
                  {t('life.sports.badge.name')}
                </p>
                <div className="pt-1.5 sm:pt-4">
                  <p className="font-dm-mono text-[0.65rem] sm:text-sm uppercase tracking-[0.06em] sm:tracking-[0.14em] text-ink font-medium leading-snug">
                    {t('life.sports.badge.role1')}
                  </p>
                  <p className="font-dm-mono text-[0.65rem] sm:text-sm uppercase tracking-[0.06em] sm:tracking-[0.1em] text-ink font-medium leading-snug">
                    {t('life.sports.badge.role2')}
                  </p>
                </div>
              </div>
              <div className="border-t border-ink/[0.07] pt-1.5 sm:pt-2">
                <p className="font-dm-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.08em] text-ink/80">
                  {t('life.sports.badge.sponsorLabel')}
                </p>
                <p className="font-dm-mono text-[0.65rem] sm:text-sm uppercase tracking-[0.06em] sm:tracking-[0.1em] text-ink font-semibold">
                  {t('life.sports.badge.sponsor')}
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Polaroid waterfall — 2 cols mobile, 3 cols desktop */}
      <div className="columns-2 lg:columns-3 [column-gap:14px]">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.labelKey}
            className="break-inside-avoid mb-[14px] flex flex-col items-center gap-[5px] cursor-pointer"
            custom={i}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10px' }}
            style={{ rotate: PHOTO_ROTATIONS[i] }}
            whileHover={{ rotate: 0, y: -9, scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.32, ease: EASE_SPRING }}
          >
            {/* Thumbtack pin */}
            <div
              className="w-[13px] h-[13px] rounded-full shrink-0 z-[2] shadow-[0_2px_5px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.22)]"
              style={PIN_STYLES[i]}
            />
            {/* Polaroid frame */}
            <motion.div
              className="bg-white px-2 py-2 lg:py-3 border border-black/[0.02] w-full shadow-[0_4px_16px_rgba(0,0,0,0.13),0_1px_4px_rgba(0,0,0,0.07)]"
              whileHover={{
                boxShadow: '0 12px 30px rgba(0,0,0,0.22), 0 3px 8px rgba(0,0,0,0.1)',
              }}
              transition={{ duration: 0.32 }}
            >
              <div className={cn('w-full relative overflow-hidden', PHOTO_ASPECTS[i])}>
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={t(photo.labelKey)}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1024px) 48vw, 30vw"
                    className="object-cover"
                    style={{ objectPosition: photo.position ?? 'center' }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-olive-bg" />
                )}
              </div>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-1 px-0.5">
                <p className="font-dm-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.14em] text-ink/80 leading-tight text-center">
                  {t(photo.labelKey)}
                </p>
                {photo.date && (
                  <span className="shrink-0 font-dm-mono text-[0.6rem] sm:text-xs tracking-[0.06em] text-ink/60 sm:text-ink/80 text-center">
                    {formatPhotoDate(photo.date, t)}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ── Reading ────────────────────────────────────────────────────────────────────

function ReadingSection() {
  const { t } = useI18n();

  return (
    <div className="columns-2 lg:columns-3 [column-gap:14px]">
      {bookshelf.map((book, i) => (
        <motion.div
          key={book.id}
          className="break-inside-avoid mb-[14px] flex flex-col items-center gap-0 cursor-pointer"
          custom={i}
          variants={CARD_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10px' }}
          style={{ rotate: BOOK_ROTATIONS[i] }}
          whileHover={{ rotate: 0, y: -7, zIndex: 10 }}
          transition={{ duration: 0.38, ease: EASE_SPRING }}
          onClick={() => window.open(book.doubanUrl, '_blank', 'noopener,noreferrer')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === 'Enter' && window.open(book.doubanUrl, '_blank', 'noopener,noreferrer')
          }
        >
          {/* Paperclip attached at top-left corner */}
          <Paperclip />
          {/* Journal card */}
          <motion.div
            className="w-full bg-book-card rounded-[5px] overflow-hidden border border-black/[0.04] shadow-[0_3px_14px_rgba(0,0,0,0.11),0_1px_3px_rgba(0,0,0,0.06)]"
            whileHover={{
              boxShadow: '0 8px 24px rgba(0,0,0,0.13), 0 2px 6px rgba(0,0,0,0.06)',
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Book jacket band — color block with title + tipped-in cover stamp */}
            <div
              className="relative px-3 pt-5 pb-4 flex flex-col justify-end min-h-[90px]"
              style={{ backgroundColor: book.color }}
            >
              {book.coverUrl && (
                <motion.div
                  className="absolute top-2.5 right-2.5 hidden sm:block w-[42px] bg-white p-[3px] shadow-[0_2px_7px_rgba(0,0,0,0.3)]"
                  style={{ rotate: STAMP_ROTATIONS[i] }}
                  whileHover={{ rotate: 0, scale: 1.08 }}
                  transition={{ duration: 0.3, ease: EASE_SPRING }}
                  aria-hidden
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden">
                    <Image
                      src={book.coverUrl}
                      alt={t(`life.book.${book.id}.title`)}
                      fill
                      placeholder="blur"
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              )}
              <p className="font-dm-mono text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/60 mb-1 sm:mb-1.5 sm:pr-[52px]">
                {t(`life.book.${book.id}.category`)}
              </p>
              <h4 className="font-dm-mono text-sm sm:text-lg font-bold text-white leading-tight sm:pr-[52px]">
                {`《${t(`life.book.${book.id}.title`)}》`}
              </h4>
            </div>
            {/* Card body */}
            <div className="p-3 pt-2.5">
              <p className="font-dm-mono text-xs lg:text-sm uppercase tracking-[0.1em] text-ink">
                {t(`life.book.${book.id}.author`)}
              </p>
              <p className="font-dm-mono text-xs lg:text-sm  italic text-ink/80 mt-2 leading-[1.65] border-l-2 border-ink/[0.08] pl-2">
                {t(`life.book.${book.id}.note`)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ── More / Hobbies ─────────────────────────────────────────────────────────────

function MoreSection() {
  const { t } = useI18n();

  return (
    <div className="columns-2 md:columns-3 [column-gap:14px]">
      {otherHobbies.map((hobby, i) => {
        const photo = hobby.photos?.[0];
        return (
          <motion.div
            key={hobby.id}
            className="group relative break-inside-avoid mb-[14px] flex flex-col items-center gap-0 cursor-pointer"
            custom={i}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10px' }}
            style={{ rotate: HOBBY_ROTATIONS[i] }}
            whileHover={{ rotate: 0, y: -6, zIndex: 10 }}
            transition={{ duration: 0.3, ease: EASE_SPRING }}
          >
            {/* Corner tape strips */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-[4px] left-4 w-[34px] h-[10px] rotate-[-5deg] bg-white/50 border border-white/30 shadow-sm z-10"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-[4px] right-4 w-[34px] h-[10px] rotate-[5deg] bg-white/50 border border-white/30 shadow-sm z-10"
            />
            {/* Card */}
            <div
              className={cn(
                'relative w-full flex flex-col justify-end rounded-lg overflow-hidden shadow-[0_3px_14px_rgba(0,0,0,0.1)]',
                HOBBY_ASPECTS[i],
              )}
            >
              {/* Color fill fallback */}
              <div
                className="absolute inset-0 z-[1]"
                style={{ background: `linear-gradient(160deg, ${hobby.color}cc, ${hobby.color})` }}
              />
              {/* Real photo */}
              {photo?.src && (
                <Image
                  src={photo.src}
                  alt={t(`life.hobby.${hobby.id}.label`)}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 33vw, 18vw"
                  className="object-cover z-[2]"
                  style={{ objectPosition: photo.position ?? 'center' }}
                />
              )}
              {/* Label overlay */}
              <div className="relative z-[4] p-2 lg:p-3 bg-gradient-to-t from-black/50 to-transparent">
                <p className="font-dm-mono text-xs lg:text-sm text-white font-medium">
                  {t(`life.hobby.${hobby.id}.label`)}
                </p>
                {/* <p className="mt-1 font-dm-mono text-xs  leading-3 text-white/60">
                  {t(`life.hobby.${hobby.id}.desc`)}
                </p> */}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Sticky nav ─────────────────────────────────────────────────────────────────

function LifeNav({
  activeSection,
  onScrollTo,
  items,
}: {
  activeSection: ActiveSection;
  onScrollTo: (key: ActiveSection) => void;
  items: { key: ActiveSection; num: string; label: string }[];
}) {
  return (
    <nav className="sticky top-8 hidden w-[152px] shrink-0 lg:block" aria-label="Life sections">
      {items.map((item) => {
        const isActive = item.key === activeSection;
        return (
          <button
            key={item.key}
            onClick={() => onScrollTo(item.key)}
            className={cn(
              'group relative flex w-full items-center gap-3 py-[15px] text-left transition-[padding] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
              isActive ? 'pl-4' : 'pl-0',
            )}
          >
            {/* Bookmark tab — sticky-green spine marker */}
            <span
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-sticky-yellow transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive ? 'h-[34px] w-[5px] opacity-100' : 'h-2 w-[5px] opacity-0',
              )}
              aria-hidden
            />
            <span
              className={cn(
                'font-dm-mono text-[0.58rem] tracking-[0.1em] transition-colors duration-300',
                isActive ? 'text-ink' : 'text-ink/[0.2] group-hover:text-ink/40',
              )}
            >
              {item.num}
            </span>
            <span
              className={cn(
                'font-dm-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300',
                isActive ? 'font-semibold text-ink' : 'text-ink/[0.3] group-hover:text-ink/55',
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

export function LifeSectionMasonry() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<ActiveSection>('sports');

  // Scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      const keys: ActiveSection[] = ['sports', 'reading', 'more'];
      let active: ActiveSection = 'sports';
      for (const key of keys) {
        const el = document.getElementById(SECTION_IDS[key]);
        if (el && el.offsetTop <= mid) active = key;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (key: ActiveSection) => {
    document
      .getElementById(SECTION_IDS[key])
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const NAV_ITEMS = [
    { key: 'sports' as ActiveSection, num: '01', label: t('life.nav.sports') },
    { key: 'reading' as ActiveSection, num: '02', label: t('life.nav.reading') },
    { key: 'more' as ActiveSection, num: '03', label: t('life.nav.more') },
  ];

  const REVEAL = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: EASE_SPRING },
  } as const;

  return (
    <div id="life">
      {/* Section header */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16 py-14 lg:py-20">
        <motion.div
          className="mb-3 flex flex-col items-center justify-center text-center font-caveat-hand text-2xl font-medium tracking-wider text-ink"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('life.kicker')}
          <HandwrittenUnderline />
        </motion.div>
        <PixelRevealHeading
          segments={[
            { text: t('life.title.prefix') + ' ', className: 'uppercase' },
            { text: t('life.title.em'), className: 'italic text-sticky-green uppercase' },
          ]}
        />
      </div>

      {/* Main layout: sticky nav + giant pegboard */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 lg:px-16 lg:pb-20 flex items-start">
        <LifeNav activeSection={activeSection} onScrollTo={scrollTo} items={NAV_ITEMS} />

        {/* Giant pegboard */}
        <div className="pegboard-bg flex-1 min-w-0 rounded-[18px] p-8">
          {/* ① Sports */}
          <motion.section id={SECTION_IDS.sports} {...REVEAL}>
            <BoardLabel>01 — {t('life.board.sports')}</BoardLabel>
            <SportsSection />
          </motion.section>

          {/* ② Reading */}
          <motion.section
            id={SECTION_IDS.reading}
            className="mt-12 pt-6 border-t-[1.5px] border-dashed border-ink/20"
            {...REVEAL}
          >
            <BoardLabel>02 — {t('life.board.reading')}</BoardLabel>
            <ReadingSection />
          </motion.section>

          {/* ③ More */}
          <motion.section
            id={SECTION_IDS.more}
            className="mt-12 pt-6 border-t-[1.5px] border-dashed border-ink/20"
            {...REVEAL}
          >
            <BoardLabel>03 — {t('life.board.more')}</BoardLabel>
            <MoreSection />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
