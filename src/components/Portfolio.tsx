"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { SplitTextReveal, FadeIn, Magnetic } from "./AnimateReveal";

const projects = [
  {
    title: "Aura Atelier",
    tag: "High-End E-Commerce",
    metric: "99% lighthouse performance",
    img: "/aura_apparel.jpg",
    desc: "A custom 3D product configurator and headless store interface built with Next.js and Stripe, scaling to 10M+ annual requests.",
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Zenith Crypto Vault",
    tag: "Fintech Dashboard",
    metric: "0.1s update latency",
    img: "/zenith_crypto.jpg",
    desc: "Real-time analytics engine, charting framework, and high-frequency trading companion dashboard managing $2B+ daily transaction data flow.",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Helix Cognition System",
    tag: "AI agent workspace",
    metric: "98% automation efficiency",
    img: "/helix_ai.jpg",
    desc: "Bespoke large language model workspace, custom agent workflows, and vector storage integration for secure enterprise automation.",
    color: "from-emerald-500/10 to-teal-500/10",
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Staggered reveals for cards
      const cards = containerRef.current?.querySelectorAll(".project-card");
      if (!cards) return;

      cards.forEach((card) => {
        const image = card.querySelector(".project-image");
        const details = card.querySelector(".project-details");

        // Subtle parallax slide + zoom on image when card enters scroll view
        gsap.fromTo(
          image,
          { scale: 1.15, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Details fade up
        gsap.from(details, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            Selected Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <SplitTextReveal text="Bespoke Systems," className="block text-foreground" />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <SplitTextReveal text="Delivered to Scale." className="block" delay={0.2} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
            A selective collection of systems we've engineered from scratch. High performance meets aesthetic perfection.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group cursor-pointer"
            >
              
              {/* Image Column (7 Cols) */}
              <div className="lg:col-span-7 relative overflow-hidden rounded-2xl glass-card border-border/80 group-hover:border-primary/30 transition-all duration-500 shadow-premium aspect-[16/10]">
                {/* Overlay layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none" />
                
                {/* Subtle border shine hover */}
                <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-20 pointer-events-none" />
                
                <div className="project-image w-full h-full relative overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Details Column (5 Cols) */}
              <div className="project-details lg:col-span-5 flex flex-col items-start gap-5 text-left">
                {/* Project Meta details */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {project.metric}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-base text-muted font-light leading-relaxed">
                  {project.desc}
                </p>

                {/* CTA Action */}
                <div className="mt-4">
                  <Magnetic strength={0.3}>
                    <a
                      href="#contact"
                      className="px-6 py-3 rounded-full border border-border group-hover:border-primary/50 group-hover:bg-primary/5 text-foreground group-hover:text-primary text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                    >
                      View Case Study
                      <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Magnetic>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
