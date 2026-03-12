'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { bookshelf, otherHobbies, sportsActivities } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Book, LifeTab, OtherHobby, PhotoSlot } from '@/types';

// ─── Tab transition variants ──────────────────────────────────────────────────

const tabVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.26, ease: 'easeOut' } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.16, ease: 'easeIn' } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// READING TAB
// ═══════════════════════════════════════════════════════════════════════════════

function getCategories(books: Book[]): string[] {
  return ['全部', ...Array.from(new Set(books.map((b) => b.category)))];
}

function BookListItem({
  book,
  isActive,
  onClick,
}: {
  book: Book;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200',
        isActive ? 'bg-terra/10 text-terra' : 'text-ink/55 hover:bg-ink/5 hover:text-ink',
      )}
    >
      <span
        className="flex-shrink-0 rounded-full transition-all duration-300"
        style={{
          width: '3px',
          height: isActive ? '18px' : '8px',
          background: book.color,
          opacity: isActive ? 1 : 0.65,
        }}
        aria-hidden="true"
      />
      <span className="truncate font-body text-[0.78rem] leading-snug tracking-wide">
        {book.title}
      </span>
      {isActive && (
        <svg
          className="ml-auto flex-shrink-0 text-terra opacity-50"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

function BookDetail({ book }: { book: Book }) {
  return (
    <div className="flex h-full flex-col">
      <div
        className="relative mb-5 flex h-52 flex-shrink-0 items-end overflow-hidden rounded-2xl p-5"
        style={{
          background: `linear-gradient(145deg, ${book.color}ee 0%, ${book.color}99 55%, ${book.color}66 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38), transparent)' }}
          aria-hidden="true"
        />
        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 font-body text-[0.58rem] uppercase tracking-[0.14em] text-white/80"
          style={{ background: 'rgba(0,0,0,0.25)' }}
        >
          {book.category}
        </span>
        <div className="relative z-10">
          <p className="font-display text-[1.18rem] font-light italic leading-snug text-white">
            {book.title}
          </p>
          <p className="mt-1 font-body text-[0.7rem] text-white/60">{book.author}</p>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 font-body text-[0.63rem] font-medium tracking-wide"
          style={{ background: `${book.color}18`, color: book.color }}
        >
          {book.category}
        </span>
        <span className="font-body text-[0.66rem] text-ink/28">{book.year} 年读</span>
      </div>
      {book.note ? (
        <p
          className="flex-1 border-l-2 pl-4 font-body text-[0.82rem] italic leading-[1.92] text-ink/52"
          style={{ borderColor: `${book.color}48` }}
        >
          {book.note}
        </p>
      ) : (
        <p className="flex-1 font-body text-[0.78rem] italic text-ink/22">— 暂无笔记</p>
      )}
      <a
        href={book.doubanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center gap-2 self-start rounded-full border border-ink/10 px-4 py-2 font-body text-[0.7rem] text-ink/45 transition-all duration-200 hover:border-ink/28 hover:text-ink"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        在豆瓣查看
      </a>
    </div>
  );
}

function Bookshelf() {
  const { t } = useI18n();
  const categories = useMemo(() => getCategories(bookshelf), []);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedBook, setSelectedBook] = useState<Book>(bookshelf[0]);
  const [direction, setDirection] = useState(1);

  const filteredBooks = useMemo(
    () =>
      activeCategory === '全部'
        ? bookshelf
        : bookshelf.filter((b) => b.category === activeCategory),
    [activeCategory],
  );
  const currentIndex = filteredBooks.findIndex((b) => b.title === selectedBook.title);

  const handleSelect = (book: Book, nextIndex: number) => {
    if (book.title === selectedBook.title) return;
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setSelectedBook(book);
  };
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setDirection(1);
    setSelectedBook(
      cat === '全部' ? bookshelf[0] : (bookshelf.find((b) => b.category === cat) ?? bookshelf[0]),
    );
  };

  const bookVariants: Variants = {
    enter: (dir: number) => ({ y: dir * 28, opacity: 0 }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: 'spring', stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      y: dir * -28,
      opacity: 0,
      transition: { y: { duration: 0.16, ease: 'easeIn' }, opacity: { duration: 0.14 } },
    }),
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true">📖</span>
          <p className="font-display italic text-[1rem] text-ink/62">{t('life.reads.title')}</p>
        </div>
        <span className="font-body text-[0.63rem] text-ink/22">{bookshelf.length} 本</span>
      </div>
      <div className="flex flex-wrap gap-1.5 border-b border-ink/5 px-6 py-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={cn(
              'rounded-full border px-2.5 py-0.5 font-body text-[0.65rem] transition-all duration-200',
              activeCategory === cat
                ? 'border-ink bg-ink text-cream'
                : 'border-ink/10 text-ink/38 hover:border-ink/20 hover:text-ink/62',
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[170px_1fr]">
        <div className="relative border-b border-ink/5 p-3 md:border-b-0 md:border-r">
          <ul
            className="flex flex-col gap-0.5 overflow-y-auto pb-1 pr-2"
            style={{ maxHeight: '300px' }}
          >
            {filteredBooks.map((book, i) => (
              <li key={book.title}>
                <BookListItem
                  book={book}
                  isActive={selectedBook.title === book.title}
                  onClick={() => handleSelect(book, i)}
                />
              </li>
            ))}
          </ul>
          {/* Bottom fade hint */}
          <div
            className="pointer-events-none absolute bottom-9 left-0 right-0 h-7 bg-gradient-to-t from-white to-transparent"
            aria-hidden="true"
          />
          <div className="mt-3 flex justify-center gap-1" aria-hidden="true">
            {filteredBooks.map((book) => (
              <span
                key={book.title}
                className="rounded-full transition-all duration-300"
                style={{
                  width: selectedBook.title === book.title ? '14px' : '4px',
                  height: '3px',
                  background: selectedBook.title === book.title ? book.color : 'rgba(28,25,23,0.1)',
                }}
              />
            ))}
          </div>
        </div>
        <div className="overflow-hidden p-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedBook.title}
              custom={direction}
              variants={bookVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex h-full flex-col"
            >
              <BookDetail book={selectedBook} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPORTS TAB
// ═══════════════════════════════════════════════════════════════════════════════

function PhotoCard({ slot }: { slot: PhotoSlot }) {
  if (slot.src) {
    return (
      <div className="group relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={slot.src}
          alt={slot.label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2">
          <p className="font-body text-[0.62rem] text-white/80">{slot.label}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-square overflow-hidden rounded-xl border border-dashed border-ink/15 bg-ink/[0.02] transition-colors duration-200 hover:border-ink/25 hover:bg-ink/[0.04]">
      <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink/25"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <p className="text-center font-body text-[0.6rem] leading-snug text-ink/30">{slot.label}</p>
      </div>
    </div>
  );
}

function SportsPanel() {
  const activity = sportsActivities[0];
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/5 px-6 py-5">
        <div>
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden="true">
              {activity.icon}
            </span>
            <h3 className="font-display text-[1.3rem] font-light">{activity.name}</h3>
          </div>
          <p className="font-body text-[0.75rem] text-terra">{activity.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activity.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-terra/20 bg-terra/[0.07] px-2.5 py-0.5 font-body text-[0.62rem] text-terra/80"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="font-body text-[0.83rem] leading-[1.85] text-ink/55">{activity.desc}</p>
      </div>
      <div className="px-6 pb-6">
        <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.18em] text-ink/28">
          Photos
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {activity.photos.map((slot) => (
            <PhotoCard key={slot.label} slot={slot} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AND MORE TAB — flip cards
// ═══════════════════════════════════════════════════════════════════════════════

function FlipCard({ hobby }: { hobby: OtherHobby }) {
  const [flipped, setFlipped] = useState(false);
  const hasPhotos = hobby.photos && hobby.photos.length > 0;

  return (
    <div
      className="aspect-square cursor-pointer"
      style={{ perspective: '800px' }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${hobby.label} — 点击翻转`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f);
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.52s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        }}
      >
        {/* ── Front ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-full opacity-15"
            style={{ background: hobby.color }}
            aria-hidden="true"
          />
          <span className="text-4xl" role="img" aria-label={hobby.label}>
            {hobby.icon}
          </span>
          <p className="font-body text-[0.82rem] font-medium text-ink/70">{hobby.label}</p>
          {/* Photo indicator dots */}
          {hasPhotos && (
            <div className="absolute bottom-8 flex gap-1" aria-hidden="true">
              {hobby.photos!.map((_, i) => (
                <span
                  key={i}
                  className="h-1 w-1 rounded-full opacity-30"
                  style={{ background: hobby.color }}
                />
              ))}
            </div>
          )}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-25">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl shadow-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(145deg, ${hobby.color}ee 0%, ${hobby.color}99 60%, ${hobby.color}77 100%)`,
          }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-3/4"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38), transparent)' }}
            aria-hidden="true"
          />

          {hasPhotos ? (
            /* ── Photo grid back ── */
            <>
              <div className="relative z-10 grid grid-cols-3 gap-1 p-2">
                {hobby.photos!.map((p, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg bg-white/10"
                  >
                    {p.src ? (
                      <Image src={p.src} alt={p.label} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-white/40"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative z-10 mt-auto p-3">
                <p className="mb-0.5 font-display text-[0.88rem] font-light italic text-white">
                  {hobby.label}
                </p>
                <p className="font-body text-[0.65rem] leading-[1.65] text-white/70">
                  {hobby.desc}
                </p>
              </div>
            </>
          ) : (
            /* ── Text-only back ── */
            <>
              <span className="absolute right-4 top-4 text-2xl opacity-60" aria-hidden="true">
                {hobby.icon}
              </span>
              <div className="relative z-10 mt-auto p-4">
                <p className="mb-1 font-display text-[0.95rem] font-light italic text-white">
                  {hobby.label}
                </p>
                <p className="font-body text-[0.72rem] leading-[1.75] text-white/75">
                  {hobby.desc}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MorePanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-paper/60 shadow-sm">
      <div className="border-b border-ink/5 px-6 py-4">
        <p className="font-display italic text-[1rem] text-ink/62">And More</p>
        <p className="mt-0.5 font-body text-[0.68rem] text-ink/30">点击卡片翻转查看</p>
      </div>
      <div className="grid grid-cols-3 gap-3 p-6 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
        {otherHobbies.map((hobby) => (
          <FlipCard key={hobby.label} hobby={hobby} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIFE SECTION
// ═══════════════════════════════════════════════════════════════════════════════

export function LifeSection() {
  const [activeTab, setActiveTab] = useState<LifeTab>('reading');
  const { t } = useI18n();

  const tabs = [
    { key: 'reading' as LifeTab, emoji: '📚', label: t('life.tab.reading') },
    { key: 'sports' as LifeTab, emoji: '🎾', label: t('life.tab.sports') },
    { key: 'more' as LifeTab, emoji: '✨', label: 'And More' },
  ];

  return (
    <section id="life" className="relative overflow-hidden bg-paper py-24">
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-dusty-blue/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="reveal-section mb-14 text-center">
          <p className="mb-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-dusty-blue">
            {t('life.kicker')}
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-light">
            {t('life.title.prefix')} <em className="text-terra">{t('life.title.em')}</em>
          </h2>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center gap-2" role="tablist">
          {tabs.map(({ key, emoji, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => setActiveTab(key)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-5 py-2.5 font-body text-[0.78rem] tracking-wide transition-all duration-300',
                activeTab === key
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/10 text-ink-light/55 hover:border-ink/25',
              )}
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'reading' && (
            <motion.div
              key="reading"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              role="tabpanel"
            >
              <Bookshelf />
            </motion.div>
          )}
          {activeTab === 'sports' && (
            <motion.div
              key="sports"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              role="tabpanel"
            >
              <SportsPanel />
            </motion.div>
          )}
          {activeTab === 'more' && (
            <motion.div
              key="more"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              role="tabpanel"
            >
              <MorePanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
