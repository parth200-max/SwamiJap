"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/cn";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const SIZE_STYLES = {
  sm: {
    btn: "h-8 w-8 text-micro",
    icon: "h-4 w-4",
  },
  md: {
    btn: "h-9 w-9 text-caption",
    icon: "h-4.5 w-4.5",
  },
  lg: {
    btn: "h-11 w-11 text-small",
    icon: "h-5 w-5",
  },
};

export function WishlistButton({
  product,
  className,
  size = "md",
  showText = false,
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const active = isInWishlist(product.id);
  const styles = SIZE_STYLES[size];

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleItem(product);
    window.setTimeout(() => setIsAnimating(false), 300);
  };

  const displayName = product.title || product.name || "Bag";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        active
          ? `Remove ${displayName} from wishlist`
          : `Add ${displayName} to wishlist`
      }
      aria-pressed={active}
      className={cn(
        "group relative flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
        showText
          ? "gap-2 px-4 py-2 border border-border bg-white text-charcoal hover:border-dusty-rose hover:text-dusty-rose-deep"
          : cn(
              styles.btn,
              "border shadow-xs",
              active
                ? "border-dusty-rose/40 bg-soft-pink/30 text-dusty-rose-deep hover:bg-soft-pink/50"
                : "border-border bg-white/90 backdrop-blur-xs text-charcoal-soft hover:border-dusty-rose hover:text-dusty-rose-deep hover:bg-white"
            ),
        className
      )}
    >
      <Heart
        className={cn(
          styles.icon,
          "transition-transform duration-200",
          active ? "fill-dusty-rose-deep text-dusty-rose-deep" : "text-current",
          isAnimating && "scale-125"
        )}
        aria-hidden="true"
      />
      {showText && (
        <span className="font-sans font-medium">
          {active ? "Saved to Wishlist" : "Save to Wishlist"}
        </span>
      )}
    </button>
  );
}

export default WishlistButton;

