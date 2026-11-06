import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Feather, ShieldCheck, Sparkles } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/lib/button-styles";

export const metadata: Metadata = {
  title: "Our Story & Design Ethos | Swami Jap",
  description:
    "Learn about Swami Jap's design philosophy: practical proportions, honest materials, and contemporary Indian craftsmanship tailored for everyday living.",
};

const VALUES = [
  {
    icon: Feather,
    title: "Lightweight Structure",
    description:
      "Engineered frames and balanced strap drops that sit comfortably against your body without unnecessary bulk or strain.",
  },
  {
    icon: Sparkles,
    title: "Purposeful Compartments",
    description:
      "Every pocket, zip, and divider is sized for real items: phones, laptops, keys, pens, and daily essentials within immediate reach.",
  },
  {
    icon: ShieldCheck,
    title: "Durable Materials",
    description:
      "Resilient vegan leathers, high-density canvas, and reinforced metal hardware selected to withstand the demands of Indian daily commutes.",
  },
];

export default function OurStoryPage() {
  return (
    <div className="section-pad pt-28 sm:pt-32 bg-ivory">
      <div className="container-page">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Our Story" }]} />

        {/* Hero Banner */}
        <div className="mt-4 pb-12 border-b border-border">
          <Badge variant="rose">Our Story &amp; Ethos</Badge>
          <h1 className="mt-4 font-serif text-display font-medium text-charcoal leading-tight max-w-3xl">
            Designed for the rhythm of{" "}
            <span className="italic text-dusty-rose-deep">everyday life.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-charcoal-soft font-sans leading-relaxed">
            At Swami Jap, we believe a great bag is one you reach for instinctively each morning. It should carry what your day demands with understated grace — neither heavy, fussy, nor fragile.
          </p>
        </div>

        {/* Editorial Narrative Grid */}
        <div className="py-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-body text-charcoal-soft font-sans leading-relaxed">
            <h2 className="font-serif text-h2 font-medium text-charcoal leading-snug">
              Every detail considered. Nothing unnecessary added.
            </h2>
            <p>
              Modern life is in constant motion — office hours, metro commutes, quick meetings, and weekend getaways. Too often, bags either sacrifice structure for lightness, or become uncomfortably heavy with decorative hardware.
            </p>
            <p>
              Swami Jap was created to strike that essential balance. We obsess over weight distribution, strap drop length, internal pocket dimensions, and hardware durability so that your bag feels effortless from your first morning step to your evening return.
            </p>
            <blockquote className="rounded-md border-l-4 border-brand-orange bg-beige p-5 text-charcoal font-serif italic text-base">
              “A good bag should disappear into your day — quietly keeping everything in place while you focus on where you are going.”
            </blockquote>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-white shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                alt="Swami Jap craftsmanship and workshop details"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-md border border-border bg-white/95 px-4 py-3 backdrop-blur-xs">
                <span className="text-caption font-semibold uppercase tracking-wider text-charcoal">
                  Considered Craft
                </span>
                <span className="text-caption font-serif italic text-brown-strong">
                  Contemporary Indian Design
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Design Pillars */}
        <div className="py-12 border-t border-border">
          <h2 className="font-serif text-h2 font-medium text-charcoal text-center">
            Our Guiding Design Pillars
          </h2>
          <p className="mt-2 text-center text-lead text-charcoal-soft max-w-xl mx-auto font-sans">
            Three principles that shape every silhouette we craft.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-lg border border-border bg-white p-6 shadow-xs transition-colors hover:border-charcoal hover:bg-beige/40"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-mustard/20 text-mustard-deep">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-h3 font-medium text-charcoal">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-small text-charcoal-soft leading-relaxed font-sans">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 rounded-xl border border-border bg-beige/60 p-8 sm:p-12 text-center">
          <h3 className="font-serif text-h2 font-medium text-charcoal">
            Find the bag that fits your routine.
          </h3>
          <p className="mt-3 text-lead text-charcoal-soft max-w-lg mx-auto font-sans">
            Explore our curated silhouettes designed for daily journeys and workdays.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collections"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Shop All Bags
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

