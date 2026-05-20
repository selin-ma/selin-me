'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { useI18n } from '@/components/i18n/I18nProvider';
import { vibeProjects } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { VibeProject } from '@/types';

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: VibeProject['status'] }) {
  const { t } = useI18n();
  const label = {
    live: t('vibe.status.live'),
    building: t('vibe.status.building'),
    concept: t('vibe.status.concept'),
  }[status];

  const dotClass = { live: 'bg-sage', building: 'bg-terra', concept: 'bg-dusty-blue' }[status];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-0.5 font-body text-[0.6rem] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      {label}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, featured = false }: { project: VibeProject; featured?: boolean }) {
  const { t } = useI18n();

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg',
        featured && 'sm:col-span-2',
      )}
    >
      {/* ── Visual header ── */}
      <div className={cn('relative overflow-hidden', featured ? 'h-60' : 'h-44')}>
        {/* Background: real image OR gradient */}
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(145deg, ${project.color}d0 0%, ${project.color}80 60%, ${project.color}55 100%)`,
            }}
          />
        )}

        {/* Grid texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
          aria-hidden="true"
        />

        {/* Large watermark emoji — only when no image */}
        {!project.coverImage && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              className="select-none font-body transition-transform duration-700 group-hover:scale-110"
              style={{
                fontSize: featured ? '7rem' : '5rem',
                opacity: 0.18,
                lineHeight: 1,
              }}
            >
              {project.emoji}
            </span>
          </div>
        )}

        {/* Bottom gradient for text legibility */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: '70%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Status — top right */}
        <div className="absolute right-4 top-4">
          <StatusBadge status={project.status} />
        </div>

        {/* Name — bottom left */}
        <div className="absolute bottom-4 left-5 z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl drop-shadow" role="img" aria-label={project.name}>
              {project.emoji}
            </span>
            <h3 className="font-display text-[1.1rem] font-light italic leading-snug text-white drop-shadow">
              {project.name}
            </h3>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Story (featured) or short desc (regular) */}
        <p
          className={cn(
            'font-body text-[0.8rem] leading-[1.88] text-ink/52',
            !featured && 'line-clamp-3',
          )}
        >
          {featured ? project.story : project.desc}
        </p>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5">
          {project.aiTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border px-2.5 py-0.5 font-body text-[0.62rem] tracking-wide"
              style={{
                borderColor: `${project.color}45`,
                color: project.color,
                background: `${project.color}0d`,
              }}
            >
              {tool}
            </span>
          ))}
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ink/10 bg-ink/[0.035] px-2.5 py-0.5 font-body text-[0.62rem] tracking-wide text-ink/38"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-2 pt-0.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target={project.liveUrl.startsWith('/') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body text-[0.7rem] text-white transition-opacity duration-200 hover:opacity-80"
              style={{ background: project.color }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              {t('vibe.action.visit')}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 font-body text-[0.7rem] text-ink/50 transition-all duration-200 hover:border-ink/30 hover:text-ink"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
              {t('vibe.action.repo')}
            </a>
          )}
          {project.docsUrl && (
            <a
              href={project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 font-body text-[0.7rem] text-ink/50 transition-all duration-200 hover:border-ink/30 hover:text-ink"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              {t('vibe.action.docs')}
            </a>
          )}
          {!project.liveUrl && !project.repoUrl && !project.docsUrl && (
            <span className="font-body text-[0.7rem] italic text-ink/22">
              — {t('vibe.comingSoon')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VibeCodingSection() {
  const { t } = useI18n();

  return (
    <section id="vibe" className="relative overflow-hidden bg-cream py-24">
      <div
        className="pointer-events-none absolute left-0 top-24 h-80 w-80 rounded-full bg-terra/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-dusty-blue/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="reveal-section mb-14 text-center">
          <p className="mb-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-terra">
            {t('vibe.kicker')}
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-light">
            {t('vibe.title.prefix')} <em className="text-terra">{t('vibe.title.em')}</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[0.85rem] leading-[1.85] text-ink/45">
            {t('vibe.lede')}
          </p>
        </div>

        {/* Card grid — first card is featured (col-span-2 on sm+) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vibeProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
              className={cn('flex', i === 0 && 'sm:col-span-2')}
            >
              <ProjectCard project={project} featured={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
