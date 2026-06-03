'use client';

import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useRef } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { HandwrittenUnderline } from './HeroSection';
import { PixelRevealHeading } from './WorkShowcaseSection';
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

// ── Data ──────────────────────────────────────────────────────────────────────

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

// ── Infinite track driven by Framer Motion (no CSS animation) ─────────────────
// Using useMotionValue + useAnimationFrame avoids the CSS animation-duration
// jump bug on hover: speed changes are instant and position never resets.

interface TrackProps {
  images: StaticImageData[];
  title: string;
  /** Normal scroll speed in px/sec */
  pxPerSec?: number;
  /** Hover scroll speed in px/sec */
  hoverPxPerSec?: number;
  /** 'left' = right-to-left (default), 'right' = left-to-right */
  direction?: 'left' | 'right';
}

function InfiniteTrack({
  images,
  title,
  pxPerSec = 70,
  hoverPxPerSec = 35,
  direction = 'left',
}: TrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isHovered = useRef(false);
  const seeded = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!trackRef.current) return;
    const halfW = trackRef.current.scrollWidth / 2;
    if (halfW === 0) return;

    // Seed starting position once: right-to-left starts at 0,
    // left-to-right starts at -halfW so it can scroll toward 0
    if (!seeded.current) {
      if (direction === 'right') x.set(-halfW);
      seeded.current = true;
      return;
    }

    const speed = isHovered.current ? hoverPxPerSec : pxPerSec;
    const move = speed * (delta / 1000);

    if (direction === 'left') {
      const next = x.get() - move;
      x.set(next <= -halfW ? next + halfW : next);
    } else {
      const next = x.get() + move;
      x.set(next >= 0 ? next - halfW : next);
    }
  });

  // 4 copies so that halfW (= 2 copies) always exceeds viewport width.
  // The wrap logic uses scrollWidth/2, so the loop is seamless at the halfway point.
  const doubled = [...images, ...images, ...images, ...images];

  return (
    <div
      className="overflow-x-clip overflow-y-visible"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-3 md:gap-4">
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative h-[410px] w-[178px] shrink-0 overflow-hidden rounded-2xl bg-ink/[0.03] shadow-sm ring-1 ring-ink/[0.06] md:h-[546px] md:w-[237px]"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${(i % images.length) + 1}`}
              fill
              sizes="214px"
              className="object-cover object-top"
              placeholder="blur"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Strip (header + track) ────────────────────────────────────────────────────

interface LinkDef {
  href: string;
  label: string;
  primary?: boolean;
}

interface CarouselStripProps {
  title: string;
  tagline: string;
  taglineIcon?: string; // Material Symbols icon name
  description: string;
  logo?: StaticImageData;
  images: StaticImageData[];
  links?: LinkDef[];
  accent: string;
  pxPerSec?: number;
  hoverPxPerSec?: number;
  direction?: 'left' | 'right';
}

function CarouselStrip({
  title,
  tagline,
  taglineIcon,
  description,
  logo,
  images,
  links,
  accent,
  pxPerSec,
  hoverPxPerSec,
  direction,
}: CarouselStripProps) {
  return (
    <div className="space-y-7">
      {/* Header */}
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: [logo] [tagline + icon / title] + links below */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              {logo && (
                <div className="relative h-[65px] w-[65px] shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={logo}
                    alt={`${title} logo`}
                    fill
                    className="object-cover"
                    sizes="65px"
                  />
                </div>
              )}

              {/* Tagline row + title */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-dm-mono text-sm font-medium text-ink">{tagline}</span>
                  {taglineIcon && (
                    <span
                      className="material-symbols-outlined leading-none"
                      style={{
                        fontVariationSettings: "'FILL' 1, 'wght' 400",
                        fontSize: '14px',
                        color: accent,
                      }}
                    >
                      {taglineIcon}
                    </span>
                  )}
                </div>
                <motion.h3
                  className="font-dm-mono text-[1.75rem] font-black leading-tight text-ink md:text-[2.2rem]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  {title}
                </motion.h3>
              </div>
            </div>

            {links && links.length > 0 && (
              <div className="flex gap-2.5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                    style={{
                      borderColor: link.primary ? accent : 'rgba(35,36,32,0.12)',
                      color: link.primary ? accent : 'rgba(35,36,32,0.38)',
                    }}
                  >
                    {link.label}
                    {link.primary && (
                      <span
                        className="material-symbols-outlined leading-none"
                        style={{ fontVariationSettings: "'wght' 300", fontSize: '13px' }}
                      >
                        arrow_outward
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: description */}
          <motion.p
            className="max-w-[520px] font-dm-mono text-sm text-ink sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </Container>

      {/* Carousel — full bleed */}
      <InfiniteTrack
        images={images}
        title={title}
        pxPerSec={pxPerSec}
        hoverPxPerSec={hoverPxPerSec}
        direction={direction}
      />
    </div>
  );
}

// ── Section export ────────────────────────────────────────────────────────────

export function VibeCarouselSection() {
  const { t } = useI18n();
  return (
    <section id="vibe" className="space-y-16 overflow-hidden py-14 md:py-20">
      {/* Section header — same style as WorkShowcaseSection */}
      <Container className="pb-0 pt-0">
        <motion.div
          className="mb-3 flex flex-col items-center justify-center text-center font-caveat-hand text-2xl font-medium tracking-wider text-ink"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('vibe.kicker')}
          <HandwrittenUnderline />
        </motion.div>
        <PixelRevealHeading
          segments={[
            { text: t('vibe.title.word1') + ' ', className: 'uppercase' },
            { text: t('vibe.title.word2'), className: 'italic text-sticky-green uppercase' },
          ]}
        />
      </Container>

      <CarouselStrip
        title="Kana Jump"
        tagline="Japanese learning web app"
        description={t('vibe.card.kanajump.desc')}
        logo={kanaJump}
        images={KANA_JUMP_SHOTS}
        accent="#7FA2BF"
        direction="right"
        links={[
          { href: 'https://kana-jump.vercel.app/', label: 'Live', primary: true },
          { href: 'https://github.com/selin-ma/kana-jump', label: 'GitHub', primary: false },
        ]}
      />

      <CarouselStrip
        title="Pickle Vibe"
        tagline="Sports community app"
        description={t('vibe.card.picklevibe.desc')}
        images={PICKLE_VIBE_SHOTS}
        accent="#7C6FA0"
        direction="left"
      />
    </section>
  );
}
