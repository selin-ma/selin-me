'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { Container } from '@/components/ui/Container';
import { education, workExperiences } from '@/lib/data';

function CodeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8]);
  const transform = useMotionTemplate`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(-2deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative rounded-xl bg-white ring-1 ring-ink/[0.14] overflow-hidden"
      style={{ transformStyle: 'preserve-3d', transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BorderBeam size={100} duration={8} colorFrom="#c8f135" colorTo="#fde68a" borderWidth={2} />
      {/* macOS title bar */}
      <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-[#f6f8fa] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 font-dm-mono text-[0.63rem] text-ink/60">engineer.ts</span>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto [&::-webkit-scrollbar]:hidden px-6 py-5 font-dm-mono text-sm leading-[1.95] text-ink">
        <span style={{ color: '#d73a49' }}>{'const '}</span>
        <span style={{ color: '#6f42c1' }}>engineer</span>
        {' = '}
        {'{'}
        {'\n'}
        {'  '}
        <span style={{ color: '#0550ae' }}>stack</span>
        {': ['}
        <span style={{ color: '#0a3069' }}>{"'React'"}</span>
        {', '}
        <span style={{ color: '#0a3069' }}>{"'Next.js'"}</span>
        {', '}
        <span style={{ color: '#0a3069' }}>{"'TypeScript'"}</span>
        {', '}
        <span style={{ color: '#0a3069' }}>{"'Tailwind'"}</span>
        {'],\n'}
        {'  '}
        <span style={{ color: '#0550ae' }}>exp</span>
        {': '}
        <span style={{ color: '#0550ae' }}>5</span>
        <span style={{ color: '#6e7781' }}>{',  // years'}</span>
        {'\n'}
        {'  '}
        <span style={{ color: '#0550ae' }}>base</span>
        {': '}
        <span style={{ color: '#0a3069' }}>{"'Chengdu, China'"}</span>
        {',\n'}
        {'  '}
        <span style={{ color: '#0550ae' }}>timezone</span>
        {': '}
        <span style={{ color: '#0a3069' }}>{"'UTC+8 \u2194 APAC'"}</span>
        {',\n'}
        {'  '}
        <span style={{ color: '#0550ae' }}>available</span>
        {': '}
        <span style={{ color: '#d73a49' }}>true</span>
        <span style={{ color: '#6e7781' }}>{',  // hire me :)'}</span>
        {'\n'}
        {'};\n'}
        {'\n'}
        <span style={{ color: '#d73a49' }}>{'export default '}</span>
        <span style={{ color: '#6f42c1' }}>engineer</span>
        {';'}
      </pre>
    </motion.div>
  );
}

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative overflow-hidden md:py-12">
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
                <p className="mb-4 font-dm-mono text-sm font-medium uppercase tracking-[0.15em] text-ink italic">
                  / {t('about.kicker')}
                </p>
                <CodeCard />

                {/* Below card — Available left, name+role right */}
                <div className="mt-5 flex items-end justify-end">
                  {/* <div className="inline-flex items-center gap-2 rounded-full border border-olive/40 bg-olive/10 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
                    <span className="font-dm-mono text-[0.63rem] uppercase tracking-[0.12em] text-ink">
                      {t('about.available')}
                    </span>
                  </div> */}
                  <div className="text-right">
                    <p className="font-dm-mono text-[1.1rem] font-medium leading-tight text-ink">
                      {t('about.name')}
                    </p>
                    <p className="mt-0.5 font-dm-mono text-xs text-ink/60">
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
                <p className="mb-4 font-dm-mono text-sm font-medium uppercase tracking-[0.15em] text-ink italic">
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
                        <p className="flex-1 font-dm-mono text-sm text-ink">
                          {t(`about.role.${exp.id}`)}
                        </p>
                        <p className="w-36 flex-shrink-0 font-dm-mono text-xs text-ink/60">
                          {exp.company}
                        </p>
                        <p className="flex-shrink-0 font-dm-mono text-xs tabular-nums text-ink/60">
                          {exp.period.replace(' — ', '\u2009\u2192\u2009')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="h-px bg-ink/[0.08]" />
                </div>

                {/* Education — right col, own row below experience */}
                <div className="mt-8 pt-6">
                  <p className="mb-4 font-dm-mono text-sm font-medium uppercase tracking-[0.15em] text-ink italic">
                    / {t('about.label.education')}
                  </p>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-dm-mono text-sm text-ink">{t('about.school')}</p>
                    <p className="flex-shrink-0 font-dm-mono text-xs tabular-nums text-ink/60">
                      {education.period}
                    </p>
                  </div>
                  <p className="mt-2 font-dm-mono text-xs text-ink/60">
                    {t('about.degreeShort')} · {education.gpa}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Mobile ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col lg:hidden">
            <p className="mb-8 text-center font-dm-mono text-xs font-medium uppercase tracking-[0.15em] text-ink italic">
              / {t('about.kicker')}
            </p>

            <CodeCard />

            {/* Below card — Available left, name+role right */}
            <div className="mt-5 flex items-end justify-end">
              {/* <div className="inline-flex items-center gap-2 rounded-full border border-olive/40 bg-olive/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
                <span className="font-dm-mono text-[0.63rem] uppercase tracking-[0.12em] text-ink">
                  {t('about.available')}
                </span>
              </div> */}
              <div className="text-right">
                <p className="font-dm-mono text-sm leading-tight text-ink">{t('about.name')}</p>
                <p className="mt-0.5 font-dm-mono text-xs text-ink/60">{t('about.roleTitle')}</p>
              </div>
            </div>

            <p className="mt-8 font-dm-mono text-xs font-medium uppercase tracking-[0.15em] text-ink">
              / {t('about.label.experience')}
            </p>
            <div>
              {workExperiences.map((exp, i) => (
                <div key={exp.id}>
                  {i > 0 && <div className="h-px bg-ink/[0.08]" />}
                  <div className="flex items-center gap-4 py-5">
                    <div className="flex-1">
                      <p className="font-dm-mono text-xs font-medium text-ink">
                        {t(`about.role.${exp.id}`)}
                      </p>
                      <p className="mt-0.5 font-dm-mono text-xs text-ink/60">{exp.company}</p>
                    </div>
                    <p className="flex-shrink-0 font-dm-mono text-xs tabular-nums text-ink/60">
                      {exp.period.replace(' — ', '\u2009\u2192\u2009')}
                    </p>
                  </div>
                </div>
              ))}
              <div className="h-px bg-ink/[0.08]" />
            </div>

            <div className="mt-8">
              <p className="mb-3 font-dm-mono text-xs font-medium uppercase tracking-[0.15em] text-ink">
                / {t('about.label.education')}
              </p>
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-dm-mono text-xs font-medium text-ink/70">{t('about.school')}</p>
                <p className="flex-shrink-0 font-dm-mono text-xs tabular-nums text-ink/60">
                  {education.period}
                </p>
              </div>
              <p className="mt-2 font-dm-mono text-xs text-ink/60">
                {t('about.degreeShort')} · {education.gpa}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
