import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Feather, HeartHandshake } from "lucide-react";
import HeroSection from "@/components/storefront/HeroSection";
import NewArrivalsCarousel from "@/components/storefront/NewArrivalsCarousel";
import ImmersiveCollections from "@/components/storefront/ImmersiveCollections";
import SeeWhatFitsInside from "@/components/storefront/SeeWhatFitsInside";
import CustomerTestimonials from "@/components/storefront/CustomerTestimonials";
import ProductGrid from "@/components/storefront/ProductGrid";
import EditorialBanner from "@/components/storefront/EditorialBanner";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import prisma from "@/lib/prisma";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/lib/button-styles";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Swami Jap | Thoughtfully Designed Everyday Bags",
  description:
    "Contemporary structured totes, ergonomic backpacks, lightweight slings, and everyday accessories crafted with considered details, honest materials, and functional elegance.",
};

async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbProducts.length > 0) {
      return dbProducts.map((product) => ({
        ...product,
        name: product.title,
        price: Number(product.price),
        compareAt: product.compareAt ? Number(product.compareAt) : null,
        compareAtPrice: product.compareAt
          ? Number(product.compareAt)
          : null,
        stock: product.inventory,
      }));
    }
  } catch {
    // Database offline or not migrated yet; serve the curated fallback
    // collection so the storefront remains previewable.
  }

  return INITIAL_PRODUCTS;
}

export default async function StorefrontPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col bg-ivory text-charcoal">
      {/* 1. Hero Showcase with Editorial Copy & Bag Carousel */}
      <HeroSection />

      {/* 2. New Arrivals Product Carousel */}
      <NewArrivalsCarousel products={products} />

      {/* 3. Immersive Collections Grid */}
      <ImmersiveCollections />

      {/* 4. Interactive "See What Fits Inside" Bag Demonstration */}
      <SeeWhatFitsInside />

      {/* 5. Customer Testimonials & Stories */}
      <CustomerTestimonials />

      {/* 4. Promotional Editorial Banner (Dusty Rose & Lifestyle Photography) */}
      <EditorialBanner />

      {/* 5. Complete Collection Grid with Filter Tabs & Sorting */}
      <ProductGrid products={products} />

      {/* 6. Brand Story & Craftsmanship Ethos */}
      <section
        id="story"
        className="section-pad border-t border-border bg-beige scroll-mt-20"
      >
        <div id="ethos" className="container-page scroll-mt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Badge variant="rose">Our Story &amp; Design Ethos</Badge>

              <h2 className="mt-5 font-serif text-h2 font-medium text-charcoal leading-snug">
                Designed for the rhythm of your{" "}
                <span className="italic text-dusty-rose-deep">
                  daily life
                </span>
              </h2>

              <p className="mt-5 text-body text-charcoal-soft leading-relaxed font-sans">
                At Swami Jap, we believe a great bag is one you reach for
                instinctively every morning. It should carry your laptop, phone,
                keys, and daily essentials with grace — without being heavy,
                fussy, or fragile.
              </p>
              <p className="mt-4 text-body text-charcoal-soft leading-relaxed font-sans">
                Every silhouette is designed with practical compartments,
                durable hardware, and refined textures that transition
                seamlessly from office commutes to weekend dinners.
              </p>

              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-white p-4">
                  <Feather
                    className="h-5 w-5 text-dusty-rose-deep"
                    aria-hidden="true"
                  />
                  <dt className="mt-3 font-serif text-small font-medium text-charcoal">
                    Lightweight Build
                  </dt>
                  <dd className="mt-1 text-caption text-brown-strong">
                    Structured yet comfortable on the shoulder all day
                  </dd>
                </div>
                <div className="rounded-md border border-border bg-white p-4">
                  <HeartHandshake
                    className="h-5 w-5 text-dusty-rose-deep"
                    aria-hidden="true"
                  />
                  <dt className="mt-3 font-serif text-small font-medium text-charcoal">
                    Fair &amp; Transparent
                  </dt>
                  <dd className="mt-1 text-caption text-brown-strong">
                    Honest Indian pricing without artificial luxury markups
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/collections"
                  className={buttonStyles({ variant: "primary", size: "md" })}
                >
                  Shop the Collection
                </Link>
                <Link
                  href="/our-story"
                  className={buttonStyles({ variant: "outline", size: "md" })}
                >
                  Read Our Story
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                <div
                  className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-sm bg-mustard sm:block"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                    alt="Swami Jap bag craftsmanship and everyday details"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-md border border-border bg-white/95 px-4 py-3 backdrop-blur-sm">
                    <span className="text-caption font-semibold uppercase tracking-[0.14em] text-charcoal">
                      Made with care
                    </span>
                    <span className="text-caption text-brown-strong font-serif italic">
                      Est. 2026 · India
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="mt-6 rounded-md bg-mustard p-6 text-charcoal">
                <p className="font-serif text-h3 font-medium">
                  “A good bag should disappear into your day.”
                </p>
                <footer className="mt-3 text-caption font-semibold uppercase tracking-[0.14em] text-mustard-deep">
                  The Swami Jap design note
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
