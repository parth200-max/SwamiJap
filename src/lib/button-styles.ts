import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "maroon"
  | "gold"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const baseStyles =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-sans font-semibold tracking-[0.01em] transition-colors duration-200 ease-standard select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-45 active:translate-y-px motion-reduce:transition-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-brand-orange-cta bg-brand-orange-cta text-white shadow-xs hover:border-brand-orange-hover hover:bg-brand-orange-hover",
  secondary:
    "border-border bg-white text-charcoal hover:border-border-strong hover:bg-beige",
  // Legacy alias retained so existing call sites keep working.
  maroon:
    "border-brand-orange-cta bg-brand-orange-cta text-white shadow-xs hover:border-brand-orange-hover hover:bg-brand-orange-hover",
  gold: "border-mustard bg-mustard text-charcoal shadow-xs hover:border-mustard-hover hover:bg-mustard-hover",
  outline:
    "border-border-strong bg-transparent text-charcoal hover:border-charcoal hover:bg-white",
  ghost:
    "border-transparent bg-transparent text-brown-strong hover:bg-beige hover:text-charcoal",
  danger:
    "border-danger-text bg-danger-text text-white shadow-xs hover:border-[#752534] hover:bg-[#752534]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-small",
  md: "h-11 px-5 text-small",
  lg: "h-12 px-6 text-body",
  icon: "h-10 w-10 p-0",
};

/**
 * Framework-agnostic button classes shared by buttons and anchor links.
 * Kept outside the client component so server components can use it too.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}
