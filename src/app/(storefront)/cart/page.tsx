"use client";

import React from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { useCart } from "@/hooks/useCart";
import { buttonStyles } from "@/lib/button-styles";

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem } = useCart();

  const freeShippingThreshold = 1499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const difference = freeShippingThreshold - subtotal;

  return (
    <div className="section-pad pt-28 sm:pt-32 bg-ivory min-h-[70vh]">
      <div className="container-page">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Shopping Bag" }]} />

        {/* Header */}
        <div className="mt-4 pb-8 border-b border-border">
          <Badge variant="mustard">Your Order</Badge>
          <h1 className="mt-4 font-serif text-h1 font-medium text-charcoal leading-tight">
            Shopping <span className="italic text-dusty-rose-deep">Bag</span>
          </h1>
          <p className="mt-2 text-lead text-charcoal-soft font-sans">
            {totalItems > 0
              ? `You have ${totalItems} ${totalItems === 1 ? "silhouette" : "silhouettes"} in your shopping bag.`
              : "Review your selected bags and proceed to checkout."}
          </p>
        </div>

        {totalItems > 0 ? (
          <div className="py-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: Cart Line Items */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery threshold indicator */}
              <div className="rounded-lg border border-border bg-white p-4">
                <div className="flex items-center justify-between text-caption font-semibold">
                  <span className={isFreeShipping ? "text-success-text" : "text-charcoal"}>
                    {isFreeShipping
                      ? "🎉 You have qualified for Free Express Pan-India Delivery!"
                      : `Add ${formatINR(difference)} more to unlock Free Pan-India Delivery`}
                  </span>
                  <span className="text-micro text-brown-strong">
                    Threshold: {formatINR(freeShippingThreshold)}
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-beige">
                  <div
                    className="h-full bg-brand-orange transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="rounded-xl border border-border bg-white divide-y divide-border overflow-hidden">
                {items.map((item) => {
                  const product = item.product;
                  const itemTotal = product.price * item.quantity;
                  const imageSrc =
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80";

                  return (
                    <div
                      key={`${product.id}-${item.selectedColor || ""}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-beige">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={typeof imageSrc === "string" ? imageSrc : "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"}
                            alt={product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-micro font-semibold uppercase tracking-wider text-dusty-rose-deep">
                            {item.selectedColor || product.color || "Handcrafted"}
                          </p>
                          <h3 className="font-serif text-base font-medium text-charcoal">
                            {product.title}
                          </h3>
                          <p className="text-small font-semibold text-charcoal mt-1">
                            {formatINR(product.price)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center rounded-md border border-border bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                item.quantity - 1,
                                item.selectedColor
                              )
                            }
                            className="p-2 text-charcoal hover:bg-beige transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-small font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                item.quantity + 1,
                                item.selectedColor
                              )
                            }
                            className="p-2 text-charcoal hover:bg-beige transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="font-serif text-base font-semibold text-charcoal min-w-[70px] text-right">
                          {formatINR(itemTotal)}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id, item.selectedColor)}
                          className="p-2 text-charcoal-soft hover:text-danger-text transition-colors"
                          aria-label={`Remove ${product.title} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-border bg-white p-6 shadow-xs space-y-4">
                <h2 className="font-serif text-h3 font-medium text-charcoal pb-3 border-b border-border">
                  Order Summary
                </h2>

                <div className="space-y-2 text-small text-charcoal-soft font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pan-India Delivery</span>
                    <span className={isFreeShipping ? "text-success-text font-medium" : "text-charcoal"}>
                      {isFreeShipping ? "FREE" : formatINR(99)}
                    </span>
                  </div>
                  <div className="flex justify-between text-caption text-brown-strong">
                    <span>Applicable GST</span>
                    <span>Included in price</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-baseline">
                  <span className="font-serif text-base font-semibold text-charcoal">
                    Estimated Total
                  </span>
                  <span className="font-serif text-xl font-bold text-charcoal">
                    {formatINR(isFreeShipping ? subtotal : subtotal + 99)}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      alert("Razorpay checkout integration is scheduled for Phase 6. Your cart items are preserved in localStorage.")
                    }
                    className={buttonStyles({
                      variant: "primary",
                      size: "lg",
                      className: "w-full justify-center",
                    })}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="mt-2 text-center text-micro text-brown-strong">
                    100% Encrypted Prepaid Checkout via UPI, Cards, NetBanking
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-10">
            <EmptyState
              icon={ShoppingBag}
              title="Your shopping bag is empty"
              description="You haven't added any bags to your shopping bag yet. Explore our everyday totes, commuter laptop bags, and slings."
              actionHref="/collections"
              actionLabel="Explore Collections"
            />
          </div>
        )}
      </div>
    </div>
  );
}
