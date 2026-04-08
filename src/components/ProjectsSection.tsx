"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  category: string;
  image?: string;
  video?: string;
  color: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Gran Duque",
    category: "Edição Profissional",
    video: "/videos/granduque.mp4", 
    color: "bg-primary",
    link: "https://www.instagram.com/granduque.barbearia/",
  },
  {
    title: "Pastordinoildo",
    category: "Correção de Cor",
    video: "/videos/pastordinoildo.mp4", 
    color: "bg-accent",
    link: "https://www.instagram.com/pastordinoildo/",
  },
  {
    title: "wanderley_costaoficial",
    category: "Pós-Produção Social",
    video: "/videos/wanderley_costaoficial.mp4", 
    color: "bg-primary",
    link: "https://www.instagram.com/wanderley_costaoficial/",
  },
  {
    title: "wesleycarvalho_b",
    category: "Audiovisual Dinâmico",
    video: "/videos/wesleycarvalho_b.mp4",
    color: "bg-accent",
    link: "https://www.instagram.com/wesleycarvalho_b/",
  }
];

function ProjectMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Força o recarregamento do vídeo quando o componente monta ou o caminho muda
  useEffect(() => {
    if (videoRef.current && project.video) {
      videoRef.current.load();
      videoRef.current.playbackRate = 1.0;
    }
  }, [project.video]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => {
        console.debug("Vídeo aguardando interação:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !hasEnded) {
      videoRef.current.pause();
    }
  };

  const handleEnded = () => {
    setHasEnded(true);
    
    // Tempo de congelamento de 0.7s
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }, 700); 
  };

  const isActive = isHovered && !hasEnded;

  if (project.video) {
    return (
      <div 
        className="relative w-full aspect-square overflow-hidden bg-neutral-900 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={project.video}
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className={cn(
            "w-full h-full object-cover transition-all duration-1000 ease-in-out",
            isActive 
              ? "grayscale-0 brightness-100 scale-105 opacity-100" 
              : "grayscale brightness-75 scale-100 opacity-80"
          )}
        />
        <div className={cn(
          "absolute inset-0 bg-background transition-opacity duration-700 pointer-events-none",
          hasEnded ? "opacity-30" : "opacity-0"
        )} />
        
        <div className={cn(
          "absolute top-4 right-4 transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-40"
        )}>
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden bg-secondary/20 group">
      <Image 
        src={project.image || ""} 
        alt={project.title} 
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100 group-hover:scale-105"
        data-ai-hint="project visual"
      />
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="py-32 px-6" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            Mais que edição:<br /><span className="text-primary italic">identidade.</span>
          </h2>
          <p className="max-w-sm text-muted-foreground uppercase text-xs tracking-widest font-bold">
            Uma coleção de projetos criados sob demanda, respeitando o estilo e a identidade visual de cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`group relative ${idx % 2 === 1 ? 'md:translate-y-24' : ''}`}
            >
              <div className="relative overflow-hidden zine-shadow transition-transform duration-500 bg-secondary/20">
                <ProjectMedia project={project} />
                <div className={`absolute bottom-0 left-0 p-6 ${project.color} text-white w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none`}>
                   <span className="text-xs uppercase font-black tracking-widest">{project.category}</span>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <h3 className="text-3xl font-black uppercase italic group-hover:text-primary transition-colors">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline decoration-primary decoration-2 underline-offset-4"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="h-0.5 flex-1 mx-4 bg-muted group-hover:bg-primary transition-all" />
                <span className="text-sm font-bold opacity-50">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
