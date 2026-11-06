"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BagDemonstration {
  id: string;
  name: string;
  href: string;
  blobColor: string;
  blobOpacity: number;
  blobPath: string;
  exteriorImage: string;
  internalItems: { name: string; icon: string }[];
  capacityNote: string;
}

const BAG_ITEMS: BagDemonstration[] = [
  {
    id: "tile-print-sling",
    name: "Tile-Print Sling",
    href: "/collections/sling-bags",
    blobColor: "#FFA2B6",
    blobOpacity: 0.45,
    blobPath:
      "M120,25 C185,8 245,40 262,98 C278,155 260,215 220,252 C180,290 105,295 58,260 C12,225 5,152 28,95 C50,38 68,32 120,25 Z",
    exteriorImage:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",
    capacityNote: "Fits phone, cards, sunglasses & keys",
    internalItems: [
      { name: "Smartphone", icon: "📱" },
      { name: "Card Wallet", icon: "💳" },
      { name: "Lip Balm & Compact", icon: "💄" },
      { name: "Keys & Earbuds", icon: "🔑" },
    ],
  },
  {
    id: "mustard-block-print-tote",
    name: "Mustard Block-Print Tote",
    href: "/collections/handbags",
    blobColor: "#EFB11D",
    blobOpacity: 0.28,
    blobPath:
      "M140,20 C205,12 252,52 268,112 C282,170 252,230 205,268 C158,305 92,292 45,255 C-2,218 8,148 35,92 C62,36 82,24 140,20 Z",
    exteriorImage:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
    capacityNote: "Fits 13\" tablet, water bottle, diary & pouch",
    internalItems: [
      { name: "Tablet / iPad", icon: "💻" },
      { name: "Daily Planner", icon: "📖" },
      { name: "Water Bottle", icon: "🧴" },
      { name: "Zip Organizer", icon: "👛" },
    ],
  },
  {
    id: "indigo-leaf-backpack",
    name: "Indigo Leaf Backpack",
    href: "/collections/laptop-bags",
    blobColor: "#D6536D",
    blobOpacity: 0.35,
    blobPath:
      "M130,22 C195,15 248,48 266,108 C284,165 260,228 212,266 C165,305 98,295 50,258 C2,220 8,150 35,95 C62,40 75,25 130,22 Z",
    exteriorImage:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
    capacityNote: "Fits 15.6\" laptop, charger, headphones & notes",
    internalItems: [
      { name: "15\" Laptop & Sleeve", icon: "💻" },
      { name: "Charging Kit", icon: "🔌" },
      { name: "Over-Ear Headphones", icon: "🎧" },
      { name: "Notebook & Pen", icon: "📝" },
    ],
  },
];

export function SeeWhatFitsInside() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeBag, setActiveBag] = useState<string | null>(null);

  // GSAP Reusable Scroll Reveal for Lower Sections (start: "top 85%", y: 40 -> 0, opacity: 0 -> 1)
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const header = sectionRef.current.querySelector(".see-fits-header");
      const bags = sectionRef.current.querySelectorAll('[role="region"]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      if (header) {
        tl.fromTo(
          header,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
        );
      }

      if (bags.length > 0) {
        tl.fromTo(
          bags,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out" },
          "-=0.6"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="see-what-fits"
      className="relative bg-ivory py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-border/60"
    >
      {/* Decorative Hanging Tassels (Top-Left & Top-Right) — hidden on mobile to avoid text crowding */}
      <div
        className="hidden sm:block absolute top-0 left-6 lg:left-14 pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        <svg
          width="48"
          height="190"
          viewBox="0 0 48 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          {/* Braided hanging cord */}
          <line
            x1="24"
            y1="0"
            x2="24"
            y2="75"
            stroke="#806B59"
            strokeWidth="1.75"
            strokeDasharray="2 3"
          />
          {/* Upper accent bead */}
          <circle cx="24" cy="78" r="4.5" fill="#EFB11D" stroke="#806B59" strokeWidth="1" />
          {/* Central gold bead */}
          <ellipse cx="24" cy="90" rx="7" ry="8" fill="#EFB11D" />
          <ellipse cx="24" cy="90" rx="3.5" ry="4" fill="#806B59" opacity="0.6" />
          {/* Tassel bell collar */}
          <path
            d="M16 102 C16 98 32 98 32 102 L35 114 C35 116 13 116 13 114 Z"
            fill="#EFB11D"
          />
          {/* Tassel skirt */}
          <path
            d="M13 115 L8 165 C8 170 40 170 40 165 L35 115 Z"
            fill="#EFB11D"
            opacity="0.95"
          />
          {/* Fine silk thread fringe accents */}
          <line x1="16" y1="115" x2="13" y2="167" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="115" x2="19" y2="169" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="24" y1="115" x2="24" y2="170" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="28" y1="115" x2="29" y2="169" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="32" y1="115" x2="35" y2="167" stroke="#806B59" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      <div
        className="hidden sm:block absolute top-0 right-6 lg:right-14 pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        <svg
          width="48"
          height="190"
          viewBox="0 0 48 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          {/* Braided hanging cord */}
          <line
            x1="24"
            y1="0"
            x2="24"
            y2="75"
            stroke="#806B59"
            strokeWidth="1.75"
            strokeDasharray="2 3"
          />
          {/* Upper accent bead */}
          <circle cx="24" cy="78" r="4.5" fill="#EFB11D" stroke="#806B59" strokeWidth="1" />
          {/* Central gold bead */}
          <ellipse cx="24" cy="90" rx="7" ry="8" fill="#EFB11D" />
          <ellipse cx="24" cy="90" rx="3.5" ry="4" fill="#806B59" opacity="0.6" />
          {/* Tassel bell collar */}
          <path
            d="M16 102 C16 98 32 98 32 102 L35 114 C35 116 13 116 13 114 Z"
            fill="#EFB11D"
          />
          {/* Tassel skirt */}
          <path
            d="M13 115 L8 165 C8 170 40 170 40 165 L35 115 Z"
            fill="#EFB11D"
            opacity="0.95"
          />
          {/* Fine silk thread fringe accents */}
          <line x1="16" y1="115" x2="13" y2="167" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="115" x2="19" y2="169" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="24" y1="115" x2="24" y2="170" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="28" y1="115" x2="29" y2="169" stroke="#806B59" strokeWidth="1" opacity="0.5" />
          <line x1="32" y1="115" x2="35" y2="167" stroke="#806B59" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="see-fits-header text-center max-w-2xl mx-auto mb-14 sm:mb-16 px-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-charcoal tracking-tight">
            See What Fits Inside!
          </h2>
          <p className="mt-3 font-sans text-[13px] sm:text-[14px] text-brown leading-relaxed">
            Hover over the bags to view a transparent preview of what fits inside.
          </p>
        </div>

        {/* 3-Column Interactive Bag Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 lg:gap-12">
          {BAG_ITEMS.map((bag) => {
            const isManuallyActive = activeBag === bag.id;

            return (
              <div
                key={bag.id}
                className="group flex flex-col items-center focus-visible:outline-none cursor-pointer"
                onMouseEnter={() => setActiveBag(bag.id)}
                onMouseLeave={() => setActiveBag(null)}
                onClick={() => setActiveBag(isManuallyActive ? null : bag.id)}
                tabIndex={0}
                role="region"
                aria-label={`Interactive preview for ${bag.name}`}
              >
                {/* Bag Stage with Watercolor Blob and Stacked Preview */}
                <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center p-3">
                  {/* Organic Watercolor Blob in Background */}
                  <svg
                    viewBox="0 0 280 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-editorial group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <defs>
                      <filter id={`filter-${bag.id}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                      </filter>
                    </defs>
                    <path
                      d={bag.blobPath}
                      fill={bag.blobColor}
                      fillOpacity={bag.blobOpacity}
                      filter={`url(#filter-${bag.id})`}
                    />
                  </svg>

                  {/* Exterior Product Image Container */}
                  <div
                    className={`relative z-10 w-full h-full max-h-[250px] max-w-[270px] rounded-2xl overflow-hidden bg-white/70 border border-border/60 shadow-sm flex items-center justify-center p-2.5 transition-all duration-300 ease-in-out ${
                      isManuallyActive
                        ? "opacity-15 scale-95"
                        : "opacity-100 group-hover:opacity-15 group-hover:scale-95"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bag.exteriorImage}
                      alt={bag.name}
                      loading="lazy"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Transparent Internal Contents Preview Overlay */}
                  <div
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-3 transition-all duration-300 ease-in-out pointer-events-none ${
                      isManuallyActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95"
                    }`}
                  >
                    <div className="w-full max-w-[270px] rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-md p-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-charcoal text-white text-[9px] font-bold uppercase tracking-wider mb-2">
                        <span>Interior Capacity</span>
                      </div>

                      <p className="font-serif text-[14px] font-medium text-charcoal mb-3">
                        {bag.capacityNote}
                      </p>

                      {/* Items Grid */}
                      <div className="grid grid-cols-2 gap-2 text-left">
                        {bag.internalItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 rounded-lg bg-beige px-2 py-1.5 border border-border/60 text-[11px] text-charcoal font-sans"
                          >
                            <span className="text-sm">{item.icon}</span>
                            <span className="truncate">{item.name}</span>
                          </div>
                        ))}
                      </div>

                      <p className="mt-2.5 font-sans text-[10px] text-brown tracking-wide">
                        Tap / hover to view exterior
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Caption Link */}
                <Link
                  href={bag.href}
                  className="mt-4 font-serif text-[17px] sm:text-[18px] text-charcoal font-normal hover:text-dusty-rose transition-colors text-center"
                >
                  {bag.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SeeWhatFitsInside;
