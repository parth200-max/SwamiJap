import React from "react";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/storefront/Navbar";
import CartDrawer from "@/components/storefront/CartDrawer";
import Footer from "@/components/storefront/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="relative flex min-h-screen flex-col bg-ivory text-charcoal overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-brand-orange focus:bg-white focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-charcoal"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <CartDrawer />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
