'use client';

import { useEffect, useRef, useState } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { SkillCategory } from '@/types';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [animatedNames, setAnimatedNames] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useI18n();

  const filtered =
    activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory);

  // Trigger bar animations when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            filtered.forEach((skill, i) => {
              setTimeout(() => {
                setAnimatedNames((prev) => new Set([...prev, skill.name]));
              }, i * 90);
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [filtered]);

  // Re-animate when category changes
  const handleCategoryChange = (category: SkillCategory) => {
    setActiveCategory(category);
    setAnimatedNames(new Set());
    const next = category === 'all' ? skills : skills.filter((s) => s.category === category);
    next.forEach((skill, i) => {
      setTimeout(
        () => {
          setAnimatedNames((prev) => new Set([...prev, skill.name]));
        },
        50 + i * 80,
      );
    });
  };

  // Category accent colors
  const categoryColor: Record<string, string> = {
    frontend: '#C4714B',
    engineering: '#6B8F71',
    soft: '#7A9DB5',
  };

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden bg-cream py-24">
      <div
        className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-gold/[0.055] blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal-section mb-14 text-center">
          <p className="mb-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-terra">
            {t('skills.kicker')}
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-light">
            {t('skills.title.prefix')} <em className="text-terra">{t('skills.title.em')}</em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="mb-12 flex justify-center gap-2">
          {(
            [
              { key: 'all', label: t('skills.tab.all') },
              { key: 'frontend', label: t('skills.tab.frontend') },
              { key: 'engineering', label: t('skills.tab.engineering') },
              { key: 'soft', label: '软实力' },
            ] as const satisfies ReadonlyArray<{ key: SkillCategory; label: string }>
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleCategoryChange(key)}
              className={cn(
                'rounded-full border px-5 py-2 font-body text-[0.78rem] tracking-[0.08em] transition-all duration-300',
                activeCategory === key
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/10 text-ink-light/55 hover:border-ink/25',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((skill, i) => {
            const accentColor = categoryColor[skill.category] ?? '#C4714B';
            return (
              <div
                key={skill.name}
                className="group rounded-2xl border border-ink/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                {/* Hover border glow using accent color */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${accentColor}55` }}
                  aria-hidden="true"
                />

                <div className="mb-3 flex items-start justify-between">
                  <span className="text-2xl" role="img" aria-label={skill.name}>
                    {skill.icon}
                  </span>
                  {/* Category dot + label */}
                  <span
                    className="mt-0.5 flex items-center gap-1 font-body text-[0.6rem] uppercase tracking-[0.12em]"
                    style={{ color: accentColor }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: accentColor }}
                      aria-hidden="true"
                    />
                    {skill.category === 'soft' ? '软实力' : skill.category}
                  </span>
                </div>

                <p className="mb-1 font-body text-[0.9rem] font-medium text-ink">{skill.name}</p>
                <p className="mb-4 font-body text-[0.75rem] leading-relaxed text-ink-light/55">
                  {skill.desc}
                </p>

                {/* Level bar — accent color per category */}
                <div className="mb-3 h-[2px] overflow-hidden rounded-full bg-ink/[0.08]">
                  <div
                    className="h-full origin-left rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
                      transform: animatedNames.has(skill.name)
                        ? `scaleX(${skill.level})`
                        : 'scaleX(0)',
                      transition: `transform 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${i * 80}ms`,
                    }}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {skill.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded px-2 py-0.5 font-body text-[0.65rem] text-ink-light/50"
                      style={{ background: `${accentColor}10` }}
                    >
                      {tag}
                    </span>
                  ))}
                  {skill.tags.length > 2 && (
                    <span className="font-body text-[0.65rem] text-ink/25">
                      +{skill.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
