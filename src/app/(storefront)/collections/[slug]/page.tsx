import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/storefront/ProductCard";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, getCategoryBySlug } from "@/lib/products-data";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: "Category Not Found | Swami Jap" };
  }
  return {
    title: `${category.name} | Swami Jap`,
    description: category.description || "Explore curated Swami Jap bags.",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  // Branded Category Empty State (Task 3 & Reference Image 4)
  if (!category) {
    return (
      <div className="bg-ivory min-h-[65vh] flex flex-col items-center justify-center px-4 py-24 sm:py-36 text-center">
        <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] font-normal text-charcoal tracking-tight">
          Category not found.
        </h1>
        <Link
          href="/collections"
          className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.16em] font-semibold text-brown hover:text-brand-orange transition-colors"
        >
          <span>← BACK TO COLLECTIONS</span>
        </Link>
      </div>
    );
  }

  const products = INITIAL_PRODUCTS.filter(
    (p) => p.categoryId === category.id
  );

  return (
    <div className="section-pad pt-28 sm:pt-32 bg-ivory min-h-screen">
      <div className="container-page">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Collections", href: "/collections" },
            { label: category.name },
          ]}
        />

        {/* Category Header */}
        <div className="mt-4 pb-8 border-b border-border">
          <Badge variant="rose">Collection</Badge>
          <h1 className="mt-4 font-serif text-h1 font-medium text-charcoal leading-tight">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lead text-charcoal-soft font-sans leading-relaxed">
            {category.description ||
              "Thoughtfully designed silhouettes crafted with honest materials and functional elegance."}
          </p>

          {/* Navigation Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Link
              href="/collections"
              className="rounded-full border border-border bg-white px-4 py-2 text-caption font-medium text-charcoal-soft transition-colors hover:border-charcoal hover:text-charcoal hover:bg-beige"
            >
              All Bags ({INITIAL_PRODUCTS.length})
            </Link>
            {INITIAL_CATEGORIES.map((cat) => {
              const isActive = cat.slug === slug || (category && category.id === cat.id);
              return (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  className={`rounded-full px-4 py-2 text-caption font-semibold transition-colors shadow-xs ${
                    isActive
                      ? "border border-brand-orange bg-brand-orange text-white"
                      : "border border-border bg-white text-charcoal-soft hover:border-charcoal hover:text-charcoal hover:bg-beige"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="pt-10">
          <div className="flex items-center justify-between pb-6 text-caption text-brown-strong">
            <span>
              Showing {products.length} {products.length === 1 ? "design" : "designs"} in {category.name}
            </span>
            <span className="font-mono text-micro uppercase tracking-wider">
              Pan India Delivery
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-beige rounded-2xl border border-border">
              <p className="font-serif italic text-xl text-charcoal">
                No designs currently in stock for this collection.
              </p>
              <Link
                href="/collections"
                className="mt-4 inline-block font-sans text-xs uppercase tracking-wider font-semibold text-brand-orange hover:underline"
              >
                Browse All Collections
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
