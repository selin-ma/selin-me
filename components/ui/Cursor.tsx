'use client';

import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 5}px`;
        dotRef.current.style.top = `${e.clientY - 5}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x - 16) * 0.14;
      ring.current.y += (mouse.current.y - ring.current.y - 16) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleInteractableEnter = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(2.5)';
      if (ringRef.current) ringRef.current.style.transform = 'scale(1.8)';
    };

    const handleInteractableLeave = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleInteractableEnter);
      el.addEventListener('mouseleave', handleInteractableLeave);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot h-2.5 w-2.5 rounded-full bg-terra transition-transform duration-150"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring h-8 w-8 rounded-full border border-terra/50 transition-transform duration-200"
        aria-hidden="true"
      />
    </>
  );
}
