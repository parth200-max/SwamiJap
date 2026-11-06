import React from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-3 flex items-center gap-2.5 text-dusty-rose-deep",
            align === "center" && "justify-center"
          )}
        >
          <span
            className="h-px w-6 bg-dusty-rose"
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      )}

      <Heading className="font-serif text-h2 font-medium text-charcoal">
        {title}
      </Heading>

      {description && (
        <p className="mt-4 text-body text-charcoal-soft">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
