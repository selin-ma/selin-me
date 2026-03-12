import { ContactSection } from '@/components/section/ContactSection';
import { ExperienceSection } from '@/components/section/ExperienceSection';
import { HeroSection } from '@/components/section/HeroSection';
import { LifeSection } from '@/components/section/LifeSection';
import { SkillsSection } from '@/components/section/SkillsSection';
import { Cursor } from '@/components/ui/Cursor';
import { Footer } from '@/components/ui/Footer';
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
        <ExperienceSection />
        <SkillsSection />
        <LifeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

