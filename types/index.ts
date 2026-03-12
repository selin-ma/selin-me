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
  title: string;
  author: string;
  color: string;
  category: string;
  year: number;
  note?: string;
  doubanUrl: string;
}

// ─── Sports / Life ────────────────────────────────────────────────────────────

export interface PhotoSlot {
  /** Label shown on placeholder, e.g. "上海站 · 2024" */
  label: string;
  /** Optional: actual image path once you add photos, e.g. "/photos/shanghai.jpg" */
  src?: string;
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
  icon: string;
  label: string;
  color: string;
  desc: string;
  photos?: { label: string; src: string }[];
}

export type LifeTab = 'reading' | 'sports' | 'more';
export type SkillCategory = 'all' | Skill['category'];
