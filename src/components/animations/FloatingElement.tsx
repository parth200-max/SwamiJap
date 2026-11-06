"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  distance?: number; // Distance in pixels for the idle floating loop (default: 18)
  duration?: number; // Seconds for idle loop cycle (default: 4)
  parallaxSpeed?: number; // Parallax scrub factor (-0.5 to 0.5, default: -0.2)
  delay?: number;
  rotateIntensity?: number;
  enableTiltOnMouse?: boolean;
}

export function FloatingElement({
  children,
  className = "",
  distance = 18,
  duration = 4,
  parallaxSpeed = -0.2,
  delay = 0,
  rotateIntensity = 2,
  enableTiltOnMouse = true,
}: FloatingElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = floatingTargetRef.current;
    if (!container || !target) return;

    // 1. Idle floating loop: yoyo sine animation
    const idleFloat = gsap.to(target, {
      y: -distance,
      rotation: rotateIntensity,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay,
    });

    // 2. Scroll parallax movement powered by GSAP ScrollTrigger
    const parallaxTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        // Apply smooth parallax offset to the container while target continues floating
        const progress = self.progress - 0.5;
        gsap.to(container, {
          y: progress * parallaxSpeed * 180,
          overwrite: "auto",
          duration: 0.4,
          ease: "power1.out",
        });
      },
    });

    // 3. Optional interactive 3D magnetic tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTiltOnMouse) return;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(target, {
        rotateX: -y * 0.04,
        rotateY: x * 0.04,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      if (!enableTiltOnMouse) return;
      gsap.to(target, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.8,
      });
    };

    if (enableTiltOnMouse) {
      target.addEventListener("mousemove", handleMouseMove);
      target.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      idleFloat.kill();
      parallaxTrigger.kill();
      if (enableTiltOnMouse) {
        target.removeEventListener("mousemove", handleMouseMove);
        target.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [distance, duration, parallaxSpeed, delay, rotateIntensity, enableTiltOnMouse]);

  return (
    <div ref={containerRef} className={`relative will-change-transform ${className}`}>
      <div
        ref={floatingTargetRef}
        className="w-full h-full will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

export default FloatingElement;
