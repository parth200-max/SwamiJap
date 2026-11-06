"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helperText, id, required, rows = 4, ...props },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-caption font-medium uppercase tracking-[0.12em] text-brown-strong"
          >
            {label}
            {required && (
              <span className="ml-1 text-dusty-rose-deep" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-md border bg-white px-3.5 py-3 text-small text-charcoal transition-colors duration-200",
            "placeholder:text-brown-strong focus:outline-none focus:ring-2 focus:ring-brand-orange/20 disabled:cursor-not-allowed disabled:bg-beige disabled:text-brown-strong",
            error
              ? "border-danger-text focus:border-danger-text focus:ring-danger-text/20"
              : "border-border focus:border-brand-orange",
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} className="text-caption text-danger-text">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-caption text-brown-strong">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
