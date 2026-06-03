'use client';

import { type ComponentPropsWithoutRef, type CSSProperties, type FC } from 'react';

import { cn } from '@/lib/utils';

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  style,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
          ...style,
        } as CSSProperties
      }
      className={cn(
        'mx-auto max-w-md text-transparent',
        // Shine effect
        'animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
        // Shine gradient — ink base with a lighter shiny band
        'bg-[linear-gradient(90deg,var(--color-ink)_0%,var(--color-ink)_40%,rgba(255,255,255,0.55)_50%,var(--color-ink)_60%,var(--color-ink)_100%)]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
