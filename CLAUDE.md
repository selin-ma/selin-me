# CLAUDE.md — selin-me Portfolio

## Project Overview

Personal portfolio website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Deployed as a static export to GitHub Pages at `/selin-me`.

Bilingual (Chinese / English) via a custom context-based i18n system.

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 + custom CSS variables in `globals.css`
- **Animation**: Framer Motion
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` helper
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```
app/
  page.tsx              # Root page (English default)
  [locale]/page.tsx     # Localized pages (zh/en)
  layout.tsx            # Root layout with metadata & I18nProvider
  globals.css           # Global styles, CSS variables, cursor styles

components/
  section/              # Full-page section components
  ui/                   # Reusable UI (Nav, Cursor, Footer, LanguageSwitch…)
  i18n/
    I18nProvider.tsx    # Context + useI18n() hook

lib/
  data.ts               # ALL portfolio content lives here — edit content here, not in components
  i18n.ts               # Translation dictionaries (zh/en) + locale helpers
  utils.ts              # cn() for class merging, img() for basePath-aware image paths

types/
  index.ts              # TypeScript interfaces (WorkExperience, Skill, Book, VibeProject…)

public/
  images/               # Static assets (avatar, hobbies, sports photos)
```

## Key Conventions

### Component Patterns

- **Server Components by default** — only add `'use client'` when using hooks or event listeners
- **Named exports** for all components except `app/layout.tsx` and `app/page.tsx`
- **No default exports** in component files under `components/`

### Styling

- Use Tailwind utility classes; use `cn()` from `lib/utils.ts` for conditional class merging
- Color tokens: `cream`, `paper`, `ink`, `ink-light`, `terra`, `sage`, `dusty-blue`, `gold`
- Font families: `font-display` (Fraunces, serif) / `font-body` (Instrument Sans, sans-serif)
- Responsive: mobile-first, breakpoints `md:` and `lg:`
- Fluid type with `clamp()` for hero/display text

### Images

Always use the `img()` helper from `lib/utils.ts` for image paths — it prepends `/selin-me` in production to handle the GitHub Pages base path:

```ts
import { img } from '@/lib/utils';
<img src={img('/images/avatar.png')} />
```

### i18n

Access translations via `useI18n()` hook (client components only):

```ts
const { t, locale } = useI18n();
t('nav.about'); // looks up in lib/i18n.ts messages
```

All translation keys live in `lib/i18n.ts`.

### Animation (Framer Motion)

Standard pattern for scroll-reveal:

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
>
```

### Content Editing

**All portfolio data lives in `lib/data.ts`.** To update any section content (experience, skills, projects, books, sports), edit only that file.

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (static export to /out)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript check (no emit)
npm run format       # Prettier format all files
```

## Deployment & CI

Two GitHub Actions workflows:

| Workflow | File         | Trigger                                         | What it does                                                        |
| -------- | ------------ | ----------------------------------------------- | ------------------------------------------------------------------- |
| CI       | `deploy.yml` | push to `master`/`dev-redesign`, PR to `master` | ESLint → Prettier check → TypeScript                                |
| Deploy   | `nextjs.yml` | push to `master`                                | ESLint → Prettier check → TypeScript → Next.js build → GitHub Pages |

Checks run in this order before every deploy: **lint → format → type-check → build**. Any failure blocks deployment.

- `next.config.js` sets `output: 'export'` and `basePath: '/selin-me'` in production
- Images must use `img()` helper for correct path resolution

## Current Branch

Active redesign work is on `dev-redesign`. Merge to `master` triggers auto-deploy.

## TypeScript Interfaces

Key types in `types/index.ts`:

- `WorkExperience` — job entries with highlights and techStack
- `Skill` — with category (`frontend` | `engineering` | `soft`) and level
- `VibeProject` — AI-assisted side projects with status (`live` | `building` | `concept`)
- `Book` — reading list entries with Douban URL
- `SportsActivity` — sports achievements with photos

## Visual Design System — Personal Portfolio

### Design philosophy

Quiet confidence. The site should feel like a well-made book —
unhurried, precise, with one warm surprise. No gradients, no
noise textures, no glassmorphism. Every element earns its place.

### Color palette

--color-bg: #F0EFE9 /_ warm off-white, like aged paper _/
--color-ink: #232420 /_ near-black for all body text _/
--color-mist: #7FA2BF /_ misty blue — decoration only _/
--color-mist-lt: #B0C4D4 /_ lighter blue for labels, meta _/
--color-mist-bg: #D6E4EE /_ faint blue for surface tints _/
--color-amber: #FFBA3B /_ warm amber — CTA and accent ONLY _/
--color-amber-ink: #3D2A00 /_ text on amber backgrounds _/
--color-dark: #1C1C28 /_ footer / dark strip _/

### Color usage rules (strict)

- Misty blue (#7FA2BF) is DECORATIVE, never an action color.
  Use it for: large display text, section dividers, hover
  underlines, tag borders, monospace meta labels.
- Amber (#FFBA3B) appears SPARINGLY — one CTA button per
  section max. Never use it for text links or borders.
- All body copy: --color-ink on --color-bg. No colored text.
- Cards/surfaces: pure white (#FFFFFF) with a 0.5px border
  in --color-mist-bg. No shadows.

### Typography

- Display / hero heading: large serif or handwriting-style
  font, color --color-mist. Weight light. Letter-spacing -0.02em.
- Body: clean sans-serif, 16–18px, line-height 1.75,
  color --color-ink.
- Meta / annotations: monospace, 11–12px, uppercase,
  letter-spacing 0.08em, color --color-mist-lt.
  Used for: location, status, section numbers (01 —).
- Section labels: "01 — THE APPROACH" style, full caps,
  tracked out, separated by a hairline rule.

### Layout principles

- Generous whitespace. Sections breathe — min 6rem vertical gap.
- Left sidebar for monospace meta info (loc, status, mode).
- Content column offset to the right (~30% left margin on desktop).
- Footer: --color-dark strip, white/muted text, teal dot marker.
- No hero image. Typography IS the hero.

### Interaction feel

- Hover states: blue underline slides in (transform scaleX),
  not color change.
- Transitions: 200–300ms ease, no bounce, no spring on text.
- Buttons (amber CTA only): subtle scale(0.98) on active.
- Cursor: default — no custom cursors.

### Do not

- No gradients, blur, glow, or drop shadows.
- No hero images or background photos.
- No rounded buttons — use sharp or very slight radius (4px).
- No more than 2 accent colors visible at once on any screen.
- Never use amber for anything except CTA buttons and sport/
  activity section accents.
