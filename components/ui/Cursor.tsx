'use client';

import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        ring.current = { x: e.clientX - 16, y: e.clientY - 16 };
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
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

    // const handleInteractableEnter = () => {
    //   if (dotRef.current) dotRef.current.style.transform = 'scale(2.5)';
    //   if (ringRef.current) ringRef.current.style.transform = 'scale(1.8)';
    // };

    // const handleInteractableLeave = () => {
    //   if (dotRef.current) dotRef.current.style.transform = 'scale(1)';
    //   if (ringRef.current) ringRef.current.style.transform = 'scale(1)';
    // };

    document.addEventListener('mousemove', handleMouseMove);
    // document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
    //   el.addEventListener('mouseenter', handleInteractableEnter);
    //   el.addEventListener('mouseleave', handleInteractableLeave);
    // });

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
        style={{ opacity: 0 }}
        className="cursor-dot h-2 w-2 rounded-full bg-terra transition-transform duration-150"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="cursor-ring h-5 w-5 rounded-full border border-terra/60 transition-transform duration-200"
        aria-hidden="true"
      />
    </>
  );
}
