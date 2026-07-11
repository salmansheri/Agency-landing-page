"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Compass,
  Palette,
  FileCode,
  Braces,
  Flame,
  Rocket,
} from "lucide-react";
import { SplitTextReveal } from "./AnimateReveal";

const steps = [
  {
    num: "01",
    icon: Compass,
    title: "Discovery & Strategy",
    desc: "Stakeholder alignment, scoping tech requirements, and building a project architecture roadmap.",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    num: "02",
    icon: Palette,
    title: "Bespoke Design",
    desc: "Creating high-fidelity UI assets, layout systems, and interactive prototypes screen-by-screen.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    num: "03",
    icon: FileCode,
    title: "System Architecture",
    desc: "Defining database models, backend API contracts, and security schemas for rapid scale.",
    color: "from-pink-500/20 to-red-500/20",
  },
  {
    num: "04",
    icon: Braces,
    title: "Agile Engineering",
    desc: "Sprinting code in short development loops using clean, typed TypeScript and modern stacks.",
    color: "from-rose-500/20 to-orange-500/20",
  },
  {
    num: "05",
    icon: Flame,
    title: "End-to-End QA",
    desc: "Automated regression validation, performance profiling, and browser accessibility checks.",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    num: "06",
    icon: Rocket,
    title: "Launch & Optimization",
    desc: "Seamless production deploy, CDN caching configurations, and setting analytics loops.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export default function DevelopmentProcess() {
  const pinRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const slider = sliderRef.current;
      if (!pin || !slider) return;

      const panels = slider.querySelectorAll(".process-panel");
      const numPanels = panels.length;

      const mm = gsap.matchMedia();

      // Desktop: Pin section and translate panels horizontally
      mm.add("(min-width: 1024px)", () => {
        const totalDistance = slider.scrollWidth - window.innerWidth;
        
        gsap.to(slider, {
          x: -totalDistance,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${slider.scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Background progress line fill trigger
        gsap.fromTo(
          ".progress-bar-fill",
          { width: "0%" },
          {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              scrub: 1,
              start: "top top",
              end: () => `+=${slider.scrollWidth}`,
            },
          }
        );
        
        // Active panel glows on scroll
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { scale: 0.9, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById("scrollTrigger") || undefined, // Wait, containerAnimation works internally
                start: "left 70%",
                end: "right 30%",
                scrub: true,
              }
            }
          );
        });
      });

      // Mobile/Tablet: Vertical Scroll Reveal list items
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".process-panel", {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slider,
            start: "top 80%",
          },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: pinRef, dependencies: [] }
  );

  return (
    <div ref={pinRef} className="relative bg-background overflow-hidden w-full">
      {/* Pinned section container */}
      <div id="process" className="lg:h-screen lg:flex lg:flex-col lg:justify-center py-24 lg:py-0">
        
        {/* Title (Always visible) */}
        <div className="container mx-auto px-6 mb-12 lg:mb-20 text-left shrink-0">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            Our Flow
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <SplitTextReveal text="Phased Execution for" className="block text-foreground" />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <SplitTextReveal text="Predictable Outcomes." className="block" delay={0.2} />
            </span>
          </h2>
        </div>

        {/* Progress bar container (Desktop Only) */}
        <div className="hidden lg:block relative w-full h-[2px] bg-border z-10 select-none pointer-events-none mb-12">
          <div className="progress-bar-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent" />
        </div>

        {/* Slider element containing panel cards */}
        <div
          ref={sliderRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:flex-nowrap px-6 lg:px-20 w-full"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="process-panel w-full lg:w-[420px] lg:shrink-0 lg:px-12 flex flex-col justify-center items-start text-left relative group select-none"
              >
                {/* Decorative timeline marker icon node (Desktop only) */}
                <div className="hidden lg:flex absolute top-[-58px] left-[45px] w-5 h-5 rounded-full border-4 border-background bg-border group-hover:bg-primary transition-colors duration-300 z-20" />

                <div className="w-full p-8 rounded-2xl glass-card relative overflow-hidden">
                  {/* Subtle Background Radial Gradient Blob */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}
                  />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:text-accent group-hover:border-primary/20 transition-all duration-300 mb-6 shadow-sm">
                    <Icon size={20} className="stroke-[1.5]" />
                  </div>

                  {/* Step Number Tag */}
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold block mb-2">
                    Phase {step.num}
                  </span>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
