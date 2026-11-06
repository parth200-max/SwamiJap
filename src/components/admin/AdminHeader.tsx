"use client";

import React from "react";
import Badge from "@/components/ui/Badge";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-ivory/95 px-4 py-4 backdrop-blur-md md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-h4 font-medium tracking-tight text-charcoal">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-caption text-brown-strong">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" size="sm" className="hidden sm:inline-flex">
            <span
              className="h-1.5 w-1.5 rounded-full bg-success-text"
              aria-hidden="true"
            />
            Store Online
          </Badge>

          <div className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />

          {action}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
