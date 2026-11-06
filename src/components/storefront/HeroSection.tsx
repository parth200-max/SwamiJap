"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Koklass Ornate Illustrated Tote Bag SVG Artwork (Recreating Image 1)
 *
 * Visual Specifications:
 * - Desktop width: ~240px
 * - Structured brown/maroon tote body with rich espresso gradient
 * - Strong dual-line crisp white outer contour
 * - Dual arched handles with white contour, gold stitching & riveted leather tabs
 * - Fine mustard/gold perimeter stitching
 * - Four intricate corner flourishes:
 *     - Top-left & top-right: Intricate white & gold filigree / lace swirls
 *     - Bottom-left & bottom-right: Layered lace / mandala corner arcs with mustard dots
 * - Large, vibrant multi-layered central mandala-inspired floral motif:
 *     - Layer 1 (Outer): 8 pointed lotus petals in Mustard Yellow #EFB11D
 *     - Layer 2 (Middle): 8 interleaved petals in Dusty Rose #D6536D
 *     - Layer 3 (Inner): 8 soft floral petals in Soft Pink #FFA2B6
 *     - Core: Concentric rings with gold beaded border and crisp white bindu
 *     - Radiating dotted aura & vertical lotus finials
 */
function KoklassToteIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 285"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Koklass handcrafted decorative tote bag illustration with mandala motif"
    >
      <defs>
        {/* Deep rich brown / maroon charcoal gradient for tote body */}
        <linearGradient
          id="koklassBagBodyGrad"
          x1="120"
          y1="90"
          x2="120"
          y2="248"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2E1D21" />
          <stop offset="45%" stopColor="#221518" />
          <stop offset="100%" stopColor="#150D0F" />
        </linearGradient>

        {/* Soft radial glow behind central mandala */}
        <radialGradient
          id="koklassMandalaGlow"
          cx="120"
          cy="170"
          r="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EFB11D" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#D6536D" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#150D0F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ================================================================
          1. DUAL ARCHED HANDLES
          ================================================================ */}
      {/* Rear Handle (behind bag rim) */}
      <path
        d="M 85 92 C 85 36 155 36 155 92"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M 85 92 C 85 39 155 39 155 92"
        stroke="#EFB11D"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* ================================================================
          2. STRUCTURED TOTE BAG BODY & DUAL-LINE CONTOUR
          ================================================================ */}
      {/* Outer Bag Body Silhouette */}
      <path
        d="M 42 90 L 198 90 L 190 238 Q 189 248 178 248 L 62 248 Q 51 248 50 238 Z"
        fill="url(#koklassBagBodyGrad)"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* Inner White Hairline Contour (creating the strong dual-line white outer contour) */}
      <path
        d="M 45 93 L 195 93 L 187 236 Q 186 245 176 245 L 64 245 Q 54 245 53 236 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity="0.85"
      />

      {/* Flat base reinforcement seam */}
      <path
        d="M 54 230 L 186 230"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Fine Mustard Perimeter Stitching Details (inset ~5px) */}
      <path
        d="M 48 98 L 192 98 L 184 233 Q 183 240 173 240 L 67 240 Q 57 240 56 233 Z"
        fill="none"
        stroke="#EFB11D"
        strokeWidth="1.2"
        strokeDasharray="4 3.5"
      />

      {/* Top rim crisp triple edge */}
      <line x1="42" y1="90" x2="198" y2="90" stroke="#FFFFFF" strokeWidth="3" />
      <line x1="44" y1="94" x2="196" y2="94" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="46" y1="98" x2="194" y2="98" stroke="#EFB11D" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />

      {/* ================================================================
          3. FRONT ARCHED HANDLE & ATTACHMENT TABS
          ================================================================ */}
      {/* Front Handle Arch */}
      <path
        d="M 78 92 C 78 20 162 20 162 92"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Front Handle Mustard Stitching */}
      <path
        d="M 78 92 C 78 24 162 24 162 92"
        stroke="#EFB11D"
        strokeWidth="1.2"
        strokeDasharray="3.5 3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left Handle Leather Tab & Gold Stud */}
      <rect
        x="72"
        y="87"
        width="13"
        height="20"
        rx="3"
        fill="#221518"
        stroke="#FFFFFF"
        strokeWidth="1.6"
      />
      <circle
        cx="78.5"
        cy="98"
        r="2.5"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />

      {/* Right Handle Leather Tab & Gold Stud */}
      <rect
        x="155"
        y="87"
        width="13"
        height="20"
        rx="3"
        fill="#221518"
        stroke="#FFFFFF"
        strokeWidth="1.6"
      />
      <circle
        cx="161.5"
        cy="98"
        r="2.5"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />

      {/* ================================================================
          4. FOUR INTRICATE CORNER FLOURISHES (Matching Image 1)
          ================================================================ */}
      {/* --- TOP-LEFT CORNER FILIGREE --- */}
      <g opacity="0.9">
        {/* Scalloped corner arc */}
        <path
          d="M 48 126 Q 64 116 72 101"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 48 120 Q 60 112 67 101"
          stroke="#EFB11D"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
        />
        {/* Radiating lace petals */}
        <path d="M 52 118 Q 57 113 54 108 Q 51 113 52 118 Z" fill="#FFFFFF" />
        <path d="M 58 114 Q 63 109 60 104 Q 57 109 58 114 Z" fill="#FFFFFF" />
        {/* Filigree swirl */}
        <path
          d="M 50 103 C 56 107 62 112 60 117"
          stroke="#FFA2B6"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="72" cy="101" r="1.3" fill="#EFB11D" />
        <circle cx="48" cy="126" r="1.3" fill="#EFB11D" />
        <circle cx="58" cy="111" r="1.2" fill="#FFFFFF" />
      </g>

      {/* --- TOP-RIGHT CORNER FILIGREE (Symmetrical) --- */}
      <g opacity="0.9">
        {/* Scalloped corner arc */}
        <path
          d="M 192 126 Q 176 116 168 101"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 192 120 Q 180 112 173 101"
          stroke="#EFB11D"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
        />
        {/* Radiating lace petals */}
        <path d="M 188 118 Q 183 113 186 108 Q 189 113 188 118 Z" fill="#FFFFFF" />
        <path d="M 182 114 Q 177 109 180 104 Q 183 109 182 114 Z" fill="#FFFFFF" />
        {/* Filigree swirl */}
        <path
          d="M 190 103 C 184 107 178 112 180 117"
          stroke="#FFA2B6"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="168" cy="101" r="1.3" fill="#EFB11D" />
        <circle cx="192" cy="126" r="1.3" fill="#EFB11D" />
        <circle cx="182" cy="111" r="1.2" fill="#FFFFFF" />
      </g>

      {/* --- BOTTOM-LEFT CORNER MANDALA MEDALLION --- */}
      <g opacity="0.95">
        {/* Concentric quarter-arcs radiating from corner */}
        <path
          d="M 51 214 A 28 28 0 0 1 80 246"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M 52 222 A 20 20 0 0 1 73 246"
          stroke="#EFB11D"
          strokeWidth="1"
          strokeDasharray="2 3"
          fill="none"
        />
        <path
          d="M 54 230 A 12 12 0 0 1 66 246"
          stroke="#FFFFFF"
          strokeWidth="1"
          fill="none"
        />
        {/* Scalloped lace points */}
        <circle cx="51" cy="214" r="1.5" fill="#EFB11D" />
        <circle cx="58" cy="223" r="1.4" fill="#FFFFFF" />
        <circle cx="68" cy="233" r="1.4" fill="#FFFFFF" />
        <circle cx="80" cy="246" r="1.5" fill="#EFB11D" />
        {/* Corner petal accents */}
        <path d="M 54 220 Q 60 220 58 226 Q 52 226 54 220 Z" fill="#FFA2B6" />
        <path d="M 64 230 Q 70 230 68 236 Q 62 236 64 230 Z" fill="#FFA2B6" />
      </g>

      {/* --- BOTTOM-RIGHT CORNER MANDALA MEDALLION (Symmetrical) --- */}
      <g opacity="0.95">
        {/* Concentric quarter-arcs radiating from corner */}
        <path
          d="M 189 214 A 28 28 0 0 0 160 246"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M 188 222 A 20 20 0 0 0 167 246"
          stroke="#EFB11D"
          strokeWidth="1"
          strokeDasharray="2 3"
          fill="none"
        />
        <path
          d="M 186 230 A 12 12 0 0 0 174 246"
          stroke="#FFFFFF"
          strokeWidth="1"
          fill="none"
        />
        {/* Scalloped lace points */}
        <circle cx="189" cy="214" r="1.5" fill="#EFB11D" />
        <circle cx="182" cy="223" r="1.4" fill="#FFFFFF" />
        <circle cx="172" cy="233" r="1.4" fill="#FFFFFF" />
        <circle cx="160" cy="246" r="1.5" fill="#EFB11D" />
        {/* Corner petal accents */}
        <path d="M 186 220 Q 180 220 182 226 Q 188 226 186 220 Z" fill="#FFA2B6" />
        <path d="M 176 230 Q 170 230 172 236 Q 178 236 176 230 Z" fill="#FFA2B6" />
      </g>

      {/* ================================================================
          5. CENTRAL MANDALA FLORAL MOTIF (Large, Ornate, Multi-Layered)
          ================================================================ */}
      {/* Soft warm background glow */}
      <circle cx="120" cy="170" r="48" fill="url(#koklassMandalaGlow)" />

      {/* Outer Dotted Ornamental Ring */}
      <circle
        cx="120"
        cy="170"
        r="46"
        fill="none"
        stroke="#EFB11D"
        strokeWidth="1"
        strokeDasharray="2.5 4"
        opacity="0.9"
      />

      {/* 16 Radial Dotted Accents around perimeter */}
      <circle cx="166" cy="170" r="1.6" fill="#FFFFFF" />
      <circle cx="74" cy="170" r="1.6" fill="#FFFFFF" />
      <circle cx="120" cy="124" r="1.6" fill="#FFFFFF" />
      <circle cx="120" cy="216" r="1.6" fill="#FFFFFF" />
      <circle cx="153" cy="137" r="1.4" fill="#EFB11D" />
      <circle cx="87" cy="137" r="1.4" fill="#EFB11D" />
      <circle cx="153" cy="203" r="1.4" fill="#EFB11D" />
      <circle cx="87" cy="203" r="1.4" fill="#EFB11D" />

      {/* Top Vertical Lotus Finial */}
      <path
        d="M 120 112 Q 123.5 119 120 124 Q 116.5 119 120 112 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />
      <circle cx="120" cy="110" r="1.4" fill="#FFFFFF" />

      {/* Bottom Vertical Lotus Finial */}
      <path
        d="M 120 228 Q 123.5 221 120 216 Q 116.5 221 120 228 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />
      <circle cx="120" cy="230" r="1.4" fill="#FFFFFF" />

      {/* --- LAYER 1: 8 Outer Lotus Petals in Mustard Yellow #EFB11D --- */}
      <path
        d="M 129.5 170.0 Q 148.0 162.8 163.0 170.0 Q 148.0 177.2 129.5 170.0 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 126.7 176.7 Q 145.0 185.0 150.4 200.4 Q 135.0 195.0 126.7 176.7 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 120.0 179.5 Q 127.2 198.0 120.0 213.0 Q 112.8 198.0 120.0 179.5 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 113.3 176.7 Q 105.0 195.0 89.6 200.4 Q 95.0 185.0 113.3 176.7 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 110.5 170.0 Q 92.0 177.2 77.0 170.0 Q 92.0 162.8 110.5 170.0 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 113.3 163.3 Q 95.0 155.0 89.6 139.6 Q 105.0 145.0 113.3 163.3 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 120.0 160.5 Q 112.8 142.0 120.0 127.0 Q 127.2 142.0 120.0 160.5 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />
      <path
        d="M 126.7 163.3 Q 135.0 145.0 150.4 139.6 Q 145.0 155.0 126.7 163.3 Z"
        fill="#EFB11D"
        stroke="#FFFFFF"
        strokeWidth="0.9"
      />

      {/* Outer Petals Center Veins (Coral / White) */}
      <line x1="129.5" y1="170" x2="160" y2="170" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="126.7" y1="176.7" x2="147" y2="197" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="120" y1="179.5" x2="120" y2="210" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="113.3" y1="176.7" x2="93" y2="197" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="110.5" y1="170" x2="80" y2="170" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="113.3" y1="163.3" x2="93" y2="143" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="120" y1="160.5" x2="120" y2="130" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
      <line x1="126.7" y1="163.3" x2="147" y2="143" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />

      {/* --- LAYER 2: 8 Middle Interleaved Petals in Dusty Rose #D6536D --- */}
      <path
        d="M 126.5 172.5 Q 141.0 173.8 149.5 182.0 Q 137.8 181.8 126.5 172.5 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 122.5 176.0 Q 131.8 187.0 132.0 198.8 Q 123.8 190.5 122.5 176.0 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 117.5 176.0 Q 116.2 190.5 108.0 198.8 Q 108.2 187.0 117.5 176.0 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 113.5 172.5 Q 102.2 181.8 90.5 182.0 Q 99.0 173.8 113.5 172.5 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 113.5 167.5 Q 99.0 166.2 90.5 158.0 Q 102.2 158.2 113.5 167.5 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 117.5 164.0 Q 108.2 153.0 108.0 141.2 Q 116.2 149.5 117.5 164.0 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 122.5 164.0 Q 123.8 149.5 132.0 141.2 Q 131.8 153.0 122.5 164.0 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />
      <path
        d="M 126.5 167.5 Q 137.8 158.2 149.5 158.0 Q 141.0 166.2 126.5 167.5 Z"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.7"
      />

      {/* --- LAYER 3: 8 Inner Floral Petals in Soft Pink #FFA2B6 --- */}
      <path
        d="M 124.5 170.0 Q 133.5 167.5 140.5 170.0 Q 133.5 172.5 124.5 170.0 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 123.2 173.2 Q 131.2 178.0 134.5 184.5 Q 128.0 181.2 123.2 173.2 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 120.0 174.5 Q 122.5 183.5 120.0 190.5 Q 117.5 183.5 120.0 174.5 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 116.8 173.2 Q 112.0 181.2 105.5 184.5 Q 108.8 178.0 116.8 173.2 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 115.5 170.0 Q 106.5 172.5 99.5 170.0 Q 106.5 167.5 115.5 170.0 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 116.8 166.8 Q 108.8 162.0 105.5 155.5 Q 112.0 158.8 116.8 166.8 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 120.0 165.5 Q 117.5 156.5 120.0 149.5 Q 122.5 156.5 120.0 165.5 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />
      <path
        d="M 123.2 166.8 Q 128.0 158.8 134.5 155.5 Q 131.2 162.0 123.2 166.8 Z"
        fill="#FFA2B6"
        stroke="#FFFFFF"
        strokeWidth="0.6"
      />

      {/* --- CORE: Concentric Beaded Rings & White Bindu --- */}
      <circle
        cx="120"
        cy="170"
        r="11"
        fill="#1E1518"
        stroke="#EFB11D"
        strokeWidth="1.4"
      />
      <circle
        cx="120"
        cy="170"
        r="7.5"
        fill="#D6536D"
        stroke="#FFA2B6"
        strokeWidth="0.8"
      />
      <circle cx="120" cy="170" r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial Page Load Animations (Hero Section Reveal)
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Header (.navbar): Start hidden (opacity: 0, y: -20) and animate down to natural position
      tl.fromTo(
        ".navbar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0
      );

      // Hero Background (.hero image/overlay): Start at scale: 1.1 and slowly animate to scale: 1 over 2.5s with ease: "power2.out"
      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 2.5, ease: "power2.out" },
          0
        );
      }

      // Center Bag Illustration: Start small and faded (scale: 0.85, opacity: 0, y: 30) and spring up into center (scale: 1, opacity: 1, y: 0) with back.out(1.2)
      if (bagRef.current) {
        tl.fromTo(
          bagRef.current,
          { scale: 0.85, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: "back.out(1.2)" },
          0.4
        );
      }

      // Tagline & Lines: Stagger fade in (opacity: 0 to opacity: 1) slightly after bag settles
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          1.1
        );
      }

      // Scroll Indicator: Fade in last, maintaining a continuous infinite y-axis bounce
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          1.5
        );
      }

      // 2. Scroll-Triggered Parallax (Hero Exit)
      // Background Parallax: Set hero background image to translate slightly down (yPercent: 30) as user scrolls down
      if (bgRef.current && heroRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Foreground Elements Fade: Center bag, tagline, and scroll indicator translate up (y: -100) and fade out (opacity: 0) faster than standard scroll speed (scrub: true)
      const foregroundElements = [
        bagRef.current,
        taglineRef.current,
        scrollIndicatorRef.current,
      ].filter(Boolean);

      if (foregroundElements.length > 0 && heroRef.current) {
        gsap.to(foregroundElements, {
          y: -100,
          opacity: 0,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "65% top",
            scrub: true,
          },
        });
      }
    },
    { scope: heroRef }
  );

  const handleScrollDown = () => {
    const nextEl =
      document.getElementById("new-arrivals") ||
      document.getElementById("benefits-strip") ||
      document.getElementById("hero")?.nextElementSibling;
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Swami Jap Bags Artisan Workshop Showcase"
      className="relative flex h-[calc(100vh-80px)] sm:h-[calc(100vh-85px)] min-h-[620px] w-full flex-col items-center justify-between overflow-hidden px-4 sm:px-6 lg:px-8 mt-[80px] sm:mt-[85px] scroll-mt-[85px]"
    >
      {/* ================================================================
          1. BACKGROUND IMAGE LAYER (For cinematic scale & parallax) & DARK OVERLAY
          ================================================================ */}
      <div
        ref={bgRef}
        className="hero absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none origin-center"
        style={{ backgroundImage: "url('/images/artisan-workshop-bg.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(41, 41, 41, 0.30), rgba(41, 41, 41, 0.48))",
        }}
        aria-hidden="true"
      />

      {/* Subtle top spacer to balance vertical composition */}
      <div className="w-full shrink-0 h-4 sm:h-8" aria-hidden="true" />

      {/* ================================================================
          2. CENTREPIECE — ENLARGED DECORATIVE TOTE ILLUSTRATION & TAGLINE
          ================================================================ */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center my-auto px-2">
        {/* Prominent Central Illustrated Tote Bag (~240px Desktop Width) */}
        <div
          ref={bagRef}
          className="w-[210px] sm:w-[240px] md:w-[250px] drop-shadow-[0_22px_50px_rgba(0,0,0,0.85)] transition-transform hover:scale-[1.02] duration-300"
        >
          <KoklassToteIllustration className="w-full h-auto" />
        </div>

        {/* Double Flanking Lines + Tagline */}
        <div
          ref={taglineRef}
          className="mt-7 sm:mt-9 md:mt-11 flex w-full items-center justify-center gap-2.5 sm:gap-6 md:gap-8 px-2 sm:px-4"
        >
          {/* Left Double Flanking Hairlines */}
          <div className="flex-1 min-w-[20px] sm:min-w-[50px] flex flex-col justify-center gap-[2px] opacity-40">
            <div className="h-[1px] w-full bg-[#DED8CE]" />
            <div className="h-[1px] w-full bg-[#DED8CE]" />
          </div>

          {/* Centered Tagline */}
          <p className="shrink-0 text-center font-sans text-[11px] sm:text-sm md:text-[16px] font-medium uppercase tracking-[0.14em] sm:tracking-[0.2em] md:tracking-[0.22em] text-[#F5F1E9] whitespace-normal sm:whitespace-nowrap select-none">
            DESIGNED FOR EVERYDAY • BUILT WITH PURPOSE
          </p>

          {/* Right Double Flanking Hairlines */}
          <div className="flex-1 min-w-[20px] sm:min-w-[50px] flex flex-col justify-center gap-[2px] opacity-40">
            <div className="h-[1px] w-full bg-[#DED8CE]" />
            <div className="h-[1px] w-full bg-[#DED8CE]" />
          </div>
        </div>
      </div>

      {/* ================================================================
          3. BOTTOM SCROLL INDICATOR
          ================================================================ */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 w-full shrink-0 pb-7 sm:pb-9 flex justify-center"
      >
        <button
          type="button"
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-1.5 text-[#EFB11D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB11D] rounded-sm py-1 px-3 cursor-pointer"
          aria-label="Scroll to explore collections"
        >
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] transition-opacity group-hover:opacity-85 select-none">
            SCROLL
          </span>
          <span
            className="text-sm font-light leading-none motion-safe:animate-bounce"
            aria-hidden="true"
          >
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
