'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { workShowcases } from '@/lib/data';
import type { WorkShowcase } from '@/types';

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
              className="object-cover object-top transition-[opacity,transform] duration-500 group-hover:scale-[1.03]"
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
      className="relative pt-12 lg:pt-24"
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
          className={`font-display text-7xl font-bold italic leading-none text-[#F0F0F0] ${
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
            className="font-display font-black leading-[1.05] text-ink"
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

// ── Section ────────────────────────────────────────────────────────────────
export function WorkShowcaseSection() {
  const { t, locale } = useI18n();
  const projects = workShowcases.slice(0, 3);
  const visitLabel = t('showcase.visit');

  return (
    <section id="showcase" className="relative bg-white">
      {/* ── Section header ─────────────────────────────────────────────── */}
      <Container className="pb-0 pt-14 md:pt-20">
        <motion.p
          className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-terra"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          / {t('showcase.kicker')}
        </motion.p>

        <motion.h2
          className="font-display font-black leading-tight text-ink"
          style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4rem)' }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('showcase.title.prefix')} <em className="text-terra">{t('showcase.title.em')}</em>
        </motion.h2>
      </Container>

      {/* ── Project rows ───────────────────────────────────────────────── */}
      <Container>
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
