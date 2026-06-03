'use client';

import { motion } from 'framer-motion';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';
import { HandwrittenUnderline } from './HeroSection';

const LEFT_PILLS = [
  { label: 'TypeScript', iconBg: '#3B82F6', rotate: '5deg', ml: 'ml-0' },
  { label: 'React', iconBg: '#F97316', rotate: '3deg', ml: 'ml-5' },
  { label: 'Storybook', iconBg: '#EC4899', rotate: '-4deg', ml: 'ml-0' },
];

const RIGHT_PILLS = [
  { label: 'Monorepo', iconBg: '#22C55E', rotate: '-6deg', mr: 'mr-2' },
  { label: 'Next.js', iconBg: '#1C1917', rotate: '-2deg', mr: 'mr-5' },
  { label: 'Tailwind', iconBg: '#06B6D4', rotate: '3deg', mr: 'mr-2' },
];

function Zap({ color }: { color: string }) {
  return (
    <span
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: color }}
      aria-hidden="true"
    >
      <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
        <path d="M6 1L1 7.5H5L4 12L9 5.5H5L6 1Z" fill="white" fillRule="evenodd" />
      </svg>
    </span>
  );
}

function Pill({
  label,
  iconBg,
  delay,
  rotate,
  extraClass,
}: {
  label: string;
  iconBg: string;
  delay: number;
  rotate: string;
  extraClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ rotate }}
      className={`flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5
        shadow-[0_6px_24px_rgba(28,25,23,0.10),0_1px_4px_rgba(28,25,23,0.06),inset_0_1px_0_rgba(255,255,255,1)]
        ${extraClass ?? ''}`}
    >
      <Zap color={iconBg} />
      <span className="whitespace-nowrap font-body text-[0.82rem] font-medium text-ink/70">
        {label}
      </span>
    </motion.div>
  );
}

export function SkillsSection() {
  const { t } = useI18n();
  const lines = [0, 1, 2].map((i) => t(`skills.line.${i}`));
  return (
    <section id="skills" className="overflow-hidden py-8 md:py-20">
      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <Container className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col justify-center items-center font-caveat-hand text-center text-2xl font-medium tracking-wider text-ink"
        >
          {t('skills.kicker')}
          <HandwrittenUnderline />
        </motion.div>
        <div className="grid grid-cols-[220px_1fr_220px] items-center gap-0">
          {/* Left pills */}
          <div className="flex flex-col items-start gap-12 pr-6">
            {LEFT_PILLS.map((p, i) => (
              <Pill
                key={p.label}
                label={p.label}
                iconBg={p.iconBg}
                delay={i * 0.1}
                rotate={p.rotate}
                extraClass={p.ml}
              />
            ))}
          </div>

          {/* Center — text fades from light to dark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="px-8 text-center xl:px-14"
          >
            <div className="flex flex-col items-center gap-2">
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ color: 'rgba(35,36,32,0.15)' }}
                  whileInView={{ color: 'rgba(35,36,32,1)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 2,
                    ease: 'easeOut',
                    delay: 0.3 + i * 0.25,
                  }}
                  className="block font-dm-mono"
                  style={{
                    fontSize: 'clamp(1.6rem, 2.8vw, 3rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    fontWeight: 400,
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right pills */}
          <div className="flex flex-col items-end gap-12 pl-6">
            {RIGHT_PILLS.map((p, i) => (
              <Pill
                key={p.label}
                label={p.label}
                iconBg={p.iconBg}
                delay={0.1 + i * 0.1}
                rotate={p.rotate}
                extraClass={p.mr}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* ── Mobile ────────────────────────────────────────────────────────── */}
      <Container className="lg:hidden">
        <p className="mb-5 text-center font-body text-xs font-medium uppercase tracking-[0.15em] text-olive-dark italic">
          / {t('skills.kicker')}
        </p>
        <div className="flex flex-col items-center text-center">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ color: 'rgba(35,36,32,0.15)' }}
              whileInView={{ color: 'rgba(35,36,32,1)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 2,
                ease: 'easeOut',
                delay: 0.2 + i * 0.25,
              }}
              className={`block font-dm-mono${i > 0 ? ' mt-1' : ''}`}
              style={{
                fontSize: 'clamp(1.4rem, 6vw, 2.2rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              {line}
            </motion.span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[...LEFT_PILLS, ...RIGHT_PILLS].map((p, i) => (
            <Pill key={p.label} label={p.label} iconBg={p.iconBg} delay={i * 0.06} rotate="0deg" />
          ))}
        </div>
      </Container>
    </section>
  );
}
