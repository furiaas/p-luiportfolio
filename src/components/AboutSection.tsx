
"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function AboutSection() {
  const tiktokRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiktokRef.current) return;
    const rect = tiktokRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const angle = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    tiktokRef.current.style.setProperty('--mouse-x', `${x}%`);
    tiktokRef.current.style.setProperty('--mouse-angle', `${angle}deg`);
  };

  return (
    <section className="py-32 px-6 bg-secondary/10 relative overflow-hidden" id="about">
      {/* Decorative Text background */}
      <div className="absolute top-0 right-0 text-[15vw] font-black opacity-5 pointer-events-none -mr-20 leading-none">
        SOBRE
      </div>

      <div className="max-w-7xl auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative z-10 p-4 bg-primary/10 border border-primary/40 rotate-2 translate-x-4 translate-y-4">
             <Image 
              src="/images/about-me.png" 
              alt="Pedro Luigi Portrait" 
              width={600} 
              height={800}
              className="w-full grayscale filter brightness-90 hover:grayscale-0 transition-all duration-700"
              data-ai-hint="artistic portrait"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-accent/20 -rotate-3 -translate-x-4 -translate-y-4 -z-10" />
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.9] flex flex-col">
            <span>Produzir,</span>
            <span>editar,</span>
            <span className="text-primary">superar</span>
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            <p>
              Sou um <span className="text-foreground font-bold silver-shine-hover cursor-default">editor de vídeo</span> com foco em pós-produção audiovisual voltada para marketing e <span className="text-foreground font-bold">retenção de público</span> do nicho profissional.
            </p>
            <p>
              Acredito que a publicidade não deve ser previsível, mas inesperada ao transitar entre o ritmo acelerado nos 
              <span 
                ref={tiktokRef}
                onMouseMove={handleMouseMove}
                className="text-foreground font-bold tiktok-hover cursor-default mx-1"
              >
                vídeos curtos e humorísticos
              </span>, e a estética refinada dos 
              <span className="text-foreground font-bold vintage-hover cursor-default mx-1">
                visuais vintage
              </span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-10">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-primary">Specialties</h4>
              <ul className="text-sm font-medium space-y-2 uppercase">
                <li>/ Video Editing</li>
                <li>/ Post-Production</li>
                <li>/ Marketing Strategy</li>
                <li>/ Audience Retention</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-accent">Vibe</h4>
              <ul className="text-sm font-medium space-y-2 uppercase">
                <li>/ Aesthetic</li>
                <li>/ Professional</li>
                <li>/ Dynamic Editing</li>
                <li>/ Transparent Communication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
