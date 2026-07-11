"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Globe,
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Infinity as InfinityIcon,
  Brain,
  Webhook,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { SplitTextReveal, SplitWordReveal, FadeIn } from "./AnimateReveal";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Bespoke, high-performance web applications built with Next.js, React, and cutting-edge frontend architecture.",
    size: "col-span-1 md:col-span-2 lg:col-span-4",
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Tailored enterprise solutions built to scale, engineered for reliability, safety, and business alignment.",
    size: "col-span-1 md:col-span-2 lg:col-span-4",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Immersive iOS & Android mobile apps featuring native performance and unified design consistency.",
    size: "col-span-1 md:col-span-2 lg:col-span-4",
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Breathtaking interactive interfaces and design systems comparable to Vercel, Apple, and Stripe.",
    size: "col-span-1 md:col-span-2 lg:col-span-6",
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Robust cloud architecture deployment on AWS & Azure optimized for security, scaling, and cost efficiency.",
    size: "col-span-1 md:col-span-2 lg:col-span-3",
    color: "from-sky-500/10 to-blue-500/10",
  },
  {
    icon: InfinityIcon,
    title: "DevOps",
    desc: "Automated CI/CD pipelines, container orchestration, and real-time infrastructure observability.",
    size: "col-span-1 md:col-span-2 lg:col-span-3",
    color: "from-rose-500/10 to-red-500/10",
  },
  {
    icon: Brain,
    title: "AI & Automation",
    desc: "Intelligent agent systems, custom LLM fine-tuning, and workflow automation powered by machine learning.",
    size: "col-span-1 md:col-span-2 lg:col-span-5",
    color: "from-indigo-500/10 to-violet-500/10",
  },
  {
    icon: Webhook,
    title: "API Development",
    desc: "Secure, RESTful, and GraphQL API design with sub-millisecond response rates and comprehensive schemas.",
    size: "col-span-1 md:col-span-2 lg:col-span-4",
    color: "from-cyan-500/10 to-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & Support",
    desc: "Round-the-clock proactive system checks, performance auditing, and software updates.",
    size: "col-span-1 md:col-span-2 lg:col-span-3",
    color: "from-green-500/10 to-emerald-500/10",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Register GSAP ScrollTrigger
  useGSAP(
    () => {
      // Stagger animate cards in on scroll
      const cards = containerRef.current?.querySelectorAll(".service-card");
      if (!cards) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
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
      id="services"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Background Dots */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
            What We Deliver
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            <SplitWordReveal text="Engineered for Performance." className="block" />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text block mt-2">
              <SplitWordReveal text="Designed to Convert." className="inline" delay={0.2} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
            We provide full-lifecycle product development, translating complex ideas into highly polished digital assets.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`service-card ${service.size} group relative p-8 rounded-2xl glass-card select-none flex flex-col justify-between overflow-hidden cursor-pointer`}
              >
                {/* Background Gradient Blob Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
                
                {/* Glowing border detail */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:text-accent group-hover:border-primary/20 transition-all duration-300 mb-6 group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    <Icon size={22} className="stroke-[1.5]" />
                  </div>

                  {/* Copy */}
                  <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted group-hover:text-foreground/90 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                {/* Arrow Link Interaction */}
                <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-primary/70 group-hover:text-primary transition-colors duration-300 self-start">
                  Learn more
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
