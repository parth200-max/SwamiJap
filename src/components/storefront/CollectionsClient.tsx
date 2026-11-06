"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export interface CategoryCardData {
  id: string;
  title: string;
  overline: string;
  description: string;
  href: string;
  image: string;
  badge?: string;
  keywords: string[];
}

const CATEGORY_CARDS: CategoryCardData[] = [
  {
    id: "handpurse",
    title: "Handpurse",
    overline: "HANDCRAFTED",
    description: "Compact structured purses designed for timeless everyday elegance.",
    href: "/collections/handbags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    keywords: ["handpurse", "purse", "handbag", "handcrafted"],
  },
  {
    id: "organiser",
    title: "Organiser",
    overline: "HANDCRAFTED",
    description: "Padded folios, travel sleeves, and multi-compartment accessories.",
    href: "/collections/wallets-accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85",
    keywords: ["organiser", "organizer", "folio", "saree covers", "cases"],
  },
  {
    id: "pouches",
    title: "Pouches",
    overline: "DAILY ESSENTIALS",
    badge: "NEW",
    description: "Embroidered zip cases and cosmetic pouches for quick essentials.",
    href: "/collections/wallets-accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85",
    keywords: ["pouches", "pouch", "daily essentials", "cosmetic", "zip"],
  },
  {
    id: "shoulder-bag",
    title: "Shoulder Bag",
    overline: "HANDCRAFTED",
    description: "Structured silhouette with comfortable shoulder drop and flat base.",
    href: "/collections/handbags",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85",
    keywords: ["shoulder bag", "tote", "duffel", "shoulder"],
  },
  {
    id: "shoulder-bags-classic",
    title: "Shoulder Bags",
    overline: "CLASSIC STYLE",
    badge: "NEW",
    description: "Wide compartments woven with care for workday to relaxed weekends.",
    href: "/collections/handbags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    keywords: ["shoulder bags", "classic style", "work bag", "commute"],
  },
  {
    id: "sling-bags",
    title: "Sling Bags",
    overline: "HANDCRAFTED",
    description: "Curved contours and adjustable crossbodies for effortless movement.",
    href: "/collections/sling-bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85",
    keywords: ["sling bags", "sling", "crossbody", "belt bag"],
  },
];

export function CollectionsClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return CATEGORY_CARDS;
    return CATEGORY_CARDS.filter(
      (cat) =>
        cat.title.toLowerCase().includes(q) ||
        cat.overline.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.keywords.some((kw) => kw.includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="space-y-12">
      {/* 1. Tab Bar & Functional Search Strip */}
      <div className="border-b border-border pb-4">
        {/* Active ALL Tab with solid Charcoal Underline */}
        <div className="flex items-center gap-8 mb-6">
          <button
            type="button"
            className="font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-charcoal border-b-2 border-charcoal pb-2.5 inline-block focus:outline-none"
          >
            ALL
          </button>
        </div>

        {/* Search Bar + Tagline Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Functional Category Search Input */}
          <div className="relative w-full max-w-sm">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brown pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bags"
              aria-label="Search bag collections"
              className="w-full rounded-md border border-border bg-[#F5F1E9] pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-brown-strong/60 focus:border-charcoal focus:bg-white focus:outline-none transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-caption text-brown hover:text-charcoal"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Editorial Tagline */}
          <p className="font-serif italic text-sm sm:text-base text-dusty-rose-deep font-normal select-none">
            Each one is unique ✦
          </p>
        </div>
      </div>

      {/* 2. Shop By Category Overline */}
      <div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brown mb-6">
          SHOP BY CATEGORY
        </p>

        {/* 3-Column Landscape Category Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-charcoal shadow-sm transition-[box-shadow,transform] duration-500 hover:shadow-lg hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                {/* Full-bleed Category Photography */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(41, 41, 41, 0.88) 0%, rgba(41, 41, 41, 0.45) 42%, transparent 75%)",
                  }}
                  aria-hidden="true"
                />

                {/* Top-Right Badge if present */}
                {cat.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-ivory/95 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-charcoal shadow-xs">
                      {cat.badge}
                    </span>
                  </div>
                )}

                {/* Bottom-Left Editorial Content */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white flex flex-col items-start">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-ivory/90">
                    {cat.overline}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl sm:text-[26px] font-normal text-white group-hover:text-soft-pink transition-colors">
                    {cat.title}
                  </h3>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-white transition-all group-hover:text-soft-pink">
                    <span>SHOP NOW</span>
                    <ArrowRight
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#F5F1E9] rounded-2xl border border-border">
            <p className="font-serif italic text-xl text-charcoal">
              No categories matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 font-sans text-xs uppercase tracking-wider font-semibold text-brand-orange hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* 3. Custom-Order Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#B83A1B] text-white p-8 sm:p-12 lg:p-16 text-center shadow-md">
        {/* Watermark brand lettering in background */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden opacity-[0.07]"
          aria-hidden="true"
        >
          <span className="font-serif font-bold text-[140px] sm:text-[200px] lg:text-[240px] tracking-widest text-white leading-none whitespace-nowrap">
            SWAMI JAP
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <p className="font-serif italic text-sm sm:text-base text-mustard-soft">
            can&apos;t find what you&apos;re looking for?
          </p>

          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-white leading-tight">
            Commission your own custom piece.
          </h2>

          <p className="mt-3 font-sans text-sm sm:text-base text-ivory/90 leading-relaxed max-w-xl">
            Tell us your vision — the craft, the colours, the occasion — and we will create something made only for you.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-mustard px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal shadow-sm transition-all duration-200 hover:bg-mustard-hover hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>START A CUSTOM ORDER</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionsClient;

