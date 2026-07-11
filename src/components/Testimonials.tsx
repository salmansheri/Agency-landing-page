"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Quote } from "lucide-react";
import { SplitTextReveal, FadeIn } from "./AnimateReveal";

const testimonials = [
  {
    quote: "AETHER transformed our mobile store architecture. The sub-second configurator they engineered boosted our transaction conversions by 42% in the first 30 days.",
    author: "Sarah Jenkins",
    role: "VP of Product",
    company: "Aura Atelier",
    avatar: "SJ",
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    quote: "The speed of execution was unmatched. They architected and deployed our real-time analytics panel in less than 3 months. Linear-grade developers, without a doubt.",
    author: "David Chen",
    role: "Co-Founder",
    company: "Zenith Crypto Vault",
    avatar: "DC",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    quote: "Exceptional design aesthetics combined with rigid TypeScript backend architectures. They understood our complex AI agent requirements immediately.",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Helix Cognition",
    avatar: "MV",
    color: "from-emerald-500/10 to-teal-500/10",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger items
      const cards = containerRef.current?.querySelectorAll(".testimonial-card");
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
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            Client Success
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <SplitTextReveal text="What Visionary Teams" className="block text-foreground" />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <SplitTextReveal text="Say About Partnering." className="block" delay={0.2} />
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="testimonial-card group p-8 rounded-2xl glass-card flex flex-col justify-between overflow-hidden cursor-pointer relative"
            >
              {/* Glow overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Quote Icon */}
              <div className="mb-8 text-primary/30 group-hover:text-primary transition-colors duration-300">
                <Quote size={32} className="stroke-[1.5]" />
              </div>

              {/* Quote text */}
              <p className="text-base text-foreground/80 leading-relaxed font-light mb-8 group-hover:text-foreground transition-colors duration-300 text-left">
                "{t.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                {/* Avatar with initial letter */}
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white font-bold flex items-center justify-center transition-colors duration-300 text-sm select-none">
                  {t.avatar}
                </div>

                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-sm font-bold text-foreground">{t.author}</span>
                  <span className="text-xs text-muted font-light">
                    {t.role}, <span className="font-mono">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
