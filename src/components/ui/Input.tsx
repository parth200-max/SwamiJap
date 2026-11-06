"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, id, required, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
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

        <input
          id={inputId}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full rounded-md border bg-white px-3.5 text-small text-charcoal transition-colors duration-200",
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

Input.displayName = "Input";
export default Input;
