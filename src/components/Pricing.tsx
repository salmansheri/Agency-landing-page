"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Check, Flame } from "lucide-react";
import { SplitTextReveal, FadeIn, Magnetic } from "./AnimateReveal";

const tiers = [
  {
    name: "Sprint MVP",
    price: "$14,500",
    period: "per project",
    desc: "Perfect for startups needing a high-fidelity functional MVP launched within a rapid timeline.",
    features: [
      "1 Dedicated Frontend Engineer",
      "Apple-Level UI Design (10 Screens)",
      "Vercel CDN Deployment",
      "TypeScript & Tailwind codebase",
      "14 Days Post-Launch Support",
    ],
    cta: "Start Sprint",
    popular: false,
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    name: "Full Stack Growth",
    price: "$34,500",
    period: "per project",
    desc: "Complete product engineering for high-growth brands scaling up features and infrastructure.",
    features: [
      "Dedicated Full-Stack Team (3 Eng)",
      "Bespoke Design System (Figma)",
      "Automated DevOps & CI/CD Pipelines",
      "Full API & Database Integrations",
      "60 Days Post-Launch Support",
      "E2E Automated Testing",
    ],
    cta: "Hire Team",
    popular: true,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Enterprise System",
    price: "Custom",
    period: "retainer scaling",
    desc: "Bespoke retainer services for large-scale enterprise systems, AI agent integrations, and refactoring.",
    features: [
      "Custom Scaling Engineering Squad",
      "Dedicated Product Architect",
      "24/7 Priority SLA Support",
      "Audit logs, HIPAA & GDPR compliance",
      "Security Audits & Load Testing",
    ],
    cta: "Consult Architect",
    popular: false,
    color: "from-emerald-500/10 to-teal-500/10",
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger animate cards
      const cards = containerRef.current?.querySelectorAll(".pricing-card");
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
      id="pricing"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden bg-card/10 border-y border-border w-full"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      
      {/* Background glow blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            Pricing Models
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <SplitTextReveal text="Bespoke Pricing" className="block text-foreground" />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <SplitTextReveal text="Built Around Your Scale." className="block" delay={0.2} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
            Transparent pricing models for teams who prioritize top-tier digital product engineering over low-cost code compromise.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card group p-8 rounded-2xl glass-card flex flex-col justify-between overflow-hidden cursor-pointer relative ${
                tier.popular ? "border-primary/40 shadow-premium lg:-translate-y-4" : "border-border"
              }`}
            >
              {/* Glow overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Popular tag highlight */}
              {tier.popular && (
                <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Flame size={10} />
                  Most Popular
                </span>
              )}

              <div>
                {/* Header */}
                <span className="text-sm font-semibold tracking-wider text-muted uppercase font-mono block mb-2">
                  {tier.name}
                </span>
                
                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-xs text-muted font-light font-mono">
                    / {tier.period}
                  </span>
                </div>

                {/* Desc */}
                <p className="text-sm text-muted font-light leading-relaxed mb-8 border-b border-border/80 pb-6 text-left">
                  {tier.desc}
                </p>

                {/* Features list */}
                <ul className="flex flex-col gap-4 mb-8 text-left">
                  {tier.features.map((feat, fIndex) => (
                    <li key={fIndex} className="flex gap-3 items-center text-sm font-light text-foreground/80">
                      <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Check size={12} className="stroke-[2.5]" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action button */}
              <div className="mt-8 w-full">
                <Magnetic strength={0.25} className="w-full">
                  <a
                    href="#contact"
                    className={`w-full py-4.5 rounded-full text-sm font-bold flex items-center justify-center transition-all duration-300 ${
                      tier.popular
                        ? "bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20"
                        : "border border-border hover:border-primary/30 hover:bg-primary/5 text-foreground group-hover:text-primary"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </Magnetic>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
