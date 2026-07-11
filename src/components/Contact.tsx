"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Mail, MapPin, Send, MessageSquareCode, Sparkles } from "lucide-react";
import { SplitTextReveal, FadeIn, Magnetic } from "./AnimateReveal";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: "", email: "", budget: "growth", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useGSAP(
    () => {
      // Slide contact details and form in
      gsap.from(".contact-info-col", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".contact-form-col", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", budget: "growth", message: "" });
      
      // Auto-reset success state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden bg-card/10 border-y border-border w-full"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      
      {/* Background glow blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/15 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Contact details (5 Cols) */}
          <div className="contact-info-col lg:col-span-5 flex flex-col items-start gap-8 text-left">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-3">
                Collaborate
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                <SplitTextReveal text="Let's Engineer" className="block text-foreground" />
                <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                  <SplitTextReveal text="Something Great." className="block" delay={0.2} />
                </span>
              </h2>
              <p className="text-muted leading-relaxed font-light text-base md:text-lg max-w-md">
                Have a project or design problem you want solved? Partner with us to craft digital products of unmatched quality.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-6 w-full max-w-sm">
              {/* Card 1 */}
              <div className="flex gap-4 items-center p-4 rounded-2xl glass-panel">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted">Email Us</span>
                  <a href="mailto:hello@aetheragency.com" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    hello@aetheragency.com
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex gap-4 items-center p-4 rounded-2xl glass-panel">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted">Location</span>
                  <span className="text-sm font-semibold text-foreground">
                    Silicon Valley, CA & Remote
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex gap-4 items-center p-4 rounded-2xl glass-panel">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <MessageSquareCode size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted">Average Response</span>
                  <span className="text-sm font-semibold text-foreground">
                    Under 12 Hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form (7 Cols) */}
          <div className="contact-form-col lg:col-span-7 w-full">
            <div className="p-8 md:p-10 rounded-2xl glass-panel shadow-premium relative">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-semibold text-foreground/80">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === "sending" || status === "success"}
                      className="px-4 py-3 rounded-xl border border-border bg-card/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-foreground text-sm font-light outline-none transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-semibold text-foreground/80">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === "sending" || status === "success"}
                      className="px-4 py-3 rounded-xl border border-border bg-card/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-foreground text-sm font-light outline-none transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Budget selection */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold text-foreground/80">Project Scope</span>
                  <div className="grid grid-cols-3 gap-3">
                    {["startup", "growth", "enterprise"].map((budgetOpt) => (
                      <button
                        key={budgetOpt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: budgetOpt })}
                        disabled={status === "sending" || status === "success"}
                        className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 select-none ${
                          formData.budget === budgetOpt
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30 hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        {budgetOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-semibold text-foreground/80">Project Description</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about the digital platform, requirements, and target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === "sending" || status === "success"}
                    className="px-4 py-3 rounded-xl border border-border bg-card/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-foreground text-sm font-light outline-none transition-all duration-300 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit button */}
                <div className="mt-2 self-start w-full md:w-auto">
                  <Magnetic strength={0.2}>
                    <button
                      type="submit"
                      disabled={status === "sending" || status === "success"}
                      className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none ${
                        status === "success"
                          ? "bg-emerald-500 text-white"
                          : "bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/10 hover:shadow-primary/20 disabled:opacity-50"
                      }`}
                    >
                      {status === "sending" && "Submitting..."}
                      {status === "success" && "Message Sent!"}
                      {status === "idle" && (
                        <>
                          Send Message
                          <Send size={14} />
                        </>
                      )}
                      {status === "error" && "Provide all fields!"}
                    </button>
                  </Magnetic>
                </div>
              </form>

              {/* Decorative design sparkles */}
              <div className="absolute bottom-4 right-4 text-primary/10 pointer-events-none">
                <Sparkles size={48} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
