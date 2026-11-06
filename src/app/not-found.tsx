import React from "react";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 sm:py-36 text-center">
        <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] font-normal text-charcoal tracking-tight">
          Category not found.
        </h1>
        <p className="mt-3 font-sans text-sm text-brown max-w-md">
          The requested page or collection silhouette is unavailable or has moved.
        </p>
        <Link
          href="/collections"
          className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.16em] font-semibold text-brown hover:text-brand-orange transition-colors"
        >
          <span>← BACK TO COLLECTIONS</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

