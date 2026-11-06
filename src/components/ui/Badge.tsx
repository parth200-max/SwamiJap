import React from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "rose"
  | "mustard"
  | "neutral"
  | "orange"
  | "success"
  | "danger"
  | "outline"
  // Legacy names retained for existing call sites.
  | "maroon"
  | "gold"
  | "emerald"
  | "red";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  orange:
    "border-brand-orange/20 bg-brand-orange-soft text-brand-orange-hover",
  rose: "border-dusty-rose/25 bg-dusty-rose-soft text-dusty-rose-deep",
  mustard: "border-mustard/40 bg-mustard-soft text-mustard-deep",
  neutral: "border-border bg-beige text-brown-strong",
  success:
    "border-success-border bg-success-bg text-success-text",
  danger: "border-danger-border bg-danger-bg text-danger-text",
  outline: "border-border-strong bg-transparent text-brown-strong",
  maroon: "border-dusty-rose/25 bg-dusty-rose-soft text-dusty-rose-deep",
  gold: "border-mustard/40 bg-mustard-soft text-mustard-deep",
  emerald:
    "border-success-border bg-success-bg text-success-text",
  red: "border-danger-border bg-danger-bg text-danger-text",
};

const sizeStyles = {
  sm: "px-2.5 py-1 text-micro",
  md: "px-3 py-1.5 text-caption",
};

export function Badge({
  children,
  variant = "rose",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-sans font-medium uppercase leading-none tracking-[0.12em]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
