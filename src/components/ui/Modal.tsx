"use client";

import React, { useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  ariaLabel?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const maxWidthStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
  maxWidth = "lg",
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(isOpen, onClose, panelRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px] animate-fade-in motion-reduce:animate-none"
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : title ? titleId : undefined}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-lg border border-border bg-white p-5 text-charcoal shadow-lg animate-scale-in motion-reduce:animate-none sm:p-6",
          maxWidthStyles[maxWidth],
          className
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-border pb-4">
          {title ? (
            <h2
              id={titleId}
              className="font-serif text-h4 font-medium leading-snug text-charcoal"
            >
              {title}
            </h2>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={onClose}
            className="-mr-1 -mt-1 rounded-md p-2 text-brown-strong transition-colors hover:bg-beige hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[min(80vh,42rem)] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
