import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  showHomeIcon = true,
  className,
}: BreadcrumbProps) {
  // Construct Schema.org BreadcrumbList
  const schemaItems = [
    { name: "Home", item: "/" },
    ...items.map((it) => ({
      name: it.label,
      item: it.href || "",
    })),
  ].filter((it) => it.item);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith("http")
        ? it.item
        : `https://swamijap.in${it.item}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("w-full py-3", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-caption font-sans text-charcoal-soft">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:rounded-xs"
            aria-label="Swami Jap Home"
          >
            {showHomeIcon ? (
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <span>Home</span>
            )}
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              <ChevronRight
                className="h-3 w-3 text-border-strong shrink-0"
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  className="font-medium text-charcoal truncate max-w-[220px] sm:max-w-none"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:rounded-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;

