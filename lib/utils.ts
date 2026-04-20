import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function img(path: string) {
  const base = process.env.GITHUB_ACTIONS === 'true' ? '/selin-me' : '';
  return `${base}${path}`;
}
