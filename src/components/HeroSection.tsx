"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Força o carregamento do novo arquivo de vídeo ao montar o componente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(error => {
          console.error("Erro ao reproduzir vídeo:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-12 animate-fade-in-up">
        <h1 
          className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-glitch perspective-text mb-4"
          data-text="Pedro Luigi"
        >
          Pedro Luigi
        </h1>
        <div className="h-1 w-32 bg-primary mx-auto mb-8" />
      </div>

      <div className="w-full max-w-5xl relative group animate-fade-in-up [animation-delay:200ms]">
        {/* Stylized Border Wrapper */}
        <div className="relative p-2 md:p-4 bg-white/5 border-2 border-primary/30 zine-shadow overflow-hidden">
          {/* Decorative Ripped Effect */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-primary z-20" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-accent z-20" />
          
          <div 
            className="aspect-video w-full bg-black relative overflow-hidden cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'grayscale-0 opacity-100' : 'grayscale opacity-40'}`}
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/videos/hero-reel.mp4`}
              loop
              playsInline
              preload="metadata"
            />
            
            {/* Overlay Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-6 bg-primary text-white font-black text-xl uppercase tracking-[0.2em] zine-shadow flex items-center gap-3 hover:scale-105 transition-transform">
                    <Play fill="currentColor" size={24} />
                    Play Showreel
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 animate-pulse">
                    Clique para Iniciar
                  </span>
                </div>
              </div>
            )}

            {/* Subtle Pause Icon on Hover when playing */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 z-10">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                  <Pause size={48} className="text-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Captions / Labels */}
        <div className="mt-8 flex justify-between items-end">
          <div className="text-left font-bold uppercase text-xs tracking-[0.3em] text-primary">
            Video Editor / Videomaker / Social Media
          </div>
          <div className="text-right text-muted-foreground text-xs italic">
            Powered by Persistência // Since 2007
          </div>
        </div>
      </div>
    </section>
  );
}
