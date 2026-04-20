'use client';

import { cn } from '@/lib/utils';

export function PrimaryButton({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  const className = cn(
    'rounded-full bg-terra px-4 py-2 font-body text-[0.95rem] text-cream shadow-sm transition-colors duration-200 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/60'
  );

  if (href) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  const className = cn(
    'rounded-full border border-ink/10 px-4 py-2 font-body text-[0.95rem] text-ink transition-colors duration-200 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/30'
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
