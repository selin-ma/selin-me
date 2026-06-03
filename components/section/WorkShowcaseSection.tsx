'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { workShowcases } from '@/lib/data';
import type { WorkShowcase } from '@/types';
import { HandwrittenUnderline } from './HeroSection';

// ── Image / placeholder panel ─────────────────────────────────────────────
function ImagePanel({
  project,
  title,
  visitLabel,
}: {
  project: WorkShowcase;
  title: string;
  visitLabel: string;
}) {
  const slides =
    project.slides && project.slides.length > 0
      ? project.slides
      : [{ label: undefined, coverImage: project.coverImage, siteUrl: project.siteUrl }];

  const [active, setActive] = useState(0);
  const slide = slides[active];
  const hasMultiple = slides.length > 1;

  const inner = (
    <div className="group relative aspect-[580/325] w-full cursor-pointer overflow-hidden bg-[#EBEBEB]">
      {slides.every((s) => !s.coverImage) ? (
        <div className="flex h-full w-full items-center justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="text-[#D0D0D0] transition-opacity duration-300 group-hover:opacity-30"
            aria-hidden
          >
            <path
              d="M8 20a4 4 0 0 1 4-4h4l4-6h16l4 6h4a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V20Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      ) : (
        slides.map((s, i) =>
          s.coverImage ? (
            <Image
              key={i}
              src={s.coverImage}
              alt={title}
              fill
              priority={i === 0}
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-top"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ) : null,
        )
      )}
      {/* Hover overlay — visit site */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.18]">
        <span className="translate-y-2 scale-95 rounded-full bg-white px-8 py-3.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          {visitLabel}
        </span>
      </div>

      {/* Prev / Next — left & right sides */}
      {hasMultiple && (
        <>
          <button
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink/60 shadow transition-colors hover:bg-white hover:text-ink"
            onClick={(e) => {
              e.preventDefault();
              setActive((a) => (a - 1 + slides.length) % slides.length);
            }}
            aria-label="Previous"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M6.5 2L3.5 5l3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink/60 shadow transition-colors hover:bg-white hover:text-ink"
            onClick={(e) => {
              e.preventDefault();
              setActive((a) => (a + 1) % slides.length);
            }}
            aria-label="Next"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M3.5 2l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Bottom: label row + dots row */}
          <div
            className="absolute bottom-3 left-0 right-0 flex flex-col items-center gap-1.5"
            onClick={(e) => e.preventDefault()}
            onKeyDown={(e) => e.preventDefault()}
            role="presentation"
          >
            {/* Row 1 — active slide label */}
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/80">
              {slides[active].label ?? ''}
            </span>
            {/* Row 2 — dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(i);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return slide.siteUrl ? (
    <a href={slide.siteUrl} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

// ── Single project row ─────────────────────────────────────────────────────
function ProjectRow({
  project,
  index,
  locale,
  visitLabel,
}: {
  project: WorkShowcase;
  index: number;
  locale: string;
  visitLabel: string;
}) {
  const title = locale === 'zh' ? project.titleZh : project.title;
  const category = locale === 'zh' ? project.categoryZh : project.category;
  const desc = locale === 'zh' ? project.descZh : project.desc;
  const num = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 1; // alternate: odd rows flip image to right

  return (
    <motion.div
      className="relative pt-8 lg:pt-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {/*
        Odd  rows: [5rem  | 7fr | 5fr]  →  num | image | text
        Even rows: [5fr   | 7fr | 5rem] →  text | image | num
      */}
      <div
        className={`relative flex flex-col gap-8 lg:grid lg:items-center lg:gap-10 ${
          isEven ? 'lg:grid-cols-[5fr_7fr_5rem]' : 'lg:grid-cols-[5rem_7fr_5fr]'
        }`}
      >
        {/* Index number — first col odd, last col even */}
        <div
          className={`font-dm-mono text-7xl font-bold italic leading-none text-[#F0F0F0] ${
            isEven ? 'lg:order-3 lg:text-right' : 'lg:order-1'
          }`}
        >
          {num}
        </div>

        {/* Image — always middle col */}
        <div className="lg:order-2">
          <ImagePanel project={project} title={title} visitLabel={visitLabel} />
        </div>

        {/* Text content — last col odd, first col even */}
        <div
          className={`flex flex-col gap-5 ${
            isEven ? 'lg:order-1 lg:text-right lg:items-end lg:pr-6' : 'lg:order-3 lg:pl-2'
          }`}
        >
          {/* Category */}
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-terra">
            {category}
          </p>

          {/* Title */}
          <h3
            className="font-dm-mono font-black leading-[1.05] text-ink"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="font-body text-[0.88rem] leading-[1.8] text-ink/55 lg:text-[0.92rem]">
            {desc}
          </p>

          {/* Tech tags */}
          {project.tech && project.tech.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-end' : 'justify-start'}`}>
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="border border-ink/[0.15] px-3 py-1 font-mono text-[0.68rem] tracking-[0.04em] text-ink/40 transition-colors duration-200 hover:border-terra/60 hover:text-terra"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Pixel reveal heading (char-by-char, scroll-triggered) ─────────────────
export function PixelRevealHeading({
  segments,
}: {
  segments: { text: string; className?: string }[];
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { rootMargin: '-40px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered || !containerRef.current) return;
    const CHAR_DELAY = 45;
    const DURATION = 480;
    const EASE = 'cubic-bezier(0.34, 1.1, 0.64, 1)';
    const chars = containerRef.current.querySelectorAll<HTMLSpanElement>('.char-inner');
    chars.forEach((char, i) => {
      setTimeout(() => {
        char.style.transition = `transform ${DURATION}ms ${EASE}, opacity ${Math.round(DURATION * 0.4)}ms ease`;
        char.style.transform = 'translateY(0%)';
        char.style.opacity = '1';
      }, i * CHAR_DELAY);
    });
  }, [triggered]);

  return (
    <h2
      ref={containerRef}
      className="font-pixelify-sans font-black leading-tight text-ink text-center text-5xl lg:text-7xl"
    >
      {segments.map(({ text, className }, si) => (
        <span key={si} className={className}>
          {[...text].map((ch, ci) =>
            ch === ' ' ? (
              <span key={ci} className="inline-block w-[0.28em]" />
            ) : (
              <span
                key={ci}
                className="inline-block pb-[0.1em] pt-[0.25em] -mt-[0.25em] align-bottom"
                style={{ clipPath: 'inset(0 -0.5em 0 -0.5em)' }}
              >
                <span
                  className="char-inner inline-block"
                  style={{ transform: 'translateY(110%)', opacity: '0' }}
                >
                  {ch}
                </span>
              </span>
            ),
          )}
        </span>
      ))}
    </h2>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function WorkShowcaseSection() {
  const { t, locale } = useI18n();
  const projects = workShowcases.slice(0, 3);
  const visitLabel = t('showcase.visit');

  // ── Cards for sticky stack layout, derived from showcase data ──────────
  const tabStyleByIndex = [
    {
      bg: 'bg-sticky-green',
      textColor: 'text-ink',
      tabPos: 'left-0',
      tabShape: 'right-trapezoid' as const,
    },
    {
      bg: 'bg-dark',
      textColor: 'text-white',
      tabPos: 'left-70',
      tabShape: 'isosceles-trapezoid' as const,
    },
    {
      bg: 'bg-sticky-yellow',
      textColor: 'text-ink',
      tabPos: 'left-140',
      tabShape: 'isosceles-trapezoid' as const,
    },
  ];
  const showcaseCards = projects.map((project, idx) => {
    const title = locale === 'zh' ? project.titleZh : project.title;
    const label = (locale === 'zh' ? project.categoryZh : project.category).toUpperCase();
    const desc = locale === 'zh' ? project.descZh : project.desc;
    const tech = project.tech ?? [];
    const siteUrl = project.siteUrl ?? project.slides?.[0]?.siteUrl ?? '#';
    const coverImage = project.coverImage ?? project.slides?.[0]?.coverImage;
    return {
      id: project.id,
      ...tabStyleByIndex[idx],
      title,
      label,
      desc,
      tech,
      siteUrl,
      coverImage,
    };
  });

  return (
    <section id="showcase" className="relative overflow-x-clip">
      {/* ── Section header ─────────────────────────────────────────────── */}
      <Container className="pb-0 pt-14 md:pt-20">
        <motion.div
          className="mb-3 flex flex-col justify-center items-center font-caveat-hand text-2xl font-medium text-center tracking-wider text-ink"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('showcase.kicker')}
          <HandwrittenUnderline />
        </motion.div>

        <PixelRevealHeading
          segments={[
            { text: t('showcase.title.prefix'), className: 'uppercase' },
            {
              text: t('showcase.title.em'),
              className: 'block md:inline italic text-sticky-green uppercase',
            },
          ]}
        />
      </Container>

      {/* ── Sticky card stack layout ──────────────────────────── */}
      <div className="relative isolate">
        {/* spacer so cards begin at reasonable scroll position */}
        {/* <div className="h-[10vh] lg:block" /> */}

        {showcaseCards.map((card, _index) => {
          const clipPath =
            card.tabShape === 'right-trapezoid'
              ? 'polygon(0% 0%, 86% 0%, 100% 100%, 0% 100%)'
              : 'polygon(14% 0%, 86% 0%, 100% 100%, 0% 100%)';

          return (
            <section
              key={card.id}
              className={`lg:sticky lg:top-44 mx-auto w-full max-w-[1440px] px-6 lg:px-16 lg:h-[650px] ${card.textColor} mb-8 lg:mb-0 mt-15 lg:mt-34`}
            >
              {/* Outer wrapper that holds the folder tab + card body */}
              <div className="relative h-full pt-9 lg:pt-0">
                {/* Folder tab — mobile: absolute, 4px taller than pt-9 reserved space so it
                    overlaps the card body top edge and eliminates the sub-pixel seam */}
                <div
                  className={`flex lg:hidden absolute top-0 left-0 z-10 h-[40px] w-[200px] items-center gap-2 px-4 ${card.bg}`}
                  style={{ clipPath: 'polygon(0% 0%, 86% 0%, 100% 100%, 0% 100%)' }}
                >
                  <span className="material-symbols-outlined text-sm leading-none opacity-60">
                    code
                  </span>
                  <span className="font-dm-mono text-xs tracking-[0.2em] uppercase opacity-70 font-medium">
                    {t('showcase.project')} {_index === 0 ? '01' : _index === 1 ? '02' : '03'}
                  </span>
                </div>
                {/* Folder tab — desktop only (trapezoid shape, absolutely positioned) */}
                <div
                  className={`hidden lg:flex absolute -top-14 z-10 h-[calc(3.5rem+2px)] w-[280px] justify-center items-center gap-3 ${card.bg} ${card.tabPos}`}
                  style={{ clipPath }}
                >
                  <span className="material-symbols-outlined text-base leading-none opacity-70">
                    code
                  </span>
                  <span className="font-dm-mono text-sm tracking-[0.2em] uppercase opacity-85 font-medium">
                    {t('showcase.project')} {_index === 0 ? '01' : _index === 1 ? '02' : '03'}
                  </span>
                </div>
                {/* Card body — folder body */}
                <div className={`lg:h-full ${card.bg} overflow-hidden`}>
                  <div className="flex flex-col lg:flex-row lg:h-full gap-5 p-5 lg:p-8">
                    {/* Left — text content */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      {/* Top group — title + description + link */}
                      <div className="space-y-4">
                        {/* Title — top-left first line */}
                        <h3 className="font-dm-mono text-3xl md:text-4xl lg:text-6xl font-black leading-[0.95] tracking-tight">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="font-body text-sm leading-relaxed opacity-60 max-w-lg">
                          {card.desc}
                        </p>

                        {/* Live Website link */}
                        <a
                          href={card.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative py-2 inline-flex items-center gap-1.5 font-dm-mono text-sm uppercase opacity-50 hover:opacity-100 transition-opacity duration-200"
                        >
                          Live Website
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>
                            arrow_outward
                          </span>
                          <span className="absolute bottom-0.5 left-0 h-px w-full bg-current scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                        </a>
                      </div>

                      {/* Bottom — folder-tab shaped tech tags */}
                      <div className="flex flex-wrap gap-x-3 gap-y-4">
                        {card.tech.map((tag: string) => (
                          <div key={tag} className="relative pt-3">
                            {/* Folder tab — trapezoid, narrower than body */}
                            <div
                              className="absolute top-0 left-0 h-3 w-[58%] bg-current/[0.22]"
                              style={{ clipPath: 'polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
                            />
                            {/* Folder body */}
                            <div className="flex items-center px-3 h-8 bg-current/[0.13]">
                              <span className="font-dm-mono text-xs whitespace-nowrap opacity-70">
                                {tag}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right — project image */}
                    <div className="w-full aspect-[4/3] lg:w-auto lg:aspect-square lg:h-full border-2 border-white overflow-hidden group relative">
                      {(() => {
                        const imageContent = card.coverImage ? (
                          <motion.div
                            className="h-full w-full"
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                          >
                            <Image
                              src={card.coverImage}
                              alt={card.title}
                              className="h-full w-full object-cover object-top"
                            />
                          </motion.div>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/10">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              className="opacity-30"
                            >
                              <rect
                                x="6"
                                y="10"
                                width="36"
                                height="28"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <circle
                                cx="18"
                                cy="22"
                                r="4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M6 32l10-8 8 6 8-10 10 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        );

                        const overlay = (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.18]">
                            <span className="translate-y-2 scale-95 rounded-full bg-white px-8 py-3.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                              {visitLabel}
                            </span>
                          </div>
                        );

                        return card.siteUrl ? (
                          <a
                            href={card.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block h-full w-full"
                          >
                            {imageContent}
                            {overlay}
                          </a>
                        ) : (
                          <div className="relative h-full w-full">{imageContent}</div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* bottom spacer so last card scrolls out smoothly */}
        {/* <div className="hidden lg:block h-screen" /> */}
      </div>

      {/* ── Project rows (hidden) ────────────────────────────────── */}
      <Container className="hidden">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            locale={locale}
            visitLabel={visitLabel}
          />
        ))}
      </Container>
    </section>
  );
}
