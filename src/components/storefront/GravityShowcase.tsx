"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, ShoppingBag, Star, Truck } from "lucide-react";
import { buttonStyles } from "@/lib/button-styles";

const PILLARS = [
  {
    icon: ShoppingBag,
    title: "Considered design",
    description:
      "Every bag starts with how you actually use it. Pockets where they belong, straps that sit right, closures that work one-handed.",
  },
  {
    icon: Star,
    title: "Honest materials",
    description:
      "We use materials that are practical, durable, and look better with use. No exaggerated claims, just quality you can feel.",
  },
  {
    icon: Truck,
    title: "Fast, free delivery",
    description:
      "Free shipping on all orders above ₹999. Most orders arrive within 4–6 business days.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description:
      "Changed your mind? Returns are straightforward. Initiate within 7 days and we'll sort it.",
  },
];

export function BrandShowcase() {
  return (
    <section
      id="story"
      className="section-pad border-y border-border bg-white"
    >
      <div className="container-page">
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3 text-dusty-rose-deep">
              <span className="h-px w-8 bg-dusty-rose" aria-hidden="true" />
              About Swami Jap
            </p>

            <h2 className="mt-5 font-serif text-h2 font-medium text-charcoal">
              Designed for the{" "}
              <span className="italic text-dusty-rose-deep">
                way you move.
              </span>
            </h2>

            <p className="mt-5 text-body text-charcoal-soft">
              From everyday essentials to workday companions, Swami Jap brings
              together thoughtful details, versatile silhouettes, and practical
              design to create bags that fit naturally into your routine.
            </p>
            <p className="mt-4 text-small text-charcoal-soft">
              We believe a well-designed bag should work as hard as you do —
              holding everything you need without making you think about it.
              That means getting the small things right: the placement of a zip
              pocket, the drop of a strap, the ease of a closure.
            </p>

            <div className="mt-7">
              <Link
                href="#collection"
                className={buttonStyles({ variant: "primary", size: "md" })}
                id="brand-story-cta"
              >
                Shop the Collection
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -bottom-5 -right-5 hidden h-32 w-32 rounded-sm bg-mustard sm:block"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-beige">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85"
                alt="Swami Jap bags arranged for an editorial still life"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-28 w-28 overflow-hidden rounded-md border-4 border-white shadow-sm sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=300&q=85"
                alt="Close-up of a Swami Jap bag detail"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bg-beige p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-dusty-rose/20 bg-dusty-rose-soft text-dusty-rose-deep">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span
                    className="font-serif text-small italic text-brown-strong/70"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-h4 font-medium text-charcoal">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-small text-charcoal-soft">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BrandShowcase;
