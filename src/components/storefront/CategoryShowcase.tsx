import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface CategoryCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  itemCount: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "tote-bags",
    title: "Tote Bags",
    tagline: "Spacious & Structured",
    description: "Wide compartments, flat base, and comfortable drop straps for workday to weekend.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    href: "/collections/handbags",
    itemCount: "Everyday Carry",
  },
  {
    id: "backpacks",
    title: "Backpacks",
    tagline: "Hands-Free Utility",
    description: "Ergonomic shoulder straps, padded laptop sleeves, and balanced commuter capacity.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    href: "/collections/laptop-bags",
    itemCount: "Work & Travel",
  },
  {
    id: "sling-bags",
    title: "Sling Bags",
    tagline: "Compact Crossbody",
    description: "Curved contours that sit naturally against the body, keeping essentials close at hand.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85",
    href: "/collections/sling-bags",
    itemCount: "Lightweight Move",
  },
  {
    id: "laptop-bags",
    title: "Laptop Bags",
    tagline: "Padded & Work-Ready",
    description: "Shock-absorbing laptop compartments, cable organizers, and weather-resistant shells.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85",
    href: "/collections/laptop-bags",
    itemCount: "Up to 15.6\"",
  },
];

export function CategoryShowcase() {
  return (
    <section id="categories" className="section-pad bg-ivory">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Shop by Category"
            title="Silhouettes for the way you move"
            description="Four foundational shapes tailored for Indian workdays, daily commutes, and relaxed weekends."
          />
          <Link
            href="/collections"
            className="group inline-flex items-center gap-1.5 text-small font-semibold text-charcoal hover:text-brand-orange-hover transition-colors"
          >
            <span>View All Bags</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-[border-color,box-shadow,transform] duration-300 hover:border-charcoal hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04] motion-reduce:transform-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90"
                  aria-hidden="true"
                />

                {/* Badge overlay */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/90 px-3 py-1 text-micro font-semibold uppercase tracking-[0.12em] text-charcoal backdrop-blur-xs">
                    {category.itemCount}
                  </span>
                </div>

                {/* Text overlay on image bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-micro font-medium uppercase tracking-[0.14em] text-white/80">
                    {category.tagline}
                  </p>
                  <h3 className="mt-1 font-serif text-h3 font-medium text-white group-hover:text-soft-pink transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer with description and arrow */}
              <div className="flex flex-1 flex-col justify-between p-4 bg-white">
                <p className="text-caption text-brown-strong line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                  <span className="text-caption font-semibold uppercase tracking-[0.12em] text-charcoal group-hover:text-brand-orange transition-colors">
                    Explore Silhouettes
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-beige text-charcoal transition-colors group-hover:bg-brand-orange group-hover:text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryShowcase;

