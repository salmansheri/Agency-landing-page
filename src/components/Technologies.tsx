"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Code,
  Layers,
  Database,
  Terminal,
  Cpu,
  Fingerprint,
} from "lucide-react";
import { SplitTextReveal, FadeIn } from "./AnimateReveal";

const techCategories = [
  {
    title: "Frontend Engineering",
    icon: Code,
    color: "from-blue-500/10 to-indigo-500/10",
    glow: "rgba(99, 102, 241, 0.15)",
    items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    title: "Backend & Systems",
    icon: Database,
    color: "from-purple-500/10 to-pink-500/10",
    glow: "rgba(168, 85, 247, 0.15)",
    items: ["Go", "Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Terminal,
    color: "from-emerald-500/10 to-teal-500/10",
    glow: "rgba(16, 185, 129, 0.15)",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
];

export default function Technologies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger categories entrance
      const cards = containerRef.current?.querySelectorAll(".tech-card");
      if (!cards) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 relative bg-card/10 border-y border-border overflow-hidden w-full"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      
      {/* Glow ambient spots */}
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            Our Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <SplitTextReveal text="Next-Generation Tech" className="block text-foreground" />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <SplitTextReveal text="Architected for Scale." className="block" delay={0.2} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
            We use stable, high-performance programming languages and cloud infrastructures to guarantee sub-second updates and enterprise scaling.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="tech-card group p-8 rounded-2xl glass-card flex flex-col justify-between overflow-hidden cursor-pointer relative"
                style={
                  {
                    "--glow-color": category.glow,
                  } as React.CSSProperties
                }
              >
                {/* Glow Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:text-accent transition-colors duration-300">
                      <Icon size={18} className="stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  {/* Tech Items List */}
                  <div className="grid grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-3.5 rounded-xl border border-border bg-card/40 backdrop-blur-sm text-sm font-semibold text-foreground/80 hover:text-primary hover:border-primary/20 transition-all duration-300 text-center select-none"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aesthetic tech dot detail */}
                <div className="mt-8 flex items-center gap-2 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-ping" />
                  <span className="text-[10px] uppercase tracking-wider font-mono text-muted">
                    Verified Competency
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
