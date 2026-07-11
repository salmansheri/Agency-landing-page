"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    lenisRef.current = lenis;

    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Tell GSAP to use Lenis's requestAnimationFrame
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
      gsap.ticker.remove(tickerUpdate);
      ScrollTrigger.killAll();
    };
  }, []);

  return <div className="w-full min-h-screen flex flex-col">{children}</div>;
}
