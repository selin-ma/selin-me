# Portfolio — Next.js 14 + TypeScript

Personal portfolio website with book-flip experience, 3D bookshelf, and sports achievements.

## Tech Stack

- **Next.js 14** — App Router, static export
- **TypeScript** — strict mode
- **TailwindCSS** — utility-first CSS
- **ESLint** — Next.js + Airbnb-aligned rules
- **Prettier** — consistent formatting
- **GitHub Actions** — CI/CD auto-deploy
- **GitHub Pages** — free static hosting

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → /out
npm run type-check # TypeScript validation
npm run lint       # ESLint
npm run format     # Prettier
```

## Project Structure

```
/
├── app/
│   ├── globals.css       # Base styles, CSS variables, animations
│   ├── layout.tsx        # Root layout + metadata (Server Component)
│   └── page.tsx          # Home page (Server Component)
├── components/
│   ├── sections/         # Full-page sections (named exports)
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── LifeSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/               # Reusable UI (named exports)
│       ├── Cursor.tsx
│       ├── Nav.tsx
│       └── ScrollRevealInit.tsx
├── lib/
│   ├── data.ts           # All portfolio content ← edit this
│   └── utils.ts          # cn() helper
├── types/
│   └── index.ts          # All TypeScript interfaces
└── .github/
    └── workflows/
        └── deploy.yml    # Auto-deploy on push to main
```

## Editing Content

All content lives in **`lib/data.ts`**. No component changes needed for:
- Work experience, highlights, tech stack
- Skills and levels
- Bookshelf
- Sports achievements

## Deploying to GitHub Pages

1. Push to `main`
2. Go to repo **Settings → Pages → Source: GitHub Actions**
3. GitHub Actions builds and deploys automatically (~90 seconds)
4. Live at `https://<username>.github.io/<repo>/`

## Code Conventions

- Named exports everywhere (no default exports except `app/layout.tsx` and `app/page.tsx`)
- Server Components by default; `'use client'` only when hooks/events needed
- Import order enforced by ESLint: builtin → external → internal → relative
- All strings single-quoted, trailing commas, 100-char print width
