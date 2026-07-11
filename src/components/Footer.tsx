"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { SplitTextReveal } from "./AnimateReveal";

// Inline clean brand SVGs to bypass Lucide package mismatches
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const footerLinks = [
  {
    title: "Agency",
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Inquiries",
    links: [
      { label: "Let's Partner", href: "#contact" },
      { label: "Email Us", href: "mailto:hello@aetheragency.com" },
      { label: "FAQ Support", href: "#faq" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Figma Community", href: "#" },
      { label: "GitHub System", href: "#" },
      { label: "Dribbble Portfolio", href: "#" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Huge text reveal animation on scroll trigger
      gsap.from(".huge-footer-text", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: footerRef, dependencies: [] }
  );

  return (
    <footer
      ref={footerRef}
      className="py-16 md:py-24 relative overflow-hidden bg-background border-t border-border w-full"
    >
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start">
          
          {/* Brand/Summary Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5 text-left">
            <span className="font-bold tracking-widest text-2xl font-mono text-foreground cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">AE</span>THER
            </span>
            <p className="text-sm text-muted font-light leading-relaxed max-w-sm">
              We design and build bespoke custom software, web applications, and immersive digital platforms. Exceptional code execution meets premium design.
            </p>
            {/* Social channels */}
            <div className="flex items-center gap-4 mt-2">
              {[
                { icon: TwitterIcon, href: "#" },
                { icon: GithubIcon, href: "#" },
                { icon: LinkedinIcon, href: "#" },
                { icon: InstagramIcon, href: "#" },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    className="p-2.5 rounded-full border border-border bg-card/40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center text-foreground"
                    aria-label="Social Link"
                  >
                    <Icon className="stroke-[1.5]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Categories Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {footerLinks.map((cat, index) => (
              <div key={index} className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-widest font-mono text-foreground">
                  {cat.title}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {cat.links.map((link, lIndex) => (
                    <li key={lIndex}>
                      <a
                        href={link.href}
                        className="text-sm font-light text-muted hover:text-primary transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.href.startsWith("mailto:") && (
                          <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Huge aesthetic branding text */}
        <div className="relative mt-8 md:mt-16 mb-8 select-none pointer-events-none overflow-hidden">
          <h2 className="huge-footer-text text-[15vw] sm:text-[18vw] lg:text-[20vw] font-black tracking-tighter leading-none text-foreground/[0.03] dark:text-foreground/[0.02] text-center w-full uppercase">
            Aether
          </h2>
        </div>

        {/* Sub-footer metadata details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs font-light text-muted select-none">
          <span>&copy; {new Date().getFullYear()} Aether Atelier Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
