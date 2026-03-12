import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function img(path: string) {
  const base = process.env.NODE_ENV === 'production' ? '/selin-me' : '';
  return `${base}${path}`;
}
