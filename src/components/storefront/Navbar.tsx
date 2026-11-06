"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, CircleUser, Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/cn";
import MegaMenu from "./MegaMenu";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const { totalItems: cartTotal, openCart } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

  // Scroll to hero element with fallback to top of window
  const scrollToHeroElement = useCallback(() => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  /**
   * Home link click handler:
   * Smoothly scrolls to the #hero section without modifying the browser URL hash.
   * Address bar remains strictly at "http://localhost:3000/".
   */
  const handleHomeClick = (
    e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (e) {
      e.preventDefault();
    }
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);

    if (pathname === "/") {
      scrollToHeroElement();
    } else {
      sessionStorage.setItem("swami_scroll_to_hero", "true");
      router.push("/");
    }
  };

  // Cross-route navigation back to homepage scroll trigger
  useEffect(() => {
    if (pathname === "/") {
      const pendingScroll = sessionStorage.getItem("swami_scroll_to_hero");
      if (pendingScroll) {
        sessionStorage.removeItem("swami_scroll_to_hero");
        const timer = setTimeout(() => {
          scrollToHeroElement();
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, scrollToHeroElement]);

  // Escape key closes mobile menu & mega menu
  useEffect(() => {
    if (!isMobileMenuOpen && !isMegaMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isMegaMenuOpen]);

  return (
    <>
      <header
        className="navbar fixed inset-x-0 top-0 z-40 h-[80px] sm:h-[85px] border-b border-[#DED8CE] bg-[#EBE9E1] px-4 sm:px-8 md:px-8 lg:px-8"
      >
        <div className="relative flex h-full items-center justify-between">
          {/* ================================================================
              1. LEFT COLUMN — NAVIGATION (HOME | COLLECTIONS ⌄ | OUR STORY | CONTACT US)
              ================================================================ */}
          <div className="flex items-center justify-start gap-4">
            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="rounded-md p-1.5 text-[#292929] transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Desktop Navigation Links: 13px, DM Sans, 0.1em tracking, Uppercase */}
            <nav
              className="hidden items-center gap-6 xl:gap-7 lg:flex"
              aria-label="Primary navigation"
            >
              {/* Link 1: HOME */}
              <Link
                href="/"
                onClick={handleHomeClick}
                className={cn(
                  "font-sans text-[13px] uppercase tracking-[0.1em] transition-colors hover:text-brand-orange whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:rounded-xs",
                  pathname === "/"
                    ? "font-semibold text-brand-orange"
                    : "font-medium text-[#292929]"
                )}
                aria-current={pathname === "/" ? "page" : undefined}
                id="nav-link-home"
              >
                HOME
              </Link>

              {/* Link 2: COLLECTIONS ⌄ */}
              <button
                type="button"
                id="collections-mega-menu-trigger"
                onClick={() => setIsMegaMenuOpen((open) => !open)}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
                aria-controls="collections-mega-menu"
                className={cn(
                  "group inline-flex items-center gap-1 font-sans text-[13px] uppercase tracking-[0.1em] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:rounded-xs cursor-pointer",
                  isMegaMenuOpen || pathname.startsWith("/collections")
                    ? "font-semibold text-brand-orange"
                    : "font-medium text-[#292929] hover:text-brand-orange"
                )}
              >
                <span>COLLECTIONS</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isMegaMenuOpen && "rotate-180 text-brand-orange"
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Link 3: OUR STORY */}
              <Link
                href="/our-story"
                onClick={() => setIsMegaMenuOpen(false)}
                className={cn(
                  "font-sans text-[13px] uppercase tracking-[0.1em] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:rounded-xs",
                  pathname === "/our-story"
                    ? "font-semibold text-brand-orange"
                    : "font-medium text-[#292929] hover:text-brand-orange"
                )}
                aria-current={pathname === "/our-story" ? "page" : undefined}
              >
                OUR STORY
              </Link>

              {/* Link 4: CONTACT US */}
              <Link
                href="/contact"
                onClick={() => setIsMegaMenuOpen(false)}
                className={cn(
                  "font-sans text-[13px] uppercase tracking-[0.1em] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:rounded-xs",
                  pathname === "/contact"
                    ? "font-semibold text-brand-orange"
                    : "font-medium text-[#292929] hover:text-brand-orange"
                )}
                aria-current={pathname === "/contact" ? "page" : undefined}
              >
                CONTACT US
              </Link>
            </nav>
          </div>

          {/* ================================================================
              2. CENTRE COLUMN — SWAMI JAP BRAND LOCKUP (Playfair Display ~38px, Flanked BAGS)
              ================================================================ */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="group flex flex-col items-center justify-center text-center cursor-pointer"
              id="site-logo"
              aria-label="Swami Jap Bags homepage"
            >
              {/* Swami Jap Wordmark in Playfair Display (~38px on desktop) */}
              <span className="font-serif text-[26px] sm:text-3xl lg:text-[38px] font-normal tracking-tight text-[#292929] leading-none transition-colors group-hover:text-brand-orange whitespace-nowrap">
                Swami Jap
              </span>

              {/* Decorative Flanked Subtitle: ═ BAGS ═ */}
              <div className="mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
                {/* Left double hairlines */}
                <div className="flex flex-col gap-[2px] w-5 sm:w-7">
                  <div className="h-[1px] w-full bg-[#806B59]/65" />
                  <div className="h-[1px] w-full bg-[#806B59]/65" />
                </div>

                <span className="font-sans text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.25em] text-[#806B59] leading-none select-none">
                  BAGS
                </span>

                {/* Right double hairlines */}
                <div className="flex flex-col gap-[2px] w-5 sm:w-7">
                  <div className="h-[1px] w-full bg-[#806B59]/65" />
                  <div className="h-[1px] w-full bg-[#806B59]/65" />
                </div>
              </div>
            </Link>
          </div>

          {/* ================================================================
              3. RIGHT COLUMN — UTILITY ICONS (Wishlist, Cart, Customer Profile)
              ================================================================ */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4 lg:gap-5">
            {/* 1. Wishlist — Heart (1.5px stroke, #292929) */}
            <Link
              href="/wishlist"
              onClick={() => setIsMegaMenuOpen(false)}
              className="relative flex items-center justify-center p-1 sm:p-2 text-[#292929] transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-sm"
              aria-label={
                wishlistTotal > 0
                  ? `Wishlist, ${wishlistTotal} item${wishlistTotal === 1 ? "" : "s"}`
                  : "Wishlist"
              }
              id="wishlist-button"
            >
              <Heart className="h-5 w-5 sm:h-[21px] sm:w-[21px]" strokeWidth={1.5} aria-hidden="true" />
              {wishlistTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-dusty-rose-deep px-1 text-[9px] font-semibold leading-none text-white shadow-xs">
                  {wishlistTotal > 9 ? "9+" : wishlistTotal}
                </span>
              )}
            </Link>

            {/* 2. Shopping Bag — Cart (1.5px stroke, #292929) */}
            <button
              type="button"
              onClick={() => {
                setIsMegaMenuOpen(false);
                openCart();
              }}
              className="relative flex items-center justify-center p-1 sm:p-2 text-[#292929] transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-sm cursor-pointer"
              aria-label={
                cartTotal > 0
                  ? `Open shopping bag, ${cartTotal} item${cartTotal === 1 ? "" : "s"}`
                  : "Open shopping bag"
              }
              id="cart-button"
            >
              <ShoppingBag className="h-5 w-5 sm:h-[21px] sm:w-[21px]" strokeWidth={1.5} aria-hidden="true" />
              {cartTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[9px] font-semibold leading-none text-white shadow-xs">
                  {cartTotal > 9 ? "9+" : cartTotal}
                </span>
              )}
            </button>

            {/* 3. User Profile — User inside a circle (1.5px stroke, #292929) */}
            <Link
              href="/account"
              onClick={() => setIsMegaMenuOpen(false)}
              className="flex items-center justify-center p-1 sm:p-2 text-[#292929] transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-sm"
              aria-label="Customer Account Profile"
              id="account-button"
            >
              <CircleUser className="h-5 w-5 sm:h-[21px] sm:w-[21px]" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Collection Mega Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-[80px] sm:top-[85px] border-b border-[#DED8CE] bg-[#EBE9E1] px-6 pb-8 pt-4 lg:hidden shadow-lg max-h-[calc(100vh-85px)] overflow-y-auto"
          >
            <div className="pb-3 border-b border-[#DED8CE]">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="block py-2 font-sans text-small uppercase tracking-[0.1em] font-medium text-[#E43D12] transition-colors"
              >
                HOME
              </Link>
              <p className="mt-2 text-micro font-semibold uppercase tracking-wider text-brown-strong">
                Silhouettes &amp; Collections
              </p>
              <div className="mt-2 space-y-1">
                <Link
                  href="/collections"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-small font-semibold text-charcoal hover:text-brand-orange transition-colors"
                >
                  All Collections
                </Link>
                <Link
                  href="/collections/handbags"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 pl-3 text-caption text-charcoal-soft hover:text-brand-orange transition-colors"
                >
                  Handbags &amp; Totes
                </Link>
                <Link
                  href="/collections/sling-bags"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 pl-3 text-caption text-charcoal-soft hover:text-brand-orange transition-colors"
                >
                  Sling &amp; Crossbody Bags
                </Link>
                <Link
                  href="/collections/laptop-bags"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 pl-3 text-caption text-charcoal-soft hover:text-brand-orange transition-colors"
                >
                  Laptop &amp; Work Bags
                </Link>
                <Link
                  href="/collections/wallets-accessories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 pl-3 text-caption text-charcoal-soft hover:text-brand-orange transition-colors"
                >
                  Wallets &amp; Accessories
                </Link>
              </div>
            </div>

            <nav
              aria-label="Mobile secondary navigation"
              className="py-3 space-y-1 border-b border-[#DED8CE]"
            >
              <Link
                href="/our-story"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-sans text-small uppercase tracking-[0.1em] font-medium text-[#292929] hover:text-brand-orange transition-colors"
              >
                OUR STORY
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-sans text-small uppercase tracking-[0.1em] font-medium text-[#292929] hover:text-brand-orange transition-colors"
              >
                CONTACT US
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 font-sans text-small uppercase tracking-[0.1em] font-medium text-[#292929] hover:text-brand-orange transition-colors"
              >
                <span>SAVED WISHLIST</span>
                {wishlistTotal > 0 && (
                  <span className="rounded-full bg-dusty-rose-deep px-2 py-0.5 text-micro font-semibold text-white">
                    {wishlistTotal}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-sans text-small uppercase tracking-[0.1em] font-medium text-[#292929] hover:text-brand-orange transition-colors"
              >
                CUSTOMER ACCOUNT
              </Link>
            </nav>

            <div className="pt-4 flex items-center justify-end text-caption font-semibold">
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brown-strong/70 hover:text-charcoal text-micro tracking-wider uppercase"
              >
                Store Admin
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
