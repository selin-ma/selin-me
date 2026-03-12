import { AboutSection } from '@/components/section/AboutSection';
import { ContactSection } from '@/components/section/ContactSection';
import { ExperienceSection } from '@/components/section/ExperienceSection';
import { HeroSection } from '@/components/section/HeroSection';
import { LifeSection } from '@/components/section/LifeSection';
import { SkillsSection } from '@/components/section/SkillsSection';
import { Cursor } from '@/components/ui/Cursor';
import { Nav } from '@/components/ui/Nav';
import { ScrollRevealInit } from '@/components/ui/ScrollRevealInit';

export default function HomePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <ScrollRevealInit />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <LifeSection />
        <ContactSection />
      </main>
      <footer className="border-t border-cream/5 bg-ink py-5 text-center font-body text-[0.65rem] uppercase tracking-[0.15em] text-cream/20">
        Vibe coding with Claude · Deployed on GitHub Pages · © {new Date().getFullYear()}
      </footer>
    </>
  );
}
