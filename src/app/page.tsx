"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import DevelopmentProcess from "@/components/DevelopmentProcess";
import Portfolio from "@/components/Portfolio";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Cinematic noise texture overlay */}
      <div className="noise-overlay" />

      {/* Primary header navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Brand partners */}
        <TrustedCompanies />

        {/* Services grid */}
        <Services />

        {/* Value proposition details */}
        <WhyChooseUs />

        {/* Phased development flow timeline */}
        <DevelopmentProcess />

        {/* Project case studies */}
        <Portfolio />

        {/* Tech stack categorization */}
        <Technologies />

        {/* Client reviews */}
        <Testimonials />

        {/* Scope billing tiers */}
        <Pricing />

        {/* Collapsible FAQ accordions */}
        <FAQ />

        {/* Contact/Inquiry form details */}
        <Contact />
      </main>

      {/* Agency Footer */}
      <Footer />
    </div>
  );
}
