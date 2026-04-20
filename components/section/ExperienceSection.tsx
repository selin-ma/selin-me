'use client';

import { motion } from 'framer-motion';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { workExperiences } from '@/lib/data';

export function ExperienceSection() {
  const { t } = useI18n();

  return (
    <section id="experience" className="bg-warm-white py-8 md:py-20">
      <Container>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-sage">
            {t('experience.kicker')}
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-light">
            {t('experience.title.prefix')}{' '}
            <em className="text-terra">{t('experience.title.em')}</em>
          </h2>
        </motion.div>

        {/* Timeline list */}
        <div>
          {workExperiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <div className="h-px bg-ink/[0.07]" />

              <div className="group flex items-center gap-6 py-7 transition-colors duration-200 hover:bg-ink/[0.015] -mx-4 px-4 rounded-sm">
                {/* Index */}
                <span className="w-7 flex-shrink-0 font-body text-[0.72rem] tabular-nums tracking-[0.08em] text-ink/25">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Role */}
                <p className="flex-1 font-display text-[1.05rem] font-medium leading-snug text-ink">
                  {exp.role.split(' · ')[0]}
                </p>

                {/* Company */}
                <p className="hidden w-48 flex-shrink-0 font-body text-[0.85rem] text-ink-light/45 md:block">
                  {exp.company}
                </p>

                {/* Period — replace em dash with arrow */}
                <p className="flex-shrink-0 font-body text-[0.82rem] tabular-nums tracking-wide text-ink-light/35">
                  {exp.period.replace(' — ', '\u2009\u2192\u2009')}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Final divider */}
          <div className="h-px bg-ink/[0.07]" />
        </div>
      </Container>
    </section>
  );
}
