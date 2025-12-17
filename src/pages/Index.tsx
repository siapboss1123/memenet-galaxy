import CustomCursor from '@/components/CustomCursor';
import GalaxyBackground from '@/components/GalaxyBackground';
import FloatingMemes from '@/components/FloatingMemes';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EcosystemSection from '@/components/EcosystemSection';
import RoadmapSection from '@/components/RoadmapSection';
import MemeGalaxySection from '@/components/MemeGalaxySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Background Effects */}
      <GalaxyBackground />
      
      {/* Floating Meme Icons */}
      <FloatingMemes />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EcosystemSection />
        <RoadmapSection />
        <MemeGalaxySection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
