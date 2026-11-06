"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { INITIAL_CATEGORIES } from "@/lib/products-data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = [{ id: "all", name: "All" }, ...INITIAL_CATEGORIES];

  const filteredProducts = products
    .filter((product) => {
      const isArchived = product.status === "ARCHIVED" || product.isArchived;
      if (selectedCategory === "all") return !isArchived;
      return !isArchived && product.categoryId === selectedCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  return (
    <section id="collection" className="section-pad bg-ivory">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The Collection"
            title="Bags for the everyday"
            description="Practical silhouettes, honest materials, and details that make the daily routine feel considered."
          />

          <div className="w-full sm:w-auto">
            <label
              htmlFor="product-sort"
              className="mb-1.5 block text-caption font-medium uppercase tracking-[0.12em] text-brown-strong"
            >
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-11 w-full rounded-md border border-border bg-white px-3.5 text-small text-charcoal transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 sm:w-52"
              id="product-sort"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-9 flex items-center gap-1 overflow-x-auto border-b border-border pb-0">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={isActive}
                className={`relative -mb-px whitespace-nowrap border-b-2 px-4 py-3 text-small transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-inset ${
                  isActive
                    ? "border-brand-orange font-medium text-charcoal"
                    : "border-transparent text-brown-strong hover:border-border-strong hover:text-charcoal"
                }`}
                id={`filter-${category.id}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-white px-6 py-16 text-center">
            <p className="font-serif text-h4 text-charcoal">
              No products found
            </p>
            <p className="mt-2 text-small text-brown-strong">
              Try a different category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
