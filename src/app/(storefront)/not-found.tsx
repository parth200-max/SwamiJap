import React from "react";
import Link from "next/link";

export default function StorefrontNotFound() {
  return (
    <div className="bg-ivory min-h-[65vh] flex flex-col items-center justify-center px-4 py-24 sm:py-36 text-center">
      <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] font-normal text-charcoal tracking-tight">
        Category not found.
      </h1>
      <p className="mt-3 font-sans text-sm text-brown max-w-md">
        The collection or silhouette you are looking for is unavailable or has moved.
      </p>
      <Link
        href="/collections"
        className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.16em] font-semibold text-brown hover:text-brand-orange transition-colors"
      >
        <span>← BACK TO COLLECTIONS</span>
      </Link>
    </div>
  );
}

