"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Code2, Sparkles, Terminal } from "lucide-react";
import { SplitTextReveal, SplitWordReveal, FadeIn, Magnetic } from "./AnimateReveal";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  
  // Parallax elements
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Mouse Parallax effect using GSAP
  useGSAP(
    () => {
      const container = heroRef.current;
      if (!container) return;

      const card1X = gsap.quickTo(card1Ref.current, "x", { duration: 0.8, ease: "power2.out" });
      const card1Y = gsap.quickTo(card1Ref.current, "y", { duration: 0.8, ease: "power2.out" });
      
      const card2X = gsap.quickTo(card2Ref.current, "x", { duration: 0.8, ease: "power2.out" });
      const card2Y = gsap.quickTo(card2Ref.current, "y", { duration: 0.8, ease: "power2.out" });

      const card3X = gsap.quickTo(card3Ref.current, "x", { duration: 0.8, ease: "power2.out" });
      const card3Y = gsap.quickTo(card3Ref.current, "y", { duration: 0.8, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Normalize mouse coordinates from -0.5 to 0.5
        const normX = (clientX / innerWidth) - 0.5;
        const normY = (clientY / innerHeight) - 0.5;

        // Apply distinct displacements for parallax depth
        card1X(normX * 45);
        card1Y(normY * 45);

        card2X(normX * -30);
        card2Y(normY * -30);

        card3X(normX * 60);
        card3Y(normY * -40);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: heroRef }
  );

  const handleScrollToServices = () => {
    if (typeof window !== "undefined") {
      const lenisInstance = (window as any).lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo("#services");
        return;
      }
    }
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 md:px-12 md:pt-40 overflow-hidden"
    >
      {/* Background Grid & Blobs */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50 dark:opacity-30" />
      
      {/* Ambient Glow Blobs */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/20 dark:bg-primary/10 blur-[100px] animate-blob-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/25 dark:bg-accent/15 blur-[120px] animate-blob-medium pointer-events-none" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Hero Copy (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8 z-10 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border glass-panel text-xs md:text-sm font-medium text-primary">
            <Sparkles size={14} className="animate-pulse" />
            <span>Award-Winning Development Agency</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            <SplitWordReveal text="Bespoke Systems" className="block text-foreground" delay={0.05} />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] text-transparent bg-clip-text animate-pulse block mt-2">
              <SplitWordReveal text="Crafted to Inspire." className="block" delay={0.2} />
            </span>
          </h1>

          {/* Subheading */}
          <div className="text-lg md:text-xl text-muted font-light leading-relaxed max-w-xl">
            <SplitWordReveal
              text="We design and build bespoke custom software, web applications, and immersive digital platforms. Exceptional code execution meets premium design."
              delay={0.35}
            />
          </div>

          {/* Actions */}
          <FadeIn className="flex flex-wrap items-center gap-4 mt-2" delay={0.5} y={15}>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary/95 text-white font-semibold shadow-lg shadow-primary/20 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Let's partner
                <Code2 size={16} />
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-full border border-border hover:border-primary/40 bg-card/40 hover:bg-card/75 backdrop-blur-sm text-foreground font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Our work
              </a>
            </Magnetic>
          </FadeIn>
        </div>

        {/* Hero Interactive Visual (5 Cols) */}
        <div ref={visualRef} className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] flex items-center justify-center z-10">
          {/* Card 1: Interactive Dev Editor (The Layer Back) */}
          <div
            ref={card2Ref}
            className="absolute top-4 left-4 w-[280px] sm:w-[350px] p-6 rounded-2xl glass-panel shadow-premium select-none transform-gpu"
          >
            <div className="flex items-center gap-1.5 border-b border-border pb-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-muted font-mono ml-2 flex items-center gap-1">
                <Terminal size={10} />
                AetherSystem.ts
              </span>
            </div>
            <pre className="text-[10px] sm:text-xs font-mono text-muted overflow-hidden text-left leading-relaxed">
              <code>
                <span className="text-primary">const</span>{" "}
                <span className="text-accent">agency</span> = {"{"}
                <br />
                {"  "}design: <span className="text-emerald-500">"Apple-Level"</span>,
                <br />
                {"  "}engineering: <span className="text-emerald-500">"Linear-Grade"</span>,
                <br />
                {"  "}experience: <span className="text-emerald-500">"Cinematic"</span>,
                <br />
                {"  "}performance: <span className="text-amber-500">"99+"</span>
                <br />
                {"}"};
                <br />
                <br />
                <span className="text-blue-500">export default</span>{" "}
                <span className="text-accent">agency</span>;
              </code>
            </pre>
          </div>

          {/* Card 2: Interactive Statistics Card (The Focal Element) */}
          <div
            ref={card1Ref}
            className="absolute z-20 w-[240px] sm:w-[300px] p-6 rounded-2xl glass-panel border-primary/20 shadow-premium flex flex-col items-start gap-4 select-none transform-gpu"
          >
            <span className="bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
              Lighthouse Performance
            </span>
            <div className="flex items-baseline gap-1 text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <span>99</span>
              <span className="text-lg text-muted">%</span>
            </div>
            <p className="text-xs text-muted leading-normal text-left">
              Bespoke architecture delivering sub-second load times and flawless layout stability.
            </p>
          </div>

          {/* Card 3: Floating badge/tech cards */}
          <div
            ref={card3Ref}
            className="absolute bottom-6 right-6 z-30 px-5 py-3 rounded-full glass-panel shadow-premium flex items-center gap-3 select-none transform-gpu"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-medium text-foreground">Systems Active</span>
          </div>
        </div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <button
          onClick={handleScrollToServices}
          className="p-3 rounded-full border border-border bg-card/30 hover:border-primary/30 hover:bg-card cursor-pointer transition-all duration-300 flex items-center justify-center animate-bounce text-foreground"
          aria-label="Scroll Down"
        >
          <ArrowDown size={16} />
        </button>
      </div>
    </section>
  );
}
