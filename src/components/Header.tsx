"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Sobre", href: "#about" },
    { name: "Trabalhos", href: "#projects" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-primary/20' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-black uppercase tracking-tighter group flex items-center gap-1">
          <span className="text-white group-hover:text-primary transition-colors">PEDRO</span>
          <span className="text-primary group-hover:text-white transition-colors">LUI</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-xs uppercase font-black tracking-[0.3em] hover:text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {navItems.map((item) => (
          <a 
            key={item.name}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-black uppercase italic tracking-tighter hover:text-primary transition-colors"
          >
            {item.name}
          </a>
        ))}
      </div>
    </header>
  );
}
