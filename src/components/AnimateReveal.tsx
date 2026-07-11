"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// Character split reveal
export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const chars = containerRef.current.querySelectorAll(".char-item");
      gsap.fromTo(
        chars,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.015,
          ease: "power4.out",
          delay,
          clearProps: "transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <span ref={containerRef} className={`inline-block overflow-hidden py-1 ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char-item inline-block transform-gpu"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// Word-by-word reveal
export function SplitWordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const words = containerRef.current.querySelectorAll(".word-item");
      gsap.fromTo(
        words,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          delay,
          clearProps: "transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="word-item inline-block mr-[0.25em] transform-gpu">
          {word}
        </span>
      ))}
    </span>
  );
}

// Staggered reveal for general elements
export function FadeIn({
  children,
  className = "",
  y = 30,
  delay = 0,
  duration = 0.8,
  stagger = 0,
  triggerStart = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerStart?: string;
}) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!elementRef.current) return;
      const target = elementRef.current;
      const animateTargets = stagger > 0 ? target.children : target;

      gsap.fromTo(
        animateTargets,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: stagger > 0 ? stagger : undefined,
          delay,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: target,
            start: triggerStart,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: elementRef, dependencies: [] }
  );

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Magnetic interactive button component
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactElement;
  strength?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const element = containerRef.current;

      const xTo = gsap.quickTo(element, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.6, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const r = element.getBoundingClientRect();
        // Calculate relative position to the center of the button
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        xTo(x);
        yTo(y);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} className={`magnetic-wrap ${className}`}>
      {children}
    </div>
  );
}

