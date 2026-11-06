"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CollectionItem {
  id: string;
  badge: string;
  microHeading: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: "shoulder-bags",
    badge: "BESTSELLER",
    microHeading: "EVERYDAY ELEGANCE",
    title: "Shoulder Bags",
    description: "Roomy, structured bags designed for effortless carry.",
    href: "/collections/handbags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "pouches",
    badge: "NEW",
    microHeading: "DAILY USE",
    title: "Pouches",
    description: "Compact zip cases and organizers for your daily essentials.",
    href: "/collections/wallets-accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "sling-bags",
    badge: "LIMITED",
    microHeading: "ON THE MOVE",
    title: "Sling Bags",
    description: "Contoured silhouettes that keep everyday essentials close at hand.",
    href: "/collections/sling-bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "gift-sets",
    badge: "GIFT READY",
    microHeading: "GIVE MEANING",
    title: "Gift Sets",
    description: "Curated everyday combinations presented for thoughtful gifting.",
    href: "/collections",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85",
  },
];

export function ImmersiveCollections() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Reusable Scroll Reveal for Lower Sections (start: "top 85%", y: 40 -> 0, opacity: 0 -> 1)
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const header = sectionRef.current.querySelector(".collections-header");
      const cards = sectionRef.current.querySelectorAll("a");

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
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" },
          "-=0.6"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="collections-grid"
      className="relative bg-ivory py-16 sm:py-20 lg:py-24 border-b border-border/60"
    >
      <div className="container-page">
        {/* Section Header — Left Aligned */}
        <div className="collections-header mb-10 sm:mb-14">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brown">
            WHAT WE MAKE
          </p>
          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-charcoal tracking-tight">
            Collections <span className="italic font-normal">for Every Story</span>
          </h2>
        </div>

        {/* 2x2 Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              className="group relative block aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-charcoal shadow-sm transition-[box-shadow,transform] duration-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {/* Full-bleed Photography */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.image}
                alt={col.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
              />

              {/* Exact Gradient Overlay from specification */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(to top, rgba(41, 41, 41, 0.88) 0%, rgba(41, 41, 41, 0.48) 38%, transparent 72%)",
                }}
                aria-hidden="true"
              />

              {/* Top-Right Badge */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                <span className="inline-flex items-center rounded-full bg-ivory/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-xs backdrop-blur-xs">
                  {col.badge}
                </span>
              </div>

              {/* Bottom-Left Content */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 z-10 text-white flex flex-col items-start">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-ivory/90">
                  {col.microHeading}
                </p>
                <h3 className="mt-1 font-serif text-2xl sm:text-[28px] font-normal text-white group-hover:text-soft-pink transition-colors">
                  {col.title}
                </h3>
                <p className="mt-1.5 font-sans text-[13px] text-ivory/85 line-clamp-2 max-w-md leading-relaxed">
                  {col.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 font-sans text-[12px] font-bold uppercase tracking-wider text-white transition-all group-hover:text-soft-pink">
                  <span>SHOP NOW</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImmersiveCollections;

