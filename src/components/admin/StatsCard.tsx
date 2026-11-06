import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtext?: string;
}

export function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtext,
}: StatsCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-white p-5 transition-colors duration-200 hover:border-border-strong">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-caption font-medium uppercase tracking-[0.12em] text-brown-strong">
          {title}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-dusty-rose/20 bg-dusty-rose-soft text-dusty-rose-deep transition-colors group-hover:border-brand-orange/20 group-hover:bg-brand-orange-soft group-hover:text-brand-orange-hover">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <span className="font-serif text-h3 font-medium tracking-tight text-charcoal">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-caption font-medium",
              isPositive
                ? "border-success-border bg-success-bg text-success-text"
                : "border-danger-border bg-danger-bg text-danger-text"
            )}
          >
            {isPositive ? "+" : ""}
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-3 border-t border-border pt-3 text-caption text-brown-strong">
          {subtext}
        </p>
      )}
    </div>
  );
}

export default StatsCard;
