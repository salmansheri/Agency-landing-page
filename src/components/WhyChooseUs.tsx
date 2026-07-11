"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Shield, Zap, Sparkles, Code } from "lucide-react";
import { SplitTextReveal, FadeIn } from "./AnimateReveal";

const keyPoints = [
  {
    icon: Zap,
    title: "Exceptional Execution Speed",
    desc: "We skip boilerplate. Your system is engineered for maximum throughput, sub-second loads, and zero layout shift.",
  },
  {
    icon: Shield,
    title: "Military-Grade Security",
    desc: "Rigorous typing, secure data schemas, and continuous pipeline checks protect your users and proprietary IP.",
  },
  {
    icon: Sparkles,
    title: "Apple-Level Design Fidelity",
    desc: "Beautiful aesthetics, micro-animations, and fluid transitions combine to create a lasting, premium impression.",
  },
  {
    icon: Code,
    title: "100% Ownership & Zero Lock-in",
    desc: "Clean, documented, developer-friendly TypeScript code. You own the IP completely. No proprietary runtime lock-in.",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref for stats counters
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Stagger Key Points
      gsap.from(".key-point-item", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".key-points-wrapper",
          start: "top 80%",
        },
      });

      // Stagger Visual Stat Cards
      gsap.from(".stat-card-item", {
        opacity: 0,
        scale: 0.9,
        y: 35,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-wrapper",
          start: "top 80%",
        },
      });

      // Animated counter figures using GSAP scroll triggers
      const animateCounter = (el: HTMLSpanElement | null, targetVal: number, duration: number) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: targetVal.toString(),
            duration: duration,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      };

      animateCounter(stat1Ref.current, 99, 1.8);
      animateCounter(stat2Ref.current, 3, 1.5);
      animateCounter(stat3Ref.current, 100, 2);
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="py-24 md:py-32 relative bg-card/10 border-y border-border overflow-hidden w-full"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      
      {/* Background glow blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Core Copy & Bullet Points (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8 text-left">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
                Why Partner With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                <SplitTextReveal text="Product Excellence" className="block" />
                <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                  <SplitTextReveal text="Over Speed Compromise." className="block" delay={0.2} />
                </span>
              </h2>
              <p className="text-muted leading-relaxed font-light text-base md:text-lg max-w-xl">
                We bridge the gap between world-class system architecture and high-end aesthetics. We don't ship cookie-cutter themes.
              </p>
            </div>

            {/* List */}
            <div className="key-points-wrapper flex flex-col gap-6 w-full max-w-2xl">
              {keyPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className="key-point-item flex gap-5 items-start p-4 rounded-xl hover:bg-card/50 transition-colors duration-300"
                  >
                    <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon size={18} className="stroke-[1.5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold text-foreground">{point.title}</h3>
                      <p className="text-sm text-muted leading-relaxed font-light">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Luxury Stats Visuals (5 Cols) */}
          <div className="lg:col-span-5 stats-wrapper flex flex-col gap-6 w-full items-center justify-center">
            
            {/* Stat Card 1 */}
            <div className="stat-card-item w-full sm:max-w-[340px] p-6 rounded-2xl glass-panel text-left flex flex-col gap-3 shadow-premium">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Production Performance
              </span>
              <div className="flex items-baseline gap-1 text-5xl font-extrabold text-foreground">
                <span ref={stat1Ref}>99</span>
                <span className="text-xl text-primary font-bold">%</span>
              </div>
              <p className="text-xs leading-normal text-muted font-light">
                Sub-second initial server responses, optimizing your organic SEO ranking and conversion rates.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="stat-card-item w-full sm:max-w-[340px] p-6 rounded-2xl glass-panel text-left flex flex-col gap-3 shadow-premium translate-x-0 sm:translate-x-6">
              <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                Deployment Acceleration
              </span>
              <div className="flex items-baseline gap-1 text-5xl font-extrabold text-foreground">
                <span className="text-xl text-accent font-bold">3x</span>
                <span ref={stat2Ref}>3</span>
                <span className="text-xl text-muted font-light">Months</span>
              </div>
              <p className="text-xs leading-normal text-muted font-light">
                Agile development sprints delivering complex apps to market 3x faster than traditional agencies.
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="stat-card-item w-full sm:max-w-[340px] p-6 rounded-2xl glass-panel text-left flex flex-col gap-3 shadow-premium">
              <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">
                Bespoke Design Integrity
              </span>
              <div className="flex items-baseline gap-1 text-5xl font-extrabold text-foreground">
                <span ref={stat3Ref}>100</span>
                <span className="text-xl text-emerald-500 font-bold">%</span>
              </div>
              <p className="text-xs leading-normal text-muted font-light">
                Tailored layouts designed screen-by-screen. We never use templates, guaranteeing your unique brand presence.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
