"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Activity, Cpu } from "lucide-react";
import { FadeIn } from "./AnimateReveal";

// Inline clean brand SVGs to bypass Lucide package mismatches
const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" />
    <path d="M12 16h3.5a3.5 3.5 0 1 1-3.5 3.5V16z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const DribbbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

const CodepenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <line x1="12" y1="22" x2="12" y2="15.5" />
    <polyline points="22 8.5 12 15.5 2 8.5" />
    <polyline points="2 15.5 12 8.5 22 15.5" />
    <line x1="12" y1="2" x2="12" y2="8.5" />
  </svg>
);

const companies = [
  { name: "Figma", icon: FigmaIcon },
  { name: "Github", icon: GithubIcon },
  { name: "Dribbble", icon: DribbbleIcon },
  { name: "Codepen", icon: CodepenIcon },
  { name: "Quantum", icon: Cpu },
  { name: "Vertex", icon: Activity },
];

export default function TrustedCompanies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  // Perform GSAP infinite marquee loop
  useGSAP(
    () => {
      const marqueeInner = marqueeInnerRef.current;
      if (!marqueeInner) return;

      const list = marqueeInner.querySelector(".marquee-list");
      if (!list) return;
      
      const width = list.getBoundingClientRect().width;

      gsap.to(marqueeInner, {
        x: -width,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-20 border-y border-border bg-card/20 backdrop-blur-sm overflow-hidden w-full"
    >
      <div className="container mx-auto px-6 mb-8 text-center">
        <FadeIn y={15} duration={0.6}>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted">
            Partnered with industry-leading teams
          </p>
        </FadeIn>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex items-center overflow-hidden py-4 select-none">
        {/* Left & Right Scrim Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee Inner moving tracks */}
        <div ref={marqueeInnerRef} className="flex whitespace-nowrap gap-12 sm:gap-20">
          {/* Track 1 */}
          <div className="marquee-list flex items-center gap-12 sm:gap-20">
            {companies.map((company, index) => {
              const Icon = company.icon;
              return (
                <div
                  key={`c1-${index}`}
                  className="flex items-center gap-3 text-muted hover:text-primary transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                  <span className="text-sm font-semibold tracking-wider font-mono">
                    {company.name.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Duplicate Track 2 for seamless wrap */}
          <div className="flex items-center gap-12 sm:gap-20">
            {companies.map((company, index) => {
              const Icon = company.icon;
              return (
                <div
                  key={`c2-${index}`}
                  className="flex items-center gap-3 text-muted hover:text-primary transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                  <span className="text-sm font-semibold tracking-wider font-mono">
                    {company.name.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Duplicate Track 3 for large screen wrap */}
          <div className="flex items-center gap-12 sm:gap-20">
            {companies.map((company, index) => {
              const Icon = company.icon;
              return (
                <div
                  key={`c3-${index}`}
                  className="flex items-center gap-3 text-muted hover:text-primary transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                  <span className="text-sm font-semibold tracking-wider font-mono">
                    {company.name.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
