"use client";

import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitTextReveal } from "./AnimateReveal";

const faqs = [
  {
    q: "What types of projects does AETHER specialize in?",
    a: "We specialize in custom software systems, interactive web applications (built with Next.js/React), iOS/Android mobile apps (React Native), and bespoke AI workflows/LLM integrations. We do not use generic templates; everything is designed and written custom from scratch.",
  },
  {
    q: "Do I own the source code and IP completely?",
    a: "Yes, absolutely. Once final milestones are cleared, you own 100% of the intellectual property, design assets, database structures, and source repositories. We write clean, documented, typed code that your internal engineers can scale with ease.",
  },
  {
    q: "Can you optimize or rewrite an existing codebase?",
    a: "Yes. We frequently partner with companies to audit legacy setups, refactor performance bottlenecks, improve design aesthetics (UI/UX overrides), and implement secure CI/CD pipelines without disrupting active users.",
  },
  {
    q: "How does the phase pricing payment model work?",
    a: "We structure projects into clear milestone phases (e.g. Phase 1 Discovery & Design, Phase 2 Core Architecture, Phase 3 Launch Dev). You review and clear payments only as each physical milestone is verified on staging envs.",
  },
  {
    q: "What happens after the product launches?",
    a: "We don't just hand off repository code and leave. Every project tier includes 14 to 60 days of complimentary support. We also provide scalable monthly SLA packages for server maintenance, security upgrades, and new feature loops.",
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // Stagger animate faq cards entrance
      const items = containerRef.current?.querySelectorAll(".faq-panel");
      if (!items) return;

      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  // Animate Height expansion using GSAP
  useEffect(() => {
    const panels = containerRef.current?.querySelectorAll(".faq-panel");
    if (!panels) return;

    panels.forEach((panel, idx) => {
      const answer = panel.querySelector(".faq-answer");
      const icon = panel.querySelector(".faq-icon");
      if (!answer || !icon) return;

      if (openIndex === idx) {
        gsap.killTweensOf(answer);
        gsap.killTweensOf(icon);
        gsap.to(answer, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(icon, {
          rotate: 180,
          color: "var(--primary)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.killTweensOf(answer);
        gsap.killTweensOf(icon);
        gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
        gsap.to(icon, {
          rotate: 0,
          color: "currentColor",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [openIndex]);

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <SplitTextReveal
              text="Frequently Answered"
              className="block text-foreground"
            />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              <SplitTextReveal
                text="Questions."
                className="block"
                delay={0.2}
              />
            </span>
          </h2>
        </div>

        {/* Accordions Stack */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="faq-panel border border-border bg-card/40 backdrop-blur-sm hover:bg-card/70 transition-colors duration-300 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {/* Question header */}
              <div className="p-6 md:p-8 flex items-center justify-between gap-4 select-none">
                <span className="text-base md:text-lg font-bold text-foreground text-left leading-snug">
                  {faq.q}
                </span>
                <span className="faq-icon text-muted shrink-0 flex items-center justify-center p-1 border border-border/80 bg-card rounded-full transition-all duration-300">
                  <ChevronDown size={18} />
                </span>
              </div>

              {/* Answer content (animated height collapse/expand) */}
              <div className="faq-answer overflow-hidden h-0 opacity-0 px-6 md:px-8 pb-6 md:pb-8">
                <p className="text-sm md:text-base text-muted font-light leading-relaxed text-left border-t border-border/60 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
