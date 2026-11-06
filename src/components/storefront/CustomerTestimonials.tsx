"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CustomerTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Reusable Scroll Reveal for Lower Sections (start: "top 85%", y: 40 -> 0, opacity: 0 -> 1)
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const header = sectionRef.current.querySelector(".testimonials-header");
      const avatar = sectionRef.current.querySelector(".testimonials-avatar");
      const stars = sectionRef.current.querySelector(".testimonials-stars");
      const quote = sectionRef.current.querySelector("blockquote");

      const targets = [header, avatar, stars, quote].filter(Boolean);

      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-charcoal text-white overflow-hidden"
    >
      {/* 1. Organic Asymmetrical Top Wavy Divider */}
      <div className="w-full overflow-hidden leading-none -mt-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 lg:h-20 block"
        >
          {/* Ivory background fill for upper half to seamlessly blend with previous section */}
          <path
            d="M0,0 L1440,0 L1440,32 C1240,68 1020,12 720,48 C420,84 200,24 0,56 Z"
            fill="#EBE9E1"
          />
          {/* Subtle outline tracing the wave contour */}
          <path
            d="M0,56 C200,24 420,84 720,48 C1020,12 1240,68 1440,32"
            stroke="#806B59"
            strokeWidth="1.25"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* 2. Main Content Area */}
      <div className="container-page py-12 sm:py-16 lg:py-20 text-center relative z-10">
        {/* Section Header */}
        <div className="testimonials-header">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-mustard">
            STORIES FROM OUR CUSTOMERS
          </p>
          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-beige tracking-tight">
            What They Say
          </h2>
        </div>

        {/* Circular Avatar with Silhouette */}
        <div className="testimonials-avatar mt-8 sm:mt-10 flex justify-center">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden border-2 border-border/20">
            {/* Elegant silhouette user vector */}
            <svg
              className="h-16 w-16 sm:h-18 sm:w-18 text-charcoal translate-y-1.5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 13c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* 5 Stars Rating in Mustard Yellow */}
        <div
          className="testimonials-stars mt-5 flex items-center justify-center gap-1.5 text-mustard text-lg sm:text-xl tracking-widest"
          aria-label="5 out of 5 stars"
        >
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        {/* Testimonial Quote */}
        <blockquote className="mt-6 sm:mt-8 max-w-2xl mx-auto px-4">
          <p className="font-serif italic text-lg sm:text-xl lg:text-[22px] font-normal text-ivory leading-relaxed sm:leading-loose">
            &ldquo;I have received the bag. It&apos;s very, very nice. I love it! It&apos;s been great
            doing business with you. Hope to buy from you again.&rdquo;
          </p>
          <footer className="mt-6 flex items-center justify-center gap-2 font-sans text-sm">
            <span className="font-semibold text-white tracking-wide">
              — Namrata Yadav
            </span>
            <span className="text-brown tracking-normal">
              Thane
            </span>
          </footer>
        </blockquote>

        {/* Development Note */}
        <div className="mt-6 text-center">
          <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-brown/80 bg-charcoal-soft/60 px-3 py-1 rounded-full border border-border/10">
            Customer Story • Development Verification Placeholder
          </span>
        </div>
      </div>

      {/* 3. Bottom Decorative Floral / Block-Print Motif Border Strip */}
      <div
        className="w-full bg-[#E8E4DA] py-3.5 sm:py-4 border-t border-border/40 overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex items-center justify-around gap-6 opacity-75 min-w-full">
          {Array.from({ length: 18 }).map((_, i) => (
            <svg
              key={i}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 text-brown"
            >
              {/* Traditional Indian floral block-print motif */}
              <circle cx="16" cy="16" r="3" fill="#806B59" />
              {/* Petals */}
              <circle cx="16" cy="7" r="2.5" fill="#806B59" />
              <circle cx="16" cy="25" r="2.5" fill="#806B59" />
              <circle cx="7" cy="16" r="2.5" fill="#806B59" />
              <circle cx="25" cy="16" r="2.5" fill="#806B59" />
              <circle cx="9.5" cy="9.5" r="2" fill="#806B59" opacity="0.8" />
              <circle cx="22.5" cy="9.5" r="2" fill="#806B59" opacity="0.8" />
              <circle cx="9.5" cy="22.5" r="2" fill="#806B59" opacity="0.8" />
              <circle cx="22.5" cy="22.5" r="2" fill="#806B59" opacity="0.8" />
              {/* Radiating filigree dots */}
              <circle cx="16" cy="2" r="1.25" fill="#806B59" opacity="0.5" />
              <circle cx="16" cy="30" r="1.25" fill="#806B59" opacity="0.5" />
              <circle cx="2" cy="16" r="1.25" fill="#806B59" opacity="0.5" />
              <circle cx="30" cy="16" r="1.25" fill="#806B59" opacity="0.5" />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerTestimonials;
