'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      if (!visible) setVisible(true);
    };

    const onEnter = (e: Event) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"]')) setHovered(true);
    };

    const onLeave = (e: Event) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"]')) setHovered(false);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [isTouch, visible]);

  if (isTouch === null || isTouch) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        'fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2',
        'rounded-none bg-white',
        'transition-[width,height] duration-100',
        visible ? 'opacity-100' : 'opacity-0',
        hovered ? 'w-7 h-7' : 'w-3 h-3',
      )}
      style={{ mixBlendMode: 'difference' }}
    />
  );
}
