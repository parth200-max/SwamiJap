import React from "react";
import { Truck, Sparkles, ShieldCheck, RotateCcw } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Pan India Delivery",
    description: "Free shipping on orders above ₹1,499. Express dispatch across all Indian PIN codes.",
  },
  {
    icon: Sparkles,
    title: "Quality Craftsmanship",
    description: "Handcrafted using considered vegan leathers, water-resistant canvas, and durable hardware.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% encrypted prepaid checkout with instant UPI, Debit/Credit Cards & NetBanking.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day straightforward return and exchange policy for complete peace of mind.",
  },
];

export function BenefitsStrip() {
  return (
    <section
      id="benefits-strip"
      aria-label="Swami Jap Brand Guarantees"
      className="border-y border-border bg-white"
    >
      <div className="container-page py-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-beige/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-dusty-rose/25 bg-dusty-rose-soft text-dusty-rose-deep">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-small font-medium text-charcoal sm:text-base">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-caption text-brown-strong leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BenefitsStrip;
