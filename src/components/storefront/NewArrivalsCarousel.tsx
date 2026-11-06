"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/types";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "@/lib/products-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NewArrivalsCarouselProps {
  products?: Product[];
}

export function NewArrivalsCarousel({ products = INITIAL_PRODUCTS }: NewArrivalsCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // GSAP Reusable Scroll Reveal for Lower Sections (start: "top 85%", y: 40 -> 0, opacity: 0 -> 1)
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const header = sectionRef.current.querySelector(".new-in-header");
      const cards = sectionRef.current.querySelectorAll("[data-carousel-item]");

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

      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power2.out" },
          "-=0.6"
        );
      }
    },
    { scope: sectionRef }
  );

  // Helper to map category id to readable uppercase category name
  const getCategoryName = (categoryId?: string | null) => {
    if (!categoryId) return "BAGS";
    const found = INITIAL_CATEGORIES.find((c) => c.id === categoryId || c.slug === categoryId);
    return found ? found.name.toUpperCase() : "EVERYDAY BAG";
  };

  // Check scroll bounds to enable/disable arrow buttons
  const checkScrollBounds = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);
    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [checkScrollBounds]);

  const scroll = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-carousel-item]")?.offsetWidth ?? 320;
    const scrollAmount = (cardWidth + 20) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const displayProducts = products && products.length > 0 ? products : INITIAL_PRODUCTS;

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="relative bg-ivory py-16 sm:py-20 lg:py-24 border-b border-border/60 overflow-hidden"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="new-in-header text-center mb-10 sm:mb-14">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-dusty-rose">
            — JUST ARRIVED —
          </p>
          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal tracking-tight">
            New <span className="italic font-normal">In</span>
          </h2>
        </div>

        {/* Carousel Container with Arrows */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous products"
            className="absolute -left-3 sm:-left-5 top-[38%] -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-charcoal shadow-md border border-border/80 transition-all duration-200 hover:bg-beige hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next products"
            className="absolute -right-3 sm:-right-5 top-[38%] -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-charcoal shadow-md border border-border/80 transition-all duration-200 hover:bg-beige hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>

          {/* Scrollable Products Strip */}
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayProducts.map((product) => {
              const imageSrc =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85";

              const categoryLabel = getCategoryName(product.categoryId);
              const subtitle = product.material || product.tagline || "Handcrafted Edition";

              return (
                <div
                  key={product.id}
                  data-carousel-item
                  className="flex-shrink-0 w-[72%] sm:w-[46%] md:w-[31%] lg:w-[calc(25%-18px)] snap-start"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-2xl"
                  >
                    {/* Image Card Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-beige border border-border/70 p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group-hover:border-charcoal/40 group-hover:shadow-md">
                      {/* Pill Badge Top-Left */}
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-charcoal px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                        NEW IN
                      </span>

                      {/* Product Image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc}
                        alt={product.title || product.name}
                        loading="lazy"
                        className="h-full w-full object-cover rounded-xl transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
                      />

                      {/* Quick "View Details" Pill Overlay on Hover */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-charcoal shadow-sm backdrop-blur-xs whitespace-nowrap">
                          VIEW DETAILS
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    {/* Product Details Below Image */}
                    <div className="mt-3.5 flex flex-col text-left">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-dusty-rose">
                        {categoryLabel}
                      </p>
                      <h3 className="mt-1 font-sans text-[15px] font-medium text-charcoal line-clamp-1 transition-colors group-hover:text-dusty-rose">
                        {product.title || product.name}
                      </h3>
                      <p className="mt-0.5 font-sans text-[13px] text-brown line-clamp-1">
                        {subtitle}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivalsCarousel;
