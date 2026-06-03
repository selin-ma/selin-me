'use client';

import { useRef, type ComponentPropsWithoutRef, type FC, type ReactNode } from 'react';
import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface TextRevealProps extends ComponentPropsWithoutRef<'div'> {
  children: string;
  /** 0–1: scroll progress before any word starts revealing. Default 0.3 */
  startOffset?: number;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  startOffset = 0.3,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string');
  }

  const words = children.split(' ');

  return (
    <div ref={sectionRef} className={cn('relative z-0 h-[200vh]', className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[max(1rem,5vw)] py-20">
        <span className="flex flex-wrap font-dm-mono text-2xl font-normal leading-snug text-ink/20 md:text-3xl lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            const range = 1 - startOffset;
            const start = startOffset + (i / words.length) * range;
            const end = start + range / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 my-0.5 lg:mx-1.5">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="text-ink">
        {children}
      </motion.span>
    </span>
  );
};
