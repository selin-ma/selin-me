import type { StaticImageData } from 'next/image';

export interface WorkExperience {
  id: string;
  tag: string;
  leftTitle: string;
  color: string;
  period: string;
  company: string;
  role: string;
  location: string;
  body: string;
  highlights: string[];
  techStack: string[];
  illustrationKey: 'architecture' | 'dataviz' | 'ecommerce' | 'beginning';
}

export interface Skill {
  icon: string;
  name: string;
  category: 'frontend' | 'engineering' | 'soft';
  level: number;
  desc: string;
  tags: string[];
}

export interface Book {
  id: string;
  color: string;
  coverUrl?: StaticImageData;
  year: number;
  doubanUrl: string;
}

// ─── Sports / Life ────────────────────────────────────────────────────────────

export interface PhotoSlot {
  /** i18n key for the label, e.g. "life.photo.kl1" */
  labelKey: string;
  src?: StaticImageData;
  position?: string;
}

export interface SportsActivity {
  id: string;
  /** Display name of the activity */
  name: string;
  icon: string;
  color: string;
  /** Short tagline under the name */
  tagline: string;
  /** Longer description paragraph */
  desc: string;
  /** Highlight badge texts, e.g. ["Twinkle Pickle", "beesoul签约球员"] */
  badges: string[];
  /** Photo grid slots — 0 = no photos, 1-6 = placeholders */
  photos: PhotoSlot[];
}

export interface OtherHobby {
  id: string;
  icon: string;
  color: string;
  photos?: { src: StaticImageData; position?: string }[];
}

export type LifeTab = 'reading' | 'sports' | 'more';
export type SkillCategory = 'all' | Skill['category'];

// ─── Vibe Projects ────────────────────────────────────────────────────────────

// ─── Work Showcase ───────────────────────────────────────────────────────────

export interface ShowcaseSlide {
  /** Short label shown on the dot, e.g. "AusPost", "CoverMore" */
  label?: string;
  coverImage?: StaticImageData;
  siteUrl?: string;
}

export interface WorkShowcase {
  id: string;
  /** Category label, e.g. "Web App", "Design System" */
  category: string;
  categoryZh: string;
  title: string;
  titleZh: string;
  /** 1-2 sentence description (English) */
  desc: string;
  descZh: string;
  /** Key tech, shown in lookbook metadata, e.g. ["Next.js", "TypeScript"] */
  tech?: string[];
  /** Single screenshot / hero image (used when slides is absent) */
  coverImage?: StaticImageData;
  siteUrl?: string;
  /** Multiple slides — each can have its own screenshot + link */
  slides?: ShowcaseSlide[];
}

export interface VibeProject {
  id: string;
  name: string;
  emoji: string;
  status: 'live' | 'building' | 'concept';
  color: string;
  coverImage?: StaticImageData;
  /** Full story shown on the featured (first) card */
  story: string;
  /** Short description shown on regular cards */
  desc: string;
  /** AI tools used to build this project */
  aiTools: string[];
  techStack?: string[];
  liveUrl?: string;
  repoUrl?: string;
  docsUrl?: string;
}
