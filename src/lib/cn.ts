import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes while allowing component-level overrides.
 * Used by every design-system primitive so class strings stay predictable.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
