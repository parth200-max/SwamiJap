"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ArrowRight, ShoppingBag } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const QUICK_FILTERS = ["All", "Tote", "Sling", "Laptop", "Duffel", "Wallet"];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const { addItem } = useCart();

  const results = useMemo(() => {
    let list = INITIAL_PRODUCTS;

    if (activeFilter !== "All") {
      const filterLower = activeFilter.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(filterLower) ||
          (p.tagline && p.tagline.toLowerCase().includes(filterLower)) ||
          p.slug.toLowerCase().includes(filterLower)
      );
    }

    if (!query.trim()) return list;

    const q = query.toLowerCase().trim();
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q)) ||
        (p.color && p.color.toLowerCase().includes(q))
    );
  }, [query, activeFilter]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Search Swami Jap Bags"
      maxWidth="2xl"
      className="p-0 overflow-hidden"
    >
      <div className="p-4 sm:p-6 bg-white border-b border-border">
        <div className="relative flex items-center">
          <Search
            className="absolute left-3.5 h-5 w-5 text-brown-strong pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tote bags, slings, laptop sleeves, leather..."
            autoFocus
            className="h-12 w-full rounded-md border border-border bg-beige/60 pl-11 pr-10 text-small text-charcoal placeholder:text-brown-strong/70 transition-colors focus:border-brand-orange focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 rounded-full p-1 text-brown-strong hover:bg-border/60 hover:text-charcoal"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-caption font-medium uppercase tracking-[0.1em] text-brown-strong mr-1">
            Quick suggestions:
          </span>
          {QUICK_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-1 text-caption font-medium transition-colors ${
                  isActive
                    ? "bg-brand-orange text-white"
                    : "bg-beige text-charcoal hover:bg-border"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results List */}
      <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-4 sm:p-6 divide-y divide-border/60 bg-ivory/40">
        {results.length > 0 ? (
          <div className="space-y-3">
            <p className="text-caption uppercase tracking-[0.1em] text-brown-strong mb-2">
              Found {results.length} bag{results.length === 1 ? "" : "s"}
            </p>
            {results.map((product) => (
              <div
                key={product.id}
                className="group flex items-center justify-between gap-4 rounded-md border border-border bg-white p-3 transition-colors hover:border-charcoal hover:shadow-xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-16 w-16 shrink-0 rounded-sm border border-border bg-beige object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate font-serif text-small font-medium text-charcoal group-hover:text-brand-orange-hover">
                        {product.title}
                      </h4>
                      {product.isFeatured && (
                        <Badge variant="mustard" size="sm">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="line-clamp-1 text-caption text-brown-strong mt-0.5">
                      {product.tagline || product.description}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-small font-semibold text-charcoal">
                        {formatINR(product.price)}
                      </span>
                      {product.compareAt && (
                        <span className="text-caption text-brown-strong line-through">
                          {formatINR(product.compareAt)}
                        </span>
                      )}
                      {product.color && (
                        <span className="text-micro text-brown-strong border-l border-border pl-2 uppercase tracking-[0.08em]">
                          {product.color}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                  className="shrink-0"
                >
                  <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Search className="mx-auto h-8 w-8 text-brown-strong/50" aria-hidden="true" />
            <p className="mt-3 font-serif text-h4 text-charcoal">
              No matching bags found
            </p>
            <p className="mt-1 text-small text-brown-strong max-w-xs mx-auto">
              Try searching with a broader term or select one of the category chips above.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-border bg-white px-4 py-3 flex items-center justify-between text-caption text-brown-strong">
        <span>Free delivery on orders above ₹1,499</span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 font-medium text-charcoal hover:text-brand-orange"
        >
          Close <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </Modal>
  );
}

export default SearchModal;

