import React from "react";
import { Instagram, Github, Mail } from "lucide-react";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
    <path d="M11 11h.01" />
    <path d="M15 11h.01" />
    <path d="M7 11h.01" />
  </svg>
);

export function ContactSection() {
  const socialLinks = [
    { 
      Icon: Instagram, 
      href: "https://www.instagram.com/lui.editando/?utm_source=ig_web_button_share_sheet", 
      name: "Instagram" 
    },
    { 
      Icon: WhatsAppIcon, 
      href: "https://wa.link/i52gv7", 
      name: "WhatsApp" 
    },
    { 
      Icon: Github, 
      href: "#", 
      name: "Github" 
    },
  ];

  return (
    <section className="py-32 px-6 relative" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
              o <span className="animate-glow-subtle text-foreground drop-shadow-[0_0_20px_hsl(var(--primary)/1)]">futuro</span> é <span className="text-primary italic">seu</span>.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Disponível para colaborações experimentais, projetos de arte digital <span className="relative inline-block px-2 group cursor-help">
                <span className="relative z-10">e conversas indagantes</span>
                <svg 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-8 pointer-events-none z-20 opacity-90" 
                  viewBox="0 0 200 20" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M5,12 C30,8 60,15 100,10 C140,5 170,12 195,8" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="3.5" 
                    fill="none" 
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <path 
                    d="M10,14 C40,11 80,18 120,12 C160,6 185,13 192,10" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </span>.
            </p>

            <div className="space-y-6">
              <a href="mailto:p.luigimello@gmail.com" className="flex items-center gap-4 text-2xl font-bold hover:text-primary transition-colors group">
                <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/20 transition-colors">
                  <Mail size={24} />
                </div>
                p.luigimello@gmail.com
              </a>
              
              <div className="pt-4">
                <div className="flex gap-4 mb-3">
                  {socialLinks.map(({ Icon, href, name }, idx) => (
                    <a 
                      key={idx} 
                      href={href} 
                      target={href.startsWith('http') ? "_blank" : undefined}
                      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="p-4 bg-secondary/50 border border-border hover:border-primary hover:text-primary transition-all rounded-none"
                      aria-label={name}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/40 italic">
                  quer um contato mais direto?
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border-2 border-primary/20 p-8 md:p-12 relative">
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em]">
                Manifesto
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-[0.9]">
                2 Anos de <br /><span className="text-primary">Imersão Total.</span>
              </h3>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                <p>
                  Atuando há <span className="text-foreground font-bold italic">2 anos no mercado de pós-produção audiovisual</span>, transformando conceitos em experiências de alto impacto e retenção.
                </p>
                <p>
                  Destaque como estudante de <span className="text-foreground font-bold">Publicidade e Propaganda na UNIC</span> (Universidade de Cuiabá). Conquistei um marco único: fui o <span className="text-primary font-black">único da turma</span> a avançar para o segundo semestre dispondo de apenas <span className="italic underline">1/3 do tempo normal de estudo</span>.
                </p>
                <p className="text-foreground font-medium italic pt-4 border-t border-primary/20">
                  "Tudo isso graças à minha dedicação absoluta ao ofício."
                </p>
              </div>
            </div>
            
            <div className="absolute -top-3 -right-3 px-4 py-1 bg-accent text-white font-black text-[10px] uppercase tracking-widest rotate-6">
              QUALIDADE
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer minimal */}
      <footer className="mt-32 border-t border-white/5 pt-12 text-center text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
        Pedro Luigi // Built for the Pulse // © 2024
      </footer>
    </section>
  );
}
