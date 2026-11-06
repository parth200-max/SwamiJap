"use client";

import React, { useState } from "react";
import { Check, Eye, Plus } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80";

function getImageUrl(image: unknown): string {
  if (typeof image === "string") return image;
  if (image && typeof (image as { url?: string }).url === "string") {
    return (image as { url: string }).url;
  }
  return FALLBACK_IMAGE;
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayName = product.title || product.name || "Swami Jap Bag";
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [FALLBACK_IMAGE];
  const primaryImage = getImageUrl(images[0]);
  const comparePrice = product.compareAt || product.compareAtPrice;
  const discount =
    comparePrice && comparePrice > product.price
      ? Math.round(((comparePrice - product.price) / comparePrice) * 100)
      : null;

  const stockLevel = product.stock ?? product.inventory ?? 0;
  const isLowStock = stockLevel > 0 && stockLevel <= 5;
  const isOutOfStock = stockLevel <= 0;

  const handleQuickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-sm">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-beige">
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="absolute inset-0 h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange"
            aria-label={`View details for ${displayName}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={primaryImage}
              alt={displayName}
              className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          </button>

          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {discount && (
              <Badge variant="rose" size="sm">
                -{discount}%
              </Badge>
            )}
            {product.isFeatured && !discount && (
              <Badge variant="mustard" size="sm">
                New
              </Badge>
            )}
            {isLowStock && (
              <Badge variant="mustard" size="sm">
                Low stock
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="neutral" size="sm">
                Sold out
              </Badge>
            )}
          </div>

          <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 transition-opacity duration-200">
            <WishlistButton product={product} size="sm" />
            <button
              type="button"
              onClick={() => setIsDetailOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-brown-strong shadow-xs transition-colors hover:border-charcoal hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-label={`Quick view ${displayName}`}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {!isOutOfStock && (
            <div className="absolute inset-x-0 bottom-0 z-20 hidden translate-y-full transition-transform duration-300 ease-editorial group-hover:translate-y-0 group-focus-within:translate-y-0 sm:block">
              <button
                type="button"
                onClick={handleQuickAdd}
                className="flex w-full items-center justify-center gap-2 bg-brand-orange-cta px-4 py-3 text-small font-medium text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                {isAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Added to bag
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Add to bag
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="flex flex-1 flex-col p-4">
          {product.color && (
            <p className="text-micro uppercase tracking-[0.12em] text-brown-strong">
              {product.color}
            </p>
          )}

          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="mt-1 text-left font-serif text-base font-medium leading-snug text-charcoal transition-colors hover:text-dusty-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:text-lg"
          >
            {displayName}
          </button>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-small font-semibold text-charcoal">
              {formatINR(product.price)}
            </span>
            {comparePrice && comparePrice > product.price && (
              <span className="text-caption text-brown-strong line-through">
                {formatINR(comparePrice)}
              </span>
            )}
          </div>

          {isOutOfStock ? (
            <p className="mt-2 text-caption text-brown-strong">Out of stock</p>
          ) : (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-white text-caption font-medium text-charcoal transition-colors hover:border-charcoal hover:bg-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:hidden"
            >
              {isAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Add to bag
                </>
              )}
            </button>
          )}
        </div>
      </article>

      {/* Quick view */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        ariaLabel={`${displayName} details`}
        maxWidth="xl"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="aspect-square overflow-hidden rounded-md border border-border bg-beige">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(images[activeImageIndex])}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <button
                    key={`${getImageUrl(image)}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    aria-pressed={activeImageIndex === index}
                    className={`h-14 w-14 overflow-hidden rounded-sm border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      activeImageIndex === index
                        ? "border-brand-orange"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(image)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div>
              {product.sku && (
                <p className="font-mono text-caption text-brown-strong">
                  SKU: {product.sku}
                </p>
              )}

              <h2 className="mt-1 font-serif text-h3 font-medium leading-snug text-charcoal">
                {displayName}
              </h2>

              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="text-h4 font-semibold text-charcoal">
                  {formatINR(product.price)}
                </span>
                {comparePrice && comparePrice > product.price && (
                  <span className="text-small text-brown-strong line-through">
                    {formatINR(comparePrice)}
                  </span>
                )}
                {discount && (
                  <span className="text-small font-medium text-dusty-rose-deep">
                    {discount}% off
                  </span>
                )}
              </div>

              <p className="mt-4 text-small text-charcoal-soft">
                {product.description}
              </p>

              {product.details && product.details.length > 0 && (
                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="eyebrow text-charcoal">Details</h3>
                  <ul className="mt-3 space-y-2">
                    {product.details.map((detail, index) => (
                      <li
                        key={`${detail}-${index}`}
                        className="flex items-start gap-2 text-small text-charcoal-soft"
                      >
                        <span
                          className="mt-0.5 text-dusty-rose-deep"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(product.material ||
                product.dimensions ||
                product.weight) && (
                <dl className="mt-5 space-y-2 border-t border-border pt-4 text-small">
                  {product.material && (
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-brown-strong">
                        Material
                      </dt>
                      <dd className="text-charcoal">{product.material}</dd>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-brown-strong">
                        Dimensions
                      </dt>
                      <dd className="text-charcoal">{product.dimensions}</dd>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-brown-strong">Weight</dt>
                      <dd className="text-charcoal">{product.weight}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <Button
                  className="flex-1"
                  size="md"
                  disabled={isOutOfStock}
                  onClick={() => {
                    addItem(product, 1);
                    setIsDetailOpen(false);
                  }}
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : `Add to Bag — ${formatINR(product.price)}`}
                </Button>
                <WishlistButton product={product} size="lg" />
              </div>
              <p className="mt-2 text-center text-caption text-brown-strong">
                Free shipping on orders above ₹1,499 · 7-day easy returns
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductCard;
