"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";

function getImageUrl(image: unknown): string {
  if (typeof image === "string") return image;
  if (image && typeof (image as { url?: string }).url === "string") {
    return (image as { url: string }).url;
  }
  return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80";
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const checkoutTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (checkoutTimer.current) {
        window.clearTimeout(checkoutTimer.current);
      }
    };
  }, []);

  const handleClose = () => {
    if (checkoutTimer.current) {
      window.clearTimeout(checkoutTimer.current);
      checkoutTimer.current = null;
    }
    setIsCheckingOut(false);
    setOrderComplete(false);
    closeCart();
  };

  const handleDemoCheckout = () => {
    setIsCheckingOut(true);
    checkoutTimer.current = window.setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  const footer =
    !orderComplete && items.length > 0 ? (
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-md border border-success-border bg-success-bg p-2.5 text-caption text-success-text">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Free delivery across India · 7-day easy returns</span>
        </div>

        <dl className="space-y-1.5 text-caption">
          <div className="flex justify-between text-brown-strong">
            <dt>Subtotal</dt>
            <dd>{formatINR(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-brown-strong">
            <dt>Shipping</dt>
            <dd className="font-medium text-success-text">Free</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-body font-semibold text-charcoal">
            <dt>Total</dt>
            <dd className="text-brand-orange-hover">{formatINR(subtotal)}</dd>
          </div>
        </dl>

        <Button
          variant="primary"
          className="w-full"
          size="lg"
          isLoading={isCheckingOut}
          onClick={handleDemoCheckout}
        >
          Checkout
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <p className="text-center text-micro text-brown-strong">
          Design preview — no payment is processed.
        </p>
      </div>
    ) : undefined;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      footer={footer}
      title={
        <>
          <ShoppingBag
            className="h-5 w-5 text-brand-orange"
            aria-hidden="true"
          />
          <span className="font-serif text-h4 font-medium text-charcoal">
            Shopping Bag
          </span>
          <span className="rounded-full bg-beige px-2 py-0.5 text-caption font-medium text-brown-strong">
            {totalItems}
          </span>
        </>
      }
    >
      {orderComplete ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-success-border bg-success-bg text-success-text">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-serif text-h2 text-charcoal">
            Demo checkout complete
          </h2>
          <p className="mt-3 max-w-xs text-small text-charcoal-soft">
            This is a design preview. No payment was processed and no order was
            created. Real checkout is part of a later phase.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={handleClose}
          >
            Continue browsing
          </Button>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <ShoppingBag
            className="h-12 w-12 text-brown/50"
            aria-hidden="true"
          />
          <p className="mt-4 font-serif text-h3 text-charcoal">
            Your shopping bag is empty
          </p>
          <p className="mt-2 max-w-xs text-small text-charcoal-soft">
            Discover our everyday silhouettes and accessories.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={handleClose}
          >
            Explore Collection
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => {
            const displayName = item.product.title || item.product.name;
            const image = getImageUrl(item.product.images?.[0]);

            return (
              <li
                key={item.product.id + (item.selectedColor || "")}
                className="flex gap-4 rounded-md border border-border bg-white p-3.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={displayName}
                  className="h-24 w-20 shrink-0 rounded-sm border border-border bg-beige object-cover"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 font-serif text-small font-medium leading-snug text-charcoal">
                        {displayName}
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor)
                        }
                        className="rounded-sm p-1 text-brown-strong transition-colors hover:bg-danger-bg hover:text-danger-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        aria-label={`Remove ${displayName} from bag`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="mt-0.5 text-caption text-brown-strong">
                      Colour:{" "}
                      {item.selectedColor || item.product.color || "Tan"}
                    </p>
                    <p className="mt-1 text-small font-semibold text-charcoal">
                      {formatINR(Number(item.product.price))}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                          item.selectedColor
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-beige text-charcoal transition-colors hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                      aria-label={`Decrease quantity of ${displayName}`}
                    >
                      <Minus className="h-3 w-3" aria-hidden="true" />
                    </button>
                    <span className="min-w-6 text-center text-caption font-medium text-charcoal">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                          item.selectedColor
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-beige text-charcoal transition-colors hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                      aria-label={`Increase quantity of ${displayName}`}
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}

export default CartDrawer;
