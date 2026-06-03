'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

import { useI18n } from '@/components/i18n/I18nProvider';
import { Container } from '@/components/ui/Container';

type CardConfig = {
  gatherX: number;
  gatherY: number;
  gatherRotate: number;
  spreadX: number;
  spreadY: number;
  spreadRotate: number;
  z: number;
  bg: string;
};

const CARD_CONFIGS: CardConfig[] = [
  {
    gatherX: 20,
    gatherY: 8,
    gatherRotate: -5,
    spreadX: -400,
    spreadY: -20,
    spreadRotate: -12,
    z: 5,
    bg: 'bg-sticky-yellow',
  },
  {
    gatherX: 0,
    gatherY: 0,
    gatherRotate: 2,
    spreadX: 0,
    spreadY: 0,
    spreadRotate: 1,
    z: 10,
    bg: 'bg-ink-light',
  },
  {
    gatherX: -20,
    gatherY: 12,
    gatherRotate: 6,
    spreadX: 400,
    spreadY: -10,
    spreadRotate: 13,
    z: 3,
    bg: 'bg-sticky-green',
  },
];

function MethodCard({
  number,
  title,
  body,
  config,
  progress,
}: {
  number: string;
  title: string;
  body: string;
  config: CardConfig;
  progress: MotionValue<number>;
}) {
  const x = useTransform(
    progress,
    [0, 0.15, 0.35, 1],
    [config.gatherX, config.gatherX, config.spreadX, config.spreadX],
  );
  const y = useTransform(
    progress,
    [0, 0.15, 0.35, 1],
    [config.gatherY, config.gatherY, config.spreadY, config.spreadY],
  );
  const rotate = useTransform(
    progress,
    [0, 0.15, 0.35, 1],
    [config.gatherRotate, config.gatherRotate, config.spreadRotate, config.spreadRotate],
  );

  return (
    <motion.div
      style={{ x, y, rotate, zIndex: config.z }}
      className={`absolute w-72 rounded-2xl ${config.bg} overflow-hidden p-7 ring-1 ring-ink/[0.06] md:w-80`}
    >
      <CardInner number={number} title={title} body={body} />
    </motion.div>
  );
}

function CardInner({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-4 font-dm-mono text-[6rem] font-bold leading-none text-ink/[0.05] select-none"
      >
        {number}
      </span>
      <h3 className="mt-4 font-dm-mono text-base font-medium leading-snug text-ink">{title}</h3>
      <p className="mt-3 font-body text-sm leading-[1.75] text-ink/60">{body}</p>
    </>
  );
}

export function WorkMethodSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const methods = Array.from({ length: 3 }, (_, i) => ({
    number: `0${i + 1}`,
    title: t(`workMethod.${i}.title`),
    body: t(`workMethod.${i}.body`),
  }));

  return (
    <section
      ref={ref}
      className="relative py-8 md:py-12 overflow-hidden"
      aria-labelledby="work-method-label"
    >
      <Container>
        <motion.p
          id="work-method-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-dm-mono text-sm font-medium uppercase tracking-[0.15em] text-ink italic"
        >
          / {t('workMethod.kicker')}
        </motion.p>

        {/* Mobile: flat vertical stack */}
        <div className="flex flex-col gap-5 md:hidden">
          {methods.map((m, i) => (
            <motion.div
              key={m.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full rounded-2xl ${CARD_CONFIGS[i].bg} overflow-hidden px-6 py-8 ring-1 ring-ink/[0.06]`}
            >
              <CardInner number={m.number} title={m.title} body={m.body} />
            </motion.div>
          ))}
        </div>

        {/* Tablet: horizontal flat row */}
        <div className="hidden md:flex lg:hidden flex-row gap-4 items-stretch">
          {methods.map((m, i) => (
            <motion.div
              key={m.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex-1 rounded-2xl ${CARD_CONFIGS[i].bg} overflow-hidden px-5 py-7 ring-1 ring-ink/[0.06]`}
            >
              <CardInner number={m.number} title={m.title} body={m.body} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: scroll-driven spread animation */}
        <div className="relative mx-auto hidden h-80 items-center justify-center lg:flex">
          {methods.map((m, i) => (
            <MethodCard key={m.number} {...m} config={CARD_CONFIGS[i]} progress={scrollYProgress} />
          ))}
        </div>
      </Container>
    </section>
  );
}
