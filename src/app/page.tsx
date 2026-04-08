import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Visual background elements that follow the scroll roughly */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[80vw] h-[2px] bg-primary/30 rotate-12 blur-sm" />
        <div className="absolute top-[40%] right-[10%] w-[50vw] h-[1px] bg-accent/30 -rotate-6 blur-sm" />
        <div className="absolute bottom-[20%] left-[20%] w-[60vw] h-[3px] bg-primary/20 rotate-45 blur-md" />
      </div>

      <HeroSection />
      
      <div className="relative">
        {/* Artistic Transition between Hero and About */}
        <div className="h-64 bg-gradient-to-b from-transparent to-secondary/10 w-full" />
        
        <AboutSection />
        
        <ProjectsSection />
        
        <div className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          {/* Espaço reservado para futuras implementações */}
          <div className="max-w-7xl mx-auto px-6 pt-20">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>
        </div>

        <ContactSection />
      </div>

      {/* Custom Scroll Indicator */}
      <div className="fixed bottom-10 right-10 z-50 mix-blend-difference hidden md:block">
        <div className="flex items-center gap-4 -rotate-90 origin-right">
          <span className="text-[10px] uppercase font-black tracking-widest">Keep Flowing</span>
          <div className="h-[2px] w-24 bg-white/20 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-full bg-primary animate-scroll-progress origin-left" />
          </div>
        </div>
      </div>
    </main>
  );
}
