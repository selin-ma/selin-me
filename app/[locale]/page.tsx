import { AboutSection } from '@/components/section/AboutSection';
import { HeroSection } from '@/components/section/HeroSection';
import { LifeSectionMasonry } from '@/components/section/LifeSectionMasonry';
import { VibeCarouselSection } from '@/components/section/VibeCarouselStrip';
import { WorkMethodSection } from '@/components/section/WorkMethodSection';
import { WorkShowcaseSection } from '@/components/section/WorkShowcaseSection';
import { Cursor } from '@/components/ui/Cursor';
import { PickleballCanvas } from '@/components/ui/PickleballCanvas';
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
      <PickleballCanvas />
      <Cursor />
      <Nav />
      <ScrollRevealInit />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkMethodSection />
        {/* <SkillsSection /> */}
        <WorkShowcaseSection />
        <VibeCarouselSection />
        {/* <LifeSection /> */}
        <LifeSectionMasonry />
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </>
  );
}
