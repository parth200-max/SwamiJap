import React from "react";
import Link from "next/link";
import { LucideIcon, PackageOpen } from "lucide-react";
import { buttonStyles } from "@/lib/button-styles";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryActionHref?: string;
  secondaryActionLabel?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionHref,
  actionLabel,
  secondaryActionHref,
  secondaryActionLabel,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-beige/40 p-8 text-center",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-soft-pink/30 text-dusty-rose-deep">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>

      <h3 className="mt-4 font-serif text-h3 font-medium text-charcoal">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-small text-charcoal-soft font-sans leading-relaxed">
        {description}
      </p>

      {(actionHref || secondaryActionHref) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className={buttonStyles({ variant: "primary", size: "md" })}
            >
              {actionLabel}
            </Link>
          )}

          {secondaryActionHref && secondaryActionLabel && (
            <Link
              href={secondaryActionHref}
              className={buttonStyles({ variant: "outline", size: "md" })}
            >
              {secondaryActionLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default EmptyState;

