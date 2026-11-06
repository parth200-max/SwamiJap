"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  stagger = 0.12,
  selector,
  y = 40,
  duration = 0.9,
  start = "top 85%",
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets = selector
        ? containerRef.current.querySelectorAll(selector)
        : containerRef.current.children;

      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        {
          y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none none",
            once,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export default ScrollReveal;

