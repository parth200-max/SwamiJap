"use client";

import React, { useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  ariaLabel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Accessible right-hand drawer used by the shopping bag.
 * Focus trapping, Escape handling and scroll locking come from useFocusTrap.
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
  footer,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(isOpen, onClose, panelRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px] animate-fade-in motion-reduce:animate-none"
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : titleId}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-ivory text-charcoal shadow-lg animate-slide-in-right motion-reduce:animate-none",
          className
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border bg-white px-5 py-4">
          <div id={titleId} className="flex min-w-0 items-center gap-2.5">
            {title}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="-mr-1 rounded-md p-2 text-brown-strong transition-colors hover:bg-beige hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="border-t border-border bg-white px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
