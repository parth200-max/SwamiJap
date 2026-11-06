"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import type Lenis from "@studio-freight/lenis";
import type { LenisOptions } from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

interface LenisRef {
  wrapper?: HTMLElement;
  content?: HTMLElement;
  lenis?: Lenis;
}

interface LenisRootProps {
  children?: React.ReactNode;
  root?: boolean;
  options?: LenisOptions;
}

const LenisRoot = ReactLenis as unknown as React.ForwardRefExoticComponent<
  LenisRootProps & React.RefAttributes<LenisRef>
>;

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef | null>(null);

  // Hook into Lenis updates to sync GSAP ScrollTrigger
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // GSAP Ticker synchronization with Lenis requestAnimationFrame
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <LenisRoot
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.8,
        infinite: false,
      }}
    >
      {children}
    </LenisRoot>
  );
}

export default SmoothScroll;
