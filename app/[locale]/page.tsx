import { AboutSection } from '@/components/section/AboutSection';
import { ContactSection } from '@/components/section/ContactSection';
import { HeroSection } from '@/components/section/HeroSection';
import { LifeSection } from '@/components/section/LifeSection';
import { SkillsSection } from '@/components/section/SkillsSection';
import { VibeProjectSection } from '@/components/section/VibeProjectSection';
import { WorkShowcaseSection } from '@/components/section/WorkShowcaseSection';
import { Cursor } from '@/components/ui/Cursor';
import { Nav } from '@/components/ui/Nav';
import { ScrollRevealInit } from '@/components/ui/ScrollRevealInit';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <ScrollRevealInit />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkShowcaseSection />
        <VibeProjectSection />
        <LifeSection />
        <ContactSection />
      </main>
      <footer className="border-t border-cream/5 bg-ink py-5 text-center font-body text-[0.65rem] uppercase tracking-[0.15em] text-cream/20">
        Vibe coding with Claude · Deployed on GitHub Pages · © {new Date().getFullYear()}
      </footer>
    </>
  );
}
