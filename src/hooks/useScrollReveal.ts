"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseScrollRevealOptions {
  selector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    selector,
    stagger = 0.12,
    y = 40,
    duration = 0.9,
    start = "top 85%",
    once = true,
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = selector
        ? ref.current.querySelectorAll(selector)
        : ref.current.children;

      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
            once,
          },
        }
      );
    },
    { scope: ref }
  );

  return ref;
}

export default useScrollReveal;

