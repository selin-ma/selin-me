'use client';

import { useRef, useEffect } from 'react';

const PICKLEBALL = [
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
];

const DOT = 3;
const GAP = 2;
const GRID = 9;
const CELL_W = (DOT + GAP) * GRID + 96;
const CELL_H = (DOT + GAP) * GRID + 96;
const FILL = 'rgba(0,0,0,0.045)';

function drawBalls(canvas: HTMLCanvasElement) {
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  if (W === 0 || H === 0) return;

  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = FILL;

  const cols = Math.ceil(W / CELL_W) + 2;
  const rows = Math.ceil(H / CELL_H) + 2;

  for (let row = 0; row < rows; row++) {
    const offsetX = row % 2 === 1 ? CELL_W * 0.5 : 0;
    for (let col = 0; col < cols; col++) {
      const bx = col * CELL_W + offsetX - CELL_W;
      const by = row * CELL_H - CELL_H;

      for (let gy = 0; gy < GRID; gy++) {
        for (let gx = 0; gx < GRID; gx++) {
          if (PICKLEBALL[gy][gx] === 1) {
            ctx.fillRect(
              Math.round(bx + gx * (DOT + GAP)),
              Math.round(by + gy * (DOT + GAP)),
              DOT,
              DOT,
            );
          }
        }
      }
    }
  }
}

export function PickleballCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => drawBalls(canvas);
    draw();

    const ro = new ResizeObserver(draw);
    ro.observe(document.documentElement);

    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}
