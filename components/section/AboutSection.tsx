'use client';

import { motion } from 'framer-motion';

import { aboutStats, education, personalTags } from '@/lib/data';

// ─── Avatar placeholder ───────────────────────────────────────────────────────

function Avatar() {
  return (
    <div className="relative mx-auto h-24 w-24 flex-shrink-0">
      <div className="absolute inset-0 rounded-full border-2 border-terra/30" />
      <div className="absolute inset-[3px] overflow-hidden rounded-full">
        <img
          src="../../static/images/avatar.png"
          alt="Ma Yudi"
          className="h-full w-full object-cover"
        />
      </div>
      <span
        className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-sage"
        aria-hidden="true"
      />
    </div>
  );
}
// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-display text-[1.6rem] font-light text-ink">{number}</span>
      <span className="font-body text-[0.62rem] uppercase tracking-[0.15em] text-ink/35">
        {label}
      </span>
    </div>
  );
}

// ─── Personal tag row ─────────────────────────────────────────────────────────

function TagRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-[1px] flex h-5 w-5 flex-shrink-0 items-center justify-center text-[0.85rem]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="font-body text-[0.82rem] leading-snug text-ink/60">{text}</span>
    </div>
  );
}

// ─── Education block ──────────────────────────────────────────────────────────

function EducationBlock() {
  return (
    <div className="mt-6 border-t border-ink/6 pt-5">
      <p className="mb-3 font-body text-[0.62rem] uppercase tracking-[0.2em] text-ink/28">
        Education
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* School icon */}
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-gold"
              aria-hidden="true"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <p className="font-body text-[0.8rem] font-medium text-ink/75">{education.school}</p>
            <p className="font-body text-[0.68rem] text-ink/38">{education.degree}</p>
          </div>
        </div>
        <span className="flex-shrink-0 font-body text-[0.68rem] text-ink/28">
          {education.period}
        </span>
      </div>
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <section id="about" className="bg-cream py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section kicker */}
        <motion.div
          className="reveal-section mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="font-body text-[0.7rem] uppercase tracking-[0.3em] text-dusty-blue">
            About Me
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
        >
          {/* ── Top: avatar + stats ── */}
          <div className="flex items-center justify-between gap-5 border-b border-ink/5 px-8 py-7">
            <div className="flex items-center gap-5">
              <Avatar />
              <div>
                <p className="font-display text-[1.15rem] font-light text-ink">
                  Selin
                  {/* <span className="ml-2 font-body text-[0.85rem] font-normal text-ink/35">
                    Selin
                  </span> */}
                </p>
                <p className="mt-0.5 font-body text-[0.72rem] text-terra">Frontend Engineer</p>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden items-center gap-6 sm:flex">
              <div className="h-8 w-px bg-ink/6" aria-hidden="true" />
              {aboutStats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  <StatCard number={s.number} label={s.label} />
                  {i < aboutStats.length - 1 && (
                    <div className="h-8 w-px bg-ink/6" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Middle: tag rows ── */}
          <div className="space-y-3.5 px-8 py-6">
            {personalTags.map((tag) => (
              <TagRow key={tag.text} icon={tag.icon} text={tag.text} />
            ))}
          </div>

          {/* ── Bottom: education ── */}
          <div className="px-8 pb-7">
            <EducationBlock />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
