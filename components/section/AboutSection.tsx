'use client';

import { motion } from 'framer-motion';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { education, workExperiences } from '@/lib/data';

function CodeCard() {
  return (
    <div
      className="overflow-hidden rounded-[18px] bg-[#1e1e1e] shadow-[0_24px_64px_rgba(0,0,0,0.18)] ring-1 ring-white/[0.07]"
      style={{ transform: 'rotate(-2deg)' }}
    >
      {/* macOS title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-[#252526] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 font-mono text-[0.63rem] text-white/25">engineer.ts</span>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto [&::-webkit-scrollbar]:hidden px-6 py-5 font-mono text-[0.78rem] leading-[1.95] text-[#d4d4d4]">
        <span style={{ color: '#569cd6' }}>{'const '}</span>
        <span style={{ color: '#4fc1ff' }}>engineer</span>
        {' = '}
        {'{'}
        {'\n'}
        {'  '}
        <span style={{ color: '#9cdcfe' }}>stack</span>
        {': ['}
        <span style={{ color: '#ce9178' }}>{"'React'"}</span>
        {', '}
        <span style={{ color: '#ce9178' }}>{"'Next.js'"}</span>
        {', '}
        <span style={{ color: '#ce9178' }}>{"'TypeScript'"}</span>
        {', '}
        <span style={{ color: '#ce9178' }}>{"'Tailwind'"}</span>
        {'],\n'}
        {'  '}
        <span style={{ color: '#9cdcfe' }}>exp</span>
        {': '}
        <span style={{ color: '#b5cea8' }}>5</span>
        <span style={{ color: '#6a9955' }}>{',  // years'}</span>
        {'\n'}
        {'  '}
        <span style={{ color: '#9cdcfe' }}>base</span>
        {': '}
        <span style={{ color: '#ce9178' }}>{"'Chengdu, China'"}</span>
        {',\n'}
        {'  '}
        <span style={{ color: '#9cdcfe' }}>timezone</span>
        {': '}
        <span style={{ color: '#ce9178' }}>{"'UTC+8 \u2194 APAC'"}</span>
        {',\n'}
        {'  '}
        <span style={{ color: '#9cdcfe' }}>openTo</span>
        {': ['}
        <span style={{ color: '#ce9178' }}>{"'Remote'"}</span>
        {', '}
        <span style={{ color: '#ce9178' }}>{"'Hybrid'"}</span>
        {'],\n'}
        {'  '}
        <span style={{ color: '#9cdcfe' }}>available</span>
        {': '}
        <span style={{ color: '#569cd6' }}>true</span>
        <span style={{ color: '#6a9955' }}>{',  // hire me :)'}</span>
        {'\n'}
        {'};\n'}
        {'\n'}
        <span style={{ color: '#569cd6' }}>{'export default '}</span>
        <span style={{ color: '#4fc1ff' }}>engineer</span>
        {';'}
      </pre>
    </div>
  );
}

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative overflow-hidden bg-white py-8 md:py-20">
      <Container>
        <div className="relative">
          {/* ── Desktop ─────────────────────────────────────────────────────── */}
          <div className="hidden lg:block">
            {/* Two columns */}
            <div className="flex gap-20 xl:gap-28">
              {/* Left — label + code card + name/available row below */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="w-[42%] flex-shrink-0 xl:w-[40%]"
              >
                <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark italic">
                  / {t('about.kicker')}
                </p>
                <CodeCard />

                {/* Below card — Available left, name+role right */}
                <div className="mt-5 flex items-end justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-olive/40 bg-olive/10 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
                    <span className="font-body text-[0.63rem] uppercase tracking-[0.12em] text-olive-dark">
                      {t('about.available')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-[1.1rem] font-medium leading-tight text-ink">
                      Selin Ma
                    </p>
                    <p className="mt-0.5 font-body text-xs text-ink/60">
                      {t('about.roleTitle')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right — stats + bio + experience */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="flex flex-1 flex-col"
              >
                {/* Experience */}
                <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark italic">
                  / {t('about.label.experience')}
                </p>
                <div>
                  {workExperiences.map((exp, i) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 + i * 0.07,
                      }}
                    >
                      <div className="h-px bg-ink/[0.08]" />
                      <div className="flex items-center gap-5 py-5">
                        <p className="flex-1 font-display text-[0.92rem] font-medium text-ink">
                          {t(`about.role.${exp.id}`)}
                        </p>
                        <p className="w-36 flex-shrink-0 font-body text-[0.75rem] text-ink/50">
                          {exp.company}
                        </p>
                        <p className="flex-shrink-0 font-body text-[0.72rem] tabular-nums text-ink/28">
                          {exp.period.replace(' — ', '\u2009\u2192\u2009')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="h-px bg-ink/[0.08]" />
                </div>

                {/* Education — right col, own row below experience */}
                <div className="mt-8 pt-6">
                  <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark">
                    / {t('about.label.education')}
                  </p>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display text-[0.92rem] font-medium text-ink">
                      {t('about.school')}
                    </p>
                    <p className="flex-shrink-0 font-body text-xs text-ink/38">
                      {t('about.degree')}
                    </p>
                    <p className="flex-shrink-0 font-body text-[0.67rem] tabular-nums text-ink/22">
                      {education.period}
                    </p>
                  </div>
                  <p className="mt-1 font-body text-[0.67rem] tabular-nums text-ink/50">
                    {education.gpa}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Mobile ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col lg:hidden">
            <p className="mb-8 text-center font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark italic">
              / {t('about.kicker')}
            </p>

            <CodeCard />

            {/* Below card — Available left, name+role right */}
            <div className="mt-5 flex items-end justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-olive/40 bg-olive/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
                <span className="font-body text-[0.63rem] uppercase tracking-[0.12em] text-olive-dark">
                  {t('about.available')}
                </span>
              </div>
              <div className="text-right">
                <p className="font-display text-[1rem] font-medium leading-tight text-ink">
                  Selin Ma
                </p>
                <p className="mt-0.5 font-body text-[0.68rem] text-ink/60">
                  {t('about.roleTitle')}
                </p>
              </div>
            </div>

            <p className="mt-8 font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark">
              / {t('about.label.experience')}
            </p>
            <div>
              {workExperiences.map((exp, i) => (
                <div key={exp.id}>
                  {i > 0 && <div className="h-px bg-ink/[0.08]" />}
                  <div className="flex items-center gap-4 py-5">
                    <div className="flex-1">
                      <p className="font-display text-[0.88rem] font-medium text-ink">
                        {t(`about.role.${exp.id}`)}
                      </p>
                      <p className="mt-0.5 font-body text-[0.7rem] text-ink/50">{exp.company}</p>
                    </div>
                    <p className="flex-shrink-0 font-body text-[0.7rem] tabular-nums text-ink/28">
                      {exp.period.replace(' — ', '\u2009\u2192\u2009')}
                    </p>
                  </div>
                </div>
              ))}
              <div className="h-px bg-ink/[0.08]" />
            </div>

            <div className="mt-8">
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark">
                / {t('about.label.education')}
              </p>
              <p className="font-body text-[0.82rem] font-medium text-ink/70">
                {t('about.school')}
              </p>
              <p className="mt-0.5 font-body text-xs text-ink/38">{t('about.degree')}</p>
              <p className="mt-0.5 font-body text-[0.67rem] tabular-nums text-ink/22">
                {education.period}
              </p>
              <p className="mt-1 font-body text-[0.67rem] tabular-nums text-ink/50">
                {education.gpa}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
