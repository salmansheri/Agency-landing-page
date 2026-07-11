"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "./AnimateReveal";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-choose-us" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Entrance animation for navbar items
  useGSAP(
    () => {
      gsap.fromTo(
        ".nav-anim-item",
        {
          y: -15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    },
    [] // Empty dependency array ensures it runs only once
  );

  // Animate Theme Switcher Toggle Click
  const animateThemeSwitch = () => {
    if (!toggleBtnRef.current) return;
    const targetTheme = resolvedTheme === "dark" ? "light" : "dark";
    
    // Tactile rotate/scale feedback animation using GSAP
    gsap.timeline()
      .to(toggleBtnRef.current, {
        scale: 0.9,
        rotate: targetTheme === "dark" ? 8 : -8,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          setTheme(targetTheme);
        },
      })
      .to(toggleBtnRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.4)",
      });
  };

  // Mobile Menu Animation
  useGSAP(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      // Open animation
      gsap.killTweensOf(menuRef.current);
      gsap.killTweensOf(".mobile-link");
      
      gsap.set(menuRef.current, { display: "flex", opacity: 0, xPercent: 100 });
      
      gsap.timeline()
        .to(menuRef.current, {
          opacity: 1,
          xPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(".mobile-link", {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.4,
          ease: "power3.out",
        }, "-=0.3");
    } else {
      // Close animation
      gsap.timeline()
        .to(menuRef.current, {
          opacity: 0,
          xPercent: 100,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(menuRef.current, { display: "none" });
          }
        });
    }
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const lenisInstance = (window as any).lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo(href);
        return;
      }
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 transition-all duration-300 w-full"
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md border-b border-border pointer-events-none" />
        
        {/* Logo */}
        <div 
          ref={logoRef}
          className="relative z-10 flex items-center gap-2 cursor-pointer font-bold tracking-widest text-xl font-mono text-foreground nav-anim-item"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">AE</span>
          <span>THER</span>
        </div>

        {/* Desktop Links */}
        <nav className="relative z-10 hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-2 hover:text-foreground transition-colors duration-200 cursor-pointer group nav-anim-item"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Nav Options */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Theme switcher */}
          <button
            ref={toggleBtnRef}
            onClick={animateThemeSwitch}
            className="w-[68px] h-9 rounded-full border border-border bg-card relative flex items-center justify-between px-2 cursor-pointer nav-anim-item select-none shadow-sm hover:border-primary/30 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Toggle Theme"
          >
            {/* Sliding thumb */}
            <div 
              className="absolute top-1 left-1 w-7 h-7 rounded-full bg-primary transition-transform duration-300 ease-out shadow-sm"
              style={{ transform: mounted && (theme === "dark" || resolvedTheme === "dark") ? "translateX(30px)" : "translateX(0)" }}
            />
            
            {/* Icons */}
            <Sun size={14} className={`relative z-10 w-4 h-4 transition-colors duration-300 ${mounted && !(theme === "dark" || resolvedTheme === "dark") ? "text-white" : "text-muted"}`} />
            <Moon size={14} className={`relative z-10 w-4 h-4 transition-colors duration-300 ${mounted && (theme === "dark" || resolvedTheme === "dark") ? "text-white" : "text-muted"}`} />
          </button>

          {/* Action Button */}
          <div className="hidden sm:block nav-anim-item">
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-primary/20"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
              >
                Let's Talk
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-border bg-card/50 backdrop-blur-sm md:hidden cursor-pointer hover:bg-card hover:border-primary/30 transition-all duration-300 text-foreground nav-anim-item"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center bg-background/95 backdrop-blur-lg px-6 py-24 md:hidden"
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="mobile-link text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className="mobile-link mt-4 px-8 py-3 rounded-full bg-primary text-white text-base font-medium shadow-lg shadow-primary/20"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
