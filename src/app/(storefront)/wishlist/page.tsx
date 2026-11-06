"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import ProductCard from "@/components/storefront/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { buttonStyles } from "@/lib/button-styles";

export default function WishlistPage() {
  const { items, totalItems, clearWishlist } = useWishlist();

  return (
    <div className="section-pad pt-28 sm:pt-32 bg-ivory min-h-[70vh]">
      <div className="container-page">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Wishlist" }]} />

        {/* Header */}
        <div className="mt-4 pb-8 border-b border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <Badge variant="rose">Saved Items</Badge>
            <h1 className="mt-4 font-serif text-h1 font-medium text-charcoal leading-tight">
              My <span className="italic text-dusty-rose-deep">Wishlist</span>
            </h1>
            <p className="mt-2 text-lead text-charcoal-soft font-sans">
              {totalItems > 0
                ? `You have ${totalItems} ${totalItems === 1 ? "bag" : "bags"} saved for later.`
                : "Your saved collection of favourite silhouettes."}
            </p>
          </div>

          {totalItems > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 text-caption font-semibold text-charcoal-soft hover:text-danger-text transition-colors"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Wishlist Content */}
        <div className="pt-10">
          {totalItems > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="You haven't saved any bags yet. Explore our handcrafted silhouettes and click the heart icon on any card to save it here for later."
              actionHref="/collections"
              actionLabel="Explore Collections"
            />
          )}

          {totalItems > 0 && (
            <div className="mt-12 text-center pt-8 border-t border-border">
              <Link
                href="/collections"
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

